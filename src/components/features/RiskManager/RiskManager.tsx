import { useState, useMemo } from 'react'
import { ArrowLeft, ChevronRight, HelpCircle, Zap, Lock, ShieldCheck, BarChart, Target } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Input, Card, Indicator, Tooltip, Badge } from '@/components/ui'
import { Container } from '@/components/layout'
import { calculateRisk, RiskCalculation } from '@/lib/calculations'

type Step = 1 | 2 | 3

const stepColors = {
  1: { accent: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
  2: { accent: 'text-vibrant', bg: 'bg-vibrant/10', border: 'border-vibrant/20' },
  3: { accent: 'text-success', bg: 'bg-success/10', border: 'border-success/20' },
}

export function RiskManager() {
  const [step, setStep] = useState<Step>(1)
  const [yesPrice, setYesPrice] = useState<string>('0.60')
  const [noPrice, setNoPrice] = useState<string>('0.45')
  const [myEstimate, setMyEstimate] = useState<string>('0.65')
  const [bankroll, setBankroll] = useState<string>('1000')

  const theme = stepColors[step]

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
    <div className="relative">
      <Container className="py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-12 relative max-w-xl mx-auto">
            <div className="absolute top-1/2 left-0 w-full h-px bg-border -translate-y-1/2 z-0" />
            <motion.div
              className="absolute top-1/2 left-0 h-px -translate-y-1/2 z-0"
              animate={{ width: `${((step - 1) / 2) * 100}%` }}
              transition={{ duration: 0.3 }}
              style={{ backgroundColor: step === 1 ? 'var(--color-primary)' : step === 2 ? 'var(--color-vibrant)' : 'var(--color-success)' }}
            />
            {([1, 2, 3] as const).map((s) => (
              <div key={s} className="relative z-10 flex flex-col items-center">
                <div 
                  className={`w-2 h-2 rounded-full border-2 transition-all duration-300 ${
                    step === s 
                      ? 'border-primary bg-primary scale-125' 
                      : step > s 
                        ? 'border-primary bg-primary' 
                        : 'border-border bg-bg-void'
                  }`}
                />
                <span className={`text-[10px] font-medium uppercase tracking-wider mt-3 transition-colors duration-300 ${
                  step >= s ? stepColors[s].accent : 'text-foreground-muted'
                }`}>
                  {s === 1 ? 'Market' : s === 2 ? 'Edge' : 'Risk'}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${theme.border} ${theme.bg}`}>
                      {step === 1 && <BarChart size={18} className={theme.accent} />}
                      {step === 2 && <Target size={18} className={theme.accent} />}
                      {step === 3 && <ShieldCheck size={18} className={theme.accent} />}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {step === 1 ? 'Market Data' : step === 2 ? 'Your Edge' : 'Risk Blueprint'}
                      </h3>
                      <p className="text-xs text-foreground-muted">Step {step} of 3</p>
                    </div>
                  </div>

                  {step === 1 && (
                    <div className="space-y-4">
                      <Card className="grid grid-cols-2 gap-4">
                        <Input
                          label="Yes Price"
                          prefix="$"
                          type="number"
                          step="0.01"
                          value={yesPrice}
                          onChange={(e) => setYesPrice(e.target.value)}
                        />
                        <Input
                          label="No Price"
                          prefix="$"
                          type="number"
                          step="0.01"
                          value={noPrice}
                          onChange={(e) => setNoPrice(e.target.value)}
                        />
                      </Card>

                      <div className="grid grid-cols-2 gap-4">
                        <Card variant="muted" padding="md">
                          <span className="text-micro text-foreground-muted block mb-1">Exchange Vig</span>
                          <span className={`text-2xl font-mono font-bold ${calc.vig > 7 ? 'text-danger' : 'text-success'}`}>
                            {calc.vig}%
                          </span>
                        </Card>
                        <Card variant="muted" padding="md">
                          <span className="text-micro text-foreground-muted block mb-1">Implied Prob</span>
                          <span className="text-2xl font-mono font-bold">{calc.deVigged}%</span>
                        </Card>
                      </div>

                      <Button onClick={nextStep} className="w-full h-11">
                        Continue
                        <ChevronRight size={16} />
                      </Button>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <Card variant="muted" className="text-center py-8">
                        <span className="text-micro text-vibrant block mb-2">Your Estimate</span>
                        <span className="text-6xl font-mono font-bold text-vibrant">{(parseFloat(myEstimate) * 100).toFixed(0)}%</span>
                        <div className="mt-6 px-4">
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={myEstimate}
                            onChange={(e) => setMyEstimate(e.target.value)}
                            className="w-full h-1.5 bg-border rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-vibrant [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-vibrant/30"
                          />
                        </div>
                      </Card>

                      <Card 
                        variant="outline" 
                        className={`flex items-center justify-between p-4 ${calc.edge > 0 ? 'border-success/30' : 'opacity-50'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-md flex items-center justify-center ${calc.edge > 0 ? 'bg-success/15' : 'bg-bg-elevated'}`}>
                            <Zap size={16} className={calc.edge > 0 ? 'text-success' : 'text-foreground-muted'} />
                          </div>
                          <div>
                            <span className="text-micro text-foreground-muted block">Statistical Edge</span>
                            <span className={`text-lg font-mono font-semibold ${calc.edge > 0 ? 'text-success' : 'text-foreground-muted'}`}>
                              {calc.edge > 0 ? '+' : ''}{calc.edge} pts
                            </span>
                          </div>
                        </div>
                        {calc.edge > 0 && (
                          <Badge variant="success" dot>Active</Badge>
                        )}
                      </Card>

                      <div className="flex gap-3">
                        <Button onClick={prevStep} variant="secondary" className="h-11">
                          <ArrowLeft size={18} />
                        </Button>
                        <Button onClick={nextStep} variant="primary" className="flex-1 h-11">
                          View Risk Blueprint
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Card className="p-6">
                          <span className="text-micro text-foreground-muted block mb-2">Optimal Allocation</span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-mono font-bold text-primary">{calc.kelly}%</span>
                            <span className="text-xs text-foreground-muted">Kelly</span>
                          </div>
                        </Card>
                        <Card className="p-6">
                          <span className="text-micro text-foreground-muted block mb-2">Expected Value</span>
                          <div className="flex items-baseline gap-2">
                            <span className={`text-4xl font-mono font-bold ${calc.ev > 0 ? 'text-success' : 'text-danger'}`}>
                              {calc.ev}
                            </span>
                            <span className="text-xs text-foreground-muted">/ unit</span>
                          </div>
                        </Card>
                      </div>

                      <Card variant="outline" className="p-6">
                        <div className="flex flex-col sm:flex-row items-end gap-6">
                          <div className="w-full">
                            <Input
                              label="Bankroll"
                              prefix="$"
                              type="number"
                              value={bankroll}
                              onChange={(e) => setBankroll(e.target.value)}
                            />
                          </div>
                          <div className="w-full text-right">
                            <span className="text-micro text-foreground-muted block mb-1">Position Size</span>
                            <span className="text-4xl font-mono font-bold text-foreground">${calc.size}</span>
                          </div>
                        </div>
                      </Card>

                      <div className="flex gap-3">
                        <Button onClick={() => setStep(1)} variant="secondary" className="h-11">
                          Reset
                        </Button>
                        <Button 
                          variant={calc.isProfitable ? 'primary' : 'secondary'}
                          className="flex-[2] h-11"
                          disabled={!calc.isProfitable}
                        >
                          {calc.isProfitable ? 'Execute Position' : 'Insufficient Edge'}
                        </Button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <Card variant="muted" padding="lg">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-micro text-foreground">Indicators</span>
                </div>
                <div className="space-y-4">
                  <Indicator
                    label="Alpha Signal"
                    value={`${calc.edge} pts`}
                    status={calc.edge > 10 ? 'Premium' : calc.edge > 0 ? 'Confirmed' : 'None'}
                    variant={calc.edge > 0 ? 'success' : 'danger'}
                  />
                  <Indicator
                    label="Exchange Vig"
                    value={`${calc.vig}%`}
                    status={calc.vig < 4 ? 'Optimal' : calc.vig < 7 ? 'Standard' : 'High'}
                    variant={calc.vig < 7 ? 'primary' : 'danger'}
                  />
                  <Indicator
                    label="Confidence"
                    value="—"
                    status="Systemic"
                    variant="muted"
                  />
                </div>
              </Card>

              <Card variant="outline" className="p-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-md bg-warning/15 flex items-center justify-center shrink-0">
                    <Lock size={14} className="text-warning" />
                  </div>
                  <div>
                    <span className="text-micro text-warning block mb-1">Doctrine</span>
                    <p className="text-xs text-foreground-secondary leading-relaxed italic">
                      "If your edge does not exceed the exchange take by 2x, the risk is asymmetric to the downside."
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
