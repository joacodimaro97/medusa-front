# 🛍️ Medusa Ecommerce Frontend

Una aplicación de comercio electrónico moderna construida con React, Vite y Tailwind CSS, integrada con el framework Medusa.

## ✨ Características

- 🚀 **React 18** con Vite para desarrollo rápido
- 🎨 **Tailwind CSS** para estilos modernos y responsivos
- 🛒 **Carrito de compras** completo con persistencia
- 📱 **Diseño responsivo** para móviles y desktop
- 🔍 **Búsqueda y filtros** de productos
- 💳 **Checkout** integrado
- 🔗 **Integración completa** con Medusa API

## 🛠️ Tecnologías

- **Frontend**: React 18, Vite, Tailwind CSS
- **Estado**: React Context API
- **Navegación**: React Router DOM
- **Iconos**: Lucide React
- **Backend**: Medusa (Headless Commerce)

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <tu-repositorio>
   cd medusa-ecommerce-frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env (opcional)
   # Para usar datos ficticios (recomendado para desarrollo):
   VITE_USE_MOCK_DATA=true
   
   # Para conectar con backend real de Medusa:
   # VITE_MEDUSA_BACKEND_URL=http://localhost:9000
   ```

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

## 🚀 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Header.jsx      # Navegación principal
│   └── ProductCard.jsx # Tarjeta de producto
├── contexts/           # Contextos de React
│   └── CartContext.jsx # Estado del carrito
├── pages/              # Páginas de la aplicación
│   ├── Home.jsx        # Página de inicio
│   ├── Products.jsx    # Lista de productos
│   ├── ProductDetail.jsx # Detalle de producto
│   ├── Cart.jsx        # Carrito de compras
│   └── Checkout.jsx    # Proceso de checkout
├── services/           # Servicios y APIs
│   └── medusa.js       # Cliente de Medusa
├── App.jsx             # Componente principal
├── main.jsx           # Punto de entrada
└── index.css          # Estilos globales
```

## 🔧 Configuración de Medusa

### Opción 1: Datos Ficticios (Recomendado para desarrollo)
La aplicación incluye datos ficticios que te permiten ver cómo funciona sin necesidad de configurar un backend:

```bash
# Crear archivo .env
VITE_USE_MOCK_DATA=true
```

Esto te dará acceso a:
- 8 productos de ejemplo (iPhone, MacBook, AirPods, etc.)
- Funcionalidad completa del carrito
- Simulación de API con delays realistas

### Opción 2: Backend Real de Medusa
Para usar con un backend real de Medusa: 

### Instalación de Medusa Backend

1. **Instalar Medusa CLI**
   ```bash
   npm install -g @medusajs/medusa-cli
   ```

2. **Crear proyecto Medusa**
   ```bash
   medusa new medusa-backend
   cd medusa-backend
   ```

3. **Ejecutar el backend**
   ```bash
   medusa develop
   ```

El backend estará disponible en `http://localhost:9000`

## 🎨 Personalización

### Colores
Los colores principales se pueden personalizar en `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        // ... más tonos
        900: '#0c4a6e',
      }
    }
  },
}
```

### Componentes
Los componentes están construidos con Tailwind CSS y son fácilmente personalizables. Puedes modificar los estilos en `src/index.css` o directamente en los componentes.

## 📱 Funcionalidades

### 🏠 Página de Inicio
- Hero section atractivo
- Productos destacados
- Sección de características
- Testimonios de clientes

### 📦 Catálogo de Productos
- Grid responsivo de productos
- Búsqueda en tiempo real
- Filtros (expandible)
- Paginación
- Vista de lista/grid

### 🛍️ Detalle de Producto
- Galería de imágenes
- Información detallada
- Selección de variantes
- Control de cantidad
- Agregar al carrito

### 🛒 Carrito de Compras
- Gestión de productos
- Control de cantidades
- Eliminación de items
- Resumen del pedido
- Cálculo de totales

### 💳 Checkout
- Formulario de envío
- Información de pago
- Resumen del pedido
- Confirmación

## 🔌 Integración con Medusa

La aplicación está completamente integrada con la API de Medusa:

- **Productos**: Listado, detalle, búsqueda
- **Carrito**: Crear, agregar, actualizar, eliminar
- **Checkout**: Proceso de compra
- **Gestión de estado**: Context API para el carrito

## 🚀 Despliegue

### Vercel
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Deploy automático

### Netlify
1. Sube tu código a GitHub
2. Conecta con Netlify
3. Configura las variables de entorno
4. Deploy

### Variables de Entorno para Producción
```bash
VITE_MEDUSA_BACKEND_URL=https://tu-backend-medusa.com
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la [documentación de Medusa](https://docs.medusajs.com/)
2. Abre un issue en este repositorio
3. Contacta al equipo de desarrollo

---

¡Disfruta construyendo tu tienda online con Medusa! 🎉 