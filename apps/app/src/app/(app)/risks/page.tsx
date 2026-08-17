'use client';

import React from 'react';
import { ShieldAlert, RefreshCw, AlertTriangle, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

export default function RisksPage() {
  const [scanning, setScanning] = React.useState(false);

  const riskSignals = [
    {
      id: 'risk-1',
      source: 'workflow',
      entityId: 'wf-vendor-onboarding',
      score: 0.78,
      severity: 'high',
      rationale: "Workflow 'Vendor Onboarding' avg breach rate 24% over last 30 runs. Assignee workload above 1.5σ.",
      recommendations: [
        "Add backup approver at step 'finance_review'",
        "Split workload across 2 reviewers"
      ],
      detectedAt: '10 minutes ago'
    },
    {
      id: 'risk-2',
      source: 'workload',
      entityId: 'dept-customer-ops',
      score: 0.65,
      severity: 'medium',
      rationale: 'Customer Ops team capacity is at 94% utilization for 3 consecutive weeks.',
      recommendations: [
        "Reassign 12 non-critical tasks to Back-Office pool",
        "Enable automated complaint triage bot"
      ],
      detectedAt: '35 minutes ago'
    },
    {
      id: 'risk-3',
      source: 'vendor',
      entityId: 'conn-sap-s4hana',
      score: 0.82,
      severity: 'critical',
      rationale: 'SAP S/4HANA OData API latency increased by 420ms (3.2σ above baseline).',
      recommendations: [
        "Fallback to cached PO payload queue",
        "Notify SAP Administrator"
      ],
      detectedAt: '1 hour ago'
    }
  ];

  const handleTriggerScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      alert('Full tenant AI Risk Scan completed: 3 active signals updated.');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-status-warning" /> AI Risk Detection & Scanning
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Detect operational risks before they escalate using background predictive ML models.
          </p>
        </div>

        <button
          onClick={handleTriggerScan}
          disabled={scanning}
          className="px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-semibold text-xs transition-all flex items-center gap-1.5 shadow-glow-primary"
        >
          <RefreshCw className={`h-4 w-4 ${scanning ? 'animate-spin' : ''}`} /> {scanning ? 'Scanning Tenant...' : 'Run Risk Scan (POST /v1/risks/scan)'}
        </button>
      </div>

      {/* 4-Quadrant Severity Matrix Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-surface-1 border border-status-danger/40 space-y-1">
          <span className="text-status-danger font-bold uppercase tracking-wider text-[10px]">Critical Severity</span>
          <p className="text-2xl font-extrabold text-text-primary">1 Risk</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-1 border border-status-warning/40 space-y-1">
          <span className="text-status-warning font-bold uppercase tracking-wider text-[10px]">High Severity</span>
          <p className="text-2xl font-extrabold text-text-primary">1 Risk</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-1 border border-border-subtle space-y-1">
          <span className="text-brand-tertiary font-bold uppercase tracking-wider text-[10px]">Medium Severity</span>
          <p className="text-2xl font-extrabold text-text-primary">1 Risk</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-1 border border-border-subtle space-y-1">
          <span className="text-status-success font-bold uppercase tracking-wider text-[10px]">Low Severity</span>
          <p className="text-2xl font-extrabold text-text-primary">0 Risks</p>
        </div>
      </div>

      {/* Risk Signals List */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-text-primary">Detected Risk Signals</h2>

        <div className="space-y-4">
          {riskSignals.map((signal) => (
            <div key={signal.id} className="p-5 rounded-2xl bg-surface-1 border border-border-subtle hover:border-brand-primary/40 transition-all space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                    signal.severity === 'critical' ? 'bg-status-danger-bg text-status-danger border border-status-danger' :
                    signal.severity === 'high' ? 'bg-status-warning-bg text-status-warning' : 'bg-surface-2 text-brand-tertiary'
                  }`}>
                    {signal.severity}
                  </span>
                  <span className="text-xs font-mono text-text-muted">Source: {signal.source}</span>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="font-mono text-brand-primary font-bold">Score: {signal.score} / 1.0</span>
                  <span className="text-text-muted">{signal.detectedAt}</span>
                </div>
              </div>

              <p className="text-sm font-semibold text-text-primary leading-relaxed">{signal.rationale}</p>

              {/* Recommendations with Apply buttons */}
              <div className="p-3 rounded-xl bg-surface-2 border border-border-subtle space-y-2 text-xs">
                <p className="font-bold text-brand-tertiary flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> AI Recommended Remediation Actions:
                </p>
                <div className="space-y-1.5">
                  {signal.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-surface-1 p-2 rounded border border-border-subtle">
                      <span className="text-text-secondary">{rec}</span>
                      <button
                        onClick={() => alert(`Applied recommendation: "${rec}"`)}
                        className="px-3 py-1 rounded bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-bold text-[11px] transition-all"
                      >
                        Apply Fix
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
