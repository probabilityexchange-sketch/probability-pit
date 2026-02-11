import { HTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

export type BadgeVariant = 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'muted'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  dot?: boolean
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-[--color-bg-muted] text-[--color-foreground]',
  primary: 'bg-[hsla(217_91%_60%_/_0.15)] text-[--color-primary-light]',
  success: 'bg-[hsla(142_71%_55%_/_0.15)] text-[--color-success]',
  danger: 'bg-[hsla(0_84%_70%_/_0.15)] text-[--color-danger]',
  warning: 'bg-[hsla(38_92%_60%_/_0.15)] text-[--color-warning]',
  muted: 'bg-[--color-bg-muted] text-[--color-foreground-muted]',
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
          <span className={clsx(
            'w-1.5 h-1.5 rounded-full',
            variant === 'success' && 'bg-[--color-success]',
            variant === 'danger' && 'bg-[--color-danger]',
            variant === 'primary' && 'bg-[--color-primary-light]',
            variant === 'warning' && 'bg-[--color-warning]',
            (variant === 'default' || variant === 'muted') && 'bg-[--color-foreground-muted]'
          )} />
        )}
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
