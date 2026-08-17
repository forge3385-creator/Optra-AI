'use client';

import React from 'react';
import Link from 'next/link';
import { KanbanSquare, Plus, Calendar, DollarSign, Users, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function ProjectsPage() {
  const projects = [
    {
      id: 'proj-1',
      name: 'Vendor Onboarding Digital Transformation',
      manager: 'Sara Connor',
      dept: 'Operations',
      budget: '$45,000',
      actual: '$38,200',
      status: 'active',
      milestones: 4,
      completedMilestones: 3,
      dueDate: 'Sep 30, 2026'
    },
    {
      id: 'proj-2',
      name: 'Q3 Enterprise Security Audit & SOC2 Renewal',
      manager: 'Eve Polastri',
      dept: 'Security',
      budget: '$20,000',
      actual: '$19,500',
      status: 'active',
      milestones: 3,
      completedMilestones: 2,
      dueDate: 'Oct 15, 2026'
    },
    {
      id: 'proj-3',
      name: 'SAP S/4HANA OData Connector Migration',
      manager: 'Mike Ross',
      dept: 'IT Systems',
      budget: '$60,000',
      actual: '$64,100',
      status: 'at_risk',
      milestones: 5,
      completedMilestones: 3,
      dueDate: 'Aug 31, 2026'
    }
  ];

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

        <button className="px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-semibold text-xs transition-all flex items-center gap-1.5 shadow-glow-primary">
          <Plus className="h-4 w-4" /> New Project
        </button>
      </div>

      {/* Top KPI Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-surface-1 border border-border-subtle">
          <span className="text-text-muted">Active Operational Projects</span>
          <p className="text-2xl font-extrabold text-text-primary mt-1">3 Projects</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-1 border border-border-subtle">
          <span className="text-text-muted">Avg Budget Variance</span>
          <p className="text-2xl font-extrabold text-status-success mt-1">+4.2% Under Budget</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-1 border border-border-subtle">
          <span className="text-text-muted">Milestone Hit Rate</span>
          <p className="text-2xl font-extrabold text-brand-primary mt-1">88.9%</p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div key={proj.id} className="p-5 rounded-2xl bg-surface-1 border border-border-subtle space-y-4 shadow-sm hover:border-brand-primary/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-2 text-brand-tertiary border border-border-subtle">{proj.dept}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  proj.status === 'active' ? 'bg-status-success-bg text-status-success' : 'bg-status-warning-bg text-status-warning'
                }`}>
                  {proj.status.replace('_', ' ')}
                </span>
              </div>

              <h3 className="font-bold text-base text-text-primary">{proj.name}</h3>
              <p className="text-xs text-text-muted">Manager: <span className="text-text-secondary">{proj.manager}</span></p>

              {/* Progress Bar */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-[11px]">
                  <span className="text-text-muted">Milestones Completed</span>
                  <span className="font-mono text-brand-primary font-bold">{proj.completedMilestones} / {proj.milestones}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-surface-2 overflow-hidden">
                  <div style={{ width: `${(proj.completedMilestones / proj.milestones) * 100}%` }} className="h-full bg-brand-primary rounded-full" />
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-2 border border-border-subtle flex justify-between text-xs font-mono">
                <div>
                  <span className="text-[10px] text-text-muted block">Budget</span>
                  <span className="text-text-primary font-bold">{proj.budget}</span>
                </div>
                <div>
                  <span className="text-[10px] text-text-muted block">Spent</span>
                  <span className="text-brand-tertiary font-bold">{proj.actual}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border-subtle flex justify-between items-center text-xs">
              <span className="text-text-muted font-mono">{proj.dueDate}</span>
              <Link href={`/projects/${proj.id}`} className="text-brand-primary font-semibold hover:underline">
                View Project →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
