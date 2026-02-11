import { NavLink } from 'react-router-dom'
import { BarChart3, Network, Cpu, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { clsx } from 'clsx'
import { Container } from './Container'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { to: '/', label: 'Diagnostic Tool', icon: BarChart3 },
    { to: '/academy', label: 'Quant Academy', icon: Network },
  ]

  return (
    <nav className="border-b border-border py-4 sticky top-0 bg-bg-dark/80 backdrop-blur-xl z-50">
      <Container>
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-glow-primary group-hover:scale-105 transition-transform">
              <Cpu className="text-white w-6 h-6" />
            </div>
            <div>
              <span className="font-black text-lg sm:text-xl tracking-tighter block leading-none">
                PROBABILITY<span className="text-primary">PIT</span>
              </span>
              <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] hidden sm:block">
                Alpha Terminal v1.0
              </span>
            </div>
          </NavLink>

          <div className="hidden md:flex gap-2 bg-black/40 p-1.5 rounded-xl border border-white/5">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => clsx(
                  'flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-300',
                  isActive
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-text-muted hover:text-white hover:bg-white/5'
                )}
              >
                <Icon size={18} />
                <span className="font-bold text-xs uppercase tracking-widest">{label}</span>
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-text-muted uppercase">System Status</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse-subtle" />
                <span className="text-xs font-bold text-success">OPERATIONAL</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-text-muted hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => clsx(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-text-muted hover:text-white hover:bg-white/5'
                  )}
                >
                  <Icon size={20} />
                  <span className="font-bold text-sm uppercase tracking-widest">{label}</span>
                </NavLink>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-subtle" />
              <span className="text-xs font-bold text-success">System Operational</span>
            </div>
          </div>
        )}
      </Container>
    </nav>
  )
}
