import { TrendingUp } from 'lucide-react'
import { Container } from './Container'

export function Footer() {
  return (
    <footer className="bg-[--color-bg-muted] border-t border-[--color-border] py-6 md:py-8">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-[--color-primary] w-4 h-4" />
            <span className="font-bold text-sm tracking-tight">
              PROBABILITY<span className="text-[--color-primary-light]">PIT</span>
            </span>
          </div>
          
          <a 
            href="https://x.com/ProbabilityEx" 
            target="_blank" 
            rel="noreferrer" 
            className="text-sm text-[--color-foreground-muted] hover:text-[--color-foreground] transition-[--transition-base]"
          >
            @ProbabilityEx
          </a>
          
          <p className="text-xs text-[--color-foreground-muted]">
            © {new Date().getFullYear()} The Probability Pit
          </p>
        </div>
      </Container>
    </footer>
  )
}
