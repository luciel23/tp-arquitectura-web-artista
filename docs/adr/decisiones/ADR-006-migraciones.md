# ADR-002 – Gestión de cambios en la base de datos mediante migraciones de Prisma

## Contexto
El proyecto utiliza PostgreSQL como base de datos y Prisma como ORM para acceder a los datos. Durante el desarrollo se pueden modificar tablas, campos y relaciones mientras va evolucionando.

## Decisión
Se decidió utilizar Primas migrate para gestionar los cambios en la estructura de la base de datos mediante migraciones versionadas.

## Consecuencias

### Positivas
Los cambios en la estructura de la base de datos quedan registrados en archivos versionados, faciñitica configuracion de la base de datos en otros entornos y se mantiene un historial de los cambios sobre el esquema.

### Negativas
Es necesario generar y aplicar migraciones cuando se realizan cambios en el esquema, se pueden provocar errores o pérdida de datos si no se toman precauciones.

## Estado
Aceptado.