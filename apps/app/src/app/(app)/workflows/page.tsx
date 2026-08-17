'use client';

import React from 'react';
import Link from 'next/link';
import { Workflow, Plus, Play, CheckCircle2, ShieldCheck, Sparkles, FileText, Zap, AlertTriangle, Layers } from 'lucide-react';

export default function WorkflowsPage() {
  const [tab, setTab] = React.useState<'active' | 'templates' | 'versions'>('active');

  const activeWorkflows = [
    {
      id: 'wf-1',
      name: 'Vendor Onboarding & Compliance Validation',
      version: 3,
      status: 'published',
      nodesCount: 9,
      slaMinutes: 1440,
      runsThisMonth: 342,
      lastRun: '12 minutes ago'
    },
    {
      id: 'wf-2',
      name: 'IT Access & Privilege Grant Request',
      version: 2,
      status: 'published',
      nodesCount: 7,
      slaMinutes: 480,
      runsThisMonth: 890,
      lastRun: '2 hours ago'
    },
    {
      id: 'wf-3',
      name: 'Customer Complaint AI Triage & Resolution',
      version: 5,
      status: 'published',
      nodesCount: 6,
      slaMinutes: 120,
      runsThisMonth: 1240,
      lastRun: '4 minutes ago'
    },
    {
      id: 'wf-4',
      name: 'Quarterly Financial Expenditure Signoff',
      version: 1,
      status: 'draft',
      nodesCount: 12,
      slaMinutes: 2880,
      runsThisMonth: 45,
      lastRun: '1 day ago'
    }
  ];

  const templates = [
    { name: 'Vendor Onboarding', nodes: 9, category: 'Procurement', desc: 'Form -> AI Compliance -> Manager -> CFO Approval -> SAP PO Creation' },
    { name: 'IT Access Request', nodes: 7, category: 'IT & Security', desc: 'Form -> Security Officer Approval -> Okta Provisioning -> Slack Notify' },
    { name: 'Customer Complaint Triage', nodes: 6, category: 'Customer Ops', desc: 'Form -> LLM Sentiment & Dept Route -> Manager Approval -> Resolution' },
    { name: 'Quarterly Compliance Review', nodes: 11, category: 'Legal & Risk', desc: 'Document Trigger -> AI Requirements Extraction -> Legal Audit' },
    { name: 'New Hire Onboarding Wave', nodes: 8, category: 'HR Ops', desc: 'HRIS Trigger -> Equipment Provisioning -> Manager Welcome -> Setup' },
    { name: 'Marketing Campaign Signoff', nodes: 5, category: 'Marketing', desc: 'Brief Form -> Budget Gate -> CMO Approval -> Task Creation' }
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
            Build, validate, simulate and deploy automated operational graphs.
          </p>
        </div>

        <Link
          href="/workflows/new"
          className="px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-semibold text-xs transition-all flex items-center gap-1.5 shadow-glow-primary"
        >
          <Plus className="h-4 w-4" /> Build New Workflow
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border-subtle gap-6 text-xs font-semibold text-text-muted">
        <button
          onClick={() => setTab('active')}
          className={`pb-3 transition-colors ${tab === 'active' ? 'border-b-2 border-brand-primary text-brand-primary' : 'hover:text-text-primary'}`}
        >
          Active Workflows ({activeWorkflows.length})
        </button>
        <button
          onClick={() => setTab('templates')}
          className={`pb-3 transition-colors ${tab === 'templates' ? 'border-b-2 border-brand-primary text-brand-primary' : 'hover:text-text-primary'}`}
        >
          Template Gallery (20)
        </button>
      </div>

      {/* Active Workflows Grid */}
      {tab === 'active' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeWorkflows.map((wf) => (
            <div key={wf.id} className="p-5 rounded-2xl bg-surface-1 border border-border-subtle hover:border-brand-primary/40 transition-all space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono text-brand-tertiary">v{wf.version}.0</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    wf.status === 'published' ? 'bg-status-success-bg text-status-success' : 'bg-status-warning-bg text-status-warning'
                  }`}>
                    {wf.status}
                  </span>
                </div>
                <h3 className="font-bold text-base text-text-primary">{wf.name}</h3>
                <p className="text-xs text-text-muted">
                  {wf.nodesCount} nodes graph · SLA target {wf.slaMinutes / 60}h · {wf.runsThisMonth} executions this month
                </p>
              </div>

              <div className="pt-4 border-t border-border-subtle flex justify-between items-center text-xs">
                <span className="text-text-muted">Last run {wf.lastRun}</span>
                <div className="flex gap-2">
                  <Link
                    href={`/workflows/${wf.id}`}
                    className="px-3 py-1.5 rounded-lg bg-surface-2 hover:bg-surface-3 border border-border-subtle text-text-primary font-semibold transition-all"
                  >
                    Edit Graph
                  </Link>
                  <button className="px-3 py-1.5 rounded-lg bg-brand-primary text-text-inverse font-semibold hover:bg-brand-primary-hover transition-all flex items-center gap-1">
                    <Play className="h-3.5 w-3.5 fill-current" /> Run Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Template Gallery Tab */}
      {tab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((tpl, i) => (
            <div key={i} className="p-5 rounded-2xl bg-surface-1 border border-border-subtle hover:border-brand-primary/40 transition-all space-y-3">
              <div className="flex justify-between items-center">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-2 text-brand-primary border border-border-subtle">{tpl.category}</span>
                <span className="text-xs text-text-muted">{tpl.nodes} Nodes</span>
              </div>
              <h3 className="font-bold text-sm text-text-primary">{tpl.name}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{tpl.desc}</p>
              <button className="w-full mt-2 py-2 rounded-lg bg-surface-2 border border-border-default hover:bg-brand-primary hover:text-text-inverse hover:border-brand-primary text-xs font-semibold text-text-primary transition-all flex items-center justify-center gap-1">
                <Zap className="h-3.5 w-3.5" /> 1-Click Import Template
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
