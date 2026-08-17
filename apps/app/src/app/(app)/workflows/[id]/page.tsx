'use client';

import React from 'react';
import Link from 'next/link';
import {
  Workflow, Play, CheckCircle2, Save, ArrowLeft, Plus, Trash2,
  Sparkles, ShieldCheck, Siren, FileText, Zap, HelpCircle, Layers, Settings, Check
} from 'lucide-react';

export default function WorkflowBuilderPage({ params }: { params: { id: string } }) {
  const [selectedNode, setSelectedNode] = React.useState<string>('n2');
  const [nodes, setNodes] = React.useState([
    { id: 'n1', kind: 'start', label: 'Vendor Submits Request Form', desc: 'Entry trigger via web form' },
    { id: 'n2', kind: 'ai_prompt', label: 'AI Compliance Validation', desc: 'Validates Tax ID & attachments' },
    { id: 'n3', kind: 'approval', label: 'Manager Approval Gate', desc: 'Chain: Report-to manager (SLA 24h)' },
    { id: 'n4', kind: 'approval', label: 'Finance Director Signoff', desc: 'Policy: Amount >= $5,000' },
    { id: 'n5', kind: 'erp_call', label: 'SAP S/4HANA PO Generation', desc: 'POST /API_PURCHASEORDER_SRV' },
    { id: 'n6', kind: 'notification', label: 'Multi-Channel Notification', desc: 'Channels: Slack, Email' },
    { id: 'n7', kind: 'end', label: 'Process Completion', desc: 'Terminal state' }
  ]);

  const [validationResult, setValidationResult] = React.useState<string | null>(null);
  const [simulationRunning, setSimulationRunning] = React.useState(false);

  const nodePalette = [
    { kind: 'task', label: 'Task Node', icon: 'ListChecks' },
    { kind: 'approval', label: 'Approval Node', icon: 'ShieldCheck' },
    { kind: 'branch', label: 'Branch Node', icon: 'GitBranch' },
    { kind: 'parallel', label: 'Parallel Gate', icon: 'Columns' },
    { kind: 'ai_prompt', label: 'AI Prompt Node', icon: 'Sparkles' },
    { kind: 'erp_call', label: 'ERP Call Node', icon: 'Server' },
    { kind: 'notification', label: 'Notification', icon: 'Bell' },
    { kind: 'delay', label: 'Delay Timer', icon: 'Clock' }
  ];

  const handleAddNode = (kind: string, label: string) => {
    const newId = `n${nodes.length + 1}`;
    setNodes([...nodes, { id: newId, kind, label, desc: `Newly added ${kind} node` }]);
    setSelectedNode(newId);
  };

  const handleValidate = () => {
    setValidationResult('Graph validation passed: 0 cycles, all paths reconverge, schemas valid.');
    setTimeout(() => setValidationResult(null), 4000);
  };

  const handleSimulate = () => {
    setSimulationRunning(true);
    setTimeout(() => {
      setSimulationRunning(false);
      alert('Dry-run simulation complete: Synthetic payload executed through all 7 nodes in 140ms.');
    }, 1200);
  };

  const currentNode = nodes.find((n) => n.id === selectedNode) || nodes[1];

  return (
    <div className="-m-6 h-[calc(100vh-4rem)] flex flex-col bg-canvas">
      {/* Top Builder Toolbar */}
      <div className="h-14 bg-surface-1 border-b border-border-subtle px-4 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <Link href="/workflows" className="p-1.5 rounded-lg bg-surface-2 hover:bg-surface-3 text-text-muted hover:text-text-primary">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h2 className="font-bold text-text-primary flex items-center gap-2">
              Vendor Onboarding & ERP Trigger <span className="text-[10px] font-mono text-brand-tertiary">v3.0 (Draft)</span>
            </h2>
            <p className="text-[10px] text-text-muted">Last saved 2 minutes ago</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {validationResult && (
            <span className="text-[11px] font-mono text-status-success bg-status-success-bg px-2.5 py-1 rounded border border-status-success/30 flex items-center gap-1">
              <Check className="h-3 w-3" /> {validationResult}
            </span>
          )}

          <button
            onClick={handleValidate}
            className="px-3 py-1.5 rounded-lg bg-surface-2 hover:bg-surface-3 border border-border-default text-text-secondary hover:text-text-primary font-semibold"
          >
            Validate Graph
          </button>

          <button
            onClick={handleSimulate}
            disabled={simulationRunning}
            className="px-3 py-1.5 rounded-lg bg-surface-2 hover:bg-surface-3 border border-border-default text-text-primary font-semibold flex items-center gap-1.5"
          >
            <Play className="h-3.5 w-3.5 text-brand-tertiary fill-current" /> {simulationRunning ? 'Simulating...' : 'Simulate Dry-Run'}
          </button>

          <button className="px-3 py-1.5 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-bold flex items-center gap-1.5 shadow-glow-primary">
            <Save className="h-3.5 w-3.5" /> Publish Version
          </button>
        </div>
      </div>

      {/* 3-Pane Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane 1: Node Palette */}
        <div className="w-56 bg-surface-1 border-r border-border-subtle p-3 space-y-4 text-xs overflow-y-auto">
          <p className="font-bold text-text-muted uppercase tracking-wider text-[10px]">Node Palette</p>
          <div className="space-y-1.5">
            {nodePalette.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleAddNode(p.kind, p.label)}
                className="w-full text-left p-2.5 rounded-lg bg-surface-2 hover:bg-surface-3 border border-border-subtle hover:border-brand-primary text-text-secondary hover:text-text-primary font-medium flex items-center justify-between group transition-all"
              >
                <span>{p.label}</span>
                <Plus className="h-3.5 w-3.5 text-text-muted group-hover:text-brand-primary" />
              </button>
            ))}
          </div>
        </div>

        {/* Center Pane 2: Visual Canvas Grid */}
        <div className="flex-1 bg-canvas p-8 overflow-auto relative flex justify-center items-start">
          {/* Subtle Canvas Dot Grid Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#2a1b4e_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

          {/* Node Diagram Chain Visualizer */}
          <div className="w-full max-w-lg space-y-6 relative z-10">
            {nodes.map((node, i) => {
              const isSelected = selectedNode === node.id;
              return (
                <div key={node.id} className="flex flex-col items-center">
                  <div
                    onClick={() => setSelectedNode(node.id)}
                    className={`w-full p-4 rounded-xl border transition-all cursor-pointer shadow-md ${
                      isSelected
                        ? 'bg-surface-2 border-brand-primary shadow-glow-primary'
                        : 'bg-surface-1 border-border-default hover:border-border-strong'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-bg-input text-brand-primary border border-border-subtle font-bold">
                        {node.kind}
                      </span>
                      <span className="text-[10px] font-mono text-text-muted">{node.id}</span>
                    </div>
                    <h4 className="font-bold text-sm text-text-primary">{node.label}</h4>
                    <p className="text-xs text-text-muted mt-1">{node.desc}</p>
                  </div>

                  {/* Connecting Arrow */}
                  {i < nodes.length - 1 && (
                    <div className="h-6 w-0.5 bg-brand-primary/40 my-1 relative">
                      <div className="absolute bottom-0 -left-[3px] border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent border-t-brand-primary" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Pane 3: Node Inspector Component */}
        <div className="w-80 bg-surface-1 border-l border-border-subtle p-4 space-y-5 text-xs overflow-y-auto">
          <div className="flex justify-between items-center border-b border-border-subtle pb-3">
            <div>
              <h3 className="font-bold text-sm text-text-primary">Node Inspector</h3>
              <p className="text-[10px] text-text-muted">Inspecting {currentNode.id}</p>
            </div>
            <button
              onClick={() => {
                if (nodes.length > 2) {
                  setNodes(nodes.filter((n) => n.id !== currentNode.id));
                  setSelectedNode(nodes[0].id);
                }
              }}
              className="p-1.5 rounded bg-status-danger-bg text-status-danger hover:opacity-80"
              title="Delete Node"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-text-secondary mb-1">Node Title</label>
              <input
                type="text"
                value={currentNode.label}
                onChange={(e) => {
                  const val = e.target.value;
                  setNodes(nodes.map((n) => (n.id === currentNode.id ? { ...n, label: val } : n)));
                }}
                className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block font-semibold text-text-secondary mb-1">Node Kind</label>
              <input
                type="text"
                disabled
                value={currentNode.kind}
                className="w-full px-3 py-2 bg-bg-input border border-border-subtle rounded-lg text-text-muted font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-text-secondary mb-1">Target SLA (Minutes)</label>
              <input
                type="number"
                defaultValue={1440}
                className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary"
              />
            </div>

            {/* Live Node JSON Preview */}
            <div>
              <label className="block font-semibold text-text-secondary mb-1">Node JSON Definition</label>
              <pre className="p-3 rounded-lg bg-bg-input border border-border-subtle font-mono text-[10px] text-brand-tertiary overflow-x-auto">
{JSON.stringify(currentNode, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
