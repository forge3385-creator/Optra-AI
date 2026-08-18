'use client';

import React from 'react';
import {
  ListChecks, Plus, Filter, Calendar, LayoutGrid, Table as TableIcon,
  Clock, CheckCircle2, AlertCircle, User, Tag, ChevronRight, Play, X, Trash2, Search
} from 'lucide-react';
import { dataStore, TaskItem } from '../../../lib/data-store';

export default function TasksPage() {
  const [tasks, setTasks] = React.useState<TaskItem[]>([]);
  const [viewMode, setViewMode] = React.useState<'table' | 'kanban' | 'timeline'>('table');
  const [filterPriority, setFilterPriority] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);

  // Form State
  const [formTitle, setFormTitle] = React.useState('');
  const [formDesc, setFormDesc] = React.useState('');
  const [formProject, setFormProject] = React.useState('Vendor Onboarding Wave');
  const [formAssignee, setFormAssignee] = React.useState('Sara Connor');
  const [formPriority, setFormPriority] = React.useState<TaskItem['priority']>('medium');
  const [formDue, setFormDue] = React.useState('In 2 days');
  const [formTags, setFormTags] = React.useState('ops, urgent');

  React.useEffect(() => {
    const syncData = () => {
      setTasks(dataStore.listTasks());
    };
    syncData();
    return dataStore.subscribe(syncData);
  }, []);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    dataStore.createTask({
      title: formTitle,
      description: formDesc,
      project_name: formProject,
      assignee_name: formAssignee,
      priority: formPriority,
      due_label: formDue,
      tags: formTags.split(',').map((t) => t.trim()).filter(Boolean)
    });

    setFormTitle('');
    setFormDesc('');
    setModalOpen(false);
  };

  const handleStatusChange = (id: string, newStatus: TaskItem['status']) => {
    dataStore.updateTaskStatus(id, newStatus);
  };

  const handlePriorityChange = (id: string, newPriority: TaskItem['priority']) => {
    dataStore.updateTaskPriority(id, newPriority);
  };

  const handleDeleteTask = (id: string) => {
    if (confirm('Delete this task?')) {
      dataStore.deleteTask(id);
    }
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesPriority = filterPriority === 'all' || t.priority === filterPriority;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.project_name && t.project_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      t.assignee_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary flex items-center gap-2">
            <ListChecks className="h-6 w-6 text-brand-primary" /> Task & Work Management
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Track operational tasks, assignees, recurring schedules, and real-time state changes.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-semibold text-xs transition-all flex items-center gap-1.5 shadow-glow-primary"
        >
          <Plus className="h-4 w-4" /> New Task
        </button>
      </div>

      {/* View Mode Switcher & Filter Toolbar */}
      <div className="p-3 rounded-xl bg-surface-1 border border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <div className="flex bg-surface-2 p-1 rounded-lg border border-border-subtle">
          {[
            { id: 'table', label: 'Table View', icon: TableIcon },
            { id: 'kanban', label: 'Kanban Board', icon: LayoutGrid },
            { id: 'timeline', label: 'Timeline / Progress', icon: Clock }
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

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-56">
            <Search className="h-3.5 w-3.5 text-text-muted absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
              className="w-full pl-8 pr-3 py-1.5 bg-bg-input border border-border-default rounded-lg text-text-primary text-xs focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-text-muted">Priority:</span>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="bg-bg-input border border-border-default text-text-primary px-2.5 py-1.5 rounded-lg focus:outline-none text-xs"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* View Mode 1: Table View */}
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
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-text-muted">
                    No tasks found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-surface-2/60 transition-colors">
                    <td className="py-3.5 font-bold text-text-primary">
                      {task.title}
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {task.tags.map((t) => (
                          <span key={t} className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-surface-3 text-text-muted border border-border-subtle">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 text-text-secondary">{task.project_name || 'General Operations'}</td>
                    <td className="py-3.5 text-text-primary flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-brand-primary" /> {task.assignee_name}
                    </td>
                    <td className="py-3.5">
                      <select
                        value={task.priority}
                        onChange={(e) => handlePriorityChange(task.id, e.target.value as any)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border bg-transparent cursor-pointer ${
                          task.priority === 'critical' ? 'text-status-danger border-status-danger' :
                          task.priority === 'high' ? 'text-status-warning border-status-warning' : 'text-text-secondary border-border-subtle'
                        }`}
                      >
                        <option value="critical">Critical</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </td>
                    <td className="py-3.5">
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value as any)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border bg-transparent cursor-pointer ${
                          task.status === 'done' ? 'text-status-success border-status-success bg-status-success-bg/20' :
                          task.status === 'in_progress' ? 'text-brand-primary border-brand-primary' :
                          task.status === 'blocked' ? 'text-status-danger border-status-danger' : 'text-text-muted border-border-subtle'
                        }`}
                      >
                        <option value="todo">To Do</option>
                        <option value="in_progress">In Progress</option>
                        <option value="blocked">Blocked</option>
                        <option value="review">In Review</option>
                        <option value="done">Completed</option>
                      </select>
                    </td>
                    <td className="py-3.5 font-mono text-text-muted">{task.due_label}</td>
                    <td className="py-3.5 text-right font-mono font-bold text-brand-tertiary">
                      {task.progress}%
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-1.5 rounded hover:bg-surface-3 text-text-muted hover:text-status-danger transition-colors"
                        title="Delete Task"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* View Mode 2: Kanban Board */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {(['todo', 'in_progress', 'blocked', 'review', 'done'] as const).map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col);
            return (
              <div key={col} className="p-3 rounded-xl bg-surface-1 border border-border-subtle space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
                  <span className="font-bold text-xs capitalize text-text-primary">{col.replace('_', ' ')}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-surface-2 text-text-muted">
                    {colTasks.length}
                  </span>
                </div>

                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                  {colTasks.map((t) => (
                    <div
                      key={t.id}
                      className="p-3 rounded-lg bg-surface-2 border border-border-subtle space-y-2 text-xs hover:border-brand-primary transition-all shadow-sm"
                    >
                      <div className="flex justify-between items-start">
                        <p className="font-bold text-text-primary">{t.title}</p>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                          t.priority === 'critical' ? 'bg-status-danger-bg text-status-danger' :
                          t.priority === 'high' ? 'bg-status-warning-bg text-status-warning' : 'bg-surface-3 text-text-muted'
                        }`}>
                          {t.priority}
                        </span>
                      </div>
                      <p className="text-[10px] text-text-muted">{t.project_name}</p>

                      <div className="flex justify-between items-center text-[10px] text-text-secondary pt-2 border-t border-border-subtle">
                        <span>{t.assignee_name}</span>
                        <span className="font-mono text-brand-primary">{t.due_label}</span>
                      </div>

                      {/* Quick Shift Status Controls */}
                      <div className="flex gap-1 pt-1 justify-end">
                        {col !== 'done' && (
                          <button
                            onClick={() => handleStatusChange(t.id, 'done')}
                            className="px-2 py-0.5 rounded bg-status-success-bg text-status-success text-[10px] font-semibold hover:bg-status-success hover:text-text-inverse"
                          >
                            ✓ Done
                          </button>
                        )}
                        {col !== 'in_progress' && col !== 'done' && (
                          <button
                            onClick={() => handleStatusChange(t.id, 'in_progress')}
                            className="px-2 py-0.5 rounded bg-brand-primary/20 text-brand-primary text-[10px] font-semibold hover:bg-brand-primary hover:text-text-inverse"
                          >
                            ▶ Start
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* View Mode 3: Timeline Progress */}
      {viewMode === 'timeline' && (
        <div className="p-5 rounded-2xl bg-surface-1 border border-border-subtle space-y-4">
          <h2 className="text-sm font-bold text-text-primary">Task Progress & Delivery Timeline</h2>
          <div className="space-y-4">
            {filteredTasks.map((t) => (
              <div key={t.id} className="space-y-1.5 p-3 rounded-xl bg-surface-2 border border-border-subtle">
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-text-primary">{t.title}</span>
                    <span className="text-text-muted ml-2 font-mono text-[11px]">Due: {t.due_label}</span>
                  </div>
                  <span className="font-mono font-bold text-brand-primary">{t.progress}%</span>
                </div>
                <div className="w-full bg-surface-3 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      t.progress === 100 ? 'bg-status-success' : 'bg-brand-primary'
                    }`}
                    style={{ width: `${t.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Task Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-canvas/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-surface-1 border border-border-strong p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-border-subtle pb-3">
              <h3 className="font-bold text-lg text-text-primary">Create New Operational Task</h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded hover:bg-surface-2 text-text-muted">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-text-secondary mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Audit SAP Integration Logs & Token Refreshes"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block font-semibold text-text-secondary mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Provide context, required tools, and acceptance criteria..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-text-secondary mb-1">Project</label>
                  <input
                    type="text"
                    value={formProject}
                    onChange={(e) => setFormProject(e.target.value)}
                    className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-text-secondary mb-1">Assignee</label>
                  <select
                    value={formAssignee}
                    onChange={(e) => setFormAssignee(e.target.value)}
                    className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary"
                  >
                    <option>Sara Connor</option>
                    <option>Mike Ross</option>
                    <option>Eve Polastri</option>
                    <option>Jonas Kahn</option>
                    <option>Priya Sharma</option>
                    <option>Adam Wu</option>
                    <option>Lin Dan</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-text-secondary mb-1">Priority</label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as any)}
                    className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-text-secondary mb-1">Due Schedule</label>
                  <input
                    type="text"
                    value={formDue}
                    onChange={(e) => setFormDue(e.target.value)}
                    placeholder="e.g. Tomorrow, Aug 22"
                    className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-text-secondary mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="compliance, security, aws"
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
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
