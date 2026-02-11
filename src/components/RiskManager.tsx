import { useState, useMemo } from 'react'
import {
    Calculator,
    Target,
    AlertCircle,
    ShieldCheck,
    ArrowRight,
    ArrowLeft,
    TrendingUp,
    Info,
    ChevronRight,
    HelpCircle,
    Activity,
    Zap,
    Lock,
    PieChart
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type Step = 1 | 2 | 3;

export function RiskManager() {
    const [step, setStep] = useState<Step>(1)
    const [yesPrice, setYesPrice] = useState<string>('0.60')
    const [noPrice, setNoPrice] = useState<string>('0.45')
    const [myEstimate, setMyEstimate] = useState<string>('0.65')
    const [bankroll, setBankroll] = useState<string>('1000')

    const calc = useMemo(() => {
        const y = parseFloat(yesPrice) || 0
        const n = parseFloat(noPrice) || 0
        const est = parseFloat(myEstimate) || 0
        const broll = parseFloat(bankroll) || 0

        const sum = y + n
        const vig = sum > 0 ? (sum - 1) : 0
        const deViggedYes = sum > 0 ? (y / sum) : 0
        const edge = est - deViggedYes
        const b = y > 0 ? (1 - y) / y : 0
        const q = 1 - est
        const fullKelly = (b > 0 && est > 0) ? (b * est - q) / b : 0
        const quarterKelly = fullKelly / 4
        const suggestedSize = Math.max(0, Math.min(0.1, quarterKelly)) * broll
        const ev = (est * (1 - y)) - (q * y)

        return {
            vig: (vig * 100).toFixed(1),
            deVigged: (deViggedYes * 100).toFixed(1),
            edge: (edge * 100).toFixed(1),
            kelly: (quarterKelly * 100).toFixed(1),
            size: suggestedSize.toFixed(2),
            ev: ev.toFixed(3),
            isProfitable: ev > 0 && edge > (vig * 0.5)
        }
    }, [yesPrice, noPrice, myEstimate, bankroll])

    const nextStep = () => setStep(s => Math.min(s + 1, 3) as Step)
    const prevStep = () => setStep(s => Math.max(s - 1, 1) as Step)

    return (
        <div className="max-w-5xl mx-auto">
            {/* Progress Track */}
            <div className="flex items-center justify-between mb-16 relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" />
                <div
                    className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-500"
                    style={{ width: `${((step - 1) / 2) * 100}%` }}
                />

                {[1, 2, 3].map((s) => (
                    <div key={s} className="relative z-10 flex flex-col items-center">
                        <div className={`step-dot ${step === s ? 'active' : step > s ? 'complete' : ''}`}>
                            {step > s ? '✓' : s}
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest mt-3 ${step >= s ? 'text-primary' : 'text-text-muted'}`}>
                            {s === 1 ? 'Market Data' : s === 2 ? 'Edge Calc' : 'Risk Blueprint'}
                        </span>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Step Content */}
                <div className="lg:col-span-7">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-8"
                            >
                                <div>
                                    <h3 className="text-3xl font-black mb-2">Step 1: The Numbers</h3>
                                    <p className="text-text-secondary">Enter the current exchange prices. These define the market's current "opinion."</p>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-text-muted">
                                            Yes Price
                                            <Tooltip text="The cost to buy a share that pays $1.00 if the event occurs." />
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-mono">$</span>
                                            <input
                                                type="number"
                                                className="pl-8"
                                                value={yesPrice}
                                                onChange={(e) => setYesPrice(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-text-muted">
                                            No Price
                                            <Tooltip text="The cost to buy a share that pays $1.00 if the event DOES NOT occur." />
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-mono">$</span>
                                            <input
                                                type="number"
                                                className="pl-8"
                                                value={noPrice}
                                                onChange={(e) => setNoPrice(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="glass-card bg-bg-sidebar border-white/5 p-6 flex justify-between items-center">
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-text-muted block mb-1">Exchange Vig (Fee)</span>
                                        <span className={`text-2xl font-mono font-black ${parseFloat(calc.vig) > 7 ? 'text-danger' : 'text-success'}`}>
                                            {calc.vig}%
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-text-muted block mb-1">Market Implied Prob</span>
                                        <span className="text-2xl font-mono font-black text-text-main">
                                            {calc.deVigged}%
                                        </span>
                                    </div>
                                </div>

                                <button onClick={nextStep} className="btn btn-primary w-full py-5 text-lg">
                                    Next: Calculate Edge
                                    <ChevronRight className="ml-2" />
                                </button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-8"
                            >
                                <div>
                                    <h3 className="text-3xl font-black mb-2">Step 2: Define Your Alpha</h3>
                                    <p className="text-text-secondary">Based on your Level 3/4 research, what is the *real* probability of this event?</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-bg-sidebar rounded-2xl p-8 border border-white/5 text-center">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-primary block mb-4">Your Estimated Probability</span>
                                        <span className="text-7xl font-mono font-black text-white">{(parseFloat(myEstimate) * 100).toFixed(0)}%</span>
                                        <div className="mt-8 px-4">
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.01"
                                                value={myEstimate}
                                                onChange={(e) => setMyEstimate(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className={`p-6 rounded-xl border flex items-center justify-between ${parseFloat(calc.edge) > 0 ? 'bg-success/5 border-success/20' : 'bg-danger/5 border-danger/20'}`}>
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${parseFloat(calc.edge) > 0 ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'}`}>
                                                {parseFloat(calc.edge) > 0 ? <Zap /> : <AlertCircle />}
                                            </div>
                                            <div>
                                                <span className="text-xs font-black uppercase tracking-widest opacity-60">Edge over Market</span>
                                                <h4 className="text-xl font-black font-mono">
                                                    {parseFloat(calc.edge) > 0 ? '+' : ''}{calc.edge} pts
                                                </h4>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs font-black uppercase tracking-widest opacity-60 block">Status</span>
                                            <span className={`text-sm font-bold ${parseFloat(calc.edge) > 0 ? 'text-success' : 'text-danger'}`}>
                                                {parseFloat(calc.edge) > 0 ? '+EV Setup Detected' : 'No Statistical Advantage'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button onClick={prevStep} className="btn btn-outline py-5 flex-1">
                                        <ArrowLeft className="mr-2" size={18} />
                                        Back
                                    </button>
                                    <button onClick={nextStep} className="btn btn-primary py-5 flex-[2] bg-success hover:bg-success-light">
                                        Finalize Risk Blueprint
                                        <ChevronRight className="ml-2" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-8"
                            >
                                <div className="text-center mb-10">
                                    <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                                        <ShieldCheck size={14} />
                                        Diagnostic Complete
                                    </div>
                                    <h3 className="text-4xl font-black mb-2">The Risk Blueprint</h3>
                                    <p className="text-text-secondary">Here is exactly how you should execute this trade to maximize Expected Value.</p>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="glass-card bg-bg-sidebar border-white/5 space-y-4">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-text-muted block">Optimal Stake</span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl font-mono font-black text-primary">{calc.kelly}%</span>
                                            <span className="text-sm font-bold text-text-muted">of bankroll</span>
                                        </div>
                                        <p className="text-[10px] text-text-muted leading-relaxed uppercase">Computed via Quarter-Kelly to protect against estimation error.</p>
                                    </div>

                                    <div className="glass-card bg-bg-sidebar border-white/5 space-y-4">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-text-muted block">Expected Value</span>
                                        <div className="flex items-baseline gap-2">
                                            <span className={`text-4xl font-mono font-black ${parseFloat(calc.ev) > 0 ? 'text-success' : 'text-danger'}`}>
                                                {calc.ev}
                                            </span>
                                            <span className="text-sm font-bold text-text-muted">per contract</span>
                                        </div>
                                        <p className="text-[10px] text-text-muted leading-relaxed uppercase">Statistically predicted profit over infinite repetitions.</p>
                                    </div>
                                </div>

                                <div className="glass-card border-none bg-white/[0.03]">
                                    <div className="flex justify-between items-center mb-6">
                                        <h4 className="font-black uppercase tracking-widest text-xs">Bankroll Logic</h4>
                                        <TrendingUp size={16} className="text-text-muted" />
                                    </div>
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="flex-1">
                                            <label className="text-[10px] font-black text-text-muted uppercase tracking-widest block mb-2">Total Bankroll</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-text-muted">$</span>
                                                <input
                                                    type="number"
                                                    className="pl-8 bg-black/40"
                                                    value={bankroll}
                                                    onChange={(e) => setBankroll(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1 text-right">
                                            <span className="text-[10px] font-black text-text-muted uppercase tracking-widest block mb-1">Max Position Buy</span>
                                            <span className="text-3xl font-mono font-black text-white">${calc.size}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button onClick={() => setStep(1)} className="btn btn-outline py-5 flex-1">
                                        Reset Analysis
                                    </button>
                                    <button className={`btn py-5 flex-[2] text-lg font-black uppercase tracking-tighter transition-all ${calc.isProfitable ? 'btn-primary shadow-[0_0_30px_var(--primary-glow)]' : 'bg-white/5 text-text-muted cursor-not-allowed'}`}>
                                        {calc.isProfitable ? 'Execute Tactical Trade' : 'Setup Not Recommended'}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Sidebar Help / HUD */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="glass-card border-none bg-bg-sidebar">
                        <div className="flex items-center gap-3 mb-6">
                            <Activity className="text-primary" size={20} />
                            <h4 className="font-black uppercase tracking-widest text-sm">Real-Time Indicators</h4>
                        </div>

                        <div className="space-y-6">
                            <Indicator
                                label="Information Edge"
                                value={`${calc.edge} pts`}
                                status={parseFloat(calc.edge) > 10 ? 'Elite' : parseFloat(calc.edge) > 0 ? 'Active' : 'Negative'}
                                color={parseFloat(calc.edge) > 0 ? 'success' : 'danger'}
                            />
                            <Indicator
                                label="Vig Resistance"
                                value={`${calc.vig}%`}
                                status={parseFloat(calc.vig) < 4 ? 'Low' : parseFloat(calc.vig) < 7 ? 'Fair' : 'Toxic'}
                                color={parseFloat(calc.vig) < 7 ? 'primary' : 'danger'}
                            />
                            <Indicator
                                label="Volatility Index"
                                value="Medium"
                                status="Standard"
                                color="muted"
                            />
                        </div>
                    </div>

                    <div className="glass-card bg-primary/5 border-primary/20">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                <Lock size={18} className="text-primary" />
                            </div>
                            <div>
                                <h4 className="font-black text-xs uppercase tracking-widest mb-1 text-primary">Senior Trader Note</h4>
                                <p className="text-xs text-text-secondary leading-relaxed">
                                    "If your Edge isn't at least 2x the Vig, the exchange is eating your profit before you've even entered. Don't trade for the sake of excitement. Trade for the numbers."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Tooltip({ text }: { text: string }) {
    return (
        <div className="group relative">
            <HelpCircle size={12} className="text-text-muted cursor-help hover:text-white transition-colors" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-bg-card border border-border rounded-lg text-[10px] text-text-secondary leading-normal opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-2xl">
                {text}
            </div>
        </div>
    )
}

function Indicator({ label, value, status, color }: { label: string, value: string, status: string, color: 'success' | 'danger' | 'primary' | 'muted' }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">{label}</span>
                <span className="font-mono font-bold text-sm tracking-tight">{value}</span>
            </div>
            <span className={`status-badge border-black/20 ${color === 'success' ? 'bg-success/20 text-success' :
                    color === 'danger' ? 'bg-danger/20 text-danger' :
                        color === 'primary' ? 'bg-primary/20 text-primary' : 'bg-white/5 text-text-muted'
                }`}>
                {status}
            </span>
        </div>
    )
}
