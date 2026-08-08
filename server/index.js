const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { generatePdfBuffer } = require('./resumePdf');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'CareerSarthi Global Career Engine',
    version: '2.0.0',
    timestamp: Date.now()
  });
});

function formatResumeHtml(data) {
  const templatePath = path.join(__dirname, '..', 'templates', 'resume.html');
  let html = fs.readFileSync(templatePath, 'utf8');

  const skillsList = Array.isArray(data.skills) ? data.skills : (data.skills ? data.skills.split(',') : []);
  const skillsTags = skillsList
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => `<span class="skill-tag">${s}</span>`)
    .join('\n');

  html = html
    .replace(/{{name}}/g, data.name || 'Student Candidate')
    .replace(/{{role}}/g, data.role || 'Aspiring Software Engineer & Tech Innovator')
    .replace(/{{email}}/g, data.email || 'student@domain.edu')
    .replace(/{{phone}}/g, data.phone || '+91 98765 43210')
    .replace(/{{location}}/g, data.location || 'Pune / Mumbai / Remote')
    .replace(/{{summary}}/g, data.summary || 'Proactive and ambitious learner with solid foundations in engineering principles, problem solving, and modern digital development.')
    .replace(/{{skills_tags}}/g, skillsTags || '<span class="skill-tag">Web Development</span>')
    .replace(/{{education}}/g, data.education || 'Bachelor of Technology (B.Tech) in Computer Science')
    .replace(/{{gradYear}}/g, data.gradYear || '2022 - 2026')
    .replace(/{{university}}/g, data.university || 'State Technical University • CGPA: 8.8/10')
    .replace(/{{projects}}/g, data.projects || 'Full-Stack Career Assist Platform with real-time PDF generation, multi-currency gig launcher, and global internship radars.')
    .replace(/{{languages}}/g, data.languages || 'English (Fluent), Marathi (Native), Hindi (Professional)')
    .replace(/{{certifications}}/g, data.certifications || 'AWS Cloud Practitioner Essentials, Meta Frontend Specialization');

  return html;
}

app.post('/api/resume/generate', async (req, res) => {
  try {
    const html = formatResumeHtml(req.body);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to render resume template' });
  }
});

app.post('/api/resume/pdf', async (req, res) => {
  try {
    const html = formatResumeHtml(req.body);
    const pdfBuffer = await generatePdfBuffer(html);
    res.setHeader('Content-Type', 'application/pdf');
    const filename = `${(req.body.name || 'Student_Resume').replace(/\s+/g, '_')}_CareerSarthi.pdf`;
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate PDF buffer' });
  }
});

app.get('/api/jobs/search', (req, res) => {
  const q = (req.query.q || 'frontend').toLowerCase();
  const region = req.query.region || 'all';

  const mockDatabase = [
    {
      source: 'LinkedIn Global',
      title: `${req.query.q || 'Full Stack'} Intern`,
      company: 'CloudScale Technologies',
      location: 'Remote (Global)',
      stipend: '$800 - $1,500 / month',
      category: 'internship',
      tags: ['React', 'Node.js', 'TypeScript', 'Remote'],
      description: 'Join an agile international team building high-performance cloud applications. Mentorship, flexible hours, and pre-placement offer (PPO) opportunity.',
      url: 'https://www.linkedin.com/jobs'
    },
    {
      source: 'Internshala Verified',
      title: `Junior ${req.query.q || 'Software'} Engineer`,
      company: 'Nexus Infotech Solutions',
      location: 'Pune / Mumbai / Bengaluru',
      stipend: '₹35,000 - ₹50,000 / month',
      category: 'fresher',
      tags: ['JavaScript', 'Tailwind', 'REST APIs', 'India'],
      description: 'Ideal role for fresh graduates and final-year students with passion for web development, UI engineering, and clean code principles.',
      url: 'https://internshala.com'
    },
    {
      source: 'Wellfound (AngelList)',
      title: 'Frontend & UI Engineering Intern',
      company: 'HyperGrowth AI Startup',
      location: 'San Francisco / Remote',
      stipend: '$25 / hour',
      category: 'internship',
      tags: ['Next.js', 'Vite', 'Figma', 'US-Remote'],
      description: 'Build futuristic AI interfaces with real-time streaming, interactive canvas, and sleek motion components.',
      url: 'https://wellfound.com'
    },
    {
      source: 'RemoteOK',
      title: 'Backend API Developer (Entry Level)',
      company: 'Veritas Global Systems',
      location: 'Remote (Worldwide)',
      stipend: '$2,000 - $3,200 / month',
      category: 'fresher',
      tags: ['Node.js', 'Express', 'PostgreSQL', 'Docker'],
      description: 'Develop robust microservices and secure authentication pipelines. Great learning curve with senior architects.',
      url: 'https://remoteok.com'
    },
    {
      source: 'Naukri Campus',
      title: 'Graduate Tech Trainee (Batch 2024-2026)',
      company: 'Tata Consultancy & Innovation',
      location: 'Hyderabad / Chennai / Remote',
      stipend: '₹4.5 - ₹7.2 LPA',
      category: 'fresher',
      tags: ['Java/Python', 'Cloud', 'Data Structures', 'Campus'],
      description: 'Accelerated graduate development track with structured rotation across Cloud, DevOps, and Full-Stack development.',
      url: 'https://www.naukri.com'
    }
  ];

  res.json({ results: mockDatabase, count: mockDatabase.length });
});

app.get('/api/freelance/listings', (req, res) => {
  const curated = [
    {
      platform: 'Upwork',
      category: 'Web & Mobile Dev',
      avgRate: '$30 - $75 / hr',
      fastStartTitle: 'Landing Page & Responsive UI Development',
      strategy: 'Send short proposal (under 120 words) with 2 live portfolio links and a 30-second Loom screen walkthrough.',
      template: 'Hi [Client], I noticed you need a clean, responsive Tailwind UI. I built a similar high-speed web app recently (see link). I can finish this within 48 hours for you.',
      url: 'https://www.upwork.com'
    },
    {
      platform: 'Fiverr',
      category: 'Micro-SaaS & Custom Scripts',
      avgRate: '$25 - $120 / gig',
      fastStartTitle: 'Custom React Components & PDF Generator APIs',
      strategy: 'Create 3 structured tiers (Basic $20, Standard $50, Premium $120) with fast 24-hour turnaround for maximum 5-star conversion.',
      template: 'I will create modern, responsive React/Node.js features and automated PDF workflows with 100% satisfaction guarantee.',
      url: 'https://www.fiverr.com'
    },
    {
      platform: 'Toptal / Contra',
      category: 'Independent Developer Network',
      avgRate: '$50 - $110 / hr',
      fastStartTitle: 'Freelance Frontend Architect',
      strategy: 'Showcase verified GitHub contributions, open-source repositories, and interactive demo deployments.',
      template: 'Specialized in building performant web applications with 99+ Google Lighthouse scores and seamless user experience.',
      url: 'https://contra.com'
    }
  ];
  res.json({ results: curated });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`CareerSarthi Global Server running on port ${PORT}`);
});
