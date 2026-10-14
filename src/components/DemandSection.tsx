import React from 'react';
import { DEMAND_FACTORS, CURRICULUM_INDICATOR } from '../data/lessonContent';
import { DemandCurveSimulator } from './DemandCurveSimulator';
import { AudioPlayerButton } from './AudioPlayerButton';
import conceptDemandImg from '../assets/images/concept_demand_1791717062316.jpg';
import {
  Wallet,
  CheckCircle2,
  TrendingDown,
  Info,
  Layers,
} from 'lucide-react';

export const DemandSection: React.FC = () => {
  const definitionSpeech = `อุปสงค์ หรือ Demand หมายถึง ปริมาณสินค้าและบริการที่ผู้บริโภคต้องการและสามารถซื้อได้ ณ ระดับราคาต่างๆ ในช่วงเวลาใดเวลาหนึ่ง โดยต้องมีทั้ง ความต้องการจะซื้อ และ กำลังซื้อ หรือความสามารถในการจ่ายเงิน หากมีเพียงความอยากได้แต่ไม่มีเงินจ่าย จะไม่ถือว่าเป็นอุปสงค์ในทางเศรษฐศาสตร์`;

  const lawSpeech = `กฎของอุปสงค์ หรือ Law of Demand ระบุว่า เมื่อราคาสินค้าสูงขึ้น ปริมาณความต้องการซื้อจะลดลง และเมื่อราคาสินค้าลดลง ปริมาณความต้องการซื้อจะเพิ่มขึ้น โดยกำหนดให้ปัจจัยอื่นๆ คงที่ ความสัมพันธ์ระหว่างราคาและปริมาณซื้อจึงเป็นไปในทิศทางตรงกันข้าม หรือแปรผกผันกัน เส้นอุปสงค์จึงมีความชันเป็นลบ ลาดลงจากซ้ายบนไปขวาล่าง`;

  return (
    <div className="space-y-10">
      {/* 1. Demand Definition & Purchasing Power Hero */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-amber-700 font-semibold uppercase tracking-wider">
              <span>หัวข้อที่ 1 · พฤติกรรมผู้บริโภค</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              1. ความหมายของอุปสงค์ (Demand) และกำลังซื้อ
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              ในวิชาเศรษฐศาสตร์ <strong>&ldquo;อุปสงค์ (Demand)&rdquo;</strong> ไม่ใช่แค่ความอยากได้เฉยๆ
              แต่ต้องเป็นความต้องการที่มีผลสมบูรณ์ (Effective Demand)
              ซึ่งประกอบด้วย 2 องค์ประกอบหลักที่ต้องเกิดขึ้นพร้อมกัน:
            </p>

            {/* Formula Block */}
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-3">
              <div className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                สูตรอุปสงค์ที่สมบูรณ์ (Effective Demand)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-white p-3 rounded-xl border border-amber-200 shadow-2xs flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">1. ความเต็มใจที่จะซื้อ</div>
                    <div className="text-slate-500 mt-0.5">Willingness to buy (ความต้องการและเจตนาที่จะซื้อ)</div>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-amber-200 shadow-2xs flex items-start gap-2.5">
                  <Wallet className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">2. ความสามารถในการจ่าย</div>
                    <div className="text-slate-500 mt-0.5">Ability to pay (กำลังซื้อ / เงินที่มีพร้อมจ่ายจริง)</div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-amber-900 bg-amber-100/50 p-2.5 rounded-lg flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  <strong>ข้อสังเกต:</strong> หากอยากได้สมาร์ตโฟนราคา 30,000 บาท แต่มีเงินในกระเป๋าเพียง 100 บาท จะ <em>ไม่ถือเป็นอุปสงค์</em>
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <AudioPlayerButton textToSpeak={definitionSpeech} label="ฟังบรรยาย: ความหมายและกำลังซื้อ" />
          </div>
        </div>

        {/* Visual Graphic of Student Purchasing Power */}
        <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-slate-100">
          <img
            src={conceptDemandImg}
            alt="ภาพอุปสงค์และกำลังซื้อ นักเรียนซื้อชานมไข่มุก"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent flex items-end p-5">
            <div className="text-white text-xs font-medium bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/20">
              ตัวอย่าง: อยากดื่มชานม + มีเงินพร้อมจ่ายในกระเป๋า = เกิดอุปสงค์
            </div>
          </div>
        </div>
      </div>

      {/* 2. Law of Demand & Curve Rule Callout */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-amber-700 flex items-center gap-1.5">
              <TrendingDown className="w-4 h-4" />
              <span>หลักการสำคัญ</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              กฎของอุปสงค์ (Law of Demand) และลักษณะเส้นอุปสงค์
            </h3>
          </div>
          <AudioPlayerButton textToSpeak={lawSpeech} label="ฟังบรรยาย: กฎของอุปสงค์" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-orange-50/60 rounded-xl border border-orange-200/80 space-y-1.5">
            <div className="font-bold text-orange-950 text-sm">
              เมื่อราคาสินค้าสูงขึ้น (P ↑)
            </div>
            <p className="text-xs text-orange-900 leading-relaxed">
              ผู้บริโภคจะลดปริมาณความต้องการซื้อลง (Qd ↓) เพราะรู้สึกว่าสินค้าแพงเกินไป หรือหันไปซื้อสินค้าอื่นแทน
            </p>
          </div>

          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/80 space-y-1.5">
            <div className="font-bold text-emerald-950 text-sm">
              เมื่อราคาสินค้าลดลง (P ↓)
            </div>
            <p className="text-xs text-emerald-900 leading-relaxed">
              ผู้บริโภคจะเพิ่มปริมาณความต้องการซื้อขึ้น (Qd ↑) เพราะสินค้าราคาถูกลง คุ้มค่าและอยากซื้อตุนไว้
            </p>
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
          <span>ความสัมพันธ์: <strong>แปรผกผัน (Inverse Relationship)</strong></span>
          <span>ลักษณะเส้นกราฟ: <strong>ทอดลงจากซ้ายบนไปขวาล่าง (Slope เป็นลบ)</strong></span>
        </div>
      </div>

      {/* 3. Interactive SVG Demand Curve Simulator */}
      <DemandCurveSimulator />

      {/* 4. Factors Influencing Demand (7 Factors) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-amber-700 flex items-center gap-1.5 mb-1">
              <Layers className="w-4 h-4" />
              <span>ตัวชี้วัด {CURRICULUM_INDICATOR.standardCode}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              ปัจจัยที่มีอิทธิพลต่อการกำหนดอุปสงค์ (Demand Factors)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              เหตุผลและเงื่อนไขที่ทำให้ผู้บริโภคตัดสินใจซื้อสินค้าเพิ่มขึ้นหรือลดลงในชีวิตจริง
            </p>
          </div>

          <AudioPlayerButton
            textToSpeak="ปัจจัยที่มีอิทธิพลต่อการกำหนดอุปสงค์มีทั้งหมด 7 ปัจจัยสำคัญ ได้แก่ ราคาสินค้าชนิดนั้น รายได้ของผู้บริโภค รสนิยมและความชอบ ราคาสินค้าทดแทนกัน ราคาสินค้าประกอบกัน ฤดูกาล และการคาดคะเนราคาในอนาคต"
            label="ฟังสรุปปัจจัยกำหนดอุปสงค์"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DEMAND_FACTORS.map((factor) => (
            <div
              key={factor.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md">
                    {factor.tag}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{factor.title}</h4>
                <div className="text-xs font-medium text-amber-700">{factor.subtitle}</div>
                <p className="text-xs text-slate-600 leading-relaxed">{factor.description}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="p-2.5 bg-slate-50 rounded-lg text-xs text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">ตัวอย่างจริง:</strong> {factor.realWorldExample}
                </div>
                <div className="text-[11px] font-medium text-amber-900 bg-amber-50/60 p-2 rounded-lg">
                  {factor.effectExplanation}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
