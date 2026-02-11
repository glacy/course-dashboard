import React, { useState, useEffect } from 'react';
import { weeksData } from '../data/weeks';
import { WeekTimeline } from './WeekTimeline';
import { AnimatePresence } from 'motion/react';

interface SidebarProps {
  currentWeek: number;
  onSelectWeek: (week: number) => void;
  totalWeeks: number;
  maxCurrentWeek: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentWeek, onSelectWeek, totalWeeks, maxCurrentWeek }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelect = (week: number) => {
    if (week <= maxCurrentWeek) {
      onSelectWeek(week);
    }
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      <AnimatePresence>
        <WeekTimeline
          currentWeek={currentWeek}
          totalWeeks={totalWeeks}
          maxCurrentWeek={maxCurrentWeek}
          isOpen={isOpen}
          isDesktop={isDesktop}
          weeksData={weeksData}
          onSelect={handleSelect}
          onToggle={() => setIsOpen(!isOpen)}
        />
      </AnimatePresence>
    </div>
  );
};
