import type { Job, User } from '../types';

// User management functions
export const getStoredUsers = (): User[] => {
  const storedUsers = localStorage.getItem('jobTracker_users');
  return storedUsers ? JSON.parse(storedUsers) : [];
};

export const saveUser = (user: User): void => {
  const users = getStoredUsers();
  const existingUserIndex = users.findIndex(u => u.id === user.id);
  
  if (existingUserIndex >= 0) {
    users[existingUserIndex] = user;
  } else {
    users.push(user);
  }
  
  localStorage.setItem('jobTracker_users', JSON.stringify(users));
};

export const findUser = (username: string, password: string): User | null => {
  const users = getStoredUsers();
  return users.find(u => u.username === username && u.password === password) || null;
};

export const userExists = (username: string): boolean => {
  const users = getStoredUsers();
  return users.some(u => u.username === username);
};

// Job management functions
export const getUserJobsKey = (userId: string): string => {
  return `jobTracker_jobs_${userId}`;
};

export const getUserJobs = (userId: string): Job[] => {
  const jobsKey = getUserJobsKey(userId);
  const storedJobs = localStorage.getItem(jobsKey);
  return storedJobs ? JSON.parse(storedJobs) : [];
};

export const saveUserJobs = (userId: string, jobs: Job[]): void => {
  const jobsKey = getUserJobsKey(userId);
  localStorage.setItem(jobsKey, JSON.stringify(jobs));
};

export const addJobForUser = (userId: string, job: Job): void => {
  const jobs = getUserJobs(userId);
  jobs.push(job);
  saveUserJobs(userId, jobs);
};

export const updateJobForUser = (userId: string, jobId: string, updatedJob: Partial<Job>): void => {
  const jobs = getUserJobs(userId);
  const jobIndex = jobs.findIndex(j => j.id === jobId);
  
  if (jobIndex >= 0) {
    jobs[jobIndex] = { ...jobs[jobIndex], ...updatedJob };
    saveUserJobs(userId, jobs);
  }
};

export const deleteJobForUser = (userId: string, jobId: string): void => {
  const jobs = getUserJobs(userId);
  const filteredJobs = jobs.filter(j => j.id !== jobId);
  saveUserJobs(userId, filteredJobs);
};

export const getJobForUser = (userId: string, jobId: string): Job | null => {
  const jobs = getUserJobs(userId);
  return jobs.find(j => j.id === jobId) || null;
};

// Migration function to move old jobs to user-specific storage
export const migrateOldJobsToUser = (userId: string): void => {
  const oldJobs = localStorage.getItem('jobTracker_jobs');
  if (oldJobs && !localStorage.getItem(getUserJobsKey(userId))) {
    // Only migrate if user doesn't already have jobs
    const jobs: Job[] = JSON.parse(oldJobs);
    saveUserJobs(userId, jobs);
    // Don't remove old jobs immediately in case other users need them
  }
};

