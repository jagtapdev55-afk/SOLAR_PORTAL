import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { loginUser } from '../../utils/api'
import toast from 'react-hot-toast'

export default function Login() {
  const [role, setRole] = useState('client')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      setLoading(true)
      const { data } = await loginUser({ email, password })

      // Check if role matches
      if (data.role !== role) {
        toast.error(`This account is not a ${role} account!`)
        return
      }

      // Save user to context + localStorage
      login(data)
      toast.success(`Welcome back, ${data.name}!`)

      // Redirect based on role
      if (data.role === 'client') navigate('/client')
      else navigate('/government')

    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#0b0f1a',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: 20
    }}>
      {/* Background glow */}
      <div style={{
        position: 'fixed', top: '20%', left: '50%',
        transform: 'translateX(-50%)', width: 500, height: 500,
        borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)'
      }} />

      <div style={{ width: '100%', maxWidth: 420 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 18, margin: '0 auto 14px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 30, boxShadow: '0 0 30px rgba(16,185,129,0.35)'
          }}>☀️</div>
          <h1 style={{ color: 'white', fontSize: 26, fontWeight: 800, margin: 0 }}>SolarPort</h1>
          <p style={{ color: '#6b7280', fontSize: 13, marginTop: 4 }}>Solar Panel Management System</p>
        </div>

        {/* Role Toggle */}
        <div style={{
          display: 'flex', background: '#111827', borderRadius: 12,
          padding: 4, marginBottom: 24, border: '1px solid #1f2937'
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

        {/* Form Card */}
        <div style={{
          background: 'linear-gradient(135deg, #1a1f2e, #141824)',
          border: '1px solid #2d3748', borderRadius: 16, padding: 24
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Email */}
            <div>
              <label style={{
                color: '#9ca3af', fontSize: 11,
                fontWeight: 700, display: 'block',
                marginBottom: 6, letterSpacing: 0.5
              }}>EMAIL ADDRESS</label>
              <input
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={role === 'client' ? 'you@email.com' : 'officer@gov.in'}
                style={{
                  width: '100%', padding: '12px 14px',
                  background: '#0b0f1a', border: '1px solid #2d3748',
                  borderRadius: 10, color: 'white', fontSize: 14,
                  outline: 'none', boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{
                color: '#9ca3af', fontSize: 11,
                fontWeight: 700, display: 'block',
                marginBottom: 6, letterSpacing: 0.5
              }}>PASSWORD</label>
              <input
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='••••••••'
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                style={{
                  width: '100%', padding: '12px 14px',
                  background: '#0b0f1a', border: '1px solid #2d3748',
                  borderRadius: 10, color: 'white', fontSize: 14,
                  outline: 'none', boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              style={{
                padding: 13, marginTop: 4, border: 'none',
                borderRadius: 10, fontWeight: 800, fontSize: 15,
                cursor: loading ? 'not-allowed' : 'pointer',
                background: loading
                  ? '#1f2937'
                  : 'linear-gradient(135deg, #10b981, #059669)',
                color: loading ? '#6b7280' : 'white',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(16,185,129,0.3)'
              }}>
              {loading ? 'Logging in...' : `Login as ${role === 'client' ? 'Client' : 'Government Officer'}`}
            </button>

          </div>
        </div>

        {/* Register Link */}
        <p style={{ textAlign: 'center', marginTop: 20, color: '#6b7280', fontSize: 13 }}>
          Don't have an account?{' '}
          <Link to='/register' style={{ color: '#10b981', fontWeight: 600, textDecoration: 'none' }}>
            Register here
          </Link>
        </p>

      </div>
    </div>
  )
}