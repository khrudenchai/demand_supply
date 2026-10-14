import { useState } from 'react';
import { ActiveTab, QuizResult } from './types';
import { Navbar } from './components/Navbar';
import { OverviewHero } from './components/OverviewHero';
import { DemandSection } from './components/DemandSection';
import { SupplySection } from './components/SupplySection';
import { MarketEquilibriumSimulator } from './components/MarketEquilibriumSimulator';
import { ScenarioLab } from './components/ScenarioLab';
import { QuizSection } from './components/QuizSection';
import { CertificateReport } from './components/CertificateReport';
import { CURRICULUM_INDICATOR } from './data/lessonContent';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [latestResult, setLatestResult] = useState<QuizResult | null>(null);

  const handleViewCertificate = (result: QuizResult) => {
    setLatestResult(result);
    setActiveTab('certificate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-['Prompt',sans-serif]">
      {/* Top Navigation Bar */}
      <div className="print:hidden">
        <Navbar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* Main Learning Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'overview' && (
          <OverviewHero onNavigate={handleTabChange} />
        )}

        {activeTab === 'demand' && (
          <DemandSection />
        )}

        {activeTab === 'supply' && (
          <SupplySection />
        )}

        {activeTab === 'equilibrium' && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <div className="text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1">
                หัวข้อที่ 3 · การทำงานของตลาด
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                ดุลยภาพของตลาด และการปรับตัวของกลไกราคา
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                เมื่อผู้ซื้อ (อุปสงค์) และผู้ขาย (อุปทาน) มาพบกันในตลาด ระดับราคาจะถูกกำหนดโดยจุดที่ความต้องการซื้อเท่ากับปริมาณเสนอขายพอดี
              </p>
            </div>
            <MarketEquilibriumSimulator />
          </div>
        )}

        {activeTab === 'scenarios' && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <div className="text-xs font-semibold text-violet-700 uppercase tracking-wider mb-1">
                เชื่อมโยงสู่ชีวิตจริง
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                กรณีศึกษาจำลอง: วิเคราะห์เหตุการณ์จริงรอบตัว
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                ทดลองคิดและตอบคำถามสถานการณ์ข่าวและเศรษฐกิจ เพื่อประยุกต์ใช้ความรู้ตัวชี้วัด {CURRICULUM_INDICATOR.standardCode} อย่างคล่องแคล่ว
              </p>
            </div>
            <ScenarioLab />
          </div>
        )}

        {activeTab === 'quiz' && (
          <QuizSection onViewCertificate={handleViewCertificate} />
        )}

        {activeTab === 'certificate' && latestResult && (
          <CertificateReport
            result={latestResult}
            onBackToLesson={() => handleTabChange('overview')}
            onRetakeQuiz={() => handleTabChange('quiz')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="print:hidden border-t border-slate-200 bg-white mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-semibold text-slate-800">
              EcoPlay สื่อการสอนแบบอินเทอร์แอคทีฟ วิชาสังคมศึกษา ระดับ ม.1
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              หลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน · ตัวชี้วัด {CURRICULUM_INDICATOR.standardCode} &ldquo;{CURRICULUM_INDICATOR.standardText}&rdquo;
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-600">
            <button
              type="button"
              onClick={() => handleTabChange('overview')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              หน้าแรก
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => handleTabChange('demand')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              อุปสงค์
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => handleTabChange('supply')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              อุปทาน
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => handleTabChange('quiz')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              แบบทดสอบ
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
