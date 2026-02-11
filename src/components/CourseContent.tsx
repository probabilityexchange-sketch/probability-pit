import { useState } from 'react'
import {
    CheckCircle2,
    Circle,
    Play,
    FileText,
    ChevronDown,
    ChevronUp,
    ExternalLink
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type Module = {
    id: number;
    title: string;
    description: string;
    concepts: string[];
    links: { label: string; url: string }[];
}

const modules: Module[] = [
    {
        id: 1,
        title: "The Casino vs. The Exchange",
        description: "Break the gambler's mindset. Learn how the market translates events into prices and why the 'Vig' is your primary obstacle.",
        concepts: ["Implied Probability Formula", "De-vigging Strategy", "Expected Value (EV)"],
        links: [
            { label: "Kalshi (US Regulated)", url: "https://kalshi.com" },
            { label: "Polymarket (Crypto-native)", url: "https://polymarket.com" }
        ]
    },
    {
        id: 2,
        title: "The 'Inch-Wide, Mile-Deep' Strategy",
        description: "Stop trading national elections. Find your edge in illiquid niches like weather, state-level politics, or tech dev cycles.",
        concepts: ["Local Information Asymmetry", "Niche Selection", "The 7-Day Specialty Challenge"],
        links: [
            { label: "Meteorology Models", url: "https://tropicaltidbits.com" },
            { label: "NWS Technical Forecasts", url: "https://weather.gov" }
        ]
    },
    {
        id: 3,
        title: "The Quant Toolkit",
        description: "Professional-grade data sources. Stop reading headlines; start reading primary data and technical discussion.",
        concepts: ["Technical Forecast Discussions", "GitHub Commit Tracking", "270toWin Scenarios"],
        links: [
            { label: "RealClearPolitics Hub", url: "https://realclearpolitics.com" },
            { label: "PACER Legal Filing Tracking", url: "https://pacer.uscourts.gov" }
        ]
    },
    {
        id: 4,
        title: "Execution & Risk Management",
        description: "The math of survival. Position sizing using Quarter-Kelly and spotting cross-platform arbitrage.",
        concepts: ["The Kelly Criterion", "Arbitrage Execution", "Emotional Drawdown Guards"],
        links: [
            { label: "Risk Manager Tool", url: "#" }
        ]
    }
]

interface CourseContentProps {
    onSelectModule: (id: number) => void;
}

export function CourseContent({ onSelectModule }: CourseContentProps) {
    const [expandedId, setExpandedId] = useState<number | null>(1)

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex flex-col gap-4">
                {modules.map((mod) => (
                    <div key={mod.id} className={`glass-card p-0 overflow-hidden transition-all ${expandedId === mod.id ? 'border-primary/40' : 'hover:border-white/10'}`}>
                        <button
                            onClick={() => setExpandedId(expandedId === mod.id ? null : mod.id)}
                            className="w-full flex items-center justify-between p-6 text-left"
                        >
                            <div className="flex items-center gap-6">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black border-2 ${expandedId === mod.id ? 'bg-primary border-primary text-white' : 'border-white/10 text-white/40'}`}>
                                    0{mod.id}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">{mod.title}</h3>
                                    <p className="text-sm text-text-muted mt-1">{mod.description}</p>
                                </div>
                            </div>
                            {expandedId === mod.id ? <ChevronUp className="text-text-muted" /> : <ChevronDown className="text-text-muted" />}
                        </button>

                        <AnimatePresence>
                            {expandedId === mod.id && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <div className="px-6 pb-8 border-t border-white/5 pt-8 bg-white/[0.01]">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                            <div>
                                                <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-6">Key Concepts</h4>
                                                <div className="space-y-4">
                                                    {mod.concepts.map((concept, idx) => (
                                                        <div key={idx} className="flex items-center gap-3">
                                                            <CheckCircle2 size={16} className="text-success" />
                                                            <span className="text-sm font-medium">{concept}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="mt-8 flex gap-3">
                                                    <button
                                                        onClick={() => onSelectModule(mod.id)}
                                                        className="btn btn-primary py-2 text-xs flex items-center gap-2"
                                                    >
                                                        <Play size={14} className="fill-current" />
                                                        Play Video Lesson
                                                    </button>
                                                    <button
                                                        onClick={() => onSelectModule(mod.id)}
                                                        className="btn btn-outline py-2 text-xs flex items-center gap-2"
                                                    >
                                                        <FileText size={14} />
                                                        Read Text Guide
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="bg-bg-dark/50 rounded-xl p-6 border border-white/5">
                                                <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">Required Reference Tools</h4>
                                                <div className="space-y-3">
                                                    {mod.links.map((link, idx) => (
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
                    </div>
                ))}
            </div>

            <div className="mt-16 bg-bg-card rounded-2xl p-8 border border-primary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4">Final Objective: Niche Specialization</h3>
                    <p className="text-text-muted mb-8 max-w-2xl">
                        The course doesn't end with reading. Your task is to pick one illiquid niche and trade it for 30 days using only primary data sources. Document your Edge, calculate your EV, and stick to Quarter-Kelly sizing.
                    </p>
                    <div className="flex gap-4">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-text-muted uppercase mb-1">Success Rate Target</span>
                            <span className="text-xl font-black text-success">55-60%</span>
                        </div>
                        <div className="w-px h-10 bg-white/10 mx-4" />
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-text-muted uppercase mb-1">Bankroll Drawdown Limit</span>
                            <span className="text-xl font-black text-danger">20%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
