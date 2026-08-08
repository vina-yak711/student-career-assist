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
  Target
} from 'lucide-react'

// Robust Multilingual Translations (Marathi, English, Hindi, Spanish, German, French, Japanese)
const TRANSLATIONS = {
  mr: {
    langName: 'मराठी',
    flag: '🇮🇳',
    brandName: 'CareerSarthi',
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
      welcome: 'विद्यार्थी करिअर डॅशबोर्डमध्ये आपले स्वागत आहे',
      desc: 'तुमचा रिझ्युमे तयार करा, जागतिक इंटर्नशिप्स शोधा आणि कॉलेजमध्ये असतानाच कमाई सुरू करा.',
      atsCardTitle: 'ATS रिझ्युमे दर्जा',
      atsCardDesc: 'कंपन्यांच्या ऑटोमेटेड सिस्टममध्ये पास होणारा स्कोअर',
      savedJobsTitle: 'सेव्ह केलेल्या नोकऱ्या',
      activeRoadmapsTitle: 'चालू स्किल्स प्रगती',
      quickActions: 'त्वरित सुरू करा (Quick Actions)',
      btnBuildResume: 'नवीन Resume बनवा',
      btnSearchJobs: 'नोकऱ्या शोधा',
      btnWriteEmail: 'Cold Email लिहा'
    },
    resume: {
      title: 'व्यावसायिक ATS Resume स्टुडिओ',
      subtitle: 'भारतीय व आंतरराष्ट्रीय कंपन्यांसाठी प्रमाणित A4 फॉरमॅट',
      personalTab: '१. वैयक्तिक माहिती',
      educationTab: '२. शिक्षण व कॉलेज',
      skillsTab: '३. तांत्रिक कौशल्ये',
      experienceTab: '४. प्रोजेक्ट्स व अनुभव',
      fullName: 'पूर्ण नाव',
      targetRole: 'लक्ष्य पद (उदा. Full Stack Developer)',
      email: 'ईमेल पत्ता',
      phone: 'मोबाईल / व्हॉट्सॲप',
      location: 'शहर / राज्य',
      linkedin: 'LinkedIn / GitHub प्रोफाइल',
      degree: 'पदवी (Degree)',
      university: 'कॉलेज / विद्यापीठ नाव',
      gradYear: 'पदवी वर्ष (Graduation Year)',
      cgpa: 'CGPA किंवा टक्केवारी',
      summary: 'करिअर उद्दिष्ट (Career Summary)',
      aiPolish: 'AI ने सुधारणा करा',
      skillsLabel: 'तांत्रिक कौशल्ये (स्वल्पविरामाने वेगळे करा)',
      projectsLabel: 'महत्त्वाचे प्रोजेक्ट्स (नाव आणि माहिती)',
      certificationsLabel: 'प्रमाणपत्रे (Certifications)',
      templateStyle: 'Resume डिझाइन फॉरमॅट:',
      modernTech: 'मॉडर्न टेक',
      minimalATS: 'क्लासिक मिनिमल (ATS)',
      executive: 'एक्झिक्युटिव्ह',
      btnUpdate: 'लाइव्ह Preview अपडेट करा',
      btnDownload: 'Vector PDF डाउनलोड करा',
      btnPrint: 'प्रिंट करा',
      btnExportJson: 'डेटा Export करा',
      btnImportJson: 'डेटा Import करा',
      liveSheetTitle: 'थेट A4 कागद Preview',
      atsAnalysisTitle: 'ATS गुणवत्ता विश्लेषण (Real-time Checklist)',
      metricContact: 'संपर्क माहिती पूर्ण',
      metricSummary: 'उद्दिष्ट व प्रभाव स्पष्ट',
      metricSkills: 'कमीत कमी ५ तांत्रिक स्किल्स',
      metricProjects: 'प्रोजेक्ट्स समाविष्ट'
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
      previewTitle: 'तयार झालेला ईमेल मेसेज:'
    },
    jobs: {
      title: 'इंटर्नशिप्स आणि फ्रेशर जॉब रडार',
      subtitle: 'विद्यार्थ्यांसाठी खास निवडक रिमोट, हायब्रिड व ऑन-साइट संधी.',
      searchPlaceholder: 'पद किंवा स्किल शोधा (उदा. React, Node.js, Python, Frontend, Trainee)...',
      allLocations: 'सर्व शहरे',
      remoteOnly: 'केवळ रिमोट (Work from Home)',
      stipendFilter: 'स्टायपेंडसह',
      directApply: 'थेट अर्ज करा',
      saveJob: 'सेव्ह करा',
      saved: 'सेव्ह केले',
      trending: 'लोकप्रिय शोध:'
    },
    freelance: {
      title: 'विद्यार्थी फ्रीलान्सिंग हब & इन्व्हॉइस टूल',
      subtitle: 'कॉलेजमध्ये शिकत असतानाच Upwork आणि Fiverr वरून प्रोजेक्ट्स मिळवण्याचे मार्गदर्शन.',
      hourlyRateCalc: 'तासी दर (Hourly Rate) कॅल्क्युलेटर',
      hoursPerWeek: 'आठवड्याला कामाचे तास:',
      expectedRate: 'अपेक्षित प्रति तास दर:',
      projectedMonthly: 'अपेक्षित मासिक कमाई:',
      proposalGen: 'क्लायंटसाठी इन्स्टंट Proposal जनरेटर',
      selectGig: 'सर्व्हिस प्रकार निवडा:',
      copyProposal: 'Proposal कॉपी करा',
      invoiceToolTitle: 'क्लायंटसाठी झटपट इन्व्हॉइस (Invoice Generator)',
      clientName: 'क्लायंट / कंपनी नाव',
      serviceDesc: 'काम / प्रोजेक्टचे नाव',
      invoiceAmount: 'रक्कम',
      btnDownloadInvoice: 'इन्व्हॉइस PDF बनवा'
    },
    roadmaps: {
      title: 'इंजिनिअरिंग करिअर रोडमॅप & मुलाखत तयारी',
      subtitle: 'महत्त्वाच्या कोडिंग संकल्पना आणि मुलाखतीसाठी महत्त्वाचे प्रश्नोत्तरे.',
      interviewPrepTitle: 'टॉप मुलाखत प्रश्न (Quick Interview Flashcards)',
      showAnswer: 'उत्तर पाहा',
      hideAnswer: 'उत्तर लपवा'
    }
  },
  en: {
    langName: 'English',
    flag: '🌐',
    brandName: 'CareerSarthi',
    brandBadge: 'Global Career Suite',
    nav: {
      dashboard: 'Dashboard',
      resume: 'ATS Resume Builder',
      coverLetter: 'Cold Email & Cover Letter',
      jobs: 'Internships & Jobs',
      freelance: 'Freelance & Invoice',
      roadmaps: 'Roadmaps & Prep'
    },
    dashboard: {
      welcome: 'Welcome to your Student Career Command Center',
      desc: 'Build ATS resumes, discover global internships, and monetize engineering skills in college.',
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
      title: 'Professional ATS Resume Studio',
      subtitle: 'Standardized single-page A4 format designed to pass automated hiring systems.',
      personalTab: '1. Personal Info',
      educationTab: '2. Academics',
      skillsTab: '3. Technical Skills',
      experienceTab: '4. Projects & Work',
      fullName: 'Full Name',
      targetRole: 'Target Role (e.g. Full Stack Developer)',
      email: 'Email Address',
      phone: 'Phone / WhatsApp',
      location: 'City, Country',
      linkedin: 'LinkedIn / GitHub URL',
      degree: 'Degree (e.g. B.Tech Computer Science)',
      university: 'College / University Name',
      gradYear: 'Graduation Year',
      cgpa: 'CGPA / Percentage',
      summary: 'Professional Career Summary',
      aiPolish: 'AI Enhance Summary',
      skillsLabel: 'Technical Skills (comma separated)',
      projectsLabel: 'Key Projects (Title & description)',
      certificationsLabel: 'Certifications & Honors',
      templateStyle: 'Resume Layout Theme:',
      modernTech: 'Modern Tech',
      minimalATS: 'Classic ATS',
      executive: 'Executive',
      btnUpdate: 'Update Live Sheet',
      btnDownload: 'Download Vector PDF',
      btnPrint: 'Print Resume',
      btnExportJson: 'Export JSON',
      btnImportJson: 'Import JSON',
      liveSheetTitle: 'Live A4 Print Preview',
      atsAnalysisTitle: 'Real-Time ATS Health Checklist',
      metricContact: 'Contact details valid',
      metricSummary: 'Summary length optimal',
      metricSkills: '5+ verified tech skills',
      metricProjects: 'Projects listed clearly'
    },
    emailTool: {
      title: 'AI Cold Email & Cover Letter Generator',
      subtitle: 'Craft personalized outreach emails to recruiters and tech founders in seconds.',
      recipientRole: 'Who are you writing to?',
      companyName: 'Company Name',
      targetPosition: 'Target Job / Internship Role',
      myStrongSkill: 'Your strongest tech skill',
      btnGenerate: 'Generate Email Pitch',
      btnCopy: 'Copy Outreach Email',
      previewTitle: 'Generated Cold Email:'
    },
    jobs: {
      title: 'Curated Internship & Job Radar',
      subtitle: 'Filtered student-friendly roles, verified campus drives, and remote tech internships.',
      searchPlaceholder: 'Search by role or tech stack (e.g. React, Node.js, Python, Frontend, Trainee)...',
      allLocations: 'All Locations',
      remoteOnly: 'Remote Only (Work From Home)',
      stipendFilter: 'Paid / Stipend',
      directApply: 'Direct Apply',
      saveJob: 'Save',
      saved: 'Saved',
      trending: 'Trending:'
    },
    freelance: {
      title: 'Student Freelance Launchpad & Invoicing',
      subtitle: 'Actionable tactics to secure initial freelance contracts and invoice global clients.',
      hourlyRateCalc: 'Hourly Rate & Earnings Estimator',
      hoursPerWeek: 'Available hours / week:',
      expectedRate: 'Target hourly rate:',
      projectedMonthly: 'Projected Monthly Income:',
      proposalGen: 'Instant Client Proposal Generator',
      selectGig: 'Select Service Type:',
      copyProposal: 'Copy Proposal',
      invoiceToolTitle: 'Quick Client Invoice Generator',
      clientName: 'Client / Company Name',
      serviceDesc: 'Deliverables / Scope of Work',
      invoiceAmount: 'Invoice Amount',
      btnDownloadInvoice: 'Generate Invoice PDF'
    },
    roadmaps: {
      title: 'Engineering Roadmaps & Interview Preparation',
      subtitle: 'Structured progression milestones and curated interview flashcards.',
      interviewPrepTitle: 'Technical Interview Flashcards',
      showAnswer: 'Show Answer',
      hideAnswer: 'Hide Answer'
    }
  },
  hi: {
    langName: 'हिंदी',
    flag: '🇮🇳',
    brandName: 'CareerSarthi',
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
      welcome: 'विद्यार्थी करियर कमांड सेंटर में आपका स्वागत है',
      desc: 'ATS रिज्यूमे बनाएं, वैश्विक इंटर्नशिप खोजें और कॉलेज में ही कमाई शुरू करें।',
      atsCardTitle: 'Resume ATS स्कोर',
      atsCardDesc: 'ऑटोमेटेड स्क्रीनिंग पास करने की क्षमता',
      savedJobsTitle: 'सेव किए गए अवसर',
      activeRoadmapsTitle: 'रोडमैप प्रोग्रेस',
      quickActions: 'त्वरित शुरुआत (Quick Actions)',
      btnBuildResume: 'नया Resume बनाएं',
      btnSearchJobs: 'नौकरियां खोजें',
      btnWriteEmail: 'Cold Email लिखें'
    },
    resume: {
      title: 'प्रोफेशनल ATS Resume स्टूडियो',
      subtitle: 'कंपनियों में शॉर्टलिस्ट होने के लिए मानक A4 प्रारूप',
      personalTab: '१. व्यक्तिगत विवरण',
      educationTab: '२. शिक्षा व कॉलेज',
      skillsTab: '३. तकनीकी कौशल',
      experienceTab: '४. प्रोजेक्ट्स व अनुभव',
      fullName: 'पूरा नाम',
      targetRole: 'लक्ष्य पद (उदा. Full Stack Developer)',
      email: 'ईमेल पता',
      phone: 'फ़ोन / व्हाट्सएप',
      location: 'शहर / राज्य',
      linkedin: 'LinkedIn / GitHub प्रोफाइल',
      degree: 'डिग्री (Degree)',
      university: 'कॉलेज / विश्वविद्यालय',
      gradYear: 'उत्तीर्ण वर्ष (Graduation Year)',
      cgpa: 'CGPA / प्रतिशत',
      summary: 'करियर सारांश (Career Summary)',
      aiPolish: 'AI से सुधारें',
      skillsLabel: 'तकनीकी कौशल (अल्पविराम से अलग करें)',
      projectsLabel: 'प्रमुख प्रोजेक्ट्स',
      certificationsLabel: 'प्रमाणपत्र (Certifications)',
      templateStyle: 'Resume डिज़ाइन थीम:',
      modernTech: 'मॉडर्न टेक',
      minimalATS: 'क्लासिक ATS',
      executive: 'एग्जीक्यूटिव',
      btnUpdate: 'लाइव Preview अपडेट करें',
      btnDownload: 'Vector PDF डाउनलोड करें',
      btnPrint: 'प्रिंट करें',
      btnExportJson: 'डेटा Export करें',
      btnImportJson: 'डेटा Import करें',
      liveSheetTitle: 'लाइव A4 शीट Preview',
      atsAnalysisTitle: 'ATS गुणवत्ता चेकलिस्ट',
      metricContact: 'संपर्क जानकारी मान्य',
      metricSummary: 'सारांश अनुकूल',
      metricSkills: '५+ तकनीकी स्किल्स',
      metricProjects: 'प्रोजेक्ट्स शामिल'
    },
    emailTool: {
      title: 'AI Cold Email और कवर लेटर जनरेटर',
      subtitle: 'HR और फाउंडर्स को सीधे प्रभावशाली ईमेल भेजने के लिए टूल।',
      recipientRole: 'आप किसे ईमेल भेज रहे हैं?',
      companyName: 'कंपनी का नाम',
      targetPosition: 'वांछित पद (Target Position)',
      myStrongSkill: 'आपकी सबसे मजबूत स्किल',
      btnGenerate: 'ईमेल तैयार करें',
      btnCopy: 'ईमेल कॉपी करें',
      previewTitle: 'तैयार ईमेल:'
    },
    jobs: {
      title: 'इंटर्नशिप और फ्रेशर जॉब रडार',
      subtitle: 'छात्रों के लिए विशेष रूप से सत्यापित रिमोट व ऑन-साइट अवसर।',
      searchPlaceholder: 'पद या स्किल खोजें (उदा. React, Node.js, Python, Frontend, Trainee)...',
      allLocations: 'सभी शहर',
      remoteOnly: 'केवल रिमोट (Work from Home)',
      stipendFilter: 'वेतन / स्टाइपेंड सहित',
      directApply: 'सीधा आवेदन',
      saveJob: 'सेव करें',
      saved: 'सेव किया',
      trending: 'ट्रेंडिंग:'
    },
    freelance: {
      title: 'स्टूडेंट फ्रीलांसिंग हब & इनवॉइस टूल',
      subtitle: 'कॉलेज में पढ़ते हुए Upwork और Fiverr से प्रोजेक्ट्स पाने की रणनीति।',
      hourlyRateCalc: 'प्रति घंटा दर (Hourly Rate) कैलकुलेटर',
      hoursPerWeek: 'प्रति सप्ताह उपलब्ध घंटे:',
      expectedRate: 'अपेक्षित प्रति घंटा दर:',
      projectedMonthly: 'अनुमानित मासिक आय:',
      proposalGen: 'क्लाइंट्स के लिए तुरंत Proposal जनरेटर',
      selectGig: 'सर्विस प्रकार चुनें:',
      copyProposal: 'Proposal कॉपी करें',
      invoiceToolTitle: 'क्लाइंट इनवॉइस जनरेटर',
      clientName: 'क्लाइंट / कंपनी नाम',
      serviceDesc: 'काम का विवरण',
      invoiceAmount: 'राशि',
      btnDownloadInvoice: 'इनवॉइस PDF बनाएं'
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
    brandName: 'CareerSarthi',
    brandBadge: 'Plataforma Global',
    nav: {
      dashboard: 'Panel Principal',
      resume: 'Creador de CV ATS',
      coverLetter: 'Cold Email & Carta',
      jobs: 'Empleos & Pasantías',
      freelance: 'Freelance & Facturas',
      roadmaps: 'Rutas & Entrevistas'
    },
    dashboard: {
      welcome: 'Bienvenido a tu Centro de Carrera Estudiantil',
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
      title: 'Estudio de CV Profesional ATS',
      subtitle: 'Formato A4 optimizado para superar sistemas de reclutamiento.',
      personalTab: '1. Datos Personales',
      educationTab: '2. Educación',
      skillsTab: '3. Habilidades Técnicas',
      experienceTab: '4. Proyectos',
      fullName: 'Nombre Completo',
      targetRole: 'Puesto Deseado',
      email: 'Correo Electrónico',
      phone: 'Teléfono / WhatsApp',
      location: 'Ciudad, País',
      linkedin: 'Perfil de LinkedIn / GitHub',
      degree: 'Título Universitario',
      university: 'Universidad / Instituto',
      gradYear: 'Año de Graduación',
      cgpa: 'Promedio / Calificación',
      summary: 'Resumen Profesional',
      aiPolish: 'Mejorar con IA',
      skillsLabel: 'Habilidades (separadas por comas)',
      projectsLabel: 'Proyectos Destacados',
      certificationsLabel: 'Certificaciones',
      templateStyle: 'Plantilla de CV:',
      modernTech: 'Tecnológica Moderna',
      minimalATS: 'ATS Clásica',
      executive: 'Ejecutiva',
      btnUpdate: 'Actualizar Vista Previa',
      btnDownload: 'Descargar PDF Vectorial',
      btnPrint: 'Imprimir',
      btnExportJson: 'Exportar JSON',
      btnImportJson: 'Importar JSON',
      liveSheetTitle: 'Vista Previa en Vivo A4',
      atsAnalysisTitle: 'Lista de Verificación ATS',
      metricContact: 'Contacto válido',
      metricSummary: 'Resumen óptimo',
      metricSkills: 'Más de 5 habilidades',
      metricProjects: 'Proyectos claros'
    },
    emailTool: {
      title: 'Generador de Cold Email con IA',
      subtitle: 'Escribe propuestas a reclutadores y fundadores en segundos.',
      recipientRole: '¿A quién escribes?',
      companyName: 'Nombre de la Empresa',
      targetPosition: 'Puesto Solicitado',
      myStrongSkill: 'Tu habilidad técnica principal',
      btnGenerate: 'Generar Email',
      btnCopy: 'Copiar Email',
      previewTitle: 'Email Generado:'
    },
    jobs: {
      title: 'Radar de Pasantías y Empleos Junior',
      subtitle: 'Oportunidades remotas y presenciales verificadas para estudiantes.',
      searchPlaceholder: 'Buscar por puesto o habilidad (ej. React, Python, Frontend)...',
      allLocations: 'Todas las Ubicaciones',
      remoteOnly: 'Solo Remoto',
      stipendFilter: 'Con Pasantía Pagada',
      directApply: 'Postular Directo',
      saveJob: 'Guardar',
      saved: 'Guardado',
      trending: 'Tendencias:'
    },
    freelance: {
      title: 'Guía Freelance y Facturación',
      subtitle: 'Estrategias para conseguir tus primeros clientes internacionales.',
      hourlyRateCalc: 'Calculadora de Tarifa por Hora',
      hoursPerWeek: 'Horas disponibles / semana:',
      expectedRate: 'Tarifa objetivo por hora:',
      projectedMonthly: 'Ingreso mensual proyectado:',
      proposalGen: 'Generador de Propuestas Instantáneas',
      selectGig: 'Tipo de Servicio:',
      copyProposal: 'Copiar Propuesta',
      invoiceToolTitle: 'Generador de Facturas',
      clientName: 'Cliente / Empresa',
      serviceDesc: 'Descripción del Servicio',
      invoiceAmount: 'Monto Total',
      btnDownloadInvoice: 'Generar Factura PDF'
    },
    roadmaps: {
      title: 'Rutas de Aprendizaje y Preparación',
      subtitle: 'Hitos clave y tarjetas de preguntas técnicas para entrevistas.',
      interviewPrepTitle: 'Tarjetas de Entrevista Técnica',
      showAnswer: 'Ver Respuesta',
      hideAnswer: 'Ocultar Respuesta'
    }
  },
  de: {
    langName: 'Deutsch',
    flag: '🇩🇪',
    brandName: 'CareerSarthi',
    brandBadge: 'Globale Karriere-Suite',
    nav: {
      dashboard: 'Dashboard',
      resume: 'ATS-Lebenslauf',
      coverLetter: 'Cold E-Mail & Anschreiben',
      jobs: 'Praktika & Jobs',
      freelance: 'Freelance & Rechnung',
      roadmaps: 'Roadmaps & Prep'
    },
    dashboard: {
      welcome: 'Willkommen in deiner Karriere-Zentrale',
      desc: 'Erstelle ATS-optimierte Lebensläufe und finde weltweite Praktika.',
      atsCardTitle: 'ATS-Score',
      atsCardDesc: 'Kompatibilität mit Bewerbersystemen',
      savedJobsTitle: 'Gespeicherte Jobs',
      activeRoadmapsTitle: 'Roadmap-Fortschritt',
      quickActions: 'Schnellstart',
      btnBuildResume: 'Lebenslauf erstellen',
      btnSearchJobs: 'Praktika suchen',
      btnWriteEmail: 'Cold E-Mail verfassen'
    },
    resume: {
      title: 'Professionelles ATS-Lebenslauf Studio',
      subtitle: 'Standardisiertes A4-Format für optimale Screening-Ergebnisse.',
      personalTab: '1. Persönliche Daten',
      educationTab: '2. Ausbildung',
      skillsTab: '3. Technische Fähigkeiten',
      experienceTab: '4. Projekte',
      fullName: 'Vollständiger Name',
      targetRole: 'Zielposition (z.B. Frontend Entwickler)',
      email: 'E-Mail-Adresse',
      phone: 'Telefonnummer',
      location: 'Stadt, Land',
      linkedin: 'LinkedIn / GitHub URL',
      degree: 'Abschluss (z.B. B.Sc. Informatik)',
      university: 'Universität / Hochschule',
      gradYear: 'Abschlussjahr',
      cgpa: 'Notendurchschnitt (GPA)',
      summary: 'Berufliches Profil',
      aiPolish: 'Mit KI verbessern',
      skillsLabel: 'Fähigkeiten (durch Kommas getrennt)',
      projectsLabel: 'Wichtige Projekte',
      certificationsLabel: 'Zertifikate',
      templateStyle: 'Design-Vorlage:',
      modernTech: 'Modern Tech',
      minimalATS: 'Klassisch ATS',
      executive: 'Executive',
      btnUpdate: 'Vorschau aktualisieren',
      btnDownload: 'Vektor-PDF herunterladen',
      btnPrint: 'Drucken',
      btnExportJson: 'JSON exportieren',
      btnImportJson: 'JSON importieren',
      liveSheetTitle: 'Live A4 Druckvorschau',
      atsAnalysisTitle: 'ATS-Qualitätscheck',
      metricContact: 'Kontaktdaten gültig',
      metricSummary: 'Profil aussagekräftig',
      metricSkills: '5+ verifizierte Skills',
      metricProjects: 'Projekte strukturiert'
    },
    emailTool: {
      title: 'KI Cold E-Mail & Anschreiben Generator',
      subtitle: 'Verfasse gezielte Initiativbewerbungen an Recruiter in Sekundenschnelle.',
      recipientRole: 'An wen schreibst du?',
      companyName: 'Unternehmensname',
      targetPosition: 'Angestrebte Position',
      myStrongSkill: 'Deine stärkste Kernkompetenz',
      btnGenerate: 'E-Mail generieren',
      btnCopy: 'E-Mail kopieren',
      previewTitle: 'Generierte E-Mail:'
    },
    jobs: {
      title: 'Praktikums- & Einsteiger-Radar',
      subtitle: 'Kuratierte Stellenangebote und Remote-Praktika für Studierende.',
      searchPlaceholder: 'Nach Rolle oder Technologie suchen...',
      allLocations: 'Alle Standorte',
      remoteOnly: 'Nur Remote (Homeoffice)',
      stipendFilter: 'Vergütet',
      directApply: 'Direkt bewerben',
      saveJob: 'Merken',
      saved: 'Gemerkt',
      trending: 'Trends:'
    },
    freelance: {
      title: 'Studenten-Freelance & Abrechnung',
      subtitle: 'Strategien für die ersten Kundenaufträge und Rechnungserstellung.',
      hourlyRateCalc: 'Stundensatz-Kalkulator',
      hoursPerWeek: 'Verfügbare Stunden / Woche:',
      expectedRate: 'Gewünschter Stundensatz:',
      projectedMonthly: 'Monatliches Einkommen:',
      proposalGen: 'Sofort-Angebotsgenerator',
      selectGig: 'Dienstleistung wählen:',
      copyProposal: 'Angebot kopieren',
      invoiceToolTitle: 'Rechnungsgenerator',
      clientName: 'Kunde / Unternehmen',
      serviceDesc: 'Leistungsbeschreibung',
      invoiceAmount: 'Rechnungsbetrag',
      btnDownloadInvoice: 'Rechnung PDF erstellen'
    },
    roadmaps: {
      title: 'Entwickler-Roadmaps & Interviewvorbereitung',
      subtitle: 'Strukturierte Lernpfade und technische Fragekarten.',
      interviewPrepTitle: 'Technische Interview-Lernkarten',
      showAnswer: 'Antwort anzeigen',
      hideAnswer: 'Antwort verbergen'
    }
  },
  fr: {
    langName: 'Français',
    flag: '🇫🇷',
    brandName: 'CareerSarthi',
    brandBadge: 'Suite Carrière Mondiale',
    nav: {
      dashboard: 'Tableau de bord',
      resume: 'CV ATS',
      coverLetter: 'Email & Lettre',
      jobs: 'Stages & Emplois',
      freelance: 'Freelance & Factures',
      roadmaps: 'Parcours & Préparation'
    },
    dashboard: {
      welcome: 'Bienvenue dans votre centre de carrière étudiante',
      desc: 'Créez des CVs compatibles ATS et trouvez des stages partout dans le monde.',
      atsCardTitle: 'Score ATS',
      atsCardDesc: 'Compatibilité avec les robots recruteurs',
      savedJobsTitle: 'Offres Sauvegardées',
      activeRoadmapsTitle: 'Objectifs Atteints',
      quickActions: 'Actions Rapides',
      btnBuildResume: 'Créer un CV ATS',
      btnSearchJobs: 'Chercher des Stages',
      btnWriteEmail: 'Rédiger un Cold Email'
    },
    resume: {
      title: 'Studio de CV Professionnel ATS',
      subtitle: 'Format A4 standardisé conçu pour maximiser les chances d’entretien.',
      personalTab: '1. Informations Personnelles',
      educationTab: '2. Formation',
      skillsTab: '3. Compétences',
      experienceTab: '4. Projets',
      fullName: 'Nom Complet',
      targetRole: 'Poste Visé (ex: Développeur Full Stack)',
      email: 'Adresse Email',
      phone: 'Téléphone / WhatsApp',
      location: 'Ville, Pays',
      linkedin: 'Lien LinkedIn / GitHub',
      degree: 'Diplôme (ex: Licence Informatique)',
      university: 'Université / École',
      gradYear: 'Année de Promotion',
      cgpa: 'Moyenne / Mention',
      summary: 'Résumé Professionnel',
      aiPolish: 'Améliorer par IA',
      skillsLabel: 'Compétences Techniques (séparées par des virgules)',
      projectsLabel: 'Projets Réalisés',
      certificationsLabel: 'Certifications',
      templateStyle: 'Thème du CV:',
      modernTech: 'Tech Moderne',
      minimalATS: 'ATS Épuré',
      executive: 'Exécutif',
      btnUpdate: 'Mettre à jour l’Aperçu',
      btnDownload: 'Télécharger le PDF Vectoriel',
      btnPrint: 'Imprimer',
      btnExportJson: 'Exporter JSON',
      btnImportJson: 'Importer JSON',
      liveSheetTitle: 'Aperçu Direct Format A4',
      atsAnalysisTitle: 'Vérification Qualité ATS',
      metricContact: 'Contact complet',
      metricSummary: 'Résumé optimal',
      metricSkills: '5+ compétences vérifiées',
      metricProjects: 'Projets bien décrits'
    },
    emailTool: {
      title: 'Générateur de Cold Email par IA',
      subtitle: 'Générez des messages percutants pour les recruteurs en quelques secondes.',
      recipientRole: 'À qui écrivez-vous ?',
      companyName: 'Nom de l’Entreprise',
      targetPosition: 'Poste Souhaité',
      myStrongSkill: 'Votre point fort technique',
      btnGenerate: 'Générer l’Email',
      btnCopy: 'Copier l’Email',
      previewTitle: 'Email Généré :'
    },
    jobs: {
      title: 'Radar de Stages et Premiers Emplois',
      subtitle: 'Offres sélectionnées pour étudiants et jeunes diplômés.',
      searchPlaceholder: 'Rechercher par poste ou mot-clé (ex: React, Python)...',
      allLocations: 'Toutes les Villes',
      remoteOnly: 'Télétravail Uniquement',
      stipendFilter: 'Rémunéré',
      directApply: 'Postuler',
      saveJob: 'Enregistrer',
      saved: 'Enregistré',
      trending: 'Tendances :'
    },
    freelance: {
      title: 'Lancement Freelance et Facturation',
      subtitle: 'Méthodes pour décrocher vos premières missions et facturer les clients.',
      hourlyRateCalc: 'Calculateur de Taux Horaire',
      hoursPerWeek: 'Heures disponibles / semaine :',
      expectedRate: 'Taux horaire visé :',
      projectedMonthly: 'Revenu mensuel estimé :',
      proposalGen: 'Générateur de Proposition Client',
      selectGig: 'Type de prestation :',
      copyProposal: 'Copier la Proposition',
      invoiceToolTitle: 'Générateur de Facture Rapide',
      clientName: 'Client / Entreprise',
      serviceDesc: 'Description du Projet',
      invoiceAmount: 'Montant',
      btnDownloadInvoice: 'Télécharger Facture PDF'
    },
    roadmaps: {
      title: 'Feuilles de Route et Préparation Entretiens',
      subtitle: 'Paliers d’apprentissage et flashcards de questions techniques.',
      interviewPrepTitle: 'Flashcards Techniques d’Entretien',
      showAnswer: 'Voir la Réponse',
      hideAnswer: 'Masquer la Réponse'
    }
  },
  ja: {
    langName: '日本語',
    flag: '🇯🇵',
    brandName: 'CareerSarthi',
    brandBadge: '学生キャリア総合支援',
    nav: {
      dashboard: 'ダッシュボード',
      resume: 'ATS履歴書ビルダー',
      coverLetter: 'スカウト用メール作成',
      jobs: '求人・インターン',
      freelance: '副業＆請求書',
      roadmaps: '学習ロードマップ'
    },
    dashboard: {
      welcome: '学生キャリア司令塔へようこそ',
      desc: '海外基準の英文ATSレジュメを作成し、世界中のインターンシップに応募できます。',
      atsCardTitle: 'ATS適合スコア',
      atsCardDesc: '自動書類審査の通過率',
      savedJobsTitle: '保存した求人',
      activeRoadmapsTitle: '達成した目標',
      quickActions: 'クイックアクション',
      btnBuildResume: '履歴書を作成',
      btnSearchJobs: 'インターンを探す',
      btnWriteEmail: '応募メールを書く'
    },
    resume: {
      title: 'プロフェッショナルATS履歴書スタジオ',
      subtitle: '大手企業の選考システムに準拠したA4英文標準フォーマット。',
      personalTab: '1. 基本情報',
      educationTab: '2. 学歴',
      skillsTab: '3. 技術スキル',
      experienceTab: '4. 開発実績',
      fullName: '氏名',
      targetRole: '希望職種（例: フルスタック開発者）',
      email: 'メールアドレス',
      phone: '電話番号',
      location: '所在地',
      linkedin: 'LinkedIn / GitHub URL',
      degree: '専攻・学位（例: 情報理工学部）',
      university: '大学名',
      gradYear: '卒業予定年',
      cgpa: 'GPA / 成績',
      summary: '自己PR・キャリアサマリー',
      aiPolish: 'AIで文章を推敲',
      skillsLabel: 'スキル（カンマ区切り）',
      projectsLabel: '開発プロジェクト',
      certificationsLabel: '資格・認定',
      templateStyle: 'デザインテンプレート:',
      modernTech: 'モダンテック',
      minimalATS: 'クラシックATS',
      executive: 'エグゼクティブ',
      btnUpdate: 'プレビューを更新',
      btnDownload: 'ベクターPDF出力',
      btnPrint: '印刷する',
      btnExportJson: 'JSONエクスポート',
      btnImportJson: 'JSONインポート',
      liveSheetTitle: 'リアルタイムA4印刷プレビュー',
      atsAnalysisTitle: 'ATS品質チェックリスト',
      metricContact: '連絡先が正確に入力されている',
      metricSummary: 'サマリーが十分な長さである',
      metricSkills: '5つ以上のスキルが記載されている',
      metricProjects: 'プロジェクト実績が明確である'
    },
    emailTool: {
      title: 'AIコールドメール＆送付状ジェネレーター',
      subtitle: '採用担当者や企業創業者へ送る魅力的なメッセージを瞬時に作成します。',
      recipientRole: '送り先の相手は？',
      companyName: '企業名',
      targetPosition: '応募するポジション',
      myStrongSkill: '最も得意なスキル',
      btnGenerate: 'メールを作成する',
      btnCopy: 'メール文をコピー',
      previewTitle: '生成されたメール文:'
    },
    jobs: {
      title: '学生向けインターン＆新卒求人レーダー',
      subtitle: 'リモート対応や有給インターンを厳選して掲載。',
      searchPlaceholder: '職種や技術名で検索（例: React, Python, Frontend）...',
      allLocations: 'すべての勤務地',
      remoteOnly: 'リモート限定 (在宅勤務)',
      stipendFilter: '有給インターン',
      directApply: '今すぐ応募',
      saveJob: '保存',
      saved: '保存済み',
      trending: '注目ワード:'
    },
    freelance: {
      title: '学生フリーランス副業＆請求書ツール',
      subtitle: '在学中に国際的な案件を受注し収入を得るための実践ガイド。',
      hourlyRateCalc: '時給・想定月収シミュレーター',
      hoursPerWeek: '週あたりの稼働可能時間:',
      expectedRate: '希望の時給単価:',
      projectedMonthly: '見込み月収:',
      proposalGen: 'クライアント向け即戦力提案文',
      selectGig: '提供するサービス:',
      copyProposal: '提案文をコピー',
      invoiceToolTitle: 'クライアント向け簡単請求書作成',
      clientName: 'クライアント名 / 企業名',
      serviceDesc: '業務内容・納品物',
      invoiceAmount: '請求金額',
      btnDownloadInvoice: '請求書PDF作成'
    },
    roadmaps: {
      title: '成長ロードマップ＆面接対策',
      subtitle: 'エンジニア必須スキルの体系的学習ステップと面接頻出問題。',
      interviewPrepTitle: '技術面接クイズ（フラッシュカード）',
      showAnswer: '解答を表示',
      hideAnswer: '解答を隠す'
    }
  }
}

// Top 50 Interview Flashcards
const INTERVIEW_QUESTIONS = [
  {
    topic: 'React',
    q: 'What is the Virtual DOM and how does React reconciliation work?',
    a: 'Virtual DOM is an in-memory lightweight representation of the real DOM. When state changes, React creates a new VDOM tree, computes diffs using the Fiber reconciliation algorithm, and applies minimal batch updates to the real DOM for 60fps performance.'
  },
  {
    topic: 'JavaScript',
    q: 'Explain Event Loop, Microtasks, and Macrotasks.',
    a: 'JavaScript has a single-threaded runtime with a call stack. Synchronous code runs first. When stack is empty, Event Loop processes Microtasks (Promise.then, queueMicrotask) before picking Macrotasks (setTimeout, setInterval, I/O events).'
  },
  {
    topic: 'Node.js',
    q: 'How does Node.js handle concurrency with single-threaded architecture?',
    a: 'Node.js uses libuv and a non-blocking I/O event loop. CPU-intensive or disk operations are delegated to libuv worker thread pools, while the main thread handles incoming network connections asynchronously without blocking.'
  },
  {
    topic: 'Database & SQL',
    q: 'What is the difference between Clustered and Non-Clustered Indexes?',
    a: 'A Clustered Index defines the physical order of table rows on disk (only 1 per table, usually Primary Key). A Non-Clustered Index is a separate B-tree structure holding pointers to the actual data rows (multiple allowed per table).'
  },
  {
    topic: 'System Design',
    q: 'What is CAP Theorem in distributed systems?',
    a: 'CAP states that a distributed system can guarantee at most two out of three: Consistency (all nodes see latest data), Availability (every non-failing node returns a response), and Partition Tolerance (system continues functioning despite network drops).'
  }
]

// Sample Pre-populated Student Jobs
const INITIAL_JOBS = [
  {
    id: 1,
    title: 'Frontend & UI Engineering Intern',
    company: 'CloudScale Global Inc.',
    location: 'Remote (Global)',
    type: 'Internship',
    stipend: '₹35,000 / mo ($850)',
    tags: ['React', 'TypeScript', 'Tailwind', 'Remote'],
    description: 'Build fast, responsive dashboard interfaces, collaborate with design teams, and participate in daily agile standups. Pre-placement offer (PPO) available.',
    url: 'https://www.linkedin.com/jobs'
  },
  {
    id: 2,
    title: 'Junior Full Stack Developer',
    company: 'Nexus Tech Labs',
    location: 'Pune / Mumbai (Hybrid)',
    type: 'Fresher / Entry',
    stipend: '₹6.5 - ₹9.0 LPA',
    tags: ['Node.js', 'React', 'PostgreSQL', 'Campus'],
    description: 'Work directly on enterprise SaaS microservices, REST APIs, and client-facing web portals. Mentorship from senior engineering architects.',
    url: 'https://internshala.com'
  },
  {
    id: 3,
    title: 'AI Engineering & LLM Trainee',
    company: 'HyperGrowth AI Startup',
    location: 'San Francisco / Remote',
    type: 'Internship',
    stipend: '$25 / hour (₹50k/mo)',
    tags: ['Python', 'FastAPI', 'LangChain', 'US-Remote'],
    description: 'Develop retrieval-augmented generation (RAG) pipelines, vector database integrations, and automated evaluation suites.',
    url: 'https://wellfound.com'
  },
  {
    id: 4,
    title: 'Backend API Developer (Batch 2024-2026)',
    company: 'Veritas Infotech Systems',
    location: 'Bengaluru / Hyderabad / Remote',
    type: 'Fresher / Entry',
    stipend: '₹5.0 - ₹8.0 LPA',
    tags: ['Express', 'Docker', 'REST APIs', 'India'],
    description: 'Design robust authentication systems, background job workers with Redis/BullMQ, and automated Puppeteer PDF compilation engines.',
    url: 'https://www.naukri.com'
  }
]

export default function App() {
  // Navigation & Language
  const [lang, setLang] = useState('mr') // default Marathi as requested
  const [activeTab, setActiveTab] = useState('dashboard') // 'dashboard', 'resume', 'coverLetter', 'jobs', 'freelance', 'roadmaps'
  const [resumeSubTab, setResumeSubTab] = useState('personal') // 'personal', 'education', 'skills', 'experience'
  const [templateStyle, setTemplateStyle] = useState('modernTech') // 'modernTech', 'minimalATS', 'executive'
  const [currency, setCurrency] = useState('INR')

  // Notification Toast
  const [toastMsg, setToastMsg] = useState('')

  // Resume State
  const [name, setName] = useState('Vinayak S.')
  const [role, setRole] = useState('Full Stack Software Engineer')
  const [email, setEmail] = useState('vinayak.tech@example.com')
  const [phone, setPhone] = useState('+91 98765 43210')
  const [location, setLocation] = useState('Pune, Maharashtra, India')
  const [linkedin, setLinkedin] = useState('linkedin.com/in/vinayak-tech • github.com/vinayak-s')
  const [degree, setDegree] = useState('Bachelor of Technology in Computer Science (B.Tech)')
  const [university, setUniversity] = useState('Government College of Engineering')
  const [gradYear, setGradYear] = useState('2022 - 2026')
  const [cgpa, setCgpa] = useState('8.85 / 10.0 CGPA')
  const [summary, setSummary] = useState('High-performing and passionate Computer Science undergraduate with hands-on expertise in React, Node.js, Express, and Modern Web Architectures. Proven track record of developing scalable web applications, robust REST APIs, and automated tools with high responsiveness and clean code standards.')
  const [skills, setSkills] = useState('React.js, Node.js, JavaScript (ES6+), Express.js, Tailwind CSS, PostgreSQL, Git & GitHub, Puppeteer, REST APIs, Docker')
  const [projects, setProjects] = useState('1. CareerSarthi Global Suite — Built a full-stack career platform featuring a multi-lingual ATS resume engine, instant PDF vector rendering, and curated job radar with Node.js & React.\n2. CloudSync Real-time Portal — Developed low-latency WebSocket communication service for collaborative whiteboard state synchronization.')
  const [certifications, setCertifications] = useState('AWS Cloud Practitioner Essentials, Meta Certified Frontend Developer Specialization')
  const [resumeHtml, setResumeHtml] = useState('')
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)

  // Cold Email Generator State
  const [emailRecipient, setEmailRecipient] = useState('Hiring Manager / Founder')
  const [emailCompany, setEmailCompany] = useState('Acme Technologies')
  const [emailTargetRole, setEmailTargetRole] = useState('Software Engineering Intern (Summer 2025)')
  const [emailStrongSkill, setEmailStrongSkill] = useState('React & Node.js Full Stack Development')
  const [generatedColdEmail, setGeneratedColdEmail] = useState('')

  // Jobs State
  const [jobsList, setJobsList] = useState(INITIAL_JOBS)
  const [jobSearchQuery, setJobSearchQuery] = useState('')
  const [savedJobIds, setSavedJobIds] = useState([1])
  const [jobFilterLocation, setJobFilterLocation] = useState('all')

  // Freelance Calculator & Proposals
  const [calcHours, setCalcHours] = useState(15)
  const [calcRate, setCalcRate] = useState(currency === 'INR' ? 1200 : 25)
  const [proposalService, setProposalService] = useState('react')
  const [invoiceClient, setInvoiceClient] = useState('Global Studio Labs')
  const [invoiceDesc, setInvoiceDesc] = useState('Full Stack Tailwind Web App & PDF Generation API')
  const [invoiceAmount, setInvoiceAmount] = useState(currency === 'INR' ? '₹25,000' : '$350')

  // Interview Prep State
  const [revealedAnswers, setRevealedAnswers] = useState({})

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en

  const showToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 3500)
  }

  useEffect(() => {
    renderLiveResume()
    generateColdEmail()
  }, [lang, templateStyle, name, role, email, phone, location, degree, university, summary, skills, projects])

  // Cold email generation
  function generateColdEmail() {
    const text = `Subject: Application for ${emailTargetRole} — ${name || 'Candidate Name'}

Dear ${emailRecipient || 'Hiring Team'} at ${emailCompany || 'Your Company'},

I hope this email finds you well.

I have been following ${emailCompany}'s recent engineering initiatives and was deeply impressed by your digital products. I am writing to express my strong interest in the ${emailTargetRole} position.

As a final-year Computer Science student with hands-on experience in ${emailStrongSkill || 'Full Stack Web Development'}, I have built production-ready applications with clean architecture, fast UI rendering, and scalable backend services.

Key Highlights of My Profile:
• Proficient in ${skills.split(',').slice(0, 4).join(', ')}
• Experience delivering full-cycle projects (see portfolio & GitHub: ${linkedin})
• Quick learner, disciplined team player, and proactive problem solver

I would welcome the opportunity to discuss how my skill set and enthusiasm can contribute to ${emailCompany}'s ongoing projects. 

Thank you for your time and consideration.

Best regards,

${name}
${phone} | ${email}
${linkedin}`
    setGeneratedColdEmail(text)
  }

  // Calculate ATS Score
  const getAtsScore = () => {
    let score = 30
    if (name.trim().length > 3) score += 15
    if (email.includes('@')) score += 15
    if (summary.length > 80) score += 15
    if (skills.split(',').length >= 5) score += 15
    if (projects.length >= 40) score += 10
    return Math.min(score, 100)
  }
  const atsScore = getAtsScore()

  // Generate Resume Preview
  function renderLiveResume() {
    const skillsArray = skills.split(',').map(s => s.trim()).filter(Boolean)

    let borderAccent = '#2563eb'
    let bgHeader = '#ffffff'
    let fontStyle = "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif"

    if (templateStyle === 'minimalATS') {
      borderAccent = '#334155'
    } else if (templateStyle === 'executive') {
      borderAccent = '#0f766e'
    }

    const html = `
      <div style="font-family: ${fontStyle}; padding: 32px 36px; color: #0f172a; line-height: 1.5; font-size: 13px;">
        <div style="border-bottom: 2.5px solid ${borderAccent}; padding-bottom: 14px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <h1 style="margin: 0; font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px;">${name || 'Your Full Name'}</h1>
            <p style="margin: 3px 0 0 0; color: ${borderAccent}; font-size: 13.5px; font-weight: 700;">${role}</p>
          </div>
          <div style="text-align: right; font-size: 11.5px; color: #475569; line-height: 1.55;">
            <div>${email} • ${phone}</div>
            <div>${location}</div>
            <div style="color: #2563eb; font-weight: 600;">${linkedin}</div>
          </div>
        </div>

        <div style="margin-bottom: 14px;">
          <h3 style="margin: 0 0 4px 0; font-size: 12.5px; text-transform: uppercase; font-weight: 800; color: #1e293b; letter-spacing: 0.6px; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">Professional Summary</h3>
          <p style="margin: 0; font-size: 12.5px; color: #334155; line-height: 1.55;">${summary}</p>
        </div>

        <div style="margin-bottom: 14px;">
          <h3 style="margin: 0 0 4px 0; font-size: 12.5px; text-transform: uppercase; font-weight: 800; color: #1e293b; letter-spacing: 0.6px; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">Technical Skills & Tools</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-top: 4px;">
            ${skillsArray.map(s => `<span style="background: #f8fafc; color: #1e293b; border: 1px solid #cbd5e1; padding: 2.5px 8px; border-radius: 4px; font-size: 11px; font-weight: 600;">${s}</span>`).join('')}
          </div>
        </div>

        <div style="margin-bottom: 14px;">
          <h3 style="margin: 0 0 4px 0; font-size: 12.5px; text-transform: uppercase; font-weight: 800; color: #1e293b; letter-spacing: 0.6px; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">Education & Academic Credentials</h3>
          <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 12.5px;">
            <span>${degree}</span>
            <span style="color: #64748b; font-weight: 500;">${gradYear}</span>
          </div>
          <div style="font-size: 12px; color: #475569; margin-top: 1px;">${university} • <strong style="color: #0f172a;">${cgpa}</strong></div>
        </div>

        <div style="margin-bottom: 14px;">
          <h3 style="margin: 0 0 4px 0; font-size: 12.5px; text-transform: uppercase; font-weight: 800; color: #1e293b; letter-spacing: 0.6px; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">Key Projects & Technical Implementations</h3>
          <p style="margin: 0; font-size: 12.5px; color: #334155; white-space: pre-line; line-height: 1.55;">${projects}</p>
        </div>

        <div>
          <h3 style="margin: 0 0 4px 0; font-size: 12.5px; text-transform: uppercase; font-weight: 800; color: #1e293b; letter-spacing: 0.6px; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">Certifications & Honors</h3>
          <p style="margin: 0; font-size: 12px; color: #475569;">${certifications}</p>
        </div>

        <div style="margin-top: 24px; padding-top: 8px; border-top: 1px dashed #cbd5e1; font-size: 10px; color: #94a3b8; display: flex; justify-content: space-between;">
          <span>Verified Student Portfolio • ATS Standard Compliant</span>
          <span>CareerSarthi Global Suite</span>
        </div>
      </div>
    `
    setResumeHtml(html)
  }

  // Handle PDF Download
  async function handleDownloadPdf() {
    setIsGeneratingPdf(true)
    const payload = {
      name,
      role,
      email,
      phone,
      location,
      degree,
      university,
      gradYear,
      cgpa,
      summary,
      skills: skills.split(',').map(s => s.trim()).filter(Boolean),
      projects,
      certifications
    }
    try {
      const res = await axios.post('http://localhost:4000/api/resume/pdf', payload, { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${(name || 'Resume').replace(/\s+/g, '_')}_ATS_Standard.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      showToast('🎉 Vector PDF generated successfully!')
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
    const polished = `Results-driven and ambitious ${degree ? 'Computer Science student' : 'Software Engineer'} specializing in modern full-stack development, ${skills.split(',')[0] || 'React'}, and scalable RESTful architectures. Proven track record of developing reliable web services, solving complex algorithmic challenges, and adhering to industry clean-code standards.`
    setSummary(polished)
    showToast('✨ AI Summary Polished!')
  }

  // JSON Export
  const handleExportJson = () => {
    const data = {
      name, role, email, phone, location, linkedin, degree, university, gradYear, cgpa, summary, skills, projects, certifications
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${name.replace(/\s+/g, '_')}_career_profile.json`
    a.click()
    showToast('💾 Profile JSON Exported!')
  }

  // JSON Import Trigger
  const handleImportJson = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const d = JSON.parse(event.target.result)
        if (d.name) setName(d.name)
        if (d.role) setRole(d.role)
        if (d.email) setEmail(d.email)
        if (d.phone) setPhone(d.phone)
        if (d.location) setLocation(d.location)
        if (d.degree) setDegree(d.degree)
        if (d.university) setUniversity(d.university)
        if (d.summary) setSummary(d.summary)
        if (d.skills) setSkills(d.skills)
        if (d.projects) setProjects(d.projects)
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
      showToast('Removed from saved jobs')
    } else {
      setSavedJobIds([...savedJobIds, id])
      showToast('Saved to your career board!')
    }
  }

  // Filtered Jobs
  const filteredJobs = jobsList.filter(job => {
    const matchQuery = !jobSearchQuery || 
      job.title.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
      job.tags.some(t => t.toLowerCase().includes(jobSearchQuery.toLowerCase()))
    const matchLocation = jobFilterLocation === 'all' || 
      (jobFilterLocation === 'remote' && job.location.toLowerCase().includes('remote')) ||
      (jobFilterLocation === 'india' && (job.location.includes('Pune') || job.location.includes('Mumbai') || job.location.includes('Bengaluru')))
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
                  {t.brandBadge}
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
                  <option value="INR" className="bg-slate-900 text-slate-100">₹ INR</option>
                  <option value="USD" className="bg-slate-900 text-slate-100">$ USD</option>
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
                <span className="hidden md:inline">GitHub Sync</span>
              </a>
            </div>
          </div>

          {/* MAIN HORIZONTAL NAVIGATION TABS */}
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

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

        {/* ============================================================ */}
        {/* VIEW 1: DASHBOARD / OVERVIEW */}
        {/* ============================================================ */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Hero Welcome Banner */}
            <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-extrabold mb-3">
                  <Zap className="w-3.5 h-3.5" /> All-in-One Career Command Center
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

            {/* Quick Metrics & Tool Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* ATS Metric */}
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

              {/* Saved Jobs */}
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
                  {savedJobIds.length} <span className="text-xs font-bold text-slate-400">Roles Saved</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">Active student internships in radar</p>
              </div>

              {/* Freelance Ready */}
              <div 
                onClick={() => setActiveTab('freelance')}
                className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-6 shadow-xl cursor-pointer transition group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Freelance Studio</span>
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-emerald-400">
                  {currency === 'INR' ? '₹18,000+' : '$350+'}
                </div>
                <p className="text-xs text-slate-400 mt-2">Estimated student monthly side-income</p>
              </div>

              {/* Interview Prep */}
              <div 
                onClick={() => setActiveTab('roadmaps')}
                className="bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 rounded-3xl p-6 shadow-xl cursor-pointer transition group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Interview Prep</span>
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition">
                    <Rocket className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-purple-400">
                  50+ QA
                </div>
                <p className="text-xs text-slate-400 mt-2">Flashcards for React, DSA & Node</p>
              </div>

            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 2: ATS RESUME STUDIO */}
        {/* ============================================================ */}
        {activeTab === 'resume' && (
          <div className="space-y-6">
            
            {/* Header Toolbar */}
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

            {/* Split Screen Editor & Live Paper */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Form Builder with Sub-tabs */}
              <div className="lg:col-span-6 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl">
                  
                  {/* Step Tabs */}
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-5 overflow-x-auto scrollbar-none">
                    {[
                      { key: 'personal', label: t.resume.personalTab },
                      { key: 'education', label: t.resume.educationTab },
                      { key: 'skills', label: t.resume.skillsTab },
                      { key: 'experience', label: t.resume.experienceTab }
                    ].map(({ key, label }) => (
                      <button
                        key={key}
                        onClick={() => setResumeSubTab(key)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                          resumeSubTab === key
                            ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* SUBTAB 1: PERSONAL */}
                  {resumeSubTab === 'personal' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">{t.resume.fullName}</label>
                        <input
                          type="text"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 transition"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Vinayak S."
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">{t.resume.targetRole}</label>
                        <input
                          type="text"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 transition"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          placeholder="e.g. Full Stack Developer"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">{t.resume.email}</label>
                          <input
                            type="email"
                            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 transition"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">{t.resume.phone}</label>
                          <input
                            type="text"
                            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 transition"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">{t.resume.location}</label>
                          <input
                            type="text"
                            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 transition"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">{t.resume.linkedin}</label>
                          <input
                            type="text"
                            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 transition"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SUBTAB 2: EDUCATION */}
                  {resumeSubTab === 'education' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">{t.resume.degree}</label>
                        <input
                          type="text"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 transition"
                          value={degree}
                          onChange={(e) => setDegree(e.target.value)}
                          placeholder="e.g. B.Tech Computer Science"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">{t.resume.university}</label>
                        <input
                          type="text"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 transition"
                          value={university}
                          onChange={(e) => setUniversity(e.target.value)}
                          placeholder="e.g. Government College of Engineering"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">{t.resume.gradYear}</label>
                          <input
                            type="text"
                            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 transition"
                            value={gradYear}
                            onChange={(e) => setGradYear(e.target.value)}
                            placeholder="2022 - 2026"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">{t.resume.cgpa}</label>
                          <input
                            type="text"
                            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 transition"
                            value={cgpa}
                            onChange={(e) => setCgpa(e.target.value)}
                            placeholder="8.85 / 10.0 CGPA"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SUBTAB 3: SKILLS & SUMMARY */}
                  {resumeSubTab === 'skills' && (
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">{t.resume.summary}</label>
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
                          value={summary}
                          onChange={(e) => setSummary(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">{t.resume.skillsLabel}</label>
                        <input
                          type="text"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 transition"
                          value={skills}
                          onChange={(e) => setSkills(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {/* SUBTAB 4: PROJECTS & CERTS */}
                  {resumeSubTab === 'experience' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">{t.resume.projectsLabel}</label>
                        <textarea
                          rows={4}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 transition leading-relaxed"
                          value={projects}
                          onChange={(e) => setProjects(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">{t.resume.certificationsLabel}</label>
                        <input
                          type="text"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 transition"
                          value={certifications}
                          onChange={(e) => setCertifications(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
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

                {/* Real-time ATS Checklist */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      {t.resume.atsAnalysisTitle}
                    </h4>
                    <span className={`text-xs font-extrabold ${atsScore >= 75 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {atsScore} / 100
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{t.resume.metricContact}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{t.resume.metricSummary}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{t.resume.metricSkills}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{t.resume.metricProjects}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Live A4 White Sheet */}
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
        {/* VIEW 3: COLD EMAIL & COVER LETTER AI */}
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
              {/* Form Input */}
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
                    placeholder="e.g. Microsoft / Innovaccer"
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
                    placeholder="e.g. Software Engineering Intern"
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
                    placeholder="e.g. Technical Recruiter / CTO"
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
                    placeholder="e.g. React & Node.js Full Stack"
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

              {/* Output Display */}
              <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-800">
                    <span className="font-bold text-sm text-slate-200">{t.emailTool.previewTitle}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedColdEmail)
                        showToast('📋 Outreach Email Copied!')
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

              {/* Search & Location Filter Bar */}
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
                  <option value="india">India (Pune / Mumbai / Bengaluru)</option>
                </select>
              </div>

              {/* Trending Filter Pills */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-400 font-bold mr-1">{t.jobs.trending}</span>
                {['React', 'Full Stack', 'Node.js', 'Python', 'Remote', 'Fresher'].map((tg) => (
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

            {/* Job Grid */}
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
                        <span>Apply on Platform</span>
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
        {/* VIEW 5: FREELANCE & INVOICING */}
        {/* ============================================================ */}
        {activeTab === 'freelance' && (
          <div className="space-y-8">
            
            {/* Header */}
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

            {/* Hourly Rate & Monthly Earnings Calculator */}
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
                      <span className="text-cyan-400">{currency === 'INR' ? `₹${calcRate}` : `$${calcRate}`} / hr</span>
                    </div>
                    <input
                      type="range"
                      min={currency === 'INR' ? 400 : 15}
                      max={currency === 'INR' ? 3000 : 100}
                      step={currency === 'INR' ? 100 : 5}
                      value={calcRate}
                      onChange={(e) => setCalcRate(Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>

                  <div className="pt-4 border-t border-slate-800 bg-slate-950 p-4 rounded-2xl flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">{t.freelance.projectedMonthly}</span>
                    <span className="text-2xl font-black text-emerald-400">
                      {currency === 'INR' ? `₹${(calcHours * calcRate * 4).toLocaleString('en-IN')}` : `$${calcHours * calcRate * 4}`}
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
                      <option value="react">React & Tailwind Web UI</option>
                      <option value="pdf">Automated PDF Generator API</option>
                      <option value="figma">Figma to Responsive Code</option>
                    </select>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed max-h-[160px] overflow-y-auto">
                    {proposalService === 'react' && `Hi [Client],\n\nI noticed you need a responsive, high-speed React web application. I specialize in React, Vite, Tailwind CSS, and REST API integrations.\n\nI can deliver clean, modular code with 100% responsiveness within 48 hours.\n\nBest regards,\n${name}`}
                    {proposalService === 'pdf' && `Hello [Client],\n\nI can set up a robust automated PDF generation service using Node.js, Express, and Puppeteer with custom A4 formatting.\n\nReady to start immediately.\n\nBest,\n${name}`}
                    {proposalService === 'figma' && `Hi there!\n\nI can convert your Figma designs into pixel-perfect, clean Tailwind React components with zero layout bugs.\n\nWarm regards,\n${name}`}
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`Hi [Client], I specialize in ${proposalService} development. Contact: ${email}`)
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
        {/* VIEW 6: ROADMAPS & INTERVIEW PREP */}
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

            {/* Interview Flashcards Grid */}
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
                          <div className="mt-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed animate-fadeIn">
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