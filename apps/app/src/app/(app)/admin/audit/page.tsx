'use client';

import React from 'react';
import { Shield, Filter, Download, Lock, CheckCircle2, RefreshCw } from 'lucide-react';

export default function AuditLogPage() {
  const [filterRole, setFilterRole] = React.useState('all');

  const auditEvents = [
    { id: 'evt_9012', timestamp: '2026-08-17 22:45:12', actor: 'sara@demo.app', role: 'company_admin', action: 'ORG_SETTINGS_UPDATE', resource: 'tenant:acme', ip: '192.168.1.1', status: 'SUCCESS' },
    { id: 'evt_9011', timestamp: '2026-08-17 22:40:05', actor: 'mike@demo.app', role: 'operations_manager', action: 'WORKFLOW_PUBLISH', resource: 'workflow:wf-1042', ip: '192.168.1.4', status: 'SUCCESS' },
    { id: 'evt_9010', timestamp: '2026-08-17 21:12:44', actor: 'priya@demo.app', role: 'dept_manager', action: 'APPROVAL_DECISION', resource: 'approval:ap-892', ip: '192.168.1.8', status: 'SUCCESS' },
    { id: 'evt_9009', timestamp: '2026-08-17 20:05:19', actor: 'viewer@demo.app', role: 'viewer', action: 'RBAC_VIOLATION_ATTEMPT', resource: 'approval:ap-892/delete', ip: '192.168.1.99', status: 'BLOCKED (HTTP 403)' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-surface-1 border border-border-subtle flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary flex items-center gap-2">
            <Shield className="h-6 w-6 text-brand-primary" /> Immutable System Audit Log
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            RBAC-enforced immutable audit trail of all security, permission, and workflow state transitions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Exporting audit log archive (CSV)...')}
            className="px-3 py-2 rounded-lg bg-surface-2 hover:bg-surface-3 border border-border-subtle text-text-secondary hover:text-text-primary text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Download className="h-3.5 w-3.5" /> Export Audit Archive
          </button>
        </div>
      </div>

      {/* Security Banner */}
      <div className="p-4 rounded-xl bg-surface-1 border border-border-subtle flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-brand-tertiary" />
          <span className="text-text-primary font-bold">Data Posture:</span>
          <span className="text-text-muted">RLS Enforced · Append-Only Storage · RS256 Signed Tokens</span>
        </div>
        <span className="text-status-success bg-status-success-bg px-2.5 py-0.5 rounded font-bold flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" /> Integrity Verified
        </span>
      </div>

      {/* Audit Log Table */}
      <div className="p-5 rounded-2xl bg-surface-1 border border-border-subtle space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-text-primary">Recent Security & Activity Events</h3>
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-text-muted" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="bg-input border border-border-default text-text-primary px-2.5 py-1 rounded-lg text-xs focus:outline-none"
            >
              <option value="all">All Roles</option>
              <option value="company_admin">company_admin</option>
              <option value="operations_manager">operations_manager</option>
              <option value="viewer">viewer</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border-subtle text-text-muted">
                <th className="pb-3 font-semibold">Event ID</th>
                <th className="pb-3 font-semibold">Timestamp (UTC)</th>
                <th className="pb-3 font-semibold">Actor / Role</th>
                <th className="pb-3 font-semibold">Action</th>
                <th className="pb-3 font-semibold">Resource</th>
                <th className="pb-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {auditEvents.map((evt) => (
                <tr key={evt.id} className="hover:bg-surface-2/60 transition-colors">
                  <td className="py-3 font-mono text-brand-tertiary font-bold">{evt.id}</td>
                  <td className="py-3 font-mono text-text-muted">{evt.timestamp}</td>
                  <td className="py-3 text-text-primary font-medium">
                    {evt.actor} <span className="text-[10px] font-mono text-text-muted">({evt.role})</span>
                  </td>
                  <td className="py-3 font-mono font-bold text-text-primary">{evt.action}</td>
                  <td className="py-3 font-mono text-text-secondary">{evt.resource}</td>
                  <td className="py-3 text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      evt.status === 'SUCCESS' ? 'bg-status-success-bg text-status-success' : 'bg-status-danger-bg text-status-danger'
                    }`}>
                      {evt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
