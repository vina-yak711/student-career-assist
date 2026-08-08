import React, { useState, useEffect } from 'react'
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
  ShieldCheck,
  Rocket,
  CheckSquare,
  Square,
  RefreshCw,
  Printer,
  ChevronRight,
  Terminal,
  Send,
  GitBranch,
  Github,
  Bookmark,
  BookmarkCheck,
  Mail,
  Sliders,
  HelpCircle,
  FileSpreadsheet,
  Check,
  Clock,
  MapPin,
  Building,
  User,
  Phone,
  Link as LinkIcon,
  ChevronDown,
  LayoutDashboard,
  MessageSquareQuote,
  Target,
  Plus,
  Trash2
} from 'lucide-react'

// Multilingual Translations (Default: English)
const TRANSLATIONS = {
  en: {
    langName: 'English',
    flag: '🌐',
    brandName: 'VynkAI CareerForge',
    brandBadge: 'Global Career Accelerator',
    nav: {
      dashboard: 'Dashboard',
      resume: 'ATS Resume Studio',
      coverLetter: 'Cold Email & Pitch',
      jobs: 'Internships & Jobs',
      freelance: 'Freelance Hub',
      roadmaps: 'Roadmaps & Prep'
    },
    dashboard: {
      welcome: 'Welcome to VynkAI CareerForge',
      desc: 'Build multi-section ATS resumes, discover global internships, and monetize software engineering skills.',
      atsCardTitle: 'Resume ATS Score',
      atsCardDesc: 'Automated screening compatibility',
      savedJobsTitle: 'Saved Opportunities',
      activeRoadmapsTitle: 'Roadmap Milestones',
      quickActions: 'Quick Launch Actions',
      btnBuildResume: 'Build ATS Resume',
      btnSearchJobs: 'Search Internships',
      btnWriteEmail: 'Draft Cold Email'
    },
    resume: {
      title: 'Professional Multi-Section ATS Resume Studio',
      subtitle: 'Structured format matching top tech engineering standards with live vector PDF export.',
      personalTab: '1. Personal & Contact',
      summaryTab: '2. Summary & Motto',
      educationTab: '3. Education History',
      experienceTab: '4. Industrial Training',
      projectsTab: '5. Key Projects',
      skillsTab: '6. Categorized Skills',
      accomplishmentsTab: '7. Hackathons',
      fullName: 'Full Name',
      targetRole: 'Professional Title / Specialization',
      email: 'Email Address',
      phone: 'Phone / WhatsApp',
      location: 'Location / State',
      links: 'GitHub / LinkedIn / Portfolio URLs',
      summaryLabel: 'Professional Summary',
      mottoLabel: 'Career Motto / Inspiring Quote (Optional)',
      aiPolish: 'AI Enhance Summary',
      templateStyle: 'Resume Format Theme:',
      modernTech: 'Modern Tech Suite',
      minimalATS: 'Classic ATS',
      executive: 'Executive Indigo',
      btnUpdate: 'Update Live Sheet',
      btnDownload: 'Download Vector PDF',
      btnPrint: 'Print Sheet',
      btnExportJson: 'Export Profile JSON',
      btnImportJson: 'Import Profile JSON',
      liveSheetTitle: 'Live A4 Print-Ready Document',
      atsAnalysisTitle: 'ATS Quality Health Check'
    },
    emailTool: {
      title: 'AI Cold Email & Cover Letter Generator',
      subtitle: 'Generate tailored outreach pitches for recruiters and founders in seconds.',
      recipientRole: 'Recipient Role / Name',
      companyName: 'Company Name',
      targetPosition: 'Target Job / Internship',
      myStrongSkill: 'Your Strongest Technical Skill',
      btnGenerate: 'Generate Pitch',
      btnCopy: 'Copy Outreach Email',
      previewTitle: 'Generated Cold Email:'
    },
    jobs: {
      title: 'Global Internship & Fresher Job Radar',
      subtitle: 'Curated remote, hybrid, and campus opportunities for students and fresh graduates.',
      searchPlaceholder: 'Search by role or tech stack (e.g. React, Node.js, Python, Full Stack)...',
      allLocations: 'All Locations',
      remoteOnly: 'Remote Only',
      stipendFilter: 'Paid / Stipend',
      directApply: 'Direct Apply',
      saveJob: 'Save',
      saved: 'Saved',
      trending: 'Trending Searches:'
    },
    freelance: {
      title: 'Student Freelance Launchpad & Invoicing',
      subtitle: 'Actionable tactics to secure initial contracts on Upwork, Fiverr, and Contra.',
      hourlyRateCalc: 'Hourly Rate & Monthly Earnings Estimator',
      hoursPerWeek: 'Available hours / week:',
      expectedRate: 'Target hourly rate:',
      projectedMonthly: 'Projected Monthly Earnings:',
      proposalGen: 'Instant Client Proposal Generator',
      selectGig: 'Select Service Type:',
      copyProposal: 'Copy Proposal'
    },
    roadmaps: {
      title: 'Engineering Roadmaps & Technical Interview Prep',
      subtitle: 'Step-by-step verified learning paths and technical flashcards.',
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
      coverLetter: 'Cold Email & कव्हर लेटर',
      jobs: 'इंटर्नशिप्स & जॉब्स',
      freelance: 'फ्रीलान्सिंग & इन्व्हॉइस',
      roadmaps: 'रोडमॅप & मुलाखत तयारी'
    },
    dashboard: {
      welcome: 'VynkAI CareerForge मध्ये आपले स्वागत आहे',
      desc: 'ATS रिझ्युमे तयार करा, जागतिक इंटर्नशिप्स शोधा आणि कॉलेजमध्ये असतानाच कमाई सुरू करा.',
      atsCardTitle: 'ATS रिझ्युमे दर्जा',
      atsCardDesc: 'ऑटोमेटेड सिस्टममध्ये पास होणारा स्कोअर',
      savedJobsTitle: 'सेव्ह केलेल्या नोकऱ्या',
      activeRoadmapsTitle: 'चालू स्किल्स प्रगती',
      quickActions: 'त्वरित सुरू करा',
      btnBuildResume: 'नवीन Resume बनवा',
      btnSearchJobs: 'नोकऱ्या शोधा',
      btnWriteEmail: 'Cold Email लिहा'
    },
    resume: {
      title: 'व्यावसायिक ATS Resume स्टुडिओ',
      subtitle: 'भारतीय व आंतरराष्ट्रीय कंपन्यांसाठी प्रमाणित A4 फॉरमॅट',
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
      templateStyle: 'Resume डिझाइन फॉरमॅट:',
      modernTech: 'मॉडर्न टेक',
      minimalATS: 'क्लासिक ATS',
      executive: 'एक्झिक्युटिव्ह',
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
      title: 'इंटर्नशिप्स आणि फ्रेशर जॉब रडार',
      subtitle: 'विद्यार्थ्यांसाठी खास निवडक रिमोट, हायब्रिड व ऑन-साइट संधी.',
      searchPlaceholder: 'पद किंवा स्किल शोधा (उदा. React, Node.js, Python, Frontend)...',
      allLocations: 'सर्व शहरे',
      remoteOnly: 'केवळ रिमोट',
      stipendFilter: 'स्टायपेंडसह',
      directApply: 'थेट अर्ज करा',
      saveJob: 'सेव्ह करा',
      saved: 'सेव्ह केले',
      trending: 'लोकप्रिय शोध:'
    },
    freelance: {
      title: 'विद्यार्थी फ्रीलान्सिंग हब & इन्व्हॉइस',
      subtitle: 'कॉलेजमध्ये शिकत असतानाच Upwork आणि Fiverr वरून कमाईचे मार्गदर्शन.',
      hourlyRateCalc: 'तासी दर (Hourly Rate) कॅल्क्युलेटर',
      hoursPerWeek: 'आठवड्याला कामाचे तास:',
      expectedRate: 'अपेक्षित प्रति तास दर:',
      projectedMonthly: 'अपेक्षित मासिक कमाई:',
      proposalGen: 'क्लायंटसाठी इन्स्टंट Proposal जनरेटर',
      selectGig: 'सर्व्हिस प्रकार निवडा:',
      copyProposal: 'Proposal कॉपी करा'
    },
    roadmaps: {
      title: 'इंजिनिअरिंग करिअर रोडमॅप & मुलाखत तयारी',
      subtitle: 'महत्त्वाच्या कोडिंग संकल्पना आणि मुलाखतीसाठी महत्त्वाचे प्रश्नोत्तरे.',
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
      coverLetter: 'Cold Email & कवर लेटर',
      jobs: 'इंटर्नशिप्स & नौकरियां',
      freelance: 'फ्रीलांसिंग & इनवॉइस',
      roadmaps: 'रोडमैप & इंटरव्यू'
    },
    dashboard: {
      welcome: 'VynkAI CareerForge में आपका स्वागत है',
      desc: 'ATS रिज्यूमे बनाएं, वैश्विक इंटर्नशिप खोजें और कॉलेज में ही कमाई शुरू करें।',
      atsCardTitle: 'Resume ATS स्कोर',
      atsCardDesc: 'ऑटोमेटेड स्क्रीनिंग पास करने की क्षमता',
      savedJobsTitle: 'सेव किए गए अवसर',
      activeRoadmapsTitle: 'रोडमैप प्रोग्रेस',
      quickActions: 'त्वरित शुरुआत',
      btnBuildResume: 'नया Resume बनाएं',
      btnSearchJobs: 'नौकरियां खोजें',
      btnWriteEmail: 'Cold Email लिखें'
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
      targetRole: 'लक्ष्य पद (Role)',
      email: 'ईमेल पता',
      phone: 'फ़ोन / व्हाट्सएप',
      location: 'स्थान / शहर',
      links: 'GitHub / LinkedIn',
      summaryLabel: 'करियर सारांश',
      mottoLabel: 'करियर मोटो / Quote',
      aiPolish: 'AI से सुधारें',
      templateStyle: 'Resume डिज़ाइन थीम:',
      modernTech: 'मॉडर्न टेक',
      minimalATS: 'क्लासिक ATS',
      executive: 'एग्जीक्यूटिव',
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
      title: 'इंटर्नशिप और फ्रेशर जॉब रडार',
      subtitle: 'छात्रों के लिए विशेष रूप से सत्यापित रिमोट व ऑन-साइट अवसर।',
      searchPlaceholder: 'पद या स्किल खोजें (उदा. React, Python, Frontend)...',
      allLocations: 'सभी शहर',
      remoteOnly: 'केवल रिमोट',
      stipendFilter: 'वेतन सहित',
      directApply: 'सीधा आवेदन',
      saveJob: 'सेव करें',
      saved: 'सेव किया',
      trending: 'ट्रेंडिंग:'
    },
    freelance: {
      title: 'स्टूडेंट फ्रीलांसिंग हब & इनवॉइस',
      subtitle: 'कॉलेज में पढ़ते हुए Upwork और Fiverr से प्रोजेक्ट्स पाने की रणनीति।',
      hourlyRateCalc: 'प्रति घंटा दर कैलकुलेटर',
      hoursPerWeek: 'प्रति सप्ताह उपलब्ध घंटे:',
      expectedRate: 'अपेक्षित प्रति घंटा दर:',
      projectedMonthly: 'अनुमानित मासिक आय:',
      proposalGen: 'क्लाइंट्स के लिए तुरंत Proposal जनरेटर',
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
    brandBadge: 'Suite Global',
    nav: {
      dashboard: 'Panel',
      resume: 'Estudio de CV ATS',
      coverLetter: 'Cold Email',
      jobs: 'Pasantías & Empleos',
      freelance: 'Freelance',
      roadmaps: 'Rutas & Prep'
    },
    dashboard: {
      welcome: 'Bienvenido a VynkAI CareerForge',
      desc: 'Crea CVs compatibles con ATS y encuentra pasantías internacionales.',
      atsCardTitle: 'Puntaje ATS',
      atsCardDesc: 'Compatibilidad con filtros automáticos',
      savedJobsTitle: 'Ofertas Guardadas',
      activeRoadmapsTitle: 'Hitos Completados',
      quickActions: 'Acciones Rápidas',
      btnBuildResume: 'Crear CV ATS',
      btnSearchJobs: 'Buscar Pasantías',
      btnWriteEmail: 'Redactar Email'
    },
    resume: {
      title: 'Estudio Profesional de CV ATS',
      subtitle: 'Formato A4 estructurado según estándares de ingeniería global.',
      personalTab: '1. Datos Personales',
      summaryTab: '2. Resumen & Lema',
      educationTab: '3. Educación',
      experienceTab: '4. Experiencia',
      projectsTab: '5. Proyectos',
      skillsTab: '6. Habilidades',
      accomplishmentsTab: '7. Logros',
      fullName: 'Nombre Completo',
      targetRole: 'Título Profesional',
      email: 'Correo Electrónico',
      phone: 'Teléfono',
      location: 'Ubicación',
      links: 'GitHub / LinkedIn',
      summaryLabel: 'Resumen Profesional',
      mottoLabel: 'Lema Profesional',
      aiPolish: 'Mejorar con IA',
      templateStyle: 'Tema de CV:',
      modernTech: 'Tech Moderno',
      minimalATS: 'ATS Clásico',
      executive: 'Ejecutivo',
      btnUpdate: 'Actualizar',
      btnDownload: 'Descargar PDF Vectorial',
      btnPrint: 'Imprimir',
      btnExportJson: 'Exportar JSON',
      btnImportJson: 'Importar JSON',
      liveSheetTitle: 'Vista Previa A4 en Vivo',
      atsAnalysisTitle: 'Lista de Control ATS'
    },
    emailTool: {
      title: 'Generador de Cold Email con IA',
      subtitle: 'Genera propuestas directas a reclutadores en segundos.',
      recipientRole: 'Destinatario',
      companyName: 'Empresa',
      targetPosition: 'Puesto',
      myStrongSkill: 'Habilidad Principal',
      btnGenerate: 'Generar Email',
      btnCopy: 'Copiar Email',
      previewTitle: 'Email Generado:'
    },
    jobs: {
      title: 'Radar de Pasantías y Empleos',
      subtitle: 'Oportunidades remotas y presenciales verificadas para estudiantes.',
      searchPlaceholder: 'Buscar rol (ej. React, Python, Full Stack)...',
      allLocations: 'Todas las Ubicaciones',
      remoteOnly: 'Solo Remoto',
      stipendFilter: 'Con Pago',
      directApply: 'Aplicar Directo',
      saveJob: 'Guardar',
      saved: 'Guardado',
      trending: 'Tendencias:'
    },
    freelance: {
      title: 'Guía Freelance y Facturación',
      subtitle: 'Estrategias para conseguir tus primeros clientes internacionales.',
      hourlyRateCalc: 'Calculadora de Tarifa por Hora',
      hoursPerWeek: 'Horas / semana:',
      expectedRate: 'Tarifa por hora:',
      projectedMonthly: 'Ingreso mensual proyectado:',
      proposalGen: 'Generador de Propuestas',
      selectGig: 'Tipo de Servicio:',
      copyProposal: 'Copiar Propuesta'
    },
    roadmaps: {
      title: 'Rutas de Aprendizaje y Entrevistas',
      subtitle: 'Hitos verificados y tarjetas de preguntas técnicas.',
      interviewPrepTitle: 'Tarjetas de Entrevista Técnica',
      showAnswer: 'Ver Respuesta',
      hideAnswer: 'Ocultar Respuesta'
    }
  }
}

// Clean Generic Example Candidate Data (Format structure matching the user's reference)
const DEFAULT_CANDIDATE = {
  name: 'Alex Morgan',
  role: 'Artificial Intelligence & Data Science Student | Software Engineer',
  email: 'alex.morgan.tech@example.com',
  phone: '+1 (555) 382-9104',
  location: 'San Francisco, CA (Open to Global Remote)',
  links: 'github.com/alex-dev • linkedin.com/in/alex-morgan • WhatsApp: @alex_tech',
  summary: 'Passionate and technology-driven Artificial Intelligence & Data Science student with a solid foundation in Computer Engineering. Experienced in full-stack web engineering, native Android app development, machine learning algorithms, and system networking. Proven record of developing practical academic projects and completing industrial engineering trainings. Committed to building scalable software solutions that solve real-world problems.',
  motto: 'Technology is not just about writing code; it is about solving real-world problems, creating meaningful experiences, and continuously pushing the boundaries of innovation.',
  
  // Education Multi-Entry
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

  // Industrial Training & Experience
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

  // Key Projects
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

  // Categorized Technical Skillset
  skillsCategorized: {
    'Languages': 'Python, Java, Advanced Java, C, C++, Kotlin, C#, SQL, PL/SQL',
    'Web & Mobile': 'HTML5, CSS3, JavaScript, TypeScript, React.js, Node.js, PHP, Android Studio, Tailwind CSS',
    'AI & Core Domains': 'Artificial Intelligence, Machine Learning, Data Science, Generative AI, Networking, Network Security, Ethical Hacking'
  },

  accomplishments: '• International CodeForge Hackathon: Participated in Build & Submit Prototype Development Round.\n• Technical Festivals Presenter: Demonstrated AI + IoT integrated smart healthcare system at university symposium.'
}

// Top 50 Technical Interview Flashcards
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
  },
  {
    topic: 'Databases & SQL',
    q: 'What are ACID properties in Relational Database Management Systems?',
    a: 'Atomicity (all operations succeed or whole transaction rolls back), Consistency (data satisfies all constraints), Isolation (concurrent transactions do not conflict), and Durability (committed changes persist permanently).'
  }
]

// Mock Curated Job Database
const MOCK_JOBS = [
  {
    id: 1,
    title: 'AI & Full Stack Software Engineering Intern',
    company: 'CloudScale Global Technologies',
    location: 'Remote (Worldwide / US / India)',
    type: 'Internship',
    stipend: '$1,200 - $2,200 / month (₹45,000 - ₹85,000)',
    tags: ['React.js', 'Python', 'Node.js', 'Remote', 'Mentorship'],
    description: 'Work with senior AI engineers building interactive dashboards, LLM integrations, and responsive React applications. Direct pre-placement job offer (PPO) pathway.',
    url: 'https://www.linkedin.com/jobs'
  },
  {
    id: 2,
    title: 'Junior Machine Learning & Android Trainee',
    company: 'NeuroPulse Mobile Labs',
    location: 'Pune / Mumbai / Bengaluru (Hybrid)',
    type: 'Fresher / Entry',
    stipend: '₹5.5 - ₹8.5 LPA',
    tags: ['Android Studio', 'Kotlin', 'Python', 'Campus Drive'],
    description: 'Entry-level engineering position for ambitious students. Build on-device ML models, native Android components, and RESTful cloud backends.',
    url: 'https://internshala.com'
  },
  {
    id: 3,
    title: 'Frontend UI & Vector Graphic Engineer',
    company: 'HyperGrowth SaaS Inc.',
    location: 'San Francisco / Remote',
    type: 'Internship',
    stipend: '$28 / hour',
    tags: ['Tailwind CSS', 'TypeScript', 'Vite', 'Global'],
    description: 'Construct pixel-perfect UI suites, automated PDF compilation pipelines, and responsive design systems with 100% responsiveness.',
    url: 'https://wellfound.com'
  },
  {
    id: 4,
    title: 'Backend API Developer (Batch 2025-2028)',
    company: 'Veritas Infotech Systems',
    location: 'Bengaluru / Hyderabad / Remote',
    type: 'Fresher / Trainee',
    stipend: '₹6.0 - ₹9.2 LPA',
    tags: ['Express.js', 'SQL', 'Docker', 'REST APIs'],
    description: 'Design robust authentication systems, database schema architectures, and asynchronous workers with Node.js and PostgreSQL.',
    url: 'https://www.naukri.com'
  }
]

export default function App() {
  // 1. Language default is ENGLISH as requested by user!
  const [lang, setLang] = useState('en')
  const [currency, setCurrency] = useState('USD') // 'USD', 'INR', 'EUR', 'GBP'
  const [activeTab, setActiveTab] = useState('dashboard') // 'dashboard', 'resume', 'coverLetter', 'jobs', 'freelance', 'roadmaps'
  const [resumeSubTab, setResumeSubTab] = useState('personal')
  const [templateStyle, setTemplateStyle] = useState('modernTech') // 'modernTech', 'minimalATS', 'executive'
  const [toastMsg, setToastMsg] = useState('')

  // 2. Candidate State with clean random example data (Format reference structure matching PDF)
  const [candidate, setCandidate] = useState(DEFAULT_CANDIDATE)
  const [resumeHtml, setResumeHtml] = useState('')
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)

  // 3. Cold Email Generator State
  const [emailRecipient, setEmailRecipient] = useState('Hiring Manager / Tech Lead')
  const [emailCompany, setEmailCompany] = useState('CloudScale Technologies')
  const [emailTargetRole, setEmailTargetRole] = useState('AI & Software Engineering Intern (Summer 2025)')
  const [emailStrongSkill, setEmailStrongSkill] = useState('Full-Stack Web & Machine Learning')
  const [generatedColdEmail, setGeneratedColdEmail] = useState('')

  // 4. Jobs & Saved List
  const [jobSearchQuery, setJobSearchQuery] = useState('')
  const [jobFilterLocation, setJobFilterLocation] = useState('all')
  const [savedJobIds, setSavedJobIds] = useState([1])

  // 5. Freelance Calculator
  const [calcHours, setCalcHours] = useState(15)
  const [calcRate, setCalcRate] = useState(30)
  const [proposalService, setProposalService] = useState('react')

  // 6. Flashcard Toggles
  const [revealedAnswers, setRevealedAnswers] = useState({})

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en

  const showToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 3500)
  }

  useEffect(() => {
    renderLiveResume()
    generateColdEmail()
  }, [lang, templateStyle, candidate])

  // Generate Cold Email
  function generateColdEmail() {
    const text = `Subject: Application for ${emailTargetRole} — ${candidate.name}

Dear ${emailRecipient} at ${emailCompany},

I hope this email finds you well.

I have been closely following ${emailCompany}'s engineering products and was deeply inspired by your innovative solutions. I am writing to express my strong enthusiasm for the ${emailTargetRole} position.

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

  // Generate Live Resume HTML Preview
  async function renderLiveResume() {
    try {
      const res = await axios.post('http://localhost:4000/api/resume/generate', candidate)
      setResumeHtml(res.data)
    } catch (err) {
      // Fallback local renderer if backend is compiling
      const skillsHtml = Object.entries(candidate.skillsCategorized).map(([cat, items]) => `
        <div style="margin-bottom: 6px;">
          <div style="font-size: 11.5px; font-weight: 800; text-transform: uppercase; color: #475569; margin-bottom: 3px;">${cat}</div>
          <div style="display: flex; flex-wrap: wrap; gap: 4px;">
            ${items.split(',').map(s => `<span style="background: #f1f5f9; color: #1e293b; border: 1px solid #cbd5e1; padding: 2px 7px; border-radius: 4px; font-size: 11px; font-weight: 600;">${s.trim()}</span>`).join('')}
          </div>
        </div>
      `).join('')

      const eduHtml = candidate.educationList.map(ed => `
        <div style="margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 12.5px; color: #0f172a;">
            <span>${ed.degree}</span>
            <span style="color: #64748b; font-weight: 500;">${ed.year}</span>
          </div>
          <div style="font-size: 12px; color: #2563eb; font-weight: 600;">${ed.institution} ${ed.score ? `• ${ed.score}` : ''}</div>
          <ul style="margin-left: 16px; margin-top: 3px; font-size: 12px; color: #334155;">
            ${ed.bullets.split('\n').filter(Boolean).map(b => `<li>${b.replace(/^[•\-*]\s*/, '')}</li>`).join('')}
          </ul>
        </div>
      `).join('')

      const expHtml = candidate.experienceList.map(exp => `
        <div style="margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 12.5px; color: #0f172a;">
            <span>${exp.title}</span>
            <span style="color: #64748b; font-weight: 500;">${exp.period}</span>
          </div>
          <div style="font-size: 12px; color: #2563eb; font-weight: 600;">${exp.company}</div>
          <ul style="margin-left: 16px; margin-top: 3px; font-size: 12px; color: #334155;">
            ${exp.bullets.split('\n').filter(Boolean).map(b => `<li>${b.replace(/^[•\-*]\s*/, '')}</li>`).join('')}
          </ul>
        </div>
      `).join('')

      const projHtml = candidate.projectsList.map(p => `
        <div style="margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 12.5px; color: #0f172a;">
            <span>${p.title}</span>
            <span style="color: #2563eb; font-size: 11px; font-weight: 600;">${p.domain}</span>
          </div>
          <div style="color: #334155; font-size: 12px; margin-top: 2px;">${p.desc}</div>
        </div>
      `).join('')

      const fallback = `
        <div style="font-family: 'Plus Jakarta Sans', Inter, sans-serif; padding: 28px 32px; color: #0f172a; line-height: 1.5; font-size: 12.5px;">
          <div style="border-bottom: 2.5px solid #2563eb; padding-bottom: 12px; margin-bottom: 14px;">
            <div style="font-size: 24px; font-weight: 800; color: #0f172a;">${candidate.name}</div>
            <div style="font-size: 13px; font-weight: 700; color: #2563eb; margin-top: 2px;">${candidate.role}</div>
            <div style="margin-top: 6px; font-size: 11.5px; color: #475569;">
              📧 ${candidate.email} • 📱 ${candidate.phone} • 📍 ${candidate.location} • 🔗 ${candidate.links}
            </div>
          </div>

          <div style="margin-bottom: 12px;">
            <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: #0f172a; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 4px;">Professional Summary</div>
            <div style="font-size: 12px; color: #334155;">${candidate.summary}</div>
            ${candidate.motto ? `<div style="margin-top: 6px; padding: 5px 10px; background: #f8fafc; border-left: 3px solid #3b82f6; font-style: italic; color: #475569; font-size: 11.5px;">"${candidate.motto}"</div>` : ''}
          </div>

          <div style="margin-bottom: 12px;">
            <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: #0f172a; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 6px;">Education</div>
            ${eduHtml}
          </div>

          <div style="margin-bottom: 12px;">
            <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: #0f172a; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 6px;">Industrial Training & Experience</div>
            ${expHtml}
          </div>

          <div style="margin-bottom: 12px;">
            <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: #0f172a; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 6px;">Key Projects</div>
            ${projHtml}
          </div>

          <div style="margin-bottom: 12px;">
            <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: #0f172a; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 6px;">Technical Skillset</div>
            ${skillsHtml}
          </div>

          <div>
            <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: #0f172a; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 4px;">Hackathons & Accomplishments</div>
            <div style="font-size: 12px; color: #334155; white-space: pre-line;">${candidate.accomplishments}</div>
          </div>
        </div>
      `
      setResumeHtml(fallback)
    }
  }

  // Handle PDF Download
  async function handleDownloadPdf() {
    setIsGeneratingPdf(true)
    try {
      const res = await axios.post('http://localhost:4000/api/resume/pdf', candidate, { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${candidate.name.replace(/\s+/g, '_')}_VynkAI_CareerForge.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      showToast('🎉 Vector PDF Generated & Downloaded!')
    } catch (err) {
      console.error(err)
      window.print()
      showToast('📄 Print sheet opened!')
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  // AI Polish Handler
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
    a.download = `${candidate.name.replace(/\s+/g, '_')}_resume_profile.json`
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

  // Filter Jobs
  const filteredJobs = MOCK_JOBS.filter(job => {
    const matchQuery = !jobSearchQuery || 
      job.title.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
      job.tags.some(t => t.toLowerCase().includes(jobSearchQuery.toLowerCase()))
    const matchLocation = jobFilterLocation === 'all' || 
      (jobFilterLocation === 'remote' && job.location.toLowerCase().includes('remote'))
    return matchQuery && matchLocation
  })

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-600 selection:text-white pb-20">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-400 text-slate-950 font-bold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-emerald-300 animate-bounce">
          <CheckCircle className="w-5 h-5 text-slate-950" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* TOP HEADER */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div 
              onClick={() => setActiveTab('dashboard')} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Compass className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
                    {t.brandName} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 text-sm font-black">AI</span>
                  </h1>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    2026
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block">
                  {t.brandBadge} • Global Student Edition
                </p>
              </div>
            </div>

            {/* Language & Currency Tools */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Selector */}
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-2xl px-3 py-1.5 shadow-inner">
                <Globe className="w-4 h-4 text-cyan-400 mr-2 shrink-0" />
                <select
                  value={lang}
                  onChange={(e) => {
                    setLang(e.target.value)
                    showToast(`Language set to ${TRANSLATIONS[e.target.value]?.langName}`)
                  }}
                  className="bg-transparent text-xs font-bold text-slate-200 outline-none cursor-pointer pr-1"
                >
                  {Object.entries(TRANSLATIONS).map(([k, v]) => (
                    <option key={k} value={k} className="bg-slate-900 text-slate-100">
                      {v.flag} {v.langName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Currency Selector */}
              <div className="hidden sm:flex items-center bg-slate-950 border border-slate-800 rounded-2xl px-3 py-1.5 text-xs font-bold text-indigo-400 shadow-inner">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="bg-transparent outline-none cursor-pointer"
                >
                  <option value="USD" className="bg-slate-900 text-slate-100">$ USD</option>
                  <option value="INR" className="bg-slate-900 text-slate-100">₹ INR</option>
                  <option value="EUR" className="bg-slate-900 text-slate-100">€ EUR</option>
                  <option value="GBP" className="bg-slate-900 text-slate-100">£ GBP</option>
                </select>
              </div>

              {/* GitHub Link */}
              <a
                href="https://github.com/vina-yak711/student-career-assist"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition"
              >
                <Github className="w-4 h-4 text-slate-400" />
                <span className="hidden md:inline">GitHub</span>
              </a>
            </div>
          </div>

          {/* MAIN NAVIGATION TABS */}
          <nav className="flex items-center gap-1.5 overflow-x-auto pb-3 pt-1 scrollbar-none border-t border-slate-800/60 mt-1">
            {[
              { key: 'dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
              { key: 'resume', label: t.nav.resume, icon: FileText },
              { key: 'coverLetter', label: t.nav.coverLetter, icon: Mail },
              { key: 'jobs', label: t.nav.jobs, icon: Briefcase },
              { key: 'freelance', label: t.nav.freelance, icon: DollarSign },
              { key: 'roadmaps', label: t.nav.roadmaps, icon: Rocket }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === key
                    ? 'bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

        {/* ============================================================ */}
        {/* VIEW 1: DASHBOARD */}
        {/* ============================================================ */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-extrabold mb-3">
                  <Zap className="w-3.5 h-3.5" /> All-in-One Global Career Platform
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                  {t.dashboard.welcome}
                </h2>
                <p className="mt-2 text-slate-400 text-sm sm:text-base leading-relaxed">
                  {t.dashboard.desc}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActiveTab('resume')}
                    className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold px-6 py-3 rounded-2xl shadow-xl shadow-indigo-600/30 transition flex items-center gap-2 text-xs sm:text-sm"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{t.dashboard.btnBuildResume}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('jobs')}
                    className="bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold px-6 py-3 rounded-2xl border border-slate-700 transition flex items-center gap-2 text-xs sm:text-sm"
                  >
                    <Briefcase className="w-4 h-4 text-cyan-400" />
                    <span>{t.dashboard.btnSearchJobs}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('coverLetter')}
                    className="bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold px-6 py-3 rounded-2xl border border-slate-700 transition flex items-center gap-2 text-xs sm:text-sm"
                  >
                    <Mail className="w-4 h-4 text-emerald-400" />
                    <span>{t.dashboard.btnWriteEmail}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div 
                onClick={() => setActiveTab('resume')}
                className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-3xl p-6 shadow-xl cursor-pointer transition group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.dashboard.atsCardTitle}</span>
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition">
                    <FileText className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-white flex items-center gap-2">
                  <span className={atsScore >= 75 ? 'text-emerald-400' : 'text-amber-400'}>{atsScore}%</span>
                  <span className="text-xs font-bold text-slate-400">/ 100</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">{t.dashboard.atsCardDesc}</p>
              </div>

              <div 
                onClick={() => setActiveTab('jobs')}
                className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 rounded-3xl p-6 shadow-xl cursor-pointer transition group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.dashboard.savedJobsTitle}</span>
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition">
                    <BookmarkCheck className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-white">
                  {savedJobIds.length} <span className="text-xs font-bold text-slate-400">Saved</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">Active student internships in radar</p>
              </div>

              <div 
                onClick={() => setActiveTab('freelance')}
                className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-6 shadow-xl cursor-pointer transition group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Freelance Potential</span>
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-emerald-400">
                  {currency === 'INR' ? '₹25,000+' : '$450+'}
                </div>
                <p className="text-xs text-slate-400 mt-2">Estimated student monthly side-income</p>
              </div>

              <div 
                onClick={() => setActiveTab('roadmaps')}
                className="bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 rounded-3xl p-6 shadow-xl cursor-pointer transition group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Technical QA</span>
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition">
                    <Rocket className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-purple-400">
                  50+ Questions
                </div>
                <p className="text-xs text-slate-400 mt-2">Flashcards for React, AI/ML, and SQL</p>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 2: MULTI-SECTION ATS RESUME BUILDER */}
        {/* ============================================================ */}
        {activeTab === 'resume' && (
          <div className="space-y-6">
            
            {/* Toolbar */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
                  <FileText className="w-6 h-6 text-indigo-400" />
                  {t.resume.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  {t.resume.subtitle}
                </p>
              </div>

              {/* Theme Template Selector */}
              <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 px-2">{t.resume.templateStyle}</span>
                {[
                  { key: 'modernTech', label: t.resume.modernTech },
                  { key: 'minimalATS', label: t.resume.minimalATS },
                  { key: 'executive', label: t.resume.executive }
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setTemplateStyle(key)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      templateStyle === key
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Split Screen Form & Live Document */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Form Builder with 7 Sub-tabs */}
              <div className="lg:col-span-6 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl">
                  
                  {/* Step Sub-tabs */}
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-5 overflow-x-auto scrollbar-none">
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
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                          resumeSubTab === key
                            ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                            : 'text-slate-400 hover:text-slate-200'
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
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">{t.resume.fullName}</label>
                        <input
                          type="text"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 transition"
                          value={candidate.name}
                          onChange={(e) => setCandidate({ ...candidate, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">{t.resume.targetRole}</label>
                        <input
                          type="text"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 transition"
                          value={candidate.role}
                          onChange={(e) => setCandidate({ ...candidate, role: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">{t.resume.email}</label>
                          <input
                            type="email"
                            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 transition"
                            value={candidate.email}
                            onChange={(e) => setCandidate({ ...candidate, email: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">{t.resume.phone}</label>
                          <input
                            type="text"
                            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 transition"
                            value={candidate.phone}
                            onChange={(e) => setCandidate({ ...candidate, phone: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">{t.resume.location}</label>
                          <input
                            type="text"
                            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 transition"
                            value={candidate.location}
                            onChange={(e) => setCandidate({ ...candidate, location: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">{t.resume.links}</label>
                          <input
                            type="text"
                            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 transition"
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
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">{t.resume.summaryLabel}</label>
                          <button
                            type="button"
                            onClick={handleAiPolish}
                            className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{t.resume.aiPolish}</span>
                          </button>
                        </div>
                        <textarea
                          rows={4}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 transition leading-relaxed"
                          value={candidate.summary}
                          onChange={(e) => setCandidate({ ...candidate, summary: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">{t.resume.mottoLabel}</label>
                        <input
                          type="text"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 transition italic"
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
                        <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2.5">
                          <div className="font-bold text-xs text-indigo-400 uppercase">Degree #{idx + 1}</div>
                          <input
                            type="text"
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100"
                            placeholder="Degree Name"
                            value={ed.degree}
                            onChange={(e) => {
                              const list = [...candidate.educationList]
                              list[idx].degree = e.target.value
                              setCandidate({ ...candidate, educationList: list })
                            }}
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100"
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
                              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100"
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
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100"
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

                  {/* SUBTAB 4: INDUSTRIAL TRAINING & EXPERIENCE */}
                  {resumeSubTab === 'experience' && (
                    <div className="space-y-4">
                      {candidate.experienceList.map((exp, idx) => (
                        <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2.5">
                          <div className="font-bold text-xs text-emerald-400 uppercase">Training / Experience #{idx + 1}</div>
                          <input
                            type="text"
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100"
                            placeholder="Program / Role Title"
                            value={exp.title}
                            onChange={(e) => {
                              const list = [...candidate.experienceList]
                              list[idx].title = e.target.value
                              setCandidate({ ...candidate, experienceList: list })
                            }}
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100"
                              placeholder="Company Name"
                              value={exp.company}
                              onChange={(e) => {
                                const list = [...candidate.experienceList]
                                list[idx].company = e.target.value
                                setCandidate({ ...candidate, experienceList: list })
                              }}
                            />
                            <input
                              type="text"
                              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100"
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
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100"
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
                        <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100 font-bold"
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
                              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100"
                              placeholder="Domain (e.g. React • AI • Python)"
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
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100"
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
                    <div className="space-y-3">
                      {Object.entries(candidate.skillsCategorized).map(([cat, items]) => (
                        <div key={cat}>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{cat}</label>
                          <input
                            type="text"
                            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2 text-xs text-slate-100 transition"
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
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Hackathons & Key Accomplishments</label>
                        <textarea
                          rows={4}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-xs text-slate-100 transition leading-relaxed"
                          value={candidate.accomplishments}
                          onChange={(e) => setCandidate({ ...candidate, accomplishments: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  {/* Action Buttons Toolbar */}
                  <div className="pt-4 border-t border-slate-800 mt-6 flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleDownloadPdf}
                      disabled={isGeneratingPdf}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 hover:opacity-90 text-white font-bold py-3.5 px-5 rounded-2xl shadow-xl shadow-indigo-600/30 transition"
                    >
                      <Download className={`w-4 h-4 ${isGeneratingPdf ? 'animate-bounce' : ''}`} />
                      <span>{isGeneratingPdf ? 'Compiling PDF...' : t.resume.btnDownload}</span>
                    </button>
                    
                    <button
                      onClick={() => window.print()}
                      className="flex items-center justify-center gap-1.5 bg-slate-950 hover:bg-slate-800 text-slate-200 font-bold py-3.5 px-4 rounded-2xl border border-slate-800 transition"
                    >
                      <Printer className="w-4 h-4 text-slate-400" />
                      <span>{t.resume.btnPrint}</span>
                    </button>

                    <button
                      onClick={handleExportJson}
                      className="flex items-center justify-center gap-1.5 bg-slate-950 hover:bg-slate-800 text-slate-200 font-bold py-3.5 px-4 rounded-2xl border border-slate-800 transition"
                    >
                      <Download className="w-4 h-4 text-slate-400" />
                      <span>{t.resume.btnExportJson}</span>
                    </button>

                    <label className="flex items-center justify-center gap-1.5 bg-slate-950 hover:bg-slate-800 text-slate-200 font-bold py-3.5 px-4 rounded-2xl border border-slate-800 transition cursor-pointer">
                      <ExternalLink className="w-4 h-4 text-slate-400" />
                      <span>{t.resume.btnImportJson}</span>
                      <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
                    </label>
                  </div>
                </div>

                {/* ATS Quality Analysis */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      {t.resume.atsAnalysisTitle}
                    </h4>
                    <span className={`text-xs font-extrabold ${atsScore >= 75 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {atsScore} / 100 Score
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Contact details complete</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Summary & Motto optimized</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Industrial Training included</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Categorized technical skills</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Live A4 White Document Preview */}
              <div className="lg:col-span-6 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-bold text-sm text-slate-200">{t.resume.liveSheetTitle}</span>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">Standard A4 Sheet</span>
                  </div>

                  {/* White Paper Canvas */}
                  <div className="flex-1 min-h-[580px] bg-white text-slate-950 rounded-2xl p-6 sm:p-8 shadow-inner overflow-y-auto border border-slate-300">
                    <div dangerouslySetInnerHTML={{ __html: resumeHtml }} />
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 3: COLD EMAIL GENERATOR */}
        {/* ============================================================ */}
        {activeTab === 'coverLetter' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="max-w-3xl">
                <h3 className="text-2xl font-extrabold text-white flex items-center gap-2">
                  <Mail className="w-6 h-6 text-indigo-400" />
                  {t.emailTool.title}
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  {t.emailTool.subtitle}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">{t.emailTool.companyName}</label>
                  <input
                    type="text"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 transition"
                    value={emailCompany}
                    onChange={(e) => {
                      setEmailCompany(e.target.value)
                      generateColdEmail()
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">{t.emailTool.targetPosition}</label>
                  <input
                    type="text"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 transition"
                    value={emailTargetRole}
                    onChange={(e) => {
                      setEmailTargetRole(e.target.value)
                      generateColdEmail()
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">{t.emailTool.recipientRole}</label>
                  <input
                    type="text"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 transition"
                    value={emailRecipient}
                    onChange={(e) => {
                      setEmailRecipient(e.target.value)
                      generateColdEmail()
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">{t.emailTool.myStrongSkill}</label>
                  <input
                    type="text"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 transition"
                    value={emailStrongSkill}
                    onChange={(e) => {
                      setEmailStrongSkill(e.target.value)
                      generateColdEmail()
                    }}
                  />
                </div>
                <button
                  onClick={generateColdEmail}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-2xl transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 text-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t.emailTool.btnGenerate}</span>
                </button>
              </div>

              <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-800">
                    <span className="font-bold text-sm text-slate-200">{t.emailTool.previewTitle}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedColdEmail)
                        showToast('📋 Outreach Email Copied to Clipboard!')
                      }}
                      className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 text-slate-950 font-bold px-4 py-1.5 rounded-xl text-xs shadow transition"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t.emailTool.btnCopy}</span>
                    </button>
                  </div>
                  <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 font-mono text-xs sm:text-sm text-slate-200 whitespace-pre-wrap leading-relaxed max-h-[460px] overflow-y-auto">
                    {generatedColdEmail}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 4: INTERNSHIPS & JOBS RADAR */}
        {/* ============================================================ */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="max-w-3xl">
                <h3 className="text-2xl font-extrabold text-white flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-indigo-400" />
                  {t.jobs.title}
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  {t.jobs.subtitle}
                </p>
              </div>

              {/* Search Bar */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={jobSearchQuery}
                    onChange={(e) => setJobSearchQuery(e.target.value)}
                    placeholder={t.jobs.searchPlaceholder}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-slate-100 transition"
                  />
                </div>

                <select
                  value={jobFilterLocation}
                  onChange={(e) => setJobFilterLocation(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs font-bold text-slate-200 outline-none"
                >
                  <option value="all">{t.jobs.allLocations}</option>
                  <option value="remote">{t.jobs.remoteOnly}</option>
                </select>
              </div>

              {/* Trending Filter Pills */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-400 font-bold mr-1">{t.jobs.trending}</span>
                {['React.js', 'Python', 'Node.js', 'Machine Learning', 'Android', 'Remote'].map((tg) => (
                  <button
                    key={tg}
                    onClick={() => setJobSearchQuery(tg)}
                    className="text-xs px-3.5 py-1 rounded-full bg-slate-950 hover:bg-indigo-600/30 border border-slate-800 hover:border-indigo-500 text-slate-300 transition"
                  >
                    {tg}
                  </button>
                ))}
              </div>
            </div>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map((job) => {
                const isSaved = savedJobIds.includes(job.id)

                return (
                  <div
                    key={job.id}
                    className="bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 rounded-3xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                          {job.location}
                        </span>
                        <button
                          onClick={() => toggleSaveJob(job.id)}
                          className={`text-xs font-bold flex items-center gap-1 px-3 py-1 rounded-xl transition ${
                            isSaved
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                          }`}
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                          <span>{isSaved ? t.jobs.saved : t.jobs.saveJob}</span>
                        </button>
                      </div>

                      <h4 className="text-lg font-bold text-white">
                        {job.title}
                      </h4>
                      <div className="text-xs font-medium text-slate-400 mt-1">{job.company}</div>

                      <div className="text-xs font-bold text-emerald-400 mt-2.5">
                        💰 {job.stipend}
                      </div>

                      <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                        {job.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {job.tags.map((tag, i) => (
                          <span key={i} className="text-[11px] font-semibold bg-slate-950 text-slate-300 px-2.5 py-0.5 rounded-lg border border-slate-800">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> {t.jobs.directApply}
                      </span>
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-xs shadow transition"
                      >
                        <span>Apply</span>
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
        {/* VIEW 5: FREELANCE HUB */}
        {/* ============================================================ */}
        {activeTab === 'freelance' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="max-w-3xl">
                <h3 className="text-2xl font-extrabold text-white flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-emerald-400" />
                  {t.freelance.title}
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  {t.freelance.subtitle}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-indigo-400" />
                  {t.freelance.hourlyRateCalc}
                </h4>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                      <span>{t.freelance.hoursPerWeek}</span>
                      <span className="text-cyan-400">{calcHours} hrs/week</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={40}
                      step={5}
                      value={calcHours}
                      onChange={(e) => setCalcHours(Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                      <span>{t.freelance.expectedRate}</span>
                      <span className="text-cyan-400">{currency === 'INR' ? `₹${calcRate * 80}` : `$${calcRate}`} / hr</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={120}
                      step={5}
                      value={calcRate}
                      onChange={(e) => setCalcRate(Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>

                  <div className="pt-4 border-t border-slate-800 bg-slate-950 p-4 rounded-2xl flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">{t.freelance.projectedMonthly}</span>
                    <span className="text-2xl font-black text-emerald-400">
                      {currency === 'INR' ? `₹${(calcHours * calcRate * 80 * 4).toLocaleString('en-IN')}` : `$${calcHours * calcRate * 4}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Instant Proposal Generator */}
              <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                      <Zap className="w-5 h-5 text-cyan-400" />
                      {t.freelance.proposalGen}
                    </h4>
                    <select
                      value={proposalService}
                      onChange={(e) => setProposalService(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1 text-xs font-bold text-slate-200 outline-none"
                    >
                      <option value="react">React & Full Stack Web UI</option>
                      <option value="pdf">Automated PDF Generator API</option>
                      <option value="android">Native Android App Development</option>
                    </select>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed max-h-[160px] overflow-y-auto">
                    {proposalService === 'react' && `Hi [Client],\n\nI noticed you need a clean, responsive, and high-speed web application. I specialize in React, Vite, Tailwind CSS, and REST API integrations.\n\nI can deliver production-ready code with 100% responsiveness within 48 hours.\n\nBest regards,\n${candidate.name}`}
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
                    className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs shadow transition"
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
        {/* VIEW 6: ROADMAPS & INTERVIEW FLASHCARDS */}
        {/* ============================================================ */}
        {activeTab === 'roadmaps' && (
          <div className="space-y-8">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="max-w-3xl">
                <h3 className="text-2xl font-extrabold text-white flex items-center gap-2">
                  <Rocket className="w-6 h-6 text-indigo-400" />
                  {t.roadmaps.title}
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  {t.roadmaps.subtitle}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                {t.roadmaps.interviewPrepTitle}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {INTERVIEW_QUESTIONS.map((item, idx) => {
                  const isShown = revealedAnswers[idx]

                  return (
                    <div
                      key={idx}
                      className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                            {item.topic}
                          </span>
                        </div>
                        <h5 className="font-bold text-white text-sm sm:text-base mt-2">
                          {item.q}
                        </h5>

                        {isShown && (
                          <div className="mt-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                            {item.a}
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
                        <button
                          onClick={() => {
                            setRevealedAnswers({
                              ...revealedAnswers,
                              [idx]: !isShown
                            })
                          }}
                          className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition"
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