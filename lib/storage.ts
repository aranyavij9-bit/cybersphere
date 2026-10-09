"use client"

// Lightweight IndexedDB wrapper for CyberSphere progress + achievements
const DB_NAME = "cybersphere"
const DB_VERSION = 1
const STORES = ["progress", "quiz", "achievements", "kv"] as const
type StoreName = (typeof STORES)[number]

let dbPromise: Promise<IDBDatabase> | null = null

function getDB(): Promise<IDBDatabase> {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"))
  if (dbPromise) return dbPromise
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      for (const store of STORES) {
        if (!db.objectStoreNames.contains(store)) {
          db.createObjectStore(store)
        }
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
  return dbPromise
}

export async function idbSet(store: StoreName, key: string, value: unknown) {
  try {
    const db = await getDB()
    return new Promise<void>((resolve, reject) => {
      const tx = db.transaction(store, "readwrite")
      tx.objectStore(store).put(value, key)
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
  } catch {
    // graceful fallback to localStorage
    try {
      localStorage.setItem(`cs:${store}:${key}`, JSON.stringify(value))
    } catch {}
  }
}

export async function idbGet<T = unknown>(store: StoreName, key: string): Promise<T | undefined> {
  try {
    const db = await getDB()
    return new Promise<T | undefined>((resolve, reject) => {
      const tx = db.transaction(store, "readonly")
      const req = tx.objectStore(store).get(key)
      req.onsuccess = () => resolve(req.result as T)
      req.onerror = () => reject(req.error)
    })
  } catch {
    try {
      const raw = localStorage.getItem(`cs:${store}:${key}`)
      return raw ? (JSON.parse(raw) as T) : undefined
    } catch {
      return undefined
    }
  }
}

export async function idbGetAll<T = unknown>(store: StoreName): Promise<Record<string, T>> {
  try {
    const db = await getDB()
    return new Promise<Record<string, T>>((resolve, reject) => {
      const tx = db.transaction(store, "readonly")
      const objStore = tx.objectStore(store)
      const keysReq = objStore.getAllKeys()
      const valsReq = objStore.getAll()
      const result: Record<string, T> = {}
      tx.oncomplete = () => {
        const keys = keysReq.result as IDBValidKey[]
        const vals = valsReq.result as T[]
        keys.forEach((k, i) => {
          result[String(k)] = vals[i]
        })
        resolve(result)
      }
      tx.onerror = () => reject(tx.error)
    })
  } catch {
    return {}
  }
}

// LocalStorage helpers
export function lsGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function lsSet(key: string, value: unknown) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}
