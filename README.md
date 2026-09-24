# Mi Control Financiero

Aplicación web para gestionar ingresos, gastos, deudas y presupuestos personales.

## 🚀 Características

- ✅ **Resumen** - Dashboard con estadísticas en tiempo real
- ✅ **Registro de movimientos** - Ingresos y gastos individuales
- ✅ **Ingresos fijos** - Gestión de ingresos recurrentes
- ✅ **Gastos fijos** - Control de gastos mensuales
- ✅ **Deudas** - Seguimiento de deudas con pagos
- ✅ **Configuración** - Ajustes de la aplicación

## 📋 Requisitos

- Node.js v20+ (incluido en la carpeta)
- Supabase (ya configurado)

## 🔧 Setup Inicial - PASO 1 IMPORTANTE

### Crear tablas en Supabase

1. Ve a tu dashboard de Supabase
2. Abre **SQL Editor**
3. Copia y pega este SQL:

```sql
CREATE TABLE IF NOT EXISTS movimientos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fecha DATE NOT NULL,
  tipo TEXT NOT NULL,
  trabajo_deuda TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  monto DECIMAL NOT NULL,
  notas TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ingresos_fijos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  monto DECIMAL NOT NULL,
  frecuencia TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS gastos_fijos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  monto DECIMAL NOT NULL,
  dia_vencimiento INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS deudas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  monto_total DECIMAL NOT NULL,
  monto_pagado DECIMAL NOT NULL,
  dia_vencimiento INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);
```

4. Ejecuta (botón RUN)

## 🚀 Iniciar la aplicación

Haz doble clic en: **start.cmd**

Luego abre: **http://localhost:3000**

## 📱 Características

### Resumen
Dashboard con últimos movimientos y estadísticas

### Nuevo registro
Agregar ingresos o gastos rápidos

### Ingresos
Crear ingresos recurrentes (semanal, quincena, mensual)

### Gastos
Registrar gastos fijos con día de vencimiento

### Deudas
Agregar deudas y registrar pagos parciales

### Configuración
Cambiar tema y preferencias
