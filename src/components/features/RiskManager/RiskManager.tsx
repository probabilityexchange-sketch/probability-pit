import { useState, useMemo } from 'react'
import { ArrowLeft, ChevronRight, HelpCircle, Activity, Zap, Lock, TrendingUp, AlertCircle, Info } from 'lucide-react'
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
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-12 relative">
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
              <span className={`text-[10px] font-bold uppercase tracking-wider mt-3 ${step >= s ? 'text-[--color-primary]' : 'text-[--color-foreground-secondary]'}`}>
                {s === 1 ? 'Market Data' : s === 2 ? 'Edge Calc' : 'Risk Blueprint'}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-6 bg-[--color-primary] rounded-full" />
                    <h3 className="text-xl font-bold tracking-tight">Step 1: The Numbers</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label={<div className="flex items-center gap-1.5">Yes Price <Tooltip content="Current cost of YES shares"><HelpCircle size={12}/></Tooltip></div>}
                      prefix="$"
                      type="number"
                      step="0.01"
                      value={yesPrice}
                      onChange={(e) => setYesPrice(e.target.value)}
                    />
                    <Input
                      label={<div className="flex items-center gap-1.5">No Price <Tooltip content="Current cost of NO shares"><HelpCircle size={12}/></Tooltip></div>}
                      prefix="$"
                      type="number"
                      step="0.01"
                      value={noPrice}
                      onChange={(e) => setNoPrice(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Card variant="muted" padding="sm">
                      <span className="text-[10px] font-bold uppercase text-[--color-foreground-secondary] block mb-1">Exchange Vig</span>
                      <span className={`text-xl font-mono font-bold ${calc.vig > 7 ? 'text-[--color-danger]' : 'text-[--color-success]'}`}>
                        {calc.vig}%
                      </span>
                    </Card>
                    <Card variant="muted" padding="sm">
                      <span className="text-[10px] font-bold uppercase text-[--color-foreground-secondary] block mb-1">Implied Probability</span>
                      <span className="text-xl font-mono font-bold">{calc.deVigged}%</span>
                    </Card>
                  </div>

                  <Button onClick={nextStep} className="w-full h-12 text-base">
                    Continue to Alpha Definition
                    <ChevronRight size={18} className="ml-1" />
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-6 bg-[--color-primary] rounded-full" />
                    <h3 className="text-xl font-bold tracking-tight">Step 2: Define Your Alpha</h3>
                  </div>

                  <Card variant="muted" className="text-center py-10">
                    <span className="text-[10px] font-bold uppercase text-[--color-primary] block mb-4 tracking-widest">Your Estimated Probability</span>
                    <span className="text-6xl font-mono font-bold">{(parseFloat(myEstimate) * 100).toFixed(0)}%</span>
                    <div className="mt-8 px-4">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={myEstimate}
                        onChange={(e) => setMyEstimate(e.target.value)}
                        className="w-full h-1.5 bg-[--color-border] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[--color-primary]"
                      />
                    </div>
                  </Card>

                  {/* High Contrast Insight Card for Edge */}
                  <div className={`card-insight flex items-center justify-between transition-colors ${calc.edge > 0 ? 'bg-[--color-warning-muted]' : 'grayscale opacity-50'}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[--color-warning] flex items-center justify-center text-[--color-bg-background]">
                        <Zap size={20} fill="currentColor" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase text-[--color-warning] block">Edge over Market</span>
                        <span className="text-xl font-mono font-bold text-[--color-warning]">
                          {calc.edge > 0 ? '+' : ''}{calc.edge} pts
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-[--color-warning] uppercase tracking-tighter">
                        {calc.edge > 0 ? 'Statistical Advantage' : 'No Value Detected'}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={prevStep} variant="secondary" className="flex-1 h-12">
                      <ArrowLeft size={18} className="mr-1" /> Back
                    </Button>
                    <Button onClick={nextStep} variant="success" className="flex-[2] h-12">
                      Finalize Risk Blueprint
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
                  <div className="text-center py-4">
                    <h3 className="text-2xl font-bold tracking-tight mb-2">The Risk Blueprint</h3>
                    <p className="text-sm text-[--color-foreground-secondary]">Optimized execution strategy based on mathematical expected value.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Card variant="default" className="border-t-2 border-t-[--color-primary]">
                      <span className="text-[10px] font-bold uppercase text-[--color-foreground-secondary] block mb-2">Optimal Stake</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-mono font-bold text-[--color-primary]">{calc.kelly}%</span>
                        <span className="text-xs text-[--color-foreground-secondary]">of bankroll</span>
                      </div>
                    </Card>
                    <Card variant="default" className={`border-t-2 ${calc.ev > 0 ? 'border-t-[--color-success]' : 'border-t-[--color-danger]'}`}>
                      <span className="text-[10px] font-bold uppercase text-[--color-foreground-secondary] block mb-2">Expected Value</span>
                      <div className="flex items-baseline gap-1">
                        <span className={`text-3xl font-mono font-bold ${calc.ev > 0 ? 'text-[--color-success]' : 'text-[--color-danger]'}`}>
                          {calc.ev}
                        </span>
                        <span className="text-xs text-[--color-foreground-secondary]">per contract</span>
                      </div>
                    </Card>
                  </div>

                  <Card variant="muted" className="bg-[hsla(217,33%,17%,0.3)]">
                    <div className="flex items-center gap-2 mb-4 text-[--color-foreground-secondary]">
                      <TrendingUp size={14} />
                      <span className="text-xs font-bold uppercase">Bankroll Management</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-end gap-6">
                      <div className="w-full">
                        <Input
                          label="Total Available Bankroll"
                          prefix="$"
                          type="number"
                          value={bankroll}
                          onChange={(e) => setBankroll(e.target.value)}
                        />
                      </div>
                      <div className="w-full text-right pb-1">
                        <span className="text-[10px] font-bold text-[--color-foreground-secondary] uppercase block mb-1">Max Position Buy</span>
                        <span className="text-3xl font-mono font-bold text-[--color-foreground]">${calc.size}</span>
                      </div>
                    </div>
                  </Card>

                  <div className="flex gap-3">
                    <Button onClick={() => setStep(1)} variant="secondary" className="flex-1">
                      Reset
                    </Button>
                    <Button variant={calc.isProfitable ? 'primary' : 'secondary'} className="flex-[2]" disabled={!calc.isProfitable}>
                      {calc.isProfitable ? 'Execute Strategic Trade' : 'Conditions Not Met'}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Sidebar - Updated to ProbEx Insight Styling */}
          <div className="lg:col-span-5 space-y-6">
            <Card variant="muted" padding="lg" className="border-l-2 border-l-[--color-primary]">
              <div className="flex items-center gap-2 mb-6">
                <Activity className="text-[--color-primary]" size={18} />
                <span className="text-sm font-bold uppercase tracking-wider">Market Indicators</span>
              </div>
              <div className="space-y-5">
                <Indicator
                  label="Edge Strength"
                  value={`${calc.edge} pts`}
                  status={calc.edge > 10 ? 'Elite' : calc.edge > 0 ? 'Active' : 'Negative'}
                  variant={calc.edge > 0 ? 'success' : 'danger'}
                />
                <Indicator
                  label="Fee Friction"
                  value={`${calc.vig}%`}
                  status={calc.vig < 5 ? 'Low' : 'High'}
                  variant={calc.vig < 7 ? 'primary' : 'danger'}
                />
              </div>
            </Card>

            {/* Senior Trader Note - ProbEx Orange Insight Style */}
            <div className="card-insight">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-md bg-[--color-warning] flex items-center justify-center shrink-0">
                  <Lock size={16} className="text-[--color-bg-background]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-[--color-warning] block mb-1 tracking-widest">Protocol Insight</span>
                  <p className="text-xs text-[--color-foreground-muted] leading-relaxed font-medium italic">
                    "Statistical edges must exceed the exchange friction by 2.0x to be viable long-term. In decentralized markets, information has a short half-life—execute immediately when value is confirmed."
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
