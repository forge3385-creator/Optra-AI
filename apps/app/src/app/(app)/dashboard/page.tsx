'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles, ShieldCheck, AlertTriangle, ArrowUpRight, TrendingUp,
  Clock, CheckCircle2, Workflow, Users, Activity, Play, ChevronRight,
  ListChecks, Siren, Plus, XCircle
} from 'lucide-react';
import { dataStore, ApprovalItem, WorkflowItem, TaskItem, RiskSignalItem } from '../../../lib/data-store';

export default function ExecutiveDashboard() {
  const router = useRouter();
  const [approvals, setApprovals] = React.useState<ApprovalItem[]>([]);
  const [workflows, setWorkflows] = React.useState<WorkflowItem[]>([]);
  const [tasks, setTasks] = React.useState<TaskItem[]>([]);
  const [risks, setRisks] = React.useState<RiskSignalItem[]>([]);
  const [kpiMetrics, setKpiMetrics] = React.useState<any>({});
  const [currentUser, setCurrentUser] = React.useState(dataStore.getActiveUser());
  const [opStatusTab, setOpStatusTab] = React.useState<'open' | 'delayed' | 'at_risk'>('open');

  React.useEffect(() => {
    const syncData = () => {
      setApprovals(dataStore.listApprovals());
      setWorkflows(dataStore.listWorkflows());
      setTasks(dataStore.listTasks());
      setRisks(dataStore.listRisks());
      setKpiMetrics(dataStore.getCalculatedKPIs());
      setCurrentUser(dataStore.getActiveUser());
    };

    syncData();
    return dataStore.subscribe(syncData);
  }, []);

  const pendingApprovals = approvals.filter((a) => a.status === 'pending');
  const activeWorkflows = workflows.filter((w) => w.status === 'published');
  const delayedTasks = tasks.filter((t) => t.status === 'blocked');

  const handleQuickApprove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    dataStore.approveRequest(id, 'Approved from Executive Dashboard');
  };

  const handleQuickReject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const reason = prompt('Please enter a rejection reason:') || 'Rejected by approver';
    dataStore.rejectRequest(id, reason);
  };

  const kpis = [
    { title: 'SLA Compliance Rate', val: kpiMetrics.sla_compliance || '98.4%', target: '95%', trend: '+1.8%', status: 'success' },
    { title: 'Active Workflows', val: `${kpiMetrics.active_workflows || 0}`, target: '12', trend: '+3', status: 'info' },
    { title: 'Task Completion Rate', val: kpiMetrics.task_completion_rate || '80%', target: '85%', trend: '+4.2%', status: 'success' },
    { title: 'Operational Spend', val: kpiMetrics.total_spend || '$121,800', target: kpiMetrics.budget_total || '$125,000', trend: '-2.4%', status: 'success' }
  ];

  return (
    <div className="space-y-6">
      {/* 13.1 Greeting Strip */}
      <div className="p-6 rounded-2xl bg-surface-1 border border-border-subtle flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary flex items-center gap-2">
            Good morning, {currentUser.full_name} <span className="text-sm font-normal text-text-muted">👋</span>
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            <span className="font-semibold text-brand-primary">{activeWorkflows.length} active workflows</span> ·{' '}
            <span className="font-semibold text-status-warning">{pendingApprovals.length} approvals awaiting you</span> ·{' '}
            <span className="font-semibold text-status-danger">{kpiMetrics.open_incidents || 0} open incidents</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/workflows"
            className="px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-semibold text-xs transition-all flex items-center gap-1.5 shadow-glow-primary"
          >
            <Plus className="h-4 w-4" /> Create Workflow
          </Link>
          <Link
            href="/ai-assistant"
            className="px-4 py-2 rounded-lg bg-surface-2 hover:bg-surface-3 text-text-primary font-semibold text-xs transition-all flex items-center gap-1.5 border border-border-subtle"
          >
            <Sparkles className="h-4 w-4 text-brand-primary" /> Ask Copilot
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

      {/* 13.3 AI Recommendation Strip */}
      <div className="p-5 rounded-2xl bg-surface-1 border border-brand-primary/30 space-y-3 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-brand-primary animate-pulse" />
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-text-primary">
              AI Operational Recommendations ({risks.length})
            </h2>
          </div>
          <Link href="/risks" className="text-xs text-brand-primary hover:underline font-semibold">
            View All Risk Signals &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {risks.slice(0, 3).map((r) => (
            <div key={r.id} className="p-3.5 rounded-xl bg-surface-2/60 border border-border-subtle flex flex-col justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    r.severity === 'critical' || r.severity === 'high' ? 'bg-status-danger-bg text-status-danger' : 'bg-status-warning-bg text-status-warning'
                  }`}>
                    {r.severity}
                  </span>
                  <span className="text-[10px] text-text-muted font-mono">{r.detected_at}</span>
                </div>
                <p className="font-semibold text-text-primary mt-1">{r.rationale}</p>
              </div>

              <div className="flex gap-2 pt-2 border-t border-border-subtle">
                <button
                  onClick={() => {
                    dataStore.resolveRisk(r.id);
                  }}
                  className="px-2.5 py-1 rounded bg-brand-primary/20 text-brand-primary hover:bg-brand-primary hover:text-text-inverse font-semibold text-[11px] transition-all"
                >
                  Mitigate Risk
                </button>
                <Link
                  href="/tasks"
                  className="px-2.5 py-1 rounded bg-surface-3 text-text-secondary hover:text-text-primary font-semibold text-[11px]"
                >
                  Create Task
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 13.4 & 13.5 Split Section: Operational Status & Pending Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Operations Live Status Ribbon */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl bg-surface-1 border border-border-subtle space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-bold text-text-primary flex items-center gap-2">
                <Activity className="h-4 w-4 text-brand-primary" /> Active Workflow Status
              </h2>
              <Link href="/workflows" className="text-xs text-brand-primary hover:underline font-semibold">
                Manage ({workflows.length})
              </Link>
            </div>

            <div className="space-y-2.5">
              {workflows.slice(0, 4).map((wf) => (
                <div key={wf.id} className="p-3 rounded-xl bg-surface-2 border border-border-subtle flex items-center justify-between text-xs hover:border-brand-primary/40 transition-all">
                  <div className="space-y-0.5">
                    <p className="font-bold text-text-primary">{wf.name}</p>
                    <p className="text-[11px] text-text-muted">Category: {wf.category} • {wf.nodes_count} nodes • {wf.runs_this_month} runs</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-status-success-bg text-status-success uppercase">
                      {wf.status}
                    </span>
                    <button
                      onClick={() => {
                        dataStore.executeWorkflow(wf.id);
                        alert(`Workflow "${wf.name}" triggered successfully.`);
                      }}
                      className="p-1.5 rounded-lg bg-surface-3 hover:bg-brand-primary hover:text-text-inverse text-text-muted transition-colors"
                      title="Trigger Workflow Run"
                    >
                      <Play className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Tasks Overview */}
          <div className="p-5 rounded-2xl bg-surface-1 border border-border-subtle space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-bold text-text-primary flex items-center gap-2">
                <ListChecks className="h-4 w-4 text-brand-primary" /> High Priority Tasks
              </h2>
              <Link href="/tasks" className="text-xs text-brand-primary hover:underline font-semibold">
                View All ({tasks.length})
              </Link>
            </div>

            <div className="space-y-2">
              {tasks.slice(0, 3).map((task) => (
                <div key={task.id} className="p-3 rounded-xl bg-surface-2 border border-border-subtle flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-text-primary">{task.title}</p>
                    <p className="text-[11px] text-text-muted">Assigned: {task.assignee_name} • Due: {task.due_label}</p>
                  </div>
                  <button
                    onClick={() => dataStore.updateTaskStatus(task.id, task.status === 'done' ? 'in_progress' : 'done')}
                    className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all ${
                      task.status === 'done'
                        ? 'bg-status-success-bg text-status-success'
                        : 'bg-brand-primary/20 text-brand-primary hover:bg-brand-primary hover:text-text-inverse'
                    }`}
                  >
                    {task.status === 'done' ? 'Completed' : 'Mark Done'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pending Approvals Inbox */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-surface-1 border border-border-subtle space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-text-primary flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand-primary" /> Pending Approvals ({pendingApprovals.length})
            </h2>
            <Link href="/approvals" className="text-xs text-brand-primary hover:underline font-semibold">
              Open Full Inbox &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {pendingApprovals.length === 0 ? (
              <div className="p-6 text-center text-xs text-text-muted border border-dashed border-border-subtle rounded-xl">
                <CheckCircle2 className="h-8 w-8 text-status-success mx-auto mb-2 opacity-80" />
                All approvals cleared! No pending actions.
              </div>
            ) : (
              pendingApprovals.slice(0, 4).map((ap) => (
                <div key={ap.id} className="p-3.5 rounded-xl bg-surface-2 border border-border-subtle space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-text-primary">{ap.subject}</p>
                      <span className="font-mono font-bold text-brand-primary text-xs">
                        ${ap.amount.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-text-muted text-[11px] mt-0.5">
                      Requester: <span className="text-text-secondary font-medium">{ap.requester_name}</span> ({ap.department})
                    </p>
                    <p className="text-status-warning text-[10px] font-mono mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> SLA: {ap.sla_countdown || 'In 4 hours'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-border-subtle">
                    <button
                      onClick={(e) => handleQuickApprove(ap.id, e)}
                      className="flex-1 py-1.5 rounded-lg bg-status-success hover:bg-status-success/90 text-text-inverse font-bold flex items-center justify-center gap-1 text-xs shadow-sm transition-all"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                    </button>
                    <button
                      onClick={(e) => handleQuickReject(ap.id, e)}
                      className="flex-1 py-1.5 rounded-lg bg-surface-3 hover:bg-status-danger-bg hover:text-status-danger text-text-secondary font-semibold flex items-center justify-center gap-1 text-xs border border-border-subtle transition-all"
                    >
                      <XCircle className="h-3.5 w-3.5" /> Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
