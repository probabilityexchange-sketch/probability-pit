import { NavLink } from 'react-router-dom'
import { BarChart3, Network, Cpu, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { clsx } from 'clsx'
import { Container } from './Container'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { to: '/', label: 'Risk Manager', icon: BarChart3 },
    { to: '/academy', label: 'Quant Academy', icon: Network },
  ]

  return (
    <nav className="border-b border-[--color-border] sticky top-0 bg-[hsla(222_60%_10%_/_0.9)] backdrop-blur-xl z-50">
      <Container>
        <div className="flex items-center justify-between h-14">
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-[--color-primary] rounded-lg flex items-center justify-center">
              <Cpu className="text-[--color-primary-foreground] w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight leading-none">
                PROBABILITY<span className="text-[--color-primary-light]">PIT</span>
              </span>
            </div>
          </NavLink>

          <div className="hidden md:flex gap-1 bg-[--color-bg-muted] p-1 rounded-lg">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => clsx(
                  'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-[--transition-base]',
                  isActive
                    ? 'bg-[--color-primary] text-[--color-primary-foreground]'
                    : 'text-[--color-foreground-muted] hover:text-[--color-foreground]'
                )}
              >
                <Icon size={16} />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-1.5 h-1.5 bg-[--color-success] rounded-full" />
              <span className="text-[--color-foreground-muted]">Operational</span>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[--color-foreground-muted] hover:text-[--color-foreground]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-[--color-border]">
            <div className="flex flex-col gap-1">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => clsx(
                    'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-[--transition-base]',
                    isActive
                      ? 'bg-[--color-primary] text-[--color-primary-foreground]'
                      : 'text-[--color-foreground-muted] hover:text-[--color-foreground] hover:bg-[--color-bg-muted]'
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
