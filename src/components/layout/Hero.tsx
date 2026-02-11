import { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from './Container'

interface HeroProps {
  title: ReactNode
  subtitle: string
  badge?: string
  visible?: boolean
}

export function Hero({ title, subtitle, badge, visible = true }: HeroProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="py-8 md:py-12 border-b border-[--color-border] bg-[--color-bg-card]"
        >
          <Container>
            <div className="max-w-3xl">
              {badge && (
                <div className="inline-flex items-center gap-2 bg-[--color-bg-muted] px-3 py-1 rounded-full text-xs font-medium text-[--color-foreground-muted] mb-4">
                  {badge}
                </div>
              )}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 tracking-tight">
                {title}
              </h1>
              <p className="text-sm md:text-base text-[--color-foreground-muted] max-w-2xl">
                {subtitle}
              </p>
            </div>
          </Container>
        </motion.header>
      )}
    </AnimatePresence>
  )
}
