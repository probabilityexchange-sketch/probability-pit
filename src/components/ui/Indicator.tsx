import { HTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

export interface IndicatorProps extends HTMLAttributes<HTMLDivElement> {
  label: string
  value: string
  status: string
  variant?: 'success' | 'danger' | 'primary' | 'muted'
}

const variantStyles = {
  success: 'bg-success/20 text-success border-success/20',
  danger: 'bg-danger/20 text-danger border-danger/20',
  primary: 'bg-primary/20 text-primary-light border-primary/20',
  muted: 'bg-white/5 text-text-muted border-border',
}

export const Indicator = forwardRef<HTMLDivElement, IndicatorProps>(
  ({ className, label, value, status, variant = 'muted', ...props }, ref) => {
    return (
      <div ref={ref} className={clsx('flex items-center justify-between', className)} {...props}>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">{label}</span>
          <span className="font-mono font-bold text-sm tracking-tight">{value}</span>
        </div>
        <span className={clsx(
          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border',
          variantStyles[variant]
        )}>
          {status}
        </span>
      </div>
    )
  }
)

Indicator.displayName = 'Indicator'
