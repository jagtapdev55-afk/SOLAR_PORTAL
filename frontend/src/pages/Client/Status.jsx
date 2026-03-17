import { useState, useEffect } from 'react'
import { getMyApplication } from '../../utils/api'

export default function Status() {
  const [application, setApplication] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getMyApplication()
        setApplication(data)
      } catch (error) {
        console.log('No application found')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  if (loading) return <p style={{ color: '#6b7280' }}>Loading...</p>

  if (!application) return (
    <div style={{ color: '#6b7280', textAlign: 'center', padding: 40 }}>
      <p style={{ fontSize: 40 }}>📋</p>
      <p>No application found. Please apply first.</p>
    </div>
  )

  const steps = [
    { label: 'Application Submitted', done: true },
    { label: 'Documents Verified', done: application.status !== 'pending' },
    { label: 'Government Approval', done: application.status === 'approved' },
    { label: 'Installation Scheduled', done: application.status === 'approved' },
    { label: 'Solar Live!', done: application.status === 'approved' },
  ]

  return (
    <div style={{ maxWidth: 580, margin: '0 auto' }}>
      <h2 style={{ color: 'white', marginBottom: 8 }}>Application Status</h2>

      {/* Status Badge */}
      <div style={{ marginBottom: 28 }}>
        <span style={{
          padding: '6px 16px', borderRadius: 20, fontWeight: 700, fontSize: 13,
          background: application.status === 'approved' ? '#064e3b' :
                      application.status === 'rejected' ? '#450a0a' : '#451a03',
          color: application.status === 'approved' ? '#34d399' :
                 application.status === 'rejected' ? '#f87171' : '#fbbf24'
        }}>
          {application.status === 'approved' ? '✅ Approved' :
           application.status === 'rejected' ? '❌ Rejected' : '⏳ Pending Review'}
        </span>
      </div>

      {/* Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: s.done ? '#10b981' : '#1f2937',
                color: s.done ? 'white' : '#4b5563', fontWeight: 700, fontSize: 14
              }}>{s.done ? '✓' : i + 1}</div>
              {i < steps.length - 1 && (
                <div style={{ width: 2, height: 32, background: s.done ? '#10b981' : '#1f2937' }} />
              )}
            </div>
            <div style={{ paddingTop: 8, paddingBottom: 16 }}>
              <p style={{ color: s.done ? 'white' : '#6b7280', fontWeight: 600, margin: 0, fontSize: 14 }}>
                {s.label}
              </p>
              {s.done && <p style={{ color: '#10b981', fontSize: 11, margin: '2px 0 0' }}>Completed ✓</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Rejection reason */}
      {application.status === 'rejected' && application.officerComment && (
        <div style={{
          marginTop: 16, padding: 16, background: '#450a0a',
          borderRadius: 10, border: '1px solid #7f1d1d'
        }}>
          <p style={{ color: '#f87171', fontWeight: 700, margin: '0 0 4px' }}>Reason for Rejection:</p>
          <p style={{ color: '#fca5a5', fontSize: 13, margin: 0 }}>{application.officerComment}</p>
        </div>
      )}
    </div>
  )
}