import React, { useState } from 'react';
import { SCENARIO_CHALLENGES, ScenarioChallenge } from '../data/lessonContent';
import { AudioPlayerButton } from './AudioPlayerButton';
import { HelpCircle, ChevronRight, CheckCircle2, Lightbulb } from 'lucide-react';

export const ScenarioLab: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioChallenge>(SCENARIO_CHALLENGES[0]);
  const [revealed, setRevealed] = useState<boolean>(false);

  const handleSelect = (scenario: ScenarioChallenge) => {
    setSelectedScenario(scenario);
    setRevealed(false);
  };

  const narrationText = `สถานการณ์: ${selectedScenario.situation} คำถาม: ${selectedScenario.question} คำเฉลยคือ: ${selectedScenario.correctAnswer} เนื่องจาก ${selectedScenario.explanation}`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 bg-linear-to-r from-violet-50/50 via-white to-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-violet-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4" />
            <span>ห้องทดลองเชื่อมโยงชีวิตจริง: วิเคราะห์ปัจจัยกำหนด</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            สถานการณ์จำลอง: ทายใจตลาดตามหลักเศรษฐศาสตร์
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            ฝึกระบุปัจจัยที่มีอิทธิพลต่อการเปลี่ยนแปลงของอุปสงค์และอุปทานในชีวิตประจำวัน
          </p>
        </div>
        <AudioPlayerButton textToSpeak={narrationText} label="ฟังบรรยายสถานการณ์นี้" />
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Scenario List */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            เลือกเหตุการณ์เพื่อทดลองวิเคราะห์:
          </div>
          {SCENARIO_CHALLENGES.map((sc, idx) => {
            const isSelected = sc.id === selectedScenario.id;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => handleSelect(sc)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'bg-violet-50/80 border-violet-300 shadow-xs'
                    : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100/70'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-slate-800 font-mono">
                      กรณีศึกษา {idx + 1}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {sc.category === 'demand'
                        ? 'วิเคราะห์อุปสงค์'
                        : sc.category === 'supply'
                        ? 'วิเคราะห์อุปทาน'
                        : 'วิเคราะห์ทั้งคู่'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 line-clamp-1">{sc.situation}</div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 mt-1 shrink-0 transition-transform ${
                    isSelected ? 'text-violet-600 translate-x-1' : 'text-slate-400'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Selected Scenario Interactive Board */}
        <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-5">
          {/* Situation Box */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
            <div className="text-xs font-semibold text-violet-700 uppercase tracking-wide">
              เหตุการณ์ที่เกิดขึ้นในสังคม
            </div>
            <p className="text-base text-slate-900 font-medium leading-relaxed">
              &ldquo;{selectedScenario.situation}&rdquo;
            </p>

            <div className="pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1">
                <HelpCircle className="w-3.5 h-3.5 text-violet-600" />
                <span>คำถามชวนคิด:</span>
              </div>
              <p className="text-sm font-semibold text-slate-800">
                {selectedScenario.question}
              </p>
            </div>
          </div>

          {/* Reveal or Check Button */}
          {!revealed ? (
            <div className="text-center py-4 bg-white rounded-xl border border-dashed border-violet-200 p-6">
              <p className="text-xs text-slate-500 mb-3">
                ลองคิดวิเคราะห์ในใจตามกฎและปัจจัยที่เรียนมา แล้วกดปุ่มเพื่อดูคำเฉลยและเหตุผลทางเศรษฐศาสตร์
              </p>
              <button
                type="button"
                onClick={() => setRevealed(true)}
                className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm rounded-xl transition-colors shadow-xs"
              >
                ดูเฉลยและการวิเคราะห์ผล
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-5 border border-violet-200/80 shadow-2xs space-y-4 animate-in fade-in duration-300">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-emerald-700 font-semibold uppercase tracking-wide">
                    ผลการเปลี่ยนแปลง
                  </div>
                  <div className="text-base font-bold text-slate-900 mt-0.5">
                    {selectedScenario.correctAnswer}
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-violet-50/50 rounded-lg border border-violet-100 text-xs leading-relaxed text-slate-700 space-y-1.5">
                <div className="font-semibold text-violet-900 flex items-center gap-1.5">
                  <span>ปัจจัยที่มีอิทธิพล:</span>
                  <span className="text-violet-700 font-normal">{selectedScenario.factorInvolved}</span>
                </div>
                <div>{selectedScenario.explanation}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
