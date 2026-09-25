'use client'

import { useState, useEffect } from 'react'
import { getGastosFijos, addGastoFijo, deleteGastoFijo } from '@/lib/api'

export function Gastos() {
  const [gastos, setGastos] = useState<any[]>([
    { id: '1', nombre: 'Alquiler', monto: 800, dia_vencimiento: 5 },
    { id: '2', nombre: 'Servicios', monto: 120, dia_vencimiento: 15 },
    { id: '3', nombre: 'Internet', monto: 50, dia_vencimiento: 20 },
    { id: '4', nombre: 'Comida', monto: 300, dia_vencimiento: 28 },
  ])
  const [form, setForm] = useState({ nombre: '', monto: '', dia_vencimiento: '1' })

  useEffect(() => {
    loadGastos()
  }, [])

  const loadGastos = async () => {
    try {
      const data = await getGastosFijos()
      if (data && data.length > 0) {
        setGastos(data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nombre || !form.monto) {
      alert('Rellena los campos')
      return
    }

    try {
      await addGastoFijo({
        nombre: form.nombre,
        monto: parseFloat(form.monto),
        dia_vencimiento: parseInt(form.dia_vencimiento),
      })
      setForm({ nombre: '', monto: '', dia_vencimiento: '1' })
      await loadGastos()
    } catch (error) {
      alert('Error: ' + error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar?')) return
    try {
      await deleteGastoFijo(id)
      await loadGastos()
    } catch (error) {
      alert('Error: ' + error)
    }
  }

  const total = gastos.reduce((sum, g) => sum + g.monto, 0)

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Gastos Fijos</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Nombre (ej: Renta, Internet)"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Monto"
          step="0.01"
          value={form.monto}
          onChange={(e) => setForm({ ...form, monto: e.target.value })}
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
        {gastos.length === 0 ? (
          <p style={styles.empty}>Sin gastos fijos</p>
        ) : (
          gastos.map((gasto) => (
            <div key={gasto.id} style={styles.item}>
              <div>
                <div style={styles.itemName}>{gasto.nombre}</div>
                <div style={styles.itemDetail}>
                  -${gasto.monto.toFixed(2)} | Vencimiento día {gasto.dia_vencimiento}
                </div>
              </div>
              <button
                onClick={() => handleDelete(gasto.id)}
                style={styles.deleteBtn}
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>

      <div style={styles.summary}>
        <strong>Total gastos fijos: -${total.toFixed(2)}/mes</strong>
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
    gap: '8px',
    marginBottom: '1rem',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    background: 'var(--surface-0)',
    borderRadius: '6px',
    fontSize: '12px',
  },
  itemName: {
    fontWeight: 500,
    color: 'var(--text-primary)',
  },
  itemDetail: {
    fontSize: '11px',
    color: 'var(--text-secondary)',
    marginTop: '2px',
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
    padding: '10px 12px',
    background: 'var(--surface-0)',
    borderRadius: '6px',
    fontSize: '12px',
    color: 'var(--text-danger)',
    fontWeight: 500,
  },
}
