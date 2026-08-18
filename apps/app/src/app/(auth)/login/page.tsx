'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { dataStore } from '../../../lib/data-store';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState('sara@demo.app');
  const [password, setPassword] = React.useState('Copilot#2026!');
  const [rememberMe, setRememberMe] = React.useState(true);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const demoAccounts = [
    { email: 'sara@demo.app', role: 'Company Admin' },
    { email: 'mike@demo.app', role: 'Operations Manager' },
    { email: 'priya@demo.app', role: 'Department Manager' },
    { email: 'jonas@demo.app', role: 'Team Lead' },
    { email: 'lin@demo.app', role: 'Employee' },
    { email: 'eve@demo.app', role: 'Compliance Officer' },
    { email: 'aria@demo.app', role: 'Auditor' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (email && password) {
        dataStore.setActiveUser(email);
        router.push('/dashboard');
      } else {
        setError('Please enter your email and password');
        setLoading(false);
      }
    }, 300);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-text-primary">Sign in</h2>
        <p className="text-xs text-text-secondary mt-1">
          Enter your credentials to access your operations command center.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-status-danger-bg border border-status-danger text-xs text-status-danger font-semibold">
          {error}
        </div>
      )}

      {/* Demo Seed Quick Selector */}
      <div className="p-3.5 rounded-2xl bg-surface-2 border border-border-subtle space-y-2 text-xs">
        <div className="flex items-center justify-between font-bold text-text-muted text-[10px] uppercase tracking-wider">
          <span className="flex items-center gap-1"><UserCheck className="h-3.5 w-3.5 text-brand-primary" /> Demo Seed Profiles</span>
          <span className="text-text-secondary font-mono">Password: Copilot#2026!</span>
        </div>
        <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pt-1">
          {demoAccounts.map((acc) => (
            <button
              key={acc.email}
              type="button"
              onClick={() => {
                setEmail(acc.email);
                setPassword('Copilot#2026!');
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
                email === acc.email
                  ? 'bg-brand-primary text-text-inverse border-brand-primary shadow-sm'
                  : 'bg-surface-3 border-border-subtle text-text-secondary hover:text-text-primary'
              }`}
            >
              {acc.role} ({acc.email.split('@')[0]})
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-1">Work Email</label>
          <div className="relative">
            <Mail className="h-4 w-4 text-text-muted absolute left-3 top-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-bg-input border border-border-default rounded-lg text-sm text-text-primary focus:outline-none focus:border-brand-primary"
              placeholder="you@company.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-1">Password</label>
          <div className="relative">
            <Lock className="h-4 w-4 text-text-muted absolute left-3 top-3" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-bg-input border border-border-default rounded-lg text-sm text-text-primary focus:outline-none focus:border-brand-primary"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-glow-primary"
        >
          {loading ? 'Authenticating...' : 'Sign In to Command Center'}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
