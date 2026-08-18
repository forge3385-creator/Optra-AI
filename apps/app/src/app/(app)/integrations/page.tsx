'use client';

import React from 'react';
import { Layers, CheckCircle2, RefreshCw, Zap, Shield, ExternalLink, Link2Off } from 'lucide-react';
import { dataStore } from '../../../lib/data-store';
import Link from 'next/link';

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = React.useState(dataStore.listIntegrations());

  React.useEffect(() => {
    const update = () => setIntegrations(dataStore.listIntegrations());
    update();
    return dataStore.subscribe(update);
  }, []);

  const allIntegrations = [
    // Connected via dataStore
    ...integrations,
    // Available to connect (OAuth)
    { id: 'int-google-cal', name: 'Google Calendar', category: 'Productivity', status: 'disconnected' as const, last_sync: '', sync_frequency: 'OAuth 2.0', icon: 'Calendar' },
    { id: 'int-google-drive', name: 'Google Drive', category: 'Document Management', status: 'disconnected' as const, last_sync: '', sync_frequency: 'OAuth 2.0', icon: 'HardDrive' },
    { id: 'int-gmail', name: 'Gmail', category: 'Email', status: 'disconnected' as const, last_sync: '', sync_frequency: 'OAuth 2.0', icon: 'Mail' },
    { id: 'int-jira', name: 'Jira Software', category: 'Productivity', status: 'disconnected' as const, last_sync: '', sync_frequency: 'Webhook', icon: 'GitBranch' },
    { id: 'int-msteams', name: 'Microsoft Teams', category: 'Communication', status: 'disconnected' as const, last_sync: '', sync_frequency: 'Webhook', icon: 'Video' },
    { id: 'int-oracle', name: 'Oracle ERP Cloud', category: 'ERP', status: 'disconnected' as const, last_sync: '', sync_frequency: 'Polling', icon: 'Database' },
  ].filter((item, index, self) => self.findIndex(t => t.id === item.id) === index);

  const connectedCount = allIntegrations.filter(i => i.status === 'connected').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary flex items-center gap-2">
            <Layers className="h-6 w-6 text-brand-primary" /> Integrations Hub
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            {connectedCount} of {allIntegrations.length} integrations connected. Manage OAuth connections and sync schedules.
          </p>
        </div>
        <Link
          href="/settings"
          className="px-4 py-2 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-xs flex items-center gap-1.5 shadow-glow-primary transition-all"
        >
          <Shield className="h-4 w-4" /> Manage in Settings
        </Link>
      </div>

      {/* Status bar */}
      <div className="p-4 rounded-2xl bg-surface-1 border border-border-subtle flex flex-wrap gap-4 items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-status-success animate-pulse" />
          <span className="text-text-secondary">{connectedCount} active connections · Realtime event bridge operational</span>
        </div>
        <span className="text-text-muted font-mono">Unified Adapter v2.1 · Multi-tenant isolated</span>
      </div>

      {/* Connected integrations */}
      <div>
        <h2 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-3">Connected</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allIntegrations.filter(i => i.status === 'connected').map((item) => (
            <div key={item.id} className="p-5 rounded-2xl bg-surface-1 border border-status-success/20 hover:border-status-success/40 transition-all space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-surface-2 text-brand-tertiary border border-border-subtle">{item.category}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-status-success-bg text-status-success">
                    ● Connected
                  </span>
                </div>
                <h3 className="font-bold text-base text-text-primary">{item.name}</h3>
                {item.last_sync && (
                  <p className="text-xs text-text-muted">Last sync: {item.last_sync} · {item.sync_frequency}</p>
                )}
              </div>
              <div className="flex gap-2 pt-3 border-t border-border-subtle">
                <button
                  onClick={() => {}}
                  className="flex-1 py-1.5 rounded-lg bg-surface-2 border border-border-subtle text-text-secondary text-xs font-semibold hover:text-text-primary flex items-center justify-center gap-1.5 transition-all"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Sync Now
                </button>
                <button className="py-1.5 px-3 rounded-lg bg-status-danger-bg border border-status-danger/20 text-status-danger text-xs font-semibold flex items-center justify-center gap-1 transition-all hover:bg-status-danger/10">
                  <Link2Off className="h-3.5 w-3.5" /> Disconnect
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available integrations */}
      <div>
        <h2 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-3">Available to Connect</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allIntegrations.filter(i => i.status !== 'connected').map((item) => (
            <div key={item.id} className="p-5 rounded-2xl bg-surface-1 border border-border-subtle hover:border-brand-primary/40 transition-all space-y-4 shadow-sm flex flex-col justify-between opacity-80 hover:opacity-100">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-surface-2 text-text-muted border border-border-subtle">{item.category}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-3 text-text-muted border border-border-subtle">Not connected</span>
                </div>
                <h3 className="font-bold text-base text-text-primary">{item.name}</h3>
                <p className="text-xs text-text-muted">Auth: {item.sync_frequency}</p>
              </div>
              <a
                href={`/api/integrations/${item.id === 'int-google-cal' ? 'google_calendar' : item.id === 'int-google-drive' ? 'google_drive' : item.id === 'int-gmail' ? 'gmail' : 'slack'}/connect`}
                className="w-full py-2 rounded-xl bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold hover:bg-brand-primary hover:text-white transition-all flex items-center justify-center gap-1.5 text-center"
              >
                <Zap className="h-3.5 w-3.5" /> Connect {item.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
