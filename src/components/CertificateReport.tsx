import React from 'react';
import { QuizResult } from '../types';
import { CURRICULUM_INDICATOR } from '../data/lessonContent';
import { Printer, ArrowLeft, Award, CheckCircle2 } from 'lucide-react';
import academicSealImg from '../assets/images/academic_seal_1791717091622.jpg';

interface CertificateReportProps {
  result: QuizResult;
  onBackToLesson: () => void;
  onRetakeQuiz: () => void;
}

export const CertificateReport: React.FC<CertificateReportProps> = ({
  result,
  onBackToLesson,
  onRetakeQuiz,
}) => {
  const { studentInfo, score, totalQuestions, percentage, completedAt } = result;

  const handlePrint = () => {
    window.print();
  };

  const getEvaluationTitle = (score: number) => {
    if (score >= 9) return { grade: 'ดีเยี่ยม (Excellent)', color: 'text-amber-600', level: 'ผ่านเกณฑ์ระดับ 4 (ดีเยี่ยม)' };
    if (score >= 7) return { grade: 'ดีมาก (Very Good)', color: 'text-emerald-600', level: 'ผ่านเกณฑ์ระดับ 3 (ดีมาก)' };
    if (score >= 5) return { grade: 'ผ่านเกณฑ์มาตรฐาน (Passed)', color: 'text-sky-600', level: 'ผ่านเกณฑ์ระดับ 2 (ผ่าน)' };
    return { grade: 'ควรทบทวนเพิ่มเติม (Needs Review)', color: 'text-rose-600', level: 'ต่ำกว่าเกณฑ์ขั้นต่ำ' };
  };

  const evaluation = getEvaluationTitle(score);

  return (
    <div className="space-y-6">
      {/* Top action bar (hidden during print) */}
      <div className="print:hidden flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-xl border border-slate-200">
        <button
          type="button"
          onClick={onBackToLesson}
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับสู่บทเรียน</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRetakeQuiz}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            ทำแบบทดสอบใหม่อีกครั้ง
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>พิมพ์รายงาน / บันทึกเป็น PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Certificate & Official Academic Report */}
      <div className="bg-white p-8 sm:p-12 rounded-2xl border-2 border-amber-200 shadow-md print:border-none print:shadow-none print:p-0 max-w-4xl mx-auto relative overflow-hidden">
        {/* Subtle decorative background borders */}
        <div className="absolute inset-2 border border-amber-300/40 rounded-xl pointer-events-none"></div>
        <div className="absolute inset-3 border border-amber-200/40 rounded-lg pointer-events-none"></div>

        <div className="relative z-10 text-center space-y-6">
          {/* Header Seal & Institution */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-24 h-24 mb-3 rounded-full overflow-hidden border-2 border-amber-300 shadow-sm bg-amber-50">
              <img
                src={academicSealImg}
                alt="ตราสัญลักษณ์ความเป็นเลิศทางวิชาการ"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
              ใบรายงานผลการประเมินการเรียนรู้ออนไลน์
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              วิชาสังคมศึกษา ศาสนา และวัฒนธรรม (สาระเศรษฐศาสตร์)
            </h1>
            <div className="text-sm font-medium text-slate-600 mt-1">
              {CURRICULUM_INDICATOR.level} · หน่วยการเรียนรู้: กลไกราคา อุปสงค์ และอุปทาน
            </div>
          </div>

          {/* Curriculum Standard Badge Box */}
          <div className="max-w-2xl mx-auto p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl text-left text-xs leading-relaxed text-slate-700">
            <div className="font-semibold text-amber-900 flex items-center gap-1.5 mb-0.5">
              <Award className="w-4 h-4 text-amber-700" />
              <span>ตัวชี้วัดหลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน: {CURRICULUM_INDICATOR.standardCode}</span>
            </div>
            <div>&ldquo;{CURRICULUM_INDICATOR.standardText}&rdquo;</div>
          </div>

          {/* Student Info Box */}
          <div className="max-w-xl mx-auto py-4 border-y border-slate-200 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xs text-slate-500">ชื่อ - นามสกุล นักเรียน</div>
              <div className="text-base font-bold text-slate-900 mt-0.5">
                {studentInfo.fullName || 'ผู้เรียน ม.1'}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500">ระดับชั้น</div>
              <div className="text-base font-bold text-slate-900 mt-0.5">
                {studentInfo.gradeLevel || 'ม.1'}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500">เลขที่</div>
              <div className="text-base font-bold text-slate-900 mt-0.5 font-mono">
                {studentInfo.studentNumber || '-'}
              </div>
            </div>
          </div>

          {studentInfo.schoolName && (
            <div className="text-xs text-slate-500 -mt-3">
              โรงเรียน: <span className="font-medium text-slate-800">{studentInfo.schoolName}</span>
            </div>
          )}

          {/* Score & Evaluation Big Display */}
          <div className="py-2">
            <div className="text-xs text-slate-500 uppercase tracking-wider">คะแนนที่ได้</div>
            <div className="text-5xl font-black text-slate-900 mt-1 font-mono tracking-tight">
              {score} <span className="text-2xl font-bold text-slate-400">/ {totalQuestions}</span>
            </div>
            <div className="text-sm font-semibold text-slate-600 mt-1 font-mono">
              คิดเป็น {percentage}%
            </div>

            <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className={`text-sm font-bold ${evaluation.color}`}>
                ผลการประเมิน: {evaluation.grade}
              </span>
            </div>
          </div>

          {/* Standards Competencies Breakdown */}
          <div className="max-w-2xl mx-auto text-left pt-2">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              สรุปสมรรถนะที่ผ่านการประเมินในบทเรียนนี้:
            </div>
            <ul className="text-xs text-slate-600 space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>ระบุปัจจัยกำหนดอุปสงค์: ระดับรายได้และกำลังซื้อของผู้บริโภค (Consumer Income)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>ระบุปัจจัยกำหนดอุปสงค์: ราคาสินค้าทดแทนกัน (Substitute Goods) และราคาสินค้าประกอบกัน (Complementary Goods)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>ระบุปัจจัยกำหนดอุปสงค์: รสนิยม ค่านิยม กระแสความนิยม ฤดูกาล และการคาดคะเนราคาในอนาคต</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>ระบุปัจจัยกำหนดอุปทาน: ต้นทุนการผลิตและราคาปัจจัยการผลิต (Cost of Production)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>ระบุปัจจัยกำหนดอุปทาน: ความก้าวหน้าทางเทคโนโลยีและนวัตกรรมการผลิต (Technology)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>ระบุปัจจัยกำหนดอุปทาน: สภาพดินฟ้าอากาศ ภัยธรรมชาติ นโยบายรัฐบาล และจำนวนผู้ผลิตในตลาด</span>
              </li>
            </ul>
          </div>

          {/* Footer signature line */}
          <div className="pt-8 grid grid-cols-2 gap-8 text-center text-xs text-slate-500 border-t border-slate-100">
            <div>
              <div className="font-mono text-slate-700">{completedAt}</div>
              <div className="mt-1">วันที่ทำแบบทดสอบ</div>
            </div>
            <div>
              <div className="w-40 border-b border-slate-300 mx-auto pb-1 font-serif text-slate-700">
                EcoPlay System
              </div>
              <div className="mt-1">ระบบวัดและประเมินผลการเรียนรู้</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
