'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Workflow, ListChecks, ShieldCheck, KanbanSquare,
  FileText, Users, Siren, Activity, ShieldAlert, Gauge, Sparkles, Bell,
  Shield, Settings, ChevronLeft, ChevronRight
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  // Locked 15-item nav hierarchy matching v1.1 §7.13 / §10
  const mainNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Workflows', href: '/workflows', icon: Workflow, badge: '14' },
    { name: 'Tasks', href: '/tasks', icon: ListChecks, badge: '30' },
    { name: 'Approvals', href: '/approvals', icon: ShieldCheck, badge: '3' },
    { name: 'Projects', href: '/projects', icon: KanbanSquare },
    { name: 'Documents', href: '/documents', icon: FileText },
    { name: 'Meetings', href: '/meetings', icon: Users },
    { name: 'Incidents', href: '/incidents', icon: Siren, badge: '3' },
    { name: 'Monitor', href: '/monitor', icon: Activity },
    { name: 'Risks', href: '/risks', icon: ShieldAlert, badge: '2' },
    { name: 'KPI', href: '/kpis', icon: Gauge },
  ];

  const footerNavItems = [
    { name: 'AI Assistant', href: '/ai-assistant', icon: Sparkles, highlight: true, pinned: true },
    { name: 'Notifications', href: '/notifications', icon: Bell },
  ];

  const adminNavItems = [
    { name: 'Audit', href: '/admin/audit', icon: Shield },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside
      className={`fixed top-16 left-0 bottom-0 z-40 bg-surface-1 border-r border-border-subtle transition-all duration-300 flex flex-col justify-between ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Navigation Scroll Area */}
      <div className="py-4 px-2 space-y-4 overflow-y-auto flex-1">
        {/* Core Journey (1-11) */}
        <div>
          {!collapsed && (
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">
              Operations Platform
            </p>
          )}
          <nav className="space-y-1">
            {mainNavItems.map((item) => {
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
                  }`}
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

        {/* Footer Group (12-13) */}
        <div className="pt-3 border-t border-border-subtle">
          {!collapsed && (
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">
              Copilot & Feed
            </p>
          )}
          <nav className="space-y-1">
            {footerNavItems.map((item) => {
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
                  } ${item.highlight ? 'bg-brand-primary/10 text-brand-primary font-bold border border-brand-primary/20' : ''}`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${item.highlight ? 'text-brand-primary animate-pulse' : active ? 'text-brand-primary' : 'text-text-muted'}`} />
                  {!collapsed && <span className="truncate">{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Admin Group (14-15) */}
        <div className="pt-3 border-t border-border-subtle">
          {!collapsed && (
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">
              Administration
            </p>
          )}
          <nav className="space-y-1">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname.startsWith(item.href + '/');

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
