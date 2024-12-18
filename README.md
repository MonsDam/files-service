
# Microservicio de Autenticación

Este microservicio se encarga de la gestión de archivos de gran tamaño en el sistema, permitiendo almacenar, obtener, eliminar y descargar archivos de manera eficiente.

# Requisitos previos

Antes de instalar y ejecutar el Microservicio de Autenticación, asegúrate de contar con lo siguiente:

1. Node.js

    Versión mínima: 16.x o superior.
    Puedes descargarlo desde https://nodejs.org.
    Gestor de paquetes npm o yarn

    npm viene incluido con Node.js.

2. Base de datos (opcional según la implementación)

    -Instala MongoDB community en https://www.mongodb.com/ 
    -Crea una conexión en MongoDB

3. Configurar el archivo .env

    El archivo .env contiene las variables necesarias, como claves secretas, URL de la base de datos, y configuraciones específicas
    
    -Puedes guiarte del archivo .env.exaple que se encuentra en la raíz de este proyecto.

    -Debe quedar algo como 
    PORT=8000
    DATABASE_URL=mongodb://localhost:27017/tu_base_de_datos
    JWT_SECRET=tu_llave_secreta //Esta llave debe ser la misma que la del microservicio de autenticación

# Instalacion

1. Clona el repositorio:
   ```bash
   git clone https://github.com/MonsDam/files-service.git 

2. Instala las dependencias:
    ```bash
   npm install
   
3. Uso
   ```bash
   npm run dev
