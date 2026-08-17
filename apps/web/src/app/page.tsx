'use client';

import React from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import {
  Workflow, ListChecks, Sparkles, ShieldCheck, Siren, KanbanSquare,
  Activity, FileText, Users, Gauge, ShieldAlert, BarChart3, Bell, Zap,
  CheckCircle2, ArrowRight, Shield, ChevronDown, Lock, Server, Cpu, Database
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = React.useState(0);
  const [billingCycle, setBillingCycle] = React.useState<'monthly' | 'annual'>('annual');
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  const logos = ['Acme Corp', 'FinTech Global', 'AeroLogistics', 'HealthPulse', 'OmniRetail', 'CloudScale Inc.'];

  const whatItDoes = [
    {
      icon: <Workflow className="h-6 w-6 text-brand-primary" />,
      title: 'Visual Workflow Builder',
      desc: 'Drag-and-drop React Flow canvas with 14 specialized node kinds, automated graph validation, side-by-side version diffing, and zero-code execution.'
    },
    {
      icon: <Sparkles className="h-6 w-6 text-brand-tertiary" />,
      title: 'AI Operations Assistant',
      desc: 'Context-aware LangGraph LLM orchestration engine with native tool calling, document RAG, inline form assistance, and prebuilt operational slash commands.'
    },
    {
      icon: <ShieldAlert className="h-6 w-6 text-status-warning" />,
      title: 'Predictive Risk & SLA Engine',
      desc: 'Gradient-boosted ML models running continuous background scans to detect workload imbalances, SLA breach probabilities, and operational policy drift.'
    }
  ];

  const modules = [
    { icon: <Workflow className="h-4 w-4" />, name: 'Workflow Automation', desc: 'Visual React Flow graph engine supporting branch, parallel, ERP call, and delay nodes.' },
    { icon: <ListChecks className="h-4 w-4" />, name: 'Task & Work Management', desc: 'Switchable AG Grid table, Kanban board, custom Gantt chart, and Calendar views with time tracking.' },
    { icon: <Sparkles className="h-4 w-4" />, name: 'AI Operations Assistant', desc: 'Streaming SSE operational copilot chat with tool invocation cards and slash commands.' },
    { icon: <ShieldCheck className="h-4 w-4" />, name: 'Approval Management', desc: 'Dynamic approval policy engine with drag reordering, multi-step wizards, and mobile inbox.' },
    { icon: <Siren className="h-4 w-4" />, name: 'Incident Management', desc: 'SEV1-SEV4 triage kanban, CAPA item tracking, and automated AI postmortem generation.' },
    { icon: <KanbanSquare className="h-4 w-4" />, name: 'Project Operations', desc: 'Milestone tracking, project Gantt, departmental budget variance, and resource heatmaps.' },
    { icon: <Activity className="h-4 w-4" />, name: 'Business Process Monitoring', desc: 'Process inventory, node completion heatmaps, and live tail execution streaming.' },
    { icon: <FileText className="h-4 w-4" />, name: 'Document & SOP Library', desc: 'Tiptap markdown editor, PDF viewer with TOC, and hybrid BM25 + pgvector RAG search.' },
    { icon: <Users className="h-4 w-4" />, name: 'Meeting & Action Tracking', desc: 'Calendar scheduling, Whisper transcription integration, and AI action item extraction.' },
    { icon: <Gauge className="h-4 w-4" />, name: 'KPI Dashboard', desc: '12 default operational KPIs, executive ribbon, and custom SQL query definition editor.' },
    { icon: <ShieldAlert className="h-4 w-4" />, name: 'AI Risk Detection', desc: 'Continuous risk source scanner, 4-quadrant severity matrix, and automated alerts.' },
    { icon: <BarChart3 className="h-4 w-4" />, name: 'Business Intelligence', desc: 'Drag-and-drop BI dashboard builder over PostgreSQL analytics star schema.' },
    { icon: <Bell className="h-4 w-4" />, name: 'Notification Hub', desc: '8 multi-channel router (Slack, Teams, Email, SMS, Push) with quiet hours & templates.' },
    { icon: <Zap className="h-4 w-4" />, name: 'End-to-End Execution', desc: '20 canonical workflow templates for rapid 1-click onboarding and automation.' }
  ];

  const integrations = [
    'SAP S/4HANA', 'Oracle ERP Cloud', 'Dynamics 365', 'Odoo', 'Salesforce', 'HubSpot',
    'Zoho CRM', 'Slack', 'Microsoft Teams', 'Google Workspace', 'Microsoft 365', 'Notion',
    'Jira', 'ClickUp', 'Asana', 'Trello', 'Linear', 'WhatsApp Business', 'Twilio SMS',
    'SendGrid', 'Zoom', 'Google Meet', 'Okta', 'Azure AD', 'OneLogin', 'JumpCloud'
  ];

  const faqs = [
    {
      q: 'How does Operations Copilot connect to our existing ERP and CRM systems?',
      a: 'Operations Copilot provides out-of-the-box OAuth 2.0 and API adapters for SAP, Oracle, Dynamics 365, Salesforce, HubSpot, and 25+ other enterprise tools. Connections take under 2 minutes to authorize.'
    },
    {
      q: 'Is our operational data isolated and secure?',
      a: 'Yes. Every database row and log line includes a tenant_id enforcing PostgreSQL Row-Level Security (RLS). All data is encrypted at rest (AES-256) and in transit (TLS 1.3).'
    },
    {
      q: 'Can we deploy Operations Copilot on-premises or in a private cloud?',
      a: 'Absolutely. We support 5 deployment models: Multi-tenant SaaS, Dedicated Cloud, Private Cloud, Hybrid Cloud, and On-Premises via single-command Helm charts and Terraform modules.'
    },
    {
      q: 'How does the AI Assistant respect user roles and RBAC?',
      a: 'The AI Orchestrator checks permissions before executing any tool call. If a user does not have permission to approve a request or edit a task, the assistant rejects the action with a permissions error.'
    }
  ];

  return (
    <div className="min-h-screen bg-canvas text-text-primary">
      <Navbar />

      {/* Section 1: Hero */}
      <Hero />

      {/* Section 2: Logos */}
      <section className="py-10 border-y border-border-subtle bg-surface-1/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-6">
            Trusted by operations teams at fast-growing enterprises
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-70">
            {logos.map((logo, idx) => (
              <span key={idx} className="font-bold text-lg text-text-secondary hover:text-text-primary transition-colors tracking-wide">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: What It Does Grid */}
      <section className="py-20 bg-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary">
              Built for high-velocity operational intelligence
            </h2>
            <p className="text-text-secondary text-base sm:text-lg">
              Unify fragmented processes, eliminate manual task handoffs, and predict operational breaches before they impact your SLA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whatItDoes.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-surface-1 border border-border-subtle hover:border-brand-primary/50 transition-all hover:shadow-glow-primary group"
              >
                <div className="h-12 w-12 rounded-xl bg-surface-2 border border-border-default flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Module Deep-Dive Interactive Showcase */}
      <section className="py-20 bg-surface-1 border-y border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">14 Core Product Modules</span>
            <h2 className="text-3xl font-extrabold text-text-primary">Everything your operations center needs</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Module Tabs */}
            <div className="lg:col-span-5 space-y-2 max-h-[500px] overflow-y-auto pr-2">
              {modules.map((mod, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                    activeTab === idx
                      ? 'bg-surface-2 border-brand-primary text-text-primary shadow-md'
                      : 'bg-canvas/50 border-border-subtle text-text-secondary hover:bg-surface-2/60'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${activeTab === idx ? 'bg-brand-primary/20 text-brand-primary' : 'bg-surface-1 text-text-muted'}`}>
                    {mod.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{mod.name}</p>
                    <p className="text-xs text-text-muted line-clamp-1">{mod.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Right Module Display Preview */}
            <div className="lg:col-span-7 rounded-2xl bg-canvas border border-border-strong p-6 flex flex-col justify-between shadow-glow-primary">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-brand-primary/20 text-brand-primary border border-brand-primary/40">
                    {modules[activeTab].icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary">{modules[activeTab].name}</h3>
                    <span className="text-xs text-brand-tertiary font-mono">Module #{activeTab + 1} of 14</span>
                  </div>
                </div>
                <p className="text-text-secondary text-base leading-relaxed">
                  {modules[activeTab].desc}
                </p>

                <div className="p-4 rounded-xl bg-surface-1 border border-border-subtle space-y-3 font-mono text-xs text-text-secondary">
                  <div className="flex justify-between border-b border-border-subtle pb-2">
                    <span className="text-text-muted">Status:</span>
                    <span className="text-status-success font-semibold">Active & Operational</span>
                  </div>
                  <div className="flex justify-between border-b border-border-subtle pb-2">
                    <span className="text-text-muted">API Endpoint:</span>
                    <span className="text-brand-tertiary">GET /v1/{modules[activeTab].name.toLowerCase().replace(/\s+/g, '-')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">RBAC Guard:</span>
                    <span className="text-text-primary">Enforced at SQL / RLS level</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border-subtle flex justify-end">
                <a
                  href="http://localhost:3000/register"
                  className="px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-semibold text-sm transition-all flex items-center gap-1.5"
                >
                  Explore in app <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: KPI Band */}
      <section className="py-16 bg-gradient-to-r from-brand-primary/10 via-surface-1 to-brand-secondary/10 border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-extrabold text-brand-primary">10,000+</p>
              <p className="text-sm font-medium text-text-secondary mt-1">Workflows Automated / Day</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-brand-tertiary">96.4%</p>
              <p className="text-sm font-medium text-text-secondary mt-1">Avg SLA Compliance Rate</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-status-success">&lt; 400ms</p>
              <p className="text-sm font-medium text-text-secondary mt-1">API p95 Response Time</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-text-primary">30+</p>
              <p className="text-sm font-medium text-text-secondary mt-1">Enterprise Integrations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Integrations Wall */}
      <section className="py-20 bg-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-tertiary">Ecosystem</span>
          <h2 className="text-3xl font-extrabold text-text-primary mt-2 mb-4">Connect every tool in your stack</h2>
          <p className="text-text-secondary max-w-2xl mx-auto mb-12">
            Seamless out-of-the-box bidirectional integrations for ERP, CRM, communication, identity, and productivity platforms.
          </p>

          <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
            {integrations.map((item, i) => (
              <div key={i} className="px-4 py-2.5 rounded-xl bg-surface-1 border border-border-subtle text-xs font-semibold text-text-secondary hover:border-brand-primary hover:text-text-primary transition-all">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Security & Compliance */}
      <section className="py-20 bg-surface-1 border-y border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-status-success">Enterprise Security</span>
              <h2 className="text-3xl font-extrabold text-text-primary">Built for strict regulatory compliance</h2>
              <p className="text-text-secondary leading-relaxed">
                Operations Copilot enforces tenant isolation at the PostgreSQL Row-Level Security level, encrypts all credentials with KMS keys, and provides immutable audit logging for every mutating API call.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-text-primary">
                  <ShieldCheck className="h-5 w-5 text-status-success" /> Row-Level Security (RLS) PostgreSQL schema
                </div>
                <div className="flex items-center gap-3 text-sm text-text-primary">
                  <Lock className="h-5 w-5 text-status-success" /> JWT RS256 signing + rotating JWKS keys
                </div>
                <div className="flex items-center gap-3 text-sm text-text-primary">
                  <Server className="h-5 w-5 text-status-success" /> TOTP MFA enforcement for administrative roles
                </div>
                <div className="flex items-center gap-3 text-sm text-text-primary">
                  <Database className="h-5 w-5 text-status-success" /> AES-256 encrypted integration secrets & SAML SSO
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-canvas border border-border-default text-center space-y-2">
                <div className="h-12 w-12 rounded-xl bg-brand-primary/10 text-brand-primary mx-auto flex items-center justify-center font-bold text-lg">SOC2</div>
                <h4 className="font-bold text-text-primary">SOC 2 Type II</h4>
                <p className="text-xs text-text-muted">Security, Confidentiality & Availability compliant</p>
              </div>
              <div className="p-6 rounded-2xl bg-canvas border border-border-default text-center space-y-2">
                <div className="h-12 w-12 rounded-xl bg-brand-tertiary/10 text-brand-tertiary mx-auto flex items-center justify-center font-bold text-lg">27001</div>
                <h4 className="font-bold text-text-primary">ISO 27001</h4>
                <p className="text-xs text-text-muted">Information Security Management standard</p>
              </div>
              <div className="p-6 rounded-2xl bg-canvas border border-border-default text-center space-y-2">
                <div className="h-12 w-12 rounded-xl bg-status-success/10 text-status-success mx-auto flex items-center justify-center font-bold text-lg">GDPR</div>
                <h4 className="font-bold text-text-primary">GDPR & DPA</h4>
                <p className="text-xs text-text-muted">EU Data Privacy & right to deletion supported</p>
              </div>
              <div className="p-6 rounded-2xl bg-canvas border border-border-default text-center space-y-2">
                <div className="h-12 w-12 rounded-xl bg-status-warning/10 text-status-warning mx-auto flex items-center justify-center font-bold text-lg">HIPAA</div>
                <h4 className="font-bold text-text-primary">HIPAA BAA</h4>
                <p className="text-xs text-text-muted">Healthcare PHI isolation support ready</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Pricing Cards */}
      <section className="py-20 bg-canvas" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <h2 className="text-3xl font-extrabold text-text-primary">Simple, transparent pricing</h2>
            <p className="text-text-secondary text-base">Scale your operations intelligence without unexpected cost spikes.</p>

            {/* Toggle */}
            <div className="inline-flex items-center bg-surface-1 p-1 rounded-xl border border-border-default">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${billingCycle === 'monthly' ? 'bg-brand-primary text-text-inverse' : 'text-text-secondary'}`}
              >
                Billed Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${billingCycle === 'annual' ? 'bg-brand-primary text-text-inverse' : 'text-text-secondary'}`}
              >
                Billed Annual (Save 20%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="p-8 rounded-2xl bg-surface-1 border border-border-subtle flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-text-primary">Starter</h3>
                <p className="text-xs text-text-muted mt-1">For small teams automating core workflows</p>
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-text-primary">$0</span>
                  <span className="text-xs text-text-muted"> / forever free</span>
                </div>
                <ul className="space-y-3 text-xs text-text-secondary mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-status-success" /> Up to 5 team seats</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-status-success" /> All 14 core modules</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-status-success" /> 500 workflow runs / month</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-status-success" /> 200 AI assistant messages / month</li>
                </ul>
              </div>
              <a href="http://localhost:3000/register?plan=starter" className="w-full py-3 rounded-lg border border-border-default hover:bg-surface-2 text-center text-sm font-semibold text-text-primary transition-all">
                Start free
              </a>
            </div>

            {/* Growth (Recommended) */}
            <div className="p-8 rounded-2xl bg-surface-2 border-2 border-brand-primary shadow-glow-primary flex flex-col justify-between relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-primary text-text-inverse text-[10px] font-bold uppercase tracking-wider rounded-full">
                Most Popular
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary">Growth</h3>
                <p className="text-xs text-text-muted mt-1">For fast-growing operational teams</p>
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-text-primary">${billingCycle === 'annual' ? '24' : '29'}</span>
                  <span className="text-xs text-text-muted"> / seat / month</span>
                </div>
                <ul className="space-y-3 text-xs text-text-secondary mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-primary" /> Up to 50 team seats</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-primary" /> Unlimited workflow runs</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-primary" /> 5,000 AI messages / month</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-primary" /> Predictive SLA & Risk engine</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-primary" /> SAML SSO + MFA enforcement</li>
                </ul>
              </div>
              <a href="http://localhost:3000/register?plan=growth" className="w-full py-3 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-center text-sm font-bold text-text-inverse transition-all shadow-md">
                Start 14-day trial
              </a>
            </div>

            {/* Enterprise */}
            <div className="p-8 rounded-2xl bg-surface-1 border border-border-subtle flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-text-primary">Enterprise</h3>
                <p className="text-xs text-text-muted mt-1">For large organizations requiring custom SLAs & deployment</p>
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-text-primary">Custom</span>
                </div>
                <ul className="space-y-3 text-xs text-text-secondary mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-tertiary" /> Unlimited seats</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-tertiary" /> Private Cloud / On-Prem Helm deployment</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-tertiary" /> Bring Your Own LLM (BYO LLM)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-tertiary" /> 99.95% Uptime SLA + Dedicated CSM</li>
                </ul>
              </div>
              <a href="mailto:sales@operationscopilot.io" className="w-full py-3 rounded-lg border border-border-default hover:bg-surface-2 text-center text-sm font-semibold text-text-primary transition-all">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: FAQ Accordion */}
      <section className="py-20 bg-surface-1 border-t border-border-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-text-primary">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl bg-canvas border border-border-subtle overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-5 font-semibold text-text-primary flex justify-between items-center text-base"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 text-brand-primary transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-sm text-text-secondary leading-relaxed border-t border-border-subtle pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 10: Final CTA Glow Banner */}
      <section className="py-20 bg-canvas relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-primary/10 blur-[150px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10 space-y-6">
          <h2 className="text-4xl font-extrabold text-text-primary">
            Ready to transform your operations center?
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Join enterprise operations teams automating workflows, mitigating SLA breaches, and accelerating execution today.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <a
              href="http://localhost:3000/register"
              className="px-8 py-4 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-bold text-lg shadow-glow-primary transition-all flex items-center gap-2"
            >
              Start free trial in 60 seconds <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
