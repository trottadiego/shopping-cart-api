FROM node:22.6.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# CMD ["sh", "-c", "npm start"]
CMD ["npm", "start"]
