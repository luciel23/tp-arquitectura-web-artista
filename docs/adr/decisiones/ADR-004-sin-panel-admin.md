

# ADR-002 – Ausencia de panel de administración.

## Contexto
El alcance del proyecto es presentar el portfolio público de la banda, sin una interfaz privada para administrar su contenido.

## Decisión
No desarrollar un panel de administración ni operaciones CRUD completas para uso desde una interfaz administrativa. La carga inicial y el mantenimiento del contenido se gestionarán por otros medios.

## Consecuencias

### Positivas
- Mas facil de desarrollar al ser menos complejo.
- Menor cantidad de pantallas
- Menor complejidad de autorización.

### Negativas
- Actualizar el contenido requiere intervención técnica o un mecanismo alternativo de carga.

## Estado
Aceptado.