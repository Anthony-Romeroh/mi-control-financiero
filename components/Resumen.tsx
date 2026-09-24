'use client'

import { useState, useEffect } from 'react'
import { getMovimientos } from '@/lib/api'

export function Resumen() {
  const [stats, setStats] = useState({
    saldo: 3280.50,
    ingresos: 5550.50,
    gastos: 1270,
    deudas: 10800,
  })
  const [loading, setLoading] = useState(false)
  const [movimientos, setMovimientos] = useState<any[]>([
    { id: '1', fecha: '2026-09-24', tipo: 'Ingreso Trabajo 1', descripcion: 'Quincena trabajo', monto: 2500 },
    { id: '2', fecha: '2026-09-23', tipo: 'Propina', descripcion: 'Propina del día', monto: 150 },
    { id: '3', fecha: '2026-09-20', tipo: 'Ingreso Trabajo 2', descripcion: 'Pago mensual', monto: 1800 },
    { id: '4', fecha: '2026-09-15', tipo: 'Abono Deuda', descripcion: 'Pago tarjeta', monto: 500 },
    { id: '5', fecha: '2026-09-10', tipo: 'Propina', descripcion: 'Propina extra', monto: 100.50 },
  ])

  const proximos = [
    { fecha: '2026-09-30', concepto: 'Alquiler vencimiento', monto: 800, tipo: 'gasto' },
    { fecha: '2026-10-05', concepto: 'Servicios vencimiento', monto: 120, tipo: 'gasto' },
    { fecha: '2026-10-15', concepto: 'Pago deuda préstamo', monto: 200, tipo: 'deuda' },
  ]

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const movs = await getMovimientos()
      if (movs && movs.length > 0) {
        const ultimosCinco = movs.slice(0, 5)
        setMovimientos(ultimosCinco)

        let ingresos = 0
        let egresos = 0

        movs.forEach((mov) => {
          if (mov.tipo.includes('Ingreso') || mov.tipo === 'Propina') {
            ingresos += mov.monto
          } else if (mov.tipo === 'Abono Deuda') {
            egresos += mov.monto
          }
        })

        setStats({
          saldo: ingresos - egresos,
          ingresos,
          gastos: 1270,
          deudas: 10800,
        })
      }
    } catch (error) {
      console.error('Error cargando datos:', error)
    } finally {
      setLoading(false)
    }
  }

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

      <div style={{ ...styles.card, marginTop: '1rem' }}>
        <h3 style={styles.sectionTitle}>Últimos movimientos</h3>
        {loading ? (
          <p style={styles.placeholder}>Cargando...</p>
        ) : movimientos.length === 0 ? (
          <p style={styles.placeholder}>No hay movimientos aún</p>
        ) : (
          <div style={styles.movimientosList}>
            {movimientos.map((mov) => (
              <div key={mov.id} style={styles.movimiento}>
                <div style={styles.movimientoInfo}>
                  <div style={styles.movimientoTipo}>{mov.descripcion}</div>
                  <div style={styles.movimientoFecha}>{mov.fecha}</div>
                </div>
                <div
                  style={{
                    ...styles.movimientoMonto,
                    color: mov.tipo.includes('Ingreso') ? 'var(--text-success)' : 'var(--text-danger)',
                  }}
                >
                  {mov.tipo.includes('Ingreso') ? '+' : '-'}${mov.monto.toFixed(2)}
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
