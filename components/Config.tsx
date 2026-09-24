'use client'

import { useState } from 'react'

export function Config() {
  const [notifications, setNotifications] = useState(true)

  const handleNotificationsToggle = () => {
    const newValue = !notifications
    setNotifications(newValue)
    localStorage.setItem('notifications', String(newValue))
    alert(`Notificaciones: ${newValue ? 'Activadas' : 'Desactivadas'}`)
  }

  const handleClearCache = () => {
    if (confirm('¿Limpiar caché local? Se perderán datos no guardados en Supabase.')) {
      localStorage.clear()
      alert('Caché limpiado. Recarga la página.')
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Configuración</h2>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>Notificaciones</div>
        <div style={styles.settingItem}>
          <div style={{ flex: 1 }}>
            <div style={styles.label}>Alertas de vencimiento</div>
            <div style={styles.description}>
              Notificaciones de gastos y deudas próximas
            </div>
          </div>
          <button
            onClick={handleNotificationsToggle}
            style={{
              ...styles.toggleBtn,
              background: notifications ? 'var(--fill-accent)' : 'var(--border)',
            }}
          >
            {notifications ? '✓ ON' : '✕ OFF'}
          </button>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>Información</div>
        <div style={styles.infoBox}>
          <div>
            <strong>Mi Control Financiero</strong>
            <div style={styles.version}>v1.0.0</div>
          </div>
          <div style={styles.infoDetail}>
            App para gestionar ingresos, gastos y deudas personales
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>Datos</div>
        <button
          onClick={handleClearCache}
          style={styles.dangerBtn}
        >
          🗑️ Limpiar caché local
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    background: 'var(--surface-1)',
    border: '0.5px solid var(--border)',
    borderRadius: '8px',
    padding: '1.5rem',
    maxWidth: '600px',
  },
  title: {
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '1.5rem',
    color: 'var(--text-primary)',
  },
  section: {
    marginBottom: '2rem',
    paddingBottom: '1.5rem',
    borderBottom: '0.5px solid var(--border)',
  },
  sectionTitle: {
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase' as const,
    marginBottom: '1rem',
  },
  settingItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    background: 'var(--surface-0)',
    borderRadius: '6px',
  },
  label: {
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--text-primary)',
    marginBottom: '2px',
  },
  description: {
    fontSize: '11px',
    color: 'var(--text-secondary)',
  },
  toggleBtn: {
    padding: '8px 16px',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  infoBox: {
    padding: '12px',
    background: 'var(--surface-0)',
    borderRadius: '6px',
  },
  version: {
    fontSize: '11px',
    color: 'var(--text-secondary)',
    marginTop: '2px',
  },
  infoDetail: {
    fontSize: '11px',
    color: 'var(--text-secondary)',
    marginTop: '8px',
  },
  dangerBtn: {
    padding: '10px 16px',
    background: '#ff4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
  },
}
