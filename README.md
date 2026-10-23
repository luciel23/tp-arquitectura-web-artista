# Portfolio y biografía de artista musical

Trabajo Práctico Integrador de la materia **Arquitectura Web**.

Aplicación web para presentar la trayectoria de un artista musical, su biografía, discografía, canciones y conciertos. El proyecto utiliza Astro para la aplicación web, PostgreSQL como base de datos y Prisma ORM para el acceso a los datos.

## Tecnologías

- **Node.js y npm:** entorno de ejecución y gestión de dependencias.
- **Astro:** framework de la aplicación web.
- **PostgreSQL:** sistema gestor de base de datos.
- **Prisma ORM:** modelado y consultas a la base de datos.
- **JavaScript:** desarrollo de la lógica de la aplicación y la API.

## Requisitos previos

Antes de comenzar, instalá:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) y npm. Se recomienda Node.js 24.
- [PostgreSQL](https://www.postgresql.org/)

Verificá las instalaciones desde una terminal:

```bash
git --version
node --version
npm --version
psql --version
```

## Instalación del proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/luciel23/tp-arquitectura-web-artista.git
cd tp-arquitectura-web-artista
```

### 2. Instalar las dependencias

Desde la carpeta raíz del proyecto, ejecutá:

```bash
npm install
```

### 3. Configurar PostgreSQL

El proyecto utiliza una base de datos llamada `portfolio_artista`.

Si todavía no la creaste, ingresá a PostgreSQL con un usuario administrador y ejecutá:

```sql
CREATE DATABASE portfolio_artista;
CREATE USER portfolio_user WITH PASSWORD 'CAMBIAR_POR_UNA_CLAVE_SEGURA';
GRANT ALL PRIVILEGES ON DATABASE portfolio_artista TO portfolio_user;
```

Después, conectate a la base de datos con el usuario administrador y otorgale los permisos necesarios sobre el esquema `public`:

```sql
\c portfolio_artista

GRANT USAGE, CREATE ON SCHEMA public TO portfolio_user;
```

Si la base de datos o el usuario ya existen, no es necesario crearlos nuevamente. En ese caso, verificá que el usuario tenga los permisos necesarios.

> **Importante:** la contraseña del ejemplo es un marcador de posición. Reemplazalo por una contraseña propia y no la compartas ni la subas al repositorio.

### 4. Configurar las variables de entorno

Creá un archivo llamado `.env` en la raíz del proyecto, junto a `package.json`.

Agregá la siguiente variable y reemplazá `TU_CONTRASEÑA` por la contraseña de tu usuario de PostgreSQL:

```env
DATABASE_URL="postgresql://portfolio_user:TU_CONTRASEÑA@localhost:5432/portfolio_artista?schema=public"
```

Si tu contraseña contiene caracteres especiales, puede ser necesario codificarlos para incluirlos en la URL de conexión.

El archivo `.env` contiene credenciales privadas: **no debe subirse a Git ni compartirse públicamente**.

### 5. Preparar la base de datos con Prisma

Ejecutá las migraciones incluidas en el repositorio:

```bash
npx prisma migrate deploy
```

Este comando crea las tablas definidas por las migraciones existentes sin generar una migración nueva.

Luego, generá el cliente de Prisma:

```bash
npx prisma generate
```

Las migraciones permiten que todos los integrantes del equipo tengan una estructura de base de datos consistente.

### 6. Probar la conexión a PostgreSQL

El proyecto incluye un script para verificar la conexión:

```bash
node scripts/probar-db.js
```

Si la configuración es correcta, el script mostrará un mensaje indicando que la conexión con PostgreSQL fue exitosa.

Si aparece un error, revisá que PostgreSQL esté funcionando, que la base de datos exista y que `DATABASE_URL` contenga los datos correctos.

## Ejecutar la aplicación

Iniciá el servidor de desarrollo:

```bash
npm run dev
```

Por defecto, Astro estará disponible en:

http://localhost:4321

Para detener el servidor, presioná `Ctrl + C` en la terminal.

Otros comandos útiles:

```bash
npm run build
npm run preview
```

- `npm run build`: genera la compilación de producción.
- `npm run preview`: permite previsualizar la compilación localmente.

## API de álbumes

Actualmente, el proyecto incluye el endpoint `/api/albums`.

### Obtener todos los álbumes

**Método:** `GET`

```http
http://localhost:4321/api/albums
```

Devuelve un arreglo JSON con los álbumes registrados en la base de datos.

### Crear un álbum

**Método:** `POST`

```http
http://localhost:4321/api/albums
```

Enviá un cuerpo JSON con el título y la descripción obligatorios. La fecha de publicación y la portada son opcionales.

Ejemplo:

```json
{
  "titulo": "Ecos de la noche",
  "descripcion": "Álbum de ejemplo",
  "fecha_publicacion": "2025-06-15T00:00:00.000Z",
  "portada": "https://ejemplo.com/portada.jpg"
}
```

Podés probar estos endpoints con Thunder Client, Postman o `curl`.

Ejemplo para consultar los álbumes:

```bash
curl http://localhost:4321/api/albums
```

Ejemplo para crear un álbum:

```bash
curl -X POST http://localhost:4321/api/albums \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Ecos de la noche","descripcion":"Álbum de ejemplo"}'
```

El endpoint de creación responde con estado `201` cuando el álbum se crea correctamente. Los errores de validación responden con estado `400`.

## Estructura del backend

```text
prisma/
  schema.prisma
  migrations/

scripts/
  probar-db.js

src/
  lib/
    prisma.js
  pages/
    api/
      albums.js
  repositories/
    albumRepository.js
  services/
    albumService.js
```

Responsabilidades principales:

- **`prisma/schema.prisma`:** define los modelos de datos.
- **`prisma/migrations/`:** contiene las migraciones de la base de datos.
- **`src/lib/prisma.js`:** configura la conexión con PostgreSQL mediante Prisma.
- **`src/repositories/`:** contiene las operaciones de acceso a los datos.
- **`src/services/`:** contiene la lógica de negocio y las validaciones.
- **`src/pages/api/`:** define los endpoints HTTP de la API.
- **`scripts/`:** contiene herramientas de prueba y diagnóstico.

## Flujo de trabajo con Git

Para mantener organizado el trabajo en equipo, no hagas cambios directamente en `premaster`.

### 1. Actualizar la rama de integración

```bash
git switch premaster
git pull origin premaster
```

### 2. Crear una rama para tu funcionalidad

```bash
git switch -c feature/nombre-de-la-funcionalidad
```

Usá un nombre descriptivo, por ejemplo:

- `feature/biografia`
- `feature/conciertos`
- `feature/canciones`

### 3. Guardar y subir los cambios

```bash
git add .
git commit -m "Descripción breve de los cambios"
git push -u origin feature/nombre-de-la-funcionalidad
```

Antes de ejecutar `git add .`, verificá que no estés incluyendo archivos privados como `.env`.

### 4. Crear un Pull Request

Desde GitHub, creá un Pull Request desde tu rama de funcionalidad hacia `premaster`.

El equipo debe revisar los cambios antes de integrarlos. No hagas un merge directo a `premaster` sin seguir el procedimiento acordado.

## Consideraciones importantes

- Cada integrante debe configurar su propio archivo `.env`.
- No se debe subir `.env`, contraseñas ni otras credenciales al repositorio.
- Las migraciones de Prisma deben incluirse en Git; el cliente generado de Prisma no necesita versionarse.
- Si se modifica el esquema de Prisma, se debe generar una migración nueva y compartirla con el equipo.
- Si la base de datos ya contiene datos importantes, evitá eliminar tablas o ejecutar comandos que reinicien la base sin una copia de seguridad.

## Recursos útiles

- [Documentación de Astro](https://docs.astro.build/)
- [Documentación de Prisma](https://www.prisma.io/docs)
- [Documentación de PostgreSQL](https://www.postgresql.org/docs/)
- [Repositorio del proyecto en GitHub](https://github.com/luciel23/tp-arquitectura-web-artista)
