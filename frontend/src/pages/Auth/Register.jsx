import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../../utils/api'
import toast from 'react-hot-toast'

export default function Register() {
  const [role, setRole] = useState('client')
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '', address: ''
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      toast.error('Please fill in all required fields')
      return
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    try {
      setLoading(true)
      await registerUser({ ...form, role })
      toast.success('Account created! Please login.')
      navigate('/login')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '12px 14px', background: '#0b0f1a',
    border: '1px solid #2d3748', borderRadius: 10, color: 'white',
    fontSize: 14, outline: 'none', boxSizing: 'border-box'
  }
  const labelStyle = {
    color: '#9ca3af', fontSize: 11, fontWeight: 700,
    display: 'block', marginBottom: 6, letterSpacing: 0.5
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#0b0f1a',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: 20
    }}>
      <div style={{ width: '100%', maxWidth: 440 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, margin: '0 auto 12px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, boxShadow: '0 0 24px rgba(16,185,129,0.35)'
          }}>☀️</div>
          <h1 style={{ color: 'white', fontSize: 24, fontWeight: 800, margin: 0 }}>Create Account</h1>
          <p style={{ color: '#6b7280', fontSize: 13, marginTop: 4 }}>Join SolarPort today</p>
        </div>

        {/* Role Toggle */}
        <div style={{
          display: 'flex', background: '#111827', borderRadius: 12,
          padding: 4, marginBottom: 20, border: '1px solid #1f2937'
        }}>
          {['client', 'government'].map(r => (
            <button key={r} onClick={() => setRole(r)} style={{
              flex: 1, padding: '10px 0', borderRadius: 9,
              border: 'none', cursor: 'pointer', fontWeight: 700,
              fontSize: 13, transition: 'all 0.2s',
              background: role === r
                ? 'linear-gradient(135deg, #10b981, #059669)'
                : 'transparent',
              color: role === r ? 'white' : '#6b7280'
            }}>
              {r === 'client' ? '👤 Client' : '🏛️ Government'}
            </button>
          ))}
        </div>

        {/* Form */}
        <div style={{
          background: 'linear-gradient(135deg, #1a1f2e, #141824)',
          border: '1px solid #2d3748', borderRadius: 16, padding: 24
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            <div>
              <label style={labelStyle}>FULL NAME *</label>
              <input style={inputStyle} placeholder='Rajesh Patel'
                value={form.name} onChange={e => update('name', e.target.value)} />
            </div>

            <div>
              <label style={labelStyle}>EMAIL ADDRESS *</label>
              <input style={inputStyle} type='email' placeholder='you@email.com'
                value={form.email} onChange={e => update('email', e.target.value)} />
            </div>

            <div>
              <label style={labelStyle}>PASSWORD *</label>
              <input style={inputStyle} type='password' placeholder='Min 6 characters'
                value={form.password} onChange={e => update('password', e.target.value)} />
            </div>

            <div>
              <label style={labelStyle}>PHONE NUMBER</label>
              <input style={inputStyle} placeholder='+91 98765 43210'
                value={form.phone} onChange={e => update('phone', e.target.value)} />
            </div>

            <div>
              <label style={labelStyle}>ADDRESS</label>
              <input style={inputStyle} placeholder='Your full address'
                value={form.address} onChange={e => update('address', e.target.value)} />
            </div>

            <button onClick={handleRegister} disabled={loading} style={{
              padding: 13, marginTop: 4, border: 'none',
              borderRadius: 10, fontWeight: 800, fontSize: 15,
              cursor: loading ? 'not-allowed' : 'pointer',
              background: loading
                ? '#1f2937'
                : 'linear-gradient(135deg, #10b981, #059669)',
              color: loading ? '#6b7280' : 'white',
              boxShadow: loading ? 'none' : '0 4px 20px rgba(16,185,129,0.3)'
            }}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, color: '#6b7280', fontSize: 13 }}>
          Already have an account?{' '}
          <Link to='/login' style={{ color: '#10b981', fontWeight: 600, textDecoration: 'none' }}>
            Login here
          </Link>
        </p>

      </div>
    </div>
  )
}