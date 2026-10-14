import React from 'react';
import { SUPPLY_FACTORS, CURRICULUM_INDICATOR } from '../data/lessonContent';
import { SupplyCurveSimulator } from './SupplyCurveSimulator';
import { AudioPlayerButton } from './AudioPlayerButton';
import conceptSupplyImg from '../assets/images/concept_supply_1791717078780.jpg';
import {
  TrendingUp,
  Layers,
  Store,
  DollarSign,
  PackageCheck,
} from 'lucide-react';

export const SupplySection: React.FC = () => {
  const definitionSpeech = `อุปทาน หรือ Supply หมายถึง ปริมาณสินค้าและบริการที่ผู้ผลิตหรือผู้ขายยินดีและพร้อมที่จะนำออกเสนอขาย ณ ระดับราคาต่างๆ ในช่วงเวลาใดเวลาหนึ่ง โดยผู้ผลิตมีเป้าหมายหลักคือการแสวงหากำไรสูงสุด`;

  const lawSpeech = `กฎของอุปทาน หรือ Law of Supply ระบุว่า เมื่อราคาสินค้าสูงขึ้น ปริมาณเสนอขายจะเพิ่มขึ้น เนื่องจากผู้ผลิตมีแรงจูงใจจากผลกำไร และเมื่อราคาสินค้าลดลง ปริมาณเสนอขายจะลดลง โดยกำหนดให้ปัจจัยอื่นๆ คงที่ ความสัมพันธ์ระหว่างราคาและปริมาณเสนอขายจึงแปรผันตามกันโดยตรง เส้นอุปทานจึงมีความชันเป็นบวก ทอดขึ้นจากซ้ายล่างไปขวาบน`;

  return (
    <div className="space-y-10">
      {/* 1. Supply Definition Hero */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold uppercase tracking-wider">
              <span>หัวข้อที่ 2 · พฤติกรรมผู้ผลิตและผู้ขาย</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              2. ความหมายของอุปทาน (Supply)
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              ในทางเศรษฐศาสตร์ <strong>&ldquo;อุปทาน (Supply)&rdquo;</strong> คือ
              ปริมาณสินค้าหรือบริการที่ผู้ผลิตหรือผู้ขาย <em>ยินดีและพร้อม</em> ที่จะผลิตและนำออกมาจำหน่ายในตลาด
              ณ ระดับราคาต่างๆ ภายในระยะเวลาใดเวลาหนึ่ง
            </p>

            {/* Core Producer Pillars */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3">
              <div className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
                หัวใจสำคัญในการตัดสินใจของผู้ผลิต
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-white p-3 rounded-xl border border-emerald-200 shadow-2xs flex items-start gap-2.5">
                  <DollarSign className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">1. การแสวงหากำไร (Profit)</div>
                    <div className="text-slate-500 mt-0.5">ขายได้ราคาสูง ยิ่งคุ้มค่าและมีกำไรมาก</div>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-emerald-200 shadow-2xs flex items-start gap-2.5">
                  <PackageCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">2. ความพร้อมในการผลิต</div>
                    <div className="text-slate-500 mt-0.5">มีวัตถุดิบ แรงงาน และเครื่องจักรพร้อมส่งมอบ</div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-emerald-950 bg-emerald-100/50 p-2.5 rounded-lg flex items-center gap-2">
                <Store className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  <strong>มุมมองผู้ขาย:</strong> ยิ่งลูกค้ายอมจ่ายราคาสูง ผู้ผลิตยิ่งยินดีผลิตมาป้อนตลาดมากขึ้น
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <AudioPlayerButton textToSpeak={definitionSpeech} label="ฟังบรรยาย: ความหมายของอุปทาน" />
          </div>
        </div>

        {/* Visual Graphic of Producer Supply Bakery */}
        <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-slate-100">
          <img
            src={conceptSupplyImg}
            alt="ภาพอุปทานและการผลิตขนมปังพร้อมจำหน่ายในร้านเบเกอรี่"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent flex items-end p-5">
            <div className="text-white text-xs font-medium bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/20">
              ตัวอย่าง: ร้านเบเกอรี่อบขนมปังสดใหม่พร้อมนำออกวางขายตามราคาที่ตั้งไว้
            </div>
          </div>
        </div>
      </div>

      {/* 2. Law of Supply & Curve Rule Callout */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              <span>หลักการสำคัญ</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              กฎของอุปทาน (Law of Supply) และลักษณะเส้นอุปทาน
            </h3>
          </div>
          <AudioPlayerButton textToSpeak={lawSpeech} label="ฟังบรรยาย: กฎของอุปทาน" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/80 space-y-1.5">
            <div className="font-bold text-emerald-950 text-sm">
              เมื่อราคาสินค้าสูงขึ้น (P ↑)
            </div>
            <p className="text-xs text-emerald-900 leading-relaxed">
              ผู้ผลิตจะเพิ่มปริมาณการผลิตและนำสินค้าออกขายมากขึ้น (Qs ↑) เพราะมองเห็นโอกาสทำกำไรสูงขึ้น
            </p>
          </div>

          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 space-y-1.5">
            <div className="font-bold text-amber-950 text-sm">
              เมื่อราคาสินค้าลดลง (P ↓)
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              ผู้ผลิตจะลดปริมาณการผลิตและเสนอขายลง (Qs ↓) เพราะผลกำไรน้อยลง ไม่คุ้มค่าเหนื่อยหรือต้นทุน
            </p>
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
          <span>ความสัมพันธ์: <strong>แปรผันตามกันโดยตรง (Direct Relationship)</strong></span>
          <span>ลักษณะเส้นกราฟ: <strong>ทอดขึ้นจากซ้ายล่างไปขวาบน (Slope เป็นบวก)</strong></span>
        </div>
      </div>

      {/* 3. Interactive SVG Supply Curve Simulator */}
      <SupplyCurveSimulator />

      {/* 4. Factors Influencing Supply (7 Factors) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5 mb-1">
              <Layers className="w-4 h-4" />
              <span>ตัวชี้วัด {CURRICULUM_INDICATOR.standardCode}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              ปัจจัยที่มีอิทธิพลต่อการกำหนดอุปทาน (Supply Factors)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              ตัวแปรที่มีผลต่อความสามารถและแรงจูงใจในการผลิตสินค้าของผู้ขายในตลาด
            </p>
          </div>

          <AudioPlayerButton
            textToSpeak="ปัจจัยที่มีอิทธิพลต่อการกำหนดอุปทานมีทั้งหมด 7 ปัจจัยสำคัญ ได้แก่ ราคาสินค้าชนิดนั้น ต้นทุนการผลิตและปัจจัยการผลิต เทคโนโลยีการผลิต ราคาสินค้าอื่นที่เกี่ยวข้อง สภาพดินฟ้าอากาศและภัยธรรมชาติ นโยบายและภาษีของรัฐบาล และจำนวนผู้ผลิตในตลาด"
            label="ฟังสรุปปัจจัยกำหนดอุปทาน"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SUPPLY_FACTORS.map((factor) => (
            <div
              key={factor.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                    {factor.tag}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{factor.title}</h4>
                <div className="text-xs font-medium text-emerald-700">{factor.subtitle}</div>
                <p className="text-xs text-slate-600 leading-relaxed">{factor.description}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="p-2.5 bg-slate-50 rounded-lg text-xs text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">ตัวอย่างจริง:</strong> {factor.realWorldExample}
                </div>
                <div className="text-[11px] font-medium text-emerald-900 bg-emerald-50/60 p-2 rounded-lg">
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
