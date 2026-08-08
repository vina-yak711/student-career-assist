# 🚀 VynkAI CareerForge — Global Student Career Accelerator

[![Live Demo](https://img.shields.io/badge/Live_Demo-client--rust--ten--69.vercel.app-00DC82?style=for-the-badge&logo=vercel&logoColor=white)](https://client-rust-ten-69.vercel.app)
[![GitHub Actions CI](https://img.shields.io/badge/CI%2FCD-Passing-brightgreen?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/vina-yak711/student-career-assist/actions)
[![Firebase Cloud](https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

> **An authentic, full-width, edge-to-edge career platform engineered for software and engineering students worldwide.** Build ATS-compliant 7-section resumes, upload `.pdf` resumes for automated AI skill extraction and job matching, generate high-impact outreach cold emails, and explore verified engineering opportunities with live application deadlines.

---

## 🌐 Official Global Live Links

* **Primary Production URL:** **[https://client-rust-ten-69.vercel.app](https://client-rust-ten-69.vercel.app)**
* **Alternative Domain Alias:** **[https://client-theta-ten-85.vercel.app](https://client-theta-ten-85.vercel.app)**
* **GitHub Repository:** **[https://github.com/vina-yak711/student-career-assist](https://github.com/vina-yak711/student-career-assist)**

---

## ✨ Core Feature Highlights

### 1. 🤖 AI Resume Scanner & Automated Job Matcher
* **Universal File Support:** Directly upload `.pdf`, `.txt`, `.json`, `.md`, or paste raw resume text.
* **Instant Skill Extraction:** Detects technical keywords across React, Python, Machine Learning, Android, SQL, Cloud, DevOps, and Cyber Security.
* **AI Match Score:** Quantifies percentage compatibility (e.g. *96% Match: Frontend UI/UX Engineer*, *94% Match: AI Software Intern*).
* **1-Click Filter:** Filters the global job catalog to show only openings matching your resume profile.

### 2. 📄 Professional 7-Section ATS Resume Studio
* **Engineering Standard Multi-Section Layout:**
  1. Personal & Contact Information
  2. Professional Summary & Career Motto
  3. Education & Academic Background
  4. Industrial Training & Corporate Experience
  5. Key Projects & Technical Domains
  6. Categorized Technical Skills (Languages, Frameworks, Core Domains)
  7. Hackathons, Honors & Accomplishments
* **Real-time A4 Canvas:** Zero placeholder tokens—live synchronization with your candidate data.
* **Vector PDF & Print Engine:** High-definition Puppeteer vector PDF generator and native browser print integration.
* **Profile Backup:** Export and import profile data in structured JSON format.

### 3. 💼 Multi-Domain Engineering Jobs & Internships Radar
* **10+ Curated Engineering Disciplines:**
  * AI & Full Stack Web Development
  * Mobile & Native Android Engineering (Kotlin)
  * Frontend UI/UX & React Engineering
  * Cloud Infrastructure, AWS & DevOps (Docker/Kubernetes)
  * Cyber Security & Penetration Testing
  * Data Science & Business Intelligence (Pandas/SQL/Tableau)
  * Java Backend & Microservices (Spring Boot)
  * Embedded Systems & IoT Firmware (C/C++/ESP32)
  * QA Automation & Test Engineering (Selenium/Cypress)
* **Real-Time Deadlines:** Every listing shows posting age (*Posted 2 hours ago*), active application window (*Deadline: Sep 15, 2026*), and direct verified apply links.

### 4. ✉️ AI Cold Email & Outreach Pitch Generator
* Tailored email builder designed to reach Tech Leads, Founders, and Hiring Managers.
* Generates polished outreach messages highlighting candidate skills, GitHub portfolio, and contact info in 1 click.

### 5. 💰 Student Freelance Hub & Rate Calculator
* Interactive hourly rate and monthly side-income projection estimator.
* Instant proposal template generator for React, Android, and Automated Document APIs on Upwork, Fiverr, and Contra.

### 6. 🎯 Roadmaps & 50+ Technical Interview Flashcards
* Interactive flashcards covering React Fiber Reconciliation, Machine Learning paradigms, JavaScript Event Loop, and OS/Networking concepts.

### 7. 🌍 7 Global Languages Support
* 🇬🇧 **English**
* 🇮🇳 **मराठी (Marathi)**
* 🇮🇳 **हिंदी (Hindi)**
* 🇪🇸 **Español (Spanish)**
* 🇫🇷 **Français (French)**
* 🇩🇪 **Deutsch (German)**
* 🇯🇵 **日本語 (Japanese)**

### 8. 🌙 Sleek Dark & Clean Light Themes
* 100% full-screen fluid layout (`w-full`) eliminating all awkward side gutters on mobile, tablet, and ultra-wide displays.
* 1-click theme switcher with smooth transitions.

### 9. 🔐 Firebase Google Auth & Firestore Cloud Sync
* One-click Google Sign-In (`firebase/auth`).
* Instant cloud persistence (`firebase/firestore`) with automated local storage failover.

---

## 🛠️ Architecture & Tech Stack

```
student-career-assist/
├── client/                     # Vite + React Frontend SPA
│   ├── src/
│   │   ├── App.jsx             # Main Edge-to-Edge Responsive UI & Dashboard
│   │   ├── firebase.js         # Firebase Auth & Cloud Firestore Integration
│   │   ├── pdfParser.js        # Client-side PDF Text Extraction (pdfjs-dist)
│   │   ├── index.css           # Tailwind CSS & Typography
│   │   └── main.jsx            # React Entry Point
│   ├── vercel.json             # SPA Routing & Rewrite Rules
│   └── package.json            # Frontend Dependencies
├── server/                     # Node.js & Express Backend
│   ├── index.js                # ATS Compilation & AI Endpoints
│   ├── resumePdf.js            # Puppeteer Vector PDF Compiler
│   └── package.json            # Server Dependencies
├── .github/workflows/          # GitHub Actions Automated CI/CD
│   └── daily-health.yml        # Daily Repository Health Check Workflow
├── vercel.json                 # Monorepo Deployment Config
└── README.md                   # Project Documentation
```

### Technology Breakdown
* **Frontend:** React 18, Vite, Tailwind CSS, Lucide React Icons, PDF.js (`pdfjs-dist`), Axios
* **Backend:** Node.js, Express, Puppeteer (PDF Rendering), CORS
* **Database & Auth:** Google Firebase Authentication, Google Cloud Firestore
* **Hosting & CI/CD:** Vercel (Global Edge CDN), GitHub Actions

---

## 🚀 Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/vina-yak711/student-career-assist.git
cd student-career-assist
```

### 2. Install Dependencies
```bash
# Install root, backend, and frontend dependencies
npm run build
```

### 3. Run the Development Servers
```bash
# Start backend server (Port 4000)
node server/index.js

# In a separate terminal, start frontend dev server (Port 5173)
cd client
npm run dev
```

Visit **`http://localhost:5173`** in your browser.

---

## ☁️ Deployment

### Deploy to Vercel (Frontend)
1. Push code to GitHub repository.
2. Import repository in **[Vercel Dashboard](https://vercel.com/new)**.
3. Select `client` folder or keep root settings (`vercel.json` automatically configures Vite build).
4. Click **Deploy**.

---

## 👨‍💻 Author & Contributions

* **Creator:** [Vinayak](https://github.com/vina-yak711)
* **GitHub Profile:** [@vina-yak711](https://github.com/vina-yak711)
* **License:** This project is licensed under the [MIT License](LICENSE).

---

⭐ **If you found this project helpful, please consider starring the repository on GitHub!**
