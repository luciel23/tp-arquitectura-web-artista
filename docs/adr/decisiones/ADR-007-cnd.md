# ADR-007 – Distribución de recursos estáticos mediante CDN

## Contexto
El portfolio musical incluirá recursos estáticos, como imágenes de portadas de álbumes, fotografías del artista y posiblemente otros elementos multimedia.

## Decisión
Se propone evaluar el uso de una CDN para distribuir imágenes y otros recursos estáticos del portfolio, especialmente si el volumen de contenido o las necesidades de rendimiento lo justifican.

## Consecuencias

### Positivas
- Puede reducir los tiempos de carga de imágenes y otros recursos estáticos.
- Puede disminuir la cantidad de solicitudes que llegan al servidor de origen.
- Facilita la distribución de recursos a usuarios ubicados en distintas regiones.

### Negativas
- Incorpora una dependencia de un proveedor externo.
- Puede requerir configuración adicional para la caché, la actualización y la invalidación de recursos.
- Puede generar costos o limitaciones según el proveedor y el volumen de tráfico.


## Estado
Aceptado.
