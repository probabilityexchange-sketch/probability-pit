import { HTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

export type BadgeVariant = 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'muted'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  dot?: boolean
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-bg-elevated text-foreground',
  primary: 'bg-primary/15 text-primary-light',
  success: 'bg-success/15 text-success',
  danger: 'bg-danger/15 text-danger',
  warning: 'bg-warning/15 text-warning',
  muted: 'bg-bg-elevated text-foreground-muted',
}

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-foreground-muted',
  primary: 'bg-primary-light',
  success: 'bg-success',
  danger: 'bg-danger',
  warning: 'bg-warning',
  muted: 'bg-foreground-muted',
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', dot, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {dot && (
          <span className={clsx('w-1.5 h-1.5 rounded-full', dotColors[variant])} />
        )}
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
