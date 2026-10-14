import React from 'react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => onTabChange('overview')}
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-amber-700 transition-colors cursor-pointer text-left"
        >
          EcoPlay ม.1: อุปสงค์ & อุปทาน
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            type="button"
            onClick={() => onTabChange('overview')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'overview'
                ? 'text-amber-700 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            ภาพรวมตัวชี้วัด
          </button>

          <button
            type="button"
            onClick={() => onTabChange('demand')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'demand'
                ? 'text-amber-700 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            1. อุปสงค์ (Demand)
          </button>

          <button
            type="button"
            onClick={() => onTabChange('supply')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'supply'
                ? 'text-emerald-700 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            2. อุปทาน (Supply)
          </button>

          <button
            type="button"
            onClick={() => onTabChange('equilibrium')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'equilibrium'
                ? 'text-sky-700 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            3. ดุลยภาพตลาด
          </button>

          <button
            type="button"
            onClick={() => onTabChange('scenarios')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'scenarios'
                ? 'text-violet-700 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            กรณีศึกษาจำลอง
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onTabChange('quiz')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            ทำแบบทดสอบ 10 ข้อ
          </button>
        </div>
      </div>
    </header>
  );
};
