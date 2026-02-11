import { useState, useEffect } from 'react';
import type { AppConfig } from '../types';
import plannerData from '../data/fg1-I_2026.json';

const DEFAULT_CONFIG: AppConfig = {
    titleName: plannerData.config.titleName,
    subtitleName: plannerData.config.subtitleName,
    semester: plannerData.config.semester,
    footerText: plannerData.config.footerText
};

export const useAppConfig = () => {
    const [config, setConfig] = useState<AppConfig>(() => {
        // 1. Check for Student Build injection
        if (typeof window !== 'undefined' && (window as any).PLANNER_CONFIG) {
            return (window as any).PLANNER_CONFIG;
        }

        // 2. Check localStorage
        const saved = localStorage.getItem('app_config');
        if (saved) {
            try {
                return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
            } catch (e) {
                console.error('Error parsing app config:', e);
            }
        }

        return DEFAULT_CONFIG;
    });

    useEffect(() => {
        if (typeof window !== 'undefined' && !(window as any).PLANNER_CONFIG) {
            localStorage.setItem('app_config', JSON.stringify(config));
        }
    }, [config]);

    const updateConfig = (newConfig: Partial<AppConfig>) => {
        setConfig(prev => ({ ...prev, ...newConfig }));
    };

    return { config, updateConfig, defaultConfig: DEFAULT_CONFIG };
};
