# CareerSarthi AI — Global Student Career Accelerator & Launchpad 🚀
> **All-in-One Global Career Platform for Students & Fresh Graduates** • Multilingual ATS Resume Studio, International Job Radar & Freelancing Launchpad.

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61dafb.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38bdf8.svg)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933.svg)](https://nodejs.org/)
[![Puppeteer](https://img.shields.io/badge/PDF%20Engine-Puppeteer%20Vector-40b5a4.svg)](https://pptr.dev/)
[![i18n](https://img.shields.io/badge/Multi--Language-MR%20%7C%20EN%20%7C%20HI%20%7C%20ES%20%7C%20DE%20%7C%20FR%20%7C%20JA-orange.svg)](#multi-language-support)

---

## 🌟 Key Highlights & Features

1. **📄 Live ATS Resume Studio & Vector PDF Engine**
   - Clean, standardized single-page A4 format designed to pass modern Applicant Tracking Systems (ATS).
   - High-resolution server-side PDF compilation powered by Headless Chromium & Puppeteer.
   - Dynamic ATS Score meter with real-time feedback and AI Polish capabilities.

2. **🌍 Multilingual Interface (i18n)**
   - Fully translated across **मराठी (Marathi)**, **English**, **हिंदी (Hindi)**, **Español (Spanish)**, **Deutsch (German)**, **Français (French)**, and **日本語 (Japanese)**.
   - Allows students across India and globally to navigate in their native language.

3. **💼 International Job & Internship Radar**
   - Curated listings for remote internships, junior software roles, and campus fresh-graduate positions.
   - Multi-currency salary display (`₹ INR`, `$ USD`, `€ EUR`, `£ GBP`).

4. **⚡ Student Freelancing Blueprint & Proposal Generator**
   - Instant client proposal generator for Upwork, Fiverr, and Contra.
   - Actionable guides on micro-gigs and hourly rate calculators.

5. **🚀 Interactive Engineering Career Roadmaps**
   - Milestone tracking for Frontend, Backend/Cloud, and AI Engineering domains.

---

## 🛠️ Architecture & Tech Stack

```
career-sarthi/
├── client/                     # Frontend (React 18 + Vite + Tailwind CSS + Lucide Icons)
│   ├── src/
│   │   ├── App.jsx             # Main interactive application with i18n & tabs
│   │   ├── main.jsx            # React root
│   │   └── index.css           # Tailwind base rules
│   ├── package.json
│   └── vite.config.js
├── server/                     # Backend API (Express.js)
│   ├── index.js                # REST API endpoints (/api/resume, /api/jobs, /api/freelance)
│   └── resumePdf.js            # Puppeteer high-resolution vector PDF generator
├── templates/
│   └── resume.html             # High-fidelity ATS-compliant HTML template
└── package.json                # Root orchestrator
```

---

## ⚡ Quick Start

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/vina-yak711/student-career-assist.git
cd student-career-assist

# Install root & backend dependencies
npm install

# Install frontend dependencies
cd client && npm install && cd ..
```

### 2. Start Development Servers
You can run the backend and client concurrently or separately:

**Option A: Run Concurrently**
```bash
npm run dev
```

**Option B: Run in Separate Terminals**
```bash
# Terminal 1: Backend API (Port 4000)
npm run server

# Terminal 2: Frontend Client (Port 5173)
cd client && npm run dev
```

Open **[http://localhost:5173](http://localhost:5173)** in your browser!

---

## 📜 License
This project is open source and available under the [MIT License](LICENSE).
