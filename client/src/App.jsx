import React, { useState } from 'react'
import axios from 'axios'

export default function App() {
  const [query, setQuery] = useState('frontend')
  const [jobs, setJobs] = useState([])
  const [resumeHtml, setResumeHtml] = useState('')
  const [name, setName] = useState('Alex Student')
  const [email, setEmail] = useState('alex@student.edu')
  const [summary, setSummary] = useState('Computer Science student skilled in JavaScript and problem solving')
  const [skills, setSkills] = useState('JavaScript, React, Node.js')

  async function searchJobs() {
    const res = await axios.get(`http://localhost:4000/api/jobs/search?q=${encodeURIComponent(query)}`)
    setJobs(res.data.results || [])
  }

  async function previewResume() {
    const payload = { name, email, summary, skills: skills.split(',').map(s=>s.trim()) }
    const res = await axios.post('http://localhost:4000/api/resume/generate', payload)
    setResumeHtml(res.data)
  }

  async function downloadPdf() {
    const payload = { name, email, summary, skills: skills.split(',').map(s=>s.trim()) }
    const res = await axios.post('http://localhost:4000/api/resume/pdf', payload, { responseType: 'blob' })
    const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${name.replace(/\s+/g,'_')}.pdf`)
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">StudentCareerAssist</h1>
        <nav className="space-x-4 text-sm text-gray-600">
          <a href="#">Dashboard</a>
          <a href="#">Resume</a>
          <a href="#">Jobs</a>
        </nav>
      </header>

      <section className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-lg font-medium mb-2">Resume Builder</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">Name</label>
            <input className="mt-1 w-full border rounded p-2" value={name} onChange={e=>setName(e.target.value)} />
            <label className="block text-sm mt-2">Email</label>
            <input className="mt-1 w-full border rounded p-2" value={email} onChange={e=>setEmail(e.target.value)} />
            <label className="block text-sm mt-2">Summary</label>
            <textarea className="mt-1 w-full border rounded p-2" rows={4} value={summary} onChange={e=>setSummary(e.target.value)} />
            <label className="block text-sm mt-2">Skills (comma separated)</label>
            <input className="mt-1 w-full border rounded p-2" value={skills} onChange={e=>setSkills(e.target.value)} />
            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={previewResume}>Preview</button>
              <button className="px-4 py-2 border rounded" onClick={downloadPdf}>Download PDF</button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Preview</h3>
            <div className="border rounded p-4 h-72 overflow-auto bg-gray-50" dangerouslySetInnerHTML={{ __html: resumeHtml }} />
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-lg font-medium mb-2">Job Search</h2>
        <div className="flex gap-2">
          <input className="flex-1 border rounded p-2" value={query} onChange={e=>setQuery(e.target.value)} />
          <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={searchJobs}>Search</button>
        </div>
        <ul className="mt-4 space-y-2">
          {jobs.map((j, idx)=> (
            <li key={idx} className="p-3 border rounded bg-gray-50">
              <a href={j.url} target="_blank" rel="noreferrer" className="font-medium text-blue-600">{j.title}</a>
              <div className="text-sm text-gray-600">{j.company} — {j.location}</div>
              <p className="text-sm text-gray-700 mt-1">{j.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium mb-2">Freelance Leads</h2>
        <ul>
          <li><a className="text-blue-600" href="https://www.upwork.com">Upwork</a> — build a strong profile and apply to small jobs.</li>
          <li><a className="text-blue-600" href="https://www.fiverr.com">Fiverr</a> — create focused gig offerings.</li>
        </ul>
      </section>

    </div>
  )
}