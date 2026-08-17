'use client';

import React from 'react';
import Link from 'next/link';
import { BarChart3, Plus, Database, Layers, ArrowRight, Download, Filter } from 'lucide-react';

export default function BusinessIntelligencePage() {
  const dashboards = [
    { title: 'Executive Overview Dashboard', role: 'company_admin', charts: 6, updated: 'Hourly', desc: 'Overall SLA compliance, process throughput, departmental cost variance, and executive KPI ribbon.' },
    { title: 'Department Performance & Approvals', role: 'operations_manager', charts: 5, updated: 'Hourly', desc: 'Approval bottleneck analysis, team task completion rates, and active SLA countdowns.' },
    { title: 'Team Workload & Task Distribution', role: 'team_lead', charts: 4, updated: 'Hourly', desc: 'Per-member capacity allocation, completed tasks vs estimates, and blocked item count.' },
    { title: 'Audit Log & Policy Compliance Explorer', role: 'compliance_officer', charts: 4, updated: 'Daily', desc: 'Immutable audit log trends, security policy violations, and RLS tenant verification events.' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-brand-primary" /> Business Intelligence & Analytics
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Drag-and-drop dashboard builder over PostgreSQL analytics star schema warehouse.
          </p>
        </div>

        <Link
          href="/bi/builder"
          className="px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-semibold text-xs transition-all flex items-center gap-1.5 shadow-glow-primary"
        >
          <Plus className="h-4 w-4" /> Open Drag-and-Drop Builder
        </Link>
      </div>

      {/* Star Schema Data Warehouse Summary */}
      <div className="p-4 rounded-xl bg-surface-1 border border-border-subtle flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-brand-tertiary" />
          <span className="text-text-primary font-bold">Analytics Star Schema:</span>
          <span className="text-text-muted">fact_workflow_run, fact_task_completion, fact_approval_decision, fact_incident</span>
        </div>
        <span className="text-status-success bg-status-success-bg px-2 py-0.5 rounded font-bold">Materialized Views Refreshed Hourly</span>
      </div>

      {/* Role-Based Default Dashboards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dashboards.map((dash, i) => (
          <div key={i} className="p-5 rounded-2xl bg-surface-1 border border-border-subtle hover:border-brand-primary/40 transition-all space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-surface-2 text-brand-primary border border-border-subtle">Role: {dash.role}</span>
                <span className="text-text-muted text-[11px] font-mono">{dash.charts} Charts · {dash.updated}</span>
              </div>

              <h3 className="font-bold text-base text-text-primary">{dash.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{dash.desc}</p>
            </div>

            <div className="pt-4 border-t border-border-subtle flex justify-between items-center text-xs">
              <button
                onClick={() => alert(`Exported ${dash.title} as PDF/CSV report!`)}
                className="px-3 py-1.5 rounded-lg bg-surface-2 hover:bg-surface-3 border border-border-subtle text-text-secondary hover:text-text-primary flex items-center gap-1 font-semibold"
              >
                <Download className="h-3.5 w-3.5" /> Export Report
              </button>
              <Link href="/bi/builder" className="text-brand-primary font-bold hover:underline flex items-center gap-1">
                View Dashboard <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
