'use client';

import React from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-canvas text-text-primary">
      <Navbar />
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">Pricing & Plans</span>
          <h1 className="text-4xl font-extrabold text-text-primary">Transparent pricing built for scale</h1>
          <p className="text-text-secondary text-lg">
            Choose the plan that fits your operational needs. Every tier includes all 14 core modules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-surface-1 border border-border-subtle flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold">Starter</h3>
              <p className="text-xs text-text-muted mt-1">Free forever for small operational teams</p>
              <div className="my-6">
                <span className="text-4xl font-extrabold">$0</span>
              </div>
              <ul className="space-y-3 text-xs text-text-secondary mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-status-success" /> 5 team seats</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-status-success" /> All 14 modules included</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-status-success" /> 500 workflow runs / month</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-status-success" /> Community support</li>
              </ul>
            </div>
            <a href="http://localhost:3000/register?plan=starter" className="w-full py-3 bg-surface-2 border border-border-default rounded-lg text-center font-semibold hover:bg-surface-3">Start Free</a>
          </div>

          <div className="p-8 rounded-2xl bg-surface-2 border-2 border-brand-primary shadow-glow-primary flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold">Growth</h3>
              <p className="text-xs text-text-muted mt-1">For growing operational organizations</p>
              <div className="my-6">
                <span className="text-4xl font-extrabold">$29</span>
                <span className="text-xs text-text-muted"> / seat / mo</span>
              </div>
              <ul className="space-y-3 text-xs text-text-secondary mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-primary" /> Up to 50 team seats</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-primary" /> Unlimited workflow runs</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-primary" /> Predictive SLA & Risk Detection</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-primary" /> SAML SSO + MFA Enforcement</li>
              </ul>
            </div>
            <a href="http://localhost:3000/register?plan=growth" className="w-full py-3 bg-brand-primary text-text-inverse rounded-lg text-center font-bold shadow-md hover:bg-brand-primary-hover">Start 14-Day Trial</a>
          </div>

          <div className="p-8 rounded-2xl bg-surface-1 border border-border-subtle flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold">Enterprise</h3>
              <p className="text-xs text-text-muted mt-1">For large scale deployment & custom requirements</p>
              <div className="my-6">
                <span className="text-4xl font-extrabold">Custom</span>
              </div>
              <ul className="space-y-3 text-xs text-text-secondary mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-tertiary" /> Unlimited seats</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-tertiary" /> Private Cloud / On-Prem Helm deployment</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-tertiary" /> Bring Your Own LLM (BYO LLM)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-tertiary" /> 99.95% Uptime SLA + Dedicated CSM</li>
              </ul>
            </div>
            <a href="mailto:sales@operationscopilot.io" className="w-full py-3 bg-surface-2 border border-border-default rounded-lg text-center font-semibold hover:bg-surface-3">Contact Sales</a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
