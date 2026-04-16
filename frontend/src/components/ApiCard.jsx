import { useState } from 'react'

export default function ApiCard({ method, endpoint, title, children, onSubmit, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const tagClass = `tag tag-${method.toLowerCase()}`

  const handleSubmit = async (formData) => {
    setLoading(true)
    setResult(null)
    try {
      const res = await onSubmit(formData)
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
      border: `1px solid var(--border)`,
      borderRadius: 10,
      marginBottom: 12,
      overflow: 'hidden',
      transition: 'border-color 0.2s',
      borderColor: open ? 'var(--accent)' : 'var(--border)'
    }}>
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
        <span className={tagClass}>{method}</span>
        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text2)', fontSize: 12 }}>{endpoint}</span>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: 'var(--text)', marginLeft: 8, flex: 1 }}>{title}</span>
        {result && (
          <span style={{ fontSize: 11, fontWeight: 700 }} className={result.ok ? 'status-ok' : 'status-err'}>
            {result.ok ? '✓' : '✗'} {result.status}
          </span>
        )}
        <span style={{ color: 'var(--text2)', fontSize: 16, marginLeft: 4 }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div style={{ padding: 16, background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
          <Form onSubmit={handleSubmit} loading={loading}>
            {children}
          </Form>

          {result && (
            <div style={{ marginTop: 16 }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text2)' }}>Response</span>
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

function Form({ onSubmit, loading, children }) {
  const [vals, setVals] = useState({})

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setVals(v => ({ ...v, [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(vals)
  }

  const enhancedChildren = enhanceChildren(children, vals, handleChange)

  return (
    <form onSubmit={handleSubmit}>
      {enhancedChildren}
      <button
        type="submit"
        className="btn-primary"
        disabled={loading}
        style={{ marginTop: 4, opacity: loading ? 0.7 : 1 }}
      >
        {loading ? '⟳ Đang gửi...' : '→ Gửi Request'}
      </button>
    </form>
  )
}

function enhanceChildren(children, vals, handleChange) {
  if (!children) return null
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map((c, i) => <span key={i}>{enhanceChildren(c, vals, handleChange)}</span>)

  const el = children
  if (!el || !el.props) return el

  const { name, type } = el.props

  if (el.type === 'input' || el.type === 'textarea' || el.type === 'select') {
    return {
      ...el,
      props: {
        ...el.props,
        value: vals[name] ?? '',
        onChange: handleChange,
        autoComplete: 'off'
      }
    }
  }

  if (el.props.children) {
    return {
      ...el,
      props: {
        ...el.props,
        children: enhanceChildren(el.props.children, vals, handleChange)
      }
    }
  }

  return el
}
