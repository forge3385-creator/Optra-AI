'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Workflow, Plus, Play, CheckCircle2, ShieldCheck, Sparkles, FileText, Zap, AlertTriangle, Layers, X, Clock, Settings } from 'lucide-react';
import { dataStore, WorkflowItem } from '../../../lib/data-store';

export default function WorkflowsPage() {
  const router = useRouter();
  const [workflows, setWorkflows] = React.useState<WorkflowItem[]>([]);
  const [tab, setTab] = React.useState<'active' | 'templates'>('active');
  const [modalOpen, setModalOpen] = React.useState(false);

  // Form State
  const [formName, setFormName] = React.useState('');
  const [formCategory, setFormCategory] = React.useState('Operations');
  const [formSla, setFormSla] = React.useState('1440');
  const [formDesc, setFormDesc] = React.useState('');

  React.useEffect(() => {
    const syncData = () => {
      setWorkflows(dataStore.listWorkflows());
    };
    syncData();
    return dataStore.subscribe(syncData);
  }, []);

  const handleExecute = (id: string, name: string) => {
    const res = dataStore.executeWorkflow(id);
    if (res.success) {
      alert(`🚀 Execution Run #${res.run_id} initiated for "${name}". Linked task created in pipeline.`);
    }
  };

  const handleCreateWorkflow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const created = dataStore.createWorkflow({
      name: formName,
      description: formDesc,
      category: formCategory,
      sla_minutes: parseInt(formSla) || 1440
    });

    setFormName('');
    setFormDesc('');
    setModalOpen(false);
    router.push(`/workflows/${created.id}`);
  };

  const handleUseTemplate = (tmpl: any) => {
    const created = dataStore.createWorkflow({
      name: `${tmpl.name} (Automated)`,
      description: tmpl.desc,
      category: tmpl.category,
      sla_minutes: 720
    });
    setTab('active');
    router.push(`/workflows/${created.id}`);
  };

  const templates = [
    { name: 'Vendor Onboarding & Compliance', nodes: 7, category: 'Procurement', desc: 'Form -> AI Compliance -> Manager -> CFO Approval -> SAP PO Creation' },
    { name: 'IT Access & Privilege Grant', nodes: 5, category: 'IT & Security', desc: 'Form -> Security Officer Approval -> Okta Provisioning -> Slack Notify' },
    { name: 'Customer Complaint AI Triage', nodes: 6, category: 'Customer Ops', desc: 'Form -> LLM Sentiment & Dept Route -> Manager Approval -> Resolution' },
    { name: 'Quarterly Financial Expenditure', nodes: 8, category: 'Finance', desc: 'Budget Trigger -> Variance Analysis -> Controller Signoff -> ERP Entry' },
    { name: 'New Hire Onboarding Wave', nodes: 8, category: 'HR Ops', desc: 'HRIS Trigger -> Equipment Provisioning -> Manager Welcome -> Setup' },
    { name: 'Security Incident Automated Containment', nodes: 6, category: 'Security', desc: 'SIEM Alert -> Isolate Host -> Page On-Call -> Create Postmortem' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary flex items-center gap-2">
            <Workflow className="h-6 w-6 text-brand-primary" /> Visual Workflow Engine
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Build, validate, simulate, and trigger automated operational execution graphs.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-semibold text-xs transition-all flex items-center gap-1.5 shadow-glow-primary"
        >
          <Plus className="h-4 w-4" /> Build New Workflow
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border-subtle gap-6 text-xs font-semibold text-text-muted">
        <button
          onClick={() => setTab('active')}
          className={`pb-3 transition-colors ${tab === 'active' ? 'border-b-2 border-brand-primary text-brand-primary' : 'hover:text-text-primary'}`}
        >
          Active Workflows ({workflows.length})
        </button>
        <button
          onClick={() => setTab('templates')}
          className={`pb-3 transition-colors ${tab === 'templates' ? 'border-b-2 border-brand-primary text-brand-primary' : 'hover:text-text-primary'}`}
        >
          Template Gallery ({templates.length})
        </button>
      </div>

      {/* Tab 1: Active Workflows Grid */}
      {tab === 'active' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workflows.map((wf) => (
            <div
              key={wf.id}
              className="p-5 rounded-2xl bg-surface-1 border border-border-subtle hover:border-brand-primary/40 transition-all flex flex-col justify-between gap-4 shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-base text-text-primary">{wf.name}</h3>
                    <p className="text-xs text-text-muted mt-0.5">{wf.description}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                    wf.status === 'published' ? 'bg-status-success-bg text-status-success' : 'bg-surface-2 text-text-muted'
                  }`}>
                    v{wf.version}.0 • {wf.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 text-xs">
                  <div className="p-2 rounded-lg bg-surface-2">
                    <p className="text-[10px] text-text-muted">Nodes</p>
                    <p className="font-bold text-text-primary mt-0.5">{wf.nodes_count} steps</p>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-2">
                    <p className="text-[10px] text-text-muted">SLA Limit</p>
                    <p className="font-bold text-text-primary mt-0.5">{Math.round(wf.sla_minutes / 60)} hours</p>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-2">
                    <p className="text-[10px] text-text-muted">Runs This Month</p>
                    <p className="font-mono font-bold text-brand-tertiary mt-0.5">{wf.runs_this_month}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border-subtle text-xs">
                <span className="text-[11px] text-text-muted font-mono flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Last run: {wf.last_run}
                </span>

                <div className="flex gap-2">
                  <Link
                    href={`/workflows/${wf.id}`}
                    className="px-3 py-1.5 rounded-lg bg-surface-2 hover:bg-surface-3 text-text-primary font-semibold flex items-center gap-1"
                  >
                    <Settings className="h-3.5 w-3.5" /> Edit Graph
                  </Link>
                  <button
                    onClick={() => handleExecute(wf.id, wf.name)}
                    className="px-3 py-1.5 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-bold flex items-center gap-1 shadow-glow-primary transition-all"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" /> Run Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Template Gallery */}
      {tab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {templates.map((tmpl, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-surface-1 border border-border-subtle hover:border-brand-primary transition-all flex flex-col justify-between gap-4 text-xs shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-2 text-brand-primary uppercase">
                    {tmpl.category}
                  </span>
                  <span className="text-text-muted font-mono text-[11px]">{tmpl.nodes} nodes</span>
                </div>
                <h3 className="font-bold text-sm text-text-primary">{tmpl.name}</h3>
                <p className="text-text-secondary leading-relaxed">{tmpl.desc}</p>
              </div>

              <button
                onClick={() => handleUseTemplate(tmpl)}
                className="w-full py-2 rounded-lg bg-surface-2 hover:bg-brand-primary hover:text-text-inverse font-bold text-text-primary transition-all flex items-center justify-center gap-1.5"
              >
                <Plus className="h-3.5 w-3.5" /> Use This Template
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Build New Workflow Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-canvas/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-surface-1 border border-border-strong p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-border-subtle pb-3">
              <h3 className="font-bold text-lg text-text-primary">Create New Automated Workflow</h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded hover:bg-surface-2 text-text-muted">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateWorkflow} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-text-secondary mb-1">Workflow Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Employee Equipment Provisioning & MDM Enrollment"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-text-secondary mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary"
                  >
                    <option>Operations</option>
                    <option>Procurement</option>
                    <option>IT & Security</option>
                    <option>Finance</option>
                    <option>HR Ops</option>
                    <option>Customer Ops</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-text-secondary mb-1">Target SLA (Minutes)</label>
                  <input
                    type="number"
                    value={formSla}
                    onChange={(e) => setFormSla(e.target.value)}
                    className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-text-secondary mb-1">Description / Trigger Criteria</label>
                <textarea
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Describe entry event triggers, approval rules, and target deliverables..."
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
                  Create & Launch Editor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
