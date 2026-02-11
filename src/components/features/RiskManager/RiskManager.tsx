import { useState, useMemo } from 'react'
import { ArrowLeft, ChevronRight, HelpCircle, Activity, Zap, Lock, TrendingUp, AlertCircle, BarChart, Target, ShieldCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Input, Card, Indicator, Tooltip } from '@/components/ui'
import { Container } from '@/components/layout'
import { calculateRisk, RiskCalculation } from '@/lib/calculations'

type Step = 1 | 2 | 3

const stepThemes = {
  1: { color: 'var(--color-primary)', light: 'hsla(217, 91%, 60%, 0.1)', glow: 'text-glow-primary', icon: BarChart },
  2: { color: 'var(--color-vibrant)', light: 'hsla(280, 70%, 60%, 0.1)', glow: 'text-glow-vibrant', icon: Target },
  3: { color: 'var(--color-success)', light: 'hsla(142, 71% , 55%, 0.1)', glow: 'text-glow-success', icon: ShieldCheck },
}

export function RiskManager() {
  const [step, setStep] = useState<Step>(1)
  const [yesPrice, setYesPrice] = useState<string>('0.60')
  const [noPrice, setNoPrice] = useState<string>('0.45')
  const [myEstimate, setMyEstimate] = useState<string>('0.65')
  const [bankroll, setBankroll] = useState<string>('1000')

  const theme = stepThemes[step]

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
    <div className="relative overflow-hidden">
      {/* Dynamic Background Blob - Shifts color based on step */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] blur-[120px] rounded-full opacity-20 transition-all duration-700 pointer-events-none"
        style={{ backgroundColor: theme.color }}
      />

      <Container className="py-8 md:py-16 relative z-20">
        <div className="max-w-5xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-12 relative max-w-2xl mx-auto">
            <div className="absolute top-1/2 left-0 w-full h-px bg-border -translate-y-1/2 z-0" />
            <motion.div
              className="absolute top-1/2 left-0 h-px -translate-y-1/2 z-0"
              animate={{ width: `${((step - 1) / 2) * 100}%`, backgroundColor: theme.color }}
              transition={{ duration: 0.5 }}
            />
            {([1, 2, 3] as const).map((s) => (
              <div key={s} className="relative z-10 flex flex-col items-center">
                <div 
                  className={`step-dot border-2 transition-colors duration-500 ${step === s ? 'active' : step > s ? 'complete' : 'bg-bg-background border-border'}`}
                  style={step === s ? { backgroundColor: theme.color, borderColor: theme.color, boxShadow: `0 0 15px ${theme.color}66` } : {}}
                >
                  {step > s ? '✓' : s}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider mt-3 transition-colors duration-500 ${step >= s ? '' : 'text-foreground-secondary'}`} style={step >= s ? { color: stepThemes[s].color } : {}}>
                  {s === 1 ? 'Market Data' : s === 2 ? 'Edge Calc' : 'Risk Blueprint'}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Step Header with Flourish */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-border bg-bg-card shadow-lg relative overflow-hidden group">
                      <div className="absolute inset-0 scanline-overlay opacity-10" />
                      <theme.icon size={22} style={{ color: theme.color }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold tracking-tight" style={{ color: theme.color }}>
                        Step 0{step}: {step === 1 ? 'The Numbers' : step === 2 ? 'Define Your Alpha' : 'The Risk Blueprint'}
                      </h3>
                      <p className="text-xs text-foreground-muted uppercase tracking-widest font-medium">Protocol Phase 0{step}</p>
                    </div>
                  </div>

                  {step === 1 && (
                    <div className="space-y-6">
                      <Card className="grid grid-cols-2 gap-4 bg-bg-card/40 backdrop-blur-md">
                        <Input
                          label={<div className="flex items-center gap-1.5">Yes Price <Tooltip content="Cost to buy YES shares"><HelpCircle size={12}/></Tooltip></div>}
                          prefix="$"
                          type="number"
                          step="0.01"
                          value={yesPrice}
                          onChange={(e) => setYesPrice(e.target.value)}
                        />
                        <Input
                          label={<div className="flex items-center gap-1.5">No Price <Tooltip content="Cost to buy NO shares"><HelpCircle size={12}/></Tooltip></div>}
                          prefix="$"
                          type="number"
                          step="0.01"
                          value={noPrice}
                          onChange={(e) => setNoPrice(e.target.value)}
                        />
                      </Card>

                      <div className="grid grid-cols-2 gap-4">
                        <Card variant="muted" padding="md" className="border-l-2 border-l-danger">
                          <span className="text-[10px] font-bold uppercase text-foreground-secondary block mb-1">Exchange Vig</span>
                          <span className={`text-2xl font-mono font-bold ${calc.vig > 7 ? 'text-danger' : 'text-success'}`}>
                            {calc.vig}%
                          </span>
                        </Card>
                        <Card variant="muted" padding="md" className="border-l-2 border-l-primary">
                          <span className="text-[10px] font-bold uppercase text-foreground-secondary block mb-1">Implied Prob</span>
                          <span className="text-2xl font-mono font-bold">{calc.deVigged}%</span>
                        </Card>
                      </div>

                      <Button onClick={nextStep} className="w-full h-14 text-base shadow-glow-primary">
                        Continue to Alpha Definition
                        <ChevronRight size={18} className="ml-1" />
                      </Button>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <Card variant="muted" className="text-center py-12 relative overflow-hidden">
                        <div className="absolute inset-0 scanline-overlay opacity-5" />
                        <span className="text-[10px] font-bold uppercase text-vibrant block mb-4 tracking-[0.3em]">Estimated Probability</span>
                        <span className="text-7xl font-mono font-bold text-vibrant text-glow-vibrant">{(parseFloat(myEstimate) * 100).toFixed(0)}%</span>
                        <div className="mt-10 px-8">
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={myEstimate}
                            onChange={(e) => setMyEstimate(e.target.value)}
                            className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-vibrant [&::-webkit-slider-thumb]:shadow-[0_0_15px_var(--color-vibrant)]"
                          />
                        </div>
                      </Card>

                      <div className={`card-insight flex items-center justify-between p-6 ${calc.edge > 0 ? 'opacity-100 ring-1 ring-warning/30' : 'opacity-40 grayscale'}`}>
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-xl bg-warning flex items-center justify-center text-bg-background shadow-lg shadow-warning/20">
                            <Zap size={24} fill="currentColor" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase text-warning tracking-widest block mb-0.5">Statistical Edge</span>
                            <span className="text-2xl font-mono font-bold text-warning">
                              {calc.edge > 0 ? '+' : ''}{calc.edge} pts
                            </span>
                          </div>
                        </div>
                        <Badge variant="warning" dot className="animate-pulse">Active Setup</Badge>
                      </div>

                      <div className="flex gap-4">
                        <Button onClick={prevStep} variant="secondary" className="flex-1 h-14">
                          <ArrowLeft size={20} />
                        </Button>
                        <Button onClick={nextStep} variant="warning" className="flex-[3] h-14 font-black shadow-lg shadow-warning/20 hover:scale-[1.02]">
                          FINAL RISK BLUEPRINT
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <Card className="border-t-4 border-t-primary p-8 bg-gradient-to-br from-primary/5 to-transparent">
                          <span className="text-[10px] font-bold uppercase text-foreground-secondary block mb-3 tracking-widest">Optimal Allocation</span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-mono font-bold text-primary text-glow-primary">{calc.kelly}%</span>
                            <span className="text-xs font-bold text-foreground-secondary uppercase tracking-tighter">Stake</span>
                          </div>
                        </Card>
                        <Card className={`border-t-4 p-8 bg-gradient-to-br from-transparent ${calc.ev > 0 ? 'border-t-success to-success/5' : 'border-t-danger to-danger/5'}`}>
                          <span className="text-[10px] font-bold uppercase text-foreground-secondary block mb-3 tracking-widest">Expected Value</span>
                          <div className="flex items-baseline gap-2">
                            <span className={`text-5xl font-mono font-bold text-glow-success ${calc.ev > 0 ? 'text-success' : 'text-danger'}`}>
                              {calc.ev}
                            </span>
                            <span className="text-xs font-bold text-foreground-secondary uppercase tracking-tighter">/ Unit</span>
                          </div>
                        </Card>
                      </div>

                      <Card variant="outline" className="bg-bg-card/30 border-primary/20">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">Liquidity Execution</span>
                        </div>
                        <div className="flex flex-col sm:flex-row items-end gap-10">
                          <div className="w-full">
                            <Input
                              label="Operational Bankroll"
                              prefix="$"
                              type="number"
                              value={bankroll}
                              onChange={(e) => setBankroll(e.target.value)}
                            />
                          </div>
                          <div className="w-full text-right">
                            <span className="text-[10px] font-bold text-foreground-secondary uppercase block mb-2">Max Position Order</span>
                            <span className="text-5xl font-mono font-bold text-foreground text-glow-primary">${calc.size}</span>
                          </div>
                        </div>
                      </Card>

                      <div className="flex gap-4">
                        <Button onClick={() => setStep(1)} variant="secondary" className="flex-1 h-14">
                          RESET
                        </Button>
                        <Button 
                          variant={calc.isProfitable ? 'primary' : 'secondary'}
                          className="flex-[2] h-14 text-base font-black tracking-widest overflow-hidden relative"
                          disabled={!calc.isProfitable}
                        >
                          {calc.isProfitable && <div className="absolute inset-0 scanline-overlay opacity-30" />}
                          {calc.isProfitable ? 'EXECUTE TACTICAL ORDER' : 'INSUFFICIENT EDGE'}
                        </Button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <Card variant="muted" padding="lg" className="border-l-4 border-l-primary relative overflow-hidden">
                <div className="absolute inset-0 scanline-overlay opacity-5" />
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">Terminal Indicators</span>
                </div>
                <div className="space-y-6">
                  <Indicator
                    label="Alpha Signal"
                    value={`${calc.edge} pts`}
                    status={calc.edge > 10 ? 'Premium' : calc.edge > 0 ? 'Confirmed' : 'None'}
                    variant={calc.edge > 0 ? 'success' : 'danger'}
                  />
                  <Indicator
                    label="Exchange Friction"
                    value={`${calc.vig}%`}
                    status={calc.vig < 4 ? 'Optimal' : calc.vig < 7 ? 'Neutral' : 'Hostile'}
                    variant={calc.vig < 7 ? 'primary' : 'danger'}
                  />
                  <Indicator
                    label="Confidence Index"
                    value="Variable"
                    status="Systemic"
                    variant="muted"
                  />
                </div>
              </Card>

              {/* Enhanced Senior Trader Note */}
              <div className="card-insight">
                <div className="absolute inset-0 scanline-overlay opacity-10" />
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-warning flex items-center justify-center shrink-0">
                    <Lock size={20} className="text-bg-background" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-warning block mb-2 tracking-[0.2em]">Operational Doctrine</span>
                    <p className="text-xs text-foreground-muted leading-relaxed font-medium italic">
                      "Market efficiency is a myth perpetrated by participants with inferior data. Your edge is the delta between clinical reality and aggregate sentiment. If that delta does not exceed the exchange's take by 200%, the risk is asymmetric to the downside."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
