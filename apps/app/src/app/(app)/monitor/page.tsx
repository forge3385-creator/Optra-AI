'use client';

import React from 'react';
import { Activity, AlertTriangle, CheckCircle2, Clock, Filter, RefreshCw, XCircle } from 'lucide-react';

export default function MonitorPage() {
  const [filter, setFilter] = React.useState('all');

  const workflows = [
    { name: 'Vendor Onboarding Engine', running: 4, succeeded: 142, failed: 2, avgDuration: '4.2h', slaAtRisk: 1, lastFailure: '12m ago (ERR_APPROVAL_TIMEOUT)' },
    { name: 'IT Provisioning Pipeline', running: 8, succeeded: 89, failed: 0, avgDuration: '18m', slaAtRisk: 0, lastFailure: '3d ago (ERR_API_UNAVAILABLE)' },
    { name: 'Customer Complaint Routing', running: 1, succeeded: 310, failed: 5, avgDuration: '42m', slaAtRisk: 2, lastFailure: '1h ago (ERR_PAYLOAD_SCHEMA)' },
    { name: 'Quarterly Compliance Audit', running: 2, succeeded: 24, failed: 1, avgDuration: '1.2d', slaAtRisk: 0, lastFailure: '2d ago (ERR_DELEGATION_FAIL)' }
  ];

  const failureGroups = [
    { code: 'ERR_APPROVAL_TIMEOUT', count: 4, impact: 'High', description: 'Approval step exceeded 24h SLA timeout window' },
    { code: 'ERR_PAYLOAD_SCHEMA', count: 3, impact: 'Medium', description: 'Input JSON failed strict schema validation rules' },
    { code: 'ERR_API_UNAVAILABLE', count: 1, impact: 'Low', description: 'Third-party integration gateway socket error' }
  ];

  return (
    <div className="space-y-6">
      {/* Header Strip */}
      <div className="p-6 rounded-2xl bg-surface-1 border border-border-subtle flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary flex items-center gap-2">
            <Activity className="h-6 w-6 text-brand-primary" /> Process Monitoring & Health
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Real-time execution telemetry, SLA breakdown, and error failure analytics across all tenant workflows.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Refreshing live telemetry stream...')}
            className="px-3 py-2 rounded-lg bg-surface-2 hover:bg-surface-3 border border-border-subtle text-text-secondary hover:text-text-primary text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Refresh Telemetry
          </button>
        </div>
      </div>

      {/* KPI Ribbon & SLA Donut */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-surface-1 border border-border-subtle space-y-1">
          <span className="text-xs text-text-muted">Total Executions (24h)</span>
          <p className="text-2xl font-extrabold text-text-primary">565 runs</p>
          <span className="text-[11px] text-status-success font-semibold">98.6% success rate</span>
        </div>
        <div className="p-4 rounded-xl bg-surface-1 border border-border-subtle space-y-1">
          <span className="text-xs text-text-muted">Currently Active</span>
          <p className="text-2xl font-extrabold text-brand-tertiary">15 running</p>
          <span className="text-[11px] text-text-muted">Across 4 core processes</span>
        </div>
        <div className="p-4 rounded-xl bg-surface-1 border border-border-subtle space-y-1">
          <span className="text-xs text-text-muted">SLA At Risk</span>
          <p className="text-2xl font-extrabold text-status-warning">3 instances</p>
          <span className="text-[11px] text-status-warning font-semibold">Escalation active</span>
        </div>
        <div className="p-4 rounded-xl bg-surface-1 border border-border-subtle space-y-1">
          <span className="text-xs text-text-muted">Failed Runs</span>
          <p className="text-2xl font-extrabold text-status-danger">8 runs</p>
          <span className="text-[11px] text-text-muted">3 error codes logged</span>
        </div>
      </div>

      {/* Workflow Telemetry Table */}
      <div className="p-5 rounded-2xl bg-surface-1 border border-border-subtle space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-text-primary">Workflow Health Matrix</h3>
          <span className="text-xs text-text-muted font-mono">Live telemetry stream</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border-subtle text-text-muted">
                <th className="pb-3 font-semibold">Workflow Name</th>
                <th className="pb-3 font-semibold">Running</th>
                <th className="pb-3 font-semibold">Succeeded</th>
                <th className="pb-3 font-semibold">Failed</th>
                <th className="pb-3 font-semibold">Avg Duration</th>
                <th className="pb-3 font-semibold">SLA At Risk</th>
                <th className="pb-3 font-semibold text-right">Last Failure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {workflows.map((wf, idx) => (
                <tr key={idx} className="hover:bg-surface-2/60 transition-colors">
                  <td className="py-3 font-bold text-text-primary">{wf.name}</td>
                  <td className="py-3 font-mono text-brand-tertiary font-bold">{wf.running}</td>
                  <td className="py-3 font-mono text-status-success font-bold">{wf.succeeded}</td>
                  <td className="py-3 font-mono text-status-danger font-bold">{wf.failed}</td>
                  <td className="py-3 text-text-secondary">{wf.avgDuration}</td>
                  <td className="py-3 font-mono text-status-warning font-bold">{wf.slaAtRisk}</td>
                  <td className="py-3 text-right font-mono text-[11px] text-text-muted">{wf.lastFailure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Failure Reasons Grouping */}
      <div className="p-5 rounded-2xl bg-surface-1 border border-border-subtle space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-text-primary flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-status-danger" /> Failure Reason Breakdown (Grouped by Code)
          </h3>
        </div>

        <div className="space-y-3 text-xs">
          {failureGroups.map((grp) => (
            <div
              key={grp.code}
              className="p-3.5 rounded-xl bg-surface-2 border border-border-subtle flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-status-danger-bg text-status-danger font-mono font-bold text-[11px]">
                    {grp.code}
                  </span>
                  <span className="text-text-muted">({grp.count} occurrences)</span>
                </div>
                <p className="text-text-secondary">{grp.description}</p>
              </div>
              <button
                onClick={() => alert(`Analyzing error logs for ${grp.code}`)}
                className="px-3 py-1.5 rounded-lg bg-surface-3 border border-border-subtle text-text-primary font-semibold hover:border-brand-primary text-[11px] transition-all"
              >
                Inspect Logs →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
