import type { Job, User } from '../types';

const API_URL = 'http://localhost:3001';

// User management functions
export const getStoredUsers = async (): Promise<User[]> => {
  const res = await fetch(`${API_URL}/users`);
  if (!res.ok) return [];
  return res.json();
};

export const saveUser = async (user: User): Promise<void> => {
  const users = await getStoredUsers();
  const existingUser = users.find(u => u.id === user.id);
  if (existingUser) {
    await fetch(`${API_URL}/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
  } else {
    await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
  }
};

export const findUser = async (username: string, password: string): Promise<User | null> => {
  const res = await fetch(`${API_URL}/users?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
  if (!res.ok) return null;
  const users = await res.json();
  return users[0] || null;
};

export const userExists = async (username: string): Promise<boolean> => {
  const res = await fetch(`${API_URL}/users?username=${encodeURIComponent(username)}`);
  if (!res.ok) return false;
  const users = await res.json();
  return users.length > 0;
};

// Job management functions
// Not needed with JSON Server, but kept for compatibility
export const getUserJobsKey = (userId: string): string => {
  return `jobTracker_jobs_${userId}`;
};

export const getUserJobs = async (userId: string): Promise<Job[]> => {
  const res = await fetch(`${API_URL}/jobs?userId=${encodeURIComponent(userId)}`);
  if (!res.ok) return [];
  return res.json();
};

export const saveUserJobs = async (userId: string, jobs: Job[]): Promise<void> => {
  // Remove all jobs for user, then add all
  const currentJobs = await getUserJobs(userId);
  await Promise.all(currentJobs.map(j => fetch(`${API_URL}/jobs/${j.id}`, { method: 'DELETE' })));
  await Promise.all(jobs.map(job => fetch(`${API_URL}/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job)
  })));
};

export const addJobForUser = async (userId: string, job: Job): Promise<void> => {
  await fetch(`${API_URL}/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...job, userId })
  });
};

export const updateJobForUser = async (userId: string, jobId: string, updatedJob: Partial<Job>): Promise<void> => {
  await fetch(`${API_URL}/jobs/${jobId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedJob)
  });
};

export const deleteJobForUser = async (userId: string, jobId: string): Promise<void> => {
  await fetch(`${API_URL}/jobs/${jobId}`, { method: 'DELETE' });
};

export const getJobForUser = async (userId: string, jobId: string): Promise<Job | null> => {
  const res = await fetch(`${API_URL}/jobs/${jobId}`);
  if (!res.ok) return null;
  const job = await res.json();
  return job.userId === userId ? job : null;
};

// Migration function is not needed with JSON Server, so it's now a no-op
export const migrateOldJobsToUser = async (userId: string): Promise<void> => {};

