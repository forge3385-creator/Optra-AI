import React from 'react';
import Link from 'next/link';
import { Sparkles, Shield, CheckCircle2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-surface-1 border-t border-border-subtle pt-16 pb-12 text-sm text-text-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Brand */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-brand-primary/20 border border-brand-primary flex items-center justify-center text-brand-primary">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-bold text-lg text-text-primary">OperationsCopilot</span>
            </Link>
            <p className="text-text-secondary max-w-sm">
              The AI-native operations intelligence platform that turns workflows, approvals, projects, and documents into a self-driving command center.
            </p>
            <div className="flex items-center gap-3 text-xs text-text-muted pt-2">
              <span className="flex items-center gap-1"><Shield className="h-3.5 w-3.5 text-status-success" /> SOC 2 Type II</span>
              <span>•</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-status-success" /> ISO 27001</span>
              <span>•</span>
              <span>GDPR Ready</span>
            </div>
          </div>

          {/* Col 2: Product */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Product</h4>
            <ul className="space-y-2.5">
              <li><Link href="/product" className="hover:text-brand-primary transition-colors">Workflow Builder</Link></li>
              <li><Link href="/product" className="hover:text-brand-primary transition-colors">Task Management</Link></li>
              <li><Link href="/product" className="hover:text-brand-primary transition-colors">Approval Engine</Link></li>
              <li><Link href="/product" className="hover:text-brand-primary transition-colors">AI Assistant</Link></li>
              <li><Link href="/product" className="hover:text-brand-primary transition-colors">Incident Tracker</Link></li>
              <li><Link href="/product" className="hover:text-brand-primary transition-colors">Risk Detection</Link></li>
              <li><Link href="/product" className="hover:text-brand-primary transition-colors">BI Builder</Link></li>
            </ul>
          </div>

          {/* Col 3: Solutions */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Solutions</h4>
            <ul className="space-y-2.5">
              <li><Link href="/solutions/enterprise" className="hover:text-brand-primary transition-colors">Enterprise Ops</Link></li>
              <li><Link href="/solutions/sme" className="hover:text-brand-primary transition-colors">Mid-Market</Link></li>
              <li><Link href="/solutions/enterprise" className="hover:text-brand-primary transition-colors">Financial Services</Link></li>
              <li><Link href="/solutions/enterprise" className="hover:text-brand-primary transition-colors">Healthcare & Life Sci</Link></li>
              <li><Link href="/solutions/enterprise" className="hover:text-brand-primary transition-colors">Supply Chain</Link></li>
              <li><Link href="/solutions/enterprise" className="hover:text-brand-primary transition-colors">IT & Security</Link></li>
            </ul>
          </div>

          {/* Col 4: Resources & Legal */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Resources</h4>
            <ul className="space-y-2.5">
              <li><Link href="/docs" className="hover:text-brand-primary transition-colors">Documentation</Link></li>
              <li><Link href="/docs" className="hover:text-brand-primary transition-colors">API Reference</Link></li>
              <li><Link href="/security" className="hover:text-brand-primary transition-colors">Security Center</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-brand-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-brand-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/legal/dpa" className="hover:text-brand-primary transition-colors">DPA & Compliance</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} Operations Copilot Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-brand-primary">Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-brand-primary">LinkedIn</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-brand-primary">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
