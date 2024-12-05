App Brigada
Este proyecto es una aplicación web para las actividades realizadas por usuarios y miembros de un grupo de supporters de un equipo de futbol, desarrollada utilizando React para el frontend y Node.js con Express para el backend. La aplicación permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) los eventos, utilizando MongoDB como base de datos.

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

Funcionalidades
Se muestra un calendario con las actividades o eventos que se realizarán, cada miembro puede acceder ver fotografías y gestionar su propio calendario de eventos
En el calendario se pueden visualizar todos los eventos agregados
Detalles del Hechizo: Consulta los detalles de un hechizo específico.
Crear evento: Añade un nuevo evento a la base de datos.
Editar evento: Modifica los detalles de un evento existente.
Eliminar evento: Al seleccionar un evento y hacer click permite eliminarlo pero antes muestra un mensaje de alerta por seguridad.

