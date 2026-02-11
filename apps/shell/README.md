# Course Dashboard - Shell 🐚

> Aplicación principal que integra las aplicaciones del Course Dashboard en una interfaz unificada.

## Descripción 📖

El Shell es la **aplicación contenedora** que integra:
- 📊 **Weekly Plan**: Cronograma interactivo de semanas
- 📅 **Exam Planner**: Gestión de evaluaciones
- ⚙️ **Configuración compartida**: Temas, datos del curso, etc.

## Características Principales ✨

### 1. Sidebar de Navegación
- **Colapsable**: Oculta/Expande con un solo clic
- **Tooltips**: Información contextual al pasar el mouse (modo colapsado)
- **Accesibilidad**: Navegación por teclado, ARIA labels
- **Responsivo**: Se adapta a móvil y desktop

### 2. Gestión de Temas
- **Modo Claro/Oscuro**: Cambio instantáneo con persistencia
- **Toggle centralizado**: Compartido entre todas las aplicaciones
- **Reseta preferencias del sistema**: Detec automáticamente las preferencias del usuario

### 3. Integración de Apps
- **Navegación fluida**: Transiciones suaves entre aplicaciones
- **Estado compartido**: Configuración del curso centralizada
- **Componentes reutilizables**: Footer, tema, etc.

## Stack Tecnológico 🛠️

- **React 19** + **TypeScript**
- **Vite** para desarrollo y builds
- **Framer Motion** para animaciones
- **Tailwind CSS** para estilos
- **Lucide React** para iconos
- **@course-dashboard/shared** para configuración compartida

## Comandos Disponibles 🚀

```bash
# Desarrollo
pnpm dev                  # Inicia el shell en modo desarrollo
pnpm dev:shell:readonly  # Inicia en modo solo lectura (estudiantes)

# Builds
pnpm build                 # Build de todas las apps del monorepo
pnpm build:shell:readonly # Build del shell en modo solo lectura
```

## Estructura del Proyecto 📁

```
apps/shell/
├── src/
│   ├── components/
│   │   └── Sidebar.tsx    # Sidebar colapsable con navegación
│   ├── App.tsx            # Componente principal del shell
│   └── main.tsx           # Punto de entrada
├── public/                 # Assets estáticos
└── package.json
```

## Integración con el Monorepo 🔗

El Shell importa las otras aplicaciones desde el workspace:

```tsx
import WeeklyPlanApp from '@course-dashboard/weekly-plan';
import PlannerApp from '@course-dashboard/planner';

<AnimatePresence mode="wait">
  {activeTab === 'weekly' && <WeeklyPlanApp />}
  {activeTab === 'planner' && <PlannerApp />}
</AnimatePresence>
```

## Configuración Global ⚙️

El Shell utiliza configuración centralizada desde `@course-dashboard/shared`:

```tsx
import { COURSE_CONFIG } from '@course-dashboard/shared';

<Sidebar
  courseName={COURSE_CONFIG.name}
  semester={COURSE_CONFIG.semester}
/>
```

Para más detalles sobre la configuración, consulta el [README raíz](../../README.md#personalización).

## Componentes Principales 🧩

### Sidebar

Componente de navegación colapsable que proporciona:
- Acceso a todas las aplicaciones integradas
- Toggle de tema claro/oscuro
- Botón para ver el programa del curso (PDF)
- Información del curso (nombre, semestre)

**Props:**
```tsx
interface SidebarProps {
  activeTab: 'weekly' | 'planner';
  setActiveTab: (tab: 'weekly' | 'planner') => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  courseName: string;
  semester: string;
}
```

## Características de Accesibilidad ♿

- ✅ Navegación por teclado completa
- ✅ ARIA labels y roles apropiados
- ✅ Soporte para reduced motion
- ✅ Contraste de color WCAG AA
- ✅ Focus visible en elementos interactivos
- ✅ Tooltips en modo colapsado

## Desarrollando el Shell 👨‍💻

### Agregar una nueva aplicación

1. Crea la aplicación en `packages/` o `apps/`
2. Agrégala al workspace en `pnpm-workspace.yaml`
3. Importa en el Shell:

```tsx
import NewApp from '@course-dashboard/new-app';

// Agrega al tipo de activeTab si es necesario
const [activeTab, setActiveTab] = useState<'weekly' | 'planner' | 'new'>(...);

// Renderiza en el AnimatePresence
{activeTab === 'new' && <NewApp />}
```

4. Agrega un item en el Sidebar:

```tsx
<MenuItem
  icon={NewIcon}
  label="Nueva App"
  isActive={activeTab === 'new'}
  onClick={() => setActiveTab('new')}
  isCollapsed={isCollapsed}
/>
```

## Testing 🧪

```bash
# Ejecutar tests (cuando se agreguen)
pnpm test
```

## Deployment 📦

El Shell se puede desplegar como cualquier aplicación React:

```bash
# Build de producción
pnpm build

# Preview local
pnpm preview
```

El build genera archivos estáticos en `dist/` listos para:
- GitHub Pages
- Netlify
- Vercel
- Cualquier hosting de archivos estáticos

## Contribución 🤝

Para contribuir al Shell, por favor:

1. Sigue las guías del [README raíz](../../README.md#contribución)
2. Mantén consistencia con el resto del monorepo
3. Asegura accesibilidad en todos los cambios
4. Documenta nuevas características

## Créditos 🙏

- Parte del proyecto [Course Dashboard](../../README.md)
- Inspirado en la necesidad de unificar experiencias educativas
