const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { generatePdfBuffer } = require('./resumePdf');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));

app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: Date.now() }));

app.post('/api/resume/generate', async (req, res) => {
  try {
    const data = req.body;
    const templatePath = path.join(__dirname, '..', 'templates', 'resume.html');
    let html = fs.readFileSync(templatePath, 'utf8');
    html = html.replace(/{{name}}/g, data.name || 'Student Name')
               .replace(/{{email}}/g, data.email || 'student@example.com')
               .replace(/{{summary}}/g, data.summary || 'Summary...')
               .replace(/{{skills}}/g, (data.skills || []).join(', '));
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate resume' });
  }
});

app.post('/api/resume/pdf', async (req, res) => {
  try {
    const data = req.body;
    const templatePath = path.join(__dirname, '..', 'templates', 'resume.html');
    let html = fs.readFileSync(templatePath, 'utf8');
    html = html.replace(/{{name}}/g, data.name || 'Student Name')
               .replace(/{{email}}/g, data.email || 'student@example.com')
               .replace(/{{summary}}/g, data.summary || 'Summary...')
               .replace(/{{skills}}/g, (data.skills || []).join(', '));
    const pdfBuffer = await generatePdfBuffer(html);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${(data.name||'resume').replace(/\s+/g,'_')}.pdf"`);
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

app.get('/api/jobs/search', (req, res) => {
  const q = req.query.q || 'student';
  const mock = [
    { source: 'demo', title: `${q} Intern`, company: 'Acme Corp', location: 'Remote', description: 'Short internship for students', url: 'https://example.com/job/1' },
    { source: 'demo', title: `${q} Junior`, company: 'Startup Inc', location: 'City', description: 'Entry-level job', url: 'https://example.com/job/2' }
  ];
  res.json({ results: mock });
});

app.get('/api/freelance/listings', (req, res) => {
  const curated = [
    { title: 'Upwork - Web Development', url: 'https://www.upwork.com', note: 'Optimize your profile' },
    { title: 'Fiverr - Gigs for students', url: 'https://www.fiverr.com', note: 'Start small to build reviews' }
  ];
  res.json({ results: curated });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
