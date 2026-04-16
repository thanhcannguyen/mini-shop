import { useEffect, useState } from 'react'
import ApiCard from '../components/ApiCard'
import { api, setAuthToken } from '../services/api'
import { useAuth } from '../context/AuthContext'

// Component hiển thị trạng thái token
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
      ✗ API này cần token — hãy đăng nhập trước ở tab Users
    </div>
  )
}

// Card tạo đơn hàng có nút thu gọn ▲▼
function CreateOrderCard({ token }) {
  const [open, setOpen] = useState(false)
  const [orderItems, setOrderItems] = useState([{ product: '', quantity: 1 }])
  const [shippingAddress, setShippingAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const addItem = () => setOrderItems(i => [...i, { product: '', quantity: 1 }])
  const removeItem = (idx) => setOrderItems(i => i.filter((_, j) => j !== idx))
  const updateItem = (idx, field, val) => setOrderItems(items =>
    items.map((item, j) => j === idx
      ? { ...item, [field]: field === 'quantity' ? Number(val) : val }
      : item
    )
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    try {
      const res = await api.post('/orders/', {
        items: orderItems.filter(i => i.product.trim() !== ''),
        shippingAddress,
        phoneNumber: Number(phoneNumber),
        note
      })
      setResult({ ok: true, status: res.status, data: res.data })
    } catch (err) {
      setResult({
        ok: false,
        status: err.response?.status || 0,
        data: err.response?.data || { message: err.message }
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      border: `1px solid ${open ? 'var(--accent)' : 'var(--border)'}`,
      borderRadius: 10,
      marginBottom: 12,
      overflow: 'hidden',
      transition: 'border-color 0.2s'
    }}>
      {/* Header — click để toggle */}
      <button
        onClick={() => setOpen(o => !o)}
        className="btn-ghost"
        style={{
          width: '100%', textAlign: 'left', borderRadius: 0, border: 'none',
          padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10,
          background: open ? 'var(--bg3)' : 'var(--bg2)',
          textTransform: 'none', letterSpacing: 0, fontSize: 13
        }}
      >
        <span className="tag tag-post">POST</span>
        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text2)', fontSize: 12 }}>/orders/</span>
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 14, color: 'var(--text)', flex: 1, marginLeft: 8
        }}>
          Tạo Đơn Hàng Mới
        </span>
        {result && (
          <span style={{ fontSize: 11, fontWeight: 700 }} className={result.ok ? 'status-ok' : 'status-err'}>
            {result.ok ? '✓' : '✗'} {result.status}
          </span>
        )}
        <span style={{ color: 'var(--text2)', fontSize: 16, marginLeft: 4 }}>
          {open ? '▲' : '▼'}
        </span>
      </button>

      {/* Body */}
      {open && (
        <div style={{ padding: 16, background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
          <AuthNote token={token} />

          <form onSubmit={handleSubmit}>
            {/* Danh sách sản phẩm */}
            <div style={{ marginBottom: 14 }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: 8
              }}>
                <label style={{ marginBottom: 0 }}>Sản phẩm trong đơn</label>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={addItem}
                  style={{ padding: '4px 10px', fontSize: 11 }}
                >
                  + Thêm sản phẩm
                </button>
              </div>

              {orderItems.map((item, idx) => (
                <div key={idx} style={{
                  display: 'flex', gap: 8, alignItems: 'center',
                  marginBottom: 8, background: 'var(--bg3)',
                  padding: 10, borderRadius: 6
                }}>
                  <div style={{ flex: 3 }}>
                    <input
                      placeholder="Product ID (ví dụ: 64f3abc...)"
                      value={item.product}
                      onChange={e => updateItem(idx, 'product', e.target.value)}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <input
                      type="number" min="1"
                      placeholder="Số lượng"
                      value={item.quantity}
                      onChange={e => updateItem(idx, 'quantity', e.target.value)}
                    />
                  </div>
                  {orderItems.length > 1 && (
                    <button
                      type="button"
                      className="btn-danger"
                      onClick={() => removeItem(idx)}
                      style={{ padding: '6px 10px', flexShrink: 0 }}
                    >✕</button>
                  )}
                </div>
              ))}
            </div>

            {/* Địa chỉ & SĐT */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="field">
                <label>Địa chỉ giao hàng</label>
                <input
                  placeholder="123 Đường ABC, Quận 1, TP.HCM"
                  value={shippingAddress}
                  onChange={e => setShippingAddress(e.target.value)}
                />
              </div>
              <div className="field">
                <label>Số điện thoại</label>
                <input
                  type="number"
                  placeholder="0901234567"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            {/* Ghi chú */}
            <div className="field">
              <label>Ghi chú (tuỳ chọn)</label>
              <input
                placeholder="Giao giờ hành chính..."
                value={note}
                onChange={e => setNote(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? '⟳ Đang gửi...' : '→ Gửi Request'}
            </button>
          </form>

          {/* Response */}
          {result && (
            <div style={{ marginTop: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.08em', color: 'var(--text2)'
                }}>Response</span>
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  color: result.ok ? 'var(--success)' : 'var(--error)',
                  background: result.ok ? 'rgba(76,255,145,0.1)' : 'rgba(255,76,106,0.1)',
                  border: `1px solid ${result.ok ? 'rgba(76,255,145,0.3)' : 'rgba(255,76,106,0.3)'}`,
                  padding: '2px 8px', borderRadius: 4
                }}>
                  HTTP {result.status}
                </span>
              </div>
              <pre style={{ color: result.ok ? 'var(--accent3)' : 'var(--accent2)' }}>
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Component chính
export default function Orders() {
  const { token } = useAuth()

  useEffect(() => {
    setAuthToken(token)
  }, [token])

  const statusOptions = ['pending', 'confirmed', 'shipping', 'completed', 'cancelled']
  const statusColors = {
    pending: 'var(--warning)',
    confirmed: 'var(--accent)',
    shipping: 'var(--accent3)',
    completed: 'var(--success)',
    cancelled: 'var(--accent2)'
  }

  return (
    <div style={{ padding: '32px 24px', maxWidth: 860, margin: '0 auto' }}>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 28, letterSpacing: '0.02em'
        }}>
          <span style={{ color: 'var(--warning)' }}>Orders</span> API
        </h2>
        <p style={{ color: 'var(--text2)', marginTop: 4 }}>
          Quản lý đơn hàng — tất cả cần token auth
        </p>
      </div>

      {/* POST — Tạo đơn hàng */}
      <CreateOrderCard token={token} />

      {/* GET — Đơn hàng của tôi */}
      <ApiCard
        method="GET"
        endpoint="/orders/my-orders"
        title="Đơn Hàng Của Tôi"
        onSubmit={async () => api.get('/orders/my-orders')}
      >
        <AuthNote token={token} />
        <div style={{ color: 'var(--text2)', fontSize: 12, marginBottom: 14 }}>
          Lấy tất cả đơn hàng của user đang đăng nhập (dùng token)
        </div>
      </ApiCard>

      {/* GET — Chi tiết đơn hàng */}
      <ApiCard
        method="GET"
        endpoint="/orders/:id"
        title="Chi Tiết Đơn Hàng"
        onSubmit={async (d) => api.get(`/orders/${d.id}`)}
      >
        <AuthNote token={token} />
        <div className="field">
          <label>Order ID</label>
          <input name="id" placeholder="64f3abc123..." />
        </div>
      </ApiCard>

      {/* PUT — Cập nhật trạng thái */}
      <ApiCard
        method="PUT"
        endpoint="/orders/:id/status"
        title="Cập Nhật Trạng Thái Đơn Hàng"
        onSubmit={async (d) => api.put(`/orders/${d.id}/status`, { status: d.status })}
      >
        <AuthNote token={token} />
        <div className="field">
          <label>Order ID</label>
          <input name="id" placeholder="64f3abc123..." />
        </div>
        <div className="field">
          <label>Trạng thái mới</label>
          <select name="status" defaultValue="pending">
            {statusOptions.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
          {statusOptions.map(s => (
            <span key={s} style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.05em',
              padding: '3px 10px', borderRadius: 4,
              background: 'rgba(255,255,255,0.05)',
              color: statusColors[s],
              border: `1px solid ${statusColors[s]}`
            }}>{s}</span>
          ))}
        </div>
      </ApiCard>

      {/* DELETE — Xóa đơn hàng */}
      <ApiCard
        method="DELETE"
        endpoint="/orders/:id"
        title="Xóa Đơn Hàng"
        onSubmit={async (d) => api.delete(`/orders/${d.id}`)}
      >
        <AuthNote token={token} />
        <div style={{
          background: 'rgba(255,106,106,0.07)', border: '1px solid rgba(255,106,106,0.2)',
          borderRadius: 6, padding: '10px 14px', marginBottom: 14,
          fontSize: 12, color: 'var(--accent2)'
        }}>
          ⚠ Thao tác không thể hoàn tác
        </div>
        <div className="field">
          <label>Order ID</label>
          <input name="id" placeholder="64f3abc123..." />
        </div>
      </ApiCard>
    </div>
  )
}
