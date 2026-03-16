import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0b0f1a',
      fontFamily: "'Segoe UI', sans-serif",
      overflowX: 'hidden'
    }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        background: 'rgba(11,15,26,0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #1f2937',
        position: 'sticky', top: 0, zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 26 }}>☀️</span>
          <span style={{ color: 'white', fontWeight: 800, fontSize: 18 }}>SolarPort</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => navigate('/login')} style={{
            padding: '9px 20px', background: 'transparent',
            border: '1px solid #374151', borderRadius: 8,
            color: '#9ca3af', cursor: 'pointer', fontWeight: 600, fontSize: 13
          }}>Login</button>
          <button onClick={() => navigate('/register')} style={{
            padding: '9px 20px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            border: 'none', borderRadius: 8, color: 'white',
            cursor: 'pointer', fontWeight: 700, fontSize: 13,
            boxShadow: '0 4px 15px rgba(16,185,129,0.3)'
          }}>Get Started</button>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <div style={{
        textAlign: 'center', padding: '80px 24px 60px',
        maxWidth: 700, margin: '0 auto', position: 'relative'
      }}>
        {/* Glow */}
        <div style={{
          position: 'absolute', top: '30%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          display: 'inline-block', background: '#064e3b',
          color: '#34d399', padding: '6px 16px', borderRadius: 20,
          fontSize: 12, fontWeight: 700, marginBottom: 24,
          border: '1px solid #10b981', letterSpacing: 0.5
        }}>
          🌱 GOVERNMENT APPROVED SOLAR MANAGEMENT
        </div>

        <h1 style={{
          color: 'white', fontSize: 'clamp(28px, 6vw, 52px)',
          fontWeight: 900, lineHeight: 1.15, marginBottom: 20
        }}>
          Manage Your Solar
          <span style={{
            display: 'block',
            background: 'linear-gradient(135deg, #10b981, #34d399)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>
            Panel Journey
          </span>
        </h1>

        <p style={{
          color: '#9ca3af', fontSize: 'clamp(14px, 2.5vw, 17px)',
          lineHeight: 1.7, marginBottom: 36, maxWidth: 520, margin: '0 auto 36px'
        }}>
          Apply for solar installation, track government approvals,
          and monitor your energy generation — all in one place.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/register')} style={{
            padding: '14px 32px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            border: 'none', borderRadius: 10, color: 'white',
            fontWeight: 800, fontSize: 15, cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(16,185,129,0.4)'
          }}>
            Apply for Solar ☀️
          </button>
          <button onClick={() => navigate('/login')} style={{
            padding: '14px 32px', background: 'transparent',
            border: '1px solid #374151', borderRadius: 10,
            color: '#d1d5db', fontWeight: 700, fontSize: 15, cursor: 'pointer'
          }}>
            Login to Portal →
          </button>
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div style={{
        display: 'flex', justifyContent: 'center',
        flexWrap: 'wrap', gap: 0,
        borderTop: '1px solid #1f2937',
        borderBottom: '1px solid #1f2937',
        background: '#111827', padding: '24px 20px',
        margin: '20px 0'
      }}>
        {[
          { value: '2,400+', label: 'Installations' },
          { value: '18 MW', label: 'Total Capacity' },
          { value: '₹4.2Cr', label: 'Savings Generated' },
          { value: '9,800T', label: 'CO₂ Reduced' },
        ].map((s, i) => (
          <div key={i} style={{
            textAlign: 'center', padding: '10px 32px',
            borderRight: i < 3 ? '1px solid #1f2937' : 'none',
            minWidth: 140
          }}>
            <div style={{
              color: '#10b981', fontWeight: 900,
              fontSize: 'clamp(18px, 3vw, 26px)', fontFamily: 'monospace'
            }}>{s.value}</div>
            <div style={{ color: '#6b7280', fontSize: 12, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── HOW IT WORKS ── */}
      <div style={{ padding: '60px 24px', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{
          color: 'white', textAlign: 'center',
          fontSize: 'clamp(20px, 4vw, 32px)',
          fontWeight: 800, marginBottom: 12
        }}>How It Works</h2>
        <p style={{ color: '#6b7280', textAlign: 'center', marginBottom: 44, fontSize: 14 }}>
          Simple 4 step process from application to solar energy
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 16
        }}>
          {[
            { step: '01', icon: '📋', title: 'Apply Online', desc: 'Fill the application form and upload your documents' },
            { step: '02', icon: '🏛️', title: 'Gov Review', desc: 'Government officer reviews and approves your application' },
            { step: '03', icon: '🔧', title: 'Installation', desc: 'Certified team installs solar panels at your home' },
            { step: '04', icon: '⚡', title: 'Go Solar!', desc: 'Monitor your energy and track savings in real time' },
          ].map((s, i) => (
            <div key={i} style={{
              background: 'linear-gradient(135deg, #1a1f2e, #141824)',
              border: '1px solid #2d3748', borderRadius: 16,
              padding: 24, position: 'relative', overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute', top: 12, right: 14,
                color: '#1f2937', fontWeight: 900,
                fontSize: 32, fontFamily: 'monospace'
              }}>{s.step}</div>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{s.icon}</div>
              <div style={{ color: 'white', fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{s.title}</div>
              <div style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div style={{
        padding: '40px 24px 60px',
        maxWidth: 900, margin: '0 auto'
      }}>
        <h2 style={{
          color: 'white', textAlign: 'center',
          fontSize: 'clamp(20px, 4vw, 32px)',
          fontWeight: 800, marginBottom: 12
        }}>Everything You Need</h2>
        <p style={{ color: '#6b7280', textAlign: 'center', marginBottom: 44, fontSize: 14 }}>
          Powerful features for both citizens and government officers
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 16
        }}>
          {[
            { icon: '📱', title: 'Mobile Friendly', desc: 'Access from any device — phone, tablet or desktop', color: '#10b981' },
            { icon: '📄', title: 'Document Upload', desc: 'Securely upload ID proof, bills and roof photos', color: '#60a5fa' },
            { icon: '⚡', title: 'Live Energy Stats', desc: 'Real time solar generation, savings and CO₂ data', color: '#f59e0b' },
            { icon: '🏛️', title: 'Gov Dashboard', desc: 'Officers can approve, reject and monitor all clients', color: '#a78bfa' },
            { icon: '📧', title: 'Email Alerts', desc: 'Get notified instantly when your application is approved', color: '#f87171' },
            { icon: '🗺️', title: 'City Map View', desc: 'See all solar installations across the city on a map', color: '#34d399' },
          ].map((f, i) => (
            <div key={i} style={{
              background: 'linear-gradient(135deg, #1a1f2e, #141824)',
              border: '1px solid #2d3748', borderRadius: 14,
              padding: 22, display: 'flex', gap: 16, alignItems: 'flex-start'
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: `${f.color}20`,
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 20
              }}>{f.icon}</div>
              <div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{f.title}</div>
                <div style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA SECTION ── */}
      <div style={{ padding: '20px 24px 60px', maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          background: 'linear-gradient(135deg, #064e3b, #065f46)',
          border: '1px solid #10b981', borderRadius: 20,
          padding: '40px 32px',
          boxShadow: '0 0 40px rgba(16,185,129,0.15)'
        }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🌞</div>
          <h2 style={{ color: 'white', fontSize: 22, fontWeight: 800, marginBottom: 10 }}>
            Ready to Go Solar?
          </h2>
          <p style={{ color: '#6ee7b7', fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
            Join thousands of households saving money and helping the environment
          </p>
          <button onClick={() => navigate('/register')} style={{
            padding: '13px 36px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            border: 'none', borderRadius: 10, color: 'white',
            fontWeight: 800, fontSize: 15, cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(16,185,129,0.4)'
          }}>
            Start Your Application →
          </button>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{
        borderTop: '1px solid #1f2937',
        padding: '24px', textAlign: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 18 }}>☀️</span>
          <span style={{ color: 'white', fontWeight: 700 }}>SolarPort</span>
        </div>
        <p style={{ color: '#4b5563', fontSize: 12 }}>
          © 2025 SolarPort. Government Solar Panel Management System.
        </p>
      </div>

    </div>
  )
}