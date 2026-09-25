'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/Sidebar'
import { FormMovimiento } from '@/components/FormMovimiento'
import { Resumen } from '@/components/Resumen'
import { Ingresos } from '@/components/Ingresos'
import { Gastos } from '@/components/Gastos'
import { Deudas } from '@/components/Deudas'
import { Usuarios } from '@/components/Usuarios'
import { Config } from '@/components/Config'
import { addMovimiento } from '@/lib/api'

// Deployed to Vercel
export default function Home() {
  const router = useRouter()
  const [activeScreen, setActiveScreen] = useState('resumen')
  const [refreshKey, setRefreshKey] = useState(0)
  const [usuarioActual, setUsuarioActual] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const usuario = localStorage.getItem('usuarioActual')
    if (!usuario) {
      router.push('/login')
    } else {
      setUsuarioActual(JSON.parse(usuario))
      setLoading(false)
    }
  }, [router])

  const handleAddMovimiento = async (movimiento: any) => {
    await addMovimiento(movimiento)
    setRefreshKey(prev => prev + 1)
  }

  const handleLogout = () => {
    if (confirm('¿Cerrar sesión?')) {
      localStorage.removeItem('usuarioActual')
      router.push('/login')
    }
  }

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingText}>Cargando...</div>
      </div>
    )
  }

  if (!usuarioActual) {
    return null
  }

  return (
    <div style={styles.container}>
      <Sidebar activeScreen={activeScreen} onScreenChange={setActiveScreen} />

      <main style={styles.main}>
        <header style={styles.header}>
          <h1 style={styles.headerTitle}>Mi Control Financiero</h1>
          <div style={styles.headerCenter}>
            <span style={styles.usuarioInfo}>
              {usuarioActual?.rol === 'master' ? '👑' : '👤'} {usuarioActual?.nombre}
            </span>
          </div>
          <div style={styles.headerActions}>
            <a href="/manual" style={{...styles.headerBtn, textDecoration: 'none', color: 'inherit'}}>📖</a>
            <button onClick={handleLogout} style={styles.headerBtn} title="Logout">
              🚪
            </button>
          </div>
        </header>

        <div style={styles.content}>
          {activeScreen === 'resumen' && <Resumen key={refreshKey} />}

          {activeScreen === 'formulario' && (
            <FormMovimiento onSubmit={handleAddMovimiento} />
          )}

          {activeScreen === 'ingresos' && <Ingresos />}

          {activeScreen === 'gastos' && <Gastos />}

          {activeScreen === 'deudas' && <Deudas />}

          {activeScreen === 'usuarios' && <Usuarios usuarioActual={usuarioActual} />}

          {activeScreen === 'config' && <Config />}
        </div>
      </main>
    </div>
  )
}

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '160px 1fr',
    height: '100vh',
    background: 'var(--surface-0)',
  },
  main: {
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden',
  },
  header: {
    background: 'var(--surface-1)',
    borderBottom: '0.5px solid var(--border)',
    padding: '12px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  headerCenter: {
    flex: 1,
    textAlign: 'center' as const,
    fontSize: '12px',
    color: 'var(--text-secondary)',
  },
  usuarioInfo: {
    fontSize: '12px',
    color: 'var(--text-primary)',
    fontWeight: 500,
  },
  headerActions: {
    display: 'flex',
    gap: '8px',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'var(--surface-0)',
  },
  loadingText: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
  },
  headerBtn: {
    padding: '6px 10px',
    background: 'transparent',
    border: '0.5px solid var(--border)',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer',
  },
  content: {
    flex: 1,
    overflow: 'auto',
    padding: '16px',
  },
  placeholder: {
    background: 'var(--surface-1)',
    border: '0.5px solid var(--border)',
    borderRadius: '8px',
    padding: '2rem',
    textAlign: 'center' as const,
  },
}
