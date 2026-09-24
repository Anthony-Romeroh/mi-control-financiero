'use client'

import { useState } from 'react'
import { Movimiento } from '@/lib/supabase'

interface FormMovimientoProps {
  onSubmit: (movimiento: Movimiento) => Promise<void>
}

export function FormMovimiento({ onSubmit }: FormMovimientoProps) {
  const [fecha, setFecha] = useState('')
  const [tipo, setTipo] = useState('')
  const [trabajo, setTrabajo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [monto, setMonto] = useState('')
  const [notas, setNotas] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const trabajoOptions: Record<string, string[]> = {
    'Ingreso Trabajo 1': ['Trabajo 1'],
    'Ingreso Trabajo 2': ['Trabajo 2'],
    'Propina': ['Propina del día'],
    'Abono Deuda': ['Deuda 1', 'Deuda 2', 'Deuda 3'],
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fecha || !tipo || !monto) {
      alert('Rellena los campos requeridos')
      return
    }

    setLoading(true)
    try {
      await onSubmit({
        fecha,
        tipo: tipo as any,
        trabajo_deuda: trabajo,
        descripcion,
        monto: parseFloat(monto),
        notas,
      })
      setSuccess(true)
      // Reset form
      setFecha('')
      setTipo('')
      setTrabajo('')
      setDescripcion('')
      setMonto('')
      setNotas('')
      setTimeout(() => setSuccess(false), 2000)
    } catch (error) {
      alert('Error al guardar: ' + error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Registrar movimiento</h2>
      
      {success && <div style={styles.success}>✓ Guardado correctamente</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Fecha *</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Tipo *</label>
          <select
            value={tipo}
            onChange={(e) => {
              setTipo(e.target.value)
              setTrabajo('')
            }}
            required
            style={styles.input}
          >
            <option value="">Selecciona...</option>
            <option value="Ingreso Trabajo 1">Ingreso Trabajo 1</option>
            <option value="Ingreso Trabajo 2">Ingreso Trabajo 2</option>
            <option value="Propina">Propina</option>
            <option value="Abono Deuda">Abono Deuda</option>
          </select>
        </div>

        {tipo && (
          <div style={styles.field}>
            <label style={styles.label}>
              {tipo.includes('Ingreso') ? 'Trabajo' : 'Deuda'}
            </label>
            <select
              value={trabajo}
              onChange={(e) => setTrabajo(e.target.value)}
              style={styles.input}
            >
              <option value="">Selecciona...</option>
              {(trabajoOptions[tipo] || []).map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}

        <div style={styles.field}>
          <label style={styles.label}>Descripción</label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="ej: Quincena septiembre"
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Monto *</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            placeholder="0.00"
            required
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Notas</label>
          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="Notas opcionales"
            style={{ ...styles.input, minHeight: '80px', resize: 'vertical' }}
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
          {loading ? 'Guardando...' : '✓ Guardar'}
        </button>
      </form>
    </div>
  )
}

const styles = {
  container: {
    background: 'var(--surface-1)',
    border: '0.5px solid var(--border)',
    borderRadius: '8px',
    padding: '1.5rem',
    maxWidth: '500px',
  },
  title: {
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '1rem',
    color: 'var(--text-primary)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  field: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
  },
  label: {
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--text-primary)',
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
    padding: '10px 16px',
    background: 'var(--fill-accent)',
    color: 'var(--on-accent)',
    border: 'none',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
  success: {
    background: 'var(--bg-success)',
    border: '0.5px solid var(--border-success)',
    color: 'var(--text-success)',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '1rem',
    fontSize: '12px',
  },
}
