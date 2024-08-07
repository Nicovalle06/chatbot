# Usa la imagen base de Node.js
FROM node:18-bullseye as bot

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de dependencias y instalarlas
COPY package*.json ./
RUN npm install

# Instalar eslint globalmente y ajustar los permisos
RUN npm install -g eslint && \
    chmod -R 755 /usr/local/lib/node_modules/eslint && \
    chmod -R 755 /usr/local/bin/eslint

# Copiar el resto del código de la aplicación
COPY . .

# Crear un usuario y grupo nuevo
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Asignar permisos de usuario al directorio de trabajo
RUN chown -R appuser:appuser /app

# Cambiar a este usuario
USER appuser

# Definir variables de entorno (si es necesario)
ARG RAILWAY_STATIC_URL
ARG PUBLIC_URL
ARG PORT

# Comando para iniciar la aplicación
CMD ["npm", "start"]
