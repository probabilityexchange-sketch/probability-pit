import { NavLink } from 'react-router-dom'
import { BarChart3, Network, Menu, X, Cpu } from 'lucide-react'
import { useState } from 'react'
import { clsx } from 'clsx'
import { Container } from './Container'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { to: '/academy', label: 'Quant Academy', icon: Network },
    { to: '/', label: 'Risk Manager', icon: BarChart3 },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-bg-void/80 backdrop-blur-xl">
      <Container>
        <div className="flex items-center justify-between h-14">
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Cpu className="text-white w-4 h-4" />
            </div>
            <span className="font-semibold text-sm tracking-tight">
              PROBABILITY<span className="text-primary-light">PIT</span>
            </span>
          </NavLink>

          <div className="hidden md:flex items-center gap-1 bg-bg-elevated/50 p-1 rounded-lg">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => clsx(
                  'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150',
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-foreground-secondary hover:text-foreground'
                )}
              >
                <Icon size={16} />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground-secondary hover:text-foreground"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-border">
            <div className="flex flex-col gap-1">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => clsx(
                    'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150',
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-foreground-secondary hover:text-foreground hover:bg-bg-elevated'
                  )}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </Container>
    </nav>
  )
}
