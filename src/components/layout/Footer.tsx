export function Footer() {
  return (
    <footer className="border-t border-border-glass py-10">
      <div className="container-main flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <span className="text-[11px] uppercase tracking-[0.2em] text-foreground-muted">
          Probability Pit
        </span>

        <a
          href="https://x.com/ProbabilityEx"
          target="_blank"
          rel="noreferrer"
          className="text-[11px] uppercase tracking-[0.15em] text-foreground-muted hover:text-foreground-secondary transition-premium link-underline"
        >
          @ProbabilityEx
        </a>

        <p className="text-[10px] tracking-[0.1em] text-foreground-muted/60">
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
