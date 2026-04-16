import { useEffect } from 'react'
import ApiCard from '../components/ApiCard'
import { api, setAuthToken } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Products() {
  const { token } = useAuth()

  useEffect(() => {
    setAuthToken(token)
  }, [token])

  const productFields = (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div className="field">
          <label>Name</label>
          <input name="name" placeholder="Áo thun basic" />
        </div>
        <div className="field">
          <label>Category</label>
          <input name="category" placeholder="Thời trang" />
        </div>
        <div className="field">
          <label>Price (số)</label>
          <input name="price" type="number" placeholder="150000" min="0" />
        </div>
        <div className="field">
          <label>Stock (số)</label>
          <input name="stock" type="number" placeholder="100" min="0" />
        </div>
      </div>
      <div className="field">
        <label>Description</label>
        <textarea name="description" placeholder="Mô tả sản phẩm..." rows={3} style={{ resize: 'vertical' }} />
      </div>
      <div className="field">
        <label>Image URL</label>
        <input name="image" placeholder="https://example.com/image.jpg" />
      </div>
    </>
  )

  return (
    <div style={{ padding: '32px 24px', maxWidth: 860, margin: '0 auto' }}>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, letterSpacing: '0.02em' }}>
          <span style={{ color: 'var(--accent3)' }}>Products</span> API
        </h2>
        <p style={{ color: 'var(--text2)', marginTop: 4 }}>Quản lý sản phẩm — không cần auth</p>
      </div>

      {/* CREATE */}
      <ApiCard method="POST" endpoint="/products/" title="Tạo Sản Phẩm Mới"
        onSubmit={async (d) => api.post('/products/', {
          name: d.name,
          price: d.price,
          description: d.description,
          stock: d.stock,
          category: d.category,
          image: d.image
        })}
      >
        {productFields}
      </ApiCard>

      {/* GET ALL */}
      <ApiCard method="GET" endpoint="/products/" title="Danh Sách Tất Cả Sản Phẩm"
        onSubmit={async () => api.get('/products/')}
      >
        <div style={{ color: 'var(--text2)', fontSize: 12, marginBottom: 14 }}>
          Không cần body — nhấn gửi để lấy tất cả sản phẩm
        </div>
      </ApiCard>

      {/* GET BY ID */}
      <ApiCard method="GET" endpoint="/products/:id" title="Lấy Chi Tiết Sản Phẩm"
        onSubmit={async (d) => api.get(`/products/${d.id}`)}
      >
        <div className="field">
          <label>Product ID</label>
          <input name="id" placeholder="64f3abc123..." />
        </div>
      </ApiCard>

      {/* UPDATE */}
      <ApiCard method="PUT" endpoint="/products/:id" title="Cập Nhật Sản Phẩm"
        onSubmit={async (d) => {
          const body = {}
          if (d.name) body.name = d.name
          if (d.price !== '') body.price = d.price
          if (d.description) body.description = d.description
          if (d.stock !== '') body.stock = d.stock
          if (d.category) body.category = d.category
          if (d.image) body.image = d.image
          return api.put(`/products/${d.id}`, body)
        }}
      >
        <div style={{ color: 'var(--text2)', fontSize: 12, marginBottom: 14 }}>
          Chỉ điền các trường muốn cập nhật
        </div>
        <div className="field">
          <label>Product ID <span style={{ color: 'var(--accent2)' }}>*</span></label>
          <input name="id" placeholder="64f3abc123..." />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="field">
            <label>Name mới</label>
            <input name="name" placeholder="Áo thun mới" />
          </div>
          <div className="field">
            <label>Category mới</label>
            <input name="category" placeholder="Thời trang" />
          </div>
          <div className="field">
            <label>Price mới</label>
            <input name="price" type="number" placeholder="200000" min="0" />
          </div>
          <div className="field">
            <label>Stock mới</label>
            <input name="stock" type="number" placeholder="50" min="0" />
          </div>
        </div>
        <div className="field">
          <label>Description mới</label>
          <textarea name="description" placeholder="Mô tả..." rows={2} style={{ resize: 'vertical' }} />
        </div>
        <div className="field">
          <label>Image URL mới</label>
          <input name="image" placeholder="https://..." />
        </div>
      </ApiCard>

      {/* DELETE */}
      <ApiCard method="DELETE" endpoint="/products/:id" title="Xóa Sản Phẩm"
        onSubmit={async (d) => api.delete(`/products/${d.id}`)}
      >
        <div style={{
          background: 'rgba(255,106,106,0.07)', border: '1px solid rgba(255,106,106,0.2)',
          borderRadius: 6, padding: '10px 14px', marginBottom: 14, fontSize: 12, color: 'var(--accent2)'
        }}>
          ⚠ Thao tác không thể hoàn tác
        </div>
        <div className="field">
          <label>Product ID</label>
          <input name="id" placeholder="64f3abc123..." />
        </div>
      </ApiCard>
    </div>
  )
}
