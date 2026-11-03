# ADR-010 – Arquitectura modular del backend y separación de responsabilidades

## Contexto
El backend necesita organizar sus funcionalidades para facilitar el mantenimiento y evitar que toda la lógica de acceso a datos y de negocio quede concentrada en los endpoints.

## Decisión
Organizar el backend mediante módulos funcionales y separar las responsabilidades utilizando repositorios y servicios.

## Consecuencias

### Positivas
- Mayor organización del código.
- Separación entre lógica de negocio y acceso a datos.
- Facilita el mantenimiento y las modificaciones.
- Permite trabajar sobre funcionalidades de manera independiente.

### Negativas
- Mayor cantidad de archivos y carpetas.
- Requiere mantener criterios de organización consistentes entre módulos.

## Estado
Aceptado.
