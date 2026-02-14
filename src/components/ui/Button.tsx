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
  primary: 'bg-primary text-white hover:brightness-110 active:brightness-95',
  secondary: 'bg-transparent border border-border text-foreground-secondary hover:bg-bg-elevated hover:text-foreground active:bg-bg-muted',
  success: 'bg-success text-white hover:brightness-110 active:brightness-95',
  ghost: 'bg-transparent text-foreground-secondary hover:text-foreground hover:bg-bg-elevated active:bg-bg-muted',
  danger: 'bg-danger text-white hover:brightness-110 active:brightness-95',
  warning: 'bg-warning text-[hsl(222_47%_7%)] hover:brightness-110 active:brightness-95',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-sm',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center gap-2 rounded-md font-semibold cursor-pointer border-none transition-all duration-150 ease-out disabled:opacity-50 disabled:cursor-not-allowed btn-active',
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
