# shopping-cart-api

## Descripción

`shopping-cart-api` es una aplicación para la gestión de un carrito de compras. Permite agregar y consultar productos, actualizar el stock de los productos, gestionar el carrito de un usuario (crear, consultar y actualizar), crear y autenticar usuarios con JWT, y gestionar opciones de envío.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución de JavaScript.
- **Express**: Framework para construir APIs en Node.js.
- **MongoDB**: Base de datos NoSQL para almacenar datos.

### Instalación con npm

## Clona el repositorio:

git clone https://github.com/trottadiego/shopping-cart-api.git

## Navega al directorio del proyecto:

cd shopping-cart-api

## Instala las dependencias:

npm install

## Configura las variables de entorno necesarias. Crea un archivo .env en la raíz del proyecto y define las siguientes variables:

MONGO_URI=mongodb://localhost:27017/shopping-cart
JWT_SECRET=your_jwt_secret
TOKE_EXPIRATION=1h

## Ejecuta la aplicación en modo desarrollo:

npm start

### Instalación con Docker

## Asegúrate de tener Docker y Docker Compose instalados en tu máquina.

## Construye y corre los contenedores (Backend y BD):

docker-compose up --build

## Para popular la base de datos de products y shippings correr el siguiente script:

npm run seed

## Para crear un usuario ejecutar el siguiente curl:

curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
"user": "meli",
"password": "112233"
}'

## CURLs

## Obtener Productos

curl -X GET http://localhost:5000/api/products

## Agregar un Producto

curl -X POST http://localhost:5000/api/products/add \
 -H "Content-Type: application/json" \
 -d '{
"name": "New Product",
"price": 29.99,
"stock": 100,
"imageUrl": "http://example.com/image.jpg"
}'

## Actualizar los Stocks de Productos

curl -X PUT http://localhost:5000/api/products/update-stocks \
 -H "Content-Type: application/json" \
 -H "x-auth-token: YOUR_JWT_TOKEN" \
 -d '{}'

## Obtener el Carrito

curl -X GET http://localhost:5000/api/cart \
 -H "x-auth-token: YOUR_JWT_TOKEN"

## Agregar un Producto al Carrito

curl -X POST http://localhost:5000/api/cart/add \
 -H "Content-Type: application/json" \
 -H "x-auth-token: YOUR_JWT_TOKEN" \
 -d '{
"product_id": "PRODUCT_ID",
"quantity": 1
}'

## Actualizar un Producto en el Carrito

curl -X PUT http://localhost:5000/api/cart/update \
 -H "Content-Type: application/json" \
 -H "x-auth-token: YOUR_JWT_TOKEN" \
 -d '{
"product_id": "PRODUCT_ID",
"quantity": 2,
"id_shipping": "SHIPPING_ID"
}'

## Eliminar un Producto del Carrito

curl -X DELETE http://localhost:5000/api/cart/remove \
 -H "Content-Type: application/json" \
 -H "x-auth-token: YOUR_JWT_TOKEN" \
 -d '{
"product_id": "PRODUCT_ID"
}'

## Obtener Métodos de Envío

curl -X GET http://localhost:5000/api/shipping

## Agregar un Nuevo Método de Envío

curl -X POST http://localhost:5000/api/shipping/add \
 -H "Content-Type: application/json" \
 -d '{
"type": "Standard Shipping",
"price": 5.99,
"description": "Delivers in 5-7 business days."
}'

## Registrar un Nuevo Usuario

curl -X POST http://localhost:5000/api/auth/register \
 -H "Content-Type: application/json" \
 -d '{
"user": "newUser",
"password": "password123"
}'

## Iniciar Sesión (Login)

curl -X POST http://localhost:5000/api/auth/login \
 -H "Content-Type: application/json" \
 -d '{
"user": "existingUser",
"password": "password123"
}'
