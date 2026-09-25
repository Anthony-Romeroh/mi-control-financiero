'use client'

export default function Manual() {
  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>📖 Manual de Uso</h1>
      <p style={styles.subtitle}>Mi Control Financiero v1.0</p>

      <div style={styles.content}>

        {/* Sección: Introducción */}
        <section style={styles.section}>
          <h2 style={styles.h2}>¿Qué es esta app?</h2>
          <p>
            <strong>Mi Control Financiero</strong> es tu asistente personal para gestionar:
          </p>
          <ul style={styles.list}>
            <li>💰 <strong>Ingresos fijos:</strong> Tu sueldo, comisiones, propinas recurrentes</li>
            <li>💸 <strong>Gastos fijos:</strong> Alquiler, servicios, Internet, subscripciones</li>
            <li>💳 <strong>Deudas:</strong> Tarjetas de crédito, préstamos, cuotas</li>
            <li>📊 <strong>Movimientos:</strong> Registro detallado de cada transacción</li>
          </ul>
        </section>

        {/* Sección: Dashboard */}
        <section style={styles.section}>
          <h2 style={styles.h2}>📊 Dashboard Principal</h2>
          <p>Al abrir la app verás 4 tarjetas principales:</p>
          <div style={styles.cards}>
            <div style={styles.card}>
              <strong style={styles.green}>✅ Saldo disponible</strong>
              <p style={styles.small}>Tu dinero libre después de deudas y gastos fijos</p>
            </div>
            <div style={styles.card}>
              <strong style={styles.green}>📈 Ingresos</strong>
              <p style={styles.small}>Total de ingresos fijos registrados</p>
            </div>
            <div style={styles.card}>
              <strong style={styles.red}>📉 Gastos fijos</strong>
              <p style={styles.small}>Total de gastos fijos mensuales</p>
            </div>
            <div style={styles.card}>
              <strong style={styles.red}>⚠️ Deuda pendiente</strong>
              <p style={styles.small}>Total de deudas aún sin pagar</p>
            </div>
          </div>
        </section>

        {/* Sección: Ingresos */}
        <section style={styles.section}>
          <h2 style={styles.h2}>💰 Registrar Ingresos Fijos</h2>
          <p>Usa esta sección para registrar dinero que entra regularmente.</p>
          <h3 style={styles.h3}>Pasos:</h3>
          <ol style={styles.orderedList}>
            <li><strong>Nombre:</strong> Ej: "Trabajo", "Propinas", "Freelance"</li>
            <li><strong>Monto:</strong> La cantidad que entra cada vez</li>
            <li><strong>Frecuencia:</strong> Semanal / Quincena / Mensual</li>
            <li>Haz clic en <strong>➕ Agregar</strong></li>
          </ol>
          <p style={styles.note}>
            💡 <strong>Nota:</strong> El "Total ingresos mensuales" ajusta automáticamente según la frecuencia.
          </p>
        </section>

        {/* Sección: Gastos */}
        <section style={styles.section}>
          <h2 style={styles.h2}>💸 Registrar Gastos Fijos</h2>
          <p>Aquí van los gastos que se repiten cada mes sin cambios.</p>
          <h3 style={styles.h3}>Pasos:</h3>
          <ol style={styles.orderedList}>
            <li><strong>Nombre:</strong> Ej: "Alquiler", "Internet", "Netflix"</li>
            <li><strong>Monto:</strong> Cuánto cuesta cada mes</li>
            <li><strong>Día vencimiento:</strong> El día del mes que vence (1-31)</li>
            <li>Haz clic en <strong>➕ Agregar</strong></li>
          </ol>
          <p style={styles.note}>
            💡 <strong>Nota:</strong> Esto se suma automáticamente y se resta de tu saldo disponible.
          </p>
        </section>

        {/* Sección: Deudas */}
        <section style={styles.section}>
          <h2 style={styles.h2}>💳 Registrar y Pagar Deudas</h2>
          <p>Controla tarjetas de crédito, préstamos, cuotas, etc.</p>
          <h3 style={styles.h3}>Registrar una deuda:</h3>
          <ol style={styles.orderedList}>
            <li><strong>Descripción:</strong> Ej: "Tarjeta Visa", "Préstamo banco", "Cuota auto"</li>
            <li><strong>Monto total:</strong> El total que debes</li>
            <li><strong>Día vencimiento:</strong> Cuándo vence el pago (1-31)</li>
            <li>Haz clic en <strong>➕ Agregar</strong></li>
          </ol>
          <h3 style={styles.h3}>Pagar una deuda:</h3>
          <ol style={styles.orderedList}>
            <li>Busca la deuda en la lista</li>
            <li>Haz clic en el botón <strong>💰 (moneda)</strong></li>
            <li>Ingresa el monto a pagar</li>
            <li>La deuda se actualiza automáticamente</li>
          </ol>
          <p style={styles.note}>
            💡 <strong>Nota:</strong> Una barra de progreso muestra cuánto has pagado. Cuando esté al 100%, la deuda está pagada.
          </p>
        </section>

        {/* Sección: Movimientos */}
        <section style={styles.section}>
          <h2 style={styles.h2}>📝 Registrar Movimientos</h2>
          <p>Usa esta sección para registrar transacciones únicas (gastos, pagos extras, etc.)</p>
          <h3 style={styles.h3}>Tipos de movimientos:</h3>
          <ul style={styles.list}>
            <li><strong>Ingreso:</strong> Dinero que entra (propina, bono, regalo)</li>
            <li><strong>Gasto:</strong> Dinero que sale (comida, transporte, compras)</li>
            <li><strong>Abono deuda:</strong> Pago hacia una deuda</li>
          </ul>
        </section>

        {/* Sección: Cálculos */}
        <section style={styles.section}>
          <h2 style={styles.h2}>🧮 Cómo se calcula todo</h2>
          <div style={styles.formula}>
            <p><strong>Saldo disponible =</strong></p>
            <p>Ingresos fijos - Gastos fijos - Deudas pendientes + Movimientos extras</p>
          </div>
          <p style={styles.example}>
            <strong>Ejemplo:</strong> Si ganas $5000, gastas $1500 en fijos, debes $2000 en deudas:
            <br />
            Tu saldo = $5000 - $1500 - $2000 = <strong>$1500 disponibles</strong>
          </p>
        </section>

        {/* Sección: Tips */}
        <section style={styles.section}>
          <h2 style={styles.h2}>💡 Tips útiles</h2>
          <ul style={styles.list}>
            <li>✅ <strong>Semanal:</strong> Úsalo para ingresos que entra cada semana (propinas, trabajos puntuales)</li>
            <li>✅ <strong>Quincena:</strong> Para sueldos cada 15 días</li>
            <li>✅ <strong>Mensual:</strong> Para ingresos y gastos que ocurren una vez al mes</li>
            <li>✅ Revisa el dashboard regularmente para ver tu progreso</li>
            <li>✅ Actualiza las deudas cuando hagas pagos</li>
            <li>✅ Usa "Movimientos" para gastos no planeados</li>
          </ul>
        </section>

        {/* Sección: Datos */}
        <section style={styles.section}>
          <h2 style={styles.h2}>🔒 ¿Dónde se guardan mis datos?</h2>
          <p>
            Todos tus datos se almacenan en <strong>Supabase</strong>, una base de datos PostgreSQL segura en la nube.
            Tus datos son privados y seguros.
          </p>
        </section>

        {/* Sección: Borrar datos */}
        <section style={styles.section}>
          <h2 style={styles.h2}>🗑️ ¿Cómo borro un registro?</h2>
          <ul style={styles.list}>
            <li>Cada ingreso, gasto o deuda tiene un botón 🗑️ (basura)</li>
            <li>Haz clic para eliminar ese registro</li>
            <li>Se eliminará de inmediato (sin opción de deshacer)</li>
          </ul>
        </section>

      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem',
    background: 'var(--bg-base)',
    color: 'var(--text-primary)',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  h1: {
    fontSize: '32px',
    fontWeight: 700,
    marginBottom: '4px',
    color: 'var(--text-primary)',
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    marginBottom: '2rem',
  },
  content: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '2rem',
  },
  section: {
    borderLeft: '3px solid var(--fill-accent)',
    paddingLeft: '1.5rem',
  },
  h2: {
    fontSize: '20px',
    fontWeight: 600,
    marginBottom: '1rem',
    color: 'var(--text-primary)',
  },
  h3: {
    fontSize: '16px',
    fontWeight: 600,
    marginTop: '1rem',
    marginBottom: '0.5rem',
    color: 'var(--text-primary)',
  },
  list: {
    marginLeft: '1.5rem',
    marginTop: '0.5rem',
    marginBottom: '1rem',
    lineHeight: 1.8,
  },
  orderedList: {
    marginLeft: '1.5rem',
    marginTop: '0.5rem',
    marginBottom: '1rem',
    lineHeight: 1.8,
  },
  cards: {
    display: 'grid' as const,
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px',
    marginTop: '1rem',
  },
  card: {
    background: 'var(--surface-1)',
    border: '0.5px solid var(--border)',
    borderRadius: '8px',
    padding: '1rem',
  },
  small: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    marginTop: '6px',
  },
  green: {
    color: 'var(--text-success)',
  },
  red: {
    color: 'var(--text-danger)',
  },
  note: {
    background: 'var(--surface-0)',
    border: '0.5px solid var(--border)',
    padding: '1rem',
    borderRadius: '6px',
    marginTop: '1rem',
    fontSize: '13px',
    lineHeight: 1.6,
  },
  example: {
    background: 'var(--surface-0)',
    border: '0.5px solid var(--border)',
    padding: '1rem',
    borderRadius: '6px',
    marginTop: '1rem',
    fontSize: '13px',
    lineHeight: 1.8,
  },
  formula: {
    background: 'var(--surface-0)',
    border: '0.5px solid var(--fill-accent)',
    padding: '1rem',
    borderRadius: '6px',
    marginTop: '1rem',
    fontSize: '13px',
  },
}
