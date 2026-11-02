# ADR-009 – DespliegeDocker

## Contexto
El proyecto para ejecutarse necesita poder ser ejecutado en cualquier entorno de forma facil como si estuviera enpaquetada con todo y sus dependencias.


## Decisión
Utilizar docker como medida para empaquetar la aplicacion con sus dependecias y poder ser ejecutada de forma identica en cualquier entorno.

## Consecuencias

### Positivas
- Portabilidad y consistencia: "Funciona en mi máquina" deja de ser un problema;
- Modularidad y microservicios: Facilita dividir aplicaciones en componentes independientes que se pueden actualizar o escalar por separado
- Ligereza y bajo consumo: Comparten el núcleo (kernel) del sistema operativo anfitrión, lo que consume muchos menos recursos y memoria

### Negativas
- Seguridad compartida: Al compartir el núcleo del sistema anfitrión con todos los contenedores, un fallo crítico o vulnerabilidad de kernel puede comprometer todo el servidor
- Complejidad en gran escala: Administrar cientos o miles de contenedores de forma manual se vuelve muy difícil, requiriendo herramientas adicionales de orquestación
- Configurar volúmenes, redes, seguridad y crear imágenes personalizadas desde cero puede resultar complejo para principiantes.

## Estado
Aceptado.
