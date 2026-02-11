import { Hero } from '@/components/layout'
import { RiskManager } from '@/components/features/RiskManager'

export function HomePage() {
  return (
    <>
      <Hero
        badge="Professional Prediction Protocol"
        title={
          <>
            Trading is <br />
            <span className="text-primary">Numerical Warfare.</span>
          </>
        }
        subtitle="We don't bet on 'vibes.' We identify mispriced probabilities using information asymmetry and execute with clinical risk management."
      />
      <RiskManager />
    </>
  )
}
