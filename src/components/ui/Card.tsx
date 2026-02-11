import { forwardRef, HTMLAttributes } from 'react'
import { clsx } from 'clsx'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'hud' | 'elevated' | 'outline'
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const variantStyles = {
  glass: 'bg-bg-card border border-border',
  hud: 'backdrop-blur-xl border border-border bg-gradient-to-b from-bg-card/80 to-bg-sidebar/95',
  elevated: 'bg-bg-elevated border border-border-bright',
  outline: 'bg-transparent border border-border',
}

const paddingStyles = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'glass', hover = false, padding = 'md', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'rounded-2xl relative overflow-hidden transition-all duration-250 ease-smooth',
          variantStyles[variant],
          paddingStyles[padding],
          hover && 'hover:border-border-bright hover:bg-bg-card-hover hover:-translate-y-0.5 hover:shadow-card',
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
