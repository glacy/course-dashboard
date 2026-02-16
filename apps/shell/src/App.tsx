import { useState, useEffect } from 'react';
import WeeklyPlanApp from '@course-dashboard/weekly-plan';
import PlannerApp from '@course-dashboard/planner';
import { Sidebar } from './components/Sidebar';
import { AnimatePresence, motion } from 'framer-motion';
import { COURSE_CONFIG, useIsMobile, Footer } from '@course-dashboard/shared';
import { Analytics } from '@vercel/analytics/react';

const App = () => {
  const [activeTab, setActiveTab] = useState<'weekly' | 'planner'>('weekly');
  const isMobile = useIsMobile();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(isMobile);

  useEffect(() => {
    // Mantener el sidebar colapsado en mobile
    setIsSidebarCollapsed(isMobile);
  }, [isMobile]);

  useEffect(() => {
    // Colapsar sidebar al cambiar de tab en mobile
    if (isMobile) {
      setIsSidebarCollapsed(true);
    }
  }, [activeTab, isMobile]);

  const sidebarProps = {
    activeTab,
    setActiveTab,
    isCollapsed: isSidebarCollapsed,
    setIsCollapsed: setIsSidebarCollapsed,
    courseName: COURSE_CONFIG.name,
    semester: COURSE_CONFIG.semester,
    isMobileDrawer: isMobile,
  };

  return (
    <>
      {/* Contenedor principal */}
      <div className="flex h-[100dvh] bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-200 overflow-hidden font-sans transition-colors duration-300">
        {/* Sidebar - siempre presente, responsivo internamente */}
        <Sidebar {...sidebarProps} />
        {/* Main Content Area */}
        <main className="flex flex-col flex-1 relative bg-slate-100 dark:bg-slate-50/5 min-w-0 h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 pointer-events-none" />

          <div className="flex-1 overflow-auto scrollbar-hide relative z-0 flex flex-col">
            <AnimatePresence mode="wait">
              {activeTab === 'weekly' && (
                <motion.div
                  key="weekly"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 min-h-0"
                >
                  <WeeklyPlanApp />
                </motion.div>
              )}
              {activeTab === 'planner' && (
                <motion.div
                  key="planner"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 min-h-0"
                >
                  <PlannerApp />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Shared Footer */}
            <Footer
              courseName={COURSE_CONFIG.name}
              institution={COURSE_CONFIG.institution}
              showAnalytics={<Analytics />}
              variant="minimal"
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
