'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, User, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function InviteAcceptPage({ params }: { params: { token: string } }) {
  const router = useRouter();
  const [password, setPassword] = React.useState('Copilot#2026!');
  const [enableMfa, setEnableMfa] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  // Mock invitation metadata derived from token or defaults
  const inviteData = {
    email: 'mike@acme.com',
    role: 'Operations Manager',
    orgName: 'Acme Industrial Logistics',
    inviter: 'Sara Patel',
    expiresIn: '6 days'
  };

  const getPasswordStrength = (pwd: string) => {
    if (pwd.length < 6) return { label: 'Weak', score: 1, color: 'bg-status-danger' };
    if (pwd.length < 10 || !/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd)) {
      return { label: 'Medium', score: 2, color: 'bg-status-warning' };
    }
    return { label: 'Strong', score: 3, color: 'bg-status-success' };
  };

  const pwdStrength = getPasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (enableMfa) {
        router.push('/mfa');
      } else {
        router.push('/dashboard');
      }
    }, 400);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-[11px] font-semibold mb-2">
          <ShieldCheck className="h-3.5 w-3.5" /> Organization Invitation
        </div>
        <h2 className="text-2xl font-bold text-text-primary">Join {inviteData.orgName}</h2>
        <p className="text-xs text-text-secondary mt-1">
          Invited by <span className="font-semibold text-text-primary">{inviteData.inviter}</span> as <span className="font-semibold text-brand-primary">{inviteData.role}</span>.
        </p>
      </div>

      {/* Invitation Summary Card */}
      <div className="p-3.5 rounded-xl bg-surface-2/60 border border-border-subtle text-xs space-y-2">
        <div className="flex justify-between items-center text-text-muted">
          <span>Work Email</span>
          <span className="font-mono text-text-primary font-semibold">{inviteData.email}</span>
        </div>
        <div className="flex justify-between items-center text-text-muted">
          <span>Assigned Role</span>
          <span className="font-semibold text-brand-tertiary">{inviteData.role}</span>
        </div>
        <div className="flex justify-between items-center text-text-muted">
          <span>Link Status</span>
          <span className="text-status-success font-semibold flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> Valid ({inviteData.expiresIn} remaining)
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block font-semibold text-text-secondary">Set Your Password</label>
            <span className={`text-[10px] font-bold ${pwdStrength.color.replace('bg-', 'text-')}`}>
              {pwdStrength.label}
            </span>
          </div>
          <div className="relative">
            <Lock className="h-4 w-4 text-text-muted absolute left-3 top-2.5" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-input border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-brand-primary"
              required
            />
          </div>
          <div className="flex gap-1 mt-1.5">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-1 flex-1 rounded-full transition-all ${
                  step <= pwdStrength.score ? pwdStrength.color : 'bg-surface-3'
                }`}
              />
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer p-3 rounded-xl bg-surface-2 border border-border-subtle">
          <input
            type="checkbox"
            checked={enableMfa}
            onChange={(e) => setEnableMfa(e.target.checked)}
            className="rounded border-border-default text-brand-primary"
          />
          <div>
            <p className="font-semibold text-text-primary">Enable Two-Factor Authentication (TOTP MFA)</p>
            <p className="text-[11px] text-text-muted">Recommended for account security</p>
          </div>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-glow-primary"
        >
          {loading ? 'Setting up Account...' : <>Accept Invitation & Enter Dashboard <ArrowRight className="h-4 w-4" /></>}
        </button>
      </form>
    </div>
  );
}
