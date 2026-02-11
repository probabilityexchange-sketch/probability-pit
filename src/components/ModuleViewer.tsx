import { useState, useEffect } from 'react'
import {
    ArrowLeft,
    FileText,
    Play,
    ChevronRight,
    Download,
    CheckCircle,
    Clock,
    ExternalLink
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { motion } from 'framer-motion'

interface ModuleViewerProps {
    moduleId: number;
    onBack: () => void;
}

const moduleFiles = [
    'module-01-casino-vs-exchange.md',
    'module-02-inch-wide-mile-deep.md',
    'module-03-the-toolkit.md',
    'module-04-execution-and-risk.md'
]

export function ModuleViewer({ moduleId, onBack }: ModuleViewerProps) {
    const [content, setContent] = useState<string>('')
    const [loading, setLoading] = useState(true)
    const [viewMode, setViewMode] = useState<'guide' | 'script'>('guide')

    useEffect(() => {
        async function loadContent() {
            setLoading(true)
            try {
                const fileName = moduleFiles[moduleId - 1]
                const response = await fetch(`/curriculum/modules/${fileName}`)
                const text = await response.text()
                setContent(text)
            } catch (err) {
                console.error('Failed to load module content:', err)
                setContent('# Error\nFailed to load content. Please ensure the curriculum files are in the public folder.')
            } finally {
                setLoading(false)
            }
        }
        loadContent()
    }, [moduleId])

    // Split content into Script and Guide based on the separators in the markdown files
    const splitContent = (raw: string) => {
        const parts = raw.split('## PART B — TEXT GUIDE')
        return {
            script: parts[0]?.replace('# MODULE', '## MODULE') || '',
            guide: parts[1] ? `## TEXT GUIDE ${parts[1]}` : ''
        }
    }

    const { script, guide } = splitContent(content)

    return (
        <div className="max-w-4xl mx-auto pb-20">
            {/* Top Header */}
            <div className="flex items-center justify-between mb-12">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-text-muted hover:text-white transition-colors group"
                >
                    <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center group-hover:border-white/20 transition-all">
                        <ArrowLeft size={14} />
                    </div>
                    Back to Curriculum
                </button>

                <div className="flex gap-2 p-1 bg-black/40 rounded-xl border border-white/5">
                    <button
                        onClick={() => setViewMode('guide')}
                        className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'guide' ? 'bg-primary text-white shadow-lg' : 'text-text-muted hover:text-white'}`}
                    >
                        Study Guide
                    </button>
                    <button
                        onClick={() => setViewMode('script')}
                        className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'script' ? 'bg-primary text-white shadow-lg' : 'text-text-muted hover:text-white'}`}
                    >
                        Video Script
                    </button>
                </div>
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
                    className="glass-card bg-bg-sidebar/50 p-12 overflow-hidden border-white/5"
                >
                    <article className="prose prose-invert max-w-none">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h1: ({ children }) => <h1 className="text-4xl font-black mb-12 text-white border-b border-white/5 pb-8">{children}</h1>,
                                h2: ({ children }) => <h2 className="text-2xl font-black mt-16 mb-8 text-primary uppercase tracking-tighter flex items-center gap-3">
                                    <div className="w-2 h-8 bg-primary rounded-full shrink-0" />
                                    {children}
                                </h2>,
                                h3: ({ children }) => <h3 className="text-xl font-bold mt-12 mb-6 text-white">{children}</h3>,
                                p: ({ children }) => <p className="text-lg text-text-secondary leading-relaxed mb-6 font-medium">{children}</p>,
                                ul: ({ children }) => <ul className="space-y-4 mb-8 list-none">{children}</ul>,
                                li: ({ children }) => <li className="flex gap-4 items-start text-text-secondary">
                                    <CheckCircle size={18} className="text-primary mt-1 shrink-0" />
                                    <span>{children}</span>
                                </li>,
                                blockquote: ({ children }) => (
                                    <div className="bg-primary/5 border-l-4 border-primary p-8 my-10 rounded-r-2xl italic text-xl text-primary-light font-medium tracking-tight">
                                        {children}
                                    </div>
                                ),
                                table: ({ children }) => (
                                    <div className="overflow-x-auto my-12 border border-white/5 rounded-2xl overflow-hidden">
                                        <table className="w-full text-left border-collapse bg-black/20">
                                            {children}
                                        </table>
                                    </div>
                                ),
                                thead: ({ children }) => <thead className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-text-muted">{children}</thead>,
                                th: ({ children }) => <th className="p-4 border-b border-white/5">{children}</th>,
                                td: ({ children }) => <td className="p-4 border-b border-white/5 text-sm font-medium text-text-secondary">{children}</td>,
                                strong: ({ children }) => <strong className="text-white font-black">{children}</strong>,
                                code: ({ children }) => <code className="bg-white/5 px-2 py-0.5 rounded font-mono text-primary-light text-sm">{children}</code>
                            }}
                        >
                            {viewMode === 'guide' ? guide : script}
                        </ReactMarkdown>
                    </article>

                    {/* Action Footer */}
                    <div className="mt-20 pt-12 border-t border-white/10 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-bg-card bg-bg-dark" />)}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">1.2k Quant students active</span>
                        </div>
                        <button className="btn btn-primary bg-success hover:bg-success-light flex items-center gap-2">
                            <Download size={18} />
                            Download PDF Resources
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    )
}
