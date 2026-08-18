'use client';

import React from 'react';
import Link from 'next/link';
import { KanbanSquare, Plus, Calendar, DollarSign, Users, AlertTriangle, CheckCircle2, X } from 'lucide-react';
import { dataStore, ProjectItem } from '../../../lib/data-store';

export default function ProjectsPage() {
  const [projects, setProjects] = React.useState<ProjectItem[]>([]);
  const [modalOpen, setModalOpen] = React.useState(false);

  // Form State
  const [formName, setFormName] = React.useState('');
  const [formDept, setFormDept] = React.useState('Operations');
  const [formManager, setFormManager] = React.useState('Sara Connor');
  const [formBudget, setFormBudget] = React.useState('45000');
  const [formDue, setFormDue] = React.useState('Oct 30, 2026');
  const [formDesc, setFormDesc] = React.useState('');

  React.useEffect(() => {
    const syncData = () => {
      setProjects(dataStore.listProjects());
    };
    syncData();
    return dataStore.subscribe(syncData);
  }, []);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    dataStore.createProject({
      name: formName,
      department: formDept,
      manager: formManager,
      budget: parseFloat(formBudget) || 25000,
      due_date: formDue,
      description: formDesc
    });

    setFormName('');
    setFormDesc('');
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary flex items-center gap-2">
            <KanbanSquare className="h-6 w-6 text-brand-primary" /> Project Operations
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Operational project management, milestone tracking, budget variance, and resource allocation.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-semibold text-xs transition-all flex items-center gap-1.5 shadow-glow-primary"
        >
          <Plus className="h-4 w-4" /> New Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((proj) => {
          const progressPct = proj.milestones_total > 0
            ? Math.round((proj.milestones_completed / proj.milestones_total) * 100)
            : 0;

          return (
            <div
              key={proj.id}
              className="p-5 rounded-2xl bg-surface-1 border border-border-subtle hover:border-brand-primary/40 transition-all flex flex-col justify-between gap-4 shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-surface-2 text-brand-primary">
                    {proj.department}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    proj.status === 'at_risk' ? 'bg-status-danger-bg text-status-danger' :
                    proj.status === 'completed' ? 'bg-status-success-bg text-status-success' : 'bg-brand-primary/20 text-brand-primary'
                  }`}>
                    {proj.status.replace('_', ' ')}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-text-primary leading-tight">{proj.name}</h3>
                  <p className="text-xs text-text-muted mt-1">Lead: <span className="text-text-secondary font-semibold">{proj.manager}</span></p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-text-secondary">Milestone Progress</span>
                    <span className="font-mono text-brand-tertiary">{proj.milestones_completed} / {proj.milestones_total} ({progressPct}%)</span>
                  </div>
                  <div className="w-full bg-surface-2 h-2 rounded-full overflow-hidden">
                    <div className="bg-brand-primary h-full rounded-full transition-all" style={{ width: `${progressPct}%` }} />
                  </div>
                </div>

                {/* Budget Variance */}
                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-surface-2 text-xs font-mono">
                  <div>
                    <span className="text-text-muted text-[10px] block">Planned Budget</span>
                    <span className="font-bold text-text-primary">${proj.budget.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-text-muted text-[10px] block">Actual Spend</span>
                    <span className={`font-bold ${proj.actual_spend > proj.budget ? 'text-status-danger' : 'text-text-primary'}`}>
                      ${proj.actual_spend.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border-subtle text-xs">
                <span className="text-text-muted font-mono flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-text-muted" /> Due: {proj.due_date}
                </span>
                <Link href="/tasks" className="text-brand-primary hover:underline font-semibold">
                  View Tasks &rarr;
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Project Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-canvas/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-surface-1 border border-border-strong p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-border-subtle pb-3">
              <h3 className="font-bold text-lg text-text-primary">Create New Project</h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded hover:bg-surface-2 text-text-muted">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-text-secondary mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ERP S/4HANA OData Connector Phase 2"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-text-secondary mb-1">Department</label>
                  <input
                    type="text"
                    value={formDept}
                    onChange={(e) => setFormDept(e.target.value)}
                    className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-text-secondary mb-1">Project Lead</label>
                  <select
                    value={formManager}
                    onChange={(e) => setFormManager(e.target.value)}
                    className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary"
                  >
                    <option>Sara Connor</option>
                    <option>Mike Ross</option>
                    <option>Eve Polastri</option>
                    <option>Jonas Kahn</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-text-secondary mb-1">Budget Allocation ($ USD)</label>
                  <input
                    type="number"
                    value={formBudget}
                    onChange={(e) => setFormBudget(e.target.value)}
                    className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-text-secondary mb-1">Target Completion Date</label>
                  <input
                    type="text"
                    value={formDue}
                    onChange={(e) => setFormDue(e.target.value)}
                    className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-text-secondary mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Goals, deliverables, and operational milestones..."
                  className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary"
                />
              </div>

              <div className="pt-4 border-t border-border-subtle flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-surface-2 text-text-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-brand-primary text-text-inverse font-bold shadow-glow-primary"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
