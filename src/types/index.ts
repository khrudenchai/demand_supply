export interface StudentInfo {
  fullName: string;
  gradeLevel: string; // e.g. "ม.1/1"
  studentNumber: string; // e.g. "15"
  schoolName?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  scenario?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  competencyTag: string; // e.g. "อุปสงค์และกำลังซื้อ", "กฎอุปสงค์", "ปัจจัยกำหนดอุปสงค์", "อุปทาน", "กฎอุปทาน", "ปัจจัยกำหนดอุปทาน", "ดุลยภาพตลาด"
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
  studentInfo: StudentInfo;
  userAnswers: number[];
  passed: boolean;
}

export interface FactorItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  realWorldExample: string;
  effectExplanation: string;
  tag: string;
  iconName: string;
}

export type ActiveTab = 'overview' | 'demand' | 'supply' | 'equilibrium' | 'scenarios' | 'quiz' | 'certificate';
