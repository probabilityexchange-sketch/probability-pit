import { Cpu } from 'lucide-react'
import { Container } from './Container'

export function Footer() {
  return (
    <footer className="bg-bg-surface border-t border-border py-6">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-2">
            <Cpu className="text-primary w-4 h-4" />
            <span className="font-semibold text-sm tracking-tight">
              PROBABILITY<span className="text-primary-light">PIT</span>
            </span>
          </div>
          
          <a 
            href="https://x.com/ProbabilityEx" 
            target="_blank" 
            rel="noreferrer" 
            className="text-sm text-foreground-secondary hover:text-foreground transition-colors duration-150"
          >
            @ProbabilityEx
          </a>
          
          <p className="text-xs text-foreground-muted">
            © {new Date().getFullYear()} The Probability Pit
          </p>
        </div>
      </Container>
    </footer>
  )
}
