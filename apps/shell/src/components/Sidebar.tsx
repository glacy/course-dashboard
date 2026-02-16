import React from 'react';
import { Atom, LayoutDashboard, CalendarDays, BookOpen, Sun, Moon, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { useTheme, useIsMobile } from '@course-dashboard/shared';

interface SidebarProps {
    activeTab: 'weekly' | 'planner';
    setActiveTab: (tab: 'weekly' | 'planner') => void;
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
    courseName: string;
    semester: string;
    isMobileDrawer?: boolean;
}

// ============ Componentes Atómicos ============

const MobileOverlay = ({ onClose }: { onClose: () => void }) => (
    <AnimatePresence>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[998]"
            onClick={onClose}
            aria-hidden="true"
        />
    </AnimatePresence>
);

const SidebarToggle = ({ isCollapsed, onToggle }: { isCollapsed: boolean; onToggle: () => void }) => (
    <motion.button
        type="button"
        onClick={onToggle}
        className={clsx(
            "absolute top-4 z-20 flex items-center justify-center rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0b0f19]",
            isCollapsed ? "left-3 right-3" : "right-3",
            "bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300"
        )}
        aria-label={isCollapsed ? "Expandir barra lateral" : "Colapsar barra lateral"}
        aria-expanded={!isCollapsed}
        aria-controls="sidebar-content"
        title={isCollapsed ? "Expandir barra lateral" : "Colapsar barra lateral"}
    >
        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
    </motion.button>
);

const BackgroundDecoration = ({ isMobile, isCollapsed }: { isMobile: boolean; isCollapsed: boolean }) => (
    <motion.div
        initial={false}
        animate={{ opacity: isMobile && isCollapsed ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
    >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[40%] bg-blue-500/5 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[30%] bg-indigo-500/5 rounded-full blur-3xl opacity-50" />
        </div>
    </motion.div>
);

const SidebarHeader = ({ courseName, semester, isCollapsed }: { courseName: string; semester: string; isCollapsed: boolean }) => (
    <motion.div
        initial={false}
        animate={{ opacity: isCollapsed ? 0 : 1, marginBottom: isCollapsed ? 0 : 40 }}
        transition={{ duration: 0.15 }}
        className="flex items-center gap-3"
    >
        <div className="relative shrink-0">
            <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20" aria-hidden="true" />
            <div className="relative p-2.5 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl border border-white/10">
                <Atom className="text-blue-400" size={24} aria-hidden="true" />
            </div>
        </div>
        <div className="overflow-hidden">
            <h1 className="font-bold text-xl text-slate-800 dark:text-white tracking-tight whitespace-nowrap">{courseName}</h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium tracking-wide uppercase mt-0.5 whitespace-nowrap">{semester}</p>
        </div>
    </motion.div>
);

const NavigationSection = ({ isCollapsed, activeTab, setActiveTab }: { isCollapsed: boolean; activeTab: 'weekly' | 'planner'; setActiveTab: (tab: 'weekly' | 'planner') => void }) => (
    <div className={clsx(isCollapsed ? "flex flex-col gap-2 items-center" : "space-y-2")}>
        {!isCollapsed && (
            <div className="px-4 pb-2 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Información
            </div>
        )}

        <MenuItem
            icon={LayoutDashboard}
            label="Detalle semanal"
            isActive={activeTab === 'weekly'}
            onClick={() => setActiveTab('weekly')}
            isCollapsed={isCollapsed}
        />

        <MenuItem
            icon={CalendarDays}
            label="Evaluaciones"
            isActive={activeTab === 'planner'}
            onClick={() => setActiveTab('planner')}
            isCollapsed={isCollapsed}
        />
    </div>
);

const MenuItem = ({
    icon: Icon,
    label,
    isActive,
    onClick,
    isCollapsed
}: {
    icon: any;
    label: string;
    isActive: boolean;
    onClick: () => void;
    isCollapsed: boolean
}) => {
    const prefersReducedMotion = useReducedMotion();
    const animationsEnabled = !isCollapsed && !prefersReducedMotion;

    return (
        <motion.button
            type="button"
            onClick={onClick}
            className={clsx(
                "relative overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0b0f19]",
                "transition-all duration-200 group",
                isCollapsed
                    ? "w-12 h-12 flex items-center justify-center rounded-xl"
                    : "w-full flex items-center gap-3 pl-4 pr-10 py-3 rounded-xl",
                isActive
                    ? isCollapsed
                        ? "bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-white shadow-lg shadow-blue-500/20"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5"
            )}
            aria-current={isActive ? 'page' : undefined}
            aria-label={isCollapsed ? label : undefined}
            title={isCollapsed ? label : undefined}
            whileHover={animationsEnabled ? { x: 4 } : undefined}
            whileTap={!prefersReducedMotion ? { scale: 0.98 } : undefined}
        >
            {/* Active background animation */}
            {isActive && animationsEnabled && (
                <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 z-0"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}

            {/* Icon and label */}
            <span className="relative z-10 flex items-center gap-3">
                <Icon
                    size={20}
                    className={clsx(
                        isActive && isCollapsed
                            ? "text-blue-600 dark:text-blue-400"
                            : isActive
                                ? "text-white"
                                : "text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200"
                    )}
                    aria-hidden="true"
                />
                {!isCollapsed && <span className="font-medium text-sm">{label}</span>}
            </span>

            {/* Active indicator dot */}
            {isActive && !isCollapsed && animationsEnabled && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute right-4 w-1.5 h-1.5 rounded-full bg-white z-10"
                    aria-hidden="true"
                />
            )}
        </motion.button>
    );
};

const CourseProgramLink = ({ isCollapsed }: { isCollapsed: boolean }) => (
    <div className="mt-auto space-y-2 mb-2">
        {isCollapsed ? (
            <div className="flex justify-center">
                <a
                    href="programa-del-curso.pdf"
                    className="w-12 h-12 flex items-center justify-center rounded-xl text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0b0f19]"
                    aria-label="Ver programa del curso (PDF)"
                    title="Programa del curso"
                >
                    <BookOpen size={20} aria-hidden="true" />
                </a>
            </div>
        ) : (
            <div className="rounded-2xl bg-slate-50 dark:bg-transparent dark:bg-gradient-to-b dark:from-white/5 dark:to-transparent border border-slate-200 dark:border-white/5 mx-4 text-center">
                <a
                    href="programa-del-curso.pdf"
                    className="inline-flex items-center justify-center gap-2 w-full text-sm font-medium text-slate-700 dark:text-white bg-white dark:bg-white/10 hover:bg-blue-50 dark:hover:bg-white/20 active:bg-blue-100 dark:active:bg-white/30 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0b0f19]"
                    aria-label="Ver programa del curso (PDF)"
                >
                    <BookOpen size={18} aria-hidden="true" />
                    <span>Programa del curso</span>
                </a>
            </div>
        )}
    </div>
);

const ThemeToggleButton = ({ isCollapsed, theme, onToggle }: { isCollapsed: boolean; theme: string; onToggle: () => void }) => (
    <div className={clsx(isCollapsed ? "flex justify-center" : "border-t border-slate-200 dark:border-white/5 p-4 space-y-1")}>
        <button
            type="button"
            onClick={onToggle}
            className={clsx(
                "flex items-center gap-3 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0b0f19]",
                isCollapsed ? "w-12 h-12 justify-center" : "w-full px-4 py-3"
            )}
            aria-label={isCollapsed ? (theme === 'dark' ? "Cambiar a modo claro" : "Cambiar a modo oscuro") : undefined}
            title={isCollapsed ? (theme === 'dark' ? 'Modo claro' : 'Modo oscuro') : undefined}
        >
            {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
            {!isCollapsed && <span>{theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}</span>}
        </button>
    </div>
);

const SidebarContent = ({ isCollapsed, courseName, semester, activeTab, setActiveTab, theme, toggleTheme }: {
    isCollapsed: boolean;
    courseName: string;
    semester: string;
    activeTab: 'weekly' | 'planner';
    setActiveTab: (tab: 'weekly' | 'planner') => void;
    theme: string;
    toggleTheme: () => void
}) => {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            initial={false}
            animate={{ padding: isCollapsed ? "64px 8px 8px 8px" : "32px 8px 16px 32px" }}
            transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
            className="relative z-10 flex flex-col h-full"
            id="sidebar-content"
        >
            {/* Header del sidebar */}
            <SidebarHeader courseName={courseName} semester={semester} isCollapsed={isCollapsed} />

            {/* Navegación principal */}
            <NavigationSection isCollapsed={isCollapsed} activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Sección inferior: enlace del curso y toggle de tema */}
            <CourseProgramLink isCollapsed={isCollapsed} />
            <ThemeToggleButton isCollapsed={isCollapsed} theme={theme} onToggle={toggleTheme} />
        </motion.div>
    );
};

// ============ Componente Principal ============

export const Sidebar: React.FC<SidebarProps> = ({
    activeTab,
    setActiveTab,
    isCollapsed,
    setIsCollapsed,
    courseName,
    semester,
    isMobileDrawer = false
}) => {
    const { theme, toggleTheme } = useTheme();
    const prefersReducedMotion = useReducedMotion();
    const isMobile = useIsMobile();

    const handleToggle = () => setIsCollapsed(!isCollapsed);
    const handleOverlayClick = () => setIsCollapsed(true);

    // En mobile, siempre actúa como drawer con positioning fijo
    const useFixedPositioning = isMobile || isMobileDrawer;

    return (
        <>
            {/* Overlay oscuro solo en mobile cuando está expandido */}
            {useFixedPositioning && !isCollapsed && (
                <MobileOverlay onClose={handleOverlayClick} />
            )}

            {/* Sidebar principal */}
            <motion.aside
                layout={false}
                initial={false}
                animate={{
                    width: isMobileDrawer
                        ? (isCollapsed ? 64 : '100vw')
                        : (isCollapsed ? 64 : 288),
                }}
                transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
                className={clsx(
                    "bg-white dark:bg-[#0b0f19] border-r border-slate-200 dark:border-white/5 flex flex-col h-full relative transition-colors duration-300",
                    useFixedPositioning && !isCollapsed
                        ? "absolute inset-y-0 left-0 z-[999] overflow-visible"
                        : useFixedPositioning && isCollapsed
                            ? "shrink-0 z-50 overflow-hidden"
                            : "shrink-0 z-40 overflow-hidden"
                )}
                aria-label="Barra lateral de navegación"
            >
                {/* Botón toggle para expandir/colapsar */}
                <SidebarToggle isCollapsed={isCollapsed} onToggle={handleToggle} />

                {/* Decoración de fondo con gradientes */}
                <BackgroundDecoration isMobile={isMobile} isCollapsed={isCollapsed} />

                {/* Contenido del sidebar */}
                <SidebarContent
                    isCollapsed={isCollapsed}
                    courseName={courseName}
                    semester={semester}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    theme={theme}
                    toggleTheme={toggleTheme}
                />
            </motion.aside>
        </>
    );
};
