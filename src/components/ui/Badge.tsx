import { HTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

export type BadgeVariant = 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'muted'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  dot?: boolean
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-white/5 text-text-secondary border-border',
  primary: 'bg-primary/20 text-primary-light border-primary/30',
  success: 'bg-success/20 text-success-light border-success/30',
  danger: 'bg-danger/20 text-danger-light border-danger/30',
  warning: 'bg-warning/20 text-warning border-warning/30',
  muted: 'bg-white/5 text-text-muted border-border',
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', dot, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {dot && (
          <span className={clsx(
            'w-1.5 h-1.5 rounded-full',
            variant === 'success' && 'bg-success-light',
            variant === 'danger' && 'bg-danger-light',
            variant === 'primary' && 'bg-primary-light',
            variant === 'warning' && 'bg-warning',
            (variant === 'default' || variant === 'muted') && 'bg-text-muted'
          )} />
        )}
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
