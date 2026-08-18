'use client';

import React from 'react';
import { Settings, ShieldCheck, Users, Activity, Database, CheckCircle2, Lock, UserCheck, RefreshCw } from 'lucide-react';
import { dataStore, AuditLogItem, UserProfile, IntegrationItem } from '../../../lib/data-store';

export default function AdminPage() {
  const [auditLogs, setAuditLogs] = React.useState<AuditLogItem[]>([]);
  const [users, setUsers] = React.useState<UserProfile[]>([]);
  const [integrations, setIntegrations] = React.useState<IntegrationItem[]>([]);
  const [tab, setTab] = React.useState<'audit' | 'users' | 'integrations'>('audit');

  React.useEffect(() => {
    const syncData = () => {
      setAuditLogs(dataStore.listAuditLogs());
      setUsers(dataStore.listUsers());
      setIntegrations(dataStore.listIntegrations());
    };
    syncData();
    return dataStore.subscribe(syncData);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary flex items-center gap-2">
            <Settings className="h-6 w-6 text-brand-primary" /> Tenant Administration & Governance
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Enterprise immutable audit trails, role-based access control (RBAC), and external ERP connectors.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border-subtle gap-6 text-xs font-semibold text-text-muted">
        <button
          onClick={() => setTab('audit')}
          className={`pb-3 transition-colors ${tab === 'audit' ? 'border-b-2 border-brand-primary text-brand-primary' : 'hover:text-text-primary'}`}
        >
          Immutable Audit Logs ({auditLogs.length})
        </button>
        <button
          onClick={() => setTab('users')}
          className={`pb-3 transition-colors ${tab === 'users' ? 'border-b-2 border-brand-primary text-brand-primary' : 'hover:text-text-primary'}`}
        >
          User Profiles & RBAC ({users.length})
        </button>
        <button
          onClick={() => setTab('integrations')}
          className={`pb-3 transition-colors ${tab === 'integrations' ? 'border-b-2 border-brand-primary text-brand-primary' : 'hover:text-text-primary'}`}
        >
          System Connectors ({integrations.length})
        </button>
      </div>

      {/* Tab 1: Audit Logs */}
      {tab === 'audit' && (
        <div className="p-5 rounded-2xl bg-surface-1 border border-border-subtle overflow-x-auto shadow-sm">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border-subtle text-text-muted font-semibold">
                <th className="pb-3">Timestamp</th>
                <th className="pb-3">Actor / Role</th>
                <th className="pb-3">Action</th>
                <th className="pb-3">Entity</th>
                <th className="pb-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-surface-2/60 transition-colors">
                  <td className="py-3 font-mono text-text-muted text-[11px]">
                    {new Date(log.timestamp).toLocaleTimeString()} • {new Date(log.timestamp).toLocaleDateString()}
                  </td>
                  <td className="py-3 font-semibold text-text-primary">
                    {log.user_name}
                    <span className="block text-[10px] text-text-muted font-normal">{log.user_role}</span>
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-surface-2 text-brand-primary border border-border-subtle">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 font-mono text-text-secondary">{log.entity_type} #{log.entity_id}</td>
                  <td className="py-3 text-text-secondary max-w-md">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Users & RBAC */}
      {tab === 'users' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((u) => (
            <div
              key={u.id}
              className="p-4 rounded-2xl bg-surface-1 border border-border-subtle space-y-3 text-xs shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-brand-primary/20 text-brand-primary font-bold flex items-center justify-center">
                    {u.avatar_initials}
                  </div>
                  <div>
                    <p className="font-bold text-text-primary">{u.full_name}</p>
                    <p className="text-[11px] text-text-muted">{u.email}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-2 text-brand-tertiary">
                  {u.department}
                </span>
              </div>

              <div className="pt-2 border-t border-border-subtle flex justify-between items-center text-[11px]">
                <span className="font-semibold text-text-secondary">Assigned Role:</span>
                <span className="font-bold text-brand-primary">{u.role}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: System Connectors */}
      {tab === 'integrations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-surface-1 border border-border-subtle flex items-center justify-between gap-4 text-xs shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-surface-2 text-brand-primary">
                  <Database className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-text-primary">{item.name}</h3>
                  <p className="text-text-muted text-[11px] mt-0.5">{item.category} • Frequency: {item.sync_frequency}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-status-success-bg text-status-success flex items-center gap-1 uppercase">
                  <CheckCircle2 className="h-3 w-3" /> Connected
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
