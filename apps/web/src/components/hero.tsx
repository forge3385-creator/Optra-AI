'use client';

import React from 'react';
import { ArrowRight, Play, CheckCircle2, ShieldCheck, Zap, TrendingUp, AlertTriangle, Workflow, Sparkles } from 'lucide-react';

export function Hero() {
  const [activeKpi, setActiveKpi] = React.useState(0);

  const kpis = [
    { title: 'SLA Compliance Rate', val: '96.4%', trend: '+2.1%', status: 'success', label: 'Calculated hourly across 14 workflows' },
    { title: 'Process Duration', val: '4.2 days', trend: '-1.5 days', status: 'success', label: '28% faster than benchmark' },
    { title: 'Workflow Success', val: '99.1%', trend: '0.0%', status: 'info', label: '1,420 automated runs today' },
    { title: 'Operational Cost', val: '$1.32 / run', trend: '-14%', status: 'success', label: 'Cost savings target reached' }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveKpi((prev) => (prev + 1) % kpis.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-gradient-to-b from-canvas via-surface-1 to-canvas">
      {/* Background Violet Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-primary/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-brand-secondary/15 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - 60% */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-xs font-semibold tracking-wide uppercase">
              <Zap className="h-3.5 w-3.5" /> Operations Intelligence OS v1.0
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.1]">
              Run operations like an <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-tertiary bg-clip-text text-transparent">AI-driven company.</span>
            </h1>

            <p className="text-lg sm:text-xl text-text-secondary max-w-2xl leading-relaxed">
              Operations Copilot is the AI-native operations intelligence platform that turns your workflows, approvals, projects and documents into a self-driving command center.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <a
                href="http://localhost:3000/register"
                className="px-6 py-3.5 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-bold text-base transition-all flex items-center justify-center gap-2 shadow-glow-primary"
              >
                Start free trial <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#demo-video"
                className="px-6 py-3.5 rounded-lg bg-surface-2 hover:bg-surface-3 border border-border-default text-text-primary font-semibold text-base transition-all flex items-center justify-center gap-2"
              >
                <Play className="h-4 w-4 text-brand-primary fill-brand-primary" /> Watch 90-sec tour
              </a>
            </div>

            {/* Micro Trust Badge */}
            <p className="text-xs text-text-muted flex flex-wrap items-center gap-4 pt-2">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-status-success" /> No credit card required</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-brand-tertiary" /> SOC 2 Type II Certified</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-brand-tertiary" /> ISO 27001 Ready</span>
            </p>
          </div>

          {/* Right Column - 40% Animated Live Dashboard Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-surface-1 border border-border-strong p-4 sm:p-6 shadow-glow-primary backdrop-blur-xl space-y-4">
              {/* Dashboard Top Header Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-status-danger" />
                  <div className="h-3 w-3 rounded-full bg-status-warning" />
                  <div className="h-3 w-3 rounded-full bg-status-success" />
                </div>
                <div className="text-xs font-mono text-text-muted bg-bg-input px-2.5 py-1 rounded border border-border-subtle flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-status-success animate-pulse" /> LIVE DEMO TENANT
                </div>
              </div>

              {/* Active Cycle KPI Card */}
              <div className="p-4 rounded-xl bg-surface-2 border border-brand-primary/40 relative overflow-hidden transition-all duration-500">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-medium text-text-secondary">{kpis[activeKpi].title}</span>
                  <span className="text-xs font-bold text-status-success bg-status-success-bg px-2 py-0.5 rounded">
                    {kpis[activeKpi].trend}
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-text-primary tracking-tight mb-1">
                  {kpis[activeKpi].val}
                </div>
                <div className="text-xs text-text-muted">
                  {kpis[activeKpi].label}
                </div>

                {/* Animated Sparkline Graphic */}
                <div className="mt-3 h-8 flex items-end gap-1">
                  {[40, 65, 50, 80, 75, 90, 85, 98, 92, 100].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className={`flex-1 rounded-t transition-all duration-300 ${
                        i === 7 ? 'bg-brand-primary shadow-glow-primary' : 'bg-brand-secondary/40'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Realtime Action Stream Feed */}
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-text-muted px-1 flex items-center justify-between">
                  <span>Recent Automated Actions</span>
                  <span className="text-brand-tertiary">Realtime</span>
                </div>

                <div className="p-2.5 rounded-lg bg-surface-2 border border-border-subtle flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <Workflow className="h-4 w-4 text-brand-primary" />
                    <div>
                      <p className="font-semibold text-text-primary">Vendor Onboarding #1042</p>
                      <p className="text-text-muted">ERP SAP S/4HANA PO Created</p>
                    </div>
                  </div>
                  <span className="text-status-success font-mono">SUCCESS</span>
                </div>

                <div className="p-2.5 rounded-lg bg-surface-2 border border-border-subtle flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="h-4 w-4 text-brand-tertiary" />
                    <div>
                      <p className="font-semibold text-text-primary">AI Risk Scanner</p>
                      <p className="text-text-muted">Detected capacity drift in Support</p>
                    </div>
                  </div>
                  <span className="text-status-warning font-mono">RISK MITIGATED</span>
                </div>

                <div className="p-2.5 rounded-lg bg-surface-2 border border-border-subtle flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <AlertTriangle className="h-4 w-4 text-status-danger" />
                    <div>
                      <p className="font-semibold text-text-primary">Incident #482 Auto-Escalated</p>
                      <p className="text-text-muted">SEV2 PagerDuty trigger dispatched</p>
                    </div>
                  </div>
                  <span className="text-status-danger font-mono font-semibold">PAGED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
