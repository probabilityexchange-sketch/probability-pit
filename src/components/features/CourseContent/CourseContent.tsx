import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, ChevronDown, ChevronUp, ExternalLink, Play, FileText } from 'lucide-react'
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
      variant="glass" 
      padding="none" 
      hover 
      className={`overflow-hidden transition-all ${isExpanded ? 'border-primary/40' : ''}`}
    >
      <button
        onClick={onToggle}
        className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-6 text-left gap-4"
      >
        <div className="flex items-center gap-4 md:gap-6">
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-black border-2 shrink-0 ${isExpanded ? 'bg-primary border-primary text-white' : 'border-white/10 text-white/40'}`}>
            0{module.id}
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold">{module.title}</h3>
            <p className="text-xs md:text-sm text-text-muted mt-1 hidden sm:block">{module.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 ml-14 sm:ml-0">
          <Badge variant="muted">{module.duration}</Badge>
          {isExpanded ? <ChevronUp className="text-text-muted" /> : <ChevronDown className="text-text-muted" />}
        </div>
      </button>
      <p className="text-sm text-text-muted px-6 pb-4 sm:hidden">{module.description}</p>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-4 md:px-6 pb-6 md:pb-8 border-t border-white/5 pt-6 md:pt-8 bg-white/[0.01]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4 md:mb-6">Key Concepts</h4>
                  <div className="space-y-3 md:space-y-4">
                    {module.concepts.map((concept, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-success shrink-0" />
                        <span className="text-sm font-medium">{concept}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3">
                    <Link to={`/academy/${module.id}`}>
                      <Button size="sm" className="w-full sm:w-auto">
                        <FileText size={14} />
                        Study Module
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="bg-bg-dark/50 rounded-xl p-4 md:p-6 border border-white/5">
                  <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">Required Reference Tools</h4>
                  <div className="space-y-3">
                    {module.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-white/10"
                      >
                        <span className="text-sm font-semibold">{link.label}</span>
                        <ExternalLink size={14} className="text-text-muted group-hover:text-primary transition-colors" />
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
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Quant Academy</h2>
          <p className="text-text-secondary">Master the mathematical frameworks of elite prediction market participants.</p>
        </div>

        <div className="flex flex-col gap-4">
          {modules.map((mod) => (
            <ModuleCard
              key={mod.id}
              module={mod}
              isExpanded={expandedId === mod.id}
              onToggle={() => setExpandedId(expandedId === mod.id ? null : mod.id)}
            />
          ))}
        </div>

        <Card className="mt-12 md:mt-16 relative overflow-hidden border-primary/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl font-bold mb-4">Final Objective: Niche Specialization</h3>
            <p className="text-text-muted mb-6 md:mb-8 max-w-2xl">
              The course doesn't end with reading. Your task is to pick one illiquid niche and trade it for 30 days using only primary data sources. Document your Edge, calculate your EV, and stick to Quarter-Kelly sizing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-0">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-text-muted uppercase mb-1">Success Rate Target</span>
                <span className="text-xl font-black text-success">55-60%</span>
              </div>
              <div className="hidden sm:block w-px h-10 bg-white/10 mx-4" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-text-muted uppercase mb-1">Bankroll Drawdown Limit</span>
                <span className="text-xl font-black text-danger">20%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  )
}
