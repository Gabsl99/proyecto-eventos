# Plataforma de Gestión Universitaria de Eventos

**Producto Académico N° 04 (Evaluación Final)** - Universidad Continental

## Descripción del Proyecto
Esta plataforma web permite gestionar eventos académicos, conferencias, talleres y seminarios dirigidos a estudiantes y docentes. Ha sido construida para digitalizar la publicación de información, agilizar las inscripciones y facilitar el seguimiento de los participantes mediante una interfaz moderna, limpia e intuitiva.

El proyecto está dividido en una arquitectura Cliente-Servidor, utilizando un backend simulado para la gestión de datos y una Single Page Application (SPA) en el frontend.

## Tecnologías Utilizadas

**Frontend:**
* React (v18)
* React Router DOM (Enrutamiento)
* Axios (Consumo de API REST)
* Bootstrap 5 & Bootstrap Icons (Diseño UX/UI responsivo)
* Jest & React Testing Library (Pruebas unitarias y funcionales)

**Backend:**
* Node.js
* JSON Server (Base de datos simulada y API REST)

## Estructura de la Base de Datos Simulada
El sistema maneja dos entidades principales relacionadas entre sí:
1. `eventos`: Almacena la información de los talleres y conferencias.
2. `inscripciones`: Registra a los participantes vinculándolos con el ID del evento.

## Instrucciones de Instalación y Ejecución

Para ejecutar este proyecto localmente, es necesario levantar tanto el servidor backend como la aplicación frontend en dos terminales distintas.

### 1. Iniciar el Backend (Base de Datos)
```bash
cd backend
npm install
node server.js

### 2. Iniciar el Frontend (En una nueva terminal)

cd frontend
npm install
npm start