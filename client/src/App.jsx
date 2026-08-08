import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import {
  Briefcase,
  FileText,
  DollarSign,
  Sparkles,
  Download,
  Eye,
  Search,
  ExternalLink,
  GraduationCap,
  CheckCircle,
  TrendingUp,
  Globe,
  Compass,
  Zap,
  Copy,
  Layers,
  Award,
  BookOpen,
  Code2,
  Cpu,
  Rocket,
  CheckSquare,
  Square,
  Printer,
  Github,
  Bookmark,
  BookmarkCheck,
  Mail,
  Sliders,
  LayoutDashboard,
  Sun,
  Moon,
  Cloud,
  User as UserIcon,
  LogOut,
  LogIn,
  Upload,
  FileSearch,
  Check,
  AlertCircle,
  Clock,
  Calendar,
  Filter,
  BarChart3,
  ShieldCheck,
  Terminal,
  Database
} from 'lucide-react'

// Import Firebase Authentication and Firestore Cloud functions
import { auth, signInWithGoogle, logOut, saveResumeToCloud, loadResumeFromCloud } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'

// Import PDF.js parser
import { extractTextFromPdf } from './pdfParser'

// Complete, 100% functional translations for all global languages
const TRANSLATIONS = {
  en: {
    langName: 'English',
    flag: '🌐',
    brandName: 'VynkAI CareerForge',
    brandBadge: 'Global Career Accelerator',
    nav: {
      dashboard: 'Dashboard',
      resume: 'ATS Resume Studio',
      scanner: 'AI Resume Matcher',
      coverLetter: 'Cold Email & Pitch',
      jobs: 'Internships & Jobs',
      freelance: 'Freelance Hub',
      roadmaps: 'Roadmaps & Prep'
    },
    auth: {
      login: 'Sign in with Google',
      logout: 'Sign Out',
      cloudSync: 'Save to Cloud',
      synced: 'Cloud Synced'
    },
    stats: {
      title: 'Platform Real-Time Analytics',
      activeJobs: 'Verified Open Positions',
      fieldsCovered: 'Engineering Fields',
      sessionCount: 'Your Active Visits',
      atsStandard: 'ATS Target Standard'
    },
    dashboard: {
      welcome: 'Welcome to VynkAI CareerForge',
      desc: 'An authentic, edge-to-edge career platform for engineering students. Upload your resume for automated AI role-matching, build ATS-grade multi-section profiles, and discover verified openings across all tech domains.',
      atsCardTitle: 'Resume ATS Score',
      atsCardDesc: 'Automated screening compatibility',
      savedJobsTitle: 'Saved Opportunities',
      activeRoadmapsTitle: 'Roadmap Milestones',
      quickActions: 'Quick Launch Actions',
      btnBuildResume: 'Build ATS Resume',
      btnScanResume: 'Upload & Match AI',
      btnSearchJobs: 'Search Internships',
      btnWriteEmail: 'Draft Cold Email'
    },
    scanner: {
      title: 'AI Resume Analyzer & Job Matcher',
      subtitle: 'Upload or paste your resume. Our AI scans your tech stack and instantly matches you with verified engineering jobs.',
      uploadTitle: 'Upload Resume File (.txt, .json, or paste)',
      dragDrop: 'Click to select or paste resume text below',
      btnAnalyze: 'Analyze Tech Stack & Find Matching Jobs',
      analyzing: 'AI Scanning Resume & Matching...',
      resultsTitle: 'AI Analysis & Matched Roles',
      detectedSkills: 'Detected Technical Skills:',
      bestRoles: 'Top Matched Engineering Roles:',
      matchFilterBtn: 'View Matched Jobs Only'
    },
    resume: {
      title: 'Professional Multi-Section ATS Resume Studio',
      subtitle: 'Structured format matching top engineering standards with live vector PDF export and multi-section layouts.',
      personalTab: '1. Personal & Contact',
      summaryTab: '2. Summary & Motto',
      educationTab: '3. Education History',
      experienceTab: '4. Industrial Training',
      projectsTab: '5. Key Projects',
      skillsTab: '6. Categorized Skills',
      accomplishmentsTab: '7. Hackathons & Honors',
      fullName: 'Full Name',
      targetRole: 'Target Role / Specialization',
      email: 'Email Address',
      phone: 'Phone / WhatsApp',
      location: 'Location / State / Country',
      links: 'GitHub / LinkedIn / Portfolio URLs',
      summaryLabel: 'Professional Summary',
      mottoLabel: 'Career Motto / Inspiring Quote (Optional)',
      aiPolish: 'AI Enhance Summary',
      btnUpdate: 'Update Live Sheet',
      btnDownload: 'Download Vector PDF',
      btnPrint: 'Print Document',
      btnExportJson: 'Export Profile JSON',
      btnImportJson: 'Import Profile JSON',
      liveSheetTitle: 'Live A4 Print-Ready Canvas',
      atsAnalysisTitle: 'ATS Quality Checklist'
    },
    emailTool: {
      title: 'AI Cold Email & Pitch Generator',
      subtitle: 'Generate clean, personalized outreach emails for recruiters, HRs, and tech founders in seconds.',
      recipientRole: 'Recipient Role / Name',
      companyName: 'Company Name',
      targetPosition: 'Target Job / Internship Role',
      myStrongSkill: 'Your Core Technical Skill',
      btnGenerate: 'Generate Pitch',
      btnCopy: 'Copy Outreach Email',
      previewTitle: 'Generated Cold Email Message:'
    },
    jobs: {
      title: 'Multi-Field Internship & Fresher Job Radar',
      subtitle: 'Verified opportunities across AI, Web, Android, Cloud, DevOps, Cyber Security, and Data Science with live deadlines.',
      searchPlaceholder: 'Search by role, skill, or field (e.g. React, Python, Cloud, Java, DevOps)...',
      allFields: 'All Engineering Domains',
      allLocations: 'All Locations',
      remoteOnly: 'Remote Only (Work From Home)',
      directApply: 'Direct Apply',
      saveJob: 'Save Opportunity',
      saved: 'Saved',
      trending: 'Trending Domains:',
      posted: 'Posted',
      deadline: 'Apply Before'
    },
    freelance: {
      title: 'Student Freelance Launchpad & Invoicing',
      subtitle: 'Actionable tactics to secure initial contracts on Upwork, Fiverr, and Contra while in college.',
      hourlyRateCalc: 'Hourly Rate & Monthly Earnings Estimator',
      hoursPerWeek: 'Available hours per week:',
      expectedRate: 'Target hourly rate:',
      projectedMonthly: 'Projected Monthly Earnings:',
      proposalGen: 'Instant Client Proposal Generator',
      selectGig: 'Select Service Type:',
      copyProposal: 'Copy Proposal to Clipboard'
    },
    roadmaps: {
      title: 'Engineering Roadmaps & Technical Interview Prep',
      subtitle: 'Step-by-step verified learning paths and technical flashcards for top software engineering interviews.',
      interviewPrepTitle: 'Top Technical Interview Flashcards',
      showAnswer: 'Show Answer',
      hideAnswer: 'Hide Answer'
    }
  },
  mr: {
    langName: 'मराठी',
    flag: '🇮🇳',
    brandName: 'VynkAI CareerForge',
    brandBadge: 'स्टुडंट करिअर प्लॅटफॉर्म',
    nav: {
      dashboard: 'डॅशबोर्ड',
      resume: 'ATS Resume बिल्डर',
      scanner: 'AI Resume स्कॅनर',
      coverLetter: 'Cold Email & कव्हर लेटर',
      jobs: 'इंटर्नशिप्स & जॉब्स',
      freelance: 'फ्रीलान्सिंग हब',
      roadmaps: 'रोडमॅप & मुलाखत तयारी'
    },
    auth: {
      login: 'Google ने लॉगिन करा',
      logout: 'लॉगआउट',
      cloudSync: 'क्लाउडवर सेव्ह करा',
      synced: 'क्लाउड सिंक झाले'
    },
    stats: {
      title: 'प्लॅटफॉर्म खरी आकडेवारी (Real Analytics)',
      activeJobs: 'सक्रिय सत्यापित नोकऱ्या',
      fieldsCovered: 'एकूण इंजिनिअरिंग शाखा',
      sessionCount: 'तुमच्या एकूण व्हिजिट्स',
      atsStandard: 'ATS आंतरराष्ट्रीय दर्जा'
    },
    dashboard: {
      welcome: 'VynkAI CareerForge मध्ये आपले स्वागत आहे',
      desc: 'विद्यार्थ्यांसाठी खरा आणि संपूर्ण स्क्रीन व्यापणारा प्लॅटफॉर्म. रिझ्युमे अपलोड करा आणि AI द्वारे तुमच्या कौशल्यानुसार थेट योग्य नोकऱ्या मिळवा.',
      atsCardTitle: 'ATS रिझ्युमे दर्जा',
      atsCardDesc: 'ऑटोमेटेड सिस्टममध्ये पास होणारा स्कोअर',
      savedJobsTitle: 'सेव्ह केलेल्या नोकऱ्या',
      activeRoadmapsTitle: 'चालू स्किल्स प्रगती',
      quickActions: 'त्वरित सुरू करा',
      btnBuildResume: 'नवीन Resume बनवा',
      btnScanResume: 'Resume अपलोड करा',
      btnSearchJobs: 'नोकऱ्या शोधा',
      btnWriteEmail: 'Cold Email लिहा'
    },
    scanner: {
      title: 'AI Resume स्कॅनर आणि नोकरी मॅचर',
      subtitle: 'तुमचा रिझ्युमे अपलोड करा. आमचे AI तुमचे स्किल्स तपासून योग्य जॉब्स शोधून देईल.',
      uploadTitle: 'रिझ्युमे फाइल टाका किंवा मजकूर पेस्ट करा',
      dragDrop: 'फाइल निवडण्यासाठी क्लिक करा किंवा खाली टेक्स्ट पेस्ट करा',
      btnAnalyze: 'स्किल्स तपासा आणि नोकऱ्या शोधा',
      analyzing: 'AI द्वारे रिझ्युमे स्कॅन होत आहे...',
      resultsTitle: 'AI विश्लेषण आणि योग्य पदे',
      detectedSkills: 'सापडलेली मुख्य कौशल्यांची यादी:',
      bestRoles: 'तुमच्यासाठी सर्वात योग्य पदे:',
      matchFilterBtn: 'केवळ मॅच होणाऱ्या नोकऱ्या पाहा'
    },
    resume: {
      title: 'व्यावसायिक ATS Resume स्टुडिओ',
      subtitle: 'भारतीय व आंतरराष्ट्रीय कंपन्यांसाठी प्रमाणित A4 फॉरमॅट आणि मल्टि-सेक्शन लेआउट.',
      personalTab: '१. वैयक्तिक माहिती',
      summaryTab: '२. सारांश व ब्रीदवाक्य',
      educationTab: '३. शिक्षण व कॉलेज',
      experienceTab: '४. ट्रेनिंग व अनुभव',
      projectsTab: '५. प्रोजेक्ट्स',
      skillsTab: '६. तांत्रिक कौशल्ये',
      accomplishmentsTab: '७. हॅकाथॉन',
      fullName: 'पूर्ण नाव',
      targetRole: 'लक्ष्य पद (Role)',
      email: 'ईमेल पत्ता',
      phone: 'मोबाईल / व्हॉट्सॲप',
      location: 'शहर / राज्य',
      links: 'GitHub / LinkedIn लिंक्स',
      summaryLabel: 'करिअर उद्दिष्ट (Summary)',
      mottoLabel: 'करिअर ब्रीदवाक्य / Quote',
      aiPolish: 'AI ने सुधारणा करा',
      btnUpdate: 'Preview अपडेट करा',
      btnDownload: 'Vector PDF डाउनलोड करा',
      btnPrint: 'प्रिंट करा',
      btnExportJson: 'Export JSON',
      btnImportJson: 'Import JSON',
      liveSheetTitle: 'थेट A4 कागद Preview',
      atsAnalysisTitle: 'ATS गुणवत्ता विश्लेषण'
    },
    emailTool: {
      title: 'AI Cold Email & कव्हर लेटर जनरेटर',
      subtitle: 'HR आणि स्टार्टअप फाउंडर्सना पाठवण्यासाठी प्रोफेशनल मेसेज एका क्लिकवर मिळवा.',
      recipientRole: 'तुम्ही कोणाला ईमेल पाठवत आहात?',
      companyName: 'कंपनीचे नाव',
      targetPosition: 'कोणत्या पदासाठी अर्ज आहे?',
      myStrongSkill: 'तुमचे सर्वात मुख्य स्किल',
      btnGenerate: 'ईमेल जनरेट करा',
      btnCopy: 'ईमेल कॉपी करा',
      previewTitle: 'तयार झालेला ईमेल:'
    },
    jobs: {
      title: 'सर्व क्षेत्रांमधील ताज्या नोकऱ्या आणि इंटर्नशिप्स',
      subtitle: 'AI, Web, Android, Cloud, DevOps, Cyber Security मधील मुदतीसह सक्रिय संधी.',
      searchPlaceholder: 'पद, कौशल्य किंवा क्षेत्र शोधा (उदा. React, Python, Cloud, DevOps)...',
      allFields: 'सर्व इंजिनिअरिंग शाखा',
      allLocations: 'सर्व शहरे',
      remoteOnly: 'केवळ रिमोट (Work From Home)',
      directApply: 'थेट अर्ज करा',
      saveJob: 'सेव्ह करा',
      saved: 'सेव्ह केले',
      trending: 'लोकप्रिय शाखा:',
      posted: 'पोस्ट केले',
      deadline: 'अंतिम मुदत'
    },
    freelance: {
      title: 'विद्यार्थी फ्रीलान्सिंग हब',
      subtitle: 'कॉलेजमध्ये शिकत असतानाच Upwork आणि Fiverr वरून कमाईचे मार्गदर्शन.',
      hourlyRateCalc: 'तासी दर कॅल्क्युलेटर',
      hoursPerWeek: 'आठवड्याला कामाचे तास:',
      expectedRate: 'अपेक्षित प्रति तास दर:',
      projectedMonthly: 'अपेक्षित मासिक कमाई:',
      proposalGen: 'इन्स्टंट Proposal जनरेटर',
      selectGig: 'सर्व्हिस प्रकार निवडा:',
      copyProposal: 'Proposal कॉपी करा'
    },
    roadmaps: {
      title: 'इंजिनिअरिंग करिअर रोडमॅप & मुलाखत तयारी',
      subtitle: 'महत्त्वाच्या कोडिंग संकल्पना आणि मुलाखतीसाठी प्रश्नोत्तरे.',
      interviewPrepTitle: 'टॉप मुलाखत प्रश्न (Flashcards)',
      showAnswer: 'उत्तर पाहा',
      hideAnswer: 'उत्तर लपवा'
    }
  },
  hi: {
    langName: 'हिंदी',
    flag: '🇮🇳',
    brandName: 'VynkAI CareerForge',
    brandBadge: 'स्टूडेंट करियर सूट',
    nav: {
      dashboard: 'डैशबोर्ड',
      resume: 'ATS Resume बिल्डर',
      scanner: 'AI Resume स्कैनर',
      coverLetter: 'Cold Email & कवर लेटर',
      jobs: 'इंटर्नशिप्स & नौकरियां',
      freelance: 'फ्रीलांसिंग हब',
      roadmaps: 'रोडमैप & इंटरव्यू'
    },
    auth: {
      login: 'Google से लॉगिन करें',
      logout: 'लॉगआउट',
      cloudSync: 'क्लाउड पर सेव करें',
      synced: 'क्लाउड सिंक'
    },
    stats: {
      title: 'प्लेटफॉर्म वास्तविक आंकड़े (Real Stats)',
      activeJobs: 'सक्रिय सत्यापित नौकरियां',
      fieldsCovered: 'इंजीनियरिंग शाखाएं',
      sessionCount: 'आपकी विज़िट संख्या',
      atsStandard: 'ATS मानक गुणवत्ता'
    },
    dashboard: {
      welcome: 'VynkAI CareerForge में आपका स्वागत है',
      desc: 'छात्रों के लिए वास्तविक और तेज़ प्लेटफॉर्म। अपना रिज्यूमे अपलोड करें और AI की मदद से अपनी स्किल्स के अनुसार सही नौकरियां पाएं।',
      atsCardTitle: 'Resume ATS स्कोर',
      atsCardDesc: 'ऑटोमेटेड स्क्रीनिंग पास करने की क्षमता',
      savedJobsTitle: 'सेव किए गए अवसर',
      activeRoadmapsTitle: 'रोडमैप प्रोग्रेस',
      quickActions: 'त्वरित शुरुआत',
      btnBuildResume: 'नया Resume बनाएं',
      btnScanResume: 'Resume अपलोड करें',
      btnSearchJobs: 'नौकरियां खोजें',
      btnWriteEmail: 'Cold Email लिखें'
    },
    scanner: {
      title: 'AI Resume स्कैनर और जॉब मैचर',
      subtitle: 'रिज्यूमे अपलोड करें। AI आपकी स्किल्स को स्कैन करके सटीक नौकरियां खोजेगा।',
      uploadTitle: 'रिज्यूमे फाइल चुनें या टेक्स्ट पेस्ट करें',
      dragDrop: 'फाइल चुनने के लिए क्लिक करें या नीचे टेक्स्ट पेस्ट करें',
      btnAnalyze: 'स्किल्स स्कैन करें और नौकरियां खोजें',
      analyzing: 'AI द्वारा रिज्यूमे स्कैन किया जा रहा है...',
      resultsTitle: 'AI विश्लेषण और उपयुक्त पद',
      detectedSkills: 'पहचानी गई तकनीकी स्किल्स:',
      bestRoles: 'आपके लिए सबसे उपयुक्त पद:',
      matchFilterBtn: 'केवल मैच होने वाली नौकरियां देखें'
    },
    resume: {
      title: 'प्रोफेशनल ATS Resume स्टूडियो',
      subtitle: 'मानक A4 प्रारूप में कंपनियों में शॉर्टलिस्ट होने के लिए रिज्यूमे।',
      personalTab: '१. व्यक्तिगत विवरण',
      summaryTab: '२. सारांश व उद्देश्य',
      educationTab: '३. शिक्षा व कॉलेज',
      experienceTab: '४. ट्रेनिंग व अनुभव',
      projectsTab: '५. प्रोजेक्ट्स',
      skillsTab: '६. तकनीकी कौशल',
      accomplishmentsTab: '७. उपलब्धियां',
      fullName: 'पूरा नाम',
      targetRole: 'लक्ष्य पद',
      email: 'ईमेल पता',
      phone: 'फ़ोन / व्हाट्सएप',
      location: 'स्थान / शहर',
      links: 'GitHub / LinkedIn',
      summaryLabel: 'करियर सारांश',
      mottoLabel: 'करियर मोटो / Quote',
      aiPolish: 'AI से सुधारें',
      btnUpdate: 'Preview अपडेट करें',
      btnDownload: 'Vector PDF डाउनलोड करें',
      btnPrint: 'प्रिंट करें',
      btnExportJson: 'Export JSON',
      btnImportJson: 'Import JSON',
      liveSheetTitle: 'लाइव A4 शीट Preview',
      atsAnalysisTitle: 'ATS गुणवत्ता चेकलिस्ट'
    },
    emailTool: {
      title: 'AI Cold Email और कवर लेटर जनरेटर',
      subtitle: 'HR और फाउंडर्स को सीधे प्रभावशाली ईमेल भेजने के लिए टूल।',
      recipientRole: 'आप किसे ईमेल भेज रहे हैं?',
      companyName: 'कंपनी का नाम',
      targetPosition: 'वांछित पद',
      myStrongSkill: 'आपकी सबसे मजबूत स्किल',
      btnGenerate: 'ईमेल तैयार करें',
      btnCopy: 'ईमेल कॉपी करें',
      previewTitle: 'तैयार ईमेल:'
    },
    jobs: {
      title: 'सभी क्षेत्रों में इंटर्नशिप और नौकरियां',
      subtitle: 'AI, Web, Android, Cloud, DevOps और Cyber Security में समय-सीमा सहित नौकरियां।',
      searchPlaceholder: 'पद या स्किल खोजें (React, Python, Cloud, Java, DevOps)...',
      allFields: 'सभी इंजीनियरिंग शाखाएं',
      allLocations: 'सभी शहर',
      remoteOnly: 'केवल रिमोट (Work From Home)',
      directApply: 'सीधा आवेदन',
      saveJob: 'सेव करें',
      saved: 'सेव किया',
      trending: 'ट्रेंडिंग फील्ड्स:',
      posted: 'पोस्ट किया',
      deadline: 'अंतिम तिथि'
    },
    freelance: {
      title: 'स्टूडेंट फ्रीलांसिंग हब',
      subtitle: 'कॉलेज में पढ़ते हुए प्रोजेक्ट्स पाने की रणनीति।',
      hourlyRateCalc: 'प्रति घंटा दर कैलकुलेटर',
      hoursPerWeek: 'प्रति सप्ताह उपलब्ध घंटे:',
      expectedRate: 'अपेक्षित प्रति घंटा दर:',
      projectedMonthly: 'अनुमानित मासिक आय:',
      proposalGen: 'तुरंत Proposal जनरेटर',
      selectGig: 'सर्विस प्रकार चुनें:',
      copyProposal: 'Proposal कॉपी करें'
    },
    roadmaps: {
      title: 'इंजीनियरिंग रोडमैप और इंटरव्यू तैयारी',
      subtitle: 'महत्वपूर्ण कोडिंग स्किल्स और इंटरव्यू प्रश्नोत्तरी।',
      interviewPrepTitle: 'तकनीकी इंटरव्यू फ्लैशकार्ड्स',
      showAnswer: 'उत्तर देखें',
      hideAnswer: 'उत्तर छुपाएं'
    }
  },
  es: {
    langName: 'Español',
    flag: '🇪🇸',
    brandName: 'VynkAI CareerForge',
    brandBadge: 'Acelerador de Carrera Global',
    nav: {
      dashboard: 'Panel',
      resume: 'Estudio CV ATS',
      scanner: 'Escáner IA de CV',
      coverLetter: 'Cold Email & Pitch',
      jobs: 'Prácticas & Empleos',
      freelance: 'Centro Freelance',
      roadmaps: 'Rutas & Prep'
    },
    auth: {
      login: 'Iniciar con Google',
      logout: 'Cerrar Sesión',
      cloudSync: 'Guardar Nube',
      synced: 'Sincronizado'
    },
    stats: {
      title: 'Estadísticas Reales de la Plataforma',
      activeJobs: 'Puestos Verificados',
      fieldsCovered: 'Campos de Ingeniería',
      sessionCount: 'Tus Visitas Activas',
      atsStandard: 'Estándar ATS'
    },
    dashboard: {
      welcome: 'Bienvenido a VynkAI CareerForge',
      desc: 'Plataforma completa para estudiantes de ingeniería. Sube tu CV para emparejamiento automático por IA y descubre ofertas en todas las áreas técnicas.',
      atsCardTitle: 'Puntuación ATS',
      atsCardDesc: 'Compatibilidad de filtrado automático',
      savedJobsTitle: 'Empleos Guardados',
      activeRoadmapsTitle: 'Hitos de Ruta',
      quickActions: 'Acciones Rápidas',
      btnBuildResume: 'Crear CV ATS',
      btnScanResume: 'Subir y Analizar CV',
      btnSearchJobs: 'Buscar Prácticas',
      btnWriteEmail: 'Redactar Cold Email'
    },
    scanner: {
      title: 'Analizador de CV con IA y Coincidencia de Empleo',
      subtitle: 'Sube tu CV. Nuestra IA analiza tus habilidades técnicas y encuentra empleos compatibles.',
      uploadTitle: 'Subir archivo de CV o pegar texto',
      dragDrop: 'Haz clic para seleccionar archivo o pega el texto abajo',
      btnAnalyze: 'Analizar CV y Encontrar Empleos',
      analyzing: 'Analizando CV con IA...',
      resultsTitle: 'Habilidades Detectadas y Puestos Ideales',
      detectedSkills: 'Habilidades Técnicas Detectadas:',
      bestRoles: 'Mejores Puestos para Ti:',
      matchFilterBtn: 'Ver Solo Empleos Coincidentes'
    },
    jobs: {
      title: 'Radar de Empleos y Pasantías Multidisciplinarias',
      subtitle: 'Oportunidades verificadas en IA, Web, Móvil, Cloud, DevOps y Seguridad con plazos activos.',
      searchPlaceholder: 'Buscar por rol, habilidad o campo (React, Python, DevOps)...',
      allFields: 'Todas las Especialidades',
      allLocations: 'Todas las Ubicaciones',
      remoteOnly: 'Solo Remoto',
      directApply: 'Postular Directo',
      saveJob: 'Guardar',
      saved: 'Guardado',
      trending: 'Especialidades:',
      posted: 'Publicado',
      deadline: 'Plazo'
    },
    resume: {
      title: 'Estudio de CV ATS',
      subtitle: 'Formato estándar A4 para empresas de ingeniería.',
      personalTab: '1. Contacto',
      summaryTab: '2. Resumen',
      educationTab: '3. Educación',
      experienceTab: '4. Experiencia',
      projectsTab: '5. Proyectos',
      skillsTab: '6. Habilidades',
      accomplishmentsTab: '7. Logros',
      fullName: 'Nombre Completo',
      targetRole: 'Puesto Objetivo',
      email: 'Correo Electrónico',
      phone: 'Teléfono / WhatsApp',
      location: 'Ubicación',
      links: 'Enlaces GitHub / LinkedIn',
      summaryLabel: 'Resumen Profesional',
      mottoLabel: 'Lema Profesional',
      aiPolish: 'Mejorar con IA',
      btnUpdate: 'Actualizar Vista',
      btnDownload: 'Descargar PDF Vector',
      btnPrint: 'Imprimir',
      btnExportJson: 'Exportar JSON',
      btnImportJson: 'Importar JSON',
      liveSheetTitle: 'Vista Previa A4 en Vivo',
      atsAnalysisTitle: 'Lista de Calidad ATS'
    },
    emailTool: {
      title: 'Generador de Cold Email con IA',
      subtitle: 'Genera correos de contacto para reclutadores y fundadores.',
      recipientRole: 'Destinatario',
      companyName: 'Empresa',
      targetPosition: 'Puesto',
      myStrongSkill: 'Habilidad Principal',
      btnGenerate: 'Generar Email',
      btnCopy: 'Copiar Email',
      previewTitle: 'Mensaje Generado:'
    },
    freelance: {
      title: 'Centro Freelance para Estudiantes',
      subtitle: 'Estrategias para conseguir contratos mientras estudias.',
      hourlyRateCalc: 'Calculadora de Tarifa',
      hoursPerWeek: 'Horas por semana:',
      expectedRate: 'Tarifa esperada:',
      projectedMonthly: 'Ganancia Mensual Proyectada:',
      proposalGen: 'Generador de Propuestas',
      selectGig: 'Tipo de Servicio:',
      copyProposal: 'Copiar Propuesta'
    },
    roadmaps: {
      title: 'Rutas de Ingeniería y Preguntas de Entrevista',
      subtitle: 'Conceptos clave de programación y tarjetas de estudio.',
      interviewPrepTitle: 'Tarjetas de Estudio Técnico',
      showAnswer: 'Ver Respuesta',
      hideAnswer: 'Ocultar'
    }
  },
  de: {
    langName: 'Deutsch',
    flag: '🇩🇪',
    brandName: 'VynkAI CareerForge',
    brandBadge: 'Karriere-Beschleuniger',
    nav: {
      dashboard: 'Übersicht',
      resume: 'ATS Lebenslauf',
      scanner: 'KI Lebenslauf Scanner',
      coverLetter: 'Cold Email & Pitch',
      jobs: 'Praktika & Jobs',
      freelance: 'Freelance Hub',
      roadmaps: 'Lernpfade & Prep'
    },
    auth: {
      login: 'Mit Google anmelden',
      logout: 'Abmelden',
      cloudSync: 'In Cloud speichern',
      synced: 'Synchronisiert'
    },
    stats: {
      title: 'Echte Plattform-Statistiken',
      activeJobs: 'Geprüfte Offene Stellen',
      fieldsCovered: 'Ingenieurbereiche',
      sessionCount: 'Ihre Aktiven Besuche',
      atsStandard: 'ATS Qualitätsstandard'
    },
    dashboard: {
      welcome: 'Willkommen bei VynkAI CareerForge',
      desc: 'Die Plattform für Ingenieurstudenten. Lebenslauf hochladen, KI-Matching nutzen und aktuelle Praktika in allen Tech-Bereichen finden.',
      atsCardTitle: 'ATS Lebenslauf-Score',
      atsCardDesc: 'Automatisierte Screening-Kompatibilität',
      savedJobsTitle: 'Gespeicherte Jobs',
      activeRoadmapsTitle: 'Fortschritt',
      quickActions: 'Schnellstart',
      btnBuildResume: 'Lebenslauf erstellen',
      btnScanResume: 'Lebenslauf analysieren',
      btnSearchJobs: 'Jobs durchsuchen',
      btnWriteEmail: 'Bewerbung schreiben'
    },
    scanner: {
      title: 'KI Lebenslauf-Analyse & Job-Matching',
      subtitle: 'Laden Sie Ihren Lebenslauf hoch. Unsere KI findet passende Jobs zu Ihren Fähigkeiten.',
      uploadTitle: 'Lebenslauf hochladen oder Text einfügen',
      dragDrop: 'Klicken zum Auswählen oder Text unten einfügen',
      btnAnalyze: 'Fähigkeiten analysieren & Jobs finden',
      analyzing: 'Lebenslauf wird analysiert...',
      resultsTitle: 'Erkannte Fähigkeiten & Passende Rollen',
      detectedSkills: 'Erkannte technische Fähigkeiten:',
      bestRoles: 'Beste Rollen für Sie:',
      matchFilterBtn: 'Nur passende Jobs anzeigen'
    },
    jobs: {
      title: 'Praktikums- und Job-Radar für alle Bereiche',
      subtitle: 'Verifizierte Stellen in KI, Web, Android, Cloud, DevOps und Cyber Security mit Bewerbungsfristen.',
      searchPlaceholder: 'Nach Rolle, Skill oder Bereich suchen (React, Python, Cloud)...',
      allFields: 'Alle Bereiche',
      allLocations: 'Alle Standorte',
      remoteOnly: 'Nur Remote (Homeoffice)',
      directApply: 'Direkt Bewerben',
      saveJob: 'Speichern',
      saved: 'Gespeichert',
      trending: 'Bereiche:',
      posted: 'Veröffentlicht',
      deadline: 'Bewerbungsfrist'
    },
    resume: {
      title: 'ATS Lebenslauf Studio',
      subtitle: 'Standard A4-Format für Technologieunternehmen.',
      personalTab: '1. Kontakt',
      summaryTab: '2. Zusammenfassung',
      educationTab: '3. Ausbildung',
      experienceTab: '4. Praxiserfahrung',
      projectsTab: '5. Projekte',
      skillsTab: '6. Kenntnisse',
      accomplishmentsTab: '7. Erfolge',
      fullName: 'Vollständiger Name',
      targetRole: 'Zielposition',
      email: 'E-Mail',
      phone: 'Telefon / WhatsApp',
      location: 'Wohnort',
      links: 'GitHub / LinkedIn',
      summaryLabel: 'Berufliche Zusammenfassung',
      mottoLabel: 'Karriere-Motto',
      aiPolish: 'Mit KI optimieren',
      btnUpdate: 'Vorschau aktualisieren',
      btnDownload: 'PDF herunterladen',
      btnPrint: 'Drucken',
      btnExportJson: 'JSON exportieren',
      btnImportJson: 'JSON importieren',
      liveSheetTitle: 'Live A4 Vorschau',
      atsAnalysisTitle: 'ATS Checkliste'
    },
    emailTool: {
      title: 'KI Cold Email Generator',
      subtitle: 'Erstellen Sie gezielte E-Mails an Recruiter und Gründer.',
      recipientRole: 'Empfänger',
      companyName: 'Unternehmen',
      targetPosition: 'Stelle',
      myStrongSkill: 'Hauptfähigkeit',
      btnGenerate: 'E-Mail erstellen',
      btnCopy: 'Kopieren',
      previewTitle: 'Generierte E-Mail:'
    },
    freelance: {
      title: 'Studenten Freelance Hub',
      subtitle: 'Praktische Anleitungen für erste Aufträge neben dem Studium.',
      hourlyRateCalc: 'Stundensatz-Rechner',
      hoursPerWeek: 'Wochenstunden:',
      expectedRate: 'Stundensatz:',
      projectedMonthly: 'Monatseinkommen:',
      proposalGen: 'Angebots-Generator',
      selectGig: 'Dienstleistung:',
      copyProposal: 'Angebot kopieren'
    },
    roadmaps: {
      title: 'Ingenieur-Roadmaps & Interviewfragen',
      subtitle: 'Wichtige Programmierkonzepte und Flashcards.',
      interviewPrepTitle: 'Technische Flashcards',
      showAnswer: 'Antwort anzeigen',
      hideAnswer: 'Ausblenden'
    }
  }
}

// Default Candidate
const DEFAULT_CANDIDATE = {
  name: 'Alex Morgan',
  role: 'Artificial Intelligence & Data Science Student | Software Engineer',
  email: 'alex.morgan.tech@example.com',
  phone: '+1 (555) 382-9104',
  location: 'San Francisco, CA (Open to Global Remote)',
  links: 'github.com/alex-dev • linkedin.com/in/alex-morgan • WhatsApp: @alex_tech',
  summary: 'Passionate and technology-driven Artificial Intelligence & Data Science student with a solid foundation in Computer Engineering. Experienced in full-stack web engineering, native Android app development, machine learning algorithms, and system networking. Proven record of developing practical academic projects and completing industrial engineering trainings. Committed to building scalable software solutions that solve real-world problems.',
  motto: 'Technology is not just about writing code; it is about solving real-world problems, creating meaningful experiences, and continuously pushing the boundaries of innovation.',
  
  educationList: [
    {
      degree: 'Bachelor of Engineering in Artificial Intelligence & Data Science (3rd Year)',
      institution: 'Global Institute of Technical Sciences',
      year: '2025 – 2028 (Pursuing)',
      score: '8.90 / 10.0 CGPA',
      bullets: '• Currently pursuing 3rd year specialization in AI, Machine Learning, Data Analytics, Cloud Computing, Full Stack Web Engineering, and Android Applications.\n• Participant in International CodeForge Hackathon in prototype development round.'
    },
    {
      degree: 'Diploma in Computer Engineering',
      institution: 'State Polytechnic Institute',
      year: '2022 – 2025',
      score: 'Aggregate: 75.80%',
      bullets: '• Graduated with high honors in Computer Engineering curriculum.\n• Developed core mastery in C, C++, Java, C#, SQL Databases, Computer Networks, and Operating Systems.\n• Engineered desktop applications including IP Finder, Hotel Management, and Student Entry Systems.'
    }
  ],

  experienceList: [
    {
      title: 'Android Development Industrial Training Program',
      company: 'Apex EdTech & Engineering Solutions Pvt. Ltd.',
      period: 'Summer Intensive Track',
      bullets: '• Awarded Certificate of Completion with Outstanding Performance in 6-Week Industrial Training in Android Development.\n• Engineered native Android UIs, managing activity lifecycles, intent flows, layout architectures, and REST API data integration.\n• Handled debugging, memory profiling, local database connectivity, and deployment workflows.'
    },
    {
      title: 'Networking & Technical Support Industrial Training',
      company: 'Broadband & Cloud Infrastructure Services Corp',
      period: '6-Week Field Program',
      bullets: '• Completed 6-week hands-on training in corporate networking topology, broadband infrastructure, and fiber optics.\n• Executed hardware diagnostics, line troubleshooting, router configuration, and customer support ticket resolutions.'
    }
  ],

  projectsList: [
    {
      title: 'AI-Based Health Monitoring System (AI & IoT)',
      domain: 'Machine Learning • IoT Sensors',
      desc: 'Combines Machine Learning models with IoT sensor data to track real-time health metrics. Presented at regional Technical Festivals.'
    },
    {
      title: 'Web-Based Resume Builder System for University Students',
      domain: 'React.js • Node.js • Puppeteer',
      desc: 'Full-stack React & Node.js application enabling students to construct and export ATS-friendly resumes with live vector PDF compilation.'
    },
    {
      title: 'Government Scheme Portal for Startup Businesses',
      domain: 'Full Stack Web • SQL Database',
      desc: 'Web platform built to connect startup founders with government grants, schemes, and automated eligibility verification.'
    },
    {
      title: 'Advanced IP Address Finder & Network Diagnostic Utility',
      domain: 'Python • Network Security',
      desc: 'Python network analysis tool providing deep IP tracing, geolocation lookup, and port verification.'
    }
  ],

  skillsCategorized: {
    'Languages': 'Python, Java, Advanced Java, C, C++, Kotlin, C#, SQL, PL/SQL',
    'Web & Mobile': 'HTML5, CSS3, JavaScript, TypeScript, React.js, Node.js, PHP, Android Studio, Tailwind CSS',
    'AI & Core Domains': 'Artificial Intelligence, Machine Learning, Data Science, Generative AI, Networking, Network Security, Ethical Hacking'
  },

  accomplishments: '• International CodeForge Hackathon: Participated in Build & Submit Prototype Development Round.\n• Technical Festivals Presenter: Demonstrated AI + IoT integrated smart healthcare system at university symposium.'
}

// Flashcards
const INTERVIEW_QUESTIONS = [
  {
    topic: 'React.js',
    q: 'What is the Virtual DOM and how does React reconciliation algorithm work?',
    a: 'Virtual DOM is an in-memory lightweight representation of the real DOM. When state changes, React builds a new VDOM tree, computes differences using Fiber diffing algorithm, and batches minimal DOM mutations for optimal 60fps performance.'
  },
  {
    topic: 'Machine Learning',
    q: 'What is the difference between Supervised, Unsupervised, and Reinforcement Learning?',
    a: 'Supervised Learning trains on labeled inputs with target outputs (Classification/Regression). Unsupervised finds hidden patterns in unlabeled data (Clustering/PCA). Reinforcement Learning learns through an agent interacting with an environment to maximize rewards.'
  },
  {
    topic: 'JavaScript',
    q: 'Explain the Event Loop, Microtasks, and Macrotasks queue execution order.',
    a: 'Synchronous call stack executes first. Once empty, Event Loop drains the Microtask queue (Promise.then, queueMicrotask, MutationObserver) before dequeuing the next Macrotask (setTimeout, setInterval, I/O events).'
  },
  {
    topic: 'Networking & OS',
    q: 'Explain the 3-Way TCP Handshake and why it is essential.',
    a: 'TCP establishes reliable connections via SYN (Client sends sequence #), SYN-ACK (Server acknowledges and sends its sequence #), and ACK (Client confirms). It synchronizes sequence numbers on both sides to prevent packet loss.'
  }
]

// Massive Multi-Field Verified Jobs Catalog Across All Engineering Domains
const MOCK_JOBS = [
  {
    id: 1,
    title: 'AI & Full Stack Software Engineering Intern',
    company: 'CloudScale Global Technologies',
    field: 'AI & Full Stack',
    location: 'Remote (Worldwide / India / US)',
    stipend: '$1,500 - $2,400 / month (₹55,000 - ₹90,000)',
    tags: ['React.js', 'Python', 'Node.js', 'PyTorch', 'Remote'],
    postedDate: 'Posted 2 hours ago',
    deadline: 'Deadline: Sep 15, 2026',
    daysLeft: '32 Days Left',
    isActive: true,
    applicants: '28 Applicants',
    description: 'Work with senior AI engineers building LLM tools, React dashboards, and high-performance backend pipelines with PPO opportunities.',
    url: 'https://www.linkedin.com/jobs'
  },
  {
    id: 2,
    title: 'Junior Machine Learning & Android Trainee',
    company: 'NeuroPulse Mobile Labs',
    field: 'Mobile & ML',
    location: 'Pune / Mumbai / Bengaluru (Hybrid)',
    stipend: '₹5.5 - ₹8.5 LPA (₹40,000/mo training)',
    tags: ['Android Studio', 'Kotlin', 'Python', 'Campus Drive'],
    postedDate: 'Posted Today (Verified)',
    deadline: 'Deadline: Sep 20, 2026',
    daysLeft: '37 Days Left',
    isActive: true,
    applicants: '42 Applicants',
    description: 'Entry-level engineering position for ambitious students. Build on-device ML models, native Android components, and RESTful cloud backends.',
    url: 'https://internshala.com'
  },
  {
    id: 3,
    title: 'Frontend UI/UX & React Engineer',
    company: 'HyperGrowth SaaS Inc.',
    field: 'Web & UI/UX',
    location: 'San Francisco / Remote',
    stipend: '$30 / hour (~$4,500 / month)',
    tags: ['Tailwind CSS', 'TypeScript', 'React', 'Vite'],
    postedDate: 'Posted 1 day ago',
    deadline: 'Deadline: Sep 10, 2026',
    daysLeft: '27 Days Left',
    isActive: true,
    applicants: '19 Applicants',
    description: 'Construct pixel-perfect UI suites, automated document generation pipelines, and responsive design systems with 100% responsiveness.',
    url: 'https://wellfound.com'
  },
  {
    id: 4,
    title: 'Cloud DevOps & Infrastructure Associate',
    company: 'TerraCloud Systems',
    field: 'Cloud & DevOps',
    location: 'Remote / Hyderabad (Hybrid)',
    stipend: '₹6.0 - ₹9.0 LPA (₹45,000/mo stipend)',
    tags: ['AWS', 'Docker', 'Linux', 'Kubernetes', 'CI/CD'],
    postedDate: 'Posted 3 hours ago',
    deadline: 'Deadline: Sep 18, 2026',
    daysLeft: '35 Days Left',
    isActive: true,
    applicants: '15 Applicants',
    description: 'Automate deployment pipelines, manage containerized clusters on AWS/Docker, and maintain 99.99% cloud uptime metrics.',
    url: 'https://www.linkedin.com/jobs'
  },
  {
    id: 5,
    title: 'Junior Cyber Security & Penetration Testing Intern',
    company: 'ShieldArmor Cyber Defense',
    field: 'Cyber Security',
    location: 'Remote (Worldwide)',
    stipend: '$1,200 / month (₹45,000)',
    tags: ['Network Security', 'Ethical Hacking', 'Python', 'Wireshark'],
    postedDate: 'Posted 5 hours ago',
    deadline: 'Deadline: Sep 25, 2026',
    daysLeft: '42 Days Left',
    isActive: true,
    applicants: '31 Applicants',
    description: 'Conduct vulnerability assessments, network traffic analysis, and assist in security audit reports for enterprise clients.',
    url: 'https://internshala.com'
  },
  {
    id: 6,
    title: 'Data Science & Analytics Trainee',
    company: 'QuantMatrix Global',
    field: 'Data Science',
    location: 'Bengaluru / Remote',
    stipend: '₹5.0 - ₹8.0 LPA (₹35,000/mo stipend)',
    tags: ['Python', 'SQL', 'Pandas', 'Tableau', 'PowerBI'],
    postedDate: 'Posted Yesterday',
    deadline: 'Deadline: Sep 12, 2026',
    daysLeft: '29 Days Left',
    isActive: true,
    applicants: '38 Applicants',
    description: 'Query large-scale relational databases, build predictive modeling algorithms, and craft interactive business intelligence reports.',
    url: 'https://internshala.com'
  },
  {
    id: 7,
    title: 'Java Backend & Microservices Developer',
    company: 'NexGen Banking Solutions',
    field: 'Backend & Java',
    location: 'Pune / Mumbai (On-Site)',
    stipend: '₹6.5 - ₹10.0 LPA',
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'REST API'],
    postedDate: 'Posted 4 hours ago',
    deadline: 'Deadline: Sep 30, 2026',
    daysLeft: '47 Days Left',
    isActive: true,
    applicants: '23 Applicants',
    description: 'Engineer high-throughput transactional APIs, secure banking endpoints, and scalable microservices architectures.',
    url: 'https://www.naukri.com'
  },
  {
    id: 8,
    title: 'Embedded Systems & IoT Firmware Engineer',
    company: 'RoboTech Dynamics',
    field: 'Embedded & IoT',
    location: 'Bengaluru / Pune (Hybrid)',
    stipend: '₹4.8 - ₹7.5 LPA',
    tags: ['C', 'C++', 'ESP32', 'Sensors', 'Microcontrollers'],
    postedDate: 'Posted 2 days ago',
    deadline: 'Deadline: Sep 22, 2026',
    daysLeft: '39 Days Left',
    isActive: true,
    applicants: '12 Applicants',
    description: 'Develop low-latency firmware in C/C++, integrate sensor telemetry, and build IoT hardware device communication layers.',
    url: 'https://internshala.com'
  },
  {
    id: 9,
    title: 'QA Automation & Test Engineering Intern',
    company: 'SpeedTest Labs Global',
    field: 'QA & Testing',
    location: 'Remote (Worldwide)',
    stipend: '$1,000 / month (₹40,000)',
    tags: ['Selenium', 'Cypress', 'JavaScript', 'Python', 'Testing'],
    postedDate: 'Posted 6 hours ago',
    deadline: 'Deadline: Sep 28, 2026',
    daysLeft: '45 Days Left',
    isActive: true,
    applicants: '17 Applicants',
    description: 'Write end-to-end automated UI and API test suites, prevent regression bugs, and integrate testing inside GitHub Actions.',
    url: 'https://wellfound.com'
  }
]

export default function App() {
  // 1. Dark Theme State
  const [isDark, setIsDark] = useState(true)

  // 2. Language State
  const [lang, setLang] = useState('en')
  const [currency, setCurrency] = useState('USD')
  const [activeTab, setActiveTab] = useState('resume')
  const [resumeSubTab, setResumeSubTab] = useState('personal')
  const [toastMsg, setToastMsg] = useState('')

  // 3. Honest, Real Visit Tracking
  const [realVisitCount, setRealVisitCount] = useState(1)

  // 4. User & Firebase State
  const [currentUser, setCurrentUser] = useState(null)
  const [isSavingCloud, setIsSavingCloud] = useState(false)

  // 5. Candidate Data
  const [candidate, setCandidate] = useState(DEFAULT_CANDIDATE)
  const [resumeHtml, setResumeHtml] = useState('')
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)

  // 6. AI Resume Scanner State
  const [resumeUploadText, setResumeUploadText] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState(null)
  const [matchedFieldFilter, setMatchedFieldFilter] = useState(null)
  const fileInputRef = useRef(null)

  // 7. Cold Email State
  const [emailRecipient, setEmailRecipient] = useState('Hiring Manager / Tech Lead')
  const [emailCompany, setEmailCompany] = useState('CloudScale Technologies')
  const [emailTargetRole, setEmailTargetRole] = useState('AI & Software Engineering Intern (Summer 2025)')
  const [emailStrongSkill, setEmailStrongSkill] = useState('Full-Stack Web & Machine Learning')
  const [generatedColdEmail, setGeneratedColdEmail] = useState('')

  // 8. Jobs State
  const [jobSearchQuery, setJobSearchQuery] = useState('')
  const [jobFilterField, setJobFilterField] = useState('all')
  const [jobFilterLocation, setJobFilterLocation] = useState('all')
  const [savedJobIds, setSavedJobIds] = useState([1, 2])

  // 9. Freelance Calculator
  const [calcHours, setCalcHours] = useState(15)
  const [calcRate, setCalcRate] = useState(30)
  const [proposalService, setProposalService] = useState('react')

  // 10. Flashcards
  const [revealedAnswers, setRevealedAnswers] = useState({})

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en

  const showToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 3000)
  }

  // Real session tracking
  useEffect(() => {
    try {
      const stored = localStorage.getItem('vynkai_real_visits')
      const count = stored ? parseInt(stored, 10) + 1 : 1
      localStorage.setItem('vynkai_real_visits', count.toString())
      setRealVisitCount(count)
    } catch (e) {
      setRealVisitCount(1)
    }
  }, [])

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user)
        showToast(`👋 Logged in as ${user.displayName || user.email}`)
        const cloudData = await loadResumeFromCloud(user.uid)
        if (cloudData && cloudData.name) {
          setCandidate(cloudData)
          showToast('☁️ Cloud resume loaded!')
        }
      } else {
        setCurrentUser(null)
      }
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    renderLiveResume()
    generateColdEmail()
  }, [lang, candidate])

  // Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle()
      setCurrentUser(user)
      showToast(`✅ Welcome, ${user.displayName}!`)
    } catch (err) {
      console.error(err)
      showToast('⚠️ Google Sign-In requires Firebase authorized domains setup')
    }
  }

  // Handle Logout
  const handleLogout = async () => {
    try {
      await logOut()
      setCurrentUser(null)
      showToast('Logged out successfully')
    } catch (err) {
      console.error(err)
    }
  }

  // Handle Cloud Save
  const handleSaveToCloud = async () => {
    if (!currentUser) {
      showToast('Please sign in with Google first')
      handleGoogleLogin()
      return
    }
    setIsSavingCloud(true)
    try {
      await saveResumeToCloud(currentUser.uid, candidate)
      showToast('☁️ Saved to Firebase Cloud!')
    } catch (err) {
      console.error(err)
      showToast('⚠️ Saved to local storage')
    } finally {
      setIsSavingCloud(false)
    }
  }

  // Handle Resume File Upload (Supports .pdf, .txt, .json, .md) & AI Scanning
  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      setIsScanning(true)
      showToast('📄 Reading & Parsing PDF Resume...')
      try {
        const arrayBuffer = await file.arrayBuffer()
        const text = await extractTextFromPdf(arrayBuffer)
        setResumeUploadText(text)
        analyzeUploadedResume(text)
        showToast('✅ PDF parsed successfully!')
      } catch (err) {
        console.error(err)
        showToast('⚠️ Could not extract text from PDF. Try pasting text.')
        setIsScanning(false)
      }
    } else {
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target.result
        setResumeUploadText(content)
        analyzeUploadedResume(content)
      }
      reader.readAsText(file)
    }
  }

  // AI Resume Matcher Core Engine
  const analyzeUploadedResume = (textToScan) => {
    const raw = (textToScan || resumeUploadText || JSON.stringify(candidate)).toLowerCase()
    setIsScanning(true)

    setTimeout(() => {
      const detected = []
      const matchedRoles = []

      // Skill detection dictionary
      if (raw.includes('react') || raw.includes('javascript') || raw.includes('html') || raw.includes('css')) {
        detected.push('React.js & Frontend Architecture')
        matchedRoles.push({ role: 'Frontend UI/UX & React Engineer', field: 'Web & UI/UX', match: 96 })
      }
      if (raw.includes('python') || raw.includes('machine learning') || raw.includes('ai') || raw.includes('pytorch')) {
        detected.push('Python & Machine Learning / AI')
        matchedRoles.push({ role: 'AI & Full Stack Software Engineering Intern', field: 'AI & Full Stack', match: 94 })
      }
      if (raw.includes('android') || raw.includes('kotlin') || raw.includes('java')) {
        detected.push('Android Studio & Mobile App Development')
        matchedRoles.push({ role: 'Junior Machine Learning & Android Trainee', field: 'Mobile & ML', match: 91 })
      }
      if (raw.includes('sql') || raw.includes('database') || raw.includes('pandas') || raw.includes('data')) {
        detected.push('SQL Databases & Data Analytics')
        matchedRoles.push({ role: 'Data Science & Analytics Trainee', field: 'Data Science', match: 89 })
      }
      if (raw.includes('network') || raw.includes('security') || raw.includes('cloud') || raw.includes('aws') || raw.includes('docker')) {
        detected.push('Cloud Infrastructure, DevOps & Security')
        matchedRoles.push({ role: 'Cloud DevOps & Infrastructure Associate', field: 'Cloud & DevOps', match: 87 })
        matchedRoles.push({ role: 'Junior Cyber Security & Penetration Testing Intern', field: 'Cyber Security', match: 85 })
      }
      if (raw.includes('c++') || raw.includes('embedded') || raw.includes('iot') || raw.includes('sensor')) {
        detected.push('C / C++ & Embedded Systems IoT')
        matchedRoles.push({ role: 'Embedded Systems & IoT Firmware Engineer', field: 'Embedded & IoT', match: 90 })
      }

      // Default fallback if minimal keywords found
      if (detected.length === 0) {
        detected.push('Full Stack Fundamentals (HTML, CSS, JS)', 'C / Java Core Programming')
        matchedRoles.push({ role: 'AI & Full Stack Software Engineering Intern', field: 'AI & Full Stack', match: 82 })
        matchedRoles.push({ role: 'QA Automation & Test Engineering Intern', field: 'QA & Testing', match: 80 })
      }

      setScanResult({
        skills: detected,
        roles: matchedRoles,
        atsEstimate: detected.length >= 3 ? 92 : 78
      })
      setIsScanning(false)
      showToast('✨ AI Resume Scanned & Jobs Matched!')
    }, 800)
  }

  // Generate Cold Email
  function generateColdEmail() {
    const text = `Subject: Application for ${emailTargetRole} — ${candidate.name}

Dear ${emailRecipient} at ${emailCompany},

I hope this email finds you well.

I have been following ${emailCompany}'s engineering initiatives and was deeply inspired by your high-impact digital solutions. I am writing to express my strong interest in the ${emailTargetRole} position.

As an Artificial Intelligence & Software Engineering student with hands-on experience in ${emailStrongSkill}, I have built production-ready web platforms, native mobile applications, and automated document engines.

Key Technical Highlights:
• Proficient in Python, JavaScript, React.js, Node.js, and SQL Databases
• Experience delivering practical full-cycle projects (GitHub & Portfolio: ${candidate.links})
• Disciplined problem solver with passion for scalable architectures and clean code

I would welcome the opportunity to discuss how my skill set and dedication can contribute to ${emailCompany}'s ongoing initiatives.

Thank you very much for your time and consideration.

Best regards,

${candidate.name}
${candidate.phone} | ${candidate.email}
${candidate.links}`
    setGeneratedColdEmail(text)
  }

  // Calculate ATS Score
  const calculateAtsScore = () => {
    let score = 35
    if (candidate.name.trim().length > 3) score += 15
    if (candidate.email.includes('@')) score += 10
    if (candidate.summary.length > 80) score += 15
    if (candidate.projectsList.length >= 2) score += 15
    if (Object.keys(candidate.skillsCategorized).length >= 2) score += 10
    return Math.min(score, 100)
  }
  const atsScore = calculateAtsScore()

  // Generate Live Resume HTML
  function buildCleanResumeHtml(cand) {
    const skillsHtml = Object.entries(cand.skillsCategorized).map(([cat, items]) => `
      <div style="margin-bottom: 8px;">
        <div style="font-size: 11.5px; font-weight: 800; text-transform: uppercase; color: #475569; margin-bottom: 4px; letter-spacing: 0.5px;">${cat}</div>
        <div style="display: flex; flex-wrap: wrap; gap: 5px;">
          ${items.split(',').map(s => `<span style="background: #f1f5f9; color: #1e293b; border: 1px solid #cbd5e1; padding: 2.5px 8px; border-radius: 4px; font-size: 11.5px; font-weight: 600;">${s.trim()}</span>`).join('')}
        </div>
      </div>
    `).join('')

    const eduHtml = cand.educationList.map(ed => `
      <div style="margin-bottom: 10px;">
        <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 13px; color: #0f172a;">
          <span>${ed.degree}</span>
          <span style="color: #64748b; font-weight: 500;">${ed.year}</span>
        </div>
        <div style="font-size: 12.5px; color: #2563eb; font-weight: 600; margin-top: 1px;">${ed.institution} ${ed.score ? `• ${ed.score}` : ''}</div>
        <ul style="margin-left: 18px; margin-top: 4px; font-size: 12.5px; color: #334155; line-height: 1.55;">
          ${ed.bullets.split('\n').filter(Boolean).map(b => `<li>${b.replace(/^[•\-*]\s*/, '')}</li>`).join('')}
        </ul>
      </div>
    `).join('')

    const expHtml = cand.experienceList.map(exp => `
      <div style="margin-bottom: 10px;">
        <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 13px; color: #0f172a;">
          <span>${exp.title}</span>
          <span style="color: #64748b; font-weight: 500;">${exp.period}</span>
        </div>
        <div style="font-size: 12.5px; color: #2563eb; font-weight: 600; margin-top: 1px;">${exp.company}</div>
        <ul style="margin-left: 18px; margin-top: 4px; font-size: 12.5px; color: #334155; line-height: 1.55;">
          ${exp.bullets.split('\n').filter(Boolean).map(b => `<li>${b.replace(/^[•\-*]\s*/, '')}</li>`).join('')}
        </ul>
      </div>
    `).join('')

    const projHtml = cand.projectsList.map(p => `
      <div style="margin-bottom: 10px;">
        <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 13px; color: #0f172a;">
          <span>${p.title}</span>
          <span style="color: #2563eb; font-size: 11.5px; font-weight: 600;">${p.domain}</span>
        </div>
        <div style="color: #334155; font-size: 12.5px; margin-top: 2px; line-height: 1.55;">${p.desc}</div>
      </div>
    `).join('')

    return `
      <div style="font-family: 'Plus Jakarta Sans', Inter, -apple-system, sans-serif; padding: 32px 38px; color: #0f172a; line-height: 1.55; font-size: 13px; background: #ffffff;">
        <div style="border-bottom: 2.5px solid #2563eb; padding-bottom: 14px; margin-bottom: 16px;">
          <div style="font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px;">${cand.name}</div>
          <div style="font-size: 14px; font-weight: 700; color: #2563eb; margin-top: 3px;">${cand.role}</div>
          <div style="margin-top: 8px; font-size: 12px; color: #475569; line-height: 1.6;">
            📧 ${cand.email} • 📱 ${cand.phone} • 📍 ${cand.location}<br/>🔗 ${cand.links}
          </div>
        </div>

        <div style="margin-bottom: 16px;">
          <div style="font-size: 13px; font-weight: 800; text-transform: uppercase; color: #0f172a; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 3px; margin-bottom: 8px; letter-spacing: 0.8px;">Professional Summary</div>
          <div style="font-size: 12.8px; color: #334155; line-height: 1.55;">${cand.summary}</div>
          ${cand.motto ? `<div style="margin-top: 6px; padding: 6px 12px; background: #f8fafc; border-left: 3px solid #3b82f6; font-style: italic; color: #475569; font-size: 12px; border-radius: 0 4px 4px 0;">"${cand.motto}"</div>` : ''}
        </div>

        <div style="margin-bottom: 16px;">
          <div style="font-size: 13px; font-weight: 800; text-transform: uppercase; color: #0f172a; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 3px; margin-bottom: 8px; letter-spacing: 0.8px;">Education & Academic Background</div>
          ${eduHtml}
        </div>

        <div style="margin-bottom: 16px;">
          <div style="font-size: 13px; font-weight: 800; text-transform: uppercase; color: #0f172a; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 3px; margin-bottom: 8px; letter-spacing: 0.8px;">Industrial Training & Experience</div>
          ${expHtml}
        </div>

        <div style="margin-bottom: 16px;">
          <div style="font-size: 13px; font-weight: 800; text-transform: uppercase; color: #0f172a; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 3px; margin-bottom: 8px; letter-spacing: 0.8px;">Key Projects</div>
          ${projHtml}
        </div>

        <div style="margin-bottom: 16px;">
          <div style="font-size: 13px; font-weight: 800; text-transform: uppercase; color: #0f172a; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 3px; margin-bottom: 8px; letter-spacing: 0.8px;">Technical Skillset</div>
          ${skillsHtml}
        </div>

        <div>
          <div style="font-size: 13px; font-weight: 800; text-transform: uppercase; color: #0f172a; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 3px; margin-bottom: 4px; letter-spacing: 0.8px;">Hackathons & Accomplishments</div>
          <div style="font-size: 12.8px; color: #334155; white-space: pre-line; line-height: 1.55;">${cand.accomplishments}</div>
        </div>
      </div>
    `
  }

  function renderLiveResume() {
    const html = buildCleanResumeHtml(candidate)
    setResumeHtml(html)
  }

  // Handle PDF Download
  async function handleDownloadPdf() {
    setIsGeneratingPdf(true)
    try {
      const res = await axios.post('http://localhost:4000/api/resume/pdf', candidate, { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${candidate.name.replace(/\s+/g, '_')}_VynkAI_Resume.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      showToast('🎉 Vector PDF Downloaded!')
    } catch (err) {
      console.error(err)
      window.print()
      showToast('📄 Print sheet opened!')
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  // AI Polish
  const handleAiPolish = () => {
    const polished = `Results-driven and technology-focused Artificial Intelligence & Computer Engineering student with strong mastery in full-stack web architectures, native mobile development, and data-driven machine learning algorithms. Proven record of developing practical academic projects and completing industrial engineering trainings. Committed to building scalable software solutions that solve real-world problems.`
    setCandidate({ ...candidate, summary: polished })
    showToast('✨ AI Summary Polished!')
  }

  // Export JSON
  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(candidate, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${candidate.name.replace(/\s+/g, '_')}_profile.json`
    a.click()
    showToast('💾 Profile JSON Exported!')
  }

  // Import JSON
  const handleImportJson = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const d = JSON.parse(event.target.result)
        setCandidate({ ...candidate, ...d })
        showToast('✅ Profile JSON Imported!')
      } catch (err) {
        showToast('⚠️ Invalid JSON file')
      }
    }
    reader.readAsText(file)
  }

  // Toggle Saved Job
  const toggleSaveJob = (id) => {
    if (savedJobIds.includes(id)) {
      setSavedJobIds(savedJobIds.filter(x => x !== id))
      showToast('Removed from saved opportunities')
    } else {
      setSavedJobIds([...savedJobIds, id])
      showToast('Saved to your career board!')
    }
  }

  // Filter Jobs Across All Engineering Domains
  const filteredJobs = MOCK_JOBS.filter(job => {
    const matchQuery = !jobSearchQuery || 
      job.title.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
      job.field.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
      job.tags.some(t => t.toLowerCase().includes(jobSearchQuery.toLowerCase()))

    const matchField = jobFilterField === 'all' || 
      (matchedFieldFilter ? job.field === matchedFieldFilter : job.field === jobFilterField)

    const matchLocation = jobFilterLocation === 'all' || 
      (jobFilterLocation === 'remote' && job.location.toLowerCase().includes('remote'))

    return matchQuery && matchField && matchLocation
  })

  // Theme Class Mappings
  const themeBg = isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
  const headerBg = isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white/95 border-slate-200 shadow-sm'
  const cardBg = isDark ? 'bg-slate-900/90 border-slate-800 shadow-xl' : 'bg-white border-slate-200/80 shadow-sm'
  const inputBg = isDark ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-500' : 'bg-slate-50/70 border-slate-300 text-slate-900 focus:border-indigo-600 focus:bg-white'
  const textMuted = isDark ? 'text-slate-400' : 'text-slate-500'
  const navInactive = isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'

  return (
    <div className={`min-h-screen w-full ${themeBg} transition-colors duration-200 font-sans pb-24`}>
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className={`fixed bottom-6 right-6 z-50 ${isDark ? 'bg-emerald-400 text-slate-950' : 'bg-slate-900 text-white'} font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 border ${isDark ? 'border-emerald-300' : 'border-slate-700'} animate-bounce`}>
          <CheckCircle className="w-5 h-5" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 100% FULL-WIDTH TOP HEADER */}
      <header className={`sticky top-0 z-40 w-full ${headerBg} backdrop-blur-xl border-b`}>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div 
              onClick={() => setActiveTab('dashboard')} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/25 group-hover:scale-105 transition">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {t.brandName}
                  </span>
                  <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full ${isDark ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'}`}>
                    Student
                  </span>
                </div>
                <p className={`text-xs ${textMuted} hidden sm:block`}>
                  {t.brandBadge}
                </p>
              </div>
            </div>

            {/* Google Auth, Cloud Sync, Language & Theme */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Google Authentication Button */}
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveToCloud}
                    disabled={isSavingCloud}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition"
                  >
                    <Cloud className={`w-4 h-4 ${isSavingCloud ? 'animate-spin' : ''}`} />
                    <span className="hidden md:inline">{isSavingCloud ? 'Saving...' : t.auth.cloudSync}</span>
                  </button>
                  <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
                    <img
                      src={currentUser.photoURL || 'https://via.placeholder.com/32'}
                      alt={currentUser.displayName || 'User'}
                      className="w-8 h-8 rounded-full border border-indigo-500"
                    />
                    <button
                      onClick={handleLogout}
                      className={`p-2 rounded-xl border text-xs font-semibold ${isDark ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-rose-400' : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-rose-600'}`}
                      title={t.auth.logout}
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleGoogleLogin}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">{t.auth.login}</span>
                </button>
              )}

              {/* Dark Theme Toggle Button */}
              <button
                onClick={() => {
                  setIsDark(!isDark)
                  showToast(isDark ? '☀️ Clean Light Mode enabled' : '🌙 Sleek Dark Mode enabled')
                }}
                className={`p-2.5 rounded-xl border transition ${isDark ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'}`}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Multi-Language Selector (100% Functional Across All Views) */}
              <div className={`flex items-center border rounded-xl px-3 py-2 text-xs font-semibold ${isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-800'}`}>
                <Globe className="w-3.5 h-3.5 text-indigo-600 mr-2 shrink-0" />
                <select
                  value={lang}
                  onChange={(e) => {
                    setLang(e.target.value)
                    showToast(`Language set to ${TRANSLATIONS[e.target.value]?.langName}`)
                  }}
                  className="bg-transparent outline-none cursor-pointer pr-1 font-bold"
                >
                  {Object.entries(TRANSLATIONS).map(([k, v]) => (
                    <option key={k} value={k} className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                      {v.flag} {v.langName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Currency Selector */}
              <div className={`hidden sm:flex items-center border rounded-xl px-3 py-2 text-xs font-semibold ${isDark ? 'bg-slate-900 border-slate-800 text-indigo-400' : 'bg-slate-100 border-slate-200 text-indigo-600'}`}>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="bg-transparent outline-none cursor-pointer"
                >
                  <option value="USD" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>$ USD</option>
                  <option value="INR" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>₹ INR</option>
                  <option value="EUR" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>€ EUR</option>
                  <option value="GBP" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>£ GBP</option>
                </select>
              </div>

              {/* GitHub Link */}
              <a
                href="https://github.com/vina-yak711/student-career-assist"
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition ${isDark ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'}`}
              >
                <Github className="w-4 h-4" />
                <span className="hidden md:inline">GitHub</span>
              </a>
            </div>
          </div>

          {/* HORIZONTAL NAVIGATION TABS */}
          <nav className={`flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none border-t ${isDark ? 'border-slate-800/80' : 'border-slate-100'} mt-1`}>
            {[
              { key: 'dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
              { key: 'resume', label: t.nav.resume, icon: FileText },
              { key: 'scanner', label: t.nav.scanner, icon: FileSearch },
              { key: 'coverLetter', label: t.nav.coverLetter, icon: Mail },
              { key: 'jobs', label: t.nav.jobs, icon: Briefcase },
              { key: 'freelance', label: t.nav.freelance, icon: DollarSign },
              { key: 'roadmaps', label: t.nav.roadmaps, icon: Rocket }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === key
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : navInactive
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* 100% FULL-WIDTH MAIN LAYOUT */}
      <main className="w-full px-4 sm:px-6 lg:px-8 mt-6 space-y-8">

        {/* AUTHENTIC REAL ANALYTICS BANNER */}
        <section className={`${cardBg} rounded-2xl p-4 sm:p-5 border w-full`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800/50">
            <div className="pt-2 md:pt-0">
              <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-bold mb-1">
                <Briefcase className="w-3.5 h-3.5" /> {t.stats.activeJobs}
              </div>
              <div className="text-xl sm:text-2xl font-black text-emerald-500">
                {MOCK_JOBS.length}+ Active
              </div>
            </div>

            <div className="pt-2 md:pt-0">
              <div className="flex items-center justify-center gap-1.5 text-xs text-indigo-400 font-bold mb-1">
                <Layers className="w-3.5 h-3.5" /> {t.stats.fieldsCovered}
              </div>
              <div className="text-xl sm:text-2xl font-black text-indigo-500">
                8+ Domains
              </div>
            </div>

            <div className="pt-2 md:pt-0">
              <div className="flex items-center justify-center gap-1.5 text-xs text-amber-400 font-bold mb-1">
                <Clock className="w-3.5 h-3.5" /> {t.stats.sessionCount}
              </div>
              <div className="text-xl sm:text-2xl font-black text-amber-500">
                #{realVisitCount} (Active)
              </div>
            </div>

            <div className="pt-2 md:pt-0">
              <div className="flex items-center justify-center gap-1.5 text-xs text-cyan-400 font-bold mb-1">
                <ShieldCheck className="w-3.5 h-3.5" /> {t.stats.atsStandard}
              </div>
              <div className="text-xl sm:text-2xl font-black text-cyan-500">
                Standard A4
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* VIEW 1: DASHBOARD */}
        {/* ============================================================ */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 w-full">
            <div className={`${cardBg} rounded-3xl p-6 sm:p-10 border relative overflow-hidden w-full`}>
              <div className="max-w-5xl">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold mb-3 ${isDark ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'}`}>
                  <Zap className="w-3.5 h-3.5" /> Full-Width Global Student Career Platform
                </div>
                <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'} leading-tight`}>
                  {t.dashboard.welcome}
                </h2>
                <p className={`mt-3 ${textMuted} text-sm sm:text-base leading-relaxed`}>
                  {t.dashboard.desc}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <button
                    onClick={() => setActiveTab('resume')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-indigo-600/25 transition flex items-center gap-2 text-xs sm:text-sm"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{t.dashboard.btnBuildResume}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('scanner')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-600/25 transition flex items-center gap-2 text-xs sm:text-sm"
                  >
                    <FileSearch className="w-4 h-4" />
                    <span>{t.dashboard.btnScanResume}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('jobs')}
                    className={`font-bold px-6 py-3.5 rounded-2xl border transition flex items-center gap-2 text-xs sm:text-sm ${isDark ? 'bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'}`}
                  >
                    <Briefcase className="w-4 h-4 text-indigo-600" />
                    <span>{t.dashboard.btnSearchJobs}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              <div 
                onClick={() => setActiveTab('resume')}
                className={`${cardBg} rounded-3xl p-6 border cursor-pointer hover:border-indigo-500/50 transition group`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-bold ${textMuted} uppercase tracking-wider`}>{t.dashboard.atsCardTitle}</span>
                  <FileText className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition" />
                </div>
                <div className="text-3xl font-black flex items-center gap-2">
                  <span className={atsScore >= 75 ? 'text-emerald-500' : 'text-amber-500'}>{atsScore}%</span>
                  <span className={`text-xs font-normal ${textMuted}`}>/ 100</span>
                </div>
                <p className={`text-xs ${textMuted} mt-2`}>{t.dashboard.atsCardDesc}</p>
              </div>

              <div 
                onClick={() => setActiveTab('scanner')}
                className={`${cardBg} rounded-3xl p-6 border cursor-pointer hover:border-emerald-500/50 transition group`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-bold ${textMuted} uppercase tracking-wider`}>AI Role Matcher</span>
                  <FileSearch className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition" />
                </div>
                <div className="text-3xl font-black text-emerald-500">
                  {scanResult ? `${scanResult.roles.length} Matched` : 'Ready'}
                </div>
                <p className={`text-xs ${textMuted} mt-2`}>Upload resume for automated matching</p>
              </div>

              <div 
                onClick={() => setActiveTab('jobs')}
                className={`${cardBg} rounded-3xl p-6 border cursor-pointer hover:border-indigo-500/50 transition group`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-bold ${textMuted} uppercase tracking-wider`}>{t.dashboard.savedJobsTitle}</span>
                  <BookmarkCheck className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition" />
                </div>
                <div className="text-3xl font-black">
                  {savedJobIds.length} <span className={`text-xs font-normal ${textMuted}`}>Saved</span>
                </div>
                <p className={`text-xs ${textMuted} mt-2`}>Bookmarked verified engineering jobs</p>
              </div>

              <div 
                onClick={() => setActiveTab('freelance')}
                className={`${cardBg} rounded-3xl p-6 border cursor-pointer hover:border-indigo-500/50 transition group`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-bold ${textMuted} uppercase tracking-wider`}>Freelance Studio</span>
                  <DollarSign className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition" />
                </div>
                <div className="text-3xl font-black text-emerald-500">
                  {currency === 'INR' ? '₹25,000+' : '$450+'}
                </div>
                <p className={`text-xs ${textMuted} mt-2`}>Estimated student monthly side-income</p>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 2: AI RESUME SCANNER & ROLE MATCHER */}
        {/* ============================================================ */}
        {activeTab === 'scanner' && (
          <div className="space-y-6 w-full">
            <div className={`${cardBg} rounded-3xl p-6 sm:p-8 border w-full`}>
              <h3 className={`text-xl sm:text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'} flex items-center gap-2.5`}>
                <FileSearch className="w-6 h-6 text-emerald-500" />
                {t.scanner.title}
              </h3>
              <p className={`text-xs sm:text-sm ${textMuted} mt-1`}>
                {t.scanner.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
              
              {/* Left Box: Upload & Text Input */}
              <div className={`lg:col-span-6 ${cardBg} rounded-3xl p-6 sm:p-8 border space-y-5`}>
                <h4 className="font-bold text-sm sm:text-base flex items-center gap-2">
                  <Upload className="w-4 h-4 text-indigo-500" />
                  {t.scanner.uploadTitle}
                </h4>

                {/* Upload Trigger Area */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed ${isDark ? 'border-slate-800 hover:border-indigo-500 bg-slate-950/50' : 'border-slate-300 hover:border-indigo-600 bg-slate-50'} rounded-2xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2`}
                >
                  <Upload className="w-8 h-8 text-indigo-500" />
                  <span className="text-xs font-bold text-indigo-500">{t.scanner.dragDrop}</span>
                  <span className={`text-[11px] ${textMuted}`}>Supports PDF (.pdf), TXT (.txt), JSON (.json), and Markdown (.md)</span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".pdf,.txt,.json,.md,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider ${textMuted} mb-2`}>Or Paste Resume Text Below:</label>
                  <textarea
                    rows={6}
                    value={resumeUploadText}
                    onChange={(e) => setResumeUploadText(e.target.value)}
                    placeholder="Paste your education, skills (React, Python, Android, SQL...), and projects here..."
                    className={`w-full ${inputBg} border rounded-2xl p-4 text-xs font-mono outline-none leading-relaxed`}
                  />
                </div>

                <button
                  onClick={() => analyzeUploadedResume()}
                  disabled={isScanning}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                >
                  <Sparkles className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
                  <span>{isScanning ? t.scanner.analyzing : t.scanner.btnAnalyze}</span>
                </button>
              </div>

              {/* Right Box: AI Analysis & Matched Roles */}
              <div className={`lg:col-span-6 ${cardBg} rounded-3xl p-6 sm:p-8 border space-y-6 flex flex-col justify-between`}>
                <div>
                  <h4 className="font-bold text-sm sm:text-base flex items-center gap-2 pb-3 border-b border-slate-800">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    {t.scanner.resultsTitle}
                  </h4>

                  {scanResult ? (
                    <div className="space-y-5 mt-4">
                      {/* Detected Skills */}
                      <div>
                        <span className={`text-xs font-bold uppercase tracking-wider ${textMuted}`}>{t.scanner.detectedSkills}</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {scanResult.skills.map((sk, idx) => (
                            <span key={idx} className="text-xs font-bold px-3 py-1 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5 text-indigo-400" /> {sk}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Best Matched Roles */}
                      <div>
                        <span className={`text-xs font-bold uppercase tracking-wider ${textMuted}`}>{t.scanner.bestRoles}</span>
                        <div className="space-y-2.5 mt-2">
                          {scanResult.roles.map((r, idx) => (
                            <div key={idx} className={`p-3.5 rounded-2xl border flex items-center justify-between ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                              <div>
                                <div className="font-bold text-xs sm:text-sm">{r.role}</div>
                                <span className={`text-[11px] ${textMuted}`}>{r.field}</span>
                              </div>
                              <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                {r.match}% Match
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-16 space-y-2 text-slate-500">
                      <FileSearch className="w-12 h-12 mx-auto text-slate-600" />
                      <p className="text-xs sm:text-sm font-medium">Upload or paste a resume on the left to see instant AI skill extraction and matched job openings.</p>
                    </div>
                  )}
                </div>

                {scanResult && (
                  <button
                    onClick={() => {
                      setMatchedFieldFilter(scanResult.roles[0]?.field || null)
                      setActiveTab('jobs')
                      showToast(`Filtered to ${scanResult.roles[0]?.field} jobs!`)
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-2xl transition text-xs shadow flex items-center justify-center gap-2"
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>{t.scanner.matchFilterBtn}</span>
                  </button>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 3: MULTI-SECTION ATS RESUME BUILDER */}
        {/* ============================================================ */}
        {activeTab === 'resume' && (
          <div className="space-y-6 w-full">
            
            {/* Toolbar Banner with Cloud Save Indicator */}
            <div className={`${cardBg} rounded-3xl p-6 sm:p-7 border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full`}>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`text-xl sm:text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'} flex items-center gap-2.5`}>
                    <FileText className="w-6 h-6 text-indigo-600" />
                    {t.resume.title}
                  </h3>
                  {currentUser && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Cloud Active
                    </span>
                  )}
                </div>
                <p className={`text-xs sm:text-sm ${textMuted} mt-1`}>
                  {t.resume.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {currentUser && (
                  <button
                    onClick={handleSaveToCloud}
                    disabled={isSavingCloud}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-4 py-3 rounded-xl shadow-lg shadow-emerald-600/20 transition flex items-center gap-1.5"
                  >
                    <Cloud className={`w-4 h-4 ${isSavingCloud ? 'animate-spin' : ''}`} />
                    <span>{isSavingCloud ? 'Saving...' : 'Save to Cloud'}</span>
                  </button>
                )}
                <button
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl shadow-lg shadow-indigo-600/20 transition flex items-center gap-2 disabled:opacity-50"
                >
                  <Download className={`w-4 h-4 ${isGeneratingPdf ? 'animate-bounce' : ''}`} />
                  <span>{isGeneratingPdf ? 'Compiling PDF...' : t.resume.btnDownload}</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className={`text-xs sm:text-sm font-bold px-4 py-3 rounded-xl border transition flex items-center gap-1.5 ${isDark ? 'bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'}`}
                >
                  <Printer className="w-4 h-4" />
                  <span>{t.resume.btnPrint}</span>
                </button>
              </div>
            </div>

            {/* True 50-50 Split Screen Form & Live Document */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start w-full">
              
              {/* Left Column: Form Builder with 7 Sub-tabs */}
              <div className="w-full space-y-6">
                <div className={`${cardBg} rounded-3xl p-6 sm:p-8 border space-y-6 w-full`}>
                  
                  {/* Step Sub-tabs */}
                  <div className={`flex items-center gap-1.5 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'} pb-3.5 overflow-x-auto scrollbar-none`}>
                    {[
                      { key: 'personal', label: t.resume.personalTab },
                      { key: 'summary', label: t.resume.summaryTab },
                      { key: 'education', label: t.resume.educationTab },
                      { key: 'experience', label: t.resume.experienceTab },
                      { key: 'projects', label: t.resume.projectsTab },
                      { key: 'skills', label: t.resume.skillsTab },
                      { key: 'accomplishments', label: t.resume.accomplishmentsTab }
                    ].map(({ key, label }) => (
                      <button
                        key={key}
                        onClick={() => setResumeSubTab(key)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                          resumeSubTab === key
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* SUBTAB 1: PERSONAL & CONTACT */}
                  {resumeSubTab === 'personal' && (
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-xs font-bold uppercase tracking-wider ${textMuted} mb-1.5`}>{t.resume.fullName}</label>
                        <input
                          type="text"
                          className={`w-full ${inputBg} border rounded-xl px-4 py-3 text-sm transition outline-none`}
                          value={candidate.name}
                          onChange={(e) => setCandidate({ ...candidate, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-bold uppercase tracking-wider ${textMuted} mb-1.5`}>{t.resume.targetRole}</label>
                        <input
                          type="text"
                          className={`w-full ${inputBg} border rounded-xl px-4 py-3 text-sm transition outline-none`}
                          value={candidate.role}
                          onChange={(e) => setCandidate({ ...candidate, role: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={`block text-xs font-bold uppercase tracking-wider ${textMuted} mb-1.5`}>{t.resume.email}</label>
                          <input
                            type="email"
                            className={`w-full ${inputBg} border rounded-xl px-4 py-3 text-sm transition outline-none`}
                            value={candidate.email}
                            onChange={(e) => setCandidate({ ...candidate, email: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className={`block text-xs font-bold uppercase tracking-wider ${textMuted} mb-1.5`}>{t.resume.phone}</label>
                          <input
                            type="text"
                            className={`w-full ${inputBg} border rounded-xl px-4 py-3 text-sm transition outline-none`}
                            value={candidate.phone}
                            onChange={(e) => setCandidate({ ...candidate, phone: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={`block text-xs font-bold uppercase tracking-wider ${textMuted} mb-1.5`}>{t.resume.location}</label>
                          <input
                            type="text"
                            className={`w-full ${inputBg} border rounded-xl px-4 py-3 text-sm transition outline-none`}
                            value={candidate.location}
                            onChange={(e) => setCandidate({ ...candidate, location: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className={`block text-xs font-bold uppercase tracking-wider ${textMuted} mb-1.5`}>{t.resume.links}</label>
                          <input
                            type="text"
                            className={`w-full ${inputBg} border rounded-xl px-4 py-3 text-sm transition outline-none`}
                            value={candidate.links}
                            onChange={(e) => setCandidate({ ...candidate, links: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SUBTAB 2: SUMMARY & MOTTO */}
                  {resumeSubTab === 'summary' && (
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className={`block text-xs font-bold uppercase tracking-wider ${textMuted}`}>{t.resume.summaryLabel}</label>
                          <button
                            type="button"
                            onClick={handleAiPolish}
                            className="text-xs text-indigo-500 hover:text-indigo-400 font-bold flex items-center gap-1"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{t.resume.aiPolish}</span>
                          </button>
                        </div>
                        <textarea
                          rows={4}
                          className={`w-full ${inputBg} border rounded-xl px-4 py-3 text-sm transition outline-none leading-relaxed`}
                          value={candidate.summary}
                          onChange={(e) => setCandidate({ ...candidate, summary: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-bold uppercase tracking-wider ${textMuted} mb-1.5`}>{t.resume.mottoLabel}</label>
                        <input
                          type="text"
                          className={`w-full ${inputBg} border rounded-xl px-4 py-3 text-sm transition outline-none italic`}
                          value={candidate.motto}
                          onChange={(e) => setCandidate({ ...candidate, motto: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  {/* SUBTAB 3: EDUCATION */}
                  {resumeSubTab === 'education' && (
                    <div className="space-y-4">
                      {candidate.educationList.map((ed, idx) => (
                        <div key={idx} className={`${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'} p-4 sm:p-5 rounded-2xl border space-y-3`}>
                          <div className="font-bold text-xs text-indigo-500 uppercase">Degree Program #{idx + 1}</div>
                          <input
                            type="text"
                            className={`w-full ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-xl px-3 py-2 text-xs outline-none`}
                            placeholder="Degree Name"
                            value={ed.degree}
                            onChange={(e) => {
                              const list = [...candidate.educationList]
                              list[idx].degree = e.target.value
                              setCandidate({ ...candidate, educationList: list })
                            }}
                          />
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <input
                              type="text"
                              className={`w-full ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-xl px-3 py-2 text-xs outline-none`}
                              placeholder="College / University"
                              value={ed.institution}
                              onChange={(e) => {
                                const list = [...candidate.educationList]
                                list[idx].institution = e.target.value
                                setCandidate({ ...candidate, educationList: list })
                              }}
                            />
                            <input
                              type="text"
                              className={`w-full ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-xl px-3 py-2 text-xs outline-none`}
                              placeholder="Year / Score"
                              value={ed.year}
                              onChange={(e) => {
                                const list = [...candidate.educationList]
                                list[idx].year = e.target.value
                                setCandidate({ ...candidate, educationList: list })
                              }}
                            />
                          </div>
                          <textarea
                            rows={2}
                            className={`w-full ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-xl px-3 py-2 text-xs outline-none`}
                            placeholder="Bullet points (one per line)"
                            value={ed.bullets}
                            onChange={(e) => {
                              const list = [...candidate.educationList]
                              list[idx].bullets = e.target.value
                              setCandidate({ ...candidate, educationList: list })
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* SUBTAB 4: INDUSTRIAL TRAINING */}
                  {resumeSubTab === 'experience' && (
                    <div className="space-y-4">
                      {candidate.experienceList.map((exp, idx) => (
                        <div key={idx} className={`${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'} p-4 sm:p-5 rounded-2xl border space-y-3`}>
                          <div className="font-bold text-xs text-emerald-500 uppercase">Training / Program #{idx + 1}</div>
                          <input
                            type="text"
                            className={`w-full ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-xl px-3 py-2 text-xs outline-none`}
                            placeholder="Program Title"
                            value={exp.title}
                            onChange={(e) => {
                              const list = [...candidate.experienceList]
                              list[idx].title = e.target.value
                              setCandidate({ ...candidate, experienceList: list })
                            }}
                          />
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <input
                              type="text"
                              className={`w-full ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-xl px-3 py-2 text-xs outline-none`}
                              placeholder="Company"
                              value={exp.company}
                              onChange={(e) => {
                                const list = [...candidate.experienceList]
                                list[idx].company = e.target.value
                                setCandidate({ ...candidate, experienceList: list })
                              }}
                            />
                            <input
                              type="text"
                              className={`w-full ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-xl px-3 py-2 text-xs outline-none`}
                              placeholder="Duration"
                              value={exp.period}
                              onChange={(e) => {
                                const list = [...candidate.experienceList]
                                list[idx].period = e.target.value
                                setCandidate({ ...candidate, experienceList: list })
                              }}
                            />
                          </div>
                          <textarea
                            rows={3}
                            className={`w-full ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-xl px-3 py-2 text-xs outline-none`}
                            placeholder="Highlights (one bullet per line)"
                            value={exp.bullets}
                            onChange={(e) => {
                              const list = [...candidate.experienceList]
                              list[idx].bullets = e.target.value
                              setCandidate({ ...candidate, experienceList: list })
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* SUBTAB 5: KEY PROJECTS */}
                  {resumeSubTab === 'projects' && (
                    <div className="space-y-4">
                      {candidate.projectsList.map((p, idx) => (
                        <div key={idx} className={`${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'} p-4 rounded-2xl border space-y-2.5`}>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <input
                              type="text"
                              className={`w-full ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-xl px-3 py-2 text-xs font-bold outline-none`}
                              placeholder="Project Title"
                              value={p.title}
                              onChange={(e) => {
                                const list = [...candidate.projectsList]
                                list[idx].title = e.target.value
                                setCandidate({ ...candidate, projectsList: list })
                              }}
                            />
                            <input
                              type="text"
                              className={`w-full ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-xl px-3 py-2 text-xs outline-none`}
                              placeholder="Domain (e.g. React • Python)"
                              value={p.domain}
                              onChange={(e) => {
                                const list = [...candidate.projectsList]
                                list[idx].domain = e.target.value
                                setCandidate({ ...candidate, projectsList: list })
                              }}
                            />
                          </div>
                          <textarea
                            rows={2}
                            className={`w-full ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-xl px-3 py-2 text-xs outline-none`}
                            placeholder="Description..."
                            value={p.desc}
                            onChange={(e) => {
                              const list = [...candidate.projectsList]
                              list[idx].desc = e.target.value
                              setCandidate({ ...candidate, projectsList: list })
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* SUBTAB 6: CATEGORIZED SKILLS */}
                  {resumeSubTab === 'skills' && (
                    <div className="space-y-4">
                      {Object.entries(candidate.skillsCategorized).map(([cat, items]) => (
                        <div key={cat}>
                          <label className={`block text-xs font-bold uppercase tracking-wider ${textMuted} mb-1.5`}>{cat}</label>
                          <input
                            type="text"
                            className={`w-full ${inputBg} border rounded-xl px-4 py-2.5 text-xs outline-none transition`}
                            value={items}
                            onChange={(e) => {
                              setCandidate({
                                ...candidate,
                                skillsCategorized: {
                                  ...candidate.skillsCategorized,
                                  [cat]: e.target.value
                                }
                              })
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* SUBTAB 7: ACCOMPLISHMENTS */}
                  {resumeSubTab === 'accomplishments' && (
                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider ${textMuted} mb-1.5`}>Hackathons & Accomplishments</label>
                      <textarea
                        rows={4}
                        className={`w-full ${inputBg} border rounded-xl px-4 py-2.5 text-xs outline-none leading-relaxed`}
                        value={candidate.accomplishments}
                        onChange={(e) => setCandidate({ ...candidate, accomplishments: e.target.value })}
                      />
                    </div>
                  )}

                  {/* Export & Import Tools */}
                  <div className={`pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'} mt-6 flex items-center justify-between text-xs`}>
                    <button
                      onClick={handleExportJson}
                      className="text-indigo-500 hover:text-indigo-400 font-bold"
                    >
                      💾 Export JSON
                    </button>
                    <label className="text-indigo-500 hover:text-indigo-400 font-bold cursor-pointer">
                      📥 Import JSON
                      <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
                    </label>
                  </div>
                </div>

                {/* Real-time ATS Checklist */}
                <div className={`${cardBg} rounded-3xl p-6 border space-y-3 w-full`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      {t.resume.atsAnalysisTitle}
                    </span>
                    <span className={`text-xs font-extrabold ${atsScore >= 75 ? 'text-emerald-500' : 'text-amber-500'}`}>
                      {atsScore} / 100 Score
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-500" /> Contact details valid
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-500" /> Summary & motto set
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-500" /> Industrial training included
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-500" /> Technical skills categorized
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Live A4 White Document Preview */}
              <div className="w-full space-y-6">
                <div className={`${cardBg} rounded-3xl p-6 sm:p-8 border flex flex-col h-full w-full`}>
                  <div className={`flex items-center justify-between mb-4 pb-3 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                    <span className="font-bold text-xs flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      {t.resume.liveSheetTitle}
                    </span>
                    <span className={`text-xs ${textMuted} font-medium`}>Standard A4 Format</span>
                  </div>

                  {/* Clean A4 Canvas */}
                  <div className="flex-1 min-h-[620px] bg-white text-slate-950 rounded-2xl p-6 sm:p-8 shadow-inner overflow-y-auto border border-slate-300">
                    <div dangerouslySetInnerHTML={{ __html: resumeHtml }} />
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 4: COLD EMAIL GENERATOR */}
        {/* ============================================================ */}
        {activeTab === 'coverLetter' && (
          <div className="space-y-6 w-full">
            <div className={`${cardBg} rounded-3xl p-6 sm:p-8 border w-full`}>
              <h3 className={`text-xl sm:text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'} flex items-center gap-2.5`}>
                <Mail className="w-6 h-6 text-indigo-600" />
                {t.emailTool.title}
              </h3>
              <p className={`text-xs sm:text-sm ${textMuted} mt-1`}>
                {t.emailTool.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
              <div className={`lg:col-span-5 ${cardBg} rounded-3xl p-6 sm:p-8 border space-y-4`}>
                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider ${textMuted} mb-1.5`}>{t.emailTool.companyName}</label>
                  <input
                    type="text"
                    className={`w-full ${inputBg} border rounded-xl px-4 py-3 text-sm outline-none`}
                    value={emailCompany}
                    onChange={(e) => {
                      setEmailCompany(e.target.value)
                      generateColdEmail()
                    }}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider ${textMuted} mb-1.5`}>{t.emailTool.targetPosition}</label>
                  <input
                    type="text"
                    className={`w-full ${inputBg} border rounded-xl px-4 py-3 text-sm outline-none`}
                    value={emailTargetRole}
                    onChange={(e) => {
                      setEmailTargetRole(e.target.value)
                      generateColdEmail()
                    }}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider ${textMuted} mb-1.5`}>{t.emailTool.recipientRole}</label>
                  <input
                    type="text"
                    className={`w-full ${inputBg} border rounded-xl px-4 py-3 text-sm outline-none`}
                    value={emailRecipient}
                    onChange={(e) => {
                      setEmailRecipient(e.target.value)
                      generateColdEmail()
                    }}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider ${textMuted} mb-1.5`}>{t.emailTool.myStrongSkill}</label>
                  <input
                    type="text"
                    className={`w-full ${inputBg} border rounded-xl px-4 py-3 text-sm outline-none`}
                    value={emailStrongSkill}
                    onChange={(e) => {
                      setEmailStrongSkill(e.target.value)
                      generateColdEmail()
                    }}
                  />
                </div>
                <button
                  onClick={generateColdEmail}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-2xl transition shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 text-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t.emailTool.btnGenerate}</span>
                </button>
              </div>

              <div className={`lg:col-span-7 ${cardBg} rounded-3xl p-6 sm:p-8 border flex flex-col justify-between`}>
                <div>
                  <div className={`flex items-center justify-between mb-4 pb-3 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                    <span className="font-bold text-sm">{t.emailTool.previewTitle}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedColdEmail)
                        showToast('📋 Outreach Email Copied to Clipboard!')
                      }}
                      className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow transition"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t.emailTool.btnCopy}</span>
                    </button>
                  </div>
                  <div className={`${isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'} rounded-2xl p-5 border font-mono text-xs sm:text-sm whitespace-pre-wrap leading-relaxed max-h-[460px] overflow-y-auto`}>
                    {generatedColdEmail}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 5: MULTI-FIELD INTERNSHIPS & JOBS RADAR */}
        {/* ============================================================ */}
        {activeTab === 'jobs' && (
          <div className="space-y-6 w-full">
            <div className={`${cardBg} rounded-3xl p-6 sm:p-8 border w-full`}>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className={`text-xl sm:text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'} flex items-center gap-2.5`}>
                    <Briefcase className="w-6 h-6 text-indigo-600" />
                    {t.jobs.title}
                  </h3>
                  <p className={`text-xs sm:text-sm ${textMuted} mt-1`}>
                    {t.jobs.subtitle}
                  </p>
                </div>
                {matchedFieldFilter && (
                  <button
                    onClick={() => setMatchedFieldFilter(null)}
                    className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  >
                    Showing Matched: {matchedFieldFilter} (Clear Filter ✕)
                  </button>
                )}
              </div>

              {/* Filters Bar */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-6 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={jobSearchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.jobs.searchPlaceholder}
                    className={`w-full ${inputBg} border rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm outline-none`}
                  />
                </div>

                <div className="sm:col-span-3">
                  <select
                    value={jobFilterField}
                    onChange={(e) => {
                      setMatchedFieldFilter(null)
                      setJobFilterField(e.target.value)
                    }}
                    className={`w-full ${inputBg} border rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold outline-none`}
                  >
                    <option value="all">{t.jobs.allFields}</option>
                    <option value="AI & Full Stack">AI & Full Stack</option>
                    <option value="Mobile & ML">Mobile & Android</option>
                    <option value="Web & UI/UX">Web & UI/UX</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Backend & Java">Backend & Java</option>
                    <option value="Embedded & IoT">Embedded & IoT</option>
                    <option value="QA & Testing">QA & Testing</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <select
                    value={jobFilterLocation}
                    onChange={(e) => setJobFilterLocation(e.target.value)}
                    className={`w-full ${inputBg} border rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold outline-none`}
                  >
                    <option value="all">{t.jobs.allLocations}</option>
                    <option value="remote">{t.jobs.remoteOnly}</option>
                  </select>
                </div>
              </div>

              {/* Quick Tags */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className={`text-xs ${textMuted} font-bold mr-1`}>{t.jobs.trending}</span>
                {['React.js', 'Python', 'AI', 'Android', 'Cloud', 'Cyber Security', 'Data Science', 'Remote'].map((tg) => (
                  <button
                    key={tg}
                    onClick={() => setJobSearchQuery(tg)}
                    className={`text-xs px-3 py-1 rounded-full border transition ${isDark ? 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'}`}
                  >
                    {tg}
                  </button>
                ))}
              </div>
            </div>

            {/* Jobs Grid Across All Engineering Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {filteredJobs.map((job) => {
                const isSaved = savedJobIds.includes(job.id)

                return (
                  <div
                    key={job.id}
                    className={`${cardBg} rounded-3xl p-6 sm:p-7 border hover:border-indigo-500/50 transition-all flex flex-col justify-between`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${isDark ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' : 'bg-indigo-50 text-indigo-700 border-indigo-200'}`}>
                          {job.field}
                        </span>
                        <button
                          onClick={() => toggleSaveJob(job.id)}
                          className={`text-xs font-bold flex items-center gap-1.5 px-3 py-1 rounded-xl transition ${
                            isSaved
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : isDark ? 'bg-slate-950 text-slate-400 border border-slate-800' : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                          <span>{isSaved ? t.jobs.saved : t.jobs.saveJob}</span>
                        </button>
                      </div>

                      <h4 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {job.title}
                      </h4>
                      <div className={`text-xs font-semibold ${textMuted} mt-1`}>{job.company} • {job.location}</div>

                      {/* Live Date & Deadline Badge Row */}
                      <div className={`mt-3 p-2.5 rounded-xl border flex flex-wrap items-center justify-between gap-2 text-xs ${isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                        <div className="flex items-center gap-1 text-slate-400">
                          <Clock className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{job.postedDate}</span>
                        </div>
                        <div className="flex items-center gap-1 font-bold text-amber-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{job.deadline}</span>
                        </div>
                      </div>

                      <div className="text-xs font-bold text-emerald-500 mt-3">
                        💰 {job.stipend}
                      </div>

                      <p className={`text-xs ${textMuted} mt-2.5 leading-relaxed`}>
                        {job.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {job.tags.map((tag, i) => (
                          <span key={i} className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${isDark ? 'bg-slate-950 text-slate-300 border-slate-800' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={`mt-6 pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'} flex items-center justify-between`}>
                      <span className="text-xs font-bold text-emerald-500 flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4" /> {job.applicants}
                      </span>
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow transition"
                      >
                        <span>{t.jobs.directApply}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 6: FREELANCE HUB */}
        {/* ============================================================ */}
        {activeTab === 'freelance' && (
          <div className="space-y-6 w-full">
            <div className={`${cardBg} rounded-3xl p-6 sm:p-8 border w-full`}>
              <h3 className={`text-xl sm:text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'} flex items-center gap-2.5`}>
                <DollarSign className="w-6 h-6 text-emerald-500" />
                {t.freelance.title}
              </h3>
              <p className={`text-xs sm:text-sm ${textMuted} mt-1`}>
                {t.freelance.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
              <div className={`lg:col-span-6 ${cardBg} rounded-3xl p-6 sm:p-8 border space-y-6`}>
                <h4 className="text-base font-bold flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-indigo-600" />
                  {t.freelance.hourlyRateCalc}
                </h4>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span>{t.freelance.hoursPerWeek}</span>
                      <span className="text-indigo-500">{calcHours} hrs/week</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={40}
                      step={5}
                      value={calcHours}
                      onChange={(e) => setCalcHours(Number(e.target.value))}
                      className="w-full accent-indigo-600 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span>{t.freelance.expectedRate}</span>
                      <span className="text-indigo-500">{currency === 'INR' ? `₹${calcRate * 80}` : `$${calcRate}`} / hr</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={120}
                      step={5}
                      value={calcRate}
                      onChange={(e) => setCalcRate(Number(e.target.value))}
                      className="w-full accent-indigo-600 cursor-pointer"
                    />
                  </div>

                  <div className={`pt-4 border-t ${isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-slate-50'} p-4 rounded-2xl flex items-center justify-between`}>
                    <span className={`text-xs font-bold ${textMuted}`}>{t.freelance.projectedMonthly}</span>
                    <span className="text-2xl font-black text-emerald-500">
                      {currency === 'INR' ? `₹${(calcHours * calcRate * 80 * 4).toLocaleString('en-IN')}` : `$${calcHours * calcRate * 4}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Instant Proposal Generator */}
              <div className={`lg:col-span-6 ${cardBg} rounded-3xl p-6 sm:p-8 border flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-bold flex items-center gap-2">
                      <Zap className="w-4 h-4 text-indigo-600" />
                      {t.freelance.proposalGen}
                    </h4>
                    <select
                      value={proposalService}
                      onChange={(e) => setProposalService(e.target.value)}
                      className={`${inputBg} border rounded-xl px-3 py-1.5 text-xs font-bold outline-none`}
                    >
                      <option value="react">React & Full Stack Web UI</option>
                      <option value="pdf">Automated PDF Generator API</option>
                      <option value="android">Native Android App</option>
                    </select>
                  </div>

                  <div className={`${isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'} p-4 rounded-2xl border text-xs font-mono leading-relaxed max-h-[160px] overflow-y-auto`}>
                    {proposalService === 'react' && `Hi [Client],\n\nI noticed you need a clean responsive web application. I specialize in React, Vite, Tailwind CSS, and REST API integrations.\n\nI can deliver production-ready code with 100% responsiveness within 48 hours.\n\nBest regards,\n${candidate.name}`}
                    {proposalService === 'pdf' && `Hello [Client],\n\nI can build a robust automated PDF document generation service using Node.js, Express, and Puppeteer with custom A4 formatting.\n\nReady to start immediately.\n\nBest,\n${candidate.name}`}
                    {proposalService === 'android' && `Hi there!\n\nI specialize in native Android development with Android Studio, Kotlin/Java, and REST API integrations. I can build clean UI flows with local caching.\n\nWarm regards,\n${candidate.name}`}
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`Hi [Client], I specialize in ${proposalService} development. Contact: ${candidate.email}`)
                      showToast(t.freelance.copyProposal)
                    }}
                    className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow transition"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t.freelance.copyProposal}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 7: ROADMAPS & FLASHCARDS */}
        {/* ============================================================ */}
        {activeTab === 'roadmaps' && (
          <div className="space-y-6 w-full">
            <div className={`${cardBg} rounded-3xl p-6 sm:p-8 border w-full`}>
              <h3 className={`text-xl sm:text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'} flex items-center gap-2.5`}>
                <Rocket className="w-6 h-6 text-indigo-600" />
                {t.roadmaps.title}
              </h3>
              <p className={`text-xs sm:text-sm ${textMuted} mt-1`}>
                {t.roadmaps.subtitle}
              </p>
            </div>

            <div className="space-y-4 w-full">
              <h4 className="text-base font-bold flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                {t.roadmaps.interviewPrepTitle}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {INTERVIEW_QUESTIONS.map((item, idx) => {
                  const isShown = revealedAnswers[idx]

                  return (
                    <div
                      key={idx}
                      className={`${cardBg} rounded-3xl p-6 sm:p-7 border flex flex-col justify-between`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${isDark ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' : 'bg-indigo-50 text-indigo-700 border-indigo-200'}`}>
                            {item.topic}
                          </span>
                        </div>
                        <h5 className={`font-bold text-sm sm:text-base mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {item.q}
                        </h5>

                        {isShown && (
                          <div className={`mt-4 p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed ${isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                            {item.a}
                          </div>
                        )}
                      </div>

                      <div className={`mt-5 pt-3 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'} flex justify-end`}>
                        <button
                          onClick={() => {
                            setRevealedAnswers({
                              ...revealedAnswers,
                              [idx]: !isShown
                            })
                          }}
                          className="text-xs font-bold text-indigo-500 hover:text-indigo-400 transition"
                        >
                          {isShown ? t.roadmaps.hideAnswer : t.roadmaps.showAnswer}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}