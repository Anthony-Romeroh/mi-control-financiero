# Setup - Conexión a Supabase

## ✅ Listo

1. **Archivo `.env.local` creado** con tu URL y clave pública
2. **Archivo `lib/api.ts` creado** con funciones para conectar a Supabase
3. **Cliente Supabase configurado** en `lib/supabase.ts`

## 🚀 Próximos pasos

### 1. Crear las tablas en Supabase

Ve a tu dashboard de Supabase:
1. Clic en **SQL Editor** (lado izquierdo)
2. Nuevo Query
3. Copia y pega el siguiente SQL para crear las tablas:

```sql
-- Tabla movimientos
CREATE TABLE movimientos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fecha DATE NOT NULL,
  tipo TEXT NOT NULL,
  trabajo_deuda TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  monto DECIMAL NOT NULL,
  notas TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Tabla ingresos_fijos
CREATE TABLE ingresos_fijos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  monto DECIMAL NOT NULL,
  frecuencia TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- Tabla gastos_fijos
CREATE TABLE gastos_fijos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  monto DECIMAL NOT NULL,
  dia_vencimiento INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- Tabla deudas
CREATE TABLE deudas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  monto_total DECIMAL NOT NULL,
  monto_pagado DECIMAL NOT NULL,
  dia_vencimiento INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);
```

4. Ejecuta el query (botón **Run**)

### 2. Habilitar Data API

En Supabase:
1. Ve a **Integrations**
2. Busca **Data API**
3. Asegúrate que esté activo (toggle en verde)

### 3. Usar en tus componentes

**Ejemplo en tu componente:**

```typescript
import { getMovimientos, addMovimiento } from '@/lib/api'

export default function MiComponente() {
  const [movimientos, setMovimientos] = React.useState([])

  React.useEffect(() => {
    getMovimientos().then(setMovimientos)
  }, [])

  const handleAdd = async (nuevoMovimiento) => {
    await addMovimiento(nuevoMovimiento)
    const actualizado = await getMovimientos()
    setMovimientos(actualizado)
  }

  return (
    <div>
      {movimientos.map(m => (
        <div key={m.id}>{m.descripcion} - ${m.monto}</div>
      ))}
    </div>
  )
}
```

### 4. Desarrollo local

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## 📚 Funciones disponibles en `lib/api.ts`

- `getMovimientos()` - Obtener todos los movimientos
- `addMovimiento(mov)` - Agregar movimiento
- `updateMovimiento(id, mov)` - Editar movimiento
- `deleteMovimiento(id)` - Eliminar movimiento
- `getIngresosFijos()` - Obtener ingresos fijos
- `addIngresoFijo(ing)` - Agregar ingreso fijo
- `getGastosFijos()` - Obtener gastos fijos
- `addGastoFijo(gasto)` - Agregar gasto fijo
- `getDeudas()` - Obtener deudas
- `addDeuda(deuda)` - Agregar deuda
- `getResumen()` - Obtener resumen de ingresos/gastos/balance

## ❌ Errores comunes

**Error: "Column does not exist"**
- Las tablas no fueron creadas. Vuelve al paso 1.

**Error: "Unauthorized"**
- Verifica que tu API key esté correcta en `.env.local`

**Error: "CORS"**
- En Supabase, ve a **Settings > API** y verifica que tu dominio esté habilitado

## 💡 Tips

- Nunca incluyas `.env.local` en git (ya debe estar en `.gitignore`)
- Las variables deben empezar con `NEXT_PUBLIC_` para que sean accesibles en frontend
- Siempre maneja errores con try/catch en tus componentes
