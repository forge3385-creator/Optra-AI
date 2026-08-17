'use client';

import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight, Lock } from 'lucide-react';

interface ComingSoonHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  earlyAccessEmailCapture?: boolean;
  illustrationSrc?: string;
}

export function ComingSoonHero({
  eyebrow,
  title,
  description,
  bullets,
  earlyAccessEmailCapture = true,
}: ComingSoonHeroProps) {
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 text-center space-y-8">
      {/* Eyebrow & Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-xs font-semibold">
        <Lock className="h-3.5 w-3.5" />
        <span>{eyebrow} — Phase 2 Q4 2026</span>
      </div>

      {/* Main Title & Description */}
      <div className="space-y-4 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
          {title}
        </h1>
        <p className="text-sm text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>

      {/* Bullet Capabilities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
        {bullets.map((bullet, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-surface-1 border border-border-subtle flex items-start gap-3 text-xs"
          >
            <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
            <span className="text-text-primary font-medium">{bullet}</span>
          </div>
        ))}
      </div>

      {/* Early Access Email Capture */}
      {earlyAccessEmailCapture && (
        <div className="max-w-md mx-auto p-6 rounded-2xl bg-surface-1 border border-border-strong shadow-glow-primary space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-text-primary">
            <Sparkles className="h-4 w-4 text-brand-tertiary" />
            <span>Get Priority Early Access</span>
          </div>

          {submitted ? (
            <div className="p-3 rounded-lg bg-status-success-bg border border-status-success text-status-success text-xs font-semibold">
              Thank you! You're on the early access priority list.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="work.email@company.com"
                className="flex-1 px-3 py-2 bg-input border border-border-default rounded-lg text-xs text-text-primary focus:outline-none focus:border-brand-primary"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-bold text-xs transition-all flex items-center gap-1 shadow-glow-primary"
              >
                Notify Me <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
