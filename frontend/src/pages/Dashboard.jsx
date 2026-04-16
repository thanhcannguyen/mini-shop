import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const endpoints = [
  {
    group: 'Users',
    color: 'var(--accent)',
    path: '/users',
    items: [
      { method: 'POST', path: '/users/register', desc: 'Đăng ký user mới' },
      { method: 'POST', path: '/users/login', desc: 'Đăng nhập, nhận token' },
      { method: 'GET', path: '/users/me', desc: 'Lấy profile của mình (cần token)' },
      { method: 'GET', path: '/users/', desc: 'Danh sách tất cả user (cần token)' },
      { method: 'GET', path: '/users/:id', desc: 'Chi tiết user theo ID (cần token)' },
      { method: 'PUT', path: '/users/change-password', desc: 'Đổi mật khẩu (cần token)' },
      { method: 'PUT', path: '/users/:id', desc: 'Cập nhật user (cần token)' },
      { method: 'DELETE', path: '/users/:id', desc: 'Xóa user (cần token)' },
    ]
  },
  {
    group: 'Products',
    color: 'var(--accent3)',
    path: '/products',
    items: [
      { method: 'POST', path: '/products/', desc: 'Tạo sản phẩm mới' },
      { method: 'GET', path: '/products/', desc: 'Danh sách tất cả sản phẩm' },
      { method: 'GET', path: '/products/:id', desc: 'Chi tiết sản phẩm theo ID' },
      { method: 'PUT', path: '/products/:id', desc: 'Cập nhật sản phẩm' },
      { method: 'DELETE', path: '/products/:id', desc: 'Xóa sản phẩm' },
    ]
  },
  {
    group: 'Orders',
    color: 'var(--warning)',
    path: '/orders',
    items: [
      { method: 'POST', path: '/orders/', desc: 'Tạo đơn hàng (cần token)' },
      { method: 'GET', path: '/orders/my-orders', desc: 'Đơn hàng của tôi (cần token)' },
      { method: 'GET', path: '/orders/:id', desc: 'Chi tiết đơn hàng (cần token)' },
      { method: 'PUT', path: '/orders/:id/status', desc: 'Cập nhật trạng thái (cần token)' },
      { method: 'DELETE', path: '/orders/:id', desc: 'Xóa đơn hàng (cần token)' },
    ]
  }
]

const methodColor = { GET: 'var(--accent3)', POST: 'var(--accent)', PUT: 'var(--warning)', DELETE: 'var(--accent2)' }

export default function Dashboard() {
  const { token, user } = useAuth()

  return (
    <div style={{ padding: '32px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 38,
          letterSpacing: '0.01em',
          marginBottom: 8,
          lineHeight: 1.1
        }}>
          Mini Shop<br />
          <span style={{ color: 'var(--accent)' }}>API Tester</span>
        </h1>
        <p style={{ color: 'var(--text2)', fontSize: 13 }}>
          Frontend để test toàn bộ {endpoints.reduce((a, g) => a + g.items.length, 0)} endpoints của backend
        </p>
      </div>

      {/* Auth status */}
      <div style={{
        background: 'var(--bg2)',
        border: `1px solid ${token ? 'rgba(76,255,145,0.3)' : 'rgba(255,106,106,0.3)'}`,
        borderRadius: 10,
        padding: '16px 20px',
        marginBottom: 32,
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }}>
        <div style={{
          width: 10, height: 10, borderRadius: '50%',
          background: token ? 'var(--success)' : 'var(--error)',
          boxShadow: token ? '0 0 8px var(--success)' : '0 0 8px var(--error)',
          flexShrink: 0
        }} />
        {token ? (
          <div>
            <span style={{ color: 'var(--success)', fontWeight: 700 }}>Đã đăng nhập</span>
            <span style={{ color: 'var(--text2)', marginLeft: 12 }}>
              User: <span style={{ color: 'var(--text)' }}>{user?.name}</span> — Token đã được lưu, sẵn sàng test API cần auth
            </span>
          </div>
        ) : (
          <div>
            <span style={{ color: 'var(--error)', fontWeight: 700 }}>Chưa đăng nhập</span>
            <span style={{ color: 'var(--text2)', marginLeft: 12 }}>
              Vào tab <Link to="/users" style={{ color: 'var(--accent)' }}>Users</Link> → Login để lấy token trước khi test API cần auth
            </span>
          </div>
        )}
      </div>

      {/* Endpoints overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {endpoints.map(group => (
          <Link
            key={group.group}
            to={group.path}
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: 20,
              transition: 'border-color 0.2s, transform 0.15s',
              cursor: 'pointer'
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = group.color; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800, fontSize: 18,
                  color: group.color
                }}>{group.group}</span>
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  color: group.color,
                  background: `rgba(${group.color === 'var(--accent)' ? '124,106,255' : group.color === 'var(--accent3)' ? '106,255,212' : '255,184,76'},0.1)`,
                  border: `1px solid`,
                  borderColor: group.color,
                  padding: '2px 8px', borderRadius: 4
                }}>{group.items.length} APIs</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {group.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{
                      fontSize: 9, fontWeight: 700, width: 46, textAlign: 'center',
                      color: methodColor[item.method],
                      background: `rgba(${item.method === 'GET' ? '106,255,212' : item.method === 'POST' ? '124,106,255' : item.method === 'PUT' ? '255,184,76' : '255,106,106'},0.1)`,
                      border: `1px solid ${methodColor[item.method]}`,
                      borderRadius: 3, padding: '1px 0', letterSpacing: '0.05em'
                    }}>{item.method}</span>
                    <span style={{ fontSize: 11, color: 'var(--text2)', flex: 1 }}>{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 32, padding: '16px 20px', background: 'var(--bg2)', borderRadius: 10, border: '1px solid var(--border)' }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text2)', marginBottom: 8 }}>
          Cách dùng
        </div>
        <div style={{ color: 'var(--text2)', lineHeight: 2 }}>
          <span style={{ color: 'var(--accent)' }}>1.</span> Đảm bảo backend đang chạy tại <code style={{ color: 'var(--accent3)', background: 'var(--bg3)', padding: '2px 6px', borderRadius: 4 }}>http://localhost:3000</code><br />
          <span style={{ color: 'var(--accent)' }}>2.</span> Vào tab <b>Users</b> → đăng ký rồi đăng nhập → token sẽ tự động được lưu<br />
          <span style={{ color: 'var(--accent)' }}>3.</span> Mọi API cần auth sẽ tự động gắn token vào header<br />
          <span style={{ color: 'var(--accent)' }}>4.</span> Click vào từng endpoint để mở form, điền dữ liệu và xem response
        </div>
      </div>
    </div>
  )
}
