import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { submitApplication } from '../../utils/api'
import toast from 'react-hot-toast'

export default function Apply() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', phone: '', address: '',
    monthlyBill: '', roofArea: '', numberOfPanels: ''
  })

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async () => {
    try {
      setLoading(true)
      await submitApplication(form)
      toast.success('Application submitted successfully!')
      navigate('/client/status')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Submission failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 580, margin: '0 auto' }}>
      <h2 style={{ color: 'white', marginBottom: 8 }}>Solar Installation Application</h2>
      <p style={{ color: '#6b7280', marginBottom: 24, fontSize: 14 }}>
        Fill in your details to apply for solar panel installation
      </p>

      {/* Step Indicator */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
        {['Personal Info', 'Property Details', 'Documents'].map((s, i) => (
          <div key={i} style={{ flex: 1 }}>
            <div style={{
              height: 4, borderRadius: 4, marginBottom: 6,
              background: step > i ? '#10b981' : '#1f2937'
            }} />
            <span style={{ fontSize: 11, color: step > i ? '#10b981' : '#4b5563', fontWeight: 600 }}>{s}</span>
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3 style={{ color: 'white' }}>👤 Personal Information</h3>
          {[
            { label: 'Full Name', key: 'name', placeholder: 'Rajesh Patel' },
            { label: 'Phone Number', key: 'phone', placeholder: '+91 98765 43210' },
            { label: 'Full Address', key: 'address', placeholder: '42 Nehru Nagar, Ahmedabad' },
          ].map(f => (
            <div key={f.key}>
              <label style={{ color: '#9ca3af', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>
                {f.label}
              </label>
              <input
                placeholder={f.placeholder}
                value={form[f.key]}
                onChange={e => update(f.key, e.target.value)}
                style={{
                  width: '100%', padding: '11px 14px', background: '#111827',
                  border: '1px solid #2d3748', borderRadius: 8,
                  color: 'white', fontSize: 14, outline: 'none', boxSizing: 'border-box'
                }}
              />
            </div>
          ))}
          <button onClick={() => setStep(2)} style={{
            padding: 12, background: '#10b981', border: 'none',
            borderRadius: 8, color: 'white', fontWeight: 700, cursor: 'pointer'
          }}>Continue →</button>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3 style={{ color: 'white' }}>🏠 Property Details</h3>
          {[
            { label: 'Monthly Electricity Bill (₹)', key: 'monthlyBill', placeholder: '3500' },
            { label: 'Roof Area (sq ft)', key: 'roofArea', placeholder: '800' },
            { label: 'Number of Panels', key: 'numberOfPanels', placeholder: '12' },
          ].map(f => (
            <div key={f.key}>
              <label style={{ color: '#9ca3af', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>
                {f.label}
              </label>
              <input
                type='number'
                placeholder={f.placeholder}
                value={form[f.key]}
                onChange={e => update(f.key, e.target.value)}
                style={{
                  width: '100%', padding: '11px 14px', background: '#111827',
                  border: '1px solid #2d3748', borderRadius: 8,
                  color: 'white', fontSize: 14, outline: 'none', boxSizing: 'border-box'
                }}
              />
            </div>
          ))}
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setStep(1)} style={{
              flex: 1, padding: 12, background: '#1f2937',
              border: 'none', borderRadius: 8, color: '#9ca3af',
              fontWeight: 700, cursor: 'pointer'
            }}>← Back</button>
            <button onClick={() => setStep(3)} style={{
              flex: 2, padding: 12, background: '#10b981',
              border: 'none', borderRadius: 8, color: 'white',
              fontWeight: 700, cursor: 'pointer'
            }}>Continue →</button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3 style={{ color: 'white' }}>📄 Upload Documents</h3>
          <p style={{ color: '#6b7280', fontSize: 13 }}>
            Document upload will be available after submission. You can upload them from your status page.
          </p>
          {['Government ID Proof', 'Latest Electricity Bill', 'Roof Photograph', 'Property NOC'].map((doc, i) => (
            <div key={i} style={{
              padding: '14px 16px', border: '1.5px dashed #2d3748',
              borderRadius: 8, display: 'flex',
              justifyContent: 'space-between', alignItems: 'center'
            }}>
              <span style={{ color: '#9ca3af', fontSize: 13 }}>📎 {doc}</span>
              <span style={{ color: '#6b7280', fontSize: 11 }}>After submission</span>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setStep(2)} style={{
              flex: 1, padding: 12, background: '#1f2937',
              border: 'none', borderRadius: 8, color: '#9ca3af',
              fontWeight: 700, cursor: 'pointer'
            }}>← Back</button>
            <button onClick={handleSubmit} disabled={loading} style={{
              flex: 2, padding: 12, background: '#10b981',
              border: 'none', borderRadius: 8, color: 'white',
              fontWeight: 800, cursor: 'pointer'
            }}>{loading ? 'Submitting...' : '🚀 Submit Application'}</button>
          </div>
        </div>
      )}
    </div>
  )
}