# Course Dashboard 📚

> Una plataforma educativa moderna que transforma la forma en que estudiantes y docentes interactúan con el contenido académico.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/glacy/course-dashboard.git)

---

## La Historia 🌟

Todo comenzó con una observación simple pero poderosa: **el aprendizaje académico es complejo, pero las herramientas para gestionarlo no deberían serlo**.

### El Problema

Imagina a un estudiante de primer año en un curso de Física General. Tiene:
- 16 semanas de contenido por cubrir
- Múltiples exámenes y entregas distribuidos en el semestre
- Un sílabo de 50 páginas en PDF que es difícil de consultar
- La incertidumbre constante de "¿qué sigue?" y "¿me estoy quedando atrás?"

Los docentes, por su parte, enfrentan desafíos similares:
- ¿Cómo comunicar eficientemente las fechas de evaluación?
- ¿Cómo garantizar que los estudiantes estén en el ritmo correcto?
- ¿Cómo proporcionar una experiencia de aprendizaje organizada sin sobrecarga de información?

### La Solución

**Course Dashboard** nació como respuesta a estas preguntas. No es simplemente una aplicación; es un **ecosistema educativo** que:

1. **Organiza el tiempo en unidades digeribles**: Transforma un semestre de 16 semanas en un viaje visual y rastreable.
2. **Centraliza información crítica**: Exámenes, entregas, y recursos de estudio en un solo lugar accesible.
3. **Adapta la experiencia**: Cada usuario ve lo que necesita, cuando lo necesita.
4. **Respeta preferencias**: Modo oscuro, navegación intuitiva, y accesibilidad integral.

### La Visión

Creemos que la tecnología debe **amplificar** la capacidad humana, no complicarla. Este proyecto demuestra que con las herramientas adecuadas, la gestión académica puede ser:

- 🎯 **Precisa**: La información correcta, en el momento correcto.
- 🌈 **Amigable**: Una experiencia visual que invita al aprendizaje.
- 📱 **Accesible**: Desde cualquier dispositivo, en cualquier lugar.
- ♿ **Inclusiva**: Diseñado pensando en todos los usuarios.

---

## La Plataforma 🏗️

Course Dashboard es un **monorepo modular** que organiza dos aplicaciones especializadas bajo una misma arquitectura:

### 📊 WeeklyPlan
Un cronograma interactivo que guía a los estudiantes semana por semana a través del contenido del curso.

- **Línea de tiempo visual**: Navega por las 16 semanas con una vista clara de progreso.
- **Contenido estructurado**: Objetivos, materiales, y actividades organizadas por semana.
- **Estado dinámico**: Sabes exactamente qué completaste, qué está en progreso, y qué viene después.
- **Enfoque progresivo**: Semanas futuras bloqueadas para mantener la atención en el presente.

**Ver más:** [`packages/weekly-plan/README.md`](./packages/weekly-plan/README.md)

### 📅 ExamPlanner
Una herramienta de gestión de evaluaciones para docentes y estudiantes.

- **Panel de control**: Vista rápida de exámenes pendientes y próximos eventos.
- **Gestión completa**: Crea, edita, y elimina exámenes con todos sus detalles.
- **Persistencia local**: Tus datos siempre guardados, sin necesidad de servidor.
- **Modo estudiante**: Exporta calendarios en HTML autocontenido para compartir con alumnos.

**Ver más:** [`packages/planner/README.md`](./packages/planner/README.md)

---

## Características Técnicas ⚙️

### Arquitectura Monorepo
- **Workspace Management**: [pnpm workspaces](https://pnpm.io/workspaces) para gestión eficiente de dependencias.
- **Modularidad**: Cada aplicación es un package independiente con su propio ciclo de vida.
- **Shared Packages**: Utilidades y componentes comunes compartidos entre aplicaciones.
- **Configuración Centralizada**: Single source of truth para datos del curso y configuración global.

### Stack Tecnológico
- **Frontend**: React 19 + TypeScript para type-safety y rendimiento.
- **Build Tool**: Vite para desarrollo ultrarrápido y builds optimizados.
- **Package Manager**: pnpm workspaces para gestión eficiente de monorepo.
- **Styling**: TailwindCSS para diseño moderno y responsivo.
- **Animations**: Framer Motion para transiciones fluidas y atractivas.
- **UI Components**: shadcn/ui para componentes accesibles y bien diseñados.
- **Icons**: Lucide React para iconografía consistente y ligera.
- **Config System**: Configuración centralizada en `@course-dashboard/shared` para consistencia global.
- **Shared Components**: Componentes reutilizables como Footer en `@course-dashboard/shared`.

### Calidad y Accesibilidad
- **TypeScript**: Tipado estricto para minimizar errores en tiempo de desarrollo.
- **ESLint**: Linting configurado para mantener código limpio y consistente.
- **WCAG 2.1 AA**: Diseño accesible que respeta preferencias del usuario (reduced motion, temas, contrastes).
- **Contraste de Colores**: Todos los elementos cumplen con ratios de contraste WCAG 2 AA (≥ 4.5:1 para texto normal). Ver [ACCESSIBILITY-CONTRAST.md](./ACCESSIBILITY-CONTRAST.md) para detalles.
- **Responsive Design**: Optimizado para desktop, tablet y móvil.

---

## Guía para Desarrolladores 👨‍💻

¿Interesado en contribuir o adaptar esta plataforma? ¡Bienvenido!

### Requisitos Previos
- **Node.js** 18+ y **pnpm** 9+
- Familiaridad con React, TypeScript y Vite

### Primeros Pasos

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/course-dashboard.git
   cd course-dashboard
   ```

2. **Instala las dependencias:**
   ```bash
   pnpm install
   ```

3. **Inicia el servidor de desarrollo:**
   ```bash
   pnpm dev
   ```
   
   Esto iniciará el shell principal en `http://localhost:5173`

### Estructura del Monorepo

```
course-dashboard/
├── apps/
│   └── shell/              # Aplicación principal que contiene las otras apps
│       ├── src/
│       │   ├── components/
│       │   │   └── Sidebar.tsx    # Sidebar colapsable de navegación
│       │   └── App.tsx            # Shell principal
│       └── package.json
│
├── packages/
│   ├── weekly-plan/        # Aplicación de planificación semanal
│   │   ├── src/
│   │   │   ├── components/       # Componentes de la app
│   │   │   ├── contexts/         # Contextos globales
│   │   │   ├── data/             # Datos del curso
│   │   │   ├── hooks/            # Custom hooks
│   │   │   └── App.tsx
│   │   └── package.json
│   │
│   ├── planner/             # Aplicación de planificador de exámenes
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── providers/
│   │   │   └── App.tsx
│   │   └── package.json
│   │
│   └── shared/              # Utilidades y configuración compartida
│       ├── src/
│       │   ├── components/      # ⭐ Componentes reutilizables
│       │   │   └── Footer.tsx  # Footer compartido (varias variantes)
│       │   ├── config/           # ⭐ Configuración global del curso
│       │   │   ├── course.ts     # Datos del curso (nombre, institución, etc.)
│       │   │   ├── ui.ts         # Configuración de UI (animaciones, sidebar)
│       │   │   ├── theme.ts      # Configuración de temas
│       │   │   └── index.ts
│       │   ├── context/          # Contextos compartidos (ThemeContext)
│       │   └── index.ts
│       ├── FOOTER.md            # Documentación del Footer
│       └── package.json
│
├── CONFIG.md               # Documentación de configuración
├── package.json            # Configuración raíz del monorepo
└── pnpm-workspace.yaml     # Configuración de workspaces
```

### Comandos Disponibles

```bash
# Desarrollo del shell principal
pnpm dev

# Desarrollo modo solo lectura (estudiantes)
pnpm dev:shell:readonly

# Build de todas las apps
pnpm build

# Build específico para estudiantes
pnpm build:student

# Build del shell en modo solo lectura
pnpm build:shell:readonly
```

### Configuración de Versiones

El proyecto usa **overrides** de pnpm para garantizar consistencia en las versiones de React:

```json
{
  "pnpm": {
    "overrides": {
      "react": "^19.0.0",
      "react-dom": "^19.0.0",
      "@types/react": "^19.0.0",
      "@types/react-dom": "^19.0.0"
    }
  }
}
```

Si encuentras errores de tipos en VSCode, ejecuta `pnpm install` para sincronizar.

### Responsive Design y Mobile

El proyecto está optimizado para funcionar correctamente en todos los tamaños de pantalla, desde dispositivos muy pequeños (< 375px) hasta pantallas grandes de escritorio.

#### Breakpoints Personalizados

- **Mobile** (< 1030px): Interfaz colapsada, sidebar como drawer, contenido optimizado
- **Desktop** (≥ 1030px): Interfaz expandida, layouts lado a lado, máximo aprovechamiento de espacio

#### Mobile-First Implementation

- **Sidebar del Shell**: Colapsado por defecto en mobile (64px), expandible como drawer overlay
- **WeekTimeline**: Colapsa automáticamente en mobile, se expande solo cuando hay espacio (≥ 1030px)
- **Contenido Responsivo**: Padding ajustable (`px-4 sm:px-6`), ancho flexible, sin límites artificiales en mobile
- **Auto-collapse en navegación**: El sidebar se colapsa automáticamente cuando cambias de pestaña en mobile

#### Consideraciones de Layout

- El Shell reserva 64px para el Sidebar colapsado en mobile
- WeeklyPlanApp se ajusta fluidamente al espacio disponible sin overflow
- Todos los componentes usan `min-w-0` para permitir shrinking sin clipping
- El breakpoint de `useIsMobile` es **1030px** (ajustable en `packages/shared/src/hooks/useIsMobile.ts`)

### Desarrollando las Apps Individuales

Cada aplicación puede desarrollarse independientemente:

```bash
# Weekly Plan
cd packages/weekly-plan
pnpm dev

# Planner
cd packages/planner
pnpm dev

# Shell
cd apps/shell
pnpm dev
```

### Agregar una Nueva App

1. Crea el directorio en `apps/` o `packages/`
2. Inicializa con `pnpm init`
3. Agrega las dependencias necesarias
4. Importa desde el shell en `apps/shell/src/App.tsx`:

```tsx
import NewApp from '@course-dashboard/new-app';

// En tu App component
<NewApp />
```

### Sistema de Configuración Global ⚙️

El proyecto utiliza una **configuración centralizada** en `packages/shared/src/config/` que proporciona:

#### Beneficios

- ✅ **Single Source of Truth**: Los datos del curso se definen en un solo lugar
- ✅ **Consistencia**: Todas las aplicaciones muestran la misma información
- ✅ **Mantenimiento Simplificado**: Cambiar el nombre del curso o institución requiere editar un solo archivo
- ✅ **Type Safety**: Tipos compartidos garantizan consistencia entre apps
- ✅ **Fácil Adaptación**: Adapta el dashboard para diferentes cursos cambiando solo la configuración

#### Uso en las Aplicaciones

**Shell (apps/shell):**
```tsx
import { COURSE_CONFIG } from '@course-dashboard/shared';

<Sidebar
  courseName={COURSE_CONFIG.name}
  semester={COURSE_CONFIG.semester}
/>
```

**Weekly Plan:**
```ts
import { COURSE_CONFIG, UI_CONFIG } from '@course-dashboard/shared';

export const CONFIG = {
  course: {
    name: COURSE_CONFIG.name,
    institution: COURSE_CONFIG.institution,
    totalWeeks: COURSE_CONFIG.totalWeeks,
  },
  ui: UI_CONFIG,
};
```

**Planner:**
```ts
import { COURSE_CONFIG } from '@course-dashboard/shared';

const DEFAULT_CONFIG = {
  titleName: COURSE_CONFIG.apps.planner.titleName,
  semester: COURSE_CONFIG.semester,
};
```

### Personalización

#### Configuración Global del Curso

Toda la configuración del curso está centralizada en `packages/shared/src/config/`. Esto garantiza consistencia entre todas las aplicaciones.

**Estructura de Configuración:**

```typescript
// packages/shared/src/config/course.ts
export const COURSE_CONFIG = {
  name: 'Física General I',           // Nombre del curso
  institution: 'Tecnológico de Costa Rica',
  semester: 'I semestre 2026',
  totalWeeks: 16,
  apps: {
    weekly: {
      maxCurrentWeek: 16,
      githubRepository: 'https://github.com/...',
    },
    planner: {
      titleName: 'Calendario',
      subtitleName: 'Evaluaciones',
    },
  },
};
```

**Cambiar el nombre del curso:**

```typescript
// packages/shared/src/config/course.ts
export const COURSE_CONFIG = {
  name: 'Tu Curso Aquí',  // ← Cambiar aquí
  institution: 'Tu Institución',
  // ...
};
```

**Cambiar el modo oscuro por defecto:**

```typescript
// packages/shared/src/config/theme.ts
export const THEME_CONFIG = {
  defaultDarkMode: false,  // ← Cambiar aquí
  // ...
};
```

**Modificar el comportamiento del sidebar:**

```typescript
// packages/shared/src/config/ui.ts
export const UI_CONFIG = {
  sidebar: {
    defaultCollapsed: false,  // ← Cambiar aquí
  },
  // ...
};
```

Para más detalles, consulta [`CONFIG.md`](./CONFIG.md).

#### Estructura de Providers y Contextos

**WeeklyPlan** utiliza contextos anidados correctamente:

```tsx
// main.tsx - Punto de entrada
<ThemeProvider>
  <App />
</ThemeProvider>

// App.tsx - Wrapper con CourseProvider
<CourseProvider>
  <InnerApp />
</CourseProvider>

// InnerApp - Componente principal que usa hooks
const InnerApp = () => {
  const { isDarkMode } = useTheme();
  const { currentWeekId, setCurrentWeekId, ... } = useCourse();
  // ...
};
```

Esto evita duplicación de contextos y permite que WeeklyPlanApp funcione correctamente cuando está embebida en el Shell.

#### Estructura de Contenedores

**App.tsx (WeeklyPlan):**
```tsx
<div className="min-h-full">                    {/* Altura relativa al padre */}
  <main className="w-full lg:max-w-[1400px]">  {/* Ancho fluido en mobile, limitado en desktop */}
    <aside className="w-auto lg:w-72 min-w-0"> {/* Ancho flexible, permite shrinking */}
      <Sidebar />
    </aside>
    <div className="flex-1">                    {/* Crece dinámicamente */}
      <WeekContent />
    </div>
  </main>
</div>
```

**Shell App.tsx:**
```tsx
<div className="flex h-screen">
  <Sidebar />                  {/* shrink-0 z-50 en mobile, 64px fijo */}
  <main className="flex-1 min-w-0">  {/* Ocupa espacio restante, permite shrinking */}
    {/* WeeklyPlanApp o PlannerApp */}
  </main>
</div>
```

#### Hechos Importantes sobre Z-Index

- **Sidebar Shell (colapsado)**: `z-50` en mobile
- **Sidebar Shell (expandido)**: `z-[999]` en mobile (siempre visible)
- **Overlay Sidebar**: `z-[998]` (debajo del sidebar expandido)
- **WeeklyPlanApp main**: `z-10` (crea stacking context controlado)
- **WeeklyPlanApp UI components**: `z-50` (pero acotados dentro de `z-10`)

Para más detalles, consulta [`CONFIG.md`](./CONFIG.md).

#### Contenido del Curso

Edita `packages/weekly-plan/src/data/weeks.ts` para modificar el contenido semanal.

---

## Deployment 🚀

### Vercel (Recomendado)

El proyecto está preconfigurado para despliegue en **Vercel** con soporte nativo para monorepos, preview deployments y builds optimizados.

**Quick Deploy:**

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Importa tu repositorio de GitHub
3. Vercel detectará automáticamente la configuración en `vercel.json`
4. Haz clic en **Deploy**

**Características:**
- ✅ **Preview deployments** automáticos por cada PR
- ✅ **Build optimizado** con Vite
- ✅ **Soporte nativo** para pnpm workspaces
- ✅ **SPA routing** configurado automáticamente
- ✅ **Deploy en segundos** tras cada push

**Deploy via CLI:**

```bash
# Instalar Vercel CLI
pnpm add -D vercel

# Login
npx vercel login

# Deploy a preview
npx vercel

# Deploy a producción
npx vercel --prod
```

**Documentación completa:** [`docs/VERCEL_DEPLOYMENT.md`](./docs/VERCEL_DEPLOYMENT.md)

### Otros proveedores

El proyecto puede desplegarse en cualquier hosting estático (Netlify, GitHub Pages, Cloudflare Pages) con configuración manual.

---

## Contribución 🤝

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## Licencia 📄

Este proyecto está bajo la Licencia MIT.

```
MIT License

Copyright (c) 2026 Course Dashboard

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Créditos 🙏

Desarrollado con ❤️ para la comunidad educativa.

- **Weekly Plan**: Inspirado en la necesidad de mejorar la experiencia de estudiantes de cursos técnicos.
- **ExamPlanner**: Diseñado para simplificar la gestión de evaluaciones académicas.

<p align="center">
  Hecho para educadores y estudiantes que creen en el poder de la tecnología para transformar el aprendizaje.
</p>
