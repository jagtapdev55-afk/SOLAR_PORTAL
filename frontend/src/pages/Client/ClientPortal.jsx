import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Apply from './Apply'
import Status from './Status'
import Dashboard from './Dashboard'

export default function ClientPortal() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0b0f1a', fontFamily: 'Segoe UI, sans-serif' }}>

      {/* Top Navbar */}
      <nav style={{
        background: '#111827', borderBottom: '1px solid #1f2937',
        padding: '0 24px', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between', height: 60
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 22 }}>☀️</span>
          <span style={{ color: 'white', fontWeight: 800 }}>SolarPort</span>
          <span style={{
            background: '#064e3b', color: '#34d399',
            fontSize: 10, padding: '2px 8px',
            borderRadius: 20, fontWeight: 600
          }}>CLIENT</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ color: '#6b7280', fontSize: 13 }}>👤 {user?.name}</span>
          <button onClick={handleLogout} style={{
            background: 'transparent', border: '1px solid #374151',
            color: '#9ca3af', padding: '6px 14px',
            borderRadius: 8, cursor: 'pointer', fontSize: 12
          }}>Logout</button>
        </div>
      </nav>

      {/* Tab Navigation */}
      <div style={{
        background: '#111827', borderBottom: '1px solid #1f2937',
        padding: '0 24px', display: 'flex', gap: 4
      }}>
        {[
          { to: '/client', label: '📋 Apply', end: true },
          { to: '/client/status', label: '📍 Status' },
          { to: '/client/dashboard', label: '⚡ Dashboard' },
        ].map((tab) => (
          <NavLink key={tab.to} to={tab.to} end={tab.end} style={({ isActive }) => ({
            padding: '14px 20px', textDecoration: 'none',
            fontWeight: 600, fontSize: 13,
            borderBottom: isActive ? '2px solid #10b981' : '2px solid transparent',
            color: isActive ? '#10b981' : '#6b7280'
          })}>
            {tab.label}
          </NavLink>
        ))}
      </div>

      {/* Page Content */}
      <div style={{ padding: 24 }}>
        <Routes>
          <Route index element={<Apply />} />
          <Route path='status' element={<Status />} />
          <Route path='dashboard' element={<Dashboard />} />
        </Routes>
      </div>

    </div>
  )
}