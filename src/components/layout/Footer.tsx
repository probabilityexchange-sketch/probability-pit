import { TrendingUp } from 'lucide-react'
import { Container } from './Container'

export function Footer() {
  return (
    <footer className="bg-bg-sidebar border-t border-border py-8 md:py-12 shrink-0">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <TrendingUp className="text-primary w-5 h-5" />
              <span className="font-black text-xl tracking-tighter block leading-none">
                PROBABILITY<span className="text-primary">PIT</span>
              </span>
            </div>
            <p className="text-text-muted text-sm max-w-xs leading-relaxed">
              The premier destination for quantitative training in decentralized prediction markets. Not financial advice. Strictly mathematical.
            </p>
          </div>
          <div>
            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-4 md:mb-6">Connect</h5>
            <ul className="space-y-3 md:space-y-4 text-sm font-bold text-text-muted">
              <li><a href="https://x.com/ProbabilityEx" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">X / Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 md:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">
          <p>&copy; {new Date().getFullYear()} THE PROBABILITY PIT. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 md:gap-8">
            <span>Latency: 14ms</span>
            <span>Liquidity: Active</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
