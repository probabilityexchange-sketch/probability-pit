import { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers } from 'lucide-react'
import { Container } from './Container'

interface HeroProps {
  title: ReactNode
  subtitle: string
  badge?: string
  children?: ReactNode
  visible?: boolean
}

export function Hero({ title, subtitle, badge, children, visible = true }: HeroProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="py-12 sm:py-16 md:py-24 border-b border-border bg-bg-sidebar/50 relative overflow-hidden shrink-0"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(37,99,235,0.08),transparent_50%)]" />
          <Container className="relative z-10">
            <div className="max-w-4xl">
              {badge && (
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] mb-6 md:mb-8">
                  <Layers size={14} className="text-primary" />
                  {badge}
                </div>
              )}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-6 md:mb-8 leading-[0.9] tracking-tighter">
                {title}
              </h1>
              <p className="text-lg sm:text-xl text-text-secondary mb-8 md:mb-10 max-w-2xl leading-relaxed font-medium">
                {subtitle}
              </p>
              {children}
            </div>
          </Container>
        </motion.header>
      )}
    </AnimatePresence>
  )
}
