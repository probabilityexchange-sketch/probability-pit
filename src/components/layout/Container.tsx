import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface ContainerProps {
  children: ReactNode
  className?: string
  size?: 'default' | 'sm' | 'lg' | 'full'
}

const sizeStyles = {
  sm: 'max-w-3xl',
  default: 'max-w-7xl',
  lg: 'max-w-[1400px]',
  full: 'max-w-none',
}

export function Container({ children, className, size = 'default' }: ContainerProps) {
  return (
    <div className={clsx(
      'mx-auto px-4 sm:px-6 md:px-8 lg:px-10',
      sizeStyles[size],
      className
    )}>
      {children}
    </div>
  )
}
