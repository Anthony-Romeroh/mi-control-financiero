'use client'

import { useState, useEffect } from 'react'
import { Movimiento } from '@/lib/supabase'
import { getIngresosFijos, getDeudas, addDeuda, deleteDeuda } from '@/lib/api'

interface FormMovimientoProps {
  onSubmit: (movimiento: Movimiento) => Promise<void>
}

export function FormMovimiento({ onSubmit }: FormMovimientoProps) {
  const [fecha, setFecha] = useState('')
  const [tipo, setTipo] = useState('')
  const [trabajo, setTrabajo] = useState('')
  const [deuda, setDeuda] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [monto, setMonto] = useState('')
  const [notas, setNotas] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [ingresos, setIngresos] = useState<any[]>([])
  const [deudas, setDeudas] = useState<any[]>([])
  const [showNewDeuda, setShowNewDeuda] = useState(false)
  const [newDeudaNombre, setNewDeudaNombre] = useState('')
  const [newDeudaMonto, setNewDeudaMonto] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [ing, deu] = await Promise.all([getIngresosFijos(), getDeudas()])
      setIngresos(ing || [])
      setDeudas(deu || [])
    } catch (error) {
      console.error('Error cargando datos:', error)
    }
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
        trabajo_deuda: tipo === 'Abono Deuda' ? deuda : trabajo,
        descripcion,
        monto: parseFloat(monto),
        notas,
      })
      setSuccess(true)
      setFecha('')
      setTipo('')
      setTrabajo('')
      setDeuda('')
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

  const handleAddDeuda = async () => {
    if (!newDeudaNombre || !newDeudaMonto) {
      alert('Rellena los campos')
      return
    }
    try {
      await addDeuda({
        nombre: newDeudaNombre,
        monto_total: parseFloat(newDeudaMonto),
        monto_pagado: 0,
        dia_vencimiento: 1,
      })
      setNewDeudaNombre('')
      setNewDeudaMonto('')
      setShowNewDeuda(false)
      await loadData()
    } catch (error) {
      alert('Error: ' + error)
    }
  }

  const handleDeleteDeuda = async (id: string) => {
    if (!confirm('¿Eliminar deuda?')) return
    try {
      await deleteDeuda(id)
      await loadData()
    } catch (error) {
      alert('Error: ' + error)
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
              setDeuda('')
            }}
            required
            style={styles.input}
          >
            <option value="">Selecciona...</option>
            <option value="Ingreso">Ingreso</option>
            <option value="Propina">Propina</option>
            <option value="Gasto">Gasto</option>
            <option value="Abono Deuda">Abono Deuda</option>
          </select>
        </div>

        {tipo === 'Ingreso' && (
          <div style={styles.field}>
            <label style={styles.label}>Trabajo</label>
            <select
              value={trabajo}
              onChange={(e) => setTrabajo(e.target.value)}
              style={styles.input}
            >
              <option value="">Selecciona un trabajo...</option>
              {ingresos.map((ing) => (
                <option key={ing.id} value={ing.nombre}>
                  {ing.nombre} ({ing.frecuencia})
                </option>
              ))}
            </select>
          </div>
        )}

        {tipo === 'Abono Deuda' && (
          <div style={styles.field}>
            <label style={styles.label}>Deuda</label>
            <div style={styles.deudaControls}>
              <select
                value={deuda}
                onChange={(e) => setDeuda(e.target.value)}
                style={styles.input}
              >
                <option value="">Selecciona una deuda...</option>
                {deudas.map((deu) => {
                  const pendiente = deu.monto_total - (deu.monto_pagado || 0)
                  return (
                    <option key={deu.id} value={deu.nombre}>
                      {deu.nombre} (Pendiente: ${pendiente.toFixed(2)})
                    </option>
                  )
                })}
              </select>
              <button
                type="button"
                onClick={() => setShowNewDeuda(!showNewDeuda)}
                style={styles.smallBtn}
              >
                {showNewDeuda ? '✕' : '➕'}
              </button>
            </div>

            {showNewDeuda && (
              <div style={styles.newDeudaForm}>
                <input
                  type="text"
                  placeholder="Nombre deuda"
                  value={newDeudaNombre}
                  onChange={(e) => setNewDeudaNombre(e.target.value)}
                  style={styles.input}
                />
                <input
                  type="number"
                  placeholder="Monto"
                  step="0.01"
                  value={newDeudaMonto}
                  onChange={(e) => setNewDeudaMonto(e.target.value)}
                  style={styles.input}
                />
                <button
                  type="button"
                  onClick={handleAddDeuda}
                  style={styles.addBtn}
                >
                  Agregar
                </button>
              </div>
            )}

            {deudas.length > 0 && (
              <div style={styles.deudasList}>
                {deudas.map((deu) => (
                  <div key={deu.id} style={styles.deudaItem}>
                    <span>{deu.nombre}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteDeuda(deu.id)}
                      style={styles.deleteDeudaBtn}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
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
  deudaControls: {
    display: 'flex' as const,
    gap: '6px',
    alignItems: 'flex-start',
  },
  smallBtn: {
    padding: '8px 10px',
    background: 'var(--fill-accent)',
    color: 'var(--on-accent)',
    border: 'none',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer',
    minWidth: '36px',
    marginTop: '0px',
  },
  newDeudaForm: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '6px',
    padding: '10px',
    background: 'var(--surface-0)',
    borderRadius: '6px',
    marginTop: '6px',
  },
  addBtn: {
    padding: '8px 12px',
    background: 'var(--fill-accent)',
    color: 'var(--on-accent)',
    border: 'none',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  deudasList: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '6px',
    marginTop: '8px',
  },
  deudaItem: {
    display: 'flex' as const,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 10px',
    background: 'var(--surface-0)',
    borderRadius: '6px',
    fontSize: '12px',
  },
  deleteDeudaBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
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
