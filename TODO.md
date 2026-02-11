# TODO: Multi-Course Support & Dynamic Data Loading

> Este documento registra el trabajo futuro necesario para escalar Course Dashboard para soportar múltiples cursos con carga dinámica de datos en build time y configuración CI/CD.

## 🎯 Context

**Estado actual:**
- Course Dashboard está configurado para un solo curso (Física General I)
- La configuración del curso está hardcoded en `packages/shared/src/config/course.ts`
- Los datos del planner están estáticos en `packages/planner/src/data/fg1-I_2026.json`
- Los datos del weekly-plan están en TypeScript (`packages/weekly-plan/src/data/weeks.ts`)
- El build genera una versión única

**Requerimientos futuros:**
- Soportar múltiples cursos (ej: fg1-I-2026, fg2-I-2026, química, etc.)
- Carga dinámica de datos por curso en build time
- CI/CD para generar N builds automatizadas
- JSON por defecto como fallback cuando no se especifica curso
- No mantener compatibilidad con el "student build" existente

## 🎯 Objectives

1. **Escalabilidad**: El sistema debe poder soportar cualquier número de cursos sin modificaciones al código base
2. **CI/CD Ready**: Cada curso debe tener su propio build generado automáticamente
3. **Type Safety**: Mantener type checking de TypeScript con datos dinámicos
4. **Developer Experience**: Hot reload en dev mode con datos del curso seleccionado
5. **Simple API**: Cambiar de curso debe ser tan simple como una variable de entorno

## 🏗️ Proposed Architecture

### Directorio de Cursos

```
courses/
├── fg1-I-2026/
│   ├── config.json          # Configuración del curso (nombre, institución, semestre)
│   ├── planner.json         # Datos del planner (exámenes)
│   └── weeks.json           # Datos del weekly-plan (semanas)
├── fg2-I-2026/
│   ├── config.json
│   ├── planner.json
│   └── weeks.json
└── chemistry-I-2026/
    ├── config.json
    ├── planner.json
    └── weeks.json
```

### Build-Time Loading

**Uso esperado:**

```bash
# Desarrollo con curso específico
VITE_COURSE_ID=fg1-I-2026 pnpm dev

# Build para un curso específico
VITE_COURSE_ID=fg1-I-2026 pnpm build

# Build por defecto (usa fallback course)
pnpm build
```

### Vite Virtual Module

Crear un módulo virtual en `vite.config.js` que resuelve los datos del curso:

```typescript
// Virtual module: /src/data/course-data.ts
// Resuelve dinámicamente basado en VITE_COURSE_ID
```

### Shared Package Refactoring

Convertir `COURSE_CONFIG` de hardcoded a dynamic:

```typescript
// Antes (hardcoded)
export const COURSE_CONFIG = {
  name: 'Física General I',
  institution: 'Tecnológico de Costa Rica',
  // ...
};

// Después (dynamic)
export const COURSE_CONFIG = loadCourseConfig(import.meta.env.VITE_COURSE_ID);
```

## 📋 Tasks

### Phase 1: Data Structure & Foundation (High Priority)

**Objetivo:** Establecer la estructura de datos para múltiples cursos

- [ ] Crear directorio `courses/` en la raíz del proyecto
- [ ] Definir schema JSON para `config.json` (nombre, institución, semestre, apps config)
- [ ] Definir schema JSON para `planner.json` (exámenes con estructura completa)
- [ ] Definir schema JSON para `weeks.json` (semanas del weekly-plan)
- [ ] Crear curso de ejemplo `courses/fg1-I-2026/` con datos actuales migrados
- [ ] Migrar `packages/planner/src/data/fg1-I_2026.json` a `courses/fg1-I-2026/planner.json`
- [ ] Migrar `packages/weekly-plan/src/data/weeks.ts` a `courses/fg1-I-2026/weeks.json`
- [ ] Migrar `packages/shared/src/config/course.ts` a `courses/fg1-I-2026/config.json`
- [ ] Crear scripts de validación Zod para cada tipo de JSON
- [ ] Documentar estructura de datos y ejemplos en `docs/course-data-structure.md`

**Estimado tiempo:** 8-12 horas

### Phase 2: Build-Time Dynamic Loading (High Priority)

**Objetivo:** Implementar carga dinámica de datos en build time usando Vite

- [ ] Implementar Vite virtual module `/src/data/course-data.ts`
  - [ ] Leer `VITE_COURSE_ID` de las variables de entorno
  - [ ] Cargar JSON del curso seleccionado desde `courses/` directory
  - [ ] Exponer datos con tipos TypeScript adecuados
  - [ ] Implementar fallback a course por defecto cuando `VITE_COURSE_ID` no está definido
- [ ] Actualizar `packages/planner/src/hooks/useExams.ts` para usar virtual module
- [ ] Actualizar `packages/planner/src/hooks/useAppConfig.ts` para usar virtual module
- [ ] Actualizar `packages/weekly-plan/src/data/weeks.ts` para usar virtual module
- [ ] Actualizar `packages/shared/src/config/course.ts` para cargar config dinámica
- [ ] Probar hot reload en dev mode con diferentes cursos
- [ ] Probar build con diferentes cursos
- [ ] Probar build sin `VITE_COURSE_ID` (fallback behavior)
- [ ] Eliminar `scripts/inject_data.js` (ya no se necesita student build)

**Estimado tiempo:** 12-16 horas

### Phase 3: Shared Package Refactoring (High Priority)

**Objetivo:** Refactorizar shared package para soportar configs dinámicas

- [ ] Crear factory function `loadCourseConfig(courseId: string)` en shared
- [ ] Actualizar tipo `COURSE_CONFIG` para ser dinámico
- [ ] Actualizar todos los imports de `COURSE_CONFIG` en apps para usar la nueva API
- [ ] Asegurar type-safety para configs de diferentes cursos
- [ ] Manejar errores cuando el course ID no existe
- [ ] Añadir logging para debugging de config loading
- [ ] Actualizar `packages/shared/src/config/index.ts` con nuevas exportaciones
- [ ] Documentar nueva API de config en `CONFIG.md`
- [ ] Actualizar `README.md` con ejemplos de uso de nuevos cursos

**Estimado tiempo:** 6-8 horas

### Phase 4: CI/CD & Automation (Medium Priority)

**Objetivo:** Configurar CI/CD para builds automatizados por curso

- [ ] Crear directorio `.github/workflows/` si no existe
- [ ] Diseñar estrategia de CI/CD:
  - [ ] Opción A: Un workflow que genera builds para todos los cursos en `courses/`
  - [ ] Opción B: Un workflow parametrizado que se ejecuta por curso
  - [ ] Opción C: Matrix build para generar múltiples cursos en paralelo
- [ ] Crear workflow YAML para CI (GitHub Actions u otro):
  - [ ] Checkout del repo
  - [ ] Setup de Node.js y pnpm
  - [ ] Install dependencies
  - [ ] Loop por cada curso en `courses/`
  - [ ] Run build con `VITE_COURSE_ID=<course>`
  - [ ] Upload artifacts por curso
- [ ] Configurar deployment:
  - [ ] Opción A: Deploy a subpaths (`domain.com/courses/fg1-I-2026/`)
  - [ ] Opción B: Deploy a subdomains (`fg1.domain.com`, `fg2.domain.com`)
  - [ ] Opción C: Deploy a repos separados
- [ ] Crear script `scripts/build-all-courses.js` para builds locales en batch
- [ ] Configurar cache de builds para optimizar CI
- [ ] Añadir tests de integración para builds de cursos
- [ ] Documentar configuración de CI/CD en `docs/cicd-setup.md`

**Estimado tiempo:** 16-20 horas

### Phase 5: Documentation & Tooling (Low Priority)

**Objetivo:** Mejorar DX y documentación para soportar múltiples cursos

- [ ] Crear script `scripts/create-course.js` para scaffolding de nuevos cursos
  - [ ] CLI para ingresar nombre, institución, semestre
  - [ ] Crear directorio del curso en `courses/`
  - [ ] Generar JSONs base (config, planner, weeks)
  - [ ] Validar estructura generada
- [ ] Crear plantilla de course en `templates/course-template/`
- [ ] Documentar proceso de agregar un nuevo curso:
  - [ ] Crear directorio en `courses/`
  - [ ] Crear/configurar JSONs
  - [ ] Ejecutar build
  - [ ] Validar resultado
- [ ] Actualizar `README.md` con sección de "Multi-Course Setup"
- [ ] Crear `docs/multi-course-guide.md` con guía completa
- [ ] Añadir ejemplos de JSONs en `docs/examples/`
- [ ] Crear tests de validación de JSONs
- [ ] Añadir pre-commit hooks para validar JSONs

**Estimado tiempo:** 8-12 horas

## ❓ Open Questions

### Questions pendientes de respuesta:

1. **Estructura de datos:** ¿El weekly-plan debe migrar completamente a JSON o mantener TypeScript por su complejidad (iconos, componentes React)?

2. **Diferencias entre cursos:** ¿Cómo se gestionarán las diferencias en la estructura de datos entre cursos? ¿Todos los cursos deben tener la misma estructura o puede haber variaciones?

3. **Estrategia de deployment:** ¿Cuál es la estrategia preferida?
   - Subpaths: `domain.com/courses/fg1-I-2026/`
   - Subdomains: `fg1.domain.com`, `fg2.domain.com`
   - Repos separados

4. **Versionado de datos:** ¿Se requiere un sistema de versionado para los datos de cursos? ¿Cómo se gestionarán actualizaciones?

5. **Modo solo lectura:** ¿Cómo se manejará el modo de solo lectura por curso? ¿Cada course tiene su propia configuración de modo?

6. **Fallback course:** ¿Cuál debe ser el course por defecto cuando no se especifica `VITE_COURSE_ID`? ¿Se crea un "default-course" o se usa el primero en `courses/`?

7. **CI/CD Trigger:** ¿Cuándo se debe ejecutar el CI/CD?
   - On push a main
   - On PR
   - Manual dispatch
   - Cron job

8. **Artifacts:** ¿Cómo se deben nombrar los artifacts de build por curso? ¿Se necesita una convención de nombres?

## 🔗 Referencias

- [Vite Virtual Modules](https://vitejs.dev/guide/api-plugin.html#virtual-modules-convention)
- [Vite `define` config](https://vitejs.dev/config/shared-options.html#define)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Project README](./README.md)
- [Project CONFIG](./CONFIG.md)

## 📝 Notas

**Decisiones pendientes:**
- [ ] Definir estrategia de CI/CD (workflow parametrizado vs matrix vs batch)
- [ ] Definir estrategia de deployment (subpaths vs subdomains)
- [ ] Definir course por defecto
- [ ] Definir migración de weekly-plan (JSON vs TypeScript)

**Consideraciones técnicas:**
- El virtual module de Vite permite type-safety y hot reload, que son ventajas sobre usar `define`
- El fallback a JSON por defecto es importante para no romper builds existentes
- La validación de schemas con Zod asegura integridad de datos entre cursos
- El cache en CI/CD es crítico para tiempos de build con múltiples cursos

---

**Creado:** 2026-02-11
**Última actualización:** 2026-02-11
