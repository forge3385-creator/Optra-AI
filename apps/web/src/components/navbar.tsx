'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Shield, Layers, DollarSign, FileText, Menu, X } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-canvas/80 border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-brand-primary/20 border border-brand-primary flex items-center justify-center text-brand-primary shadow-glow-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-text-primary">
            Operations<span className="text-brand-primary">Copilot</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
          <Link href="/product" className="hover:text-brand-primary transition-colors">Product</Link>
          <Link href="/solutions/enterprise" className="hover:text-brand-primary transition-colors">Solutions</Link>
          <Link href="/pricing" className="hover:text-brand-primary transition-colors">Pricing</Link>
          <Link href="/customers" className="hover:text-brand-primary transition-colors">Customers</Link>
          <Link href="/security" className="hover:text-brand-primary transition-colors flex items-center gap-1">
            <Shield className="h-3.5 w-3.5 text-brand-tertiary" /> Security
          </Link>
          <Link href="/docs" className="hover:text-brand-primary transition-colors">Docs</Link>
          <Link href="/blog" className="hover:text-brand-primary transition-colors">Blog</Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="http://localhost:3000/login"
            className="text-sm font-medium text-text-secondary hover:text-text-primary px-3 py-2 transition-colors"
          >
            Sign in
          </a>
          <a
            href="http://localhost:3000/register"
            className="text-sm font-semibold px-4 py-2 rounded-md bg-brand-primary text-text-inverse hover:bg-brand-primary-hover transition-all flex items-center gap-1.5 shadow-glow-primary"
          >
            Start free <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-text-secondary hover:text-text-primary"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-1 border-b border-border-default px-4 pt-2 pb-6 space-y-3 text-sm">
          <Link href="/product" className="block py-2 text-text-secondary">Product</Link>
          <Link href="/solutions/enterprise" className="block py-2 text-text-secondary">Solutions</Link>
          <Link href="/pricing" className="block py-2 text-text-secondary">Pricing</Link>
          <Link href="/customers" className="block py-2 text-text-secondary">Customers</Link>
          <Link href="/security" className="block py-2 text-text-secondary">Security</Link>
          <Link href="/docs" className="block py-2 text-text-secondary">Docs</Link>
          <div className="pt-4 flex flex-col gap-2">
            <a href="http://localhost:3000/login" className="w-full text-center py-2 border border-border-default rounded-md text-text-primary">Sign in</a>
            <a href="http://localhost:3000/register" className="w-full text-center py-2 bg-brand-primary rounded-md text-text-inverse font-semibold">Start free</a>
          </div>
        </div>
      )}
    </header>
  );
}
