import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { path: '/', label: 'Dashboard' },
  { path: '/users', label: 'Users' },
  { path: '/products', label: 'Products' },
  { path: '/orders', label: 'Orders' },
]

export default function Navbar() {
  const { token, user, logout } = useAuth()
  const loc = useLocation()

  return (
    <nav style={{
      background: 'var(--bg2)',
      borderBottom: '1px solid var(--border)',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      gap: 0,
      height: 56,
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 32 }}>
        <div style={{
          width: 28, height: 28,
          background: 'var(--accent)',
          borderRadius: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 800, fontFamily: 'var(--font-display)'
        }}>M</div>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, letterSpacing: '-0.02em' }}>
          mini<span style={{ color: 'var(--accent)' }}>shop</span>
        </span>
        <span style={{
          fontSize: 9, fontWeight: 700, letterSpacing: '0.12em',
          color: 'var(--accent)', background: 'rgba(124,106,255,0.15)',
          border: '1px solid rgba(124,106,255,0.3)',
          padding: '1px 5px', borderRadius: 3, textTransform: 'uppercase'
        }}>API TESTER</span>
      </div>

      <div style={{ display: 'flex', gap: 4, flex: 1 }}>
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              textDecoration: 'none',
              padding: '6px 14px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-mono)',
              color: loc.pathname === item.path ? 'var(--accent)' : 'var(--text2)',
              background: loc.pathname === item.path ? 'rgba(124,106,255,0.15)' : 'transparent',
              border: loc.pathname === item.path ? '1px solid rgba(124,106,255,0.3)' : '1px solid transparent',
              transition: 'all 0.15s'
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {token ? (
          <>
            <span style={{ fontSize: 11, color: 'var(--text2)' }}>
              <span style={{ color: 'var(--success)' }}>●</span> {user?.name || 'Logged in'}
            </span>
            <button className="btn-ghost" onClick={logout} style={{ padding: '5px 12px', fontSize: 11 }}>
              Logout
            </button>
          </>
        ) : (
          <span style={{ fontSize: 11, color: 'var(--accent2)' }}>
            <span style={{ color: 'var(--accent2)' }}>●</span> Chưa đăng nhập
          </span>
        )}
      </div>
    </nav>
  )
}
