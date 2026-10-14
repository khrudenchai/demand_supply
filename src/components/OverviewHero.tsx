import React from 'react';
import { CURRICULUM_INDICATOR } from '../data/lessonContent';
import { ActiveTab } from '../types';
import { AudioPlayerButton } from './AudioPlayerButton';
import heroMarketImg from '../assets/images/hero_demand_supply_1791717046751.jpg';
import { ArrowRight, BookOpen, Layers, Sparkles } from 'lucide-react';

interface OverviewHeroProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const OverviewHero: React.FC<OverviewHeroProps> = ({ onNavigate }) => {
  const narrationText = `ยินดีต้อนรับสู่สื่อการสอนวิชาสังคมศึกษา ระดับชั้นมัธยมศึกษาปีที่ 1 เรื่อง อุปสงค์และอุปทาน ตามตัวชี้วัด ส.3.2 ม.1/3 นักเรียนจะได้เรียนรู้ความหมายของอุปสงค์ กำลังซื้อ กฎและเส้นกราฟอุปสงค์ ปัจจัยกำหนดอุปสงค์ ความหมายของอุปทาน กฎและเส้นกราฟอุปทาน ปัจจัยกำหนดอุปทาน ตลอดจนดุลยภาพของตลาด พร้อมทำแบบทดสอบออนไลน์เพื่อรับใบรายงานคะแนน`;

  return (
    <div className="space-y-8">
      {/* Hero 2-Column Split */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Column: Text & Competency Info */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Standard and Subject info - Clean text metadata without pill boxes */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-amber-700">{CURRICULUM_INDICATOR.standardCode}</span>
              <span aria-hidden="true">·</span>
              <span>สาระเศรษฐศาสตร์ ม.1</span>
              <span aria-hidden="true">·</span>
              <span>สื่อการสอนมัลติมีเดียแบบโต้ตอบ</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight text-balance">
              เข้าใจกลไกราคา: อุปสงค์ อุปทาน และปัจจัยกำหนดในชีวิตจริง
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
              เรียนรู้พฤติกรรมของผู้ซื้อและผู้ขาย ทำความเข้าใจว่าทำไมราคาสินค้าถึงขึ้นหรือลง
              ผ่านกราฟจำลองเชิงโต้ตอบ ฟังเสียงบรรยายภาษาไทย และทดสอบวัดผลทันที
            </p>

            {/* Curriculum Indicator Callout Card */}
            <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl space-y-1">
              <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>ตัวชี้วัดหลักสูตรแกนกลาง ({CURRICULUM_INDICATOR.standardCode}):</span>
              </div>
              <div className="text-xs sm:text-sm font-medium text-amber-950">
                &ldquo;{CURRICULUM_INDICATOR.standardText}&rdquo;
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('demand')}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-medium rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <span>เริ่มเรียน 1. อุปสงค์ (Demand)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <AudioPlayerButton textToSpeak={narrationText} label="ฟังเสียงแนะนำบทเรียน" />
          </div>
        </div>

        {/* Right Column: High Fidelity Market Image */}
        <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full bg-amber-100/40">
          <img
            src={heroMarketImg}
            alt="ภาพประกอบตลาดสดและการซื้อขายสินค้า วิชาเศรษฐศาสตร์ ม.1"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent flex items-end p-5">
            <div className="text-white text-xs font-medium bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/20">
              ตลาดสด & ตลาดนัด: พื้นที่สะท้อนการพบกันของอุปสงค์และอุปทาน
            </div>
          </div>
        </div>
      </div>

      {/* 3 Core Curriculum Modules Navigation Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Demand */}
        <div
          onClick={() => onNavigate('demand')}
          className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-amber-300 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                หัวข้อที่ 1
              </span>
              <BookOpen className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
              อุปสงค์ (Demand)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              ความหมาย กำลังซื้อ กฎของอุปสงค์ เส้นกราฟลาดลง (P แปรผกผันกับ Q) และ 7 ปัจจัยสำคัญที่กำหนดความต้องการซื้อ
            </p>
          </div>
          <div className="text-xs font-semibold text-amber-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>เข้าสู่บทเรียนอุปสงค์</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 2: Supply */}
        <div
          onClick={() => onNavigate('supply')}
          className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                หัวข้อที่ 2
              </span>
              <Layers className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
              อุปทาน (Supply)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              ความหมาย กฎของอุปทาน เส้นกราฟลาดขึ้น (P แปรผันตาม Q) ปัจจัยด้านต้นทุน เทคโนโลยี สภาพอากาศ และจำนวนผู้ผลิต
            </p>
          </div>
          <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>เข้าสู่บทเรียนอุปทาน</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 3: Equilibrium & Quiz */}
        <div
          onClick={() => onNavigate('equilibrium')}
          className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-sky-300 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                หัวข้อที่ 3
              </span>
              <Sparkles className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
              ดุลยภาพตลาด (Equilibrium)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              จุดตัดระหว่าง D และ S ราคาดุลยภาพ ปริมาณดุลยภาพ ภาวะสินค้าล้นตลาด (อุปทานส่วนเกิน) และสินค้าขาดตลาด (อุปสงค์ส่วนเกิน)
            </p>
          </div>
          <div className="text-xs font-semibold text-sky-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>เข้าสู่บทเรียนดุลยภาพตลาด</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
