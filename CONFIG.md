# Global Configuration

La configuración centralizada del Course Dashboard se encuentra en `packages/shared/src/config/`. Esta configuración es compartida por todas las aplicaciones del monorepo.

## Estructura

```
packages/shared/src/config/
├── course.ts     # Datos del curso y configuración de apps hijas
├── ui.ts         # Configuración de animaciones y breakpoints
├── theme.ts      # Configuración de temas (claro/oscuro)
└── index.ts      # Exportaciones
```

## course.ts

Contiene la información del curso y la configuración específica de cada aplicación hija.

```typescript
export const COURSE_CONFIG = {
  name: 'Física General I',
  institution: 'Tecnológico de Costa Rica',
  semester: 'I semestre 2026',
  totalWeeks: 16,
  apps: {
    weekly: {
      maxCurrentWeek: 16,
      githubRepository: 'https://github.com/glacy/plan-semanal-fg1',
    },
    planner: {
      titleName: 'Calendario',
      subtitleName: 'Evaluaciones',
    },
  },
};

export const FOOTER_CONFIG = {
  text: 'Tecnológico de Costa Rica',
};
```

## ui.ts

Configuración de la interfaz de usuario.

```typescript
export const UI_CONFIG = {
  animations: {
    transition: 0.3,
    sectionEntrance: 0.4,
    sectionDelay: 0.1,
  },
  sidebar: {
    defaultCollapsed: true,
  },
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
};
```

## theme.ts

Configuración de temas y colores.

```typescript
export const THEME_CONFIG = {
  defaultDarkMode: true,
  colors: {
    dark: {
      bg: '#0b0f19',
      surface: '#161d2a',
      border: 'white/5',
      text: {
        primary: 'slate-200',
        secondary: 'slate-400',
        tertiary: 'slate-600',
      },
    },
    light: {
      bg: 'gray-50',
      surface: 'white',
      border: 'gray-200',
      text: {
        primary: 'slate-800',
        secondary: 'slate-600',
        tertiary: 'slate-500',
      },
    },
  },
};
```

## Uso en las Aplicaciones

### Shell (apps/shell)

```tsx
import { COURSE_CONFIG } from '@course-dashboard/shared';

const App = () => {
  return (
    <Sidebar
      courseName={COURSE_CONFIG.name}
      semester={COURSE_CONFIG.semester}
      // ...
    />
  );
};
```

### Weekly Plan (packages/weekly-plan)

```ts
import { COURSE_CONFIG, UI_CONFIG, THEME_CONFIG } from '@course-dashboard/shared';

export const CONFIG = {
  course: {
    name: COURSE_CONFIG.name,
    institution: COURSE_CONFIG.institution,
    totalWeeks: COURSE_CONFIG.totalWeeks,
    maxCurrentWeek: COURSE_CONFIG.apps.weekly.maxCurrentWeek,
  },
  ui: UI_CONFIG,
  theme: THEME_CONFIG,
  // ...
};
```

### Planner (packages/planner)

```ts
import { COURSE_CONFIG, FOOTER_CONFIG } from '@course-dashboard/shared';

const DEFAULT_CONFIG: AppConfig = {
  titleName: COURSE_CONFIG.apps.planner.titleName,
  subtitleName: COURSE_CONFIG.apps.planner.subtitleName,
  semester: COURSE_CONFIG.semester,
  footerText: FOOTER_CONFIG.text,
};
```

## Cambiar Configuración

Para cambiar la configuración del curso, simplemente edita los archivos en `packages/shared/src/config/`. Los cambios se reflejarán automáticamente en todas las aplicaciones.

### Ejemplo: Cambiar nombre del curso

```ts
// packages/shared/src/config/course.ts
export const COURSE_CONFIG = {
  name: 'Química Orgánica', // ← Cambiar aquí
  institution: 'Universidad XYZ',
  // ...
};
```

### Ejemplo: Desactivar modo oscuro por defecto

```ts
// packages/shared/src/config/theme.ts
export const THEME_CONFIG = {
  defaultDarkMode: false, // ← Cambiar aquí
  // ...
};
```

## Variables de Entorno (Futuro)

La configuración puede ser extendida para soportar overrides desde variables de entorno:

```ts
// packages/shared/src/config/course.ts
const BASE_CONFIG = {
  name: 'Física General I',
  institution: 'Tecnológico de Costa Rica',
};

export const COURSE_CONFIG = {
  ...BASE_CONFIG,
  name: import.meta.env.VITE_COURSE_NAME || BASE_CONFIG.name,
  institution: import.meta.env.VITE_COURSE_INSTITUTION || BASE_CONFIG.institution,
};
```

Luego se puede ejecutar:

```bash
VITE_COURSE_NAME="Mi Curso" pnpm dev
```
