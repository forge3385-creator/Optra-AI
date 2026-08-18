'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, RefreshCw, AlertTriangle, CheckCircle2, Sparkles, ArrowRight, Check, Plus } from 'lucide-react';
import { dataStore, RiskSignalItem } from '../../../lib/data-store';

export default function RisksPage() {
  const [risks, setRisks] = React.useState<RiskSignalItem[]>([]);
  const [scanning, setScanning] = React.useState(false);
  const [scanResult, setScanResult] = React.useState<string | null>(null);

  React.useEffect(() => {
    const syncData = () => {
      setRisks(dataStore.listRisks());
    };
    syncData();
    return dataStore.subscribe(syncData);
  }, []);

  const handleTriggerScan = () => {
    setScanning(true);
    setScanResult(null);
    setTimeout(() => {
      const res = dataStore.runRiskScan();
      setScanning(false);
      setScanResult(`AI Risk Scan complete: ${res.detected} active signals analyzed across tenant.`);
      setTimeout(() => setScanResult(null), 4000);
    }, 1200);
  };

  const handleMitigate = (id: string) => {
    dataStore.resolveRisk(id);
  };

  const activeRisks = risks.filter((r) => r.status === 'active');
  const mitigatedRisks = risks.filter((r) => r.status === 'mitigated');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-brand-primary" /> Operational Risk & Anomaly Signals
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Real-time multi-agent risk scoring, SLA breach forecasting, and automated mitigation suggestions.
          </p>
        </div>

        <button
          onClick={handleTriggerScan}
          disabled={scanning}
          className="px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-semibold text-xs transition-all flex items-center gap-1.5 shadow-glow-primary"
        >
          <RefreshCw className={`h-4 w-4 ${scanning ? 'animate-spin' : ''}`} />
          {scanning ? 'Scanning Operational Graph...' : 'Run Real-Time AI Risk Scan'}
        </button>
      </div>

      {scanResult && (
        <div className="p-3.5 rounded-xl bg-status-success-bg border border-status-success/40 text-status-success text-xs font-semibold flex items-center gap-2">
          <Check className="h-4 w-4" /> {scanResult}
        </div>
      )}

      {/* Risk Metrics Summary Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-surface-1 border border-border-subtle space-y-1">
          <p className="text-xs text-text-muted">Active Risk Signals</p>
          <p className="text-2xl font-extrabold text-text-primary">{activeRisks.length}</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-1 border border-border-subtle space-y-1">
          <p className="text-xs text-text-muted">High / Critical Severity</p>
          <p className="text-2xl font-extrabold text-status-danger">
            {activeRisks.filter((r) => r.severity === 'critical' || r.severity === 'high').length}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-surface-1 border border-border-subtle space-y-1">
          <p className="text-xs text-text-muted">Mitigated Risks</p>
          <p className="text-2xl font-extrabold text-status-success">{mitigatedRisks.length}</p>
        </div>
      </div>

      {/* Risk Signals Feed */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-text-primary">Detected Operational Risks ({activeRisks.length})</h2>

        <div className="space-y-3">
          {activeRisks.map((sig) => (
            <div
              key={sig.id}
              className="p-5 rounded-2xl bg-surface-1 border border-border-subtle hover:border-brand-primary/40 transition-all space-y-4 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                      sig.severity === 'critical'
                        ? 'bg-status-danger-bg text-status-danger border border-status-danger'
                        : sig.severity === 'high'
                        ? 'bg-status-warning-bg text-status-warning'
                        : 'bg-surface-2 text-text-secondary'
                    }`}
                  >
                    {sig.severity} (Risk Score: {(sig.score * 100).toFixed(0)}%)
                  </span>
                  <span className="text-[10px] font-mono bg-surface-2 text-brand-primary px-2 py-0.5 rounded uppercase font-bold">
                    Source: {sig.source}
                  </span>
                </div>
                <span className="text-xs font-mono text-text-muted">{sig.detected_at}</span>
              </div>

              <div className="space-y-1">
                <p className="font-bold text-sm text-text-primary">{sig.rationale}</p>
              </div>

              {/* AI Action Recommendations */}
              <div className="p-3.5 rounded-xl bg-surface-2 space-y-2 text-xs">
                <p className="font-bold text-brand-primary flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
                  <Sparkles className="h-3.5 w-3.5" /> AI Recommended Mitigations
                </p>
                <div className="space-y-1.5">
                  {sig.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-2 text-text-secondary">
                      <span>• {rec}</span>
                      <button
                        onClick={() => {
                          dataStore.createTask({
                            title: `[Mitigation] ${rec}`,
                            description: `Triggered from Risk Signal: ${sig.rationale}`,
                            priority: 'high',
                            project_name: 'Risk Mitigation'
                          });
                          alert('Task created in database.');
                        }}
                        className="text-brand-primary hover:underline font-semibold text-[11px] shrink-0"
                      >
                        + Create Task
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border-subtle">
                <button
                  onClick={() => handleMitigate(sig.id)}
                  className="px-4 py-1.5 rounded-lg bg-status-success hover:bg-status-success/90 text-text-inverse font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" /> Mark Mitigated
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
