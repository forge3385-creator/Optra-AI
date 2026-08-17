'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Building, Globe, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = React.useState('Sara Patel');
  const [email, setEmail] = React.useState('sara@acme.com');
  const [password, setPassword] = React.useState('Copilot#2026!');
  const [orgName, setOrgName] = React.useState('Acme Industrial Logistics');
  const [subdomain, setSubdomain] = React.useState('acme');
  const [industry, setIndustry] = React.useState('Manufacturing');
  const [companySize, setCompanySize] = React.useState('50-200 employees');
  const [plan, setPlan] = React.useState<'free' | 'growth' | 'enterprise'>('growth');
  const [terms, setTerms] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  // Password strength calculator
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
      router.push('/onboarding');
    }, 400);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-text-primary flex items-center gap-2">
          Create your organization <Sparkles className="h-5 w-5 text-brand-primary" />
        </h2>
        <p className="text-xs text-text-secondary mt-1">
          Set up your B2B enterprise workspace in under 60 seconds.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Personal Details */}
        <div className="space-y-3 p-3 rounded-xl bg-surface-2/60 border border-border-subtle">
          <p className="font-bold text-text-muted uppercase text-[10px] tracking-wider">Account Administrator</p>
          <div>
            <label className="block font-semibold text-text-secondary mb-1">Your Name</label>
            <div className="relative">
              <User className="h-4 w-4 text-text-muted absolute left-3 top-2.5" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-input border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-brand-primary"
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
                className="w-full pl-9 pr-3 py-2 bg-input border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-brand-primary"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block font-semibold text-text-secondary">Password</label>
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
            {/* Strength meter bar */}
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
        </div>

        {/* Organization Details */}
        <div className="space-y-3 p-3 rounded-xl bg-surface-2/60 border border-border-subtle">
          <p className="font-bold text-text-muted uppercase text-[10px] tracking-wider">Organization Profile</p>
          <div>
            <label className="block font-semibold text-text-secondary mb-1">Organization Name</label>
            <div className="relative">
              <Building className="h-4 w-4 text-text-muted absolute left-3 top-2.5" />
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-input border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-brand-primary"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-text-secondary mb-1">Workspace Subdomain</label>
            <div className="flex items-center">
              <div className="relative flex-1">
                <Globe className="h-4 w-4 text-text-muted absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  className="w-full pl-9 pr-3 py-2 bg-input border border-border-default rounded-l-lg text-text-primary focus:outline-none focus:border-brand-primary font-mono"
                  required
                />
              </div>
              <span className="px-3 py-2 bg-surface-3 border border-l-0 border-border-default rounded-r-lg text-text-muted font-mono text-[11px]">
                .operationscopilot.io
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-text-secondary mb-1">Industry</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-3 py-2 bg-input border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-brand-primary"
              >
                <option>Manufacturing</option>
                <option>Technology & SaaS</option>
                <option>Healthcare & Pharma</option>
                <option>Financial Services</option>
                <option>Retail & Logistics</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-text-secondary mb-1">Company Size</label>
              <select
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
                className="w-full px-3 py-2 bg-input border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-brand-primary"
              >
                <option>1-10 employees</option>
                <option>11-50 employees</option>
                <option>50-200 employees</option>
                <option>201-1000 employees</option>
                <option>1000+ employees</option>
              </select>
            </div>
          </div>
        </div>

        {/* Plan Selection */}
        <div>
          <label className="block font-semibold text-text-secondary mb-1">Select Plan</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'free', label: 'Free Tier', desc: 'Up to 5 users' },
              { id: 'growth', label: 'Growth', desc: '14-day trial' },
              { id: 'enterprise', label: 'Enterprise', desc: 'Dedicated SLA' }
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlan(p.id as any)}
                className={`py-2 px-2 rounded-lg border text-left transition-all ${
                  plan === p.id
                    ? 'bg-brand-primary/20 border-brand-primary text-text-primary shadow-sm'
                    : 'bg-input border-border-default text-text-muted hover:border-border-strong'
                }`}
              >
                <div className="font-bold text-[11px] text-text-primary flex items-center justify-between">
                  <span>{p.label}</span>
                  {plan === p.id && <Check className="h-3 w-3 text-brand-primary" />}
                </div>
                <span className="text-[10px] text-text-muted">{p.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Terms */}
        <label className="flex items-start gap-2 cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            className="rounded border-border-default text-brand-primary mt-0.5"
            required
          />
          <span className="text-text-secondary text-[11px] leading-snug">
            I agree to the <span className="text-brand-primary underline">Terms of Service</span> and <span className="text-brand-primary underline">Data Processing Addendum</span>.
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-glow-primary"
        >
          {loading ? 'Creating Organization...' : <>Create Organization <ArrowRight className="h-4 w-4" /></>}
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
