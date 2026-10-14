import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { CURRICULUM_INDICATOR } from '../data/lessonContent';
import { StudentInfo, QuizResult } from '../types';
import { AudioPlayerButton } from './AudioPlayerButton';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  FileCheck,
  RotateCcw,
  User,
  GraduationCap,
  Award,
} from 'lucide-react';

interface QuizSectionProps {
  onViewCertificate: (result: QuizResult) => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ onViewCertificate }) => {
  // Student registration state
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    fullName: '',
    gradeLevel: 'ม.1/1',
    studentNumber: '1',
    schoolName: '',
  });
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  // Quiz running state
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    new Array(QUIZ_QUESTIONS.length).fill(-1)
  );
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentInfo.fullName.trim()) return;
    setHasStarted(true);
  };

  const handleSelectOption = (optIdx: number) => {
    if (submitted) return;
    const nextAnswers = [...selectedAnswers];
    nextAnswers[currentIdx] = optIdx;
    setSelectedAnswers(nextAnswers);
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    selectedAnswers.forEach((ans, idx) => {
      if (ans === QUIZ_QUESTIONS[idx].correctIndex) {
        score += 1;
      }
    });

    const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    const dateStr = new Date().toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const finalResult: QuizResult = {
      score,
      totalQuestions: QUIZ_QUESTIONS.length,
      percentage,
      completedAt: dateStr,
      studentInfo,
      userAnswers: selectedAnswers,
      passed: score >= 5,
    };

    setResult(finalResult);
    setSubmitted(true);

    if (score >= 7) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers(new Array(QUIZ_QUESTIONS.length).fill(-1));
    setCurrentIdx(0);
    setSubmitted(false);
    setResult(null);
  };

  // Step 1: Registration Form
  if (!hasStarted) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-linear-to-r from-amber-50/50 via-white to-white">
          <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4" />
            <span>แบบทดสอบวัดผลสัมฤทธิ์ทางการเรียนรู้</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">
            แบบทดสอบออนไลน์: อุปสงค์ อุปทาน ม.1
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            ตัวชี้วัด {CURRICULUM_INDICATOR.standardCode}: {CURRICULUM_INDICATOR.standardText}
          </p>
        </div>

        <form onSubmit={handleStart} className="p-6 space-y-5">
          <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200/70 text-xs text-amber-900 leading-relaxed">
            <strong>คำชี้แจง:</strong> แบบทดสอบปรนัยจำนวน 10 ข้อ เกณฑ์ผ่านร้อยละ 50 (5 คะแนนขึ้นไป)
            เมื่อทำเสร็จระบบจะสรุปคะแนนทันที พร้อมวิเคราะห์ข้อถูก-ผิด และออกใบรายงานผลการประเมิน
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                ชื่อ - นามสกุล นักเรียน <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="เช่น ด.ช. ภัทรพล ทวีทรัพย์"
                  value={studentInfo.fullName}
                  onChange={(e) =>
                    setStudentInfo({ ...studentInfo, fullName: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-amber-600 focus:bg-white transition-all pl-10"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ระดับชั้น <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น ม.1/2"
                  value={studentInfo.gradeLevel}
                  onChange={(e) =>
                    setStudentInfo({ ...studentInfo, gradeLevel: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-amber-600 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  เลขที่ <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น 14"
                  value={studentInfo.studentNumber}
                  onChange={(e) =>
                    setStudentInfo({ ...studentInfo, studentNumber: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-amber-600 focus:bg-white transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                โรงเรียน (ระบุหรือไม่ระบุก็ได้)
              </label>
              <input
                type="text"
                placeholder="เช่น โรงเรียนสาธิตฯ"
                value={studentInfo.schoolName}
                onChange={(e) =>
                  setStudentInfo({ ...studentInfo, schoolName: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-amber-600 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>เริ่มทำแบบทดสอบ 10 ข้อ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Step 3: Result Summary Screen
  if (submitted && result) {
    const answeredCount = selectedAnswers.filter((a) => a !== -1).length;

    return (
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Score Card Header */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-full text-xs font-semibold">
            <Award className="w-4 h-4 text-amber-700" />
            <span>ผลการประเมินวิชาสังคมศึกษา ม.1</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            สรุปผลคะแนนแบบทดสอบออนไลน์
          </h2>

          <div className="text-xs text-slate-500">
            นักเรียน: <strong className="text-slate-800">{studentInfo.fullName}</strong> ·
            ชั้น: <strong className="text-slate-800">{studentInfo.gradeLevel}</strong> ·
            เลขที่: <strong className="text-slate-800 font-mono">{studentInfo.studentNumber}</strong>
          </div>

          {/* Big Score Counter */}
          <div className="py-4">
            <div className="text-6xl font-black text-slate-900 font-mono tracking-tight">
              {result.score}{' '}
              <span className="text-2xl font-bold text-slate-400">/ {result.totalQuestions}</span>
            </div>
            <div className="text-sm font-semibold text-slate-600 mt-1 font-mono">
              คิดเป็น {result.percentage}% · ตอบถูก {result.score} จาก {answeredCount} ข้อที่ตอบ
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onViewCertificate(result)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <FileCheck className="w-4 h-4" />
              <span>ดูใบรายงานคะแนน & เกียรติบัตรทางการ</span>
            </button>

            <button
              type="button"
              onClick={handleResetQuiz}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-xl transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>ทำแบบทดสอบใหม่อีกครั้ง</span>
            </button>
          </div>
        </div>

        {/* Detailed Review for All Questions */}
        <div className="space-y-4">
          <div className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <span>เฉลยคำตอบพร้อมคำอธิบายละเอียด (10 ข้อ)</span>
          </div>

          <div className="space-y-4">
            {QUIZ_QUESTIONS.map((q, idx) => {
              const userAns = selectedAnswers[idx];
              const isCorrect = userAns === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className={`p-5 bg-white rounded-xl border transition-all ${
                    isCorrect
                      ? 'border-emerald-200/90 shadow-2xs'
                      : 'border-rose-200/90 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-400">
                        ข้อที่ {idx + 1}
                      </span>
                      <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {q.competencyTag}
                      </span>
                    </div>

                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        ถูกต้อง (+1)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                        <XCircle className="w-3.5 h-3.5" />
                        ยังไม่ถูกต้อง (0)
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mb-3">{q.question}</h4>

                  {/* Options List */}
                  <div className="space-y-1.5 mb-3">
                    {q.options.map((opt, optIdx) => {
                      const isChosen = userAns === optIdx;
                      const isTheRightOne = optIdx === q.correctIndex;

                      let optStyle = 'bg-slate-50 text-slate-700 border-slate-200';
                      if (isTheRightOne) {
                        optStyle = 'bg-emerald-50 text-emerald-900 border-emerald-300 font-medium';
                      } else if (isChosen && !isTheRightOne) {
                        optStyle = 'bg-rose-50 text-rose-900 border-rose-300 line-through';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${optStyle}`}
                        >
                          <span>
                            {String.fromCharCode(65 + optIdx)}. {opt}
                          </span>
                          {isTheRightOne && (
                            <span className="text-[10px] text-emerald-700 font-bold ml-2">
                              คำตอบที่ถูกต้อง
                            </span>
                          )}
                          {isChosen && !isTheRightOne && (
                            <span className="text-[10px] text-rose-700 font-bold ml-2">
                              คำตอบที่คุณเลือก
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation box */}
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-600 leading-relaxed">
                    <strong className="text-slate-800">คำอธิบายหลักเศรษฐศาสตร์:</strong>{' '}
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Quiz in progress
  const answeredCount = selectedAnswers.filter((a) => a !== -1).length;
  const progressPercent = Math.round(((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100);

  const qSpeechText = `ข้อที่ ${currentIdx + 1}. ${currentQ.question}. ตัวเลือก A: ${currentQ.options[0]}. ตัวเลือก B: ${currentQ.options[1]}. ตัวเลือก C: ${currentQ.options[2]}. ตัวเลือก D: ${currentQ.options[3]}`;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Top Banner with Progress & Audio */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            ข้อ {currentIdx + 1} จาก {QUIZ_QUESTIONS.length}
          </div>
          <span className="text-xs text-slate-400">·</span>
          <div className="text-xs text-slate-600">
            นักเรียน: <span className="font-semibold text-slate-800">{studentInfo.fullName}</span> (
            {studentInfo.gradeLevel} เลขที่ {studentInfo.studentNumber})
          </div>
        </div>

        <AudioPlayerButton textToSpeak={qSpeechText} label="ฟังโจทย์ข้อนี้" />
      </div>

      {/* Progress Line */}
      <div className="w-full bg-slate-100 h-1.5">
        <div
          className="bg-amber-600 h-1.5 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <div className="p-6 sm:p-8 space-y-6">
        <div>
          <div className="text-xs font-medium text-amber-700 mb-1.5">
            ตัวชี้วัด {CURRICULUM_INDICATOR.standardCode} · {currentQ.competencyTag}
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {currentQ.question}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt, optIdx) => {
            const isSelected = selectedAnswers[currentIdx] === optIdx;
            return (
              <button
                key={optIdx}
                type="button"
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-50/90 border-amber-400 text-amber-950 font-medium shadow-xs'
                    : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-100/80 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono shrink-0 ${
                      isSelected
                        ? 'bg-amber-600 text-white'
                        : 'bg-white text-slate-500 border border-slate-300'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span>{opt}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation buttons */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="px-4 py-2 text-xs font-medium rounded-lg text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            ข้อก่อนหน้า
          </button>

          <div className="flex items-center gap-1.5">
            {QUIZ_QUESTIONS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIdx(i)}
                className={`w-7 h-7 rounded-lg text-xs font-mono font-medium transition-colors ${
                  i === currentIdx
                    ? 'bg-amber-600 text-white font-bold'
                    : selectedAnswers[i] !== -1
                    ? 'bg-amber-100 text-amber-900 font-medium'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {currentIdx === QUIZ_QUESTIONS.length - 1 ? (
            <button
              type="button"
              onClick={handleSubmitQuiz}
              disabled={answeredCount === 0}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs font-medium rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              ส่งแบบทดสอบ ({answeredCount}/{QUIZ_QUESTIONS.length})
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              ข้อถัดไป
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
