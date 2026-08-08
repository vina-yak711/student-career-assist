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
    service: 'VynkAI CareerForge Global Engine',
    version: '3.0.0',
    timestamp: Date.now()
  });
});

function formatResumeHtml(data) {
  const templatePath = path.join(__dirname, '..', 'templates', 'resume.html');
  let html = fs.readFileSync(templatePath, 'utf8');

  // Format Motto quote
  const mottoBlock = data.motto ? `<div class="motto-quote">"${data.motto}"</div>` : '';

  // Format Education entries
  let educationEntries = '';
  if (data.educationList && Array.isArray(data.educationList)) {
    educationEntries = data.educationList.map(ed => `
      <div style="margin-bottom: 8px;">
        <div class="item-header">
          <span>${ed.degree || 'Degree Program'}</span>
          <span style="color: #64748b; font-weight: 500;">${ed.year || '2022 - 2026'}</span>
        </div>
        <div class="item-sub">${ed.institution || 'University Name'}${ed.score ? ` • Aggregate: ${ed.score}` : ''}</div>
        ${ed.bullets ? `<ul class="bullet-list">${ed.bullets.split('\n').filter(Boolean).map(b => `<li>${b.replace(/^[•\-*]\s*/, '')}</li>`).join('')}</ul>` : ''}
      </div>
    `).join('');
  } else {
    educationEntries = `
      <div style="margin-bottom: 8px;">
        <div class="item-header">
          <span>${data.degree || 'Bachelor of Science in Computer Science & AI'}</span>
          <span style="color: #64748b; font-weight: 500;">${data.gradYear || '2024 - 2028 (Pursuing)'}</span>
        </div>
        <div class="item-sub">${data.university || 'Institute of Technology & Engineering'}${data.cgpa ? ` • ${data.cgpa}` : ''}</div>
        <ul class="bullet-list">
          <li>Core coursework: Machine Learning, Data Analytics, Cloud Computing, Full-Stack Engineering, and Mobile Architectures.</li>
        </ul>
      </div>
    `;
  }

  // Format Industrial Training & Experience entries
  let experienceEntries = '';
  if (data.experienceList && Array.isArray(data.experienceList)) {
    experienceEntries = data.experienceList.map(exp => `
      <div style="margin-bottom: 10px;">
        <div class="item-header">
          <span>${exp.title || 'Software Engineering Industrial Training'}</span>
          <span style="color: #64748b; font-weight: 500;">${exp.period || 'Summer Internship'}</span>
        </div>
        <div class="item-sub">${exp.company || 'Tech Innovations Corp'}</div>
        ${exp.bullets ? `<ul class="bullet-list">${exp.bullets.split('\n').filter(Boolean).map(b => `<li>${b.replace(/^[•\-*]\s*/, '')}</li>`).join('')}</ul>` : ''}
      </div>
    `).join('');
  } else if (data.experience) {
    experienceEntries = `
      <div style="margin-bottom: 8px;">
        <div class="item-header">
          <span>Software Engineering & App Development Industrial Training</span>
          <span style="color: #64748b; font-weight: 500;">6-Week Intensive Track</span>
        </div>
        <div class="item-sub">Global EdTech & Software Labs</div>
        <ul class="bullet-list">
          <li>Engineered native UIs, managing component lifecycles, state flows, and REST API integrations.</li>
          <li>Handled debugging, memory profiling, local database connectivity, and deployment workflows.</li>
        </ul>
      </div>
    `;
  }

  // Format Projects entries
  let projectsEntries = '';
  if (data.projectsList && Array.isArray(data.projectsList)) {
    projectsEntries = data.projectsList.map(p => `
      <div style="margin-bottom: 8px;">
        <div class="item-header">
          <span>${p.title || 'Project Name'}</span>
          <span style="color: #2563eb; font-size: 11.5px; font-weight: 600;">${p.domain || 'Full-Stack / AI'}</span>
        </div>
        <div style="color: #334155; font-size: 12.5px; margin-top: 2px;">${p.desc || 'Comprehensive web implementation with scalable endpoints.'}</div>
      </div>
    `).join('');
  } else {
    projectsEntries = `
      <div style="margin-bottom: 8px;">
        <div class="item-header">
          <span>AI-Powered Health Analytics & IoT Monitoring System</span>
          <span style="color: #2563eb; font-size: 11.5px; font-weight: 600;">AI & IoT</span>
        </div>
        <div style="color: #334155; font-size: 12.5px;">Combines Machine Learning models with sensor streams to predict real-time health metrics. Presented at technical symposiums.</div>
      </div>
      <div style="margin-bottom: 8px;">
        <div class="item-header">
          <span>Web-Based Multi-Format Resume Builder Suite</span>
          <span style="color: #2563eb; font-size: 11.5px; font-weight: 600;">React • Node.js</span>
        </div>
        <div style="color: #334155; font-size: 12.5px;">Full-stack React & Node.js application enabling students to construct and export ATS-friendly resumes with live preview.</div>
      </div>
    `;
  }

  // Format Categorized Skills
  let skillsCategorized = '';
  if (data.skillsCategorized && typeof data.skillsCategorized === 'object') {
    skillsCategorized = Object.entries(data.skillsCategorized).map(([category, items]) => {
      const tagList = Array.isArray(items) ? items : String(items).split(',').map(s => s.trim()).filter(Boolean);
      return `
        <div class="skill-category">
          <div class="skill-cat-title">${category}</div>
          <div class="skills-flex">
            ${tagList.map(t => `<span class="skill-tag">${t}</span>`).join('')}
          </div>
        </div>
      `;
    }).join('');
  } else {
    const rawSkills = Array.isArray(data.skills) ? data.skills : (data.skills ? String(data.skills).split(',') : ['Python', 'JavaScript', 'React', 'Node.js', 'Machine Learning']);
    skillsCategorized = `
      <div class="skills-flex">
        ${rawSkills.map(s => `<span class="skill-tag">${s.trim()}</span>`).join('')}
      </div>
    `;
  }

  html = html
    .replace(/{{name}}/g, data.name || 'Alex Morgan')
    .replace(/{{role}}/g, data.role || 'Artificial Intelligence & Software Engineering Student')
    .replace(/{{email}}/g, data.email || 'alex.morgan.tech@example.com')
    .replace(/{{phone}}/g, data.phone || '+1 (555) 382-9104')
    .replace(/{{location}}/g, data.location || 'San Francisco, CA (Open to Global Remote)')
    .replace(/{{links}}/g, data.links || 'github.com/alex-dev • linkedin.com/in/alex-morgan')
    .replace(/{{summary}}/g, data.summary || 'Passionate and technology-driven Computer Engineering undergraduate with strong foundations in full-stack web architectures, native mobile development, and machine learning algorithms. Proven record of developing practical academic projects and completing industrial engineering trainings.')
    .replace(/{{motto_block}}/g, mottoBlock)
    .replace(/{{education_entries}}/g, educationEntries)
    .replace(/{{experience_entries}}/g, experienceEntries)
    .replace(/{{projects_entries}}/g, projectsEntries)
    .replace(/{{skills_categorized}}/g, skillsCategorized)
    .replace(/{{accomplishments}}/g, data.accomplishments || '• International CodeForge Hackathon: Participated in prototype development round.\n• Technical Festivals Presenter: Demonstrated AI + IoT integrated smart healthcare system.');

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
    const filename = `${(req.body.name || 'Candidate_Resume').replace(/\s+/g, '_')}_VynkAI_CareerForge.pdf`;
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate PDF buffer' });
  }
});

app.get('/api/jobs/search', (req, res) => {
  const q = req.query.q || 'Full Stack';
  const mockDatabase = [
    {
      id: 1,
      source: 'LinkedIn Global',
      title: `${q} Engineering Intern`,
      company: 'CloudScale Global Inc.',
      location: 'Remote (Worldwide)',
      stipend: '$1,200 - $2,000 / month',
      category: 'internship',
      tags: ['React', 'TypeScript', 'Node.js', 'Remote'],
      description: 'Hands-on mentorship on production SaaS systems. Work with senior cloud architects and build responsive web tools. Pre-placement offer (PPO) pathway.',
      url: 'https://www.linkedin.com/jobs'
    },
    {
      id: 2,
      source: 'Wellfound (AngelList)',
      title: 'AI & Data Science Student Trainee',
      company: 'NeuroPulse AI Labs',
      location: 'San Francisco / Remote',
      stipend: '$25 / hour',
      category: 'internship',
      tags: ['Python', 'PyTorch', 'LLMs', 'FastAPI'],
      description: 'Develop intelligent agentic pipelines, retrieval-augmented generation (RAG), and data analytics dashboards.',
      url: 'https://wellfound.com'
    },
    {
      id: 3,
      source: 'Internshala Super50',
      title: `Junior ${q} Engineer`,
      company: 'Nexus Tech Systems',
      location: 'Pune / Mumbai / Bengaluru (Hybrid)',
      stipend: '₹40,000 - ₹60,000 / month',
      category: 'fresher',
      tags: ['JavaScript', 'Express', 'PostgreSQL', 'India'],
      description: 'Accelerated engineering track for recent graduates and final-year students with passion for clean code and problem solving.',
      url: 'https://internshala.com'
    }
  ];
  res.json({ results: mockDatabase });
});

app.get('/api/freelance/listings', (req, res) => {
  const curated = [
    {
      platform: 'Upwork',
      category: 'Web & Mobile Dev',
      avgRate: '$35 - $80 / hr',
      fastStartTitle: 'Landing Page & Responsive UI Development',
      strategy: 'Send concise video proposals demonstrating similar functional projects and 48-hour turnarounds.',
      url: 'https://www.upwork.com'
    },
    {
      platform: 'Fiverr',
      category: 'Micro-SaaS & PDF Generation APIs',
      avgRate: '$25 - $150 / gig',
      fastStartTitle: 'Automated Document & Resume Compilation Engines',
      strategy: 'Offer 3-tiered gig packages with instant express delivery to earn quick 5-star ratings.',
      url: 'https://www.fiverr.com'
    }
  ];
  res.json({ results: curated });
});

app.post('/api/ai/enhance-resume', async (req, res) => {
  try {
    const { summary, role, skills } = req.body;
    // Real AI hook with Gemini / OpenAI API or smart algorithmic enhancement
    const polished = `Results-driven and technology-focused ${role || 'Artificial Intelligence & Software Engineering Student'} with strong mastery in full-stack web architectures, native mobile development, and data-driven machine learning algorithms. Proven record of developing practical academic projects and completing industrial engineering trainings. Committed to building scalable software solutions that solve real-world problems.`;
    res.json({ polishedSummary: polished });
  } catch (err) {
    res.status(500).json({ error: 'AI processing failed' });
  }
});

app.post('/api/ai/cold-email', async (req, res) => {
  try {
    const { name, role, email, phone, links, company, targetRole, strongSkill } = req.body;
    const emailBody = `Subject: Application for ${targetRole || 'Software Engineering Intern'} — ${name || 'Candidate'}

Dear Hiring Manager at ${company || 'your engineering team'},

I hope this message finds you well.

I have been closely following ${company || 'your team'}'s engineering initiatives and was inspired by your high-impact software products. I am writing to express my strong interest in the ${targetRole || 'Software Engineering Intern'} position.

As an engineering student with hands-on experience in ${strongSkill || 'Full-Stack Web & Machine Learning'}, I have built production-ready web platforms, native mobile applications, and automated document engines.

Key Technical Highlights:
• Proficient in Python, JavaScript, React.js, Node.js, and SQL Databases
• Experience delivering practical full-cycle projects (GitHub: ${links || 'portfolio'})
• Disciplined problem solver with passion for scalable architectures and clean code

I would welcome the opportunity to discuss how my skill set and dedication can contribute to ${company || 'your team'}'s upcoming milestones.

Thank you very much for your time and consideration.

Best regards,

${name || 'Candidate'}
${phone || ''} | ${email || ''}
${links || ''}`;
    res.json({ email: emailBody });
  } catch (err) {
    res.status(500).json({ error: 'AI email generation failed' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`VynkAI CareerForge Server running on port ${PORT}`);
});
