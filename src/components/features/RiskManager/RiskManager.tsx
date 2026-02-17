import { useState, useMemo } from 'react'
import { ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { calculateRisk, RiskCalculation } from '@/lib/calculations'

type Step = 1 | 2 | 3

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] },
})

export function RiskManager() {
  const [step, setStep] = useState<Step>(1)
  const [yesPrice, setYesPrice] = useState('0.60')
  const [noPrice, setNoPrice] = useState('0.45')
  const [myEstimate, setMyEstimate] = useState('0.65')
  const [bankroll, setBankroll] = useState('1000')

  const calc = useMemo<RiskCalculation>(() => {
    return calculateRisk(
      parseFloat(yesPrice) || 0,
      parseFloat(noPrice) || 0,
      parseFloat(myEstimate) || 0,
      parseFloat(bankroll) || 0
    )
  }, [yesPrice, noPrice, myEstimate, bankroll])

  const nextStep = () => setStep(s => Math.min(s + 1, 3) as Step)
  const prevStep = () => setStep(s => Math.max(s - 1, 1) as Step)

  const stepLabels = ['Market Data', 'Your Edge', 'Risk Blueprint'] as const

  return (
    <div className="space-y-0">
      {/* Step indicator — with active color accent */}
      <div className="flex items-center gap-6 mb-10">
        {stepLabels.map((label, i) => (
          <button
            key={label}
            onClick={() => setStep((i + 1) as Step)}
            className={`text-[10px] uppercase tracking-[0.2em] transition-premium flex items-center gap-2 ${
              step === i + 1 ? 'text-primary-light' : 'text-foreground-muted hover:text-foreground-secondary'
            }`}
          >
            {step === i + 1 && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-subtle" />}
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {step === 1 && (
            <div className="space-y-0">
              {/* Price inputs */}
              <div className="group border-t border-border-glass p-8 hover:bg-bg-surface/50 transition-premium">
                <span className="text-[10px] uppercase tracking-[0.2em] text-foreground-muted block mb-6">
                  Contract Prices
                </span>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="text-label block mb-2">Yes</label>
                    <div className="relative">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 text-foreground-muted font-mono text-sm">$</span>
                      <input
                        type="number"
                        step="0.01"
                        value={yesPrice}
                        onChange={(e) => setYesPrice(e.target.value)}
                        className="w-full bg-transparent border-none outline-none text-2xl font-mono font-medium text-foreground pl-4 py-1"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-label block mb-2">No</label>
                    <div className="relative">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 text-foreground-muted font-mono text-sm">$</span>
                      <input
                        type="number"
                        step="0.01"
                        value={noPrice}
                        onChange={(e) => setNoPrice(e.target.value)}
                        className="w-full bg-transparent border-none outline-none text-2xl font-mono font-medium text-foreground pl-4 py-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Derived metrics */}
              <motion.div {...stagger(1)} className="grid grid-cols-2">
                <div className="border-t border-border-glass p-8">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-foreground-muted block mb-3">Exchange Vig</span>
                  <span className={`text-3xl font-mono font-medium ${calc.vig > 7 ? 'text-danger' : 'text-foreground'}`}>
                    {calc.vig}%
                  </span>
                </div>
                <div className="border-t border-border-glass p-8">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-foreground-muted block mb-3">Implied Prob</span>
                  <span className="text-3xl font-mono font-medium">{calc.deVigged}%</span>
                </div>
              </motion.div>

              {/* Continue */}
              <motion.div {...stagger(2)} className="border-t border-border-glass">
                <button
                  onClick={nextStep}
                  className="w-full p-6 text-left group flex items-center justify-between hover:bg-primary/5 transition-premium"
                >
                  <span className="text-[11px] uppercase tracking-[0.15em] text-foreground group-hover:text-primary-light transition-premium font-medium">
                    Continue to Edge Analysis
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-premium" />
                </button>
              </motion.div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-0">
              {/* Estimate slider */}
              <div className="border-t border-border-glass p-8">
                <span className="text-[10px] uppercase tracking-[0.2em] text-foreground-muted block mb-8">
                  Your Probability Estimate
                </span>
                <div className="text-center mb-8">
                  <span className="text-6xl font-mono font-medium text-foreground">
                    {(parseFloat(myEstimate) * 100).toFixed(0)}
                  </span>
                  <span className="text-xl font-mono text-foreground-muted ml-1">%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={myEstimate}
                  onChange={(e) => setMyEstimate(e.target.value)}
                  className="w-full h-px bg-border-bright appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-[0_0_16px_rgba(99,102,241,0.4)]"
                />
              </div>

              {/* Edge readout */}
              <motion.div {...stagger(1)} className="border-t border-border-glass p-8 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-foreground-muted block mb-3">Statistical Edge</span>
                  <span className={`text-3xl font-mono font-medium ${calc.edge > 0 ? 'text-success' : 'text-foreground-muted'}`}>
                    {calc.edge > 0 ? '+' : ''}{calc.edge} pts
                  </span>
                </div>
                {calc.edge > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-subtle" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-success">Active</span>
                  </div>
                )}
              </motion.div>

              {/* Navigation */}
              <motion.div {...stagger(2)} className="grid grid-cols-[auto_1fr] border-t border-border-glass">
                <button
                  onClick={prevStep}
                  className="p-6 border-r border-border-glass text-foreground-muted hover:text-foreground hover:bg-bg-surface/50 transition-premium"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={nextStep}
                  className="p-6 text-left group flex items-center justify-between hover:bg-primary/5 transition-premium"
                >
                  <span className="text-[11px] uppercase tracking-[0.15em] text-foreground group-hover:text-primary-light transition-premium font-medium">
                    View Risk Blueprint
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-premium" />
                </button>
              </motion.div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-0">
              {/* Kelly + EV */}
              <div className="grid grid-cols-2">
                <div className="border-t border-border-glass p-8">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-foreground-muted block mb-3">Optimal Allocation</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-mono font-medium">{calc.kelly}%</span>
                    <span className="text-label">Kelly</span>
                  </div>
                </div>
                <div className="border-t border-border-glass p-8">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-foreground-muted block mb-3">Expected Value</span>
                  <span className={`text-4xl font-mono font-medium ${calc.ev > 0 ? 'text-success' : 'text-danger'}`}>
                    {calc.ev}
                  </span>
                </div>
              </div>

              {/* Bankroll + Position */}
              <motion.div {...stagger(1)} className="border-t border-border-glass p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
                  <div>
                    <label className="text-label block mb-2">Bankroll</label>
                    <div className="relative">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 text-foreground-muted font-mono text-sm">$</span>
                      <input
                        type="number"
                        value={bankroll}
                        onChange={(e) => setBankroll(e.target.value)}
                        className="bg-transparent border-none outline-none text-2xl font-mono font-medium text-foreground pl-4 py-1 w-40"
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-foreground-muted block mb-3">Position Size</span>
                    <span className="text-4xl font-mono font-medium text-foreground">${calc.size}</span>
                  </div>
                </div>
              </motion.div>

              {/* Indicators sidebar — collapsed into inline row */}
              <motion.div {...stagger(2)} className="border-t border-border-glass p-8 grid grid-cols-3 gap-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-foreground-muted block mb-2">Alpha</span>
                  <span className={`font-mono text-sm font-medium ${calc.edge > 0 ? 'text-success' : 'text-foreground-muted'}`}>
                    {calc.edge > 10 ? 'Premium' : calc.edge > 0 ? 'Confirmed' : 'None'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-foreground-muted block mb-2">Vig Level</span>
                  <span className={`font-mono text-sm font-medium ${calc.vig < 7 ? 'text-foreground' : 'text-danger'}`}>
                    {calc.vig < 4 ? 'Optimal' : calc.vig < 7 ? 'Standard' : 'High'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-foreground-muted block mb-2">Signal</span>
                  <span className="font-mono text-sm font-medium text-foreground-muted">Systemic</span>
                </div>
              </motion.div>

              {/* Doctrine */}
              <motion.div {...stagger(3)} className="border-t border-border-glass p-8">
                <p className="text-[11px] text-foreground-muted/60 leading-relaxed italic max-w-md">
                  "If your edge does not exceed the exchange take by 2x, the risk is asymmetric to the downside."
                </p>
              </motion.div>

              {/* Actions */}
              <motion.div {...stagger(4)} className="grid grid-cols-[auto_1fr] border-t border-border-glass">
                <button
                  onClick={() => setStep(1)}
                  className="p-6 border-r border-border-glass text-foreground-secondary hover:text-foreground hover:bg-bg-elevated transition-premium text-[11px] uppercase tracking-[0.15em] font-medium"
                >
                  Reset
                </button>
                <button
                  disabled={!calc.isProfitable}
                  className={`p-6 text-left text-[11px] uppercase tracking-[0.15em] transition-premium font-medium ${
                    calc.isProfitable
                      ? 'text-success hover:bg-success/5'
                      : 'text-foreground-muted/40 cursor-not-allowed'
                  }`}
                >
                  {calc.isProfitable ? 'Execute Position' : 'Insufficient Edge'}
                </button>
              </motion.div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
