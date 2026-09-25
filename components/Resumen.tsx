'use client'

import { useState, useEffect } from 'react'
import { getMovimientos, getGastosFijos, getDeudas } from '@/lib/api'

interface ResumenProps {
  usuarioId?: string
}

export function Resumen({ usuarioId }: ResumenProps) {
  const [stats, setStats] = useState({
    saldo: 0,
    ingresos: 0,
    gastos: 0,
    deudas: 0,
  })
  const [loading, setLoading] = useState(false)
  const [movimientos, setMovimientos] = useState<any[]>([])

  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')
  const [ingresosPeriodo, setIngresosPeriodo] = useState(0)
  const [egresosPeriodo, setEgresosPeriodo] = useState(0)

  useEffect(() => {
    loadData()
    setFechaFin(new Date().toISOString().split('T')[0])
    const hace30Dias = new Date()
    hace30Dias.setDate(hace30Dias.getDate() - 30)
    setFechaInicio(hace30Dias.toISOString().split('T')[0])
  }, [])

  useEffect(() => {
    if (fechaInicio && fechaFin) {
      filtrarPorFecha()
    }
  }, [fechaInicio, fechaFin, movimientos])

  const loadData = async () => {
    try {
      const [movs, gastosList, deudasList] = await Promise.all([
        getMovimientos(usuarioId),
        getGastosFijos(usuarioId),
        getDeudas(usuarioId),
      ])

      if (movs && movs.length > 0) {
        setMovimientos(movs)

        let ingresos = 0
        let egresos = 0

        movs.forEach((mov) => {
          if (mov.tipo.includes('Ingreso') || mov.tipo === 'Propina') {
            ingresos += mov.monto
          } else if (mov.tipo === 'Abono Deuda') {
            egresos += mov.monto
          }
        })

        const totalGastos = gastosList?.reduce((sum, g) => sum + (g.monto || 0), 0) || 0
        const totalDeudas = deudasList?.reduce((sum, d) => sum + ((d.monto_total || 0) - (d.monto_pagado || 0)), 0) || 0

        setStats({
          saldo: ingresos - egresos - totalGastos - totalDeudas,
          ingresos,
          gastos: totalGastos,
          deudas: totalDeudas,
        })
      } else {
        const gastosList2 = await getGastosFijos(usuarioId)
        const deudasList2 = await getDeudas(usuarioId)
        const totalGastos = gastosList2?.reduce((sum, g) => sum + (g.monto || 0), 0) || 0
        const totalDeudas = deudasList2?.reduce((sum, d) => sum + ((d.monto_total || 0) - (d.monto_pagado || 0)), 0) || 0

        setStats({
          saldo: 0 - totalGastos - totalDeudas,
          ingresos: 0,
          gastos: totalGastos,
          deudas: totalDeudas,
        })
        setMovimientos([])
      }
    } catch (error) {
      console.error('Error cargando datos:', error)
    } finally {
      setLoading(false)
    }
  }

  const filtrarPorFecha = () => {
    if (!fechaInicio || !fechaFin) return

    const inicio = new Date(fechaInicio)
    const fin = new Date(fechaFin)
    fin.setHours(23, 59, 59)

    let ingresos = 0
    let egresos = 0

    movimientos.forEach((mov) => {
      const fecha = new Date(mov.fecha)
      if (fecha >= inicio && fecha <= fin) {
        if (mov.tipo.includes('Ingreso') || mov.tipo === 'Propina') {
          ingresos += mov.monto
        } else {
          egresos += mov.monto
        }
      }
    })

    setIngresosPeriodo(ingresos)
    setEgresosPeriodo(egresos)
  }

  const obtenerSaludFinanciera = () => {
    if (stats.saldo < 0) return { estado: 'Crítica', color: 'var(--text-danger)', emoji: '🔴' }
    if (stats.saldo < stats.gastos) return { estado: 'Baja', color: '#ff9800', emoji: '🟠' }
    if (stats.saldo < stats.gastos * 3) return { estado: 'Normal', color: 'var(--text-info)', emoji: '🟡' }
    return { estado: 'Excelente', color: 'var(--text-success)', emoji: '🟢' }
  }

  const salud = obtenerSaludFinanciera()
  const diferenciaPeriodo = ingresosPeriodo - egresosPeriodo
  const maxBarras = Math.max(ingresosPeriodo, egresosPeriodo, 1)

  return (
    <div>
      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.cardLabel}>Saldo disponible</div>
          <div style={{ ...styles.cardValue, color: 'var(--text-success)' }}>
            ${stats.saldo.toFixed(2)}
          </div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardLabel}>Ingresos</div>
          <div style={{ ...styles.cardValue, color: 'var(--text-success)' }}>
            ${stats.ingresos.toFixed(2)}
          </div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardLabel}>Gastos fijos</div>
          <div style={{ ...styles.cardValue, color: 'var(--text-danger)' }}>
            -${stats.gastos.toFixed(2)}
          </div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardLabel}>Deuda pendiente</div>
          <div style={{ ...styles.cardValue, color: 'var(--text-danger)' }}>
            -${stats.deudas.toFixed(2)}
          </div>
        </div>
      </div>

      {/* SALUD FINANCIERA */}
      <div style={{ ...styles.card, marginTop: '1rem', padding: '1.5rem' }}>
        <h3 style={styles.sectionTitle}>Estado de Salud Financiera</h3>
        <div style={styles.saludContainer}>
          <div style={styles.saludEmoji}>{salud.emoji}</div>
          <div style={styles.saludInfo}>
            <div style={{ ...styles.saludEstado, color: salud.color }}>
              {salud.estado}
            </div>
            <div style={styles.saludTexto}>
              {salud.estado === 'Crítica' && 'Gastos superan ingresos. ¡Toma acción inmediata!'}
              {salud.estado === 'Baja' && 'Tu saldo es insuficiente. Revisa tus gastos.'}
              {salud.estado === 'Normal' && 'Tu situación es estable. Continúa monitoreando.'}
              {salud.estado === 'Excelente' && '¡Excelente! Tienes un colchón financiero sólido.'}
            </div>
          </div>
        </div>
      </div>

      {/* FILTRO Y GRÁFICO */}
      <div style={{ ...styles.card, marginTop: '1rem', padding: '1.5rem' }}>
        <h3 style={styles.sectionTitle}>Análisis de Período</h3>

        <div style={styles.filterContainer}>
          <div style={styles.filterField}>
            <label style={styles.label}>Desde</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              style={styles.filterInput}
            />
          </div>
          <div style={styles.filterField}>
            <label style={styles.label}>Hasta</label>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              style={styles.filterInput}
            />
          </div>
        </div>

        {/* GRÁFICO DE BARRAS */}
        <div style={styles.chartContainer}>
          <div style={styles.barGroup}>
            <div style={styles.barLabel}>Ingresos</div>
            <div style={styles.barWrapper}>
              <div
                style={{
                  ...styles.bar,
                  width: `${(ingresosPeriodo / maxBarras) * 100}%`,
                  background: 'var(--text-success)',
                }}
              />
            </div>
            <div style={styles.barValue}>${ingresosPeriodo.toFixed(2)}</div>
          </div>

          <div style={styles.barGroup}>
            <div style={styles.barLabel}>Egresos</div>
            <div style={styles.barWrapper}>
              <div
                style={{
                  ...styles.bar,
                  width: `${(egresosPeriodo / maxBarras) * 100}%`,
                  background: 'var(--text-danger)',
                }}
              />
            </div>
            <div style={styles.barValue}>-${egresosPeriodo.toFixed(2)}</div>
          </div>

          <div style={styles.diferencia}>
            <strong>Diferencia:</strong>
            <span style={{ color: diferenciaPeriodo >= 0 ? 'var(--text-success)' : 'var(--text-danger)' }}>
              ${diferenciaPeriodo.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* ÚLTIMOS MOVIMIENTOS */}
      <div style={{ ...styles.card, marginTop: '1rem' }}>
        <h3 style={styles.sectionTitle}>Últimos movimientos</h3>
        {loading ? (
          <p style={styles.placeholder}>Cargando...</p>
        ) : movimientos.length === 0 ? (
          <p style={styles.placeholder}>No hay movimientos aún</p>
        ) : (
          <div style={styles.movimientosList}>
            {movimientos.slice(0, 5).map((mov) => (
              <div key={mov.id} style={styles.movimiento}>
                <div style={styles.movimientoInfo}>
                  <div style={styles.movimientoTipo}>{mov.descripcion}</div>
                  <div style={styles.movimientoFecha}>{mov.fecha}</div>
                </div>
                <div
                  style={{
                    ...styles.movimientoMonto,
                    color: mov.tipo.includes('Ingreso') || mov.tipo === 'Propina' ? 'var(--text-success)' : 'var(--text-danger)',
                  }}
                >
                  {mov.tipo.includes('Ingreso') || mov.tipo === 'Propina' ? '+' : '-'}${mov.monto.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '12px',
    marginBottom: '1.5rem',
  },
  card: {
    background: 'var(--surface-1)',
    border: '0.5px solid var(--border)',
    borderRadius: '8px',
    padding: '1rem',
  },
  cardLabel: {
    fontSize: '11px',
    color: 'var(--text-secondary)',
    marginBottom: '6px',
  },
  cardValue: {
    fontSize: '18px',
    fontWeight: 600,
  },
  sectionTitle: {
    fontSize: '12px',
    fontWeight: 600,
    marginBottom: '1rem',
    color: 'var(--text-primary)',
  },
  saludContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  saludEmoji: {
    fontSize: '48px',
  },
  saludInfo: {
    flex: 1,
  },
  saludEstado: {
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '4px',
  },
  saludTexto: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    lineHeight: 1.5,
  },
  filterContainer: {
    display: 'flex',
    gap: '12px',
    marginBottom: '1.5rem',
  },
  filterField: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '4px',
    flex: 1,
  },
  label: {
    fontSize: '11px',
    fontWeight: 500,
    color: 'var(--text-secondary)',
  },
  filterInput: {
    padding: '6px 10px',
    border: '0.5px solid var(--border)',
    borderRadius: '6px',
    fontSize: '12px',
    background: 'var(--surface-0)',
    color: 'var(--text-primary)',
  },
  chartContainer: {
    background: 'var(--surface-0)',
    padding: '1rem',
    borderRadius: '6px',
  },
  barGroup: {
    marginBottom: '1rem',
  },
  barLabel: {
    fontSize: '11px',
    fontWeight: 500,
    color: 'var(--text-secondary)',
    marginBottom: '4px',
  },
  barWrapper: {
    width: '100%',
    height: '24px',
    background: 'var(--surface-1)',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '4px',
  },
  bar: {
    height: '100%',
    transition: 'width 0.3s',
  },
  barValue: {
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  diferencia: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    background: 'var(--surface-1)',
    borderRadius: '4px',
    fontSize: '12px',
    marginTop: '1rem',
  },
  placeholder: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    textAlign: 'center' as const,
    padding: '1rem',
  },
  movimientosList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  movimiento: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px',
    background: 'var(--surface-0)',
    borderRadius: '6px',
    fontSize: '12px',
  },
  movimientoInfo: {
    flex: 1,
  },
  movimientoTipo: {
    color: 'var(--text-primary)',
    fontWeight: 500,
  },
  movimientoFecha: {
    fontSize: '10px',
    color: 'var(--text-muted)',
    marginTop: '2px',
  },
  movimientoMonto: {
    fontWeight: 600,
  },
}
