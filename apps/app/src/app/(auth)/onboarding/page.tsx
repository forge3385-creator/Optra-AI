'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Users, Layers, Zap, Gauge, Check, ArrowRight, X, Plus } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = React.useState(1);

  // Step 1 State
  const [displayName, setDisplayName] = React.useState('Sara');

  // Step 2 State (Teammate invitations)
  const [teammateEmail, setTeammateEmail] = React.useState('');
  const [selectedRole, setSelectedRole] = React.useState('operations_manager');
  const [invites, setInvites] = React.useState([
    { email: 'mike@acme.com', role: 'operations_manager' },
    { email: 'priya@acme.com', role: 'dept_manager' }
  ]);

  // Step 3 State (Integrations)
  const [connectedTools, setConnectedTools] = React.useState<string[]>(['slack', 'google_calendar']);

  // Step 4 State (Template)
  const [selectedTemplate, setSelectedTemplate] = React.useState('approval_chain');

  // Step 5 State (KPI)
  const [selectedKpi, setSelectedKpi] = React.useState('sla_compliance');

  const addInvite = () => {
    if (!teammateEmail.trim()) return;
    setInvites((prev) => [...prev, { email: teammateEmail, role: selectedRole }]);
    setTeammateEmail('');
  };

  const removeInvite = (idx: number) => {
    setInvites((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleFinish = () => {
    router.push('/dashboard');
  };

  return (
    <div className="space-y-6">
      {/* Wizard Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs font-semibold text-text-secondary">
          <span>Step {step} of 5</span>
          <button
            onClick={handleFinish}
            className="text-text-muted hover:text-brand-primary transition-colors text-[11px]"
          >
            Skip to Dashboard →
          </button>
        </div>
        <div className="h-1.5 w-full bg-surface-2 rounded-full overflow-hidden flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`h-full flex-1 rounded-full transition-all duration-300 ${
                i <= step ? 'bg-brand-primary' : 'bg-surface-3'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step 1: Welcome & Tell us what to call you */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-in text-center">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-brand-primary/20 border border-brand-primary flex items-center justify-center text-brand-primary shadow-glow-primary">
            <Sparkles className="h-8 w-8 animate-pulse" />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-text-primary">Welcome to Operations Copilot!</h2>
            <p className="text-xs text-text-secondary mt-1 max-w-sm mx-auto">
              Your organization workspace is created. Let's personalize your setup.
            </p>
          </div>

          <div className="text-left space-y-2 max-w-sm mx-auto">
            <label className="block text-xs font-semibold text-text-secondary">Tell us what to call you</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-3 py-2.5 bg-input border border-border-default rounded-lg text-sm text-text-primary focus:outline-none focus:border-brand-primary font-semibold"
              placeholder="e.g. Sara"
            />
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full py-3 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-glow-primary"
          >
            Next: Invite Teammates <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Step 2: Invite Teammates */}
      {step === 2 && (
        <div className="space-y-5 animate-fade-in">
          <div>
            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
              <Users className="h-5 w-5 text-brand-primary" /> Invite your team
            </h2>
            <p className="text-xs text-text-secondary mt-1">
              Add managers and employees to collaborate with RBAC access controls.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="email"
                value={teammateEmail}
                onChange={(e) => setTeammateEmail(e.target.value)}
                placeholder="colleague@acme.com"
                className="flex-1 px-3 py-2 bg-input border border-border-default rounded-lg text-xs text-text-primary focus:outline-none focus:border-brand-primary"
              />
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-2 py-2 bg-input border border-border-default rounded-lg text-xs text-text-primary focus:outline-none"
              >
                <option value="operations_manager">Ops Manager</option>
                <option value="dept_manager">Dept Manager</option>
                <option value="team_lead">Team Lead</option>
                <option value="employee">Employee</option>
                <option value="viewer">Viewer</option>
              </select>
              <button
                onClick={addInvite}
                className="px-3 py-2 bg-brand-primary text-text-inverse font-bold rounded-lg text-xs flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add
              </button>
            </div>

            {/* Chips list */}
            <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto">
              {invites.map((inv, idx) => (
                <div
                  key={idx}
                  className="px-2.5 py-1 rounded-full bg-surface-2 border border-border-subtle flex items-center gap-2 text-xs text-text-primary"
                >
                  <span>{inv.email}</span>
                  <span className="text-[10px] font-mono text-brand-tertiary">({inv.role.replace('_', ' ')})</span>
                  <button onClick={() => removeInvite(idx)} className="text-text-muted hover:text-status-danger">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2.5 rounded-lg bg-surface-2 hover:bg-surface-3 border border-border-subtle text-text-secondary text-xs font-semibold"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-1 py-2.5 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-glow-primary"
            >
              Next: Connect Tools ({invites.length} invited) <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Connect Integrations */}
      {step === 3 && (
        <div className="space-y-5 animate-fade-in">
          <div>
            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
              <Layers className="h-5 w-5 text-brand-tertiary" /> Connect Integrations
            </h2>
            <p className="text-xs text-text-secondary mt-1">
              Select key tools to sync workflow notifications and audit events.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            {[
              { id: 'slack', name: 'Slack', desc: 'Real-time notifications' },
              { id: 'google_calendar', name: 'Google Calendar', desc: 'SLA milestone alerts' },
              { id: 'github', name: 'GitHub', desc: 'PR & issue sync' },
              { id: 'salesforce', name: 'Salesforce', desc: 'CRM object triggers' }
            ].map((tool) => {
              const active = connectedTools.includes(tool.id);
              return (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() =>
                    setConnectedTools((prev) =>
                      active ? prev.filter((t) => t !== tool.id) : [...prev, tool.id]
                    )
                  }
                  className={`p-3 rounded-xl border text-left transition-all ${
                    active
                      ? 'bg-brand-primary/15 border-brand-primary text-text-primary shadow-sm'
                      : 'bg-surface-2 border-border-subtle text-text-muted hover:border-border-strong'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-text-primary">
                    <span>{tool.name}</span>
                    {active && <Check className="h-4 w-4 text-brand-primary" />}
                  </div>
                  <p className="text-[11px] text-text-muted mt-1">{tool.desc}</p>
                </button>
              );
            })}
          </div>

          <div className="p-3 rounded-lg bg-surface-2/60 border border-border-subtle text-[11px] text-text-muted flex justify-between items-center">
            <span>Don't see your tool?</span>
            <button
              onClick={() => alert('Phase 2 integration request submitted to product team!')}
              className="text-brand-primary hover:underline font-semibold"
            >
              Request Integration (Phase 2) →
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2.5 rounded-lg bg-surface-2 hover:bg-surface-3 border border-border-subtle text-text-secondary text-xs font-semibold"
            >
              Back
            </button>
            <button
              onClick={() => setStep(4)}
              className="flex-1 py-2.5 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-glow-primary"
            >
              Next: Workflow Templates <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Pick Starter Workflow Template */}
      {step === 4 && (
        <div className="space-y-5 animate-fade-in">
          <div>
            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
              <Zap className="h-5 w-5 text-status-warning" /> Pick Starter Workflow Template
            </h2>
            <p className="text-xs text-text-secondary mt-1">
              Select an automated workflow to seed into your organization workspace.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { id: 'approval_chain', name: 'Sequential Approval Chain', desc: '3-tier manager -> finance -> director approval path' },
              { id: 'it_request', name: 'IT Provisioning Request', desc: 'Automated hardware + access clearance' },
              { id: 'vendor_onboarding', name: 'Vendor Onboarding & Risk Audit', desc: 'SLA risk scanning with legal signoff' },
              { id: 'new_hire', name: 'New Hire Onboarding Pipeline', desc: 'Cross-department task dispatch' },
              { id: 'complaint_triage', name: 'Customer Complaint Triage', desc: 'SEV-1 incident escalation matrix' }
            ].map((tmpl) => (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => setSelectedTemplate(tmpl.id)}
                className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                  selectedTemplate === tmpl.id
                    ? 'bg-brand-primary/15 border-brand-primary text-text-primary shadow-sm'
                    : 'bg-surface-2 border-border-subtle text-text-muted hover:border-border-strong'
                }`}
              >
                <div>
                  <p className="font-bold text-text-primary">{tmpl.name}</p>
                  <p className="text-[11px] text-text-muted mt-0.5">{tmpl.desc}</p>
                </div>
                {selectedTemplate === tmpl.id && <Check className="h-4 w-4 text-brand-primary shrink-0 ml-2" />}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(3)}
              className="px-4 py-2.5 rounded-lg bg-surface-2 hover:bg-surface-3 border border-border-subtle text-text-secondary text-xs font-semibold"
            >
              Back
            </button>
            <button
              onClick={() => setStep(5)}
              className="flex-1 py-2.5 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-glow-primary"
            >
              Next: First KPI <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Set First KPI */}
      {step === 5 && (
        <div className="space-y-5 animate-fade-in">
          <div>
            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
              <Gauge className="h-5 w-5 text-status-success" /> Set Your Primary KPI
            </h2>
            <p className="text-xs text-text-secondary mt-1">
              Track real-time operational efficiency metrics on your executive dashboard.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { id: 'sla_compliance', name: 'SLA Compliance Rate', target: '95.0%', desc: 'Target % of workflows meeting SLA window' },
              { id: 'cycle_time', name: 'Process Cycle Time', target: '4.5 days', desc: 'Average total duration from start to finish' },
              { id: 'cost_per_process', name: 'Operational Cost / Run', target: '$1.50', desc: 'Resource spend per automated execution' }
            ].map((kpi) => (
              <button
                key={kpi.id}
                type="button"
                onClick={() => setSelectedKpi(kpi.id)}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                  selectedKpi === kpi.id
                    ? 'bg-brand-primary/15 border-brand-primary text-text-primary shadow-sm'
                    : 'bg-surface-2 border-border-subtle text-text-muted hover:border-border-strong'
                }`}
              >
                <div>
                  <p className="font-bold text-text-primary">{kpi.name}</p>
                  <p className="text-[11px] text-text-muted mt-0.5">{kpi.desc}</p>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <span className="text-xs font-mono font-bold text-brand-primary">{kpi.target}</span>
                  {selectedKpi === kpi.id && <Check className="h-4 w-4 text-brand-primary mt-1 ml-auto" />}
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setStep(4)}
              className="px-4 py-2.5 rounded-lg bg-surface-2 hover:bg-surface-3 border border-border-subtle text-text-secondary text-xs font-semibold"
            >
              Back
            </button>
            <button
              onClick={handleFinish}
              className="flex-1 py-3 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-glow-primary"
            >
              Finish Setup & Launch Dashboard <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
