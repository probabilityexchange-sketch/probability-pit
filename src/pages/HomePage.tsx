import { Hero } from '@/components/layout'
import { RiskManager } from '@/components/features/RiskManager'

export function HomePage() {
  return (
    <>
      <Hero
        badge="Professional Prediction Protocol"
        title={
          <>
            Trading is <span className="text-primary-light">Numerical Warfare</span>
          </>
        }
        subtitle="Identify mispriced probabilities using information asymmetry and execute with clinical risk management."
      />
      <RiskManager />
    </>
  )
}
