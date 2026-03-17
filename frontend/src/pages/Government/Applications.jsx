import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllApplications } from '../../utils/api'

export default function Applications() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const navigate = useNavigate()

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getAllApplications()
        setApplications(data)
      } catch (error) {
        console.log('Error fetching applications')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  const filtered = filter === 'all'
    ? applications
    : applications.filter(a => a.status === filter)

  if (loading) return <p style={{ color: '#6b7280' }}>Loading applications...</p>

  return (
    <div>
      <h2 style={{ color: 'white', marginBottom: 8 }}>All Applications</h2>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Total', value: applications.length, color: '#60a5fa' },
          { label: 'Pending', value: applications.filter(a => a.status === 'pending').length, color: '#fbbf24' },
          { label: 'Approved', value: applications.filter(a => a.status === 'approved').length, color: '#34d399' },
          { label: 'Rejected', value: applications.filter(a => a.status === 'rejected').length, color: '#f87171' },
        ].map((s, i) => (
          <div key={i} style={{
            background: '#111827', border: '1px solid #1f2937',
            borderRadius: 12, padding: 16, textAlign: 'center'
          }}>
            <div style={{ color: s.color, fontWeight: 800, fontSize: 26, fontFamily: 'monospace' }}>{s.value}</div>
            <div style={{ color: '#6b7280', fontSize: 12, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter Buttons */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {['all', 'pending', 'approved', 'rejected'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '7px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
            fontWeight: 600, fontSize: 12,
            background: filter === f ? '#10b981' : '#1f2937',
            color: filter === f ? 'white' : '#6b7280'
          }}>{f.charAt(0).toUpperCase() + f.slice(1)}</button>
        ))}
      </div>

      {/* Applications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.length === 0 && (
          <p style={{ color: '#6b7280', textAlign: 'center', padding: 40 }}>No applications found</p>
        )}
        {filtered.map(app => (
          <div key={app._id} style={{
            background: '#111827', border: '1px solid #1f2937',
            borderRadius: 12, padding: '16px 20px',
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', flexWrap: 'wrap', gap: 12
          }}>
            <div>
              <p style={{ color: 'white', fontWeight: 600, margin: '0 0 4px', fontSize: 15 }}>{app.name}</p>
              <p style={{ color: '#6b7280', fontSize: 12, margin: 0 }}>{app.address} • {app.numberOfPanels} panels</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{
                padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                background: app.status === 'approved' ? '#064e3b' : app.status === 'rejected' ? '#450a0a' : '#451a03',
                color: app.status === 'approved' ? '#34d399' : app.status === 'rejected' ? '#f87171' : '#fbbf24'
              }}>
                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
              </span>
              <button onClick={() => navigate(`/government/client/${app._id}`)} style={{
                padding: '7px 16px', background: '#1f2937',
                border: '1px solid #374151', borderRadius: 8,
                color: '#d1d5db', cursor: 'pointer', fontSize: 12, fontWeight: 600
              }}>View →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}