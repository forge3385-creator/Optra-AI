'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Search, Bell, Command, ChevronDown, User, LogOut, Settings, ShieldAlert } from 'lucide-react';

interface HeaderProps {
  onOpenCommandPalette: () => void;
}

export function Header({ onOpenCommandPalette }: HeaderProps) {
  const [tenantOpen, setTenantOpen] = React.useState(false);
  const [notifOpen, setNotifOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  return (
    <header className="h-16 fixed top-0 left-0 right-0 z-50 bg-surface-1 border-b border-border-subtle flex items-center justify-between px-4 sm:px-6">
      {/* Brand & Tenant Switcher */}
      <div className="flex items-center gap-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-brand-primary/20 border border-brand-primary flex items-center justify-center text-brand-primary shadow-glow-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-extrabold text-lg text-text-primary hidden sm:inline tracking-tight">
            Operations<span className="text-brand-primary">Copilot</span>
          </span>
        </Link>

        {/* Tenant Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setTenantOpen(!tenantOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-input border border-border-default text-xs font-semibold text-text-primary hover:border-brand-primary transition-all"
          >
            <span className="h-2 w-2 rounded-full bg-status-success" />
            <span>AlgoForce Demo Co.</span>
            <ChevronDown className="h-3.5 w-3.5 text-text-muted" />
          </button>

          {tenantOpen && (
            <div className="absolute left-0 mt-2 w-56 rounded-xl bg-surface-3 border border-border-strong p-2 shadow-2xl z-50 text-xs space-y-1">
              <div className="px-2 py-1 text-[10px] font-bold text-text-muted uppercase">Active Tenant</div>
              <button className="w-full text-left px-2.5 py-1.5 rounded bg-brand-primary/20 text-brand-primary font-semibold flex items-center justify-between">
                <span>AlgoForce Demo Co.</span>
                <span className="text-[10px] bg-brand-primary text-text-inverse px-1.5 py-0.5 rounded font-bold">Growth</span>
              </button>
              <button className="w-full text-left px-2.5 py-1.5 rounded hover:bg-surface-2 text-text-secondary">
                Acme Enterprise (Staging)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Global Search & Command Palette Trigger (⌘K) */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-lg bg-bg-input border border-border-default text-xs text-text-muted hover:border-brand-primary transition-all"
        >
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-text-muted" />
            <span>Search workflows, tasks, risks, documents...</span>
          </div>
          <kbd className="px-2 py-0.5 rounded bg-surface-2 border border-border-subtle font-mono text-[10px] text-text-secondary flex items-center gap-0.5">
            <Command className="h-3 w-3" /> K
          </kbd>
        </button>
      </div>

      {/* User Actions & Notifications */}
      <div className="flex items-center gap-3">
        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2 rounded-lg bg-surface-2 border border-border-subtle text-text-secondary hover:text-text-primary relative transition-colors"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-brand-primary shadow-glow-primary" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl bg-surface-3 border border-border-strong p-3 shadow-2xl z-50 text-xs space-y-3">
              <div className="flex justify-between items-center border-b border-border-subtle pb-2">
                <span className="font-bold text-text-primary">Notifications</span>
                <span className="text-[10px] text-brand-primary hover:underline cursor-pointer">Mark all as read</span>
              </div>
              <div className="space-y-2">
                <div className="p-2 rounded bg-surface-2 border border-border-subtle space-y-1">
                  <p className="font-semibold text-text-primary">Approval Requested</p>
                  <p className="text-[11px] text-text-muted">Vendor Onboarding PO #1042 awaiting your review.</p>
                </div>
                <div className="p-2 rounded bg-surface-2 border border-border-subtle space-y-1">
                  <p className="font-semibold text-status-warning flex items-center gap-1">
                    <ShieldAlert className="h-3 w-3" /> SLA Breach Risk Detected
                  </p>
                  <p className="text-[11px] text-text-muted">Task "IT Security Audit" is 78% likely to breach SLA.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 p-1 rounded-lg bg-surface-2 border border-border-subtle hover:border-brand-primary transition-all"
          >
            <div className="h-7 w-7 rounded-md bg-brand-primary text-text-inverse font-bold flex items-center justify-center text-xs">
              SC
            </div>
            <span className="text-xs font-semibold text-text-primary hidden sm:inline">Sara Connor</span>
            <ChevronDown className="h-3.5 w-3.5 text-text-muted" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-surface-3 border border-border-strong p-1.5 shadow-2xl z-50 text-xs space-y-1">
              <div className="px-2 py-1.5 border-b border-border-subtle">
                <p className="font-bold text-text-primary">Sara Connor</p>
                <p className="text-[10px] text-text-muted">Company Admin • Operations</p>
              </div>
              <Link href="/settings" className="flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-surface-2 text-text-secondary">
                <Settings className="h-3.5 w-3.5" /> Settings
              </Link>
              <Link href="/login" className="flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-surface-2 text-status-danger">
                <LogOut className="h-3.5 w-3.5" /> Sign out
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
