import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Movimiento = {
  id?: string
  fecha: string
  tipo: 'Ingreso Trabajo 1' | 'Ingreso Trabajo 2' | 'Propina' | 'Abono Deuda'
  trabajo_deuda: string
  descripcion: string
  monto: number
  notas?: string
  created_at?: string
}

export type IngresoFijo = {
  id?: string
  nombre: string
  monto: number
  frecuencia: 'quincena' | 'mensual' | 'semanal'
  created_at?: string
}

export type GastoFijo = {
  id?: string
  nombre: string
  monto: number
  dia_vencimiento: number
  created_at?: string
}

export type Deuda = {
  id?: string
  nombre: string
  monto_total: number
  monto_pagado: number
  dia_vencimiento: number
  created_at?: string
}

export type Usuario = {
  id?: string
  email: string
  nombre: string
  rol: 'master' | 'normal'
  estado: 'pendiente' | 'aprobado' | 'rechazado'
  password?: string
  created_at?: string
}
