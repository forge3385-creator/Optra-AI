'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, KeyRound, ArrowRight } from 'lucide-react';

export default function MfaPage() {
  const router = useRouter();
  const [code, setCode] = React.useState(['1', '2', '3', '4', '5', '6']);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const updated = [...code];
    updated[index] = val;
    setCode(updated);

    // Auto-advance
    if (val && index < 5) {
      const nextInput = document.getElementById(`totp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      // Redirect to main Executive Dashboard
      router.push('/dashboard');
    }, 400);
  };

  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto h-12 w-12 rounded-xl bg-brand-primary/20 border border-brand-primary flex items-center justify-center text-brand-primary">
        <ShieldCheck className="h-6 w-6" />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-text-primary">Two-Factor Challenge</h2>
        <p className="text-xs text-text-secondary mt-1">
          Enter the 6-digit verification code from your authenticator app.
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-6">
        <div className="flex justify-center gap-2">
          {code.map((digit, i) => (
            <input
              key={i}
              id={`totp-${i}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              className="w-11 h-12 text-center text-xl font-bold bg-bg-input border border-border-default rounded-lg text-brand-primary focus:outline-none focus:border-brand-primary"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-glow-primary"
        >
          {loading ? 'Verifying...' : <>Verify & Continue <ArrowRight className="h-4 w-4" /></>}
        </button>
      </form>

      <div className="text-xs text-text-muted">
        Having trouble? <button className="text-brand-primary underline font-medium">Use backup recovery code</button>
      </div>
    </div>
  );
}
