'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Building, Globe, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = React.useState('Sara Connor');
  const [email, setEmail] = React.useState('sara@demo.app');
  const [password, setPassword] = React.useState('Copilot#2026!');
  const [companyName, setCompanyName] = React.useState('AlgoForce Demo Co.');
  const [subdomain, setSubdomain] = React.useState('demo');
  const [plan, setPlan] = React.useState<'starter' | 'growth' | 'enterprise'>('growth');
  const [terms, setTerms] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Create tenant workspace</h2>
        <p className="text-xs text-text-secondary mt-1">
          Set up your organization on Operations Copilot in under 60 seconds.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-text-secondary mb-1">Full Name</label>
          <div className="relative">
            <User className="h-4 w-4 text-text-muted absolute left-3 top-2.5" />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-brand-primary"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-text-secondary mb-1">Work Email</label>
          <div className="relative">
            <Mail className="h-4 w-4 text-text-muted absolute left-3 top-2.5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-brand-primary"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-text-secondary mb-1">Password</label>
          <div className="relative">
            <Lock className="h-4 w-4 text-text-muted absolute left-3 top-2.5" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-brand-primary"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-text-secondary mb-1">Company Name</label>
            <div className="relative">
              <Building className="h-4 w-4 text-text-muted absolute left-3 top-2.5" />
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-brand-primary"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-text-secondary mb-1">Workspace Subdomain</label>
            <div className="relative">
              <Globe className="h-4 w-4 text-text-muted absolute left-3 top-2.5" />
              <input
                type="text"
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-brand-primary"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-text-secondary mb-1">Select Plan</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'starter', label: 'Starter (Free)' },
              { id: 'growth', label: 'Growth (Trial)' },
              { id: 'enterprise', label: 'Enterprise' }
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlan(p.id as any)}
                className={`py-2 px-2 rounded-lg border text-[11px] font-semibold text-center transition-all ${
                  plan === p.id
                    ? 'bg-brand-primary/20 border-brand-primary text-brand-primary'
                    : 'bg-bg-input border-border-default text-text-muted'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            className="rounded border-border-default text-brand-primary"
            required
          />
          <span className="text-text-secondary">I agree to the Terms of Service & Privacy Policy</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-glow-primary"
        >
          {loading ? 'Creating Workspace...' : <>Create Workspace <ArrowRight className="h-4 w-4" /></>}
        </button>
      </form>

      <div className="pt-2 text-center text-xs text-text-muted">
        Already have a tenant account?{' '}
        <Link href="/login" className="text-brand-primary font-semibold hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
