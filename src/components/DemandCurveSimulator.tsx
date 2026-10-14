import React, { useState } from 'react';
import { AudioPlayerButton } from './AudioPlayerButton';
import { ArrowDownRight, RefreshCw, Sparkles, TrendingDown } from 'lucide-react';

export const DemandCurveSimulator: React.FC = () => {
  // Price: 20 to 80 THB
  const [price, setPrice] = useState<number>(40);
  // Shift state: 0 (normal D0), +20 (shift right D1), -20 (shift left D2)
  const [shift, setShift] = useState<number>(0);

  // Demand equation: Qd = 100 - price + shift
  const quantity = Math.max(10, Math.min(100, 100 - price + shift));

  // Graph SVG coordinates mapping:
  // X: 60 to 360 px represents Quantity 0 to 100 units
  // Y: 260 to 40 px represents Price 0 to 100 THB
  const mapQToX = (q: number) => 60 + (q / 100) * 300;
  const mapPToY = (p: number) => 260 - (p / 100) * 220;

  const currentX = mapQToX(quantity);
  const currentY = mapPToY(price);

  // Line points for base curve D0
  const d0P1 = 15;
  const d0Q1 = 100 - d0P1;
  const d0P2 = 85;
  const d0Q2 = 100 - d0P2;

  // Shifted line
  const curP1 = 15;
  const curQ1 = Math.max(5, Math.min(95, 100 - curP1 + shift));
  const curP2 = 85;
  const curQ2 = Math.max(5, Math.min(95, 100 - curP2 + shift));

  const narrationText = `กฎของอุปสงค์ระบุว่า เมื่อราคาสินค้าสูงขึ้น ปริมาณความต้องการซื้อจะลดลง และเมื่อราคาลดลง ปริมาณความต้องการซื้อจะเพิ่มขึ้น ในตัวอย่างนี้ เมื่อราคาชานมไข่มุกอยู่ที่ ${price} บาท ผู้บริโภคต้องการซื้อ ${quantity} แก้ว เส้นอุปสงค์จึงมีความชันเป็นลบ ทอดลงจากซ้ายไปขวา`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 bg-linear-to-r from-amber-50/50 via-white to-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <TrendingDown className="w-4 h-4" />
            <span>การทดลองเชิงโต้ตอบ: เส้นอุปสงค์ (Demand Curve)</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            จำลองกฎของอุปสงค์: ความสัมพันธ์ระหว่างราคาและปริมาณซื้อ
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            ลากปรับระดับราคา (Price) เพื่อดูการเคลื่อนไหวบนเส้น หรือเปลี่ยนปัจจัยภายนอกเพื่อดูการเลื่อนของเส้นอุปสงค์
          </p>
        </div>
        <AudioPlayerButton textToSpeak={narrationText} label="ฟังคำอธิบายเส้นอุปสงค์" />
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive SVG Graph */}
        <div className="lg:col-span-7 bg-slate-50/80 rounded-xl p-4 border border-slate-200/80 relative">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-2 px-2">
            <span className="font-medium text-slate-700">แกนตั้ง: ราคา (P: บาท)</span>
            <span className="font-medium text-slate-700">แกนนอน: ปริมาณซื้อ (Q: แก้ว)</span>
          </div>

          <svg
            viewBox="0 0 400 300"
            className="w-full h-auto select-none bg-white rounded-lg border border-slate-200 shadow-2xs"
          >
            {/* Grid lines */}
            <line x1="60" y1="260" x2="360" y2="260" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="60" y1="40" x2="60" y2="260" stroke="#cbd5e1" strokeWidth="2" />

            {/* Sub-grid lines */}
            {[20, 40, 60, 80].map((val) => (
              <g key={`y-${val}`}>
                <line
                  x1="55"
                  y1={mapPToY(val)}
                  x2="360"
                  y2={mapPToY(val)}
                  stroke="#f1f5f9"
                  strokeDasharray="3 3"
                />
                <text x="48" y={mapPToY(val) + 4} fontSize="10" fill="#64748b" textAnchor="end">
                  {val}฿
                </text>
              </g>
            ))}

            {[20, 40, 60, 80].map((val) => (
              <g key={`x-${val}`}>
                <line
                  x1={mapQToX(val)}
                  y1="40"
                  x2={mapQToX(val)}
                  y2={265}
                  stroke="#f1f5f9"
                  strokeDasharray="3 3"
                />
                <text x={mapQToX(val)} y="278" fontSize="10" fill="#64748b" textAnchor="middle">
                  {val}
                </text>
              </g>
            ))}

            {/* Base D0 ghost line if shifted */}
            {shift !== 0 && (
              <g opacity="0.35">
                <line
                  x1={mapQToX(d0Q1)}
                  y1={mapPToY(d0P1)}
                  x2={mapQToX(d0Q2)}
                  y2={mapPToY(d0P2)}
                  stroke="#94a3b8"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                />
                <text
                  x={mapQToX(d0Q1) + 8}
                  y={mapPToY(d0P1)}
                  fontSize="11"
                  fill="#64748b"
                  fontWeight="bold"
                >
                  D (เดิม)
                </text>
              </g>
            )}

            {/* Active Demand Curve */}
            <line
              x1={mapQToX(curQ1)}
              y1={mapPToY(curP1)}
              x2={mapQToX(curQ2)}
              y2={mapPToY(curP2)}
              stroke="#ea580c"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <text
              x={mapQToX(curQ1) + 8}
              y={mapPToY(curP1)}
              fontSize="13"
              fill="#c2410c"
              fontWeight="bold"
            >
              {shift > 0 ? 'D₁ (เพิ่มขึ้น)' : shift < 0 ? 'D₂ (ลดลง)' : 'D (อุปสงค์)'}
            </text>

            {/* Projection dashed lines for current (Q, P) */}
            <line
              x1="60"
              y1={currentY}
              x2={currentX}
              y2={currentY}
              stroke="#ea580c"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <line
              x1={currentX}
              y1={currentY}
              x2={currentX}
              y2="260"
              stroke="#ea580c"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />

            {/* Highlighted current Point dot */}
            <circle cx={currentX} cy={currentY} r="7" fill="#ea580c" />
            <circle cx={currentX} cy={currentY} r="11" fill="#ea580c" opacity="0.25" />

            {/* Label coordinate tooltip on SVG */}
            <rect
              x={Math.min(currentX + 10, 270)}
              y={Math.max(currentY - 28, 45)}
              width="90"
              height="24"
              rx="4"
              fill="#1e293b"
            />
            <text
              x={Math.min(currentX + 55, 315)}
              y={Math.max(currentY - 12, 61)}
              fontSize="10"
              fill="#ffffff"
              textAnchor="middle"
              fontFamily="monospace"
            >
              (Q: {quantity}, P: {price}฿)
            </text>
          </svg>

          {/* Quick takeaway strip below graph */}
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 bg-white p-2.5 rounded-lg border border-slate-200">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <ArrowDownRight className="w-4 h-4 text-amber-600" />
              ความชันเส้นอุปสงค์: ลาดลงจากซ้ายไปขวา (Negative Slope)
            </span>
            <span>กฎ: ราคาแปรผกผันกับปริมาณซื้อ</span>
          </div>
        </div>

        {/* Controls Deck */}
        <div className="lg:col-span-5 space-y-5">
          {/* Slider 1: Price */}
          <div className="p-4 bg-amber-50/40 rounded-xl border border-amber-200/80">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="price-slider" className="text-sm font-semibold text-slate-800">
                1. ระดับราคาสินค้า (Price: P)
              </label>
              <span className="font-mono text-base font-bold text-amber-700 bg-amber-100/80 px-2.5 py-0.5 rounded-md">
                {price} บาท/แก้ว
              </span>
            </div>
            <input
              id="price-slider"
              type="range"
              min="20"
              max="80"
              step="5"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
              <span>20฿ (ถูกมาก)</span>
              <span>50฿ (ปานกลาง)</span>
              <span>80฿ (แพงมาก)</span>
            </div>
          </div>

          {/* Real-time outcome box */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              ผลลัพธ์พฤติกรรมผู้บริโภค
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                <div className="text-xs text-slate-500">ปริมาณความต้องการซื้อ (Q)</div>
                <div className="text-xl font-bold text-slate-900 mt-0.5 font-mono">
                  {quantity} <span className="text-xs font-normal text-slate-500">แก้ว</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                <div className="text-xs text-slate-500">มูลค่าการใช้จ่ายรวม (P × Q)</div>
                <div className="text-xl font-bold text-slate-900 mt-0.5 font-mono">
                  {(price * quantity).toLocaleString()}{' '}
                  <span className="text-xs font-normal text-slate-500">บาท</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-100 leading-relaxed">
              {price <= 35 ? (
                <span className="text-emerald-700 font-medium">
                  ★ ราคาสินค้าถูกลงอย่างมาก ผู้บริโภคมีความต้องการซื้อเพิ่มขึ้นสูงถึง {quantity} แก้ว ตามกฎของอุปสงค์
                </span>
              ) : price >= 65 ? (
                <span className="text-amber-800 font-medium">
                  ▲ ราคาสินค้าแพงมาก ผู้บริโภคจำกัดการซื้อเหลือเพียง {quantity} แก้ว เนื่องจากกำลังซื้อจำกัด
                </span>
              ) : (
                <span>
                  ● ที่ราคาปานกลาง {price} บาท ปริมาณการซื้ออยู่ในระดับสมดุล {quantity} แก้ว
                </span>
              )}
            </div>
          </div>

          {/* Non-Price Shift Controls */}
          <div className="p-4 bg-white rounded-xl border border-slate-200">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>ทดลองเปลี่ยนปัจจัยภายนอก (Shift of Demand)</span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              เมื่อปัจจัยที่ไม่ใช่ราคาเปลี่ยนแปลง เส้นอุปสงค์จะขยับทั้งเส้น
            </p>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setShift(-20)}
                className={`px-2.5 py-2 text-xs font-medium rounded-lg border transition-all text-center ${
                  shift === -20
                    ? 'bg-amber-100/90 text-amber-900 border-amber-300 font-semibold'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                รายได้ลด / สภาพอากาศหนาว
                <div className="text-[10px] text-slate-500 mt-0.5">(เส้นเลื่อนซ้าย)</div>
              </button>

              <button
                type="button"
                onClick={() => setShift(0)}
                className={`px-2.5 py-2 text-xs font-medium rounded-lg border transition-all text-center ${
                  shift === 0
                    ? 'bg-amber-100/90 text-amber-900 border-amber-300 font-semibold'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                สภาวะปกติ
                <div className="text-[10px] text-slate-500 mt-0.5">(เส้น D ปกติ)</div>
              </button>

              <button
                type="button"
                onClick={() => setShift(20)}
                className={`px-2.5 py-2 text-xs font-medium rounded-lg border transition-all text-center ${
                  shift === 20
                    ? 'bg-amber-100/90 text-amber-900 border-amber-300 font-semibold'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                กระแสฮิต / ฤดูร้อน
                <div className="text-[10px] text-slate-500 mt-0.5">(เส้นเลื่อนขวา)</div>
              </button>
            </div>

            {shift !== 0 && (
              <button
                type="button"
                onClick={() => setShift(0)}
                className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>รีเซ็ตกลับเป็นเส้นปกติ</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
