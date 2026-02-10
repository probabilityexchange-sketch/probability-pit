import { useState, useMemo } from 'react'
import {
    Calculator,
    Target,
    AlertCircle,
    ShieldCheck,
    ArrowUpRight,
    TrendingUp,
    Info
} from 'lucide-react'

export function RiskManager() {
    const [yesPrice, setYesPrice] = useState<string>('0.60')
    const [noPrice, setNoPrice] = useState<string>('0.45')
    const [myEstimate, setMyEstimate] = useState<string>('0.65')
    const [bankroll, setBankroll] = useState<string>('1000')

    const stats = useMemo(() => {
        const y = parseFloat(yesPrice) || 0
        const n = parseFloat(noPrice) || 0
        const est = parseFloat(myEstimate) || 0
        const broll = parseFloat(bankroll) || 0

        const sum = y + n
        const vig = sum > 0 ? (sum - 1) : 0
        const vigPercent = vig * 100

        // De-vigged probability
        const deViggedYes = sum > 0 ? (y / sum) : 0

        // Edge calculation
        const edge = est - deViggedYes
        const edgePoints = edge * 100

        // Kelly Criterion
        // b = payout/risk - 1 = (1 - price)/price
        const b = y > 0 ? (1 - y) / y : 0
        const p = est
        const q = 1 - p
        const fullKelly = (b > 0 && p > 0) ? (b * p - q) / b : 0
        const quarterKelly = fullKelly / 4

        // Position sizing
        const suggestedSize = Math.max(0, Math.min(0.1, quarterKelly)) * broll // Cap at 10%

        // EV
        const ev = (p * (1 - y)) - (q * y)

        return {
            vigPercent: vigPercent.toFixed(1),
            deViggedYes: (deViggedYes * 100).toFixed(1),
            edgePoints: edgePoints.toFixed(1),
            quarterKelly: (quarterKelly * 100).toFixed(1),
            suggestedSize: suggestedSize.toFixed(2),
            ev: ev.toFixed(3),
            riskRating: edgePoints > 10 ? 'LOW' : edgePoints > 5 ? 'MODERATE' : 'HIGH'
        }
    }, [yesPrice, noPrice, myEstimate, bankroll])

    return (
        <div className="grid-2">
            {/* Inputs Section */}
            <div className="flex flex-col gap-6">
                <div className="glass-card">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <Calculator size={18} className="text-primary" />
                        Market Data
                    </h3>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-xs font-bold text-text-muted mb-2 uppercase tracking-wider">Yes Price ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={yesPrice}
                                onChange={(e) => setYesPrice(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-text-muted mb-2 uppercase tracking-wider">No Price ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={noPrice}
                                onChange={(e) => setNoPrice(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Your Estimated Probability (0.0 - 1.0)</span>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-mono">{(parseFloat(myEstimate) * 100).toFixed(0)}%</span>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={myEstimate}
                            onChange={(e) => setMyEstimate(e.target.value)}
                            className="accent-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-text-muted mb-2 uppercase tracking-wider">Total Trading Bankroll ($)</label>
                        <input
                            type="number"
                            value={bankroll}
                            onChange={(e) => setBankroll(e.target.value)}
                        />
                    </div>
                </div>

                <div className="glass-card bg-primary/5 border-primary/20">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                            <Info size={20} className="text-primary" />
                        </div>
                        <div>
                            <h4 className="font-bold mb-1 text-primary">Quant Tip</h4>
                            <p className="text-sm text-text-muted leading-relaxed">
                                Always ensure the spread is narrow. If the **Vig** is above 7%, you structurally need a massive information advantage just to fight the "house" tax.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Analysis Section */}
            <div className="flex flex-col gap-6">
                <div className="glass-card border-none bg-white/[0.02]">
                    <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
                        <Target size={18} className="text-success" />
                        Quant Analysis
                    </h3>

                    <div className="space-y-8">
                        {/* Main Stats */}
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <span className="text-xs text-text-muted uppercase font-bold tracking-widest block mb-1">Implied Prob (De-vigged)</span>
                                <span className="text-4xl font-black text-mono">{stats.deViggedYes}%</span>
                            </div>
                            <div>
                                <span className="text-xs text-text-muted uppercase font-bold tracking-widest block mb-1">Exchange Vig</span>
                                <span className={`text-4xl font-black text-mono ${parseFloat(stats.vigPercent) > 7 ? 'text-danger' : 'text-text-main'}`}>
                                    {stats.vigPercent}%
                                </span>
                            </div>
                        </div>

                        <div className="h-px bg-border w-full" />

                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <span className="text-xs text-text-muted uppercase font-bold tracking-widest block mb-1">Estimated Edge</span>
                                <div className="flex items-baseline gap-2">
                                    <span className={`text-4xl font-black text-mono ${parseFloat(stats.edgePoints) > 0 ? 'text-success' : 'text-danger'}`}>
                                        {parseFloat(stats.edgePoints) > 0 ? '+' : ''}{stats.edgePoints}
                                    </span>
                                    <span className="text-sm text-text-muted font-bold">pts</span>
                                </div>
                            </div>
                            <div>
                                <span className="text-xs text-text-muted uppercase font-bold tracking-widest block mb-1">Exp. Value (EV)</span>
                                <span className={`text-4xl font-black text-mono ${parseFloat(stats.ev) > 0 ? 'text-success' : 'text-danger'}`}>
                                    {stats.ev}
                                </span>
                            </div>
                        </div>

                        <div className="h-px bg-border w-full" />

                        {/* Sizing Information */}
                        <div className="bg-bg-dark rounded-xl p-6 border border-white/[0.05]">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-sm font-bold text-white uppercase tracking-widest">Sizing Recommendation</span>
                                <div className={`px-2 py-1 rounded text-[10px] font-black tracking-tighter ${stats.riskRating === 'LOW' ? 'bg-success/20 text-success' :
                                        stats.riskRating === 'MODERATE' ? 'bg-primary/20 text-primary' : 'bg-danger/20 text-danger'
                                    }`}>
                                    {stats.riskRating} RISK
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-4">
                                <div className="flex flex-col">
                                    <span className="text-xs text-text-muted mb-1">Quarter Kelly</span>
                                    <span className="text-2xl font-black text-mono text-primary">{stats.quarterKelly}%</span>
                                </div>
                                <div className="h-10 w-px bg-white/10" />
                                <div className="flex flex-col text-right">
                                    <span className="text-xs text-text-muted mb-1">Suggested Max Stake</span>
                                    <span className="text-2xl font-black text-mono text-white">${stats.suggestedSize}</span>
                                </div>
                            </div>

                            <p className="mt-4 text-[10px] text-text-muted uppercase tracking-widest leading-relaxed">
                                * Position sizing is capped at 10% of bankroll to protect against estimation error.
                            </p>
                        </div>
                    </div>
                </div>

                <button className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${parseFloat(stats.ev) > 0 ? 'bg-success text-bg-dark hover:brightness-110 shadow-[0_0_30px_-5px_var(--success-glow)]' :
                        'bg-white/5 text-text-muted cursor-not-allowed border border-white/10'
                    }`}>
                    {parseFloat(stats.ev) > 0 ? (
                        <>
                            Execute +EV Strategy
                            <ArrowUpRight size={18} />
                        </>
                    ) : 'Structure Not Profitable'}
                </button>
            </div>
        </div>
    )
}
