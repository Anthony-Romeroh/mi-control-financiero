'use client'

interface SidebarProps {
  activeScreen: string
  onScreenChange: (screen: string) => void
}

export function Sidebar({ activeScreen, onScreenChange }: SidebarProps) {
  const menuItems = [
    { id: 'resumen', label: 'Resumen', icon: '📊' },
    { id: 'formulario', label: 'Nuevo registro', icon: '➕' },
    { id: 'ingresos', label: 'Ingresos', icon: '📈' },
    { id: 'gastos', label: 'Gastos', icon: '📉' },
    { id: 'deudas', label: 'Deudas', icon: '⚠️' },
    { id: 'config', label: 'Config', icon: '⚙️' },
  ]

  return (
    <aside style={styles.sidebar}>
      <h1 style={styles.title}>Mi Control</h1>
      <nav style={styles.nav}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onScreenChange(item.id)}
            style={{
              ...styles.menuBtn,
              ...(activeScreen === item.id ? styles.menuBtnActive : {}),
            }}
          >
            <span style={styles.icon}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}

const styles = {
  sidebar: {
    width: '160px',
    background: 'var(--surface-1)',
    borderRight: '0.5px solid var(--border)',
    padding: '1rem',
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '0.5rem',
    height: '100vh',
    overflowY: 'auto' as const,
  },
  title: {
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '1rem',
    color: 'var(--text-primary)',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.25rem',
  },
  menuBtn: {
    padding: '10px 12px',
    background: 'transparent',
    border: 'none',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
    color: 'var(--text-secondary)',
    textAlign: 'left' as const,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s',
  },
  menuBtnActive: {
    background: 'var(--fill-accent)',
    color: 'var(--on-accent)',
  },
  icon: {
    fontSize: '14px',
  },
}
