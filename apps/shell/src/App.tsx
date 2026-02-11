import { useState } from 'react';
import WeeklyPlanApp from '@course-dashboard/weekly-plan';
import PlannerApp from '@course-dashboard/planner';
import { Sidebar } from './components/Sidebar';
import { AnimatePresence, motion } from 'framer-motion';
import { COURSE_CONFIG } from '@course-dashboard/shared';

const App = () => {
  const [activeTab, setActiveTab] = useState<'weekly' | 'planner'>('weekly');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-200 overflow-hidden font-sans transition-colors duration-300">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        courseName={COURSE_CONFIG.name}
        semester={COURSE_CONFIG.semester}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative bg-slate-100 dark:bg-slate-50/5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 pointer-events-none" />

        <div className="flex-1 overflow-auto scrollbar-hide relative z-10">
          <AnimatePresence mode="wait">
            {activeTab === 'weekly' && (
              <motion.div
                key="weekly"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="min-h-full"
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
                className="min-h-full"
              >
                <PlannerApp />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default App;
