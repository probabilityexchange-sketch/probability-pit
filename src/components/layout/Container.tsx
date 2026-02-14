import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface ContainerProps {
  children: ReactNode
  className?: string
  size?: 'default' | 'sm' | 'lg' | 'full'
}

const sizeStyles = {
  sm: 'max-w-3xl',
  default: 'max-w-[1200px]',
  lg: 'max-w-[1400px]',
  full: 'max-w-none',
}

export function Container({ children, className, size = 'default' }: ContainerProps) {
  return (
    <div className={clsx(
      'mx-auto px-4 md:px-6',
      sizeStyles[size],
      className
    )}>
      {children}
    </div>
  )
}
