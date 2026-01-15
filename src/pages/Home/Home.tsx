import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Text from '../../components/Text';
import Button from '../../components/Button';
import JobCard from '../../components/JobCard';
import ConfirmDialog from '../../components/ConfirmDialog';
import type { Job, User } from '../../types';
import { getUserJobs, saveUserJobs } from '../../utils/storage';
import './Home.css';

interface HomeProps {
  user: User | null;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; jobId: string | null }>({
    isOpen: false,
    jobId: null
  });

  const [formData, setFormData] = useState({
    companyName: '',
    role: '',
    status: 'Applied' as Job['status'],
    dateApplied: new Date().toISOString().split('T')[0],
    description: '',
    requirements: '',
    duties: '',
    contactDetails: '',
    address: '',
    notes: ''
  });

  const totalApplications = jobs.length;
  const interviewedCount = jobs.filter(job => job.status === 'Interviewed').length;
  const appliedCount = jobs.filter(job => job.status === 'Applied').length;
  const rejectedCount = jobs.filter(job => job.status === 'Rejected').length;

  useEffect(() => {
    if (user) {
      getUserJobs(user.id).then(setJobs);
    }
  }, [user]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (statusFilter !== 'all') params.set('status', statusFilter);
    if (sortOrder !== 'desc') params.set('sort', sortOrder);
    setSearchParams(params);
  }, [searchTerm, statusFilter, sortOrder, setSearchParams]);

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all';
    const sort = searchParams.get('sort') as 'asc' | 'desc' || 'desc';
    
    setSearchTerm(search);
    setStatusFilter(status);
    setSortOrder(sort);
  }, [searchParams]);

  const saveJobs = async (updatedJobs: Job[]) => {
    setJobs(updatedJobs);
    if (user) {
      await saveUserJobs(user.id, updatedJobs);
    }
  };

  const filteredJobs = jobs
    .filter(job => {
      const matchesSearch = job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.dateApplied).getTime();
      const dateB = new Date(b.dateApplied).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: Job = {
      id: Date.now().toString(),
      ...formData
    };
    saveJobs([...jobs, newJob]);
    resetForm();
  };

  const handleEditJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;
    
    const updatedJobs = jobs.map(job => 
      job.id === editingJob.id ? { ...editingJob, ...formData } : job
    );
    saveJobs(updatedJobs);
    resetForm();
  };

  const handleDeleteJob = (id: string) => {
    setDeleteConfirm({ isOpen: true, jobId: id });
  };

  const confirmDelete = () => {
    if (deleteConfirm.jobId) {
      const updatedJobs = jobs.filter(job => job.id !== deleteConfirm.jobId);
      saveJobs(updatedJobs);
      setDeleteConfirm({ isOpen: false, jobId: null });
    }
  };

  const startEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      companyName: job.companyName,
      role: job.role,
      status: job.status,
      dateApplied: job.dateApplied,
      description: job.description || '',
      requirements: job.requirements || '',
      duties: job.duties || '',
      contactDetails: job.contactDetails || '',
      address: job.address || '',
      notes: job.notes || ''
    });
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
      companyName: '',
      role: '',
      status: 'Applied',
      dateApplied: new Date().toISOString().split('T')[0],
      description: '',
      requirements: '',
      duties: '',
      contactDetails: '',
      address: '',
      notes: ''
    });
    setShowAddForm(false);
    setEditingJob(null);
  };

  return (
    <div className="home-page">
      <div className="container">
        <div className="dashboard">
          <div className="dashboard-top">
            <div>
              <Text variant="h1" size="3xl" weight="bold" color="primary">
                Dashboard
              </Text>
              <Text variant="p" size="lg" color="secondary">
                Track and manage your job applications
              </Text>
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={() => setShowAddForm(true)}
            >
              Add Application
            </Button>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon stat-total">📦</div>
              <div>
                <p className="stat-label">Total Applications</p>
                <p className="stat-value">{totalApplications}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon stat-interviewed">👥</div>
              <div>
                <p className="stat-label">Interviewed</p>
                <p className="stat-value">{interviewedCount}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon stat-applied">📝</div>
              <div>
                <p className="stat-label">Applied</p>
                <p className="stat-value">{appliedCount}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon stat-rejected">✖</div>
              <div>
                <p className="stat-label">Rejected</p>
                <p className="stat-value">{rejectedCount}</p>
              </div>
            </div>
          </div>

          <div className="controls-bar">
            <div className="search-controls">
              <input
                type="text"
                placeholder="Search by company or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="controls-right">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Status</option>
                <option value="Applied">Applied</option>
                <option value="Interviewed">Interviewed</option>
                <option value="Rejected">Rejected</option>
              </select>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="filter-select"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>

          {showAddForm && (
            <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <Text variant="h2" size="xl" weight="bold" color="primary">
                    {editingJob ? 'Edit Job Application' : 'Add New Job Application'}
                  </Text>
                  <Button variant="ghost" size="sm" onClick={resetForm}>
                    ✕
                  </Button>
                </div>
                
                <form onSubmit={editingJob ? handleEditJob : handleAddJob} className="job-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Company Name</label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Role</label>
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value as Job['status']})}
                      >
                        <option value="Applied">Applied</option>
                        <option value="Interviewed">Interviewed</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Date Applied</label>
                      <input
                        type="date"
                        value={formData.dateApplied}
                        onChange={(e) => setFormData({...formData, dateApplied: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Job Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={3}
                    />
                  </div>
                  
                  <div className="form-actions">
                    <Button type="button" variant="secondary" onClick={resetForm}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                      {editingJob ? 'Update Job' : 'Add Job'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="jobs-section">
            {filteredJobs.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">👜</div>
                <Text variant="h3" size="lg" weight="medium" color="secondary" align="center">
                  {jobs.length === 0 ? 'No applications yet' : 'No jobs match your search'}
                </Text>
                <Text variant="p" size="md" color="muted" align="center">
                  {jobs.length === 0 ? 'Add your first job application to get started.' : 'Try adjusting your search or filters.'}
                </Text>
                <Button variant="primary" size="md" onClick={() => setShowAddForm(true)}>
                  Add Your First Application
                </Button>
              </div>
            ) : (
              <div className="jobs-grid">
                {filteredJobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onEdit={startEdit}
                    onDelete={handleDeleteJob}
                  />
                ))}
              </div>
            )}
          </div>

          <ConfirmDialog
            isOpen={deleteConfirm.isOpen}
            title="Delete Job Application?"
            message="Are you sure you want to delete this job application? This action cannot be undone."
            confirmText="Delete"
            cancelText="Cancel"
            isDangerous={true}
            onConfirm={confirmDelete}
            onCancel={() => setDeleteConfirm({ isOpen: false, jobId: null })}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

