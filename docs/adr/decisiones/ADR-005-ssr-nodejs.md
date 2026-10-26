
# ADR-002 – Renderizado en servidor y adaptador de Node.js

## Contexto
La aplicación debe ejecutar código del servidor para responder las solicitudes a la API y conectarse a PostgreSQL.

## Decisión
Configurar Astro con output: ‘server’ y el adaptador de Node.js en modo standalone.

## Consecuencias

### Positivas
- Permite ejecutar los endpoints en un entorno Node.js 
- Permite acceder a la base desde el servidor.

### Negativas
- El despliegue requiere un entorno compatible con Node.js; no alcanza con publicar únicamente archivos estáticos.

## Estado
Aceptado.