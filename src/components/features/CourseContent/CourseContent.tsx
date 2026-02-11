import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, ChevronDown, ChevronUp, ExternalLink, FileText, Target, BookOpen, Search, ShieldCheck, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Card, Badge } from '@/components/ui'
import { Container } from '@/components/layout'
import { modules, Module } from '@/lib/calculations'

const moduleFlourishes = [
  { color: 'var(--color-primary)', icon: BookOpen, accent: 'blue' },
  { color: 'var(--color-info)', icon: Search, accent: 'cyan' },
  { color: 'var(--color-vibrant)', icon: Target, accent: 'purple' },
  { color: 'var(--color-warning)', icon: ShieldCheck, accent: 'orange' },
]

interface ModuleCardProps {
  module: Module
  isExpanded: boolean
  onToggle: () => void
  flourish: typeof moduleFlourishes[0]
}

function ModuleCard({ module, isExpanded, onToggle, flourish }: ModuleCardProps) {
  const Icon = flourish.icon
  
  return (
    <Card 
      variant="default" 
      padding="none" 
      hover 
      className={`overflow-hidden group ${isExpanded ? 'border-primary/40 ring-1 ring-primary/20' : ''}`}
    >
      {/* ProbEx subtle scanline for expanded cards */}
      {isExpanded && <div className="absolute inset-0 scanline-overlay opacity-20" />}
      
      <button
        onClick={onToggle}
        className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 text-left gap-4 relative z-20"
      >
        <div className="flex items-center gap-5">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center font-bold border shrink-0 transition-all duration-300"
            style={{ 
              backgroundColor: isExpanded ? flourish.color : 'transparent',
              borderColor: isExpanded ? flourish.color : 'var(--color-border)',
              color: isExpanded ? 'var(--color-bg-background)' : flourish.color,
              boxShadow: isExpanded ? `0 0 15px ${flourish.color}66` : 'none'
            }}
          >
            <Icon size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Module 0{module.id}</span>
              <div className="w-1 h-1 rounded-full bg-border" />
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: flourish.color }}>{flourish.accent}</span>
            </div>
            <h3 className="text-base font-bold tracking-tight mt-0.5 group-hover:text-primary-light transition-colors">{module.title}</h3>
          </div>
        </div>
        <div className="flex items-center gap-3 ml-14 sm:ml-0">
          <Badge variant="muted" className="bg-transparent border-border">{module.duration}</Badge>
          <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-primary' : 'text-foreground-secondary'}`}>
            <ChevronDown size={18} />
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="px-5 pb-6 border-t border-border pt-6 bg-gradient-to-b from-[hsla(217,33%,17%,0.2)] to-transparent relative z-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: flourish.color }}>Core Learning Objectives</h4>
                    <div className="space-y-3">
                      {module.concepts.map((concept, idx) => (
                        <div key={idx} className="flex items-start gap-3 group/item">
                          <div className="mt-1 w-1.5 h-1.5 rounded-full shrink-0 group-hover/item:scale-125 transition-transform" style={{ backgroundColor: flourish.color }} />
                          <span className="text-xs font-medium text-foreground-muted leading-relaxed group-hover/item:text-foreground transition-colors">{concept}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link to={`/academy/${module.id}`}>
                      <Button 
                        size="md" 
                        className="w-full sm:w-auto shadow-lg shadow-primary/10"
                        style={{ backgroundColor: flourish.color, color: 'var(--color-bg-background)' }}
                      >
                        <FileText size={16} />
                        Access Module Materials
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="bg-bg-background/40 rounded-xl p-5 border border-border backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <h4 className="text-[10px] font-bold text-foreground-secondary uppercase tracking-widest">Platform Prerequisites</h4>
                  </div>
                  <div className="space-y-2">
                    {module.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group/link flex items-center justify-between p-2.5 rounded-lg border border-transparent hover:border-border hover:bg-bg-muted transition-all text-xs"
                      >
                        <span className="font-semibold text-foreground-muted group-hover/link:text-primary-light">{link.label}</span>
                        <ExternalLink size={14} className="text-foreground-secondary group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

export function CourseContent() {
  const [expandedId, setExpandedId] = useState<number | null>(1)

  return (
    <Container className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="max-w-2xl mb-12 relative">
          <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-info to-transparent rounded-full opacity-50" />
          <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
            Academy <span className="text-primary opacity-50">/</span> Curriculum
          </h2>
          <p className="text-base text-foreground-muted leading-relaxed">
            The fundamental architecture of prediction markets, decoded for quantitative participants. Staged progression from market theory to clinical execution.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {modules.map((mod, idx) => (
            <ModuleCard
              key={mod.id}
              module={mod}
              flourish={moduleFlourishes[idx % moduleFlourishes.length]}
              isExpanded={expandedId === mod.id}
              onToggle={() => setExpandedId(expandedId === mod.id ? null : mod.id)}
            />
          ))}
        </div>

        {/* Final Objective Card with Flourish */}
        <div className="mt-12 card-insight">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Zap size={120} strokeWidth={1} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="primary" className="bg-warning/20 text-warning border-warning/20">Final Phase</Badge>
            </div>
            <h3 className="text-xl font-bold mb-3">Niche Specialization Objective</h3>
            <p className="text-sm text-foreground-muted mb-6 max-w-2xl leading-relaxed">
              Upon completion of the theoretical modules, the protocol transitions to the 30-day specialization challenge. Participants are required to isolate an illiquid niche and maintain a verified trade log.
            </p>
            <div className="grid grid-cols-2 sm:flex gap-8">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-warning uppercase tracking-widest mb-1">Target Win-Rate</span>
                <span className="text-2xl font-mono font-bold">55.0<span className="text-sm opacity-50">%</span></span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-danger uppercase tracking-widest mb-1">Max Drawdown</span>
                <span className="text-2xl font-mono font-bold text-danger">20.0<span className="text-sm opacity-50">%</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
