# 🐄 Sistema de Gestión de Ganado (Cattle Management)

Una aplicación web moderna para la gestión integral de hatos ganaderos. Permite administrar, rastrear y monitorear el ganado con un dashboard intuitivo, gráficos de análisis y gestión completa de datos.

## 📋 Descripción del Proyecto

Esta es una plataforma completa de **gestión de ganado** que facilita a los ganaderos:

- **Dashboard interactivo**: Resumen general del hato con métricas clave
- **Gestión de ganado**: Registro detallado de cada animal (nombre, marca, raza, peso, estado, etc.)
- **Razas**: Catálogo de razas ganaderas disponibles
- **Contactos**: Registro de proveedores, veterinarios y otros contactos
- **Autenticación segura**: Acceso mediante Firebase Authentication
- **Base de datos en tiempo real**: Sincronización instantánea con Firebase Firestore
- **Gráficos y análisis**: Visualización de datos mediante Chart.js y Recharts
- **Interfaz responsive**: Diseño adaptado para dispositivos móviles y desktop

### Tecnologías Principales

- **Vue 3**: Framework moderno con API Composition
- **TypeScript**: Tipado estático para mayor seguridad
- **Vite**: Build tool rápido y eficiente
- **Vuetify 3**: Componentes Material Design
- **Pinia**: Gestión de estado
- **Firebase**: Backend y autenticación
- **Chart.js & Recharts**: Visualización de datos

## 🚀 Instalación

### Requisitos Previos

- **Node.js**: v16 o superior
- **npm** o **yarn**: Gestor de paquetes
- Cuenta en Firebase (para funcionalidad completa)

### Pasos de Instalación

#### 1. Clonar el repositorio

```bash
git clone https://github.com/Antojose93/cattle-management.git
cd cattle-management
```

#### 2. Instalar dependencias

```bash
npm install
```

o si usas yarn:

```bash
yarn install
```

#### 3. Configurar Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com)
2. Obtén tus credenciales de configuración
3. Crea un archivo `src/firebase.config.ts` (o actualiza `src/firebase.ts`) con tus credenciales:

```typescript
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'TU_API_KEY',
  authDomain: 'tu-proyecto.firebaseapp.com',
  projectId: 'tu-proyecto',
  storageBucket: 'tu-proyecto.appspot.com',
  messagingSenderId: 'tu-sender-id',
  appId: 'tu-app-id'
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
```

#### 4. Ejecutar en modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📦 Scripts Disponibles

```bash
# Modo desarrollo con hot-reload
npm run dev

# Compilar para producción
npm run build

# Previsualizar la compilación
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── views/              # Páginas principales
│   ├── Dashboard.vue   # Panel de control
│   ├── Livestock.vue   # Gestión de ganado
│   ├── Breeds.vue      # Catálogo de razas
│   ├── Contacts.vue    # Gestión de contactos
│   └── Login.vue       # Autenticación
├── components/         # Componentes reutilizables
│   ├── CattleCard.vue
│   └── HelloWorld.vue
├── layouts/           # Layouts principales
│   └── MainLayout.vue
├── stores/            # Gestión de estado (Pinia)
│   ├── livestock.ts
│   ├── breeds.ts
│   ├── contacts.ts
│   └── useAuthStore.ts
├── types/             # Definiciones TypeScript
│   ├── cattle.ts
│   └── index.ts
├── router/            # Rutas de la aplicación
│   └── index.ts
├── plugins/           # Configuración de plugins
│   └── vuetify.ts
├── firebase.ts        # Configuración Firebase
├── main.ts            # Punto de entrada
└── style.css          # Estilos globales
```

## 🔐 Autenticación

El proyecto utiliza Firebase Authentication. Los usuarios deben:

1. Registrarse o iniciar sesión en la página de login
2. Una vez autenticados, acceder al dashboard principal
3. Gestionar su información del ganado de forma segura

## 🎯 Características Principales

### Dashboard
- Métricas del hato (total de animales, machos, hembras, etc.)
- Gráficos de distribución por estado
- Información en tiempo real

### Gestión de Ganado
- Crear, editar y eliminar registros de ganado
- Filtrar por nombre, marca o raza
- Importar/exportar datos
- Rastrear estado del animal (activo, vendido, fallecido)

### Razas
- Catálogo completo de razas disponibles
- Información detallada de cada raza

### Contactos
- Registro de proveedores, veterinarios, etc.
- Información de contacto y ubicación

## 🛠️ Desarrollo

### Agregar una Nueva Funcionalidad

1. Crear componentes en `src/components/`
2. Crear stores en `src/stores/` si se necesita gestión de estado
3. Agregar rutas en `src/router/index.ts`
4. Crear la vista en `src/views/`

### TypeScript

El proyecto está completamente tipado. Asegúrate de:

```typescript
// Usar interfaces para datos
interface Cattle {
  id: number
  name: string
  // ...
}

// Usar tipos en componentes
export default defineComponent({
  // ...
})
```

## 📚 Recursos Útiles

- [Documentación Vue 3](https://vuejs.org/)
- [Guía TypeScript con Vue](https://vuejs.org/guide/typescript/overview.html)
- [Documentación Vuetify](https://vuetifyjs.com/)
- [Documentación Pinia](https://pinia.vuejs.org/)
- [Documentación Firebase](https://firebase.google.com/docs)

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Contacto

**Autor**: Antojose93

Para preguntas o sugerencias, abre un issue en el repositorio.

---

**Última actualización**: Diciembre 2024
