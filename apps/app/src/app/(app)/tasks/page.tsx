'use client';

import React from 'react';
import {
  ListChecks, Plus, Filter, Calendar, LayoutGrid, Table as TableIcon,
  Clock, CheckCircle2, AlertCircle, User, Tag, ChevronRight, Play, X
} from 'lucide-react';

export default function TasksPage() {
  const [viewMode, setViewMode] = React.useState<'table' | 'kanban' | 'gantt' | 'calendar'>('table');
  const [modalOpen, setModalOpen] = React.useState(false);

  const tasks = [
    { id: 'tsk-1', title: 'Review Tax ID & Compliance Attachments', project: 'Vendor Onboarding Wave', assignee: 'Eve Polastri', priority: 'high', status: 'in_progress', due: 'Today', progress: 65, tags: ['compliance', 'vendor'] },
    { id: 'tsk-2', title: 'Provision AWS Cloud IAM Credentials', project: 'IT Infrastructure Scale', assignee: 'Jonas Kahn', priority: 'critical', status: 'todo', due: 'Tomorrow', progress: 0, tags: ['security', 'aws'] },
    { id: 'tsk-3', title: 'Draft Postmortem for DB Query Latency SEV2', project: 'Incident Resolution', assignee: 'Sara Connor', priority: 'medium', status: 'review', due: 'Aug 21', progress: 90, tags: ['incident', 'database'] },
    { id: 'tsk-4', title: 'Quarterly Financial Expenditure Reconciliation', project: 'Q3 Financial Audit', assignee: 'Mike Ross', priority: 'medium', status: 'done', due: 'Aug 18', progress: 100, tags: ['finance'] },
    { id: 'tsk-5', title: 'Update Customer Complaint Escalation Matrix SOP', project: 'Customer Ops', assignee: 'Priya Sharma', priority: 'low', status: 'blocked', due: 'Aug 24', progress: 20, tags: ['sop', 'docs'] }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary flex items-center gap-2">
            <ListChecks className="h-6 w-6 text-brand-primary" /> Task & Work Management
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Track operational tasks, assignees, recurring schedules, and time entries.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-semibold text-xs transition-all flex items-center gap-1.5 shadow-glow-primary"
        >
          <Plus className="h-4 w-4" /> New Task (⌘N)
        </button>
      </div>

      {/* View Mode Switcher Toolbar */}
      <div className="p-3 rounded-xl bg-surface-1 border border-border-subtle flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
        <div className="flex bg-surface-2 p-1 rounded-lg border border-border-subtle">
          {[
            { id: 'table', label: 'Table View', icon: TableIcon },
            { id: 'kanban', label: 'Kanban Board', icon: LayoutGrid },
            { id: 'gantt', label: 'Gantt Timeline', icon: Clock },
            { id: 'calendar', label: 'Calendar', icon: Calendar }
          ].map((v) => {
            const Icon = v.icon;
            return (
              <button
                key={v.id}
                onClick={() => setViewMode(v.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all ${
                  viewMode === v.id ? 'bg-brand-primary text-text-inverse shadow-sm' : 'text-text-muted hover:text-text-primary'
                }`}
              >
                <Icon className="h-3.5 w-3.5" /> {v.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-text-muted">Filter by Priority:</span>
          <select className="bg-bg-input border border-border-default text-text-primary px-2.5 py-1 rounded-lg focus:outline-none">
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
          </select>
        </div>
      </div>

      {/* View Mode 1: Table (AG Grid simulation) */}
      {viewMode === 'table' && (
        <div className="p-5 rounded-2xl bg-surface-1 border border-border-subtle overflow-x-auto shadow-sm">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border-subtle text-text-muted font-semibold">
                <th className="pb-3">Task Title</th>
                <th className="pb-3">Project</th>
                <th className="pb-3">Assignee</th>
                <th className="pb-3">Priority</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Due Date</th>
                <th className="pb-3 text-right">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-surface-2/60 transition-colors">
                  <td className="py-3.5 font-bold text-text-primary">
                    {task.title}
                    <div className="flex gap-1 mt-1">
                      {task.tags.map((t) => (
                        <span key={t} className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-surface-3 text-text-muted border border-border-subtle">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 text-text-secondary">{task.project}</td>
                  <td className="py-3.5 text-text-primary flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-brand-primary" /> {task.assignee}
                  </td>
                  <td className="py-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      task.priority === 'critical' ? 'bg-status-danger-bg text-status-danger' :
                      task.priority === 'high' ? 'bg-status-warning-bg text-status-warning' : 'bg-surface-2 text-text-secondary'
                    }`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      task.status === 'done' ? 'bg-status-success-bg text-status-success' :
                      task.status === 'in_progress' ? 'bg-brand-primary/20 text-brand-primary' :
                      task.status === 'blocked' ? 'bg-status-danger-bg text-status-danger' : 'bg-surface-2 text-text-muted'
                    }`}>
                      {task.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 font-mono text-text-muted">{task.due}</td>
                  <td className="py-3.5 text-right font-mono font-bold text-brand-tertiary">
                    {task.progress}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Mode 2: Kanban Board */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {(['todo', 'in_progress', 'blocked', 'review', 'done'] as const).map((col) => {
            const colTasks = tasks.filter((t) => t.status === col);
            return (
              <div key={col} className="p-3 rounded-xl bg-surface-1 border border-border-subtle space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
                  <span className="font-bold text-xs capitalize text-text-primary">{col.replace('_', ' ')}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-surface-2 text-text-muted">{colTasks.length}</span>
                </div>

                <div className="space-y-2">
                  {colTasks.map((t) => (
                    <div key={t.id} className="p-3 rounded-lg bg-surface-2 border border-border-subtle space-y-2 text-xs hover:border-brand-primary transition-all">
                      <p className="font-bold text-text-primary">{t.title}</p>
                      <p className="text-[10px] text-text-muted">{t.project}</p>
                      <div className="flex justify-between items-center text-[10px] text-text-secondary pt-1 border-t border-border-subtle">
                        <span>{t.assignee}</span>
                        <span className="font-mono text-brand-primary">{t.due}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* New Task Modal (⌘N) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-canvas/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-surface-1 border border-border-strong p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-border-subtle pb-3">
              <h3 className="font-bold text-lg text-text-primary">Create New Task</h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded hover:bg-surface-2 text-text-muted">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-text-secondary mb-1">Task Title</label>
                <input type="text" placeholder="e.g. Audit SAP Integration Logs" className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-text-secondary mb-1">Assignee</label>
                  <select className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary">
                    <option>Sara Connor</option>
                    <option>Mike Ross</option>
                    <option>Eve Polastri</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-text-secondary mb-1">Priority</label>
                  <select className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary">
                    <option>medium</option>
                    <option>high</option>
                    <option>critical</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border-subtle flex justify-end gap-2 text-xs">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg bg-surface-2 text-text-secondary">Cancel</button>
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg bg-brand-primary text-text-inverse font-bold">Create Task</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
