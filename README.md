# Prueba Técnica - Desarrollo de Sistema de Vehículos
col3.23
## Descripción
Este proyecto tiene como objetivo desarrollar un sistema para gestionar vehículos y sus agrupaciones mediante una interfaz web con funcionalidades de Drag and Drop. El sistema incluye un backend desarrollado en Node.js con TypeScript y un frontend construido en Angular.

---

## Características principales

### Backend (Node.js con TypeScript)
1. **API RESTful** para gestionar vehículos y grupos:
   - **CRUD para vehículos**: Crear, Leer, Actualizar, Eliminar.
   - **Gestión de grupos**:
     - Crear nuevos grupos (sin posibilidad de editar ni eliminar).
   - **Relacionar vehículos con grupos** utilizando Drag and Drop.
2. **Base de datos PostgreSQL**:
   - **Tabla de Vehículos**: Almacena atributos como marca, modelo, año, color, placa y ubicación.
   - **Tabla de Grupos**: Almacena los grupos de vehículos.
     - Tabla grupos: atributos: id, Nombre y Descripción.
   - **Relación many-to-many** entre vehículos y grupos:
     - Un vehículo puede pertenecer a varios grupos.
     - Un grupo puede contener varios vehículos.
     - Tabla vehiculos_grupos:atributos:id,vehiculos_id y grupos_id.

---

### Frontend (Angular)
1. **Vista de vehículos**:
   - CRUD básico para gestionar vehículos.
2. **Vista de grupos**:
   - Crear nuevos grupos (sin posibilidad de editar ni eliminar).
   - Mostrar los grupos y los vehículos asignados a cada uno.
3. **Interacción Drag and Drop**:
   - Permite mover vehículos entre diferentes grupos de manera intuitiva.

---

## Instalación y ejecución

### Requisitos previos
- Node.js v17+ y npm instalado.
- PostgreSQL instalado y configurado.
- Angular CLI instalado globalmente.
- En caso de no tener la instalación 
    ```bash
        npm install -g @angular/cli
        npm i cors

### Base de datos PostgreSQL
En la ruta: Backend-servidor\database\concesionario.sql

Este es el script para importar la Base de datos en Pgadmin4 o el adminitrador de base de datos de su preferencia.

En la ruta: Backend-servidor\src\database.ts

Se encuentra la conexion a la base de datos donde se debe cambiar los parametros de user y password segun la configuración previa de cada entorno.

#### Dependecias
    - npm init -y
    - crea package.json
    - npm i typescript -D dependencia de desarrollo
    - npx tsc para ejecutar typescript
    - npm i express pg
    - npm i @types/express -D
    - npm i @types/pg -D
    - npm i nodemon -D
    - npm run dev
    - npm i concurrently
    - npm install typeorm reflect-metadata pg
    - npm install --save-dev @types/express
    - npm install --save-dev @types/node -D

### Frontend
1. Clonar el repositorio.
2. Navegar a la carpeta del frontend-cliente:
   ```bash
   cd frontend-cliente
3. Se inicia el frontend con el comando
    ```bash
4. La interfaz se encuentra en:
   http://localhost:4200

### Backend
1. Clonar el repositorio.
2. Navegar a la carpeta del Backend-servidor:
   ```bash
   cd Backend-servidor
3. Se inicia el Backend con el comando
    ```bash
    npm run dev

## API Reference

### api = http://localhost:3000

## vehículos

#### Obtiene la lista de todos los vehículos.

```http
 GET /api/vehicles
```
#### Obtiene un vehículo por ID

```http
  GET /api/vehicles/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. ID del vehículo a buscar |

#### Crear un vehículo

```http
 POST /api/vehicles
```


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `marca`      | `string` | **Required**. Marca del vehículo|
| `modelo`      | `string` | **Required**. Modelo del vehículo |
| `año`      | `number` | **Required**. Año del vehículo |
| `color`      | `string` | **Required**. Color del vehículo |
| `ubicacion`      | `string` | **Required**. Ubicación del vehículo |
| `placa`      | `string` | **Required**. placa del vehículo |

#### Actualizar un vehículo por ID

```http
 Put /api/vehicles/:id
```


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. ID del vehículo a actualizar |
| `marca`      | `string` | **optional**. Marca del vehículo|
| `modelo`      | `string` | **optional**. Modelo del vehículo |
| `año`      | `number` | **optional**. Año del vehículo |
| `color`      | `string` | **optional**. Color del vehículo |
| `ubicacion`      | `string` | **optional**. Ubicación del vehículo |
| `placa`      | `string` | **optional**. placa del vehículo |

#### Eliminar un vehículo por ID

```http
 DELETE /api/vehicles/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. ID del vehículo a Eliminar |

## Grupos

#### Obtiene la lista de todos los grupos

```http
 GET /api/groups
```
#### Obtiene un grupo por ID

```http
 GET /api/groups/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**.  ID del grupo a buscar |

#### Crear un grupo

```http
 GET /api/groups/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `nombre`      | `string` | **Required**. Nombre del vehículo |
| `descripcion`      | `string` | **Required**. Descripción del vehículo|

#### Buscar vehículos en un grupo

```http
GET /api/groups/vehicles/get
```
## Relación entre Vehículos y Grupos

### Agregar un vehículo a un grupo

```http
POST /api/groups/:groupId/vehicles/:vehicleId
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `groupId`      | `int` | **Required**. ID del grupo donde esta el vehículo |
| `vehicleId`      | `int` | **Required**.  ID del vehículo a agregar|

### Mover un vehículo entre grupos

```http
PUT /api/groups/vehicles/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. ID del vehículo |
| `groupId`      | `int` | **Required**.  ID del grupo donde se encuentra|

### Eliminar un vehículo de un grupo

```http
DELETE /api/groups/:grupo_id/delete-vehicle/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**.  ID del vehículo a eliminar del grupo |
| `grupo_id`      | `int` | **Required**.  ID del grupo donde se encuentra|



