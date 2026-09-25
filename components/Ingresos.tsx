'use client'

import { useState, useEffect } from 'react'
import { getIngresosFijos, addIngresoFijo, deleteIngresoFijo } from '@/lib/api'

export function Ingresos() {
  const [ingresos, setIngresos] = useState<any[]>([
    { id: '1', nombre: 'Trabajo 1', monto: 2500, frecuencia: 'quincena' },
    { id: '2', nombre: 'Trabajo 2', monto: 1800, frecuencia: 'mensual' },
    { id: '3', nombre: 'Propinas', monto: 1250.50, frecuencia: 'semanal' },
  ])
  const [form, setForm] = useState({ nombre: '', monto: '', frecuencia: 'mensual' })

  useEffect(() => {
    loadIngresos()
  }, [])

  const loadIngresos = async () => {
    try {
      const data = await getIngresosFijos()
      if (data && data.length > 0) {
        setIngresos(data)
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
      await addIngresoFijo({
        nombre: form.nombre,
        monto: parseFloat(form.monto),
        frecuencia: form.frecuencia as 'semanal' | 'quincena' | 'mensual',
      })
      setForm({ nombre: '', monto: '', frecuencia: 'mensual' })
      await loadIngresos()
    } catch (error) {
      alert('Error: ' + error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar?')) return
    try {
      await deleteIngresoFijo(id)
      await loadIngresos()
    } catch (error) {
      alert('Error: ' + error)
    }
  }

  const total = ingresos.reduce((sum, ing) => sum + ing.monto, 0)

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Ingresos Fijos</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Nombre"
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
        <select
          value={form.frecuencia}
          onChange={(e) => setForm({ ...form, frecuencia: e.target.value })}
          style={styles.input}
        >
          <option value="semanal">Semanal</option>
          <option value="quincena">Quincena</option>
          <option value="mensual">Mensual</option>
        </select>
        <button type="submit" style={styles.button}>
          ➕ Agregar
        </button>
      </form>

      <div style={styles.list}>
        {ingresos.length === 0 ? (
          <p style={styles.empty}>Sin ingresos fijos</p>
        ) : (
          ingresos.map((ing) => (
            <div key={ing.id} style={styles.item}>
              <div>
                <div style={styles.itemName}>{ing.nombre}</div>
                <div style={styles.itemDetail}>
                  ${ing.monto.toFixed(2)} - {ing.frecuencia}
                </div>
              </div>
              <button
                onClick={() => handleDelete(ing.id)}
                style={styles.deleteBtn}
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>

      <div style={styles.summary}>
        <strong>Total ingresos mensuales: ${total.toFixed(2)}</strong>
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
    gridTemplateColumns: '1fr 1fr 150px 80px',
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
    color: 'var(--text-success)',
    fontWeight: 500,
  },
}
