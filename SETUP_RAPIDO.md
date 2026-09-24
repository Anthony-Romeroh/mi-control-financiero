# SETUP RAPIDO - 15 MINUTOS

## PASO 1: Abre Supabase

1. Ve a: https://app.supabase.com
2. Inicia sesion con tu cuenta
3. Selecciona tu proyecto: mi-control-financiero

## PASO 2: Ve a SQL Editor

En el menu izquierdo, click en: SQL Editor

## PASO 3: Nuevo Query

Click en: + New query

## PASO 4: Copia este SQL

Copia TODO lo siguiente y pégalo en Supabase SQL Editor:

---START SQL---
CREATE TABLE IF NOT EXISTS movimientos (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), fecha DATE NOT NULL, tipo TEXT NOT NULL, trabajo_deuda TEXT NOT NULL, descripcion TEXT NOT NULL, monto DECIMAL(12,2) NOT NULL, notas TEXT, created_at TIMESTAMP DEFAULT now());

CREATE TABLE IF NOT EXISTS ingresos_fijos (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), nombre TEXT NOT NULL, monto DECIMAL(12,2) NOT NULL, frecuencia TEXT NOT NULL, created_at TIMESTAMP DEFAULT now());

CREATE TABLE IF NOT EXISTS gastos_fijos (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), nombre TEXT NOT NULL, monto DECIMAL(12,2) NOT NULL, dia_vencimiento INTEGER NOT NULL, created_at TIMESTAMP DEFAULT now());

CREATE TABLE IF NOT EXISTS deudas (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), nombre TEXT NOT NULL, monto_total DECIMAL(12,2) NOT NULL, monto_pagado DECIMAL(12,2) NOT NULL DEFAULT 0, dia_vencimiento INTEGER NOT NULL, created_at TIMESTAMP DEFAULT now());

CREATE INDEX idx_movimientos_fecha ON movimientos(fecha);
---END SQL---

## PASO 5: Ejecuta

Click en: Run (boton verde)

Deberias ver: Query executed successfully

## PASO 6: Inicia la App

Opcion A (RECOMENDADO):
- Haz DOBLE CLIC en: start.cmd

Opcion B:
- PowerShell: npm run dev

## PASO 7: Abre

Tu navegador abrira en: http://localhost:3000

Si no, copia y pégalo manualmente.

¡LISTO! Tu app está corriendo.
