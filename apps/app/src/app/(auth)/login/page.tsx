'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

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
    { email: 'kai@demo.app', role: 'COO / Executive' },
    { email: 'eve@demo.app', role: 'Compliance Officer' },
    { email: 'aria@demo.app', role: 'Auditor' },
    { email: 'viewer@demo.app', role: 'Viewer' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (email && password) {
        router.push('/mfa');
      } else {
        setError('Please enter your email and password');
        setLoading(false);
      }
    }, 400);
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
      <div className="p-3 rounded-xl bg-surface-2/70 border border-border-subtle space-y-2 text-xs">
        <div className="flex items-center justify-between font-bold text-text-muted text-[10px] uppercase tracking-wider">
          <span className="flex items-center gap-1"><UserCheck className="h-3 w-3 text-brand-primary" /> Demo Seed Logins</span>
          <span className="text-text-secondary">Password: Copilot#2026!</span>
        </div>
        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pt-1">
          {demoAccounts.map((acc) => (
            <button
              key={acc.email}
              type="button"
              onClick={() => {
                setEmail(acc.email);
                setPassword('Copilot#2026!');
              }}
              className={`px-2 py-1 rounded text-[11px] font-semibold border transition-all ${
                email === acc.email
                  ? 'bg-brand-primary text-text-inverse border-brand-primary'
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
              className="w-full pl-9 pr-3 py-2.5 bg-input border border-border-default rounded-lg text-sm text-text-primary focus:outline-none focus:border-brand-primary"
              placeholder="you@company.com"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-xs font-semibold text-text-secondary">Password</label>
            <Link href="/forgot" className="text-xs text-brand-primary hover:underline">Forgot password?</Link>
          </div>
          <div className="relative">
            <Lock className="h-4 w-4 text-text-muted absolute left-3 top-3" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-input border border-border-default rounded-lg text-sm text-text-primary focus:outline-none focus:border-brand-primary"
              placeholder="••••••••••••"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-text-secondary">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-border-default text-brand-primary focus:ring-0"
            />
            Remember me
          </label>
          <span className="text-text-muted text-[11px] flex items-center gap-1">
            <ShieldCheck className="h-3 w-3 text-status-success" /> MFA Code: 123456
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-glow-primary disabled:opacity-50"
        >
          {loading ? 'Authenticating...' : <>Sign in <ArrowRight className="h-4 w-4" /></>}
        </button>
      </form>

      <div className="pt-4 border-t border-border-subtle text-center text-xs text-text-muted">
        New to Operations Copilot?{' '}
        <Link href="/register" className="text-brand-primary font-semibold hover:underline">
          Create an organization account
        </Link>
      </div>
    </div>
  );
}
