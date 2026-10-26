# ADR-002 – Prisma como ORM

## Contexto
El backend necesita consultar y modificar PostgreSQL desde JavaScript sin escribir manualmente todas las consultas SQL.

## Decisión
Utilizar Prisma ORM para definir el esquema de datos y acceder a la base mediante un cliente generado.

## Consecuencias

### Positivas
- Consultas tipadas cuando corresponda
- Gestión de migraciones.
- Acceso estructurado a los modelos


### Negativas
- Se necesita generar el cliente
- Es importante mantener la configuración de Prisma correctamente.

## Estado
Aceptado.