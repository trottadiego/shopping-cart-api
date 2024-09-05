# Usa una imagen base de Node.js
FROM node:22.6.0

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto en el que tu aplicación se ejecuta
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "/seeds/productSeed.js"]
CMD ["npm", "/seeds/shippingSeed.js"]
CMD ["npm", "start"]
