'use client'

import { useState, useEffect } from 'react'
import { getUsuarios, updateUsuario, deleteUsuario } from '@/lib/api'

interface UsuariosProps {
  usuarioActual?: { rol: string }
}

export function Usuarios({ usuarioActual }: UsuariosProps) {
  const [usuarios, setUsuarios] = useState<any[]>([])
  const [esMaster] = useState(usuarioActual?.rol === 'master')

  useEffect(() => {
    loadUsuarios()
  }, [])

  const loadUsuarios = async () => {
    try {
      const data = await getUsuarios()
      setUsuarios(data || [])
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleAprobacion = async (id: string, estado: 'aprobado' | 'rechazado') => {
    if (!esMaster) {
      alert('Solo Master puede aprobar usuarios')
      return
    }

    try {
      await updateUsuario(id, { estado })
      await loadUsuarios()
    } catch (error) {
      alert('Error: ' + error)
    }
  }

  const handleEliminar = async (id: string) => {
    if (!esMaster) {
      alert('Solo Master puede eliminar usuarios')
      return
    }

    if (!confirm('¿Eliminar este usuario?')) return

    try {
      await deleteUsuario(id)
      await loadUsuarios()
    } catch (error) {
      alert('Error: ' + error)
    }
  }

  const pendientes = usuarios.filter((u) => u.estado === 'pendiente')
  const aprobados = usuarios.filter((u) => u.estado === 'aprobado')
  const rechazados = usuarios.filter((u) => u.estado === 'rechazado')

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Gestión de Usuarios</h2>

      {!esMaster && (
        <div style={styles.warning}>
          ⚠️ Solo usuarios Master pueden aprobar/rechazar registros
        </div>
      )}

      {/* PENDIENTES DE APROBACIÓN */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>
          ⏳ Pendientes de aprobación ({pendientes.length})
        </h3>
        {pendientes.length === 0 ? (
          <p style={styles.empty}>Sin solicitudes pendientes</p>
        ) : (
          <div style={styles.list}>
            {pendientes.map((user) => (
              <div key={user.id} style={styles.itemPendiente}>
                <div>
                  <div style={styles.itemName}>{user.nombre}</div>
                  <div style={styles.itemDetail}>{user.email}</div>
                  <div style={styles.itemDate}>
                    Solicitud: {new Date(user.created_at).toLocaleDateString()}
                  </div>
                </div>
                {esMaster && (
                  <div style={styles.actions}>
                    <button
                      onClick={() => handleAprobacion(user.id, 'aprobado')}
                      style={styles.btnAprobar}
                      title="Aprobar"
                    >
                      ✅
                    </button>
                    <button
                      onClick={() => handleAprobacion(user.id, 'rechazado')}
                      style={styles.btnRechazar}
                      title="Rechazar"
                    >
                      ❌
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* APROBADOS */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>
          ✅ Usuarios aprobados ({aprobados.length})
        </h3>
        {aprobados.length === 0 ? (
          <p style={styles.empty}>Sin usuarios aprobados</p>
        ) : (
          <div style={styles.list}>
            {aprobados.map((user) => (
              <div key={user.id} style={styles.itemAprobado}>
                <div>
                  <div style={styles.itemName}>{user.nombre}</div>
                  <div style={styles.itemDetail}>{user.email}</div>
                  <div style={styles.itemRole}>
                    {user.rol === 'master' ? '👑 Master' : '👤 Normal'}
                  </div>
                </div>
                {esMaster && user.rol !== 'master' && (
                  <button
                    onClick={() => handleEliminar(user.id)}
                    style={styles.deleteBtn}
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* RECHAZADOS */}
      {rechazados.length > 0 && (
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>
            ❌ Usuarios rechazados ({rechazados.length})
          </h3>
          <div style={styles.list}>
            {rechazados.map((user) => (
              <div key={user.id} style={styles.itemRechazado}>
                <div>
                  <div style={styles.itemName}>{user.nombre}</div>
                  <div style={styles.itemDetail}>{user.email}</div>
                </div>
                {esMaster && (
                  <button
                    onClick={() => handleEliminar(user.id)}
                    style={styles.deleteBtn}
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

const styles = {
  container: {
    background: 'var(--surface-1)',
    border: '0.5px solid var(--border)',
    borderRadius: '8px',
    padding: '1.5rem',
    maxWidth: '700px',
  },
  title: {
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '1rem',
    color: 'var(--text-primary)',
  },
  warning: {
    background: 'var(--bg-warning)',
    color: 'var(--text-warning)',
    border: '0.5px solid var(--border)',
    padding: '10px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    marginBottom: '1.5rem',
  },
  section: {
    marginBottom: '1.5rem',
  },
  sectionTitle: {
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginBottom: '8px',
  },
  list: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '8px',
  },
  itemPendiente: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    background: 'var(--surface-0)',
    border: '1px solid var(--text-warning)',
    borderRadius: '6px',
    fontSize: '12px',
  },
  itemAprobado: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    background: 'var(--surface-0)',
    border: '1px solid var(--text-success)',
    borderRadius: '6px',
    fontSize: '12px',
  },
  itemRechazado: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    background: 'var(--surface-0)',
    border: '1px solid var(--text-danger)',
    borderRadius: '6px',
    fontSize: '12px',
    opacity: 0.7,
  },
  itemName: {
    fontWeight: 500,
    color: 'var(--text-primary)',
    marginBottom: '4px',
  },
  itemDetail: {
    fontSize: '11px',
    color: 'var(--text-secondary)',
    marginBottom: '4px',
  },
  itemDate: {
    fontSize: '10px',
    color: 'var(--text-muted)',
  },
  itemRole: {
    display: 'inline-block',
    padding: '4px 8px',
    background: 'var(--fill-accent)',
    color: 'var(--on-accent)',
    borderRadius: '4px',
    fontSize: '10px',
    fontWeight: 600,
    marginTop: '6px',
  },
  actions: {
    display: 'flex' as const,
    gap: '6px',
  },
  btnAprobar: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  btnRechazar: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  deleteBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
  },
  empty: {
    textAlign: 'center' as const,
    color: 'var(--text-secondary)',
    padding: '1rem',
    fontSize: '12px',
  },
}
