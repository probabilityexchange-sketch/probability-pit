import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, ChevronDown, ChevronUp, ExternalLink, FileText } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Card, Badge } from '@/components/ui'
import { Container } from '@/components/layout'
import { modules, Module } from '@/lib/calculations'

interface ModuleCardProps {
  module: Module
  isExpanded: boolean
  onToggle: () => void
}

function ModuleCard({ module, isExpanded, onToggle }: ModuleCardProps) {
  return (
    <Card 
      variant="default" 
      padding="none" 
      hover 
      className={`overflow-hidden ${isExpanded ? 'border-[hsla(217_91%_60%_/_0.3)]' : ''}`}
    >
      <button
        onClick={onToggle}
        className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 text-left gap-3"
      >
        <div className="flex items-center gap-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border shrink-0 text-sm ${isExpanded ? 'bg-[--color-primary] border-[--color-primary] text-[--color-primary-foreground]' : 'border-[--color-border] text-[--color-foreground-muted]'}`}>
            {module.id}
          </div>
          <div>
            <h3 className="text-sm font-semibold">{module.title}</h3>
            <p className="text-xs text-[--color-foreground-muted] mt-0.5 hidden sm:block">{module.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-12 sm:ml-0">
          <Badge variant="muted">{module.duration}</Badge>
          {isExpanded ? <ChevronUp size={16} className="text-[--color-foreground-muted]" /> : <ChevronDown size={16} className="text-[--color-foreground-muted]" />}
        </div>
      </button>
      <p className="text-xs text-[--color-foreground-muted] px-4 pb-3 sm:hidden">{module.description}</p>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-4 pb-4 border-t border-[--color-border] pt-4 bg-[--color-bg-muted]/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-[10px] font-semibold text-[--color-primary] uppercase tracking-wide mb-3">Key Concepts</h4>
                  <div className="space-y-2">
                    {module.concepts.map((concept, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-[--color-success] shrink-0" />
                        <span className="text-xs">{concept}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <Link to={`/academy/${module.id}`}>
                      <Button size="sm">
                        <FileText size={12} />
                        Study Module
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="bg-[--color-bg-background] rounded-lg p-3 border border-[--color-border]">
                  <h4 className="text-[10px] font-semibold text-[--color-foreground-muted] uppercase tracking-wide mb-2">Reference Tools</h4>
                  <div className="space-y-1.5">
                    {module.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between p-2 rounded bg-[--color-bg-muted] hover:bg-[--color-bg-card] transition-[--transition-base] text-xs"
                      >
                        <span className="font-medium">{link.label}</span>
                        <ExternalLink size={12} className="text-[--color-foreground-muted] group-hover:text-[--color-primary]" />
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
    <Container className="py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Quant Academy</h2>
          <p className="text-sm text-[--color-foreground-muted]">Master the mathematical frameworks of elite prediction market participants.</p>
        </div>

        <div className="flex flex-col gap-3">
          {modules.map((mod) => (
            <ModuleCard
              key={mod.id}
              module={mod}
              isExpanded={expandedId === mod.id}
              onToggle={() => setExpandedId(expandedId === mod.id ? null : mod.id)}
            />
          ))}
        </div>

        <Card className="mt-8 relative overflow-hidden border-[hsla(217_91%_60%_/_0.2)]">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[hsla(217_91%_60%_/_0.1)] blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-2">Final Objective: Niche Specialization</h3>
            <p className="text-sm text-[--color-foreground-muted] mb-4 max-w-xl">
              Pick one illiquid niche and trade it for 30 days using only primary data sources. Document your Edge, calculate your EV, and stick to Quarter-Kelly sizing.
            </p>
            <div className="flex gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold text-[--color-foreground-muted] uppercase mb-0.5">Success Rate Target</span>
                <span className="text-lg font-bold text-[--color-success]">55-60%</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold text-[--color-foreground-muted] uppercase mb-0.5">Drawdown Limit</span>
                <span className="text-lg font-bold text-[--color-danger]">20%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  )
}
