import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode
  error?: string
  hint?: string
  prefix?: string
  suffix?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, prefix, suffix, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-micro text-foreground-secondary">
            {label}
          </label>
        )}
        <div className="relative">
          {prefix && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted font-mono text-sm">
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            className={clsx(
              'w-full h-10 bg-bg-elevated border rounded-md text-foreground font-mono text-sm transition-all duration-150 ease-out input-focus',
              'placeholder:text-foreground-muted',
              error ? 'border-danger' : 'border-border',
              prefix && 'pl-7',
              suffix && 'pr-10',
              className
            )}
            {...props}
          />
          {suffix && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted font-mono text-xs">
              {suffix}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-danger">{error}</p>}
        {hint && !error && <p className="text-xs text-foreground-muted">{hint}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
