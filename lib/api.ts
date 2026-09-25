import { supabase, Movimiento, IngresoFijo, GastoFijo, Deuda, Usuario } from './supabase'

// MOVIMIENTOS
export async function getMovimientos(usuarioId?: string): Promise<Movimiento[]> {
  try {
    let query = supabase
      .from('movimientos')
      .select('*')
      .order('fecha', { ascending: false })

    if (usuarioId) {
      query = query.eq('usuario_id', usuarioId)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error getMovimientos:', error)
      return []
    }
    return (data as Movimiento[]) || []
  } catch (error) {
    console.error('Exception getMovimientos:', error)
    return []
  }
}

export async function addMovimiento(movimiento: Omit<Movimiento, 'id' | 'created_at'>) {
  try {
    const { data, error } = await supabase
      .from('movimientos')
      .insert([movimiento])
      .select()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error addMovimiento:', error)
    throw error
  }
}

export async function updateMovimiento(id: string, movimiento: Partial<Movimiento>) {
  try {
    const { data, error } = await supabase
      .from('movimientos')
      .update(movimiento)
      .eq('id', id)
      .select()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updateMovimiento:', error)
    throw error
  }
}

export async function deleteMovimiento(id: string) {
  try {
    const { error } = await supabase
      .from('movimientos')
      .delete()
      .eq('id', id)

    if (error) throw error
  } catch (error) {
    console.error('Error deleteMovimiento:', error)
    throw error
  }
}

// INGRESOS FIJOS
export async function getIngresosFijos(usuarioId?: string): Promise<IngresoFijo[]> {
  try {
    let query = supabase
      .from('ingresos_fijos')
      .select('*')

    if (usuarioId) {
      query = query.eq('usuario_id', usuarioId)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error getIngresosFijos:', error)
      return []
    }
    return (data as IngresoFijo[]) || []
  } catch (error) {
    console.error('Exception getIngresosFijos:', error)
    return []
  }
}

export async function addIngresoFijo(ingreso: Omit<IngresoFijo, 'id' | 'created_at'>) {
  try {
    const { data, error } = await supabase
      .from('ingresos_fijos')
      .insert([ingreso])
      .select()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error addIngresoFijo:', error)
    throw error
  }
}

export async function updateIngresoFijo(id: string, ingreso: Partial<IngresoFijo>) {
  try {
    const { data, error } = await supabase
      .from('ingresos_fijos')
      .update(ingreso)
      .eq('id', id)
      .select()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updateIngresoFijo:', error)
    throw error
  }
}

export async function deleteIngresoFijo(id: string) {
  try {
    const { error } = await supabase
      .from('ingresos_fijos')
      .delete()
      .eq('id', id)

    if (error) throw error
  } catch (error) {
    console.error('Error deleteIngresoFijo:', error)
    throw error
  }
}

// GASTOS FIJOS
export async function getGastosFijos(usuarioId?: string): Promise<GastoFijo[]> {
  try {
    let query = supabase
      .from('gastos_fijos')
      .select('*')

    if (usuarioId) {
      query = query.eq('usuario_id', usuarioId)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error getGastosFijos:', error)
      return []
    }
    return (data as GastoFijo[]) || []
  } catch (error) {
    console.error('Exception getGastosFijos:', error)
    return []
  }
}

export async function addGastoFijo(gasto: Omit<GastoFijo, 'id' | 'created_at'>) {
  try {
    const { data, error } = await supabase
      .from('gastos_fijos')
      .insert([gasto])
      .select()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error addGastoFijo:', error)
    throw error
  }
}

export async function updateGastoFijo(id: string, gasto: Partial<GastoFijo>) {
  try {
    const { data, error } = await supabase
      .from('gastos_fijos')
      .update(gasto)
      .eq('id', id)
      .select()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updateGastoFijo:', error)
    throw error
  }
}

export async function deleteGastoFijo(id: string) {
  try {
    const { error } = await supabase
      .from('gastos_fijos')
      .delete()
      .eq('id', id)

    if (error) throw error
  } catch (error) {
    console.error('Error deleteGastoFijo:', error)
    throw error
  }
}

// DEUDAS
export async function getDeudas(usuarioId?: string): Promise<Deuda[]> {
  try {
    let query = supabase
      .from('deudas')
      .select('*')

    if (usuarioId) {
      query = query.eq('usuario_id', usuarioId)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error getDeudas:', error)
      return []
    }
    return (data as Deuda[]) || []
  } catch (error) {
    console.error('Exception getDeudas:', error)
    return []
  }
}

export async function addDeuda(deuda: Omit<Deuda, 'id' | 'created_at'>) {
  try {
    const { data, error } = await supabase
      .from('deudas')
      .insert([deuda])
      .select()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error addDeuda:', error)
    throw error
  }
}

export async function updateDeuda(id: string, deuda: Partial<Deuda>) {
  try {
    const { data, error } = await supabase
      .from('deudas')
      .update(deuda)
      .eq('id', id)
      .select()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updateDeuda:', error)
    throw error
  }
}

export async function deleteDeuda(id: string) {
  try {
    const { error } = await supabase
      .from('deudas')
      .delete()
      .eq('id', id)

    if (error) throw error
  } catch (error) {
    console.error('Error deleteDeuda:', error)
    throw error
  }
}

// RESUMEN (Stats)
export async function getResumen(usuarioId?: string) {
  try {
    const movimientos = await getMovimientos(usuarioId)

    const ingresos = movimientos
      .filter(m => ['Ingreso Trabajo 1', 'Ingreso Trabajo 2', 'Propina', 'Abono Deuda'].includes(m.tipo))
      .reduce((sum, m) => sum + m.monto, 0)

    const gastos = movimientos
      .filter(m => !['Ingreso Trabajo 1', 'Ingreso Trabajo 2', 'Propina', 'Abono Deuda'].includes(m.tipo))
      .reduce((sum, m) => sum + m.monto, 0)

    const deudas = await getDeudas(usuarioId)
    const totalDeuda = deudas.reduce((sum, d) => sum + (d.monto_total - d.monto_pagado), 0)

    return {
      ingresos,
      gastos,
      balance: ingresos - gastos,
      deudaTotal: totalDeuda
    }
  } catch (error) {
    console.error('Error getResumen:', error)
    return {
      ingresos: 0,
      gastos: 0,
      balance: 0,
      deudaTotal: 0
    }
  }
}

// USUARIOS
export async function getUsuarios(): Promise<Usuario[]> {
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error getUsuarios:', error)
      return []
    }
    return (data as Usuario[]) || []
  } catch (error) {
    console.error('Exception getUsuarios:', error)
    return []
  }
}

export async function addUsuario(usuario: Omit<Usuario, 'id' | 'created_at'>) {
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .insert([usuario])
      .select()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error addUsuario:', error)
    throw error
  }
}

export async function updateUsuario(id: string, usuario: Partial<Usuario>) {
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .update(usuario)
      .eq('id', id)
      .select()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updateUsuario:', error)
    throw error
  }
}

export async function deleteUsuario(id: string) {
  try {
    const { error } = await supabase
      .from('usuarios')
      .delete()
      .eq('id', id)

    if (error) throw error
  } catch (error) {
    console.error('Error deleteUsuario:', error)
    throw error
  }
}
