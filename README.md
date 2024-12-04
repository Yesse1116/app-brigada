App Brigada
Este proyecto es una aplicación web para la gestion de usuarios y miembros de un grupo de supporters de un equipo de futbol, desarrollada utilizando React para el frontend y Node.js con Express para el backend. La aplicación permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) los usuarios, utilizando MongoDB como base de datos.

Tecnologías Utilizadas
Frontend: React, React Router, CSS
Backend: Node.js, Express
Base de Datos: MongoDB, Mongoose
Estructura del Proyecto
Frontend: Código fuente en el directorio front/
Backend: Código fuente en el directorio back/
Instalación
Backend
Navega al directorio back/.

cd back

Instala las dependencias del backend.

npm install

Configura las variables de entorno. Crea un archivo .env en el directorio back/ y agrega la siguiente línea:

MONGODB_URI=mongodb://localhost:27017/app-brigada

Inicia el servidor del backend.

npm start

Frontend
Navega al directorio front/.

cd frontend

Instala las dependencias del frontend.

npm install

Inicia el servidor de desarrollo del frontend.

npm start
*************
Funcionalidades
Lista de Hechizos: Visualiza todos los hechizos disponibles.
Detalles del Hechizo: Consulta los detalles de un hechizo específico.
Crear miembro: Añade un nuevo miembro a la base de datos.
Editar usuario: Modifica los detalles de un usuario existente.
Eliminar usuario: Elimina un usuario de la base de datos.
Endpoints del API
GET /api/hechizos - Obtiene todos los hechizos.
GET /api/hechizos/:id - Obtiene un hechizo por ID.
POST /api/hechizos - Crea un nuevo hechizo.
PUT /api/hechizos/:id - Actualiza un hechizo por ID.
DELETE /api/hechizos/:id - Elimina un hechizo por ID.

YES,  NECESITO QUE TE FIJES VOS LO DE ADMIN, ahora subo el repo y te fijas???????
dale
esto de las funcionalidades mejor 