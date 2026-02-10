import { useState, useMemo } from 'react'
import {
    Calculator,
    BookOpen,
    TrendingUp,
    ShieldCheck,
    ChevronRight,
    ArrowUpRight,
    Target,
    AlertCircle
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiskManager } from './components/RiskManager'
import { CourseContent } from './components/CourseContent'

function App() {
    const [activeTab, setActiveTab] = useState<'tool' | 'course'>('tool')

    return (
        <div className="min-h-screen">
            {/* Navigation */}
            <nav className="border-b border-border py-4 sticky top-0 bg-bg-dark/80 backdrop-blur-xl z-50">
                <div className="container flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                            <TrendingUp className="text-white w-5 h-5" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">
                            PROBABILITY<span className="text-primary font-black">PIT</span>
                        </span>
                    </div>

                    <div className="flex gap-1 bg-white/5 p-1 rounded-lg">
                        <button
                            onClick={() => setActiveTab('tool')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${activeTab === 'tool' ? 'bg-primary text-white shadow-lg' : 'text-text-muted hover:text-white'}`}
                        >
                            <Calculator size={18} />
                            <span className="font-medium text-sm">Risk Manager</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('course')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${activeTab === 'course' ? 'bg-primary text-white shadow-lg' : 'text-text-muted hover:text-white'}`}
                        >
                            <BookOpen size={18} />
                            <span className="font-medium text-sm">Curriculum</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="py-20 border-b border-border relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="container relative z-10">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1]">
                                Stop Gambling. <br />
                                <span className="text-gradient">Start Trading Probabilities.</span>
                            </h1>
                            <p className="text-xl text-text-muted mb-8 max-w-2xl leading-relaxed">
                                A senior quant's guide to Prediction Markets. Learn to price risk, detect mispriced numbers, and manage capital with mathematical discipline.
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setActiveTab('course')}
                                    className="btn btn-primary"
                                >
                                    Start The Course
                                    <ChevronRight size={20} className="ml-1" />
                                </button>
                                <div className="flex items-center gap-4 px-4 py-2 bg-success/10 border border-success/20 rounded-lg text-success text-sm font-semibold">
                                    <ShieldCheck size={16} />
                                    +EV STRATEGY
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="py-16 bg-bg-dark">
                <div className="container">
                    <AnimatePresence mode="wait">
                        {activeTab === 'tool' ? (
                            <motion.div
                                key="tool"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="mb-10">
                                    <h2 className="text-3xl font-bold mb-2">Quant Risk Manager</h2>
                                    <p className="text-text-muted">Analyze your trade idea. Calculate the vig, de-vigged probability, and optimal sizing.</p>
                                </div>
                                <RiskManager />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="course"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <CourseContent />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-border py-12 bg-bg-card/50">
                <div className="container">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <TrendingUp className="text-primary w-5 h-5" />
                                <span className="font-bold text-lg tracking-tight">
                                    PROBABILITY<span className="text-primary font-black">PIT</span>
                                </span>
                            </div>
                            <p className="text-text-muted text-sm max-w-xs">
                                Premium quantitative education for decentralized prediction markets.
                            </p>
                        </div>

                        <div className="flex gap-12 text-sm">
                            <div className="flex flex-col gap-3">
                                <span className="text-white font-semibold">Niches</span>
                                <a href="#" className="text-text-muted hover:text-primary transition-colors">Weather</a>
                                <a href="#" className="text-text-muted hover:text-primary transition-colors">Politics</a>
                                <a href="#" className="text-text-muted hover:text-primary transition-colors">Tech/Crypto</a>
                            </div>
                            <div className="flex flex-col gap-3">
                                <span className="text-white font-semibold">Legal</span>
                                <a href="#" className="text-text-muted hover:text-primary transition-colors">Risk Disclosure</a>
                                <a href="#" className="text-text-muted hover:text-primary transition-colors">Terms</a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-border flex justify-between items-center text-xs text-text-muted">
                        <p>&copy; 2026 THE PROBABILITY PIT. NOT FINANCIAL ADVICE.</p>
                        <p>STRICTLY MATHEMATICAL ANALYSIS.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default App
