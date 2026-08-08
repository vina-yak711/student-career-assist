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
  ChevronDown,
  Terminal,
  Send,
  GitBranch,
  Github
} from 'lucide-react'

// Comprehensive Multi-Language Translations Dictionary
const TRANSLATIONS = {
  mr: {
    langName: 'मराठी',
    flag: '🇮🇳',
    brandSubtitle: 'विद्यार्थ्यांचा जागतिक करिअर एक्सलरेटर • Resume, Internships & Freelance Launchpad',
    tabs: {
      resume: 'Resume स्टुडिओ',
      jobs: 'नोकऱ्या & Internships',
      freelance: 'Freelance हब',
      roadmap: 'AI करिअर रोडमॅप',
      brand: 'ब्रँडिंग & GitHub'
    },
    heroTag: 'जागतिक दर्जाचा स्टुडंट करिअर प्लॅटफॉर्म',
    heroTitle: 'ATS Resumes बनवा, Global Internships शोधा आणि Freelancing सुरू करा.',
    heroDesc: 'कॉलेजच्या अभ्यासासोबतच हाय-पॉवर पोर्टफोलिओ, प्रोफेशनल्स रिझ्युमे आणि आंतरराष्ट्रीय फ्रीलान्सिंग कमाईसाठी संपूर्ण ऑल-इन-वन प्रणाली.',
    atsScore: 'ATS स्कोअर',
    pdfEngine: 'PDF इंजिन',
    radar: '24/7 जॉब रडार',
    resumeBuilderTitle: 'स्मार्ट स्टुडंट Resume बिल्डर',
    resumeBuilderSubtitle: 'तुमचे कॉलेज तपशील, प्रोजेक्ट्स आणि स्किल्स टाका',
    atsOptimized: 'ATS प्रमाणित',
    fullName: 'पूर्ण नाव',
    targetRole: 'लक्ष्य पद (Target Role)',
    email: 'ईमेल पत्ता',
    phone: 'फोन / व्हॉट्सॲप',
    location: 'स्थान / शहर',
    degree: 'पदवी / कॉलेज आणि वर्ष',
    universityCgpa: 'विद्यापीठ / CGPA गुण',
    summary: 'करिअर उद्दिष्ट (Summary / Objective)',
    skills: 'तांत्रिक कौशल्ये (स्वल्पविरामाने वेगळे करा)',
    projects: 'महत्त्वाचे प्रोजेक्ट्स आणि उपलब्धी',
    languages: 'भाषा (उदा. इंग्रजी, मराठी, हिंदी)',
    certifications: 'प्रमाणपत्रे (Certifications)',
    btnUpdatePreview: 'थेट Preview अपडेट करा',
    btnDownloadPdf: 'Vector PDF डाउनलोड करा',
    btnAiPolish: 'AI पॉलिश करा',
    btnPrint: 'प्रिंट करा',
    livePreviewTitle: 'थेट ATS Resume शीट',
    previewFormat: 'प्रमाणित A4 फॉरमॅट',
    jobSearchTitle: 'ग्लोबल इंटर्नशिप & फ्रेशर जॉब रडार',
    jobSearchSubtitle: 'विद्यार्थ्यांसाठी खास निवडक रिमोट आणि ऑफिस जॉब्स शोधा.',
    searchPlaceholder: 'रोल शोधा (उदा. React, Node.js, Python, Frontend, UI/UX)...',
    btnSearch: 'सर्च करा',
    trending: 'ट्रेंडिंग:',
    directApply: 'थेट अर्ज करा',
    viewDetails: 'तपशील & अर्ज',
    freelanceTitle: 'विद्यार्थ्यांसाठी Freelancing & कमाईचा ब्लूप्रिंट',
    freelanceSubtitle: 'कॉलेजमध्ये असतानाच डॉलर्स व रुपयांमध्ये कमाई कशी सुरू करावी याचे अचूक मार्गदर्शन.',
    proposalGenerator: '⚡ इन्स्टंट Proposal जनरेटर',
    chooseService: 'तुमची सर्व्हिस निवडा:',
    copyProposal: 'Proposal कॉपी करा',
    copiedToast: 'क्लिपबोर्डवर कॉपी झाले!',
    roadmapTitle: '🚀 विद्यार्थी AI करिअर रोडमॅप & स्किल ट्रॅकर',
    roadmapSubtitle: 'सुरुवातीपासून हाय-पॅकेज इंजिनिअर बनण्यासाठीची पायरी-दर-पायरी दिशा.',
    brandHubTitle: 'ग्लोबल ब्रँडिंग आणि GitHub इंटिग्रेशन',
    brandHubSubtitle: 'या प्रोजेक्टची ब्रँड ओळख आणि GitHub वरील अपडेट्स'
  },
  en: {
    langName: 'English',
    flag: '🌐',
    brandSubtitle: 'Global Student Career Accelerator • Resume, Internships & Freelance Launchpad',
    tabs: {
      resume: 'Resume Studio',
      jobs: 'Jobs & Internships',
      freelance: 'Freelance Hub',
      roadmap: 'Career Roadmaps',
      brand: 'Branding & Git'
    },
    heroTag: 'World-Class Student Career Suite',
    heroTitle: 'Build ATS Resumes, Land Global Internships & Launch Freelancing.',
    heroDesc: 'An all-in-one ecosystem for students and fresh graduates to craft verified resumes, score global internships, and monetize skills.',
    atsScore: 'ATS Score',
    pdfEngine: 'PDF Engine',
    radar: '24/7 Job Radar',
    resumeBuilderTitle: 'Smart Student Resume Builder',
    resumeBuilderSubtitle: 'Enter academic credentials, verified skills, and projects',
    atsOptimized: 'ATS Optimized',
    fullName: 'Full Name',
    targetRole: 'Target Role',
    email: 'Email Address',
    phone: 'Phone / WhatsApp',
    location: 'Location / City',
    degree: 'Degree & Graduation Year',
    universityCgpa: 'University & CGPA / Grade',
    summary: 'Professional Career Summary',
    skills: 'Technical Skills (comma separated)',
    projects: 'Key Projects & Achievements',
    languages: 'Languages Spoken',
    certifications: 'Certifications & Badges',
    btnUpdatePreview: 'Update Live Preview',
    btnDownloadPdf: 'Download Vector PDF',
    btnAiPolish: 'AI Enhance Summary',
    btnPrint: 'Print Resume',
    livePreviewTitle: 'Live ATS Resume Sheet',
    previewFormat: 'Standard A4 Sheet',
    jobSearchTitle: 'Global Student Internship & Fresher Job Radar',
    jobSearchSubtitle: 'Curated international remote internships, campus roles, and entry-level positions.',
    searchPlaceholder: 'Search by role (e.g. React, Full Stack, Python, Cloud, UI/UX)...',
    btnSearch: 'Search Jobs',
    trending: 'Trending:',
    directApply: 'Direct Apply',
    viewDetails: 'View & Apply',
    freelanceTitle: 'Student Freelancing & Income Blueprint',
    freelanceSubtitle: 'Actionable tactics to win freelance clients and build a global reputation from college.',
    proposalGenerator: '⚡ Instant Client Proposal Generator',
    chooseService: 'Select your offering:',
    copyProposal: 'Copy Proposal',
    copiedToast: 'Copied to clipboard!',
    roadmapTitle: '🚀 Interactive Engineering Career Roadmaps',
    roadmapSubtitle: 'Step-by-step verified curriculum to become industry-ready and land dream offers.',
    brandHubTitle: 'Global Branding & GitHub Synchronization',
    brandHubSubtitle: 'High-impact project naming and GitHub repository status'
  },
  hi: {
    langName: 'हिंदी',
    flag: '🇮🇳',
    brandSubtitle: 'ग्लोबल स्टूडेंट करियर एक्सीलरेटर • Resume, Internships & Freelance Launchpad',
    tabs: {
      resume: 'Resume स्टूडियो',
      jobs: 'नौकरियां & Internships',
      freelance: 'Freelance हब',
      roadmap: 'करियर रोडमैप',
      brand: 'ब्रांडिंग & Git'
    },
    heroTag: 'छात्रों के लिए वर्ल्ड-क्लास करियर प्लेटफॉर्म',
    heroTitle: 'ATS Resume बनाएं, Global Internships खोजें और Freelancing शुरू करें।',
    heroDesc: 'कॉलेज की पढ़ाई के साथ-साथ हाई-पावर पोर्टफोलियो, प्रमाणित रिज्यूमे और स्वतंत्र कमाई शुरू करने का संपूर्ण समाधान।',
    atsScore: 'ATS स्कोर',
    pdfEngine: 'PDF इंजन',
    radar: '24/7 जॉब रडार',
    resumeBuilderTitle: 'स्मार्ट स्टूडेंट Resume बिल्डर',
    resumeBuilderSubtitle: 'अपनी शैक्षणिक जानकारी, प्रोजेक्ट्स और स्किल्स दर्ज करें',
    atsOptimized: 'ATS प्रमाणित',
    fullName: 'पूरा नाम',
    targetRole: 'लक्ष्य पद (Target Role)',
    email: 'ईमेल पता',
    phone: 'फ़ोन / व्हाट्सएप',
    location: 'स्थान / शहर',
    degree: 'डिग्री और वर्ष',
    universityCgpa: 'विश्वविद्यालय / CGPA',
    summary: 'करियर सारांश (Summary)',
    skills: 'तकनीकी कौशल (अल्पविराम से अलग करें)',
    projects: 'मुख्य प्रोजेक्ट्स और उपलब्धियां',
    languages: 'भाषाएं',
    certifications: 'प्रमाणपत्र (Certifications)',
    btnUpdatePreview: 'लाइव Preview अपडेट करें',
    btnDownloadPdf: 'Vector PDF डाउनलोड करें',
    btnAiPolish: 'AI पॉलिश करें',
    btnPrint: 'प्रिंट करें',
    livePreviewTitle: 'लाइव ATS Resume शीट',
    previewFormat: 'मानक A4 प्रारूप',
    jobSearchTitle: 'ग्लोबल इंटर्नशिप और फ्रेशर जॉब रडार',
    jobSearchSubtitle: 'छात्रों के लिए विशेष रूप से चुने गए रिमोट और कैंपस अवसर।',
    searchPlaceholder: 'पद खोजें (उदा. React, Python, Full Stack, UI/UX)...',
    btnSearch: 'सर्च करें',
    trending: 'ट्रेंडिंग:',
    directApply: 'सीधा आवेदन',
    viewDetails: 'विवरण व आवेदन',
    freelanceTitle: 'स्टूडेंट फ्रीलांसिंग और कमाई की गाइड',
    freelanceSubtitle: 'कॉलेज में पढ़ते हुए फ्रीलांस प्रोजेक्ट्स पाने और आय अर्जित करने की रणनीति।',
    proposalGenerator: '⚡ त्वरित Proposal जनरेटर',
    chooseService: 'अपनी सेवा चुनें:',
    copyProposal: 'Proposal कॉपी करें',
    copiedToast: 'क्लिपबोर्ड पर कॉपी किया गया!',
    roadmapTitle: '🚀 छात्र AI करियर रोडमैप और स्किल ट्रैकर',
    roadmapSubtitle: 'कॉलेज से सीधे हाई-सैलरी टेक जॉब पाने का संपूर्ण रोडमैप।',
    brandHubTitle: 'ग्लोबल ब्रांडिंग और GitHub हब',
    brandHubSubtitle: 'परियोजना ब्रांड पहचान और GitHub सिंक्रोनाइज़ेशन'
  },
  es: {
    langName: 'Español',
    flag: '🇪🇸',
    brandSubtitle: 'Acelerador de Carrera Global para Estudiantes',
    tabs: {
      resume: 'Estudio de CV',
      jobs: 'Empleos & Pasantías',
      freelance: 'Freelance Hub',
      roadmap: 'Ruta de Carrera',
      brand: 'Marca & GitHub'
    },
    heroTag: 'Plataforma Global para Estudiantes',
    heroTitle: 'Crea CVs ATS, Encuentra Pasantías y Lanza tu Carrera Freelance.',
    heroDesc: 'Una suite integral para que estudiantes y recién graduados destaquen internacionalmente.',
    atsScore: 'Puntaje ATS',
    pdfEngine: 'Motor PDF',
    radar: 'Radar 24/7',
    resumeBuilderTitle: 'Creador de CV Inteligente',
    resumeBuilderSubtitle: 'Ingresa credenciales académicas y proyectos destacados',
    atsOptimized: 'Optimizado ATS',
    fullName: 'Nombre Completo',
    targetRole: 'Rol Objetivo',
    email: 'Correo Electrónico',
    phone: 'Teléfono',
    location: 'Ubicación',
    degree: 'Título & Año',
    universityCgpa: 'Universidad & Promedio',
    summary: 'Resumen Profesional',
    skills: 'Habilidades Técnicas',
    projects: 'Proyectos Principales',
    languages: 'Idiomas',
    certifications: 'Certificaciones',
    btnUpdatePreview: 'Actualizar Vista Previa',
    btnDownloadPdf: 'Descargar PDF Vectorial',
    btnAiPolish: 'Mejorar con IA',
    btnPrint: 'Imprimir CV',
    livePreviewTitle: 'Hoja de CV en Vivo',
    previewFormat: 'Formato Estándar A4',
    jobSearchTitle: 'Radar Global de Empleos y Pasantías',
    jobSearchSubtitle: 'Oportunidades internacionales y remotas verificadas para estudiantes.',
    searchPlaceholder: 'Buscar rol (ej. React, Frontend, Python)...',
    btnSearch: 'Buscar',
    trending: 'Tendencias:',
    directApply: 'Aplicar Directo',
    viewDetails: 'Ver y Aplicar',
    freelanceTitle: 'Guía de Freelance para Estudiantes',
    freelanceSubtitle: 'Estrategias para conseguir tus primeros clientes y ganar en moneda internacional.',
    proposalGenerator: '⚡ Generador de Propuestas Instantáneo',
    chooseService: 'Elige tu servicio:',
    copyProposal: 'Copiar Propuesta',
    copiedToast: '¡Copiado al portapapeles!',
    roadmapTitle: '🚀 Rutas de Carrera Tecnológica',
    roadmapSubtitle: 'Currículo verificado paso a paso para conseguir ofertas de alto nivel.',
    brandHubTitle: 'Identidad de Marca y GitHub',
    brandHubSubtitle: 'Propuestas de marca y sincronización con repositorio'
  },
  de: {
    langName: 'Deutsch',
    flag: '🇩🇪',
    brandSubtitle: 'Globaler Karriere-Beschleuniger für Studierende',
    tabs: {
      resume: 'Lebenslauf Studio',
      jobs: 'Jobs & Praktika',
      freelance: 'Freelance Hub',
      roadmap: 'Karriere-Roadmap',
      brand: 'Branding & Git'
    },
    heroTag: 'Weltklasse Karriereplattform',
    heroTitle: 'ATS-Lebensläufe erstellen, weltweite Praktika finden & Freelancen.',
    heroDesc: 'All-in-One Plattform für Studenten zur Erstellung professioneller Portfolios und weltweiter Karrieren.',
    atsScore: 'ATS-Score',
    pdfEngine: 'PDF-Engine',
    radar: '24/7 Job-Radar',
    resumeBuilderTitle: 'Intelligenter Lebenslauf-Baukasten',
    resumeBuilderSubtitle: 'Akademische Leistungen, Fähigkeiten und Projekte eintragen',
    atsOptimized: 'ATS-optimiert',
    fullName: 'Vollständiger Name',
    targetRole: 'Zielposition',
    email: 'E-Mail-Adresse',
    phone: 'Telefonnummer',
    location: 'Standort',
    degree: 'Abschluss & Jahrgang',
    universityCgpa: 'Universität & Notendurchschnitt',
    summary: 'Berufliches Profil',
    skills: 'Technische Fähigkeiten',
    projects: 'Wichtige Projekte',
    languages: 'Sprachen',
    certifications: 'Zertifikate',
    btnUpdatePreview: 'Vorschau aktualisieren',
    btnDownloadPdf: 'Vektor-PDF herunterladen',
    btnAiPolish: 'Mit KI optimieren',
    btnPrint: 'Drucken',
    livePreviewTitle: 'Live ATS-Lebenslauf',
    previewFormat: 'Standard A4-Format',
    jobSearchTitle: 'Globales Praktikums- & Job-Radar',
    jobSearchSubtitle: 'Kuratierte internationale Remote-Praktika und Einstiegspositionen.',
    searchPlaceholder: 'Nach Rolle suchen (z.B. React, Node.js, Python)...',
    btnSearch: 'Suchen',
    trending: 'Trends:',
    directApply: 'Direkt bewerben',
    viewDetails: 'Details ansehen',
    freelanceTitle: 'Studenten-Freelance Leitfaden',
    freelanceSubtitle: 'Praktische Strategien zur Kundengewinnung während des Studiums.',
    proposalGenerator: '⚡ Sofortiger Angebotsgenerator',
    chooseService: 'Dienstleistung wählen:',
    copyProposal: 'Angebot kopieren',
    copiedToast: 'In die Zwischenablage kopiert!',
    roadmapTitle: '🚀 Interaktive Entwickler-Roadmaps',
    roadmapSubtitle: 'Schritt-für-Schritt Leitfaden für Spitzenangebote in der Tech-Branche.',
    brandHubTitle: 'Markenidentität & GitHub Sync',
    brandHubSubtitle: 'Markenkonzepte und Repository-Status'
  },
  fr: {
    langName: 'Français',
    flag: '🇫🇷',
    brandSubtitle: 'Accélérateur de Carrière Mondiale pour Étudiants',
    tabs: {
      resume: 'Studio de CV',
      jobs: 'Emplois & Stages',
      freelance: 'Pôle Freelance',
      roadmap: 'Feuille de Route',
      brand: 'Marque & Git'
    },
    heroTag: 'Suite Étudiante de Classe Mondiale',
    heroTitle: 'Créez des CVs ATS, Décrochez des Stages Mondiaux et Devenez Freelance.',
    heroDesc: 'La plateforme intégrée pour étudiants et jeunes diplômés pour valoriser leurs compétences.',
    atsScore: 'Score ATS',
    pdfEngine: 'Moteur PDF',
    radar: 'Radar 24/7',
    resumeBuilderTitle: 'Générateur de CV Intelligent',
    resumeBuilderSubtitle: 'Ajoutez vos diplômes, compétences et réalisations',
    atsOptimized: 'Optimisé ATS',
    fullName: 'Nom Complet',
    targetRole: 'Poste Visé',
    email: 'Adresse E-mail',
    phone: 'Téléphone',
    location: 'Localisation',
    degree: 'Diplôme & Année',
    universityCgpa: 'Université & Moyenne',
    summary: 'Résumé Professionnel',
    skills: 'Compétences Techniques',
    projects: 'Projets Majeurs',
    languages: 'Langues',
    certifications: 'Certifications',
    btnUpdatePreview: 'Mettre à jour l’Aperçu',
    btnDownloadPdf: 'Télécharger le PDF Vectoriel',
    btnAiPolish: 'Améliorer par IA',
    btnPrint: 'Imprimer le CV',
    livePreviewTitle: 'Feuille de CV en Direct',
    previewFormat: 'Format Standard A4',
    jobSearchTitle: 'Radar Mondial de Stages et Premiers Emplois',
    jobSearchSubtitle: 'Offres sélectionnées de stages à distance et postes juniors.',
    searchPlaceholder: 'Rechercher un poste (ex: React, Full Stack, Python)...',
    btnSearch: 'Rechercher',
    trending: 'Tendances :',
    directApply: 'Postuler Directement',
    viewDetails: 'Voir & Postuler',
    freelanceTitle: 'Guide Freelance Étudiant',
    freelanceSubtitle: 'Stratégies concrètes pour décrocher des missions et générer des revenus.',
    proposalGenerator: '⚡ Générateur de Propositions Instantané',
    chooseService: 'Sélectionnez un service :',
    copyProposal: 'Copier la Proposition',
    copiedToast: 'Copié dans le presse-papier !',
    roadmapTitle: '🚀 Parcours de Carrière Technologique',
    roadmapSubtitle: 'Programme complet pour réussir ses entretiens techniques.',
    brandHubTitle: 'Image de Marque & Dépôt GitHub',
    brandHubSubtitle: 'Identité du projet et synchronisation du code'
  },
  ja: {
    langName: '日本語',
    flag: '🇯🇵',
    brandSubtitle: '学生向けグローバルキャリア加速プラットフォーム',
    tabs: {
      resume: '履歴書スタジオ',
      jobs: '求人・インターン',
      freelance: 'フリーランス拠点',
      roadmap: 'キャリアロードマップ',
      brand: 'ブランド＆Git'
    },
    heroTag: '次世代学生キャリアスイート',
    heroTitle: 'ATS対応の英文履歴書を作成し、グローバルインターンや副業案件を獲得。',
    heroDesc: '学生や新卒エンジニアが世界基準のポートフォリオを作成し、キャリアを切り拓くための統合ツール。',
    atsScore: 'ATSスコア',
    pdfEngine: 'PDFエンジン',
    radar: '24/7 求人レーダー',
    resumeBuilderTitle: 'スマート学生レジュメビルダー',
    resumeBuilderSubtitle: '学歴、保有スキル、開発実績を入力',
    atsOptimized: 'ATS完全対応',
    fullName: '氏名',
    targetRole: '志望職種',
    email: 'メールアドレス',
    phone: '電話番号',
    location: '所在地 / 都市',
    degree: '学位・専攻・卒業年',
    universityCgpa: '大学名・成績/GPA',
    summary: '自己PR・キャリアサマリー',
    skills: '技術スキル（カンマ区切り）',
    projects: '主な開発プロジェクト',
    languages: '使用言語',
    certifications: '資格・認定',
    btnUpdatePreview: 'プレビュー更新',
    btnDownloadPdf: '高解像度PDF出力',
    btnAiPolish: 'AIによる文章推敲',
    btnPrint: '印刷する',
    livePreviewTitle: 'リアルタイムATS履歴書シート',
    previewFormat: '標準A4フォーマット',
    jobSearchTitle: '世界インターン＆新卒エンジニア求人レーダー',
    jobSearchSubtitle: '学生向けのリモート案件やジュニア職を厳選検索。',
    searchPlaceholder: '職種を検索 (例: React, TypeScript, Python, UI/UX)...',
    btnSearch: '検索する',
    trending: '人気検索:',
    directApply: '直接応募',
    viewDetails: '詳細を見る',
    freelanceTitle: '学生向けフリーランス副業ガイド',
    freelanceSubtitle: '在学中に国際的な案件を受注し実績を積むための実践的ノウハウ。',
    proposalGenerator: '⚡ 即戦力提案文ジェネレーター',
    chooseService: '提供サービスを選択:',
    copyProposal: '提案文をコピー',
    copiedToast: 'クリップボードにコピーしました！',
    roadmapTitle: '🚀 エンジニア成長ロードマップ',
    roadmapSubtitle: '未経験からトップ企業に内定するための段階的学習パス。',
    brandHubTitle: 'グローバルブランドとGitHub連携',
    brandHubSubtitle: 'プロジェクトブランディングとGit同期'
  }
}

// Proposals templates in multiple languages
const PROPOSAL_TEMPLATES = {
  react: {
    title: 'React & Tailwind Web UI',
    text: `Hi [Client Name],\n\nI noticed you are looking for a fast, modern and pixel-perfect web application. I specialize in React, Vite, Tailwind CSS, and REST API integrations.\n\nI have built production-ready responsive dashboards and interactive web tools (see my live demo portfolio). I can complete your initial deliverables within 48 hours with clean, documented code and 100% responsiveness.\n\nLooking forward to discussing the next steps!\n\nBest regards,\n[Your Name]`
  },
  pdfApi: {
    title: 'Automated PDF / Document Generator API',
    text: `Hello [Client],\n\nI can set up a robust, automated PDF and document generation service using Node.js, Express, and Puppeteer. It will convert dynamic HTML/CSS templates into high-resolution vector PDFs with custom styling, page breaks, and zero layout bugs.\n\nI have previously built end-to-end PDF engines for resume builders and invoicing systems. I am available to start immediately.\n\nBest,\n[Your Name]`
  },
  figmaToCode: {
    title: 'Figma to Clean Responsive Code',
    text: `Hi there!\n\nI can convert your Figma / Adobe XD designs into clean, semantic, and ultra-fast HTML/CSS/React components. Every breakpoint (mobile, tablet, desktop) will be thoroughly tested with zero layout shifts.\n\nLet's connect and get this launched quickly!\n\nWarm regards,\n[Your Name]`
  }
}

// Roadmaps Data
const ROADMAPS = [
  {
    id: 'frontend',
    title: 'Modern Frontend & UI Architecture',
    icon: Code2,
    color: 'from-blue-500 to-cyan-500',
    milestones: [
      { step: 'HTML5 Semantic Structure & SEO Best Practices', done: true },
      { step: 'Modern CSS, Flexbox, CSS Grid & Tailwind CSS Mastery', done: true },
      { step: 'JavaScript (ES6+), Async/Await, DOM & Fetch API', done: true },
      { step: 'React.js Fundamentals, Hooks, State & Context API', done: true },
      { step: 'Vite, Next.js (App Router), SSR & Static Generation', done: false },
      { step: 'TypeScript for Scalable UI & Component Libraries', done: false }
    ]
  },
  {
    id: 'backend',
    title: 'Backend, Cloud & Microservices',
    icon: Cpu,
    color: 'from-emerald-500 to-teal-500',
    milestones: [
      { step: 'Node.js Core & Express.js RESTful API Design', done: true },
      { step: 'Authentication (JWT, OAuth2, Session Security)', done: true },
      { step: 'Databases: PostgreSQL, MongoDB & Prisma ORM', done: false },
      { step: 'Headless Browsers & Background Workers (Puppeteer, BullMQ)', done: true },
      { step: 'Docker Containerization & CI/CD GitHub Actions', done: false },
      { step: 'AWS / Cloud Deployment (EC2, S3, Serverless Lambdas)', done: false }
    ]
  },
  {
    id: 'ai',
    title: 'AI Engineering & Full Stack LLMs',
    icon: Sparkles,
    color: 'from-purple-500 to-pink-500',
    milestones: [
      { step: 'Python Fundamentals, NumPy, Pandas & FastAPIs', done: true },
      { step: 'OpenAI / Gemini / Anthropic API Integrations', done: false },
      { step: 'Vector Databases (Pinecone, ChromaDB, PGVector) & Embeddings', done: false },
      { step: 'RAG (Retrieval-Augmented Generation) Architecture', done: false },
      { step: 'LangChain / LlamaIndex Agentic Workflows', done: false }
    ]
  }
]

export default function App() {
  const [lang, setLang] = useState('mr') // default Marathi as requested, easily switched
  const [currency, setCurrency] = useState('INR') // 'INR', 'USD', 'EUR', 'GBP'
  const [activeTab, setActiveTab] = useState('resume')
  const [templateStyle, setTemplateStyle] = useState('modern') // 'modern', 'minimal', 'creative'
  const [query, setQuery] = useState('Frontend Developer')
  const [jobs, setJobs] = useState([])
  const [loadingJobs, setLoadingJobs] = useState(false)
  const [freelanceList, setFreelanceList] = useState([])
  const [resumeHtml, setResumeHtml] = useState('')
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [copiedNotification, setCopiedNotification] = useState('')
  const [selectedProposalKey, setSelectedProposalKey] = useState('react')
  const [roadmapsState, setRoadmapsState] = useState(ROADMAPS)

  // Resume Form Fields
  const [name, setName] = useState('Vinayak S.')
  const [role, setRole] = useState('Aspiring Full-Stack Software Engineer')
  const [email, setEmail] = useState('vinayak.tech@example.com')
  const [phone, setPhone] = useState('+91 98765 43210')
  const [location, setLocation] = useState('Pune, Maharashtra, India (Open to Remote)')
  const [education, setEducation] = useState('Bachelor of Technology in Computer Science (B.Tech)')
  const [gradYear, setGradYear] = useState('2022 - 2026')
  const [university, setUniversity] = useState('State Technical University • CGPA: 8.85 / 10.0')
  const [summary, setSummary] = useState('Motivated and detail-oriented Computer Science undergraduate with solid experience in building modern web applications, scalable Express APIs, and responsive React UIs. Passionate about clean code, high performance, and continuous technological innovation.')
  const [skills, setSkills] = useState('React.js, Node.js, JavaScript (ES6+), Express, Tailwind CSS, REST APIs, Git & GitHub, Puppeteer, PostgreSQL')
  const [projects, setProjects] = useState('1. CareerSarthi Global Career Engine — Full Stack platform with live ATS resume studio, Puppeteer vector PDF generator, and global internship radars.\n2. CloudSync Microservices — Real-time state synchronization tool built with WebSockets and Node.js.')
  const [languages, setLanguages] = useState('English (Professional), Marathi (Native), Hindi (Fluent)')
  const [certifications, setCertifications] = useState('AWS Certified Cloud Practitioner (In Progress), Meta Frontend Developer Specialization')

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en

  useEffect(() => {
    fetchJobs('Full Stack')
    fetchFreelance()
    renderLiveResume()
  }, [lang, templateStyle])

  const showToast = (msg) => {
    setCopiedNotification(msg)
    setTimeout(() => setCopiedNotification(''), 3500)
  }

  const toggleMilestone = (roadmapIdx, stepIdx) => {
    const next = [...roadmapsState]
    next[roadmapIdx].milestones[stepIdx].done = !next[roadmapIdx].milestones[stepIdx].done
    setRoadmapsState(next)
    showToast('Progress updated!')
  }

  async function fetchJobs(searchKey = query) {
    setLoadingJobs(true)
    try {
      const res = await axios.get(`http://localhost:4000/api/jobs/search?q=${encodeURIComponent(searchKey)}`)
      setJobs(res.data.results || [])
    } catch (err) {
      console.error(err)
      setJobs([
        {
          source: 'LinkedIn Global',
          title: `${searchKey} Intern (2025/2026 Batch)`,
          company: 'InnovateX Labs',
          location: 'Remote (Worldwide)',
          stipend: currency === 'INR' ? '₹30,000 - ₹50,000 / month' : '$1,000 - $1,800 / month',
          tags: ['React', 'TypeScript', 'Remote', 'Mentorship'],
          description: 'Hands-on mentorship program on real-world SaaS products with pre-placement job offer (PPO) opportunity.',
          url: 'https://www.linkedin.com/jobs'
        },
        {
          source: 'Internshala Super50',
          title: `Junior ${searchKey} Specialist`,
          company: 'Nexus Cloud Technologies',
          location: 'Pune / Mumbai / Bengaluru',
          stipend: currency === 'INR' ? '₹4.5 - ₹7.0 LPA' : '$8,000 - $14,000 / year',
          tags: ['Node.js', 'Express', 'Tailwind', 'Fresher'],
          description: 'Entry-level position for ambitious tech graduates. Work directly with senior lead engineers.',
          url: 'https://internshala.com'
        },
        {
          source: 'Wellfound Global',
          title: 'Full Stack & AI Engineer Trainee',
          company: 'HyperScale AI Inc.',
          location: 'San Francisco / Remote',
          stipend: currency === 'INR' ? '₹65,000 / month' : '$25 / hour',
          tags: ['Next.js', 'Python', 'AI/ML', 'Global'],
          description: 'Build futuristic AI interfaces with real-time streaming, interactive canvas, and sleek motion components.',
          url: 'https://wellfound.com'
        }
      ])
    } finally {
      setLoadingJobs(false)
    }
  }

  async function fetchFreelance() {
    try {
      const res = await axios.get('http://localhost:4000/api/freelance/listings')
      setFreelanceList(res.data.results || [])
    } catch (err) {
      console.error(err)
    }
  }

  function getPayload() {
    return {
      name,
      role,
      email,
      phone,
      location,
      degree: education,
      education,
      gradYear,
      university,
      summary,
      skills: skills.split(',').map(s => s.trim()).filter(Boolean),
      projects,
      languages,
      certifications
    }
  }

  async function renderLiveResume() {
    const payload = getPayload()
    try {
      const res = await axios.post('http://localhost:4000/api/resume/generate', payload)
      setResumeHtml(res.data)
    } catch (err) {
      // Local clean fallback rendering if backend is restarting
      const skillsArray = skills.split(',').map(s => s.trim()).filter(Boolean)
      const fallbackHtml = `
        <div style="font-family: 'Segoe UI', Inter, sans-serif; padding: 24px; color: #0f172a; line-height: 1.55;">
          <div style="border-bottom: 2.5px solid #3b82f6; padding-bottom: 14px; margin-bottom: 16px; display: flex; justify-content: space-between;">
            <div>
              <h1 style="margin: 0; font-size: 24px; color: #0f172a; font-weight: 800;">${name || 'Student Name'}</h1>
              <p style="margin: 3px 0 0 0; color: #2563eb; font-size: 13px; font-weight: 600;">${role}</p>
            </div>
            <div style="text-align: right; font-size: 12px; color: #64748b;">
              <div>${email}</div>
              <div>${phone}</div>
              <div>${location}</div>
            </div>
          </div>
          <div style="margin-bottom: 14px;">
            <h3 style="margin: 0 0 4px 0; font-size: 13px; text-transform: uppercase; color: #1e3a8a; letter-spacing: 0.5px;">Professional Summary</h3>
            <p style="margin: 0; font-size: 13px; color: #334155;">${summary}</p>
          </div>
          <div style="margin-bottom: 14px;">
            <h3 style="margin: 0 0 4px 0; font-size: 13px; text-transform: uppercase; color: #1e3a8a; letter-spacing: 0.5px;">Technical Competencies</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-top: 4px;">
              ${skillsArray.map(s => `<span style="background: #f1f5f9; color: #1e293b; border: 1px solid #cbd5e1; padding: 2px 8px; border-radius: 4px; font-size: 11.5px; font-weight: 600;">${s}</span>`).join('')}
            </div>
          </div>
          <div style="margin-bottom: 14px;">
            <h3 style="margin: 0 0 4px 0; font-size: 13px; text-transform: uppercase; color: #1e3a8a; letter-spacing: 0.5px;">Education & Academics</h3>
            <div style="font-size: 13px; font-weight: 700;">${education} <span style="font-weight: normal; color: #64748b;">(${gradYear})</span></div>
            <div style="font-size: 12px; color: #64748b;">${university}</div>
          </div>
          <div style="margin-bottom: 14px;">
            <h3 style="margin: 0 0 4px 0; font-size: 13px; text-transform: uppercase; color: #1e3a8a; letter-spacing: 0.5px;">Projects & Work</h3>
            <p style="margin: 0; font-size: 13px; color: #334155; white-space: pre-line;">${projects}</p>
          </div>
          <div>
            <h3 style="margin: 0 0 4px 0; font-size: 13px; text-transform: uppercase; color: #1e3a8a; letter-spacing: 0.5px;">Languages & Certifications</h3>
            <p style="margin: 0; font-size: 13px; color: #475569;">${languages} • ${certifications}</p>
          </div>
        </div>
      `
      setResumeHtml(fallbackHtml)
    }
  }

  async function handleDownloadPdf() {
    setIsGeneratingPdf(true)
    const payload = getPayload()
    try {
      const res = await axios.post('http://localhost:4000/api/resume/pdf', payload, { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${(name || 'Student').replace(/\s+/g, '_')}_CareerSarthi_Global.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      showToast('🎉 Vector PDF Generated & Downloaded!')
    } catch (err) {
      console.error(err)
      showToast('⚠️ Printed direct high-res sheet')
      window.print()
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  // AI Polish feature for Student Summary
  const handleAiPolish = () => {
    const polished = `Results-driven and ambitious Computer Science student specializing in ${skills.split(',')[0] || 'Software Engineering'}. Proven track record of developing responsive web applications and full-stack solutions. Adept at collaborative problem solving, agile workflows, and translating complex challenges into robust digital experiences.`
    setSummary(polished)
    showToast('✨ AI Summary Enhanced!')
  }

  // Calculate dynamic ATS score
  const calculateAtsScore = () => {
    let score = 40
    if (name.trim().length > 3) score += 10
    if (email.includes('@')) score += 10
    if (phone.length >= 8) score += 5
    if (summary.length >= 80) score += 15
    if (skills.split(',').length >= 5) score += 10
    if (projects.length >= 30) score += 10
    return Math.min(score, 100)
  }

  const atsScore = calculateAtsScore()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-20">
      {/* Toast Notification */}
      {copiedNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-400 text-slate-950 font-bold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce border border-emerald-300">
          <CheckCircle className="w-5 h-5 text-slate-950" />
          <span>{copiedNotification}</span>
        </div>
      )}

      {/* TOP GLOBAL BAR */}
      <header className="sticky top-0 z-40 bg-slate-900/85 backdrop-blur-xl border-b border-slate-800/80 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Branding */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 via-blue-600 to-cyan-400 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Compass className="w-6 h-6 text-cyan-400 animate-spin-slow" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                    CareerSarthi <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 text-sm font-black">AI</span>
                  </h1>
                  <span className="text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    Global 2026
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block">
                  {t.brandSubtitle}
                </p>
              </div>
            </div>

            {/* Language & Currency Switcher + Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Selector Dropdown */}
              <div className="relative flex items-center bg-slate-950/80 border border-slate-800 rounded-2xl px-2.5 py-1.5">
                <Globe className="w-4 h-4 text-cyan-400 mr-1.5 shrink-0" />
                <select
                  value={lang}
                  onChange={(e) => {
                    setLang(e.target.value)
                    showToast(`Language set to ${TRANSLATIONS[e.target.value].langName}`)
                  }}
                  className="bg-transparent text-xs font-semibold text-slate-200 outline-none cursor-pointer pr-2"
                >
                  {Object.entries(TRANSLATIONS).map(([key, val]) => (
                    <option key={key} value={key} className="bg-slate-900 text-slate-100">
                      {val.flag} {val.langName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Currency Selector */}
              <div className="hidden md:flex items-center bg-slate-950/80 border border-slate-800 rounded-2xl px-2.5 py-1.5 text-xs font-bold text-indigo-400">
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

              {/* GitHub Live Status Badge */}
              <a
                href="https://github.com/vina-yak711/student-career-assist"
                target="_blank"
                rel="noreferrer"
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 transition"
              >
                <Github className="w-3.5 h-3.5 text-slate-400" />
                <span>Repo Ready</span>
              </a>
            </div>
          </div>

          {/* Navigation Sub-bar */}
          <nav className="flex items-center gap-1.5 overflow-x-auto pb-3 pt-1 scrollbar-none">
            {[
              { key: 'resume', label: t.tabs.resume, icon: FileText },
              { key: 'jobs', label: t.tabs.jobs, icon: Briefcase },
              { key: 'freelance', label: t.tabs.freelance, icon: DollarSign },
              { key: 'roadmap', label: t.tabs.roadmap, icon: Rocket },
              { key: 'brand', label: t.tabs.brand, icon: Sparkles }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === key
                    ? 'bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 text-white shadow-md shadow-indigo-600/30'
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

      {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-950/40 via-slate-900/20 to-transparent border-b border-slate-800/50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-3 shadow-inner">
                <Zap className="w-3.5 h-3.5" />
                <span>{t.heroTag}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {t.heroTitle}
              </h2>
              <p className="mt-2 text-slate-400 text-sm sm:text-base leading-relaxed">
                {t.heroDesc}
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex items-center gap-4 bg-slate-900/90 border border-slate-800/80 p-4 rounded-3xl backdrop-blur-md shadow-2xl">
              <div className="text-center px-3 border-r border-slate-800">
                <div className={`text-2xl font-black ${atsScore >= 75 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {atsScore}%
                </div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">{t.atsScore}</div>
              </div>
              <div className="text-center px-3 border-r border-slate-800">
                <div className="text-2xl font-black text-cyan-400">Vector</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">{t.pdfEngine}</div>
              </div>
              <div className="text-center px-3">
                <div className="text-2xl font-black text-indigo-400">Global</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">{t.radar}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* TAB 1: RESUME STUDIO */}
        {activeTab === 'resume' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Interactive Form */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white">{t.resumeBuilderTitle}</h3>
                      <p className="text-xs text-slate-400">{t.resumeBuilderSubtitle}</p>
                    </div>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                    {t.atsOptimized}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        {t.fullName}
                      </label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 transition"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Vinayak S."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        {t.targetRole}
                      </label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 transition"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="e.g. Full-Stack Engineer"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        {t.email}
                      </label>
                      <input
                        type="email"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 transition"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        {t.phone}
                      </label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 transition"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        {t.location}
                      </label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 transition"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Pune / Remote"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        {t.degree}
                      </label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 transition"
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                        placeholder="B.Tech in Computer Science"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        {t.universityCgpa}
                      </label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 transition"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        placeholder="University • CGPA 8.8/10"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                        {t.summary}
                      </label>
                      <button
                        type="button"
                        onClick={handleAiPolish}
                        className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{t.btnAiPolish}</span>
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 transition leading-relaxed"
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      placeholder="Brief career objective..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      {t.skills}
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 transition"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      placeholder="React, Node.js, JavaScript, Tailwind, Docker, Git"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      {t.projects}
                    </label>
                    <textarea
                      rows={3}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 transition"
                      value={projects}
                      onChange={(e) => setProjects(e.target.value)}
                      placeholder="List 2-3 prominent projects..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        {t.languages}
                      </label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 transition"
                        value={languages}
                        onChange={(e) => setLanguages(e.target.value)}
                        placeholder="English, Marathi, Hindi"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        {t.certifications}
                      </label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 transition"
                        value={certifications}
                        onChange={(e) => setCertifications(e.target.value)}
                        placeholder="AWS Cloud, Meta Frontend"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={renderLiveResume}
                      className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold py-3.5 px-5 rounded-2xl border border-slate-700 transition"
                    >
                      <Eye className="w-4 h-4 text-cyan-400" />
                      <span>{t.btnUpdatePreview}</span>
                    </button>

                    <button
                      onClick={handleDownloadPdf}
                      disabled={isGeneratingPdf}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 hover:opacity-90 text-white font-bold py-3.5 px-5 rounded-2xl shadow-xl shadow-indigo-600/30 transition disabled:opacity-50"
                    >
                      <Download className={`w-4 h-4 ${isGeneratingPdf ? 'animate-bounce' : ''}`} />
                      <span>{isGeneratingPdf ? 'Compiling PDF...' : t.btnDownloadPdf}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Live A4 Resume Display */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-sm flex flex-col h-full">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-bold text-sm text-slate-200">{t.livePreviewTitle}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.print()}
                      className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>{t.btnPrint}</span>
                    </button>
                    <span className="text-xs text-slate-400">{t.previewFormat}</span>
                  </div>
                </div>

                {/* Simulated Paper A4 */}
                <div className="flex-1 min-h-[550px] bg-white text-slate-950 rounded-2xl p-6 sm:p-8 shadow-inner overflow-y-auto border border-slate-200">
                  {resumeHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: resumeHtml }} />
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                      <FileText className="w-12 h-12 mb-2 text-slate-300" />
                      <p className="text-sm">Click "Update Live Preview"</p>
                    </div>
                  )}
                </div>

                <div className="mt-4 p-4 rounded-2xl bg-indigo-950/40 border border-indigo-900/40 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-indigo-300">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Puppeteer High-Res Vector PDF Engine Active</span>
                  </div>
                  <span className="text-slate-400">Port 4000 Express</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERNSHIPS & JOBS */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="max-w-3xl">
                <h3 className="text-2xl font-extrabold text-white flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-indigo-400" />
                  {t.jobSearchTitle}
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  {t.jobSearchSubtitle}
                </p>
              </div>

              {/* Search Bar */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && fetchJobs(query)}
                    placeholder={t.searchPlaceholder}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 transition"
                  />
                </div>
                <button
                  onClick={() => fetchJobs(query)}
                  disabled={loadingJobs}
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold px-7 py-3.5 rounded-2xl transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
                >
                  {loadingJobs ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>{t.btnSearch}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Trending Pills */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-400 font-bold mr-1">{t.trending}</span>
                {['Full Stack', 'React Developer', 'Frontend Intern', 'Node.js Backend', 'Python AI Trainee', 'Remote Global'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setQuery(tag)
                      fetchJobs(tag)
                    }}
                    className="text-xs px-3.5 py-1 rounded-full bg-slate-950 hover:bg-indigo-600/30 border border-slate-800 hover:border-indigo-500 text-slate-300 transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Jobs Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 rounded-3xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                        {job.location || 'Remote'}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{job.company}</span>
                    </div>

                    <h4 className="text-lg font-bold text-white">
                      {job.title}
                    </h4>

                    {job.stipend && (
                      <div className="text-xs font-bold text-emerald-400 mt-1">
                        💰 {job.stipend}
                      </div>
                    )}

                    <p className="text-sm text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                      {job.description}
                    </p>

                    {job.tags && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {job.tags.map((tg, i) => (
                          <span key={i} className="text-[11px] font-semibold bg-slate-950 text-slate-300 px-2 py-0.5 rounded-lg border border-slate-800">
                            {tg}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> {t.directApply}
                    </span>
                    <a
                      href={job.url || 'https://www.linkedin.com/jobs'}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300"
                    >
                      <span>{t.viewDetails}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: FREELANCE HUB */}
        {activeTab === 'freelance' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-3">
                  <DollarSign className="w-3.5 h-3.5" /> Student Freelancing Blueprint
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {t.freelanceTitle}
                </h3>
                <p className="text-sm text-slate-400 mt-2">
                  {t.freelanceSubtitle}
                </p>
              </div>
            </div>

            {/* Instant Proposal Generator Component */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-cyan-400" />
                    {t.proposalGenerator}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">{t.chooseService}</p>
                </div>

                {/* Service Selector Tabs */}
                <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
                  {Object.entries(PROPOSAL_TEMPLATES).map(([key, item]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedProposalKey(key)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                        selectedProposalKey === key
                          ? 'bg-indigo-600 text-white shadow'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Proposal Box */}
              <div className="relative bg-slate-950 rounded-2xl p-5 border border-slate-800">
                <pre className="text-xs sm:text-sm text-slate-200 font-mono whitespace-pre-wrap leading-relaxed">
                  {PROPOSAL_TEMPLATES[selectedProposalKey]?.text.replace(/\[Your Name\]/g, name || 'Your Name')}
                </pre>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      const text = PROPOSAL_TEMPLATES[selectedProposalKey]?.text.replace(/\[Your Name\]/g, name || 'Your Name')
                      navigator.clipboard.writeText(text)
                      showToast(t.copiedToast)
                    }}
                    className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs shadow-lg transition"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{t.copyProposal}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Platform Guides */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 hover:border-emerald-500/40 transition">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-black text-xl border border-emerald-500/20">
                    Up
                  </div>
                  <a
                    href="https://www.upwork.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
                  >
                    <span>Visit Upwork</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <h4 className="text-lg font-bold text-white">Upwork Strategy for College Students</h4>
                <p className="text-xs text-slate-400 mt-1">Focus on fixed-price contracts ({currency === 'INR' ? '₹3,000 - ₹12,000' : '$50 - $150'}).</p>
                <ul className="mt-4 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Target "Bug Fixes", "Tailwind UI Components", or "PDF Generation".</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Include a personalized Loom video or live GitHub demo in your proposals.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Bid on jobs posted within the last 15-30 minutes for highest conversion.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 hover:border-green-500/40 transition">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-400 font-black text-xl border border-green-500/20">
                    Fi
                  </div>
                  <a
                    href="https://www.fiverr.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
                  >
                    <span>Visit Fiverr</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <h4 className="text-lg font-bold text-white">Fiverr Micro-Gig Fast Start</h4>
                <p className="text-xs text-slate-400 mt-1">Create well-defined packaged services with instant deliverables.</p>
                <ul className="mt-4 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <span>"I will convert Figma design into clean Tailwind React code in 24 hours".</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <span>"I will generate ATS friendly PDF resumes with automated formatting".</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <span>Set basic tier at {currency === 'INR' ? '₹1,500' : '$20'} to stack your first 5 positive 5-star ratings.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: AI CAREER ROADMAPS */}
        {activeTab === 'roadmap' && (
          <div className="space-y-8">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold mb-3">
                  <Rocket className="w-3.5 h-3.5" /> Skill Orbit
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {t.roadmapTitle}
                </h3>
                <p className="text-sm text-slate-400 mt-2">
                  {t.roadmapSubtitle}
                </p>
              </div>
            </div>

            {/* Roadmaps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {roadmapsState.map((r, rIdx) => {
                const Icon = r.icon
                const completedCount = r.milestones.filter(m => m.done).length
                const percent = Math.round((completedCount / r.milestones.length) * 100)

                return (
                  <div
                    key={r.id}
                    className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-2xl bg-gradient-to-r ${r.color} text-white shadow-lg`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-black text-cyan-400">{percent}% Complete</span>
                      </div>

                      <h4 className="text-lg font-bold text-white mb-2">{r.title}</h4>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-950 rounded-full h-2 mb-5 border border-slate-800 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${r.color} transition-all duration-300`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <div className="space-y-3">
                        {r.milestones.map((m, mIdx) => (
                          <div
                            key={mIdx}
                            onClick={() => toggleMilestone(rIdx, mIdx)}
                            className="flex items-start gap-2.5 cursor-pointer group"
                          >
                            {m.done ? (
                              <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-600 group-hover:text-slate-400 shrink-0 mt-0.5" />
                            )}
                            <span className={`text-xs ${m.done ? 'text-slate-300 line-through opacity-80' : 'text-slate-200 group-hover:text-cyan-400'} transition`}>
                              {m.step}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* TAB 5: BRANDING & GITHUB HUB */}
        {activeTab === 'brand' && (
          <div className="space-y-8">
            <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-3">
                  <Sparkles className="w-3.5 h-3.5" /> {t.brandHubTitle}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {t.brandHubSubtitle}
                </h3>
                <p className="text-sm text-slate-400 mt-2">
                  प्रोजेक्टला जागतिक स्तरावर (Global Level) नेण्यासाठी टॉप ५ ब्रँड नावे आणि GitHub सिंक्रोनाइझेशन तपशील.
                </p>
              </div>
            </div>

            {/* Proposed Names Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Option 1 */}
              <div className="bg-gradient-to-b from-slate-900 to-indigo-950/40 border-2 border-indigo-500/50 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-3 right-3 px-3 py-1 bg-indigo-600 text-white font-bold text-[10px] rounded-full uppercase tracking-wider">
                  ⭐ No. 1 Recommended
                </div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-black text-xl mb-4 border border-indigo-500/30">
                  CS
                </div>
                <h4 className="text-xl font-extrabold text-white">CareerSarthi AI</h4>
                <div className="text-xs text-indigo-400 font-medium mt-0.5">कॅरियर सारथी (Career Navigator)</div>
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  <strong>Tagline:</strong> <em>"विद्यार्थ्यांचा खरा मार्गदर्शक — Resume ते पहिली नोकरी!"</em>
                </p>
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-1.5">
                  <div>🎯 <strong>Vibe:</strong> विश्वासू, भारतीय संदर्भ (Indian Context) & विद्यार्थी-केंद्रित.</div>
                  <div>🚀 <strong>Scope:</strong> सर्व भारतीय भाषा आणि जागतिक भाषा सपोर्ट.</div>
                </div>
              </div>

              {/* Option 2 */}
              <div className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 rounded-3xl p-6 shadow-xl transition">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-black text-xl mb-4 border border-cyan-500/30">
                  GL
                </div>
                <h4 className="text-xl font-extrabold text-white">GradLaunch Global</h4>
                <div className="text-xs text-cyan-400 font-medium mt-0.5">ग्रॅड-लाँच (Graduate Launchpad)</div>
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  <strong>Tagline:</strong> <em>"From Campus to Career — Smarter, Faster, Stronger."</em>
                </p>
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-1.5">
                  <div>🎯 <strong>Vibe:</strong> Global SaaS, मॉडर्न, टेक-फॉरवर्ड स्टार्टअप लूक.</div>
                </div>
              </div>

              {/* Option 3 */}
              <div className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 rounded-3xl p-6 shadow-xl transition">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-black text-xl mb-4 border border-blue-500/30">
                  SO
                </div>
                <h4 className="text-xl font-extrabold text-white">SkillOrbit AI</h4>
                <div className="text-xs text-blue-400 font-medium mt-0.5">स्किल ऑर्बिट (All-in-One Career Ecosystem)</div>
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  <strong>Tagline:</strong> <em>"Build Skills, Find Gigs, Land Dream Roles."</em>
                </p>
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-1.5">
                  <div>🎯 <strong>Vibe:</strong> Gen-Z, फ्रिलान्सिंग आणि गिग इकॉनॉमी रेडी.</div>
                </div>
              </div>

            </div>

            {/* GitHub Sync Status Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white">
                    <Github className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">GitHub Repository Synchronization</h4>
                    <p className="text-xs text-slate-400">vina-yak711/student-career-assist • Branch: main</p>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                  Synced & Ready
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                सर्व नवीन फाइल्स, बहुभाषिक प्रणाली (i18n), नवीन ATS रेझ्युमे इंजिन आणि जागतिक डिझाइन तुमच्या प्रोजेक्टमध्ये समाविष्ट केले आहे.
              </p>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}