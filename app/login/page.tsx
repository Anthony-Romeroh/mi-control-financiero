'use client'

import { useState } from 'react'
import { getUsuarios } from '@/lib/api'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!form.email || !form.password) {
      setError('Completa email y contraseña')
      return
    }

    setLoading(true)
    try {
      const usuarios = await getUsuarios()
      const usuario = usuarios.find(
        (u) => u.email === form.email && u.password === form.password
      )

      if (!usuario) {
        setError('Email o contraseña incorrectos')
        setLoading(false)
        return
      }

      if (usuario.estado === 'pendiente') {
        setError('Tu cuenta está pendiente de aprobación por el administrador')
        setLoading(false)
        return
      }

      if (usuario.estado === 'rechazado') {
        setError('Tu solicitud de registro fue rechazada')
        setLoading(false)
        return
      }

      localStorage.setItem('usuarioActual', JSON.stringify(usuario))
      window.location.href = '/'
    } catch (error) {
      setError('Error en el servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Mi Control Financiero</h1>
        <p style={styles.subtitle}>Inicia sesión</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <div style={styles.errorBox}>{error}</div>}

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
              placeholder="Tu contraseña"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
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
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>

          <p style={styles.footer}>
            ¿No tienes cuenta? <a href="/registro" style={styles.link}>Regístrate aquí</a>
          </p>
        </form>

        <div style={styles.demo}>
          <p style={styles.demoTitle}>Demo (para pruebas):</p>
          <p style={styles.demoText}>Email: admin@example.com</p>
          <p style={styles.demoText}>Pass: password123</p>
        </div>
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
  demo: {
    marginTop: '1.5rem',
    padding: '1rem',
    background: 'var(--surface-0)',
    borderRadius: '6px',
    borderLeft: '3px solid var(--fill-accent)',
  },
  demoTitle: {
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginBottom: '6px',
  },
  demoText: {
    fontSize: '11px',
    color: 'var(--text-secondary)',
    margin: '2px 0',
    fontFamily: 'monospace',
  },
}
