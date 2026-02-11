import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Calculator, Target, AlertCircle, ShieldCheck, ArrowRight, ArrowLeft, TrendingUp, ChevronRight, HelpCircle, Activity, Zap, Lock, PieChart } from 'lucide-react'
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
    <Container className="py-12 md:py-20">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8 md:mb-16 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />
          {([1, 2, 3] as const).map((s) => (
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6 md:space-y-8"
                >
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black mb-2">Step 1: The Numbers</h3>
                    <p className="text-text-secondary">Enter the current exchange prices. These define the market's current "opinion."</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 md:gap-6">
                    <Input
                      label={
                        <span className="flex items-center gap-2">
                          Yes Price
                          <Tooltip content="The cost to buy a share that pays $1.00 if the event occurs.">
                            <HelpCircle size={12} className="text-text-muted cursor-help hover:text-white transition-colors" />
                          </Tooltip>
                        </span>
                      }
                      prefix="$"
                      type="number"
                      value={yesPrice}
                      onChange={(e) => setYesPrice(e.target.value)}
                    />
                    <Input
                      label={
                        <span className="flex items-center gap-2">
                          No Price
                          <Tooltip content="The cost to buy a share that pays $1.00 if the event DOES NOT occur.">
                            <HelpCircle size={12} className="text-text-muted cursor-help hover:text-white transition-colors" />
                          </Tooltip>
                        </span>
                      }
                      prefix="$"
                      type="number"
                      value={noPrice}
                      onChange={(e) => setNoPrice(e.target.value)}
                    />
                  </div>

                  <Card variant="hud" className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-text-muted block mb-1">Exchange Vig (Fee)</span>
                      <span className={`text-2xl font-mono font-black ${calc.vig > 7 ? 'text-danger' : 'text-success'}`}>
                        {calc.vig}%
                      </span>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] font-black uppercase tracking-widest text-text-muted block mb-1">Market Implied Prob</span>
                      <span className="text-2xl font-mono font-black text-text-main">
                        {calc.deVigged}%
                      </span>
                    </div>
                  </Card>

                  <Button onClick={nextStep} size="lg" className="w-full">
                    Next: Calculate Edge
                    <ChevronRight className="ml-2" size={18} />
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6 md:space-y-8"
                >
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black mb-2">Step 2: Define Your Alpha</h3>
                    <p className="text-text-secondary">Based on your Level 3/4 research, what is the *real* probability of this event?</p>
                  </div>

                  <div className="space-y-6">
                    <Card variant="hud" className="text-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary block mb-4">Your Estimated Probability</span>
                      <span className="text-5xl sm:text-7xl font-mono font-black text-white">{(parseFloat(myEstimate) * 100).toFixed(0)}%</span>
                      <div className="mt-8 px-4">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={myEstimate}
                          onChange={(e) => setMyEstimate(e.target.value)}
                          className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-glow-primary"
                        />
                      </div>
                    </Card>

                    <div className={`p-4 md:p-6 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${calc.edge > 0 ? 'bg-success/5 border-success/20' : 'bg-danger/5 border-danger/20'}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${calc.edge > 0 ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'}`}>
                          {calc.edge > 0 ? <Zap /> : <AlertCircle />}
                        </div>
                        <div>
                          <span className="text-xs font-black uppercase tracking-widest opacity-60">Edge over Market</span>
                          <h4 className="text-lg md:text-xl font-black font-mono">
                            {calc.edge > 0 ? '+' : ''}{calc.edge} pts
                          </h4>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="text-xs font-black uppercase tracking-widest opacity-60 block">Status</span>
                        <span className={`text-sm font-bold ${calc.edge > 0 ? 'text-success' : 'text-danger'}`}>
                          {calc.edge > 0 ? '+EV Setup Detected' : 'No Statistical Advantage'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button onClick={prevStep} variant="secondary" size="lg" className="flex-1">
                      <ArrowLeft className="mr-2" size={18} />
                      Back
                    </Button>
                    <Button onClick={nextStep} variant="success" size="lg" className="flex-[2]">
                      Finalize Risk Blueprint
                      <ChevronRight className="ml-2" size={18} />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 md:space-y-8"
                >
                  <div className="text-center mb-6 md:mb-10">
                    <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                      <ShieldCheck size={14} />
                      Diagnostic Complete
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black mb-2">The Risk Blueprint</h3>
                    <p className="text-text-secondary">Here is exactly how you should execute this trade to maximize Expected Value.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 md:gap-6">
                    <Card variant="hud" className="space-y-3 md:space-y-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-text-muted block">Optimal Stake</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl md:text-4xl font-mono font-black text-primary">{calc.kelly}%</span>
                        <span className="text-xs md:text-sm font-bold text-text-muted">of bankroll</span>
                      </div>
                      <p className="text-[10px] text-text-muted leading-relaxed uppercase">Computed via Quarter-Kelly to protect against estimation error.</p>
                    </Card>

                    <Card variant="hud" className="space-y-3 md:space-y-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-text-muted block">Expected Value</span>
                      <div className="flex items-baseline gap-2">
                        <span className={`text-3xl md:text-4xl font-mono font-black ${calc.ev > 0 ? 'text-success' : 'text-danger'}`}>
                          {calc.ev}
                        </span>
                        <span className="text-xs md:text-sm font-bold text-text-muted">per contract</span>
                      </div>
                      <p className="text-[10px] text-text-muted leading-relaxed uppercase">Statistically predicted profit over infinite repetitions.</p>
                    </Card>
                  </div>

                  <Card variant="outline" className="bg-white/[0.03]">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="font-black uppercase tracking-widest text-xs">Bankroll Logic</h4>
                      <TrendingUp size={16} className="text-text-muted" />
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6">
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
                        <span className="text-[10px] font-black text-text-muted uppercase tracking-widest block mb-1">Max Position Buy</span>
                        <span className="text-2xl md:text-3xl font-mono font-black text-white">${calc.size}</span>
                      </div>
                    </div>
                  </Card>

                  <div className="flex gap-4">
                    <Button onClick={() => setStep(1)} variant="secondary" size="lg" className="flex-1">
                      Reset Analysis
                    </Button>
                    <Button 
                      variant={calc.isProfitable ? 'primary' : 'secondary'}
                      size="lg" 
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

          <div className="lg:col-span-5 space-y-6">
            <Card variant="hud">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="text-primary" size={20} />
                <h4 className="font-black uppercase tracking-widest text-sm">Real-Time Indicators</h4>
              </div>
              <div className="space-y-6">
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

            <Card variant="outline" className="bg-primary/5 border-primary/20">
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
            </Card>
          </div>
        </div>
      </div>
    </Container>
  )
}
