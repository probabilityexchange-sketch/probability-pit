import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface HeroProps {
  title: ReactNode
  subtitle: string
  badge?: string
  visible?: boolean
}

export function Hero({ title, subtitle, badge, visible = true }: HeroProps) {
  if (!visible) return null

  return (
    <div className="relative flex flex-col justify-center min-h-[40vh] lg:min-h-0">
      {/* Ambient color glow */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-vibrant/8 rounded-full blur-[80px] pointer-events-none" />

      {badge && (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-micro text-primary-light block mb-8"
        >
          {badge}
        </motion.span>
      )}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-glow"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-foreground-secondary mt-8 max-w-md leading-relaxed"
        style={{ fontSize: 'var(--font-body)' }}
      >
        {subtitle}
      </motion.p>
    </div>
  )
}
