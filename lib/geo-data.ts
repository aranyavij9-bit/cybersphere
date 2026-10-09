// [longitude, latitude] for markers on the world map
export interface GeoCountry {
  name: string
  code: string
  coords: [number, number]
}

export const GEO_COUNTRIES: GeoCountry[] = [
  { name: "United States", code: "US", coords: [-98, 39] },
  { name: "Canada", code: "CA", coords: [-106, 56] },
  { name: "Brazil", code: "BR", coords: [-51, -10] },
  { name: "United Kingdom", code: "GB", coords: [-1.5, 52] },
  { name: "Germany", code: "DE", coords: [10, 51] },
  { name: "Russia", code: "RU", coords: [90, 61] },
  { name: "Iran", code: "IR", coords: [53, 32] },
  { name: "India", code: "IN", coords: [79, 22] },
  { name: "China", code: "CN", coords: [104, 35] },
  { name: "Japan", code: "JP", coords: [138, 36] },
  { name: "Australia", code: "AU", coords: [133, -25] },
  { name: "Nigeria", code: "NG", coords: [8, 9] },
  { name: "South Africa", code: "ZA", coords: [24, -29] },
  { name: "Singapore", code: "SG", coords: [104, 1.3] },
]

export const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
