import type { ReactNode } from "react"

export function PageHeader({
  title,
  description,
  icon,
  action,
}: {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        {icon && <span className="mt-1.5 shrink-0 text-primary">{icon}</span>}
        <div>
          <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
          {description && (
            <p className="mt-1 max-w-2xl text-pretty text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      {action}
    </div>
  )
}
