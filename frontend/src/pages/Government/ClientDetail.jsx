import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getAllApplications, updateApplicationStatus, getClientSolarData } from '../../utils/api'
import toast from 'react-hot-toast'

export default function ClientDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [application, setApplication] = useState(null)
  const [solarData, setSolarData] = useState(null)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('docs')

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getAllApplications()
        const app = data.find(a => a._id === id)
        setApplication(app)
        if (app?.status === 'approved') {
          const solar = await getClientSolarData(app.client)
          setSolarData(solar.data)
        }
      } catch (error) {
        console.log('Error')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  const handleStatus = async (status) => {
    try {
      await updateApplicationStatus(id, { status, officerComment: comment })
      toast.success(`Application ${status} successfully!`)
      navigate('/government')
    } catch (error) {
      toast.error('Action failed')
    }
  }

  if (loading) return <p style={{ color: '#6b7280' }}>Loading...</p>
  if (!application) return <p style={{ color: '#6b7280' }}>Application not found</p>

  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>
      <button onClick={() => navigate('/government')} style={{
        background: 'transparent', border: 'none',
        color: '#6b7280', cursor: 'pointer', marginBottom: 20,
        fontSize: 14, padding: 0
      }}>← Back to Applications</button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ color: 'white', margin: '0 0 4px' }}>{application.name}</h2>
          <p style={{ color: '#6b7280', margin: 0, fontSize: 13 }}>{application.address}</p>
        </div>
        <span style={{
          padding: '6px 16px', borderRadius: 20, fontWeight: 700, fontSize: 13,
          background: application.status === 'approved' ? '#064e3b' : application.status === 'rejected' ? '#450a0a' : '#451a03',
          color: application.status === 'approved' ? '#34d399' : application.status === 'rejected' ? '#f87171' : '#fbbf24'
        }}>
          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
        </span>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20, borderBottom: '1px solid #1f2937' }}>
        {['docs', 'solar'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '10px 16px', border: 'none', background: 'transparent',
            cursor: 'pointer', fontWeight: 600, fontSize: 13,
            borderBottom: tab === t ? '2px solid #10b981' : '2px solid transparent',
            color: tab === t ? '#10b981' : '#6b7280'
          }}>
            {t === 'docs' ? '📄 Documents' : '⚡ Solar Stats'}
          </button>
        ))}
      </div>

      {/* Documents Tab */}
      {tab === 'docs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Client Info */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 8 }}>
            {[
              { label: 'Phone', value: application.phone },
              { label: 'Monthly Bill', value: `₹${application.monthlyBill}` },
              { label: 'Roof Area', value: `${application.roofArea} sq ft` },
              { label: 'Panels', value: application.numberOfPanels },
            ].map((f, i) => (
              <div key={i} style={{
                background: '#111827', borderRadius: 8,
                padding: '10px 14px', border: '1px solid #1f2937'
              }}>
                <p style={{ color: '#6b7280', fontSize: 11, margin: '0 0 2px', fontWeight: 600 }}>{f.label}</p>
                <p style={{ color: 'white', fontSize: 13, margin: 0, fontWeight: 600 }}>{f.value}</p>
              </div>
            ))}
          </div>

          {/* Documents */}
          <h4 style={{ color: '#9ca3af', fontSize: 12, margin: '0 0 8px', fontWeight: 700 }}>SUBMITTED DOCUMENTS</h4>
          {application.documents?.length > 0
            ? application.documents.map((doc, i) => (
              <div key={i} style={{
                padding: '12px 16px', background: '#111827',
                border: '1px solid #1f2937', borderRadius: 8,
                display: 'flex', justifyContent: 'space-between'
              }}>
                <span style={{ color: '#d1d5db', fontSize: 13 }}>📎 {doc.name}</span>
                <a href={doc.url} target='_blank' rel='noreferrer' style={{ color: '#60a5fa', fontSize: 12, fontWeight: 600 }}>View →</a>
              </div>
            ))
            : <p style={{ color: '#4b5563', fontSize: 13 }}>No documents uploaded yet</p>
          }

          {/* Approve / Reject */}
          {application.status === 'pending' && (
            <div style={{ marginTop: 8 }}>
              <label style={{ color: '#9ca3af', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>
                COMMENT (optional)
              </label>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder='Add a comment or rejection reason...'
                rows={3}
                style={{
                  width: '100%', padding: '11px 14px', background: '#111827',
                  border: '1px solid #2d3748', borderRadius: 8, color: 'white',
                  fontSize: 14, outline: 'none', boxSizing: 'border-box',
                  resize: 'vertical', fontFamily: 'Segoe UI, sans-serif'
                }}
              />
              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                <button onClick={() => handleStatus('rejected')} style={{
                  flex: 1, padding: 12, background: '#450a0a',
                  border: '1px solid #7f1d1d', borderRadius: 8,
                  color: '#f87171', fontWeight: 700, cursor: 'pointer'
                }}>❌ Reject</button>
                <button onClick={() => handleStatus('approved')} style={{
                  flex: 2, padding: 12, background: '#10b981',
                  border: 'none', borderRadius: 8,
                  color: 'white', fontWeight: 700, cursor: 'pointer'
                }}>✅ Approve</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Solar Stats Tab */}
      {tab === 'solar' && (
        <div>
          {solarData ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
              {[
                { icon: '⚡', label: 'Generated', value: `${solarData.energyGenerated} kWh`, color: '#10b981' },
                { icon: '🔄', label: 'Sent to Grid', value: `${solarData.energySentToGrid} kWh`, color: '#f59e0b' },
                { icon: '💰', label: 'Earned', value: `₹${solarData.moneyEarned}`, color: '#60a5fa' },
                { icon: '🌍', label: 'CO₂ Saved', value: `${solarData.co2Saved} tons`, color: '#a78bfa' },
              ].map((s, i) => (
                <div key={i} style={{
                  background: '#111827', border: '1px solid #1f2937',
                  borderRadius: 12, padding: 18
                }}>
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ color: s.color, fontWeight: 800, fontSize: 18, fontFamily: 'monospace' }}>{s.value}</div>
                  <div style={{ color: '#6b7280', fontSize: 12, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#4b5563', textAlign: 'center', padding: 40 }}>
              ⚡ Solar data available after installation is complete
            </p>
          )}
        </div>
      )}
    </div>
  )
}