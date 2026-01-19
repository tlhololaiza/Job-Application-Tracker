import type { VercelRequest, VercelResponse } from '@vercel/node';

// In-memory storage (will reset on each deployment)
// For production, you should use a real database
let jobs: any[] = [
  {
    id: "1768515477806",
    companyName: "mLab",
    role: "Trainee",
    status: "Applied",
    dateApplied: "2025-10-16",
    description: "Coding",
    requirements: "",
    duties: "",
    contactDetails: "",
    address: "",
    notes: "",
    userId: "1768515422021"
  },
  {
    id: "1768515605795",
    companyName: "Shoprite",
    role: "Cashier",
    status: "Interviewed",
    dateApplied: "2026-01-15",
    description: "Till work",
    requirements: "",
    duties: "",
    contactDetails: "",
    address: "",
    notes: "",
    userId: "1768515496959"
  }
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { userId } = req.query;
  
  // Extract job ID from URL if present (e.g., /api/jobs/123)
  const pathParts = req.url?.split('/') || [];
  const jobId = pathParts.length > 3 ? pathParts[pathParts.length - 1].split('?')[0] : null;

  if (req.method === 'GET') {
    if (jobId) {
      // Get specific job
      const job = jobs.find(j => j.id === jobId);
      return job ? res.status(200).json(job) : res.status(404).json({ error: 'Job not found' });
    }
    
    // Filter by userId if provided
    const filteredJobs = userId ? jobs.filter(j => j.userId === userId) : jobs;
    return res.status(200).json(filteredJobs);
  }

  if (req.method === 'POST') {
    const newJob = req.body;
    jobs.push(newJob);
    return res.status(201).json(newJob);
  }

  if (req.method === 'PUT' && jobId) {
    const index = jobs.findIndex(j => j.id === jobId);
    if (index !== -1) {
      jobs[index] = { ...jobs[index], ...req.body };
      return res.status(200).json(jobs[index]);
    }
    return res.status(404).json({ error: 'Job not found' });
  }

  if (req.method === 'PATCH' && jobId) {
    const index = jobs.findIndex(j => j.id === jobId);
    if (index !== -1) {
      jobs[index] = { ...jobs[index], ...req.body };
      return res.status(200).json(jobs[index]);
    }
    return res.status(404).json({ error: 'Job not found' });
  }

  if (req.method === 'DELETE' && jobId) {
    const index = jobs.findIndex(j => j.id === jobId);
    if (index !== -1) {
      jobs.splice(index, 1);
      return res.status(204).end();
    }
    return res.status(404).json({ error: 'Job not found' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
