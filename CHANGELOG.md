# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Sidebar responsive en móvil (shell) - Overlay sobre el contenido en lugar de empujar el layout
- Botón de menú hamburguesa en móvil para el sidebar del shell
- Hook `useIsMobile` para detección de dispositivos móviles

### Fixed

- **Accesibilidad**: Corregidos atributos `role` incorrectos en enlaces y breadcrumbs
- **Contraste (WCAG 2 AA)**: Mejorado contraste de colores en toda la aplicación
  - Sidebar del shell: Textos pequeños mejorados en modo oscuro y claro
  - WeekItem: Estados de semanas (bloqueado, futuro, completado) ahora legibles
  - WeekNavigation: Navegación y contadores mejorados
  - CreditsDialog: Descripciones, badges y footer accesibles
  - StatusBadge: Estados de unidades optimizados
  - WeekTimeline: Iconos y badge de conteo mejorados
  - WeekContent: Mensajes de estado legibles
  - ContentList: Numeración de contenidos accesible
  - useTheme: Botones predeterminados mejorados

### Changed

- **Breaking**: Modo oscuro ahora usa colores más claros para mejor contraste
- **Breaking**: Modo claro ahora usa colores más oscuros para mejor contraste

---

## [0.1.0] - 2025-02-10

### Added
- Initial release of Course Dashboard
- Weekly Plan application
- Exam Planner application
- Shell application with integrated navigation
- Theme switching (light/dark mode)
- Responsive design for all screen sizes
- WCAG 2.1 AA accessibility standards

### Features
- Week-by-week academic content navigation
- Exam tracking and management
- Course syllabus integration
- Mobile-first responsive design
- Keyboard navigation support
- Screen reader optimization
- Reduced motion support

---

## Notas de Versión

### [WCAG 2.1 AA Compliance]
Todos los cambios de contraste de colores en [Unreleased] han sido validados para cumplir con:

- **Criterio 1.4.3**: Contraste (Mínimo) - Nivel AA
- **Texto normal**: Contraste ≥ 4.5:1
- **Texto grande**: Contraste ≥ 3:1
- **Componentes gráficos**: Contraste ≥ 3:1

Para detalles completos, ver [ACCESSIBILITY-CONTRAST.md](./ACCESSIBILITY-CONTRAST.md)

### [Mobile Responsiveness]
El sidebar del shell ahora tiene comportamiento optimizado en móviles:

- **< 768px (Móvil)**: Sidebar como overlay fijo sobre el contenido
- **≥ 768px (Escritorio)**: Sidebar en el flujo del documento

Vea documentación en `apps/shell/src/components/Sidebar.tsx` para implementación.

---

## Roadmap

### Próximas Versiones

#### [0.2.0] - Planeado
- [ ] Modo de alto contraste
- [ ] Ajuste de tamaño de fuente
- [ ] Exportación de cronograma
- [ ] Notificaciones de evaluaciones
- [ ] Integración con calendario (Google Calendar, Outlook)

#### [0.3.0] - Planeado
- [ ] Modo colaborativo (comentarios en semanas)
- [ ] Progreso individual de estudiantes
- [ ] Dashboard analítico para docentes
- [ ] Sincronización offline
- [ ] PWA (Progressive Web App)

---

## Reportar Issues

¿Encontraste un bug o tienes una sugerencia? Por favor:

1. Busca en [GitHub Issues](https://github.com/glacy/course-dashboard/issues)
2. Si no existe, crea un [nuevo issue](https://github.com/glacy/course-dashboard/issues/new)
3. Incluye:
   - Versión del navegador
   - Sistema operativo
   - Pasos para reproducir
   - Comportamiento esperado vs real
   - Capturas de pantalla si aplica

---

## Contribución

Para contribuir al proyecto, por favor revisa:

- [Guía para Desarrolladores](./README.md#guía-para-desarrolladores-)
- [Código de Conducta](./CODE_OF_CONDUCT.md)
- [Licencia](./LICENSE)

---

## Créditos

Desarrollado y mantenido por:

- **Cátedra de Física General** - Universidad
- **Equipo de desarrollo** - Course Dashboard

Ver [ACCESSIBILITY-CONTRAST.md](./ACCESSIBILITY-CONTRAST.md) para detalles sobre mejoras de accesibilidad.
