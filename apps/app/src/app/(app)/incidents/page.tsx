'use client';

import React from 'react';
import { Siren, Plus, AlertTriangle, CheckCircle2, Clock, Sparkles, FileText, X, Check, Trash2, ArrowRight } from 'lucide-react';
import { dataStore, IncidentItem } from '../../../lib/data-store';

export default function IncidentsPage() {
  const [incidents, setIncidents] = React.useState<IncidentItem[]>([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [postmortemModalOpen, setPostmortemModalOpen] = React.useState(false);
  const [selectedIncident, setSelectedIncident] = React.useState<IncidentItem | null>(null);

  // Form State
  const [formTitle, setFormTitle] = React.useState('');
  const [formDesc, setFormDesc] = React.useState('');
  const [formSeverity, setFormSeverity] = React.useState<IncidentItem['severity']>('sev2');
  const [formAssignee, setFormAssignee] = React.useState('Sara Connor');

  React.useEffect(() => {
    const syncData = () => {
      setIncidents(dataStore.listIncidents());
    };
    syncData();
    return dataStore.subscribe(syncData);
  }, []);

  const handleDeclareIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    dataStore.createIncident({
      title: formTitle,
      description: formDesc,
      severity: formSeverity,
      assignee_name: formAssignee
    });

    setFormTitle('');
    setFormDesc('');
    setModalOpen(false);
  };

  const handleStatusShift = (id: string, newStatus: IncidentItem['status']) => {
    dataStore.updateIncidentStatus(id, newStatus);
  };

  const handleOpenPostmortem = (inc: IncidentItem) => {
    setSelectedIncident(inc);
    setPostmortemModalOpen(true);
  };

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

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 rounded-lg bg-status-danger hover:bg-status-danger/90 text-text-inverse font-semibold text-xs transition-all flex items-center gap-1.5 shadow-glow-danger"
        >
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
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-2 text-text-muted">
                  {items.length}
                </span>
              </div>

              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {items.map((inc) => (
                  <div
                    key={inc.id}
                    className="p-3.5 rounded-xl bg-surface-2 border border-border-subtle space-y-2.5 text-xs hover:border-status-danger transition-all shadow-sm"
                  >
                    <div className="flex justify-between items-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                          inc.severity === 'sev1'
                            ? 'bg-status-danger-bg text-status-danger border border-status-danger'
                            : inc.severity === 'sev2'
                            ? 'bg-status-warning-bg text-status-warning'
                            : 'bg-surface-3 text-text-secondary'
                        }`}
                      >
                        {inc.severity}
                      </span>
                      <span className="font-mono text-[10px] text-text-muted">{inc.id}</span>
                    </div>

                    <p className="font-bold text-text-primary leading-snug">{inc.title}</p>
                    <p className="text-text-muted text-[11px]">Assignee: {inc.assignee_name}</p>

                    {inc.status !== 'resolved' && (
                      <p className="text-status-warning flex items-center gap-1 font-mono text-[10px]">
                        <Clock className="h-3 w-3" /> SLA: {inc.sla_countdown}
                      </p>
                    )}

                    {/* Status Transitions */}
                    <div className="flex items-center justify-between pt-2 border-t border-border-subtle text-[11px]">
                      <button
                        onClick={() => handleOpenPostmortem(inc)}
                        className="text-brand-primary hover:underline font-semibold flex items-center gap-1"
                      >
                        <Sparkles className="h-3 w-3" /> AI Postmortem
                      </button>

                      <div className="flex gap-1">
                        {st === 'open' && (
                          <button
                            onClick={() => handleStatusShift(inc.id, 'investigating')}
                            className="px-2 py-0.5 rounded bg-surface-3 hover:bg-brand-primary hover:text-text-inverse font-semibold"
                          >
                            Investigate &rarr;
                          </button>
                        )}
                        {st === 'investigating' && (
                          <button
                            onClick={() => handleStatusShift(inc.id, 'mitigated')}
                            className="px-2 py-0.5 rounded bg-surface-3 hover:bg-brand-primary hover:text-text-inverse font-semibold"
                          >
                            Mitigate &rarr;
                          </button>
                        )}
                        {st === 'mitigated' && (
                          <button
                            onClick={() => handleStatusShift(inc.id, 'resolved')}
                            className="px-2 py-0.5 rounded bg-status-success-bg text-status-success font-semibold hover:bg-status-success hover:text-text-inverse"
                          >
                            ✓ Resolve
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Declare Incident Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-canvas/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-surface-1 border border-border-strong p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-border-subtle pb-3">
              <h3 className="font-bold text-lg text-text-primary flex items-center gap-2">
                <Siren className="h-5 w-5 text-status-danger" /> Declare Operational Incident
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded hover:bg-surface-2 text-text-muted">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleDeclareIncident} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-text-secondary mb-1">Incident Title / Summary</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Production PostgreSQL Replica Replication Delay > 60s"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-status-danger"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-text-secondary mb-1">Severity</label>
                  <select
                    value={formSeverity}
                    onChange={(e) => setFormSeverity(e.target.value as any)}
                    className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary"
                  >
                    <option value="sev1">SEV1 - Critical Production Down</option>
                    <option value="sev2">SEV2 - Major Feature Degraded</option>
                    <option value="sev3">SEV3 - Minor Impact</option>
                    <option value="sev4">SEV4 - Informational</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-text-secondary mb-1">Assign Incident Commander</label>
                  <select
                    value={formAssignee}
                    onChange={(e) => setFormAssignee(e.target.value)}
                    className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary"
                  >
                    <option>Sara Connor</option>
                    <option>Mike Ross</option>
                    <option>Eve Polastri</option>
                    <option>Jonas Kahn</option>
                    <option>Adam Wu</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-text-secondary mb-1">Incident Description & Impact</label>
                <textarea
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Describe observed errors, telemetry alerts, affected services, and initial mitigation steps..."
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
                  className="px-4 py-2 rounded-lg bg-status-danger text-text-inverse font-bold shadow-glow-danger"
                >
                  Broadcast & Declare
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Postmortem Report Modal */}
      {postmortemModalOpen && selectedIncident && (
        <div className="fixed inset-0 z-50 bg-canvas/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-surface-1 border border-border-strong p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-border-subtle pb-3">
              <h3 className="font-bold text-base text-text-primary flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-brand-primary" /> AI Postmortem Report: {selectedIncident.id}
              </h3>
              <button onClick={() => setPostmortemModalOpen(false)} className="p-1 rounded hover:bg-surface-2 text-text-muted">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs bg-surface-2 p-4 rounded-xl font-mono text-text-primary max-h-80 overflow-y-auto leading-relaxed">
              <p className="text-brand-primary font-bold"># Incident Postmortem: {selectedIncident.title}</p>
              <p>**Severity**: {selectedIncident.severity.toUpperCase()} • **Reporter**: {selectedIncident.reporter_name}</p>
              <p>**Status**: {selectedIncident.status.toUpperCase()} • **Commander**: {selectedIncident.assignee_name}</p>
              <p className="mt-2 text-text-secondary">## 1. Timeline & Root Cause Analysis</p>
              <p>{selectedIncident.root_cause || 'Identified heavy database analytical query without read-pool isolation. Failover mechanism automatically initialized.'}</p>
              <p className="mt-2 text-text-secondary">## 2. Corrective & Preventative Actions (CAPA)</p>
              <ul className="list-disc list-inside space-y-1 text-text-primary">
                <li>Configure analytical DB read replicas with dedicated connection pools.</li>
                <li>Add query timeout guards to prevent lock escalations.</li>
                <li>Establish automated PagerDuty paging for lag &gt; 30s.</li>
              </ul>
            </div>

            <div className="pt-3 border-t border-border-subtle flex justify-end gap-2 text-xs">
              <button
                onClick={() => {
                  dataStore.createTask({
                    title: `[CAPA] Implement preventatives for ${selectedIncident.id}`,
                    description: `Follow up preventative actions from AI Postmortem report for ${selectedIncident.title}`,
                    priority: 'high',
                    assignee_name: selectedIncident.assignee_name
                  });
                  alert('CAPA action item converted to an active task in the Task Management pipeline.');
                  setPostmortemModalOpen(false);
                }}
                className="px-4 py-2 rounded-lg bg-brand-primary text-text-inverse font-bold shadow-glow-primary"
              >
                Create CAPA Task in Database
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
