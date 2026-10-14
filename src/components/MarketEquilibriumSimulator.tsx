import React, { useState } from 'react';
import { AudioPlayerButton } from './AudioPlayerButton';
import { Scale, ArrowDown, ArrowUp, CheckCircle2 } from 'lucide-react';

export const MarketEquilibriumSimulator: React.FC = () => {
  // Current tested market price: 20 to 80
  const [marketPrice, setMarketPrice] = useState<number>(50);

  // Equilibrium is at P = 50, where Qd = Qs = 50
  // Qd = 100 - P
  // Qs = P
  const qd = 100 - marketPrice;
  const qs = marketPrice;

  const diff = qs - qd;
  const isEquilibrium = marketPrice === 50;
  const isSurplus = marketPrice > 50;
  const isShortage = marketPrice < 50;

  // Graph coordinate mapping:
  const mapQToX = (q: number) => 60 + (q / 100) * 300;
  const mapPToY = (p: number) => 260 - (p / 100) * 220;

  // Price level Y
  const py = mapPToY(marketPrice);
  const qdx = mapQToX(qd);
  const qsx = mapQToX(qs);

  const narrationText = isEquilibrium
    ? `ณ ระดับราคา 50 บาท ปริมาณความต้องการซื้อเท่ากับปริมาณความต้องการขายพอดี ที่ 50 หน่วย จุดนี้เรียกว่า จุดดุลยภาพของตลาด หรือ Equilibrium สินค้าไม่ขาดแคลนและไม่ล้นตลาด`
    : isSurplus
    ? `ที่ราคา ${marketPrice} บาท สูงกว่าราคาดุลยภาพ ผู้ผลิตอยากขาย ${qs} หน่วย แต่ผู้ซื้อต้องการเพียง ${qd} หน่วย เกิดภาวะสินค้าล้นตลาดหรืออุปทานส่วนเกิน ${diff} หน่วย ทำให้ผู้ขายต้องแย่งกันลดราคาลงมา`
    : `ที่ราคา ${marketPrice} บาท ต่ำกว่าราคาดุลยภาพ ผู้ซื้อต้องการถึง ${qd} หน่วย แต่ผู้ผลิตนำมาขายเพียง ${qs} หน่วย เกิดภาวะสินค้าขาดตลาดหรืออุปสงค์ส่วนเกิน ${Math.abs(diff)} หน่วย ผู้ซื้อแย่งกันซื้อทำให้ราคามีแนวโน้มปรับสูงขึ้น`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 bg-linear-to-r from-sky-50/50 via-white to-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Scale className="w-4 h-4" />
            <span>กลไกราคา: ดุลยภาพของตลาด (Market Equilibrium)</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            จุดตัดระหว่างอุปสงค์และอุปทาน: ราคาและปริมาณดุลยภาพ
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            ทดลองปรับระดับราคาเพื่อสังเกตจุดตัด ดุลยภาพ และการเกิดสินค้าล้นตลาดหรือขาดตลาด
          </p>
        </div>
        <AudioPlayerButton textToSpeak={narrationText} label="ฟังคำอธิบายดุลยภาพตลาด" />
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive SVG Diagram */}
        <div className="lg:col-span-7 bg-slate-50/80 rounded-xl p-4 border border-slate-200/80 relative">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-2 px-2">
            <span className="font-medium text-slate-700">แกนตั้ง: ราคา (P)</span>
            <span className="font-medium text-slate-700">แกนนอน: ปริมาณ (Q)</span>
          </div>

          <svg
            viewBox="0 0 400 300"
            className="w-full h-auto select-none bg-white rounded-lg border border-slate-200 shadow-2xs"
          >
            {/* Axis */}
            <line x1="60" y1="260" x2="360" y2="260" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="60" y1="40" x2="60" y2="260" stroke="#cbd5e1" strokeWidth="2" />

            {/* Labels */}
            <text x="50" y="50" fontSize="11" fill="#475569" fontWeight="600" textAnchor="end">
              P (ราคา)
            </text>
            <text x="360" y="280" fontSize="11" fill="#475569" fontWeight="600" textAnchor="end">
              Q (ปริมาณ)
            </text>

            {/* Demand Curve (Orange) */}
            <line
              x1={mapQToX(85)}
              y1={mapPToY(15)}
              x2={mapQToX(15)}
              y2={mapPToY(85)}
              stroke="#ea580c"
              strokeWidth="3"
            />
            <text x={mapQToX(85) + 6} y={mapPToY(15)} fontSize="12" fill="#c2410c" fontWeight="bold">
              D
            </text>

            {/* Supply Curve (Emerald) */}
            <line
              x1={mapQToX(15)}
              y1={mapPToY(15)}
              x2={mapQToX(85)}
              y2={mapPToY(85)}
              stroke="#059669"
              strokeWidth="3"
            />
            <text x={mapQToX(85) + 6} y={mapPToY(85)} fontSize="12" fill="#047857" fontWeight="bold">
              S
            </text>

            {/* Equilibrium Point E (P=50, Q=50) */}
            <circle cx={mapQToX(50)} cy={mapPToY(50)} r="5" fill="#0284c7" />
            <text
              x={mapQToX(50) + 8}
              y={mapPToY(50) - 6}
              fontSize="12"
              fill="#0369a1"
              fontWeight="bold"
            >
              จุด E (ดุลยภาพ)
            </text>

            {/* Current Price Line */}
            <line
              x1="60"
              y1={py}
              x2="360"
              y2={py}
              stroke="#334155"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
            <text x="52" y={py + 4} fontSize="11" fill="#334155" fontWeight="bold" textAnchor="end">
              {marketPrice}฿
            </text>

            {/* Surplus or Shortage Highlight Region */}
            {isSurplus && (
              <g>
                {/* Horizontal gap between Qd and Qs */}
                <line x1={qdx} y1={py} x2={qsx} y2={py} stroke="#dc2626" strokeWidth="5" />
                <circle cx={qdx} cy={py} r="4" fill="#ea580c" />
                <circle cx={qsx} cy={py} r="4" fill="#059669" />
                <rect
                  x={(qdx + qsx) / 2 - 45}
                  y={py - 24}
                  width="90"
                  height="18"
                  rx="4"
                  fill="#fee2e2"
                  stroke="#f87171"
                />
                <text
                  x={(qdx + qsx) / 2}
                  y={py - 12}
                  fontSize="9.5"
                  fill="#991b1b"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  สินค้าล้นตลาด (+{diff})
                </text>
              </g>
            )}

            {isShortage && (
              <g>
                {/* Horizontal gap between Qs and Qd */}
                <line x1={qsx} y1={py} x2={qdx} y2={py} stroke="#d97706" strokeWidth="5" />
                <circle cx={qsx} cy={py} r="4" fill="#059669" />
                <circle cx={qdx} cy={py} r="4" fill="#ea580c" />
                <rect
                  x={(qdx + qsx) / 2 - 45}
                  y={py + 10}
                  width="90"
                  height="18"
                  rx="4"
                  fill="#fef3c7"
                  stroke="#fbbf24"
                />
                <text
                  x={(qdx + qsx) / 2}
                  y={py + 22}
                  fontSize="9.5"
                  fill="#92400e"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  สินค้าขาดตลาด (-{Math.abs(diff)})
                </text>
              </g>
            )}
          </svg>

          {/* Color legend */}
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 bg-white p-2.5 rounded-lg border border-slate-200">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium text-orange-700">
                <span className="w-3 h-0.5 bg-orange-600 inline-block"></span> เส้นอุปสงค์ (D)
              </span>
              <span className="flex items-center gap-1.5 font-medium text-emerald-700">
                <span className="w-3 h-0.5 bg-emerald-600 inline-block"></span> เส้นอุปทาน (S)
              </span>
            </div>
            <span className="font-semibold text-sky-700">ราคาดุลยภาพ = 50 บาท (Q = 50)</span>
          </div>
        </div>

        {/* Controls Deck */}
        <div className="lg:col-span-5 space-y-5">
          {/* Price slider */}
          <div className="p-4 bg-sky-50/40 rounded-xl border border-sky-200/80">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="eq-price-slider" className="text-sm font-semibold text-slate-800">
                ระดับราคาในตลาดขณะนี้ (Price)
              </label>
              <span className="font-mono text-base font-bold text-sky-800 bg-sky-100/80 px-2.5 py-0.5 rounded-md">
                {marketPrice} บาท
              </span>
            </div>
            <input
              id="eq-price-slider"
              type="range"
              min="20"
              max="80"
              step="5"
              value={marketPrice}
              onChange={(e) => setMarketPrice(Number(e.target.value))}
              className="w-full accent-sky-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
              <span>20฿ (ขาดตลาด)</span>
              <button
                type="button"
                onClick={() => setMarketPrice(50)}
                className="text-sky-700 underline font-semibold cursor-pointer"
              >
                50฿ (ดุลยภาพพอดี)
              </button>
              <span>80฿ (ล้นตลาด)</span>
            </div>
          </div>

          {/* Status Breakdown Box */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              การวิเคราะห์สภาวะตลาด
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <div className="text-xs text-orange-700 font-medium">ความต้องการซื้อ (Qd)</div>
                <div className="text-xl font-bold text-slate-900 mt-0.5 font-mono">
                  {qd} <span className="text-xs font-normal text-slate-500">หน่วย</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <div className="text-xs text-emerald-700 font-medium">ปริมาณเสนอขาย (Qs)</div>
                <div className="text-xl font-bold text-slate-900 mt-0.5 font-mono">
                  {qs} <span className="text-xs font-normal text-slate-500">หน่วย</span>
                </div>
              </div>
            </div>

            {/* Condition Banner */}
            <div className="p-3.5 bg-white rounded-lg border border-slate-200">
              {isEquilibrium && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-sky-800 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-sky-600" />
                    <span>ภาวะดุลยภาพของตลาด (Market Equilibrium)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ปริมาณเสนอซื้อเท่ากับปริมาณเสนอขายพอดี (Qd = Qs = 50) ไม่มีสินค้าเหลือค้างสต็อก และไม่มีผู้ซื้อที่หาซื้อสินค้าไม่ได้ ราคาจึงหยุดนิ่งทรงตัว
                  </p>
                </div>
              )}

              {isSurplus && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-red-700 font-bold text-sm">
                    <ArrowDown className="w-4 h-4 text-red-600" />
                    <span>ภาวะสินค้าล้นตลาด (อุปทานส่วนเกิน / Surplus)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ผู้ขายอยากขาย {qs} หน่วย แต่ผู้ซื้อยอมซื้อเพียง {qd} หน่วย เกิดสินค้าค้างสต็อก {diff} หน่วย ผู้ขายจะแข่งขันกัน <strong className="text-red-700">ปรับลดราคาลง</strong> สู่ราคาดุลยภาพ 50 บาท
                  </p>
                </div>
              )}

              {isShortage && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-amber-800 font-bold text-sm">
                    <ArrowUp className="w-4 h-4 text-amber-600" />
                    <span>ภาวะสินค้าขาดตลาด (อุปสงค์ส่วนเกิน / Shortage)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ผู้ซื้ออยากซื้อถึง {qd} หน่วย แต่ผู้ขายนำมาขายเพียง {qs} หน่วย สินค้าไม่พอขายขาดแคลน {Math.abs(diff)} หน่วย ผู้ซื้อจะแย่งกันเสนอราคาทำให้ราคา <strong className="text-amber-800">ปรับสูงขึ้น</strong> สู่ราคาดุลยภาพ 50 บาท
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
