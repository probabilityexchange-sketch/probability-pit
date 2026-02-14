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
          className="py-8 md:py-12 border-b border-border bg-bg-surface"
        >
          <Container>
            <div className="max-w-2xl">
              {badge && (
                <motion.div 
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center gap-2 bg-bg-elevated px-3 py-1 rounded-full text-xs font-medium text-foreground-secondary mb-4"
                >
                  {badge}
                </motion.div>
              )}
              <motion.h1 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="font-heading font-bold mb-3"
              >
                {title}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="text-sm md:text-base text-foreground-secondary max-w-xl"
              >
                {subtitle}
              </motion.p>
            </div>
          </Container>
        </motion.header>
      )}
    </AnimatePresence>
  )
}
