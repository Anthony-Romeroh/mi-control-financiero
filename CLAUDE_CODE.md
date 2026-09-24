# 🤖 Cómo usar con Claude Code en VS Code

## ✅ Lo que necesitas:

1. VS Code instalado
2. Claude Code (extensión)
3. El ZIP: `mi-control-financiero.zip`

---

## 🚀 Pasos:

### 1. Instalar Claude Code (si no lo tienes)

```
VS Code → Extensions (Ctrl+Shift+X)
Buscar: "Claude Code"
Click Install
```

### 2. Descargar y descomprimir

```
1. Descargar mi-control-financiero.zip
2. Descomprimir en una carpeta (ej: Documentos)
3. Copiar la ruta completa (Ctrl+L en el navegador)
```

### 3. Abrir en VS Code

```
VS Code → File → Open Folder
Seleccionar la carpeta descomprimida
```

### 4. Instalar dependencias

```
Terminal (Ctrl+ñ):
npm install
```

### 5. Usar Claude Code

Ahora puedes usar Claude dentro de VS Code:

```
Abrir: View → Claude Code Chat (o Ctrl+Shift+Alt+C)

Ejemplos de comandos:

"@Claude crea el modulo de ingresos"
"@Claude agrega gráficos al dashboard"
"@Claude explica cómo funciona el formulario"
"@Claude ayuda a agregar una nueva tabla"
"@Claude revisa los errores en la consola"
```

---

## 💻 Comandos útiles en Claude Code:

```
// Ver archivos
"@Claude muestra la estructura del proyecto"

// Editar archivos
"@Claude modifica app/page.tsx para agregar..."

// Crear nuevos componentes
"@Claude crea un nuevo componente llamado Dashboard"

// Debug
"@Claude ayuda con este error: [error aqui]"

// Deploy
"@Claude explica cómo hacer deploy en Vercel"
```

---

## 🎯 Flujo de trabajo:

```
1. VS Code abierto
2. Claude Code panel (lado derecho)
3. Escribir lo que quieres
4. Claude ve tu código y ayuda
5. Él edita los archivos
6. Tú ejecutas: npm run dev
7. Pruebas en http://localhost:3000
```

---

## 💡 Tips con Claude Code:

✅ **Sé específico**
```
Malo: "agrega un botón"
Bueno: "agrega un botón rojo en Sidebar.tsx que dice 'Guardar' y hace console.log cuando clickeas"
```

✅ **Menciona archivos**
```
"@Claude en components/Resumen.tsx, agrega una gráfica que muestre ingresos vs gastos"
```

✅ **Pide explicaciones**
```
"@Claude explica qué hace lib/supabase.ts"
```

✅ **Pide correcciones**
```
"@Claude tengo este error: [error]. ¿Cómo lo arreglo?"
```

---

## 🔄 Ciclo de desarrollo:

```
1. Terminal: npm run dev
2. VS Code muestra: http://localhost:3000
3. Claude Code para editar
4. Guardar archivos (Ctrl+S)
5. Navegador recarga automático
6. Prueba cambios

Repite: 3→6
```

---

## 📚 Ejemplo completo:

```
TÚ EN CLAUDE:
"Quiero agregar un botón de descarga de PDF en el dashboard.
 Debe descargar un reporte con ingresos, gastos y deudas del mes.
 El botón debe estar en el header."

CLAUDE:
[Claude entiende, revisa tu código]
[Crea el componente necesario]
[Edita app/page.tsx]
[Te muestra qué hizo]

TÚ:
[Guardas]
[Ejecutas: npm run dev]
[Pruebas en el navegador]
[Si falta algo, pides al Claude que ajuste]
```

---

## 🚀 Cuando esté listo para producción:

```
"@Claude prepara el proyecto para deploy en Vercel"

Él te dirá:
1. Qué variables en .env.local
2. Cómo subirlo a GitHub
3. Cómo configurar Vercel
```

---

## ✨ Ventajas de usar Claude Code:

✅ Claude ve TODO tu código en contexto
✅ Puede editar múltiples archivos a la vez
✅ Entiende tu proyecto completo
✅ Hace cambios sin salir de VS Code
✅ Explica mientras edita
✅ Puedes iterar rápido

---

## 🎓 Aprender mientras desarrollas:

```
"@Claude explica cómo Next.js carga el app/page.tsx"
"¿Cómo funciona Supabase con React?"
"¿Por qué usamos el patrón de componentes aquí?"
```

Claude enseña mientras desarrolla.

---

## 📱 Probar en celular desde VS Code:

```
1. npm run dev
2. Buscar IP local (ej: 192.168.1.10)
3. En celular: http://192.168.1.10:3000
4. Desde ahí: Safari/Chrome → Agregar a pantalla de inicio
```

---

## 🆘 Si algo no funciona:

```
"@Claude tengo este error en la consola:
[pegaste el error aquí]

¿Cómo lo arreglo?"

Claude analizará:
- Tu código
- El error
- Las dependencias
- La configuración

Y te dirá exactamente qué hacer
```

---

## 🎯 Próximas features a pedir:

```
"Agrega una tabla de historial de movimientos"
"Crea gráficos con Chart.js"
"Agrega autenticación"
"Exporta datos a Excel"
"Notificaciones de vencimientos"
```

Claude puede hacer TODO esto en minutos.

---

## 🚀 Resumen:

1. Descargar ZIP ✅
2. Descomprimir en carpeta
3. Abrir en VS Code
4. `npm install`
5. Usar Claude Code para editar
6. `npm run dev` para probar
7. ¡Desarrollar rápido!

---

**¡Ahora tienes superpoderes de desarrollo!** 💪

Usa Claude Code para construir tu app 🚀
