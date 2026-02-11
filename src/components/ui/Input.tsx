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
      <div className="space-y-2">
        {label && (
          <label htmlFor={id} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-muted">
            {label}
          </label>
        )}
        <div className="relative">
          {prefix && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-mono">
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            className={clsx(
              'w-full bg-black/20 border rounded-xl text-white p-4 font-mono text-lg transition-all duration-250 ease-smooth',
              'focus:outline-none focus:border-primary focus:bg-primary/5 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.1)]',
              error ? 'border-danger' : 'border-border',
              prefix && 'pl-8',
              suffix && 'pr-12',
              className
            )}
            {...props}
          />
          {suffix && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted font-mono text-sm">
              {suffix}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-danger font-medium">{error}</p>}
        {hint && !error && <p className="text-xs text-text-muted">{hint}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
