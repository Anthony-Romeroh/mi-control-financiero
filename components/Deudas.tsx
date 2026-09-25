'use client'

import { useState, useEffect } from 'react'
import { getDeudas, addDeuda, updateDeuda, deleteDeuda } from '@/lib/api'

export function Deudas() {
  const [deudas, setDeudas] = useState<any[]>([])
  const [form, setForm] = useState({
    nombre: '',
    monto_total: '',
    monto_pagado: '0',
    dia_vencimiento: '1',
  })

  useEffect(() => {
    loadDeudas()
  }, [])

  const loadDeudas = async () => {
    try {
      const data = await getDeudas()
      if (data && data.length > 0) {
        setDeudas(data)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nombre || !form.monto_total) {
      alert('Rellena los campos')
      return
    }

    try {
      await addDeuda({
        nombre: form.nombre,
        monto_total: parseFloat(form.monto_total),
        monto_pagado: parseFloat(form.monto_pagado),
        dia_vencimiento: parseInt(form.dia_vencimiento),
      })
      setForm({ nombre: '', monto_total: '', monto_pagado: '0', dia_vencimiento: '1' })
      await loadDeudas()
    } catch (error) {
      alert('Error: ' + error)
    }
  }

  const handlePayment = async (id: string, deuda: any) => {
    const pago = prompt('Monto a pagar:')
    if (!pago) return

    try {
      const nuevoMonto = deuda.monto_pagado + parseFloat(pago)
      if (nuevoMonto > deuda.monto_total) {
        alert('No puedes pagar más de lo que debes')
        return
      }
      await updateDeuda(id, { monto_pagado: nuevoMonto })
      await loadDeudas()
    } catch (error) {
      alert('Error: ' + error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar deuda?')) return
    try {
      await deleteDeuda(id)
      await loadDeudas()
    } catch (error) {
      alert('Error: ' + error)
    }
  }

  const totalDeuda = deudas.reduce((sum, d) => sum + d.monto_total, 0)
  const totalPagado = deudas.reduce((sum, d) => sum + d.monto_pagado, 0)
  const totalPendiente = totalDeuda - totalPagado

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Deudas</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Descripción"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Monto total"
          step="0.01"
          value={form.monto_total}
          onChange={(e) => setForm({ ...form, monto_total: e.target.value })}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Día vencimiento"
          min="1"
          max="31"
          value={form.dia_vencimiento}
          onChange={(e) => setForm({ ...form, dia_vencimiento: e.target.value })}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          ➕ Agregar
        </button>
      </form>

      <div style={styles.list}>
        {deudas.length === 0 ? (
          <p style={styles.empty}>Sin deudas</p>
        ) : (
          deudas.map((deuda) => {
            const pendiente = deuda.monto_total - deuda.monto_pagado
            const porcentaje = (deuda.monto_pagado / deuda.monto_total) * 100
            return (
              <div key={deuda.id} style={styles.item}>
                <div style={styles.itemContent}>
                  <div style={styles.itemName}>{deuda.nombre}</div>
                  <div style={styles.itemDetail}>
                    ${deuda.monto_pagado.toFixed(2)} / ${deuda.monto_total.toFixed(2)}
                  </div>
                  <div style={styles.progressBar}>
                    <div
                      style={{
                        ...styles.progressFill,
                        width: `${Math.min(porcentaje, 100)}%`,
                        background:
                          pendiente <= 0
                            ? 'var(--text-success)'
                            : 'var(--fill-accent)',
                      }}
                    />
                  </div>
                  <div style={styles.pending}>
                    Pendiente: ${pendiente.toFixed(2)} ({Math.round(porcentaje)}%)
                  </div>
                </div>
                <div style={styles.actions}>
                  <button
                    onClick={() => handlePayment(deuda.id, deuda)}
                    style={styles.payBtn}
                    title="Registrar pago"
                  >
                    💰
                  </button>
                  <button
                    onClick={() => handleDelete(deuda.id)}
                    style={styles.deleteBtn}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>

      <div style={styles.summary}>
        <div style={styles.summaryRow}>
          <span>Total deuda:</span>
          <strong style={{ color: 'var(--text-danger)' }}>-${totalDeuda.toFixed(2)}</strong>
        </div>
        <div style={styles.summaryRow}>
          <span>Pagado:</span>
          <strong style={{ color: 'var(--text-success)' }}>+${totalPagado.toFixed(2)}</strong>
        </div>
        <div style={{ ...styles.summaryRow, borderTop: '0.5px solid var(--border)', paddingTop: '8px', marginTop: '8px' }}>
          <span>Pendiente:</span>
          <strong style={{ color: 'var(--text-danger)', fontSize: '14px' }}>
            ${totalPendiente.toFixed(2)}
          </strong>
        </div>
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
    marginBottom: '1rem',
    color: 'var(--text-primary)',
  },
  form: {
    display: 'grid' as const,
    gridTemplateColumns: '1.5fr 1fr 100px 80px',
    gap: '8px',
    marginBottom: '1.5rem',
  },
  input: {
    padding: '8px 12px',
    border: '0.5px solid var(--border)',
    borderRadius: '6px',
    fontSize: '12px',
    background: 'var(--surface-0)',
    color: 'var(--text-primary)',
  },
  button: {
    padding: '8px 12px',
    background: 'var(--fill-accent)',
    color: 'var(--on-accent)',
    border: 'none',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  list: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '10px',
    marginBottom: '1rem',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '12px',
    background: 'var(--surface-0)',
    borderRadius: '6px',
    fontSize: '12px',
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontWeight: 500,
    color: 'var(--text-primary)',
    marginBottom: '4px',
  },
  itemDetail: {
    fontSize: '11px',
    color: 'var(--text-secondary)',
    marginBottom: '6px',
  },
  progressBar: {
    width: '100%',
    height: '6px',
    background: 'var(--border)',
    borderRadius: '3px',
    overflow: 'hidden',
    marginBottom: '4px',
  },
  progressFill: {
    height: '100%',
    background: 'var(--fill-accent)',
    transition: 'width 0.3s',
  },
  pending: {
    fontSize: '11px',
    color: 'var(--text-danger)',
    fontWeight: 500,
  },
  actions: {
    display: 'flex',
    gap: '6px',
  },
  payBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
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
    padding: '2rem',
  },
  summary: {
    padding: '12px',
    background: 'var(--surface-0)',
    borderRadius: '6px',
    fontSize: '12px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}
