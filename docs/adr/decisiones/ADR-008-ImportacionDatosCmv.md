# ADR-008 – Importacion Datos mediante archivo CSV

## Contexto
Para la inportacion de datos se a utilizado se a dedicido utilizar formato CSV de forma separada para albumes y biografia.

## Decisión
Se propone la utilizacion de este formato para la ingresion de datos del album y biografia junto con la portada especifica del album o biografia

## Consecuencias

### Positivas
- Se puede abrir, leer y editar en casi cualquier programa de hojas de cálculo (Excel, Google Sheets), bases de datos o editores de texto plano
-  Al ser solo texto sin formatos complejos, estilos, ni gráficos, ocupa muy poco espacio en disco y se transfiere o envía por correo muy rápido
- Funciona como un estándar para exportar e importar información entre diferentes sistemas (por ejemplo, pasar clientes de una tienda online a un CRM)

### Negativas
- Incapacidad para datos complejos: Solo manejan texto plano; no pueden almacenar imágenes, gráficos, audio ni estructuras de datos anidadas.
- Al ser archivos de texto plano que deben leerse por completo en la memoria, su procesamiento es lento y poco eficiente cuando se trabaja con gigabytes de información.
- Alto consumo de memoria y rendimiento a gran escala


## Estado
Aceptado.

