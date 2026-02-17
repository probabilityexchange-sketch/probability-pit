import { Hero } from '@/components/layout'
import { RiskManager } from '@/components/features/RiskManager'

export function HomePage() {
  return (
    <div className="editorial-grid min-h-[calc(100vh-4rem)] items-start lg:items-center">
      <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-24">
        <Hero
          badge="Risk Protocol"
          title={
            <>
              Numerical<br />
              <span className="text-primary-light">Warfare</span>
            </>
          }
          subtitle="Identify mispriced probabilities using information asymmetry. Execute with clinical risk management."
        />
      </div>
      <div className="col-span-12 lg:col-span-7">
        <RiskManager />
      </div>
    </div>
  )
}
