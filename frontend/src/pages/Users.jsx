import { useEffect } from 'react'
import ApiCard from '../components/ApiCard'
import { api, setAuthToken } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Users() {
  const { token, login } = useAuth()

  useEffect(() => {
    setAuthToken(token)
  }, [token])

  return (
    <div style={{ padding: '32px 24px', maxWidth: 860, margin: '0 auto' }}>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, letterSpacing: '0.02em' }}>
          <span style={{ color: 'var(--accent)' }}>Users</span> API
        </h2>
        <p style={{ color: 'var(--text2)', marginTop: 4 }}>Quản lý người dùng: đăng ký, đăng nhập, CRUD</p>
      </div>

      {/* ---- REGISTER ---- */}
      <ApiCard method="POST" endpoint="/users/register" title="Đăng ký User"
        onSubmit={async (d) => api.post('/users/register', { name: d.name, email: d.email, password: d.password })}
      >
        <div className="field">
          <label>Name</label>
          <input name="name" placeholder="Nguyen Van A" />
        </div>
        <div className="field">
          <label>Email</label>
          <input name="email" type="email" placeholder="test@example.com" />
        </div>
        <div className="field">
          <label>Password</label>
          <input name="password" type="password" placeholder="••••••••" />
        </div>
      </ApiCard>

      {/* ---- LOGIN ---- */}
      <ApiCard method="POST" endpoint="/users/login" title="Đăng nhập (Lấy Token)"
        onSubmit={async (d) => {
          const res = await api.post('/users/login', { email: d.email, password: d.password })
          if (res.data.token) {
            login(res.data.token, res.data.user)
            setAuthToken(res.data.token)
          }
          return res
        }}
      >
        <div style={{
          background: 'rgba(76,255,145,0.07)', border: '1px solid rgba(76,255,145,0.2)',
          borderRadius: 6, padding: '10px 14px', marginBottom: 14, fontSize: 12, color: 'var(--accent3)'
        }}>
          ✓ Token sẽ tự động được lưu sau khi login thành công
        </div>
        <div className="field">
          <label>Email</label>
          <input name="email" type="email" placeholder="test@example.com" />
        </div>
        <div className="field">
          <label>Password</label>
          <input name="password" type="password" placeholder="••••••••" />
        </div>
      </ApiCard>

      {/* ---- GET ME ---- */}
      <ApiCard method="GET" endpoint="/users/me" title="Lấy Profile Của Mình"
        onSubmit={async () => api.get('/users/me')}
      >
        <AuthNote token={token} />
      </ApiCard>

      {/* ---- GET ALL ---- */}
      <ApiCard method="GET" endpoint="/users/" title="Danh Sách Tất Cả User"
        onSubmit={async () => api.get('/users/')}
      >
        <AuthNote token={token} />
      </ApiCard>

      {/* ---- GET BY ID ---- */}
      <ApiCard method="GET" endpoint="/users/:id" title="Lấy User Theo ID"
        onSubmit={async (d) => api.get(`/users/${d.id}`)}
      >
        <AuthNote token={token} />
        <div className="field">
          <label>User ID</label>
          <input name="id" placeholder="64f3abc123..." />
        </div>
      </ApiCard>

      {/* ---- CHANGE PASSWORD ---- */}
      <ApiCard method="PUT" endpoint="/users/change-password" title="Đổi Mật Khẩu"
        onSubmit={async (d) => api.put('/users/change-password', { oldPassword: d.oldPassword, newPassword: d.newPassword })}
      >
        <AuthNote token={token} />
        <div className="field">
          <label>Mật khẩu cũ</label>
          <input name="oldPassword" type="password" placeholder="••••••••" />
        </div>
        <div className="field">
          <label>Mật khẩu mới</label>
          <input name="newPassword" type="password" placeholder="••••••••" />
        </div>
      </ApiCard>

      {/* ---- UPDATE ---- */}
      <ApiCard method="PUT" endpoint="/users/:id" title="Cập Nhật User"
        onSubmit={async (d) => api.put(`/users/${d.id}`, { name: d.name, email: d.email })}
      >
        <AuthNote token={token} />
        <div className="field">
          <label>User ID</label>
          <input name="id" placeholder="64f3abc123..." />
        </div>
        <div className="field">
          <label>Name mới</label>
          <input name="name" placeholder="Nguyen Van B" />
        </div>
        <div className="field">
          <label>Email mới</label>
          <input name="email" type="email" placeholder="new@example.com" />
        </div>
      </ApiCard>

      {/* ---- DELETE ---- */}
      <ApiCard method="DELETE" endpoint="/users/:id" title="Xóa User"
        onSubmit={async (d) => api.delete(`/users/${d.id}`)}
      >
        <AuthNote token={token} />
        <div style={{
          background: 'rgba(255,106,106,0.07)', border: '1px solid rgba(255,106,106,0.2)',
          borderRadius: 6, padding: '10px 14px', marginBottom: 14, fontSize: 12, color: 'var(--accent2)'
        }}>
          ⚠ Thao tác không thể hoàn tác
        </div>
        <div className="field">
          <label>User ID</label>
          <input name="id" placeholder="64f3abc123..." />
        </div>
      </ApiCard>
    </div>
  )
}

function AuthNote({ token }) {
  if (token) return (
    <div style={{
      background: 'rgba(76,255,145,0.07)', border: '1px solid rgba(76,255,145,0.2)',
      borderRadius: 6, padding: '8px 14px', marginBottom: 14, fontSize: 12, color: 'var(--accent3)'
    }}>
      ✓ Đã có token — request sẽ được gửi với Authorization header
    </div>
  )
  return (
    <div style={{
      background: 'rgba(255,106,106,0.07)', border: '1px solid rgba(255,106,106,0.2)',
      borderRadius: 6, padding: '8px 14px', marginBottom: 14, fontSize: 12, color: 'var(--accent2)'
    }}>
      ✗ Chưa đăng nhập — API này cần token, hãy login trước
    </div>
  )
}
