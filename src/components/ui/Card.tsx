import { forwardRef, HTMLAttributes } from 'react'
import { clsx } from 'clsx'

export type CardVariant = 'default' | 'muted' | 'outline'
export type CardPadding = 'none' | 'sm' | 'md' | 'lg'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  hover?: boolean
  padding?: CardPadding
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-bg-surface border-border',
  muted: 'bg-bg-elevated border-border',
  outline: 'bg-transparent border-border',
}

const paddingStyles: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = false, padding = 'md', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'rounded-xl border relative overflow-hidden transition-all duration-150 ease-out',
          variantStyles[variant],
          paddingStyles[padding],
          hover && 'card-hover cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
