'use client'

import { useState } from 'react'
import { addUsuario } from '@/lib/api'

export default function Registro() {
  const [form, setForm] = useState({ nombre: '', email: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!form.nombre || !form.email || !form.password || !form.confirmPassword) {
      setError('Rellena todos los campos')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setLoading(true)
    try {
      await addUsuario({
        nombre: form.nombre,
        email: form.email,
        password: form.password,
        rol: 'normal',
        estado: 'pendiente',
      })
      setSuccess(true)
      setForm({ nombre: '', email: '', password: '', confirmPassword: '' })
      setTimeout(() => {
        window.location.href = '/'
      }, 3000)
    } catch (error: any) {
      if (error.message.includes('duplicate')) {
        setError('Este email ya está registrado')
      } else {
        setError('Error al registrarse: ' + error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Mi Control Financiero</h1>
        <p style={styles.subtitle}>Crear nueva cuenta</p>

        {success ? (
          <div style={styles.successBox}>
            <div style={styles.successIcon}>✅</div>
            <h2 style={styles.successTitle}>¡Registro exitoso!</h2>
            <p style={styles.successText}>
              Tu solicitud ha sido enviada al administrador para aprobación.
            </p>
            <p style={styles.successSmall}>
              Recibirás una notificación cuando tu cuenta sea aprobada.
            </p>
            <p style={styles.successSmall}>
              Redirigiendo en 3 segundos...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            {error && <div style={styles.errorBox}>{error}</div>}

            <div style={styles.field}>
              <label style={styles.label}>Nombre completo *</label>
              <input
                type="text"
                placeholder="Tu nombre"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                style={styles.input}
                disabled={loading}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Email *</label>
              <input
                type="email"
                placeholder="tu@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={styles.input}
                disabled={loading}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Contraseña *</label>
              <input
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                style={styles.input}
                disabled={loading}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Confirmar contraseña *</label>
              <input
                type="password"
                placeholder="Repite tu contraseña"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                style={styles.input}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>

            <p style={styles.footer}>
              ¿Tienes cuenta? <a href="/login" style={styles.link}>Inicia sesión aquí</a>
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

const styles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'var(--surface-0)',
    padding: '20px',
  },
  card: {
    background: 'var(--surface-1)',
    border: '0.5px solid var(--border)',
    borderRadius: '8px',
    padding: '2rem',
    maxWidth: '400px',
    width: '100%',
  },
  title: {
    fontSize: '20px',
    fontWeight: 700,
    textAlign: 'center' as const,
    marginBottom: '6px',
    color: 'var(--text-primary)',
  },
  subtitle: {
    fontSize: '14px',
    textAlign: 'center' as const,
    color: 'var(--text-secondary)',
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  field: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '6px',
  },
  label: {
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--text-primary)',
  },
  input: {
    padding: '10px 12px',
    border: '0.5px solid var(--border)',
    borderRadius: '6px',
    fontSize: '14px',
    background: 'var(--surface-0)',
    color: 'var(--text-primary)',
  },
  button: {
    padding: '12px 16px',
    background: 'var(--fill-accent)',
    color: 'var(--on-accent)',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
  errorBox: {
    background: 'var(--bg-danger)',
    color: 'var(--text-danger)',
    border: '0.5px solid var(--border-danger)',
    padding: '10px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    marginBottom: '1rem',
  },
  successBox: {
    textAlign: 'center' as const,
    padding: '1.5rem',
  },
  successIcon: {
    fontSize: '48px',
    marginBottom: '1rem',
  },
  successTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-success)',
    marginBottom: '0.5rem',
  },
  successText: {
    fontSize: '13px',
    color: 'var(--text-primary)',
    marginBottom: '1rem',
    lineHeight: 1.5,
  },
  successSmall: {
    fontSize: '11px',
    color: 'var(--text-secondary)',
    marginTop: '0.5rem',
  },
  footer: {
    textAlign: 'center' as const,
    fontSize: '12px',
    color: 'var(--text-secondary)',
  },
  link: {
    color: 'var(--fill-accent)',
    textDecoration: 'none',
    fontWeight: 600,
  },
}
