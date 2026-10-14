# EcoPlay ม.1: อุปสงค์และอุปทาน (Demand & Supply)

สื่อการสอนแบบอินเทอร์แอคทีฟวิชาสังคมศึกษา ศาสนา และวัฒนธรรม (สาระเศรษฐศาสตร์) ระดับชั้นมัธยมศึกษาปีที่ 1 (ม.1)  
**ตอบสนองตัวชี้วัด:** ส.3.2 ม.1/3 *"ระบุปัจจัยที่มีอิทธิพลต่อการกำหนดอุปสงค์และอุปทาน"*

---

## 🌟 จุดเด่นและฟีเจอร์สำคัญ (Features)

1. **โมเดลจำลองเชิงโต้ตอบ (Interactive Simulators):**
   - **หัวข้อที่ 1 อุปสงค์ (Demand Curve):** กราฟไดนามิกปรับระดับราคา (Price) ดูความต้องการซื้อตามกฎของอุปสงค์ (แปรผกผัน) พร้อมปุ่มจำลองการเลื่อนของเส้นอุปสงค์ (Shift of Demand)
   - **หัวข้อที่ 2 อุปทาน (Supply Curve):** กราฟไดนามิกปรับระดับราคาดูปริมาณเสนอขายตามกฎของอุปทาน (แปรผันตามกัน) พร้อมจำลองผลกระทบจากต้นทุนและเทคโนโลยี
   - **หัวข้อที่ 3 ดุลยภาพตลาด (Market Equilibrium):** จุดตัด $E$ ($Q_d = Q_s$) พร้อมจำลองภาวะสินค้าล้นตลาด (Surplus) และสินค้าขาดตลาด (Shortage)
2. **ห้องทดลองสถานการณ์เศรษฐกิจ (Scenario Lab):**
   - กรณีศึกษาเหตุการณ์จริงรอบตัว ให้นักเรียนฝึกคิดวิเคราะห์และเปิดดูเฉลยพร้อมเหตุผลทางเศรษฐศาสตร์
3. **ระบบเสียงบรรยายภาษาไทย (Audio Narration):**
   - มีปุ่มกดฟังเสียงบรรยายภาษาไทยในทุกหัวข้อและทุกข้อคำถาม
   - ควบคุมการเล่น/หยุดชั่วคราว ฟังซ้ำ และปรับความเร็วเสียงได้ (0.9x, 1.0x, 1.2x) ผ่าน Web Speech API
4. **แบบทดสอบออนไลน์ 10 ข้อ (Online Assessment):**
   - เน้นการวัดทักษะการระบุปัจจัยกำหนดอุปสงค์และอุปทานโดยตรง
   - ตรวจและสรุปคะแนนทันทีหลังทำเสร็จ พร้อมเฉลยและคำอธิบายละเอียดทุกข้อ
5. **ใบรายงานผลคะแนนและเกียรติบัตร (Certificate & Report Card):**
   - แสดงชื่อ-นามสกุล ชั้น เลขที่ โรงเรียน คะแนน และระดับการประเมิน
   - มีปุ่มพิมพ์รายงานหรือบันทึกเป็น PDF ที่จัดหน้าพิมพ์สะอาด สวยงาม

---

## 🚀 การติดตั้งและรันในเครื่อง (Local Development)

### ข้อกำหนดเบื้องต้น
- [Node.js](https://nodejs.org/) เวอร์ชัน 18.0 ขึ้นไป
- [npm](https://www.npmjs.com/)

### 1. โคลนคลังโค้ด (Clone Repository)
```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

### 2. ติดตั้ง Dependencies
```bash
npm install
```

### 3. รันเซิร์ฟเวอร์สำหรับพัฒนา (Development Server)
```bash
npm run dev
```
เปิดเบราว์เซอร์ไปที่ `http://localhost:3000` (หรือ URL ที่ปรากฏในเทอร์มินัล)

### 4. ตรวจสอบโค้ด (Lint)
```bash
npm run lint
```

### 5. บิลด์สำหรับ Production
```bash
npm run build
```
ไฟล์ที่พร้อมใช้งานจะอยู่ในโฟลเดอร์ `dist/`

### 6. พรีวิวไฟล์บิลด์
```bash
npm run preview
```

---

## 🌐 การเผยแพร่ขึ้น GitHub Pages (Deployment)

โปรเจกต์นี้มาพร้อมกับ **GitHub Actions Workflow** (`.github/workflows/deploy.yml`) ที่บิลด์และดีพลอยให้อัตโนมัติ:

1. นำโค้ดขึ้น GitHub:
   ```bash
   git add .
   git commit -m "feat: initial commit for EcoPlay M1 Demand & Supply"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. ไปที่หน้าคลังโค้ดของคุณบน GitHub:
   - คลิกเมนู **Settings** ➔ **Pages**
   - ในส่วน **Build and deployment** ➔ **Source** ให้เลือกเป็น **GitHub Actions**
3. เมื่อ Push โค้ดขึ้นไป GitHub Actions จะเริ่มทำงานและสร้างเว็บไซต์ให้โดยอัตโนมัติ เข้าชมได้ที่:
   `https://<your-username>.github.io/<your-repo-name>/`

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **Frontend:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Bundler:** [Vite 8](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Effects & Audio:** [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti), Web Speech API (th-TH)
- **CI/CD:** GitHub Actions (Deploy to GitHub Pages)

---

## 📄 ลิขสิทธิ์ (License)
สื่อการเรียนรู้นี้จัดทำขึ้นเพื่อการศึกษาตามหลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน พุทธศักราช 2551 (ฉบับปรับปรุง)
