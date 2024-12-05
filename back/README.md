
# app-brigada
Proyecto final

Descripción
Este proyecto es una aplicación desarrollada con Node.js que utiliza Express para gestionar usuarios. Permite manejar operaciones relacionadas con los usuarios de la aplicación en un entorno de servidor.

Estructura del Proyecto
app-brigada/

src/: Contiene el código fuente de la aplicación.
server.js: Archivo principal del servidor.
routes/: Carpeta para las rutas de la aplicación.
models/: Carpeta para los modelos de datos (Mongoose).
controllers/: Carpeta para los controladores de la lógica del app.
views/: Carpeta para las vistas.
.env: Archivo de variables de entorno.
.gitignore: Archivos y carpetas que Git debe ignorar.
package.json: Archivo de configuración de npm.
README.md: Este archivo.
Instalación
Para instalar las dependencias del proyecto, ejecuta el siguiente comando en la raíz del proyecto:

npm install

Ejecución
Para iniciar la aplicación, utiliza el siguiente comando en la terminal:

npm start

Esto ejecutará el servidor utilizando nodemon, que reiniciará automáticamente la aplicación cuando se realicen cambios en los archivos.

Uso
Una vez que el servidor esté en ejecución, puedes acceder a la aplicación en tu navegador a través de http://localhost:3000 (o el puerto configurado en server.js).