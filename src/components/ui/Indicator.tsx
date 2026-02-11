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
  success: 'bg-[hsla(142_71%_55%_/_0.15)] text-[--color-success]',
  danger: 'bg-[hsla(0_84%_70%_/_0.15)] text-[--color-danger]',
  primary: 'bg-[hsla(217_91%_60%_/_0.15)] text-[--color-primary-light]',
  muted: 'bg-[--color-bg-muted] text-[--color-foreground-muted]',
}

export const Indicator = forwardRef<HTMLDivElement, IndicatorProps>(
  ({ className, label, value, status, variant = 'muted', ...props }, ref) => {
    return (
      <div ref={ref} className={clsx('flex items-center justify-between', className)} {...props}>
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-medium uppercase tracking-wide text-[--color-foreground-muted]">{label}</span>
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
