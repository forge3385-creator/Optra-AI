'use client';

import React from 'react';
import { Siren, Plus, AlertTriangle, CheckCircle2, Clock, Sparkles, FileText } from 'lucide-react';

export default function IncidentsPage() {
  const [kanbanView, setKanbanView] = React.useState(true);

  const incidents = [
    { id: 'inc-101', title: 'PostgreSQL Secondary Replica Lag Spiking > 45s', severity: 'sev1', status: 'open', reporter: 'Jonas Kahn', assignee: 'Sara Connor', sla: '14 min left', capasCount: 2 },
    { id: 'inc-102', title: 'SAP OData API Authorization Timeout', severity: 'sev2', status: 'investigating', reporter: 'Mike Ross', assignee: 'Eve Polastri', sla: '1h 20m left', capasCount: 1 },
    { id: 'inc-103', title: 'Webhook Outbound Delivery Failure to Slack', severity: 'sev3', status: 'mitigated', reporter: 'Priya Sharma', assignee: 'Lin Dan', sla: '3h remaining', capasCount: 0 },
    { id: 'inc-104', title: 'User Avatar S3 Upload Thumbnail Delay', severity: 'sev4', status: 'resolved', reporter: 'Adam Wu', assignee: 'Adam Wu', sla: 'Resolved', capasCount: 1 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary flex items-center gap-2">
            <Siren className="h-6 w-6 text-status-danger" /> Incident & Issue Management
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Capture operational failures, auto-page on-call team, track CAPAs, and generate AI postmortems.
          </p>
        </div>

        <button className="px-4 py-2 rounded-lg bg-status-danger hover:bg-status-danger/90 text-text-inverse font-semibold text-xs transition-all flex items-center gap-1.5 shadow-glow-danger">
          <Plus className="h-4 w-4" /> Declare Incident
        </button>
      </div>

      {/* Kanban Triage Board */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {(['open', 'investigating', 'mitigated', 'resolved'] as const).map((st) => {
          const items = incidents.filter((i) => i.status === st);
          return (
            <div key={st} className="p-4 rounded-xl bg-surface-1 border border-border-subtle space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
                <span className="font-bold text-xs uppercase text-text-primary">{st}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-2 text-text-muted">{items.length}</span>
              </div>

              <div className="space-y-3">
                {items.map((inc) => (
                  <div key={inc.id} className="p-3.5 rounded-xl bg-surface-2 border border-border-subtle space-y-2 text-xs hover:border-status-danger transition-all">
                    <div className="flex justify-between items-center">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                        inc.severity === 'sev1' ? 'bg-status-danger-bg text-status-danger border border-status-danger' :
                        inc.severity === 'sev2' ? 'bg-status-warning-bg text-status-warning' : 'bg-surface-3 text-text-secondary'
                      }`}>
                        {inc.severity}
                      </span>
                      <span className="font-mono text-[10px] text-text-muted">{inc.id}</span>
                    </div>

                    <p className="font-bold text-text-primary">{inc.title}</p>
                    <p className="text-text-muted text-[11px]">Assignee: {inc.assignee}</p>

                    <div className="pt-2 border-t border-border-subtle flex justify-between items-center text-[10px]">
                      <span className="text-status-warning font-mono flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {inc.sla}
                      </span>
                      <button className="text-brand-tertiary hover:underline flex items-center gap-1 font-semibold">
                        <Sparkles className="h-3 w-3" /> Postmortem AI
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
