# Prueba Técnica – Sistema de Facturación con NestJS, Prisma y JWT

## Descripción General

Este proyecto consiste en el desarrollo de una API REST para la gestión de un sistema de facturación, implementada con **NestJS**, **Prisma ORM** y **PostgreSQL** (base de datos en **Neon**).  

El sistema permite realizar un CRUD completo de las siguientes entidades principales:

- **Usuario:** gestión de usuarios del sistema con autenticación mediante JWT.  
- **Factura:** registro de facturas asociadas a un usuario.  
- **DetalleFactura:** detalle de los productos incluidos en cada factura.  
- **Producto:** productos disponibles para la venta.  

La API incluye:

- Autenticación JWT (Login y Registro de usuarios).  
- Borrado lógico para mantener la integridad de los datos.  
- Documentación completa con Swagger.  
- Persistencia de datos con Prisma y PostgreSQL (Neon).  

---

## Entidades Principales

### Usuario

Representa a una persona registrada en el sistema que puede generar facturas.  
**Atributos:**
- `usuarioId`: Identificador único del usuario.  
- `nombreCompleto`: Nombre y apellido del usuario.  
- `dni`: Documento Nacional de Identidad.  
- `contraseña`: Clave de acceso encriptada del usuario.  
- `sexo`: Sexo del usuario.  
- `disponible`: Indica si el usuario está activo (borrado lógico).  
- `estadoCivil`: Estado civil del usuario.  
- `fechaNacimiento`: Fecha de nacimiento del usuario.  
**Relaciones:**
- Un usuario puede tener múltiples facturas asociadas (Factura).

---

### Factura

Representa una operación de venta asociada a un usuario.  
**Atributos:**
- `facturaId`: Identificador único de la factura.  
- `disponible`: Indica si la factura está activa (borrado lógico).  
- `fecha`: Fecha de emisión de la factura.  
- `total`: Monto total de la factura.  
- `nombreFantasia`: Nombre comercial asociado a la factura.  
- `fechaFundacion`: Fecha de fundación del comercio.  
- `usID`: Identificador del usuario que generó la factura.  
**Relaciones:**
- Está asociada a un usuario (Usuario).  
- Contiene múltiples detalles de factura (DetalleFactura).

---

### DetalleFactura

Representa cada ítem incluido dentro de una factura.  
**Atributos:**
- `detalleFactruaId`: Identificador único del detalle de factura.  
- `disponible`: Indica si el detalle está activo (borrado lógico).  
- `subtotal`: Precio total del producto por cantidad.  
- `cantidad`: Cantidad del producto facturado.  
- `factID`: Identificador de la factura asociada.  
- `prodId`: Identificador del producto asociado.  
**Relaciones:**
- Pertenece a una factura (Factura).  
- Hace referencia a un producto (Producto).

---

### Producto

Representa los productos disponibles para la venta en el sistema.  
**Atributos:**
- `productoId`: Identificador único del producto.  
- `disponible`: Indica si el producto está activo (borrado lógico).  
- `nombre`: Nombre del producto.  
- `precioUnitario`: Precio unitario del producto.  
- `descripcion`: Descripción detallada del producto.  
- `stock`: Cantidad disponible del producto.  
**Relaciones:**
- Puede estar incluido en múltiples detalles de factura (DetalleFactura).

---

## Tecnologías Utilizadas

- **NestJS** – Framework backend de Node.js.  
- **Prisma ORM** – ORM para conexión con PostgreSQL.  
- **PostgreSQL (Neon)** – Base de datos relacional.  
- **Swagger** – Documentación interactiva de la API.  
- **JWT (JSON Web Token)** – Autenticación basada en tokens.  
- **TypeScript** – Lenguaje principal del proyecto.  

---

## Instrucciones de Ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/TomMtgl/pruebatecnica.git
cd pruebatecnica
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar las variables de entorno
Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
DATABASE_URL="postgresql://<usuario>:<password>@<host>/<nombreBD>?sslmode=require"
JWT_SECRET="palabrasecreta"
PORT=3000
```

> Nota: La variable `DATABASE_URL` debe apuntar a tu base de datos en Neon.

### 4. Ejecutar Prisma
```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Iniciar el servidor
```bash
npm run start:dev
```

La aplicación estará disponible en:
```
http://localhost:3000
```

---

## Autenticación JWT

El proyecto utiliza autenticación basada en tokens JWT.  
Para acceder a rutas protegidas, primero es necesario iniciar sesión y obtener un token.

### Endpoint del Registro
**URL:**  
```
POST http://localhost:3000/auth/register
```
**Body:**
```json
{
    "nombreCompleto": "Pablo nonis",
    "dni": "40652756",
    "sexo": "Masculino",
    "contraseña": "123412",
    "estadoCivil": "Soltero",
    "fechaNacimiento": "2024-08-21T10:30:00Z"
}
```

### Endpoint de Login
**URL:**  
```
POST http://localhost:3000/auth/login
```

**Body:**
```json
{
  "dni": "40652756",
  "contraseña": "123412"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Para autenticarte en Swagger o en tus peticiones HTTP:
```
Authorization: Bearer <token>
```

---

## Documentación Swagger

Swagger está disponible en:
```
http://localhost:3000/api
```

Para usar endpoints protegidos:
1. Hacer clic en el botón **Authorize**.  
2. Ingresar el token JWT obtenido en el login.  
3. Presionar **Authorize** y cerrar la ventana.  

---

## Endpoints Principales

### Usuario
- `POST /auth/register` → Registrar nuevo usuario.  
- `POST /auth/login` → Iniciar sesión y obtener token JWT.  
- `GET /usuario` → Obtener todos los usuarios disponibles.  
- `GET /usuario/todos` → Obtener todos los usuarios (incluidos inactivos).  
- `GET /usuario/:id` → Buscar usuario por ID.  
- `POST /usuario` → Crear un nuevo usuario.  
- `PUT /usuario/:id` → Editar usuario existente.  
- `DELETE /usuario/:id/permanente` → Eliminación permanente del usuario.  
- `DELETE /usuario/:id` → Borrado lógico del usuario.  
- `PATCH /usuario/:id` → Restaurar usuario dado de baja.  

### Producto
- `GET /producto` → Obtener todos los productos disponibles.  
- `GET /producto/todos` → Obtener todos los productos (incluidos inactivos).  
- `GET /producto/:id` → Buscar producto por ID.  
- `POST /producto` → Crear nuevo producto.  
- `PUT /producto/:id` → Editar producto existente.  
- `DELETE /producto/:id/permanente` → Eliminación permanente del producto.  
- `DELETE /producto/:id` → Borrado lógico del producto.  
- `PATCH /producto/:id` → Restaurar producto dado de baja.  

### Factura
- `GET /factura` → Obtener todas las facturas disponibles.  
- `GET /factura/todos` → Obtener todas las facturas (incluidas inactivas).  
- `GET /factura/:id` → Buscar factura por ID.  
- `POST /factura` → Crear nueva factura.  
- `PUT /factura/:id` → Editar factura existente.  
- `DELETE /factura/:id/permanente` → Eliminación permanente de la factura.  
- `DELETE /factura/:id` → Borrado lógico de la factura.  
- `PATCH /factura/:id` → Restaurar factura dada de baja.  


