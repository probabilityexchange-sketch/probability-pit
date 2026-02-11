import { forwardRef, InputHTMLAttributes } from 'react'
import { clsx } from 'clsx'

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  showValue?: boolean
  formatValue?: (value: number) => string
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ className, label, showValue, formatValue, value, id, ...props }, ref) => {
    const displayValue = value ? (formatValue ? formatValue(Number(value)) : value) : '0'
    
    return (
      <div className="space-y-4">
        {(label || showValue) && (
          <div className="flex justify-between items-center">
            {label && (
              <label htmlFor={id} className="text-xs font-bold uppercase tracking-widest text-text-muted">
                {label}
              </label>
            )}
            {showValue && (
              <span className="text-2xl font-mono font-bold text-white">{displayValue}</span>
            )}
          </div>
        )}
        <input
          ref={ref}
          type="range"
          id={id}
          value={value}
          className={clsx(
            'w-full h-2 bg-border rounded-full appearance-none cursor-pointer',
            '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5',
            '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer',
            '[&::-webkit-slider-thumb]:shadow-glow-primary [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-200',
            '[&::-webkit-slider-thumb]:hover:scale-110',
            className
          )}
          {...props}
        />
      </div>
    )
  }
)

Slider.displayName = 'Slider'
