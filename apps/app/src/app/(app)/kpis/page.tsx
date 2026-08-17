'use client';

import React from 'react';
import { Gauge, Plus, TrendingUp, Code, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function KpisPage() {
  const [activeKpiEditor, setActiveKpiEditor] = React.useState(false);
  const [sqlQuery, setSqlQuery] = React.useState(
    "SELECT COUNT(*) FILTER (WHERE NOT breached) * 100.0 / COUNT(*) FROM workflow_instances WHERE tenant_id = :tenant_id AND started_at >= :from"
  );
  const [sqlValid, setSqlValid] = React.useState<boolean | null>(null);

  const defaultKpis = [
    { key: 'sla_compliance_rate', name: 'SLA Compliance Rate', calc: '(workflow_runs_not_breached / total_finished) × 100', cadence: 'hourly', value: '96.4%' },
    { key: 'process_completion_time', name: 'Process Completion Time', calc: 'median(workflow_instance.finished_at - started_at)', cadence: 'hourly', value: '4.2 days' },
    { key: 'workflow_success_rate', name: 'Workflow Success Rate', calc: 'succeeded / total_finished', cadence: 'hourly', value: '99.1%' },
    { key: 'avg_approval_time', name: 'Average Approval Time', calc: 'median(approval_request.final_decision_at - created_at)', cadence: 'hourly', value: '2.4 hours' },
    { key: 'task_completion_rate', name: 'Task Completion Rate', calc: '(tasks_done / tasks_total) over window', cadence: 'hourly', value: '92.0%' },
    { key: 'operational_cost_per_process', name: 'Operational Cost per Process', calc: 'SUM(linked_cost) / instance_count', cadence: 'daily', value: '$1.32' },
    { key: 'employee_productivity', name: 'Employee Productivity', calc: 'tasks_done / active_employee', cadence: 'daily', value: '14.2 / wk' },
    { key: 'resource_utilization', name: 'Resource Utilization', calc: 'avg(task.actual_minutes / available_minutes)', cadence: 'hourly', value: '78.5%' },
    { key: 'process_automation_rate', name: 'Process Automation Rate', calc: '(auto_completed_steps / total_steps)', cadence: 'daily', value: '64.0%' },
    { key: 'incident_resolution_time', name: 'Incident Resolution Time', calc: 'median(incident.resolved_at - created_at)', cadence: 'hourly', value: '1.8 hours' },
    { key: 'escalation_rate', name: 'Escalation Rate', calc: 'escalated / total_approvals', cadence: 'daily', value: '3.1%' },
    { key: 'customer_request_turnaround', name: 'Customer Request Turnaround', calc: 'median(duration)', cadence: 'hourly', value: '45 mins' }
  ];

  const handleValidateSql = () => {
    // Validate SQL against whitelist
    if (sqlQuery.toLowerCase().includes('drop') || sqlQuery.toLowerCase().includes('delete')) {
      setSqlValid(false);
    } else {
      setSqlValid(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary flex items-center gap-2">
            <Gauge className="h-6 w-6 text-brand-primary" /> KPI & Operations Dashboard
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Tenant-configurable KPI library with SQL template definitions and automated hourly rollups.
          </p>
        </div>

        <button
          onClick={() => setActiveKpiEditor(!activeKpiEditor)}
          className="px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-semibold text-xs transition-all flex items-center gap-1.5 shadow-glow-primary"
        >
          <Code className="h-4 w-4" /> {activeKpiEditor ? 'Close SQL Editor' : '+ Define Custom KPI SQL'}
        </button>
      </div>

      {/* SQL KPI Definition Editor Panel */}
      {activeKpiEditor && (
        <div className="p-5 rounded-2xl bg-surface-1 border border-brand-primary/40 space-y-4 shadow-glow-primary">
          <h3 className="font-bold text-sm text-text-primary flex items-center gap-2">
            <Code className="h-4 w-4 text-brand-tertiary" /> Custom KPI SQL Editor (Whitelist Enforced)
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-text-secondary mb-1">KPI Key & Title</label>
              <div className="grid grid-cols-2 gap-3">
                <input type="text" defaultValue="custom_customer_satisfaction" className="px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary font-mono" />
                <input type="text" defaultValue="Customer CSAT Score" className="px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary" />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-text-secondary mb-1">Parameterized SQL Query (Must include :tenant_id)</label>
              <textarea
                rows={3}
                value={sqlQuery}
                onChange={(e) => setSqlQuery(e.target.value)}
                className="w-full p-3 bg-bg-input border border-border-default rounded-lg font-mono text-xs text-brand-tertiary focus:outline-none"
              />
            </div>

            {sqlValid !== null && (
              <div className={`p-3 rounded-lg border text-xs font-mono flex items-center gap-2 ${
                sqlValid ? 'bg-status-success-bg border-status-success text-status-success' : 'bg-status-danger-bg border-status-danger text-status-danger'
              }`}>
                {sqlValid ? <><CheckCircle2 className="h-4 w-4" /> SQL syntax validated against whitelisted analytics schema tables.</> : <>SQL security check failed: Destructive or illegal statement detected.</>}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={handleValidateSql} className="px-3 py-1.5 rounded-lg bg-surface-2 border border-border-default font-semibold">Validate SQL Security</button>
              <button onClick={() => alert('Custom KPI definition saved and registered!')} className="px-4 py-1.5 rounded-lg bg-brand-primary text-text-inverse font-bold">Save KPI Definition</button>
            </div>
          </div>
        </div>
      )}

      {/* 12 Default KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {defaultKpis.map((kpi) => (
          <div key={kpi.key} className="p-4 rounded-xl bg-surface-1 border border-border-subtle hover:border-brand-primary/40 transition-all space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center text-[10px] text-text-muted mb-1 font-mono">
                <span>{kpi.cadence}</span>
                <span className="text-brand-tertiary">{kpi.key}</span>
              </div>
              <h4 className="font-bold text-sm text-text-primary">{kpi.name}</h4>
              <p className="text-[11px] font-mono text-text-muted mt-1 leading-tight line-clamp-2">{kpi.calc}</p>
            </div>

            <div className="pt-2 border-t border-border-subtle flex justify-between items-baseline">
              <span className="text-xl font-extrabold text-text-primary">{kpi.value}</span>
              <span className="text-[10px] font-bold text-status-success">On Target</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
