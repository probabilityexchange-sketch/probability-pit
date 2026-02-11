import { forwardRef, ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'ghost' | 'danger' | 'warning'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[--color-primary] text-[--color-primary-foreground] hover:bg-[--color-primary-light]',
  secondary: 'bg-transparent border border-[--color-border] text-[--color-foreground] hover:bg-[--color-bg-muted]',
  success: 'bg-[--color-success] text-[--color-success-foreground] hover:brightness-110',
  ghost: 'bg-transparent text-[--color-foreground-muted] hover:text-[--color-foreground] hover:bg-[--color-bg-muted]',
  danger: 'bg-[--color-danger] text-[--color-danger-foreground]',
  warning: 'bg-[--color-warning] text-[--color-bg-background] hover:brightness-110',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-2.5 text-sm',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center gap-2 rounded-[--radius] font-semibold cursor-pointer border-none font-sans transition-[--transition-base] disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
