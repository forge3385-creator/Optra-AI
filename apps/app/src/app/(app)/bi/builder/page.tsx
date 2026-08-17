'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, BarChart2, PieChart, LineChart, Table, Layout, Layers, RefreshCcw } from 'lucide-react';

export default function BiBuilderPage() {
  const [selectedTable, setSelectedTable] = React.useState('fact_workflow_run');
  const [chartType, setChartType] = React.useState<'bar' | 'line' | 'pie' | 'table'>('bar');

  return (
    <div className="-m-6 h-[calc(100vh-4rem)] flex flex-col bg-canvas">
      {/* Top Toolbar */}
      <div className="h-14 bg-surface-1 border-b border-border-subtle px-4 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <Link href="/bi" className="p-1.5 rounded-lg bg-surface-2 hover:bg-surface-3 text-text-muted hover:text-text-primary">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h2 className="font-bold text-text-primary">Drag-and-Drop BI Dashboard Builder</h2>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg bg-surface-2 border border-border-default font-semibold text-text-secondary">Preview Query</button>
          <button onClick={() => alert('Dashboard saved to role defaults!')} className="px-4 py-1.5 rounded-lg bg-brand-primary text-text-inverse font-bold shadow-glow-primary">
            Save Dashboard
          </button>
        </div>
      </div>

      {/* Builder Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Data Sources & Dimension Rail */}
        <div className="w-64 bg-surface-1 border-r border-border-subtle p-4 space-y-4 text-xs overflow-y-auto">
          <div>
            <label className="block font-bold text-text-muted uppercase tracking-wider text-[10px] mb-2">Select Analytics Table</label>
            <select
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
              className="w-full p-2 bg-bg-input border border-border-default rounded-lg text-text-primary font-mono"
            >
              <option value="fact_workflow_run">fact_workflow_run</option>
              <option value="fact_task_completion">fact_task_completion</option>
              <option value="fact_approval_decision">fact_approval_decision</option>
              <option value="fact_incident">fact_incident</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-text-muted uppercase tracking-wider text-[10px] mb-2">Available Dimensions</label>
            <div className="space-y-1.5 font-mono text-[11px]">
              {['tenant_id', 'workflow_id', 'department_id', 'started_at', 'duration_seconds', 'sla_breached', 'status'].map((d) => (
                <div key={d} className="p-2 rounded bg-surface-2 border border-border-subtle text-text-secondary cursor-grab flex items-center justify-between">
                  <span>{d}</span>
                  <span className="text-[9px] text-brand-tertiary">DIM</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Canvas */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          <div className="p-4 rounded-xl bg-surface-1 border border-border-subtle flex justify-between items-center text-xs">
            <span className="font-bold text-text-primary">Visualization Type:</span>
            <div className="flex gap-2">
              <button onClick={() => setChartType('bar')} className={`p-2 rounded-lg border ${chartType === 'bar' ? 'bg-brand-primary text-text-inverse border-brand-primary' : 'bg-surface-2 border-border-subtle text-text-muted'}`}><BarChart2 className="h-4 w-4" /></button>
              <button onClick={() => setChartType('line')} className={`p-2 rounded-lg border ${chartType === 'line' ? 'bg-brand-primary text-text-inverse border-brand-primary' : 'bg-surface-2 border-border-subtle text-text-muted'}`}><LineChart className="h-4 w-4" /></button>
              <button onClick={() => setChartType('pie')} className={`p-2 rounded-lg border ${chartType === 'pie' ? 'bg-brand-primary text-text-inverse border-brand-primary' : 'bg-surface-2 border-border-subtle text-text-muted'}`}><PieChart className="h-4 w-4" /></button>
            </div>
          </div>

          {/* Simulated Chart Container */}
          <div className="p-8 rounded-2xl bg-surface-1 border border-border-strong h-96 flex flex-col justify-between shadow-glow-primary">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base text-text-primary">Execution Duration vs SLA Target</h3>
              <span className="text-xs font-mono text-brand-tertiary">{selectedTable}</span>
            </div>

            {/* Visual Bar Graph Graphic */}
            <div className="h-56 flex items-end gap-4 px-4 pt-4 border-b border-l border-border-default">
              {[60, 45, 90, 75, 100, 85, 95].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div style={{ height: `${h}%` }} className="w-full bg-gradient-to-t from-brand-primary to-brand-tertiary rounded-t shadow-glow-primary transition-all duration-500" />
                  <span className="text-[10px] font-mono text-text-muted">Day {i + 1}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-xs text-text-muted font-mono">
              <span>Query Execution: 42ms</span>
              <span>Sampled 5,000 rows</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
