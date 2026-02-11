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
  default: 'bg-[--color-bg-card] border border-[--color-border]',
  muted: 'bg-[--color-bg-muted] border border-[--color-border]',
  outline: 'bg-transparent border border-[--color-border]',
}

const paddingStyles: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = false, padding = 'md', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'rounded-[--radius-lg] relative overflow-hidden transition-[--transition-base]',
          variantStyles[variant],
          paddingStyles[padding],
          hover && 'hover:border-[hsla(217_91%_60%_/_0.3)]',
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
