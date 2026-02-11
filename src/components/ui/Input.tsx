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
          <label htmlFor={id} className="block text-xs font-medium text-[--color-foreground-muted]">
            {label}
          </label>
        )}
        <div className="relative">
          {prefix && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[--color-foreground-muted] font-mono text-sm">
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            className={clsx(
              'w-full bg-[--color-bg-muted] border rounded-[--radius] text-[--color-foreground] py-2.5 px-3 font-mono text-sm transition-[--transition-base]',
              'focus:outline-none focus:border-[--color-ring] focus:shadow-[0_0_0_2px_hsla(217_91%_67%_/_0.2)]',
              'placeholder:text-[--color-foreground-muted]',
              error ? 'border-[--color-danger]' : 'border-[--color-border-input]',
              prefix && 'pl-7',
              suffix && 'pr-10',
              className
            )}
            {...props}
          />
          {suffix && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[--color-foreground-muted] font-mono text-xs">
              {suffix}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-[--color-danger]">{error}</p>}
        {hint && !error && <p className="text-xs text-[--color-foreground-muted]">{hint}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
