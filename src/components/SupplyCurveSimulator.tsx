import React, { useState } from 'react';
import { AudioPlayerButton } from './AudioPlayerButton';
import { ArrowUpRight, RefreshCw, Sparkles, TrendingUp } from 'lucide-react';

export const SupplyCurveSimulator: React.FC = () => {
  // Price: 20 to 80 THB
  const [price, setPrice] = useState<number>(50);
  // Shift state: 0 (normal S0), +20 (shift right S1), -20 (shift left S2)
  const [shift, setShift] = useState<number>(0);

  // Supply equation: Qs = price + shift
  const quantity = Math.max(10, Math.min(100, price + shift));

  // Graph SVG coordinates mapping:
  // X: 60 to 360 px represents Quantity 0 to 100 units
  // Y: 260 to 40 px represents Price 0 to 100 THB
  const mapQToX = (q: number) => 60 + (q / 100) * 300;
  const mapPToY = (p: number) => 260 - (p / 100) * 220;

  const currentX = mapQToX(quantity);
  const currentY = mapPToY(price);

  // Line points for base curve S0
  const s0P1 = 15;
  const s0Q1 = s0P1;
  const s0P2 = 85;
  const s0Q2 = s0P2;

  // Shifted line
  const curP1 = 15;
  const curQ1 = Math.max(5, Math.min(95, curP1 + shift));
  const curP2 = 85;
  const curQ2 = Math.max(5, Math.min(95, curP2 + shift));

  const narrationText = `กฎของอุปทานระบุว่า เมื่อราคาสินค้าสูงขึ้น ปริมาณเสนอขายจะเพิ่มขึ้น เนื่องจากผู้ผลิตได้รับผลกำไรที่สูงขึ้น แต่เมื่อราคาลดลง ปริมาณเสนอขายจะลดลง ณ ราคา ${price} บาท ผู้ผลิตต้องการขาย ${quantity} ชิ้น เส้นอุปทานจึงมีความชันเป็นบวก ทอดขึ้นจากซ้ายล่างไปขวาบน`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 bg-linear-to-r from-emerald-50/50 via-white to-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4" />
            <span>การทดลองเชิงโต้ตอบ: เส้นอุปทาน (Supply Curve)</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            จำลองกฎของอุปทาน: ความสัมพันธ์ระหว่างราคาและปริมาณเสนอขาย
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            ลากปรับระดับราคา (Price) เพื่อดูการตัดสินใจของผู้ผลิต หรือจำลองปัจจัยด้านต้นทุนและเทคโนโลยี
          </p>
        </div>
        <AudioPlayerButton textToSpeak={narrationText} label="ฟังคำอธิบายเส้นอุปทาน" />
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive SVG Graph */}
        <div className="lg:col-span-7 bg-slate-50/80 rounded-xl p-4 border border-slate-200/80 relative">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-2 px-2">
            <span className="font-medium text-slate-700">แกนตั้ง: ราคา (P: บาท)</span>
            <span className="font-medium text-slate-700">แกนนอน: ปริมาณเสนอขาย (Q: ชิ้น)</span>
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

            {/* Base S0 ghost line if shifted */}
            {shift !== 0 && (
              <g opacity="0.35">
                <line
                  x1={mapQToX(s0Q1)}
                  y1={mapPToY(s0P1)}
                  x2={mapQToX(s0Q2)}
                  y2={mapPToY(s0P2)}
                  stroke="#94a3b8"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                />
                <text
                  x={mapQToX(s0Q2) + 8}
                  y={mapPToY(s0P2)}
                  fontSize="11"
                  fill="#64748b"
                  fontWeight="bold"
                >
                  S (เดิม)
                </text>
              </g>
            )}

            {/* Active Supply Curve */}
            <line
              x1={mapQToX(curQ1)}
              y1={mapPToY(curP1)}
              x2={mapQToX(curQ2)}
              y2={mapPToY(curP2)}
              stroke="#059669"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <text
              x={mapQToX(curQ2) + 8}
              y={mapPToY(curP2)}
              fontSize="13"
              fill="#047857"
              fontWeight="bold"
            >
              {shift > 0 ? 'S₁ (เพิ่มขึ้น)' : shift < 0 ? 'S₂ (ลดลง)' : 'S (อุปทาน)'}
            </text>

            {/* Projection dashed lines for current (Q, P) */}
            <line
              x1="60"
              y1={currentY}
              x2={currentX}
              y2={currentY}
              stroke="#059669"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <line
              x1={currentX}
              y1={currentY}
              x2={currentX}
              y2="260"
              stroke="#059669"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />

            {/* Highlighted current Point dot */}
            <circle cx={currentX} cy={currentY} r="7" fill="#059669" />
            <circle cx={currentX} cy={currentY} r="11" fill="#059669" opacity="0.25" />

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
              <ArrowUpRight className="w-4 h-4 text-emerald-600" />
              ความชันเส้นอุปทาน: ทอดขึ้นจากซ้ายไปขวา (Positive Slope)
            </span>
            <span>กฎ: ราคาแปรผันตามกันโดยตรงกับปริมาณเสนอขาย</span>
          </div>
        </div>

        {/* Controls Deck */}
        <div className="lg:col-span-5 space-y-5">
          {/* Slider 1: Price */}
          <div className="p-4 bg-emerald-50/40 rounded-xl border border-emerald-200/80">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="supply-price-slider" className="text-sm font-semibold text-slate-800">
                1. ระดับราคาสินค้าในท้องตลาด (Price: P)
              </label>
              <span className="font-mono text-base font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-md">
                {price} บาท/ชิ้น
              </span>
            </div>
            <input
              id="supply-price-slider"
              type="range"
              min="20"
              max="80"
              step="5"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
              <span>20฿ (กำไรน้อย)</span>
              <span>50฿ (กำไรปานกลาง)</span>
              <span>80฿ (กำไรสูงมาก)</span>
            </div>
          </div>

          {/* Real-time outcome box */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              ผลลัพธ์การตัดสินใจของผู้ผลิต
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                <div className="text-xs text-slate-500">ปริมาณเสนอขาย (Qs)</div>
                <div className="text-xl font-bold text-slate-900 mt-0.5 font-mono">
                  {quantity} <span className="text-xs font-normal text-slate-500">ชิ้น</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                <div className="text-xs text-slate-500">รายรับรวมที่คาดหวัง (P × Q)</div>
                <div className="text-xl font-bold text-slate-900 mt-0.5 font-mono">
                  {(price * quantity).toLocaleString()}{' '}
                  <span className="text-xs font-normal text-slate-500">บาท</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-100 leading-relaxed">
              {price >= 65 ? (
                <span className="text-emerald-700 font-medium">
                  ★ สินค้าราคาสูง ผู้ผลิตมีแรงจูงใจจากผลกำไร จึงเร่งผลิตและนำออกขายมากถึง {quantity} ชิ้น ตามกฎของอุปทาน
                </span>
              ) : price <= 35 ? (
                <span className="text-amber-800 font-medium">
                  ▲ สินค้าราคาตกต่ำ ผู้ผลิตได้กำไรไม่คุ้มค่า จึงลดปริมาณเสนอขายลงเหลือเพียง {quantity} ชิ้น
                </span>
              ) : (
                <span>
                  ● ที่ระดับราคาปกติ {price} บาท ผู้ผลิตจัดสรรกำลังการผลิตขายที่ {quantity} ชิ้น
                </span>
              )}
            </div>
          </div>

          {/* Non-Price Shift Controls */}
          <div className="p-4 bg-white rounded-xl border border-slate-200">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>ทดลองเปลี่ยนปัจจัยกำหนดอุปทาน (Shift of Supply)</span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              เมื่อต้นทุน เทคโนโลยี หรือสภาพอากาศเปลี่ยนแปลง เส้นอุปทานจะขยับทั้งเส้น
            </p>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setShift(-20)}
                className={`px-2.5 py-2 text-xs font-medium rounded-lg border transition-all text-center ${
                  shift === -20
                    ? 'bg-emerald-100/90 text-emerald-900 border-emerald-300 font-semibold'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                ต้นทุนแพง / น้ำท่วม
                <div className="text-[10px] text-slate-500 mt-0.5">(เส้นเลื่อนซ้าย)</div>
              </button>

              <button
                type="button"
                onClick={() => setShift(0)}
                className={`px-2.5 py-2 text-xs font-medium rounded-lg border transition-all text-center ${
                  shift === 0
                    ? 'bg-emerald-100/90 text-emerald-900 border-emerald-300 font-semibold'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                สภาวะปกติ
                <div className="text-[10px] text-slate-500 mt-0.5">(เส้น S ปกติ)</div>
              </button>

              <button
                type="button"
                onClick={() => setShift(20)}
                className={`px-2.5 py-2 text-xs font-medium rounded-lg border transition-all text-center ${
                  shift === 20
                    ? 'bg-emerald-100/90 text-emerald-900 border-emerald-300 font-semibold'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                ใช้เทคโนโลยี / รัฐอุดหนุน
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
