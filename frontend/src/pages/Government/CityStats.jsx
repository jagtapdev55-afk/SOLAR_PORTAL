import { useState, useEffect } from 'react'
import { getAllApplications } from '../../utils/api'

export default function CityStats() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getAllApplications()
        setApplications(data)
      } catch (error) {
        console.log('Error')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  if (loading) return <p style={{ color: '#6b7280' }}>Loading...</p>

  const approved = applications.filter(a => a.status === 'approved')
  const totalPanels = approved.reduce((a, c) => a + (c.numberOfPanels || 0), 0)

  return (
    <div>
      <h2 style={{ color: 'white', marginBottom: 8 }}>📊 City Wide Statistics</h2>
      <p style={{ color: '#6b7280', marginBottom: 24, fontSize: 14 }}>
        Overview of all solar installations in the city
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
        {[
          { icon: '📋', label: 'Total Applications', value: applications.length, color: '#60a5fa' },
          { icon: '✅', label: 'Approved', value: approved.length, color: '#34d399' },
          { icon: '⏳', label: 'Pending', value: applications.filter(a => a.status === 'pending').length, color: '#fbbf24' },
          { icon: '🔆', label: 'Total Panels', value: totalPanels, color: '#f59e0b' },
        ].map((s, i) => (
          <div key={i} style={{
            background: '#111827', border: '1px solid #1f2937',
            borderRadius: 14, padding: 22
          }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
            <div style={{ color: s.color, fontWeight: 900, fontSize: 28, fontFamily: 'monospace' }}>{s.value}</div>
            <div style={{ color: '#6b7280', fontSize: 13, marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Approved clients list */}
      <h3 style={{ color: 'white', marginTop: 32, marginBottom: 16 }}>✅ Approved Installations</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {approved.length === 0 && <p style={{ color: '#6b7280' }}>No approved installations yet</p>}
        {approved.map(app => (
          <div key={app._id} style={{
            background: '#111827', border: '1px solid #1f2937',
            borderRadius: 10, padding: '14px 18px',
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', flexWrap: 'wrap', gap: 10
          }}>
            <div>
              <p style={{ color: 'white', fontWeight: 600, margin: '0 0 2px' }}>{app.name}</p>
              <p style={{ color: '#6b7280', fontSize: 12, margin: 0 }}>{app.address}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: '#34d399', fontWeight: 700, margin: '0 0 2px', fontFamily: 'monospace' }}>
                {app.numberOfPanels} panels
              </p>
              <p style={{ color: '#6b7280', fontSize: 12, margin: 0 }}>{app.systemCapacity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
