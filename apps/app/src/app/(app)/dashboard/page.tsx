'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles, ShieldCheck, AlertTriangle, ArrowUpRight, TrendingUp,
  Clock, CheckCircle2, Workflow, Users, Activity, Play, ChevronRight
} from 'lucide-react';

export default function ExecutiveDashboard() {
  const [opStatusTab, setOpStatusTab] = React.useState<'open' | 'delayed' | 'at_risk'>('open');

  const kpis = [
    { title: 'SLA Compliance Rate', val: '96.4%', target: '95%', trend: '+2.1%', status: 'success' },
    { title: 'Process Duration', val: '4.2 days', target: '5.0d', trend: '-0.8d', status: 'success' },
    { title: 'Workflow Success', val: '99.1%', target: '99%', trend: '0.0%', status: 'info' },
    { title: 'Operational Cost', val: '$1.32 / run', target: '$1.50', trend: '-$0.18', status: 'success' }
  ];

  const recommendations = [
    {
      id: 'r1',
      severity: 'high',
      title: 'Workflow Vendor Onboarding has 78% breach probability.',
      desc: 'Step "Finance Review" is bottlenecked due to single approver.',
      actions: ['Review Policy', 'Snooze 24h']
    },
    {
      id: 'r2',
      severity: 'medium',
      title: 'Dept Marketing workload is 1.7σ above capacity.',
      desc: '3 team members assigned > 45h task volume this week.',
      actions: ['Rebalance Tasks']
    },
    {
      id: 'r3',
      severity: 'info',
      title: 'Auto-resolved: 14 inbound approvals were not actionable.',
      desc: 'Flagged for automatic policy threshold adjustment.',
      actions: ['View Log']
    }
  ];

  const opStatusItems = [
    { name: 'Vendor Onboarding #1042', stage: 'Finance Review', owner: 'Mike Ross', countdown: '4h 12m', status: 'On Track', spark: [40, 60, 80, 95] },
    { name: 'IT Access Request #892', stage: 'Security Officer', owner: 'Eve Polastri', countdown: '1h 05m', status: 'At Risk', spark: [20, 30, 45, 50] },
    { name: 'Customer Complaint #401', stage: 'Ops Triage', owner: 'Priya Sharma', countdown: '12m', status: 'Breached', spark: [80, 40, 20, 10] },
    { name: 'Quarterly Compliance Audit', stage: 'Legal Signoff', owner: 'Aria Stark', countdown: '2d 4h', status: 'On Track', spark: [30, 50, 70, 90] }
  ];

  const pendingApprovals = [
    { id: 'ap1', title: 'SAP Purchase Order $12,500', requester: 'Jonas Kahn', dept: 'Customer Ops', sla: '2h remaining' },
    { id: 'ap2', title: 'AWS Cloud Credit Request $5,000', requester: 'Adam Wu', dept: 'Engineering', sla: '5h remaining' },
    { id: 'ap3', title: 'New Hire Access Setup - Senior Engineer', requester: 'Lin Dan', dept: 'HR Ops', sla: '1d remaining' }
  ];

  const workflowRuns = [
    { name: 'Vendor Onboarding Engine', progress: 85, status: 'running', steps: '5 / 6 steps' },
    { name: 'IT Provisioning Pipeline', progress: 40, status: 'running', steps: '2 / 5 steps' },
    { name: 'Customer Complaint Routing', progress: 100, status: 'completed', steps: '4 / 4 steps' },
    { name: 'Monthly Financial Audit', progress: 20, status: 'paused', steps: '1 / 5 steps' }
  ];

  return (
    <div className="space-y-6">
      {/* 13.1 Greeting Strip */}
      <div className="p-6 rounded-2xl bg-surface-1 border border-border-subtle flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary flex items-center gap-2">
            Good morning, Sara <span className="text-sm font-normal text-text-muted">👋</span>
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Tuesday, August 19 — <span className="font-semibold text-brand-primary">14 active workflows</span> · <span className="font-semibold text-status-warning">3 approvals awaiting you</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/workflows/new"
            className="px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-semibold text-xs transition-all flex items-center gap-1.5 shadow-glow-primary"
          >
            + Create Workflow
          </Link>
        </div>
      </div>

      {/* 13.2 Executive KPI Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-surface-1 border border-border-subtle hover:border-border-strong transition-all space-y-2">
            <div className="flex justify-between items-center text-xs text-text-muted">
              <span>{kpi.title}</span>
              <span className="text-[11px] font-mono text-text-secondary">Target {kpi.target}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-text-primary tracking-tight">{kpi.val}</span>
              <span className="text-xs font-bold text-status-success bg-status-success-bg px-2 py-0.5 rounded flex items-center gap-0.5">
                <TrendingUp className="h-3 w-3" /> {kpi.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 13.3 AI Recommendations Card */}
      <div className="p-5 rounded-2xl bg-surface-1 border border-brand-primary/40 shadow-glow-primary space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-brand-primary animate-pulse" />
            <h3 className="font-bold text-sm text-text-primary">AI Copilot Recommendations</h3>
          </div>
          <span className="text-xs text-brand-tertiary font-mono">3 Signals Active</span>
        </div>

        <div className="space-y-3">
          {recommendations.map((rec) => (
            <div key={rec.id} className="p-3 rounded-xl bg-surface-2 border border-border-subtle flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
              <div className="flex items-start gap-2.5">
                {rec.severity === 'high' ? (
                  <AlertTriangle className="h-4 w-4 text-status-danger shrink-0 mt-0.5" />
                ) : rec.severity === 'medium' ? (
                  <AlertTriangle className="h-4 w-4 text-status-warning shrink-0 mt-0.5" />
                ) : (
                  <Sparkles className="h-4 w-4 text-brand-tertiary shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-semibold text-text-primary">{rec.title}</p>
                  <p className="text-text-muted">{rec.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {rec.actions.map((act, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                      i === 0
                        ? 'bg-brand-primary text-text-inverse hover:bg-brand-primary-hover'
                        : 'bg-surface-3 border border-border-subtle text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {act}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two-Column Grid (60% / 40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - 60% */}
        <div className="lg:col-span-7 space-y-6">
          {/* 13.4 Operational Status */}
          <div className="p-5 rounded-2xl bg-surface-1 border border-border-subtle space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-text-primary">Operational Status</h3>
              <div className="flex bg-surface-2 p-1 rounded-lg border border-border-subtle text-xs">
                {(['open', 'delayed', 'at_risk'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setOpStatusTab(t)}
                    className={`px-3 py-1 rounded-md capitalize transition-all ${
                      opStatusTab === t ? 'bg-brand-primary text-text-inverse font-semibold' : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    {t.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border-subtle text-text-muted">
                    <th className="pb-2 font-semibold">Workflow / Process</th>
                    <th className="pb-2 font-semibold">Stage Owner</th>
                    <th className="pb-2 font-semibold">SLA Countdown</th>
                    <th className="pb-2 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {opStatusItems.map((item, i) => (
                    <tr key={i} className="hover:bg-surface-2/60 transition-colors">
                      <td className="py-3 font-semibold text-text-primary">{item.name}</td>
                      <td className="py-3 text-text-secondary">{item.owner}</td>
                      <td className="py-3 font-mono text-text-muted">{item.countdown}</td>
                      <td className="py-3 text-right">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.status === 'On Track' ? 'bg-status-success-bg text-status-success' :
                          item.status === 'At Risk' ? 'bg-status-warning-bg text-status-warning' : 'bg-status-danger-bg text-status-danger'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 13.6 Approval Inbox (Sticky) */}
          <div className="p-5 rounded-2xl bg-surface-1 border border-border-subtle space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-text-primary flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-brand-primary" /> Approval Inbox
              </h3>
              <Link href="/approvals" className="text-xs text-brand-primary hover:underline">View All (3)</Link>
            </div>

            <div className="space-y-3">
              {pendingApprovals.map((ap) => (
                <div key={ap.id} className="p-3 rounded-xl bg-surface-2 border border-border-subtle flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-text-primary">{ap.title}</p>
                    <p className="text-text-muted">{ap.requester} • {ap.dept} • <span className="text-status-warning">{ap.sla}</span></p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 rounded-lg bg-status-success text-text-inverse font-bold hover:opacity-90">Approve</button>
                    <button className="px-3 py-1.5 rounded-lg bg-surface-3 border border-border-subtle text-text-secondary hover:text-text-primary">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - 40% */}
        <div className="lg:col-span-5 space-y-6">
          {/* 13.7 Active Workflow Runs */}
          <div className="p-5 rounded-2xl bg-surface-1 border border-border-subtle space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-text-primary flex items-center gap-2">
                <Workflow className="h-4 w-4 text-brand-tertiary" /> Active Workflow Runs
              </h3>
              <span className="text-xs text-text-muted">Live WS</span>
            </div>

            <div className="space-y-4">
              {workflowRuns.map((run, i) => (
                <div key={i} className="space-y-1 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span className="text-text-primary">{run.name}</span>
                    <span className="text-text-muted">{run.steps}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-surface-2 overflow-hidden">
                    <div
                      style={{ width: `${run.progress}%` }}
                      className={`h-full rounded-full transition-all duration-500 ${
                        run.status === 'completed' ? 'bg-status-success' :
                        run.status === 'paused' ? 'bg-status-warning' : 'bg-brand-primary'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 13.8 SLA Health Donut summary */}
          <div className="p-5 rounded-2xl bg-surface-1 border border-border-subtle space-y-4">
            <h3 className="font-bold text-sm text-text-primary">SLA Health Overview</h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-surface-2 border border-border-subtle">
                <span className="text-text-muted">On Track</span>
                <p className="text-xl font-bold text-status-success">76%</p>
              </div>
              <div className="p-3 rounded-xl bg-surface-2 border border-border-subtle">
                <span className="text-text-muted">At Risk</span>
                <p className="text-xl font-bold text-status-warning">14%</p>
              </div>
              <div className="p-3 rounded-xl bg-surface-2 border border-border-subtle">
                <span className="text-text-muted">Breached</span>
                <p className="text-xl font-bold text-status-danger">4%</p>
              </div>
              <div className="p-3 rounded-xl bg-surface-2 border border-border-subtle">
                <span className="text-text-muted">Paused</span>
                <p className="text-xl font-bold text-status-info">6%</p>
              </div>
            </div>
          </div>

          {/* 13.9 On-call / On-shift Panel */}
          <div className="p-5 rounded-2xl bg-surface-1 border border-border-subtle space-y-4">
            <h3 className="font-bold text-sm text-text-primary flex items-center gap-2">
              <Users className="h-4 w-4 text-brand-secondary" /> On-Call Duty & Shift Status
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-2 border border-border-subtle">
                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded-full bg-brand-primary text-text-inverse font-bold flex items-center justify-center">MR</div>
                  <div>
                    <p className="font-semibold text-text-primary">Mike Ross</p>
                    <p className="text-text-muted">Ops Manager • Shift ends 18:00</p>
                  </div>
                </div>
                <span className="text-status-success font-semibold">ON DUTY</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-2 border border-border-subtle">
                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded-full bg-brand-secondary text-text-inverse font-bold flex items-center justify-center">EP</div>
                  <div>
                    <p className="font-semibold text-text-primary">Eve Polastri</p>
                    <p className="text-text-muted">Compliance • Shift ends 20:00</p>
                  </div>
                </div>
                <span className="text-status-success font-semibold">ON DUTY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
