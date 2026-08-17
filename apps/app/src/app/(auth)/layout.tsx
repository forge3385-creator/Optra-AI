import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center p-4 relative overflow-hidden">
      {/* Violet radial backdrop gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-brand-primary/20 border border-brand-primary flex items-center justify-center text-brand-primary shadow-glow-primary">
              <Sparkles className="h-6 w-6" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-text-primary">
              Operations<span className="text-brand-primary">Copilot</span>
            </span>
          </Link>
        </div>

        {/* 480px Card */}
        <div className="p-8 rounded-2xl bg-surface-1 border border-border-strong shadow-glow-primary backdrop-blur-xl">
          {children}
        </div>
      </div>
    </div>
  );
}
