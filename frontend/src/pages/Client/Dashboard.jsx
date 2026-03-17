import { useState, useEffect } from 'react'
import { getMySolarData, getMyApplication } from '../../utils/api'

export default function Dashboard() {
  const [solarData, setSolarData] = useState(null)
  const [application, setApplication] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [solarRes, appRes] = await Promise.all([
          getMySolarData(),
          getMyApplication()
        ])
        setSolarData(solarRes.data)
        setApplication(appRes.data)
      } catch (error) {
        console.log('Error fetching data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <p style={{ color: '#6b7280' }}>Loading...</p>

  if (!application || application.status !== 'approved') return (
    <div style={{ color: '#6b7280', textAlign: 'center', padding: 40 }}>
      <p style={{ fontSize: 40 }}>🔒</p>
      <p>Dashboard unlocks after your application is approved.</p>
    </div>
  )

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <h2 style={{ color: 'white', marginBottom: 8 }}>⚡ Solar Dashboard</h2>
      <p style={{ color: '#6b7280', marginBottom: 24, fontSize: 14 }}>
        {application.numberOfPanels} Panels • {application.systemCapacity} • Live monitoring
      </p>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 20 }}>
        {[
          { icon: '⚡', label: 'Generated', value: `${solarData?.energyGenerated || 0} kWh`, color: '#10b981' },
          { icon: '🔄', label: 'Sent to Grid', value: `${solarData?.energySentToGrid || 0} kWh`, color: '#f59e0b' },
          { icon: '💰', label: 'Money Earned', value: `₹${solarData?.moneyEarned || 0}`, color: '#60a5fa' },
          { icon: '🌍', label: 'CO₂ Saved', value: `${solarData?.co2Saved || 0} tons`, color: '#a78bfa' },
        ].map((s, i) => (
          <div key={i} style={{
            background: '#111827', border: '1px solid #1f2937',
            borderRadius: 12, padding: 18
          }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ color: s.color, fontWeight: 800, fontSize: 20, fontFamily: 'monospace' }}>{s.value}</div>
            <div style={{ color: '#6b7280', fontSize: 12, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Calculation Breakdown */}
      <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: 12, padding: 20 }}>
        <h3 style={{ color: 'white', marginBottom: 16, fontSize: 15 }}>💡 Earnings Calculation</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { label: 'Energy sent to grid', value: `${solarData?.energySentToGrid || 0} kWh` },
            { label: 'Grid rate per unit', value: `₹${solarData?.gridRate || 4} / kWh` },
            { label: 'Total earnings this month', value: `₹${solarData?.moneyEarned || 0}`, highlight: true },
          ].map((r, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '10px 14px', borderRadius: 8,
              background: r.highlight ? '#064e3b' : '#0b0f1a',
              border: `1px solid ${r.highlight ? '#10b981' : '#1f2937'}`
            }}>
              <span style={{ color: r.highlight ? '#34d399' : '#9ca3af', fontSize: 13 }}>{r.label}</span>
              <span style={{ color: r.highlight ? '#10b981' : 'white', fontWeight: 700 }}>{r.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}