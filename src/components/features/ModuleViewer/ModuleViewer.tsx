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
        setContent('# Error\n\nFailed to load content.')
      } finally {
        setLoading(false)
      }
    }
    loadContent()
  }, [id])

  return (
    <Container className="py-6 md:py-10 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/academy"
            className="flex items-center gap-2 text-xs font-medium text-[--color-foreground-muted] hover:text-[--color-foreground] transition-[--transition-base]"
          >
            <ArrowLeft size={14} />
            Back to Curriculum
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-8 h-8 border-2 border-[--color-primary]/20 border-t-[--color-primary] rounded-full animate-spin" />
            <span className="text-xs text-[--color-foreground-muted]">Loading...</span>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card variant="muted" className="p-4 md:p-8 overflow-hidden">
              <article className="prose prose-invert max-w-none prose-sm md:prose-base">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-[--color-foreground] border-b border-[--color-border] pb-4">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-lg md:text-xl font-bold mt-8 md:mt-12 mb-4 text-[--color-primary] flex items-center gap-2">
                        <div className="w-1 h-5 bg-[--color-primary] rounded-full shrink-0" />
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-base md:text-lg font-semibold mt-6 md:mt-8 mb-3 text-[--color-foreground]">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-sm md:text-base text-[--color-foreground-muted] leading-relaxed mb-4">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => <ul className="space-y-2 mb-4 list-none">{children}</ul>,
                    li: ({ children }) => (
                      <li className="flex gap-2 items-start text-sm text-[--color-foreground-muted]">
                        <CheckCircle size={14} className="text-[--color-primary] mt-0.5 shrink-0" />
                        <span>{children}</span>
                      </li>
                    ),
                    blockquote: ({ children }) => (
                      <div className="bg-[hsla(217_91%_60%_/_0.1)] border-l-2 border-[--color-primary] p-4 my-6 rounded-r-lg italic text-[--color-primary-light]">
                        {children}
                      </div>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-6 border border-[--color-border] rounded-lg overflow-hidden">
                        <table className="w-full text-left border-collapse bg-[--color-bg-muted] text-sm">{children}</table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className="bg-[--color-bg-card] text-[10px] font-semibold uppercase tracking-wide text-[--color-foreground-muted]">
                        {children}
                      </thead>
                    ),
                    th: ({ children }) => <th className="p-2 md:p-3 border-b border-[--color-border]">{children}</th>,
                    td: ({ children }) => (
                      <td className="p-2 md:p-3 border-b border-[--color-border] text-[--color-foreground-muted]">
                        {children}
                      </td>
                    ),
                    strong: ({ children }) => <strong className="text-[--color-foreground] font-semibold">{children}</strong>,
                    code: ({ children }) => (
                      <code className="bg-[--color-bg-muted] px-1.5 py-0.5 rounded font-mono text-[--color-primary-light] text-xs">
                        {children}
                      </code>
                    ),
                    hr: () => <hr className="border-[--color-border] my-8" />,
                  }}
                >
                  {content}
                </ReactMarkdown>
              </article>

              <div className="mt-8 pt-6 border-t border-[--color-border] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <span className="text-xs text-[--color-foreground-muted]">
                  Module {id} of 4
                </span>
                <Button variant="success" size="sm">
                  <Download size={14} />
                  Download PDF
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        <div className="mt-6 flex justify-between items-center">
          {id > 1 ? (
            <Link to={`/academy/${id - 1}`}>
              <Button variant="secondary" size="sm">
                <ArrowLeft size={14} />
                Previous
              </Button>
            </Link>
          ) : (
            <div />
          )}
          {id < 4 ? (
            <Link to={`/academy/${id + 1}`}>
              <Button size="sm">
                Next
                <ChevronRight size={14} />
              </Button>
            </Link>
          ) : (
            <Link to="/">
              <Button variant="success" size="sm">
                Try Risk Manager
                <ChevronRight size={14} />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Container>
  )
}
