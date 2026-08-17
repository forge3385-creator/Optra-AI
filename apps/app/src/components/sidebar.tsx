'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Workflow, ListChecks, Sparkles, ShieldCheck, Siren, KanbanSquare,
  Activity, FileText, Users, Gauge, ShieldAlert, BarChart3, Bell, Zap,
  ChevronLeft, ChevronRight, Settings, Shield, LayoutDashboard, HelpCircle
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const moduleItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Workflows', href: '/workflows', icon: Workflow, badge: '14' },
    { name: 'Tasks & Work', href: '/tasks', icon: ListChecks, badge: '30' },
    { name: 'AI Assistant', href: '/ai-assistant', icon: Sparkles, highlight: true },
    { name: 'Approvals', href: '/approvals', icon: ShieldCheck, badge: '3' },
    { name: 'Incidents', href: '/incidents', icon: Siren, badge: '3' },
    { name: 'Projects', href: '/projects', icon: KanbanSquare },
    { name: 'BPM Monitoring', href: '/bi/monitoring', icon: Activity },
    { name: 'Documents & SOPs', href: '/documents', icon: FileText },
    { name: 'Meetings', href: '/meetings', icon: Users },
    { name: 'KPI Dashboard', href: '/kpis', icon: Gauge },
    { name: 'AI Risk Scanner', href: '/risks', icon: ShieldAlert, badge: '2' },
    { name: 'Business Intelligence', href: '/bi', icon: BarChart3 },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'E2E Workflows', href: '/workflows/e2e', icon: Zap },
  ];

  const adminItems = [
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Admin & RBAC', href: '/admin', icon: Shield },
  ];

  return (
    <aside
      className={`fixed top-16 left-0 bottom-0 z-40 bg-surface-1 border-r border-border-subtle transition-all duration-300 flex flex-col justify-between ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Navigation List */}
      <div className="py-4 px-2 space-y-6 overflow-y-auto flex-1">
        {/* Modules Group */}
        <div>
          {!collapsed && (
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">
              Operations Intelligence
            </p>
          )}
          <nav className="space-y-1">
            {moduleItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname.startsWith(item.href + '/');

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all relative ${
                    active
                      ? 'bg-brand-primary/15 text-brand-primary border border-brand-primary/30 shadow-sm'
                      : 'text-text-secondary hover:bg-surface-2 hover:text-text-primary'
                  } ${item.highlight ? 'text-brand-tertiary font-bold' : ''}`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${active ? 'text-brand-primary' : 'text-text-muted'}`} />
                  {!collapsed && <span className="truncate">{item.name}</span>}

                  {!collapsed && item.badge && (
                    <span className="ml-auto px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-surface-3 text-text-secondary border border-border-subtle">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Admin Group */}
        <div>
          {!collapsed && (
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">
              Administration
            </p>
          )}
          <nav className="space-y-1">
            {adminItems.map((item) => {
              const Icon = item.icon;
              const active = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    active
                      ? 'bg-brand-primary/15 text-brand-primary border border-brand-primary/30'
                      : 'text-text-secondary hover:bg-surface-2 hover:text-text-primary'
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${active ? 'text-brand-primary' : 'text-text-muted'}`} />
                  {!collapsed && <span className="truncate">{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Collapse Toggle */}
      <div className="p-2 border-t border-border-subtle flex items-center justify-between">
        <button
          onClick={onToggle}
          className="w-full p-2 rounded-lg bg-surface-2 hover:bg-surface-3 border border-border-subtle flex items-center justify-center text-text-muted hover:text-text-primary transition-colors text-xs font-medium gap-2"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <><ChevronLeft className="h-4 w-4" /> Collapse Sidebar</>}
        </button>
      </div>
    </aside>
  );
}
