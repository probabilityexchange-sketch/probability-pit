import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { clsx } from 'clsx'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { to: '/academy', label: 'Academy' },
    { to: '/', label: 'Risk Manager' },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-border-glass bg-bg-void/90 backdrop-blur-xl">
      <div className="container-main">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="group">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-foreground transition-premium group-hover:text-foreground-secondary">
              Probability Pit
            </span>
          </NavLink>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => clsx(
                  'text-[11px] uppercase tracking-[0.15em] transition-premium',
                  isActive
                    ? 'text-foreground'
                    : 'text-foreground-muted hover:text-foreground-secondary'
                )}
              >
                {label}
              </NavLink>
            ))}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground-muted hover:text-foreground transition-premium"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-border-glass">
            <div className="flex flex-col gap-6">
              {navItems.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => clsx(
                    'text-[11px] uppercase tracking-[0.15em] transition-premium',
                    isActive
                      ? 'text-foreground'
                      : 'text-foreground-muted hover:text-foreground-secondary'
                  )}
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
