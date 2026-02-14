import { HTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

export type IndicatorVariant = 'success' | 'danger' | 'primary' | 'muted'

export interface IndicatorProps extends HTMLAttributes<HTMLDivElement> {
  label: string
  value: string
  status: string
  variant?: IndicatorVariant
}

const variantStyles: Record<IndicatorVariant, string> = {
  success: 'bg-success/15 text-success',
  danger: 'bg-danger/15 text-danger',
  primary: 'bg-primary/15 text-primary-light',
  muted: 'bg-bg-elevated text-foreground-muted',
}

export const Indicator = forwardRef<HTMLDivElement, IndicatorProps>(
  ({ className, label, value, status, variant = 'muted', ...props }, ref) => {
    return (
      <div ref={ref} className={clsx('flex items-center justify-between', className)} {...props}>
        <div className="flex flex-col gap-0.5">
          <span className="text-micro text-foreground-muted">{label}</span>
          <span className="font-mono font-semibold text-sm">{value}</span>
        </div>
        <span className={clsx(
          'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold',
          variantStyles[variant]
        )}>
          {status}
        </span>
      </div>
    )
  }
)

Indicator.displayName = 'Indicator'
