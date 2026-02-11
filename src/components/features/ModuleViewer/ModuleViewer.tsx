import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ChevronRight, Download, CheckCircle } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { motion } from 'framer-motion'
import { Button, Card } from '@/components/ui'
import { Container } from '@/components/layout'

const moduleFiles = [
  'module-01-casino-vs-exchange.md',
  'module-02-inch-wide-mile-deep.md',
  'module-03-the-toolkit.md',
  'module-04-execution-and-risk.md',
]

export function ModuleViewer() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(true)

  const id = parseInt(moduleId || '1', 10)

  useEffect(() => {
    async function loadContent() {
      setLoading(true)
      try {
        const fileName = moduleFiles[id - 1]
        const response = await fetch(`/curriculum/modules/${fileName}`)
        const text = await response.text()
        setContent(text)
      } catch (err) {
        console.error('Failed to load module content:', err)
        setContent('# Error\n\nFailed to load content. Please ensure the curriculum files are in the public folder.')
      } finally {
        setLoading(false)
      }
    }
    loadContent()
  }, [id])

  return (
    <Container className="py-8 md:py-12 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 md:mb-12">
          <Link
            to="/academy"
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-text-muted hover:text-white transition-colors group"
          >
            <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center group-hover:border-white/20 transition-all">
              <ArrowLeft size={14} />
            </div>
            Back to Curriculum
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <span className="text-xs font-black uppercase tracking-widest text-text-muted">Decrypting Alpha...</span>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card variant="hud" className="p-6 md:p-12 overflow-hidden border-white/5">
              <article className="prose prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl md:text-4xl font-black mb-8 md:mb-12 text-white border-b border-white/5 pb-6 md:pb-8">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl md:text-2xl font-black mt-12 md:mt-16 mb-6 md:mb-8 text-primary uppercase tracking-tighter flex items-center gap-3">
                        <div className="w-2 h-6 md:h-8 bg-primary rounded-full shrink-0" />
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg md:text-xl font-bold mt-8 md:mt-12 mb-4 md:mb-6 text-white">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-4 md:mb-6 font-medium">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8 list-none">{children}</ul>,
                    li: ({ children }) => (
                      <li className="flex gap-3 md:gap-4 items-start text-text-secondary">
                        <CheckCircle size={18} className="text-primary mt-0.5 md:mt-1 shrink-0" />
                        <span>{children}</span>
                      </li>
                    ),
                    blockquote: ({ children }) => (
                      <div className="bg-primary/5 border-l-4 border-primary p-6 md:p-8 my-8 md:my-10 rounded-r-2xl italic text-lg md:text-xl text-primary-light font-medium tracking-tight">
                        {children}
                      </div>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-8 md:my-12 border border-white/5 rounded-2xl overflow-hidden">
                        <table className="w-full text-left border-collapse bg-black/20">{children}</table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-text-muted">
                        {children}
                      </thead>
                    ),
                    th: ({ children }) => <th className="p-3 md:p-4 border-b border-white/5">{children}</th>,
                    td: ({ children }) => (
                      <td className="p-3 md:p-4 border-b border-white/5 text-sm font-medium text-text-secondary">
                        {children}
                      </td>
                    ),
                    strong: ({ children }) => <strong className="text-white font-black">{children}</strong>,
                    code: ({ children }) => (
                      <code className="bg-white/5 px-2 py-0.5 rounded font-mono text-primary-light text-sm">
                        {children}
                      </code>
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </article>

              <div className="mt-12 md:mt-20 pt-8 md:pt-12 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-bg-card bg-bg-dark" />
                    ))}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">
                    1.2k Quant students active
                  </span>
                </div>
                <Button variant="success">
                  <Download size={18} />
                  Download PDF Resources
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        <div className="mt-8 flex justify-between items-center">
          {id > 1 ? (
            <Link to={`/academy/${id - 1}`}>
              <Button variant="secondary">
                <ArrowLeft size={16} className="mr-2" />
                Previous Module
              </Button>
            </Link>
          ) : (
            <div />
          )}
          {id < 4 ? (
            <Link to={`/academy/${id + 1}`}>
              <Button>
                Next Module
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </Link>
          ) : (
            <Link to="/">
              <Button variant="success">
                Try Risk Manager
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Container>
  )
}
