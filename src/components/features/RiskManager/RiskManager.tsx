import { useState, useMemo } from 'react'
import { ArrowLeft, ChevronRight, HelpCircle, Activity, Zap, Lock, TrendingUp, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Input, Card, Indicator, Tooltip } from '@/components/ui'
import { Container } from '@/components/layout'
import { calculateRisk, RiskCalculation } from '@/lib/calculations'

type Step = 1 | 2 | 3

export function RiskManager() {
  const [step, setStep] = useState<Step>(1)
  const [yesPrice, setYesPrice] = useState<string>('0.60')
  const [noPrice, setNoPrice] = useState<string>('0.45')
  const [myEstimate, setMyEstimate] = useState<string>('0.65')
  const [bankroll, setBankroll] = useState<string>('1000')

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

  return (
    <Container className="py-8 md:py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute top-1/2 left-0 w-full h-px bg-[--color-border] -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-0 h-px bg-[--color-primary] -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />
          {([1, 2, 3] as const).map((s) => (
            <div key={s} className="relative z-10 flex flex-col items-center">
              <div className={`step-dot ${step === s ? 'active' : step > s ? 'complete' : ''}`}>
                {step > s ? '✓' : s}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wide mt-2 ${step >= s ? (s === 1 ? 'text-[--color-primary]' : s === 2 ? 'text-[--color-vibrant]' : 'text-[--color-success]') : 'text-[--color-foreground-secondary]'}`}>
                {s === 1 ? 'Market Data' : s === 2 ? 'Edge Calc' : 'Risk Blueprint'}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold mb-1 text-[--color-primary]">Step 1: The Numbers</h3>
                    <p className="text-sm text-[--color-foreground-secondary]">Enter the current exchange prices.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label={
                        <span className="flex items-center gap-1.5">
                          Yes Price
                          <Tooltip content="Cost to buy a share that pays $1.00 if the event occurs.">
                            <HelpCircle size={12} className="text-[--color-foreground-muted] cursor-help" />
                          </Tooltip>
                        </span>
                      }
                      prefix="$"
                      type="number"
                      step="0.01"
                      value={yesPrice}
                      onChange={(e) => setYesPrice(e.target.value)}
                    />
                    <Input
                      label={
                        <span className="flex items-center gap-1.5">
                          No Price
                          <Tooltip content="Cost to buy a share that pays $1.00 if the event DOES NOT occur.">
                            <HelpCircle size={12} className="text-[--color-foreground-muted] cursor-help" />
                          </Tooltip>
                        </span>
                      }
                      prefix="$"
                      type="number"
                      step="0.01"
                      value={noPrice}
                      onChange={(e) => setNoPrice(e.target.value)}
                    />
                  </div>

                  <Card variant="muted" className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-[--color-foreground-secondary] block mb-0.5">Exchange Vig (Fee)</span>
                      <span className={`text-xl font-mono font-bold ${calc.vig > 7 ? 'text-[--color-danger]' : 'text-[--color-success]'}`}>
                        {calc.vig}%
                      </span>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-[--color-foreground-secondary] block mb-0.5">Market Implied Prob</span>
                      <span className="text-xl font-mono font-bold">
                        {calc.deVigged}%
                      </span>
                    </div>
                  </Card>

                  <Button onClick={nextStep} className="w-full">
                    Next: Calculate Edge
                    <ChevronRight size={16} />
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold mb-1 text-[--color-vibrant]">Step 2: Define Your Alpha</h3>
                    <p className="text-sm text-[--color-foreground-secondary]">What is the *real* probability of this event?</p>
                  </div>

                  <div className="space-y-4">
                    <Card variant="muted" className="text-center">
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-[--color-vibrant] block mb-3">Your Estimated Probability</span>
                      <span className="text-4xl md:text-5xl font-mono font-bold text-[--color-vibrant] text-glow-vibrant">{(parseFloat(myEstimate) * 100).toFixed(0)}%</span>
                      <div className="mt-6 px-2">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={myEstimate}
                          onChange={(e) => setMyEstimate(e.target.value)}
                          className="w-full h-2 bg-[--color-border] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[--color-vibrant] [&::-webkit-slider-thumb]:cursor-pointer"
                        />
                      </div>
                    </Card>

                    <div className={`p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${calc.edge > 0 ? 'bg-[hsla(142_71%_55%_/_0.1)] border border-[hsla(142_71%_55%_/_0.2)]' : 'bg-[hsla(0_84%_70%_/_0.1)] border border-[hsla(0_84%_70%_/_0.2)]'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${calc.edge > 0 ? 'bg-[hsla(142_71%_55%_/_0.2)] text-[--color-success]' : 'bg-[hsla(0_84%_70%_/_0.2)] text-[--color-danger]'}`}>
                          {calc.edge > 0 ? <Zap size={16} /> : <AlertCircle size={16} />}
                        </div>
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-[--color-foreground-secondary] block">Edge over Market</span>
                          <span className="text-lg font-mono font-bold">
                            {calc.edge > 0 ? '+' : ''}{calc.edge} pts
                          </span>
                        </div>
                      </div>
                      <span className={`text-sm font-semibold ${calc.edge > 0 ? 'text-[--color-success]' : 'text-[--color-danger]'}`}>
                        {calc.edge > 0 ? '+EV Setup Detected' : 'No Statistical Advantage'}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={prevStep} variant="secondary" className="flex-1">
                      <ArrowLeft size={14} />
                      Back
                    </Button>
                    <Button onClick={nextStep} variant="success" className="flex-[2]">
                      Finalize Risk Blueprint
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-1 text-[--color-success]">The Risk Blueprint</h3>
                    <p className="text-sm text-[--color-foreground-secondary]">How you should execute this trade to maximize Expected Value.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Card variant="muted" className="space-y-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-[--color-foreground-secondary] block">Optimal Stake</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-mono font-bold text-[--color-primary]">{calc.kelly}%</span>
                        <span className="text-xs text-[--color-foreground-secondary]">of bankroll</span>
                      </div>
                      <p className="text-[10px] text-[--color-foreground-secondary]">Quarter-Kelly sizing</p>
                    </Card>

                    <Card variant="muted" className="space-y-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-[--color-foreground-secondary] block">Expected Value</span>
                      <div className="flex items-baseline gap-1">
                        <span className={`text-2xl font-mono font-bold text-glow-success ${calc.ev > 0 ? 'text-[--color-success]' : 'text-[--color-danger]'}`}>
                          {calc.ev}
                        </span>
                        <span className="text-xs text-[--color-foreground-secondary]">per contract</span>
                      </div>
                      <p className="text-[10px] text-[--color-foreground-secondary]">Statistical profit expectation</p>
                    </Card>
                  </div>

                  <Card variant="outline" className="bg-[hsla(217,33%,17%,0.5)]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold uppercase tracking-wide text-[--color-primary-light]">Bankroll Logic</span>
                      <TrendingUp size={14} className="text-[--color-primary-light]" />
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="w-full sm:flex-1">
                        <Input
                          label="Total Bankroll"
                          prefix="$"
                          type="number"
                          value={bankroll}
                          onChange={(e) => setBankroll(e.target.value)}
                        />
                      </div>
                      <div className="w-full sm:flex-1 sm:text-right">
                        <span className="text-[10px] font-semibold text-[--color-foreground-secondary] uppercase tracking-wide block mb-0.5">Max Position Buy</span>
                        <span className="text-2xl font-mono font-bold text-glow-primary">${calc.size}</span>
                      </div>
                    </div>
                  </Card>

                  <div className="flex gap-3">
                    <Button onClick={() => setStep(1)} variant="secondary" className="flex-1">
                      Reset Analysis
                    </Button>
                    <Button 
                      variant={calc.isProfitable ? 'primary' : 'secondary'}
                      className="flex-[2]"
                      disabled={!calc.isProfitable}
                    >
                      {calc.isProfitable ? 'Execute Tactical Trade' : 'Setup Not Recommended'}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <Card variant="muted" padding="lg">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="text-[--color-primary]" size={16} />
                <span className="text-xs font-semibold uppercase tracking-wide">Real-Time Indicators</span>
              </div>
              <div className="space-y-4">
                <Indicator
                  label="Information Edge"
                  value={`${calc.edge} pts`}
                  status={calc.edge > 10 ? 'Elite' : calc.edge > 0 ? 'Active' : 'Negative'}
                  variant={calc.edge > 0 ? 'success' : 'danger'}
                />
                <Indicator
                  label="Vig Resistance"
                  value={`${calc.vig}%`}
                  status={calc.vig < 4 ? 'Low' : calc.vig < 7 ? 'Fair' : 'Toxic'}
                  variant={calc.vig < 7 ? 'primary' : 'danger'}
                />
                <Indicator
                  label="Volatility Index"
                  value="Medium"
                  status="Standard"
                  variant="muted"
                />
              </div>
            </Card>

            <div className="card-insight">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[--color-warning] flex items-center justify-center shrink-0">
                  <Lock size={14} className="text-[--color-bg-background]" />
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-[--color-warning] block mb-1">Senior Trader Note</span>
                  <p className="text-xs text-[--color-foreground-secondary] leading-relaxed">
                    "If your Edge isn't at least 2× the Vig, the exchange is eating your profit before you've even entered."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
