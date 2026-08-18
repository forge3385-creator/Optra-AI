'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Workflow, ListChecks, ShieldCheck, KanbanSquare,
  FileText, Users, Siren, Activity, ShieldAlert, Gauge, Sparkles, Bell,
  Shield, Settings, ChevronLeft, ChevronRight, X, BarChart3, Link2
} from 'lucide-react';
import { dataStore } from '@/lib/data-store';

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggle: () => void;
  onNavigation?: () => void;
}

export function Sidebar({ collapsed, mobileOpen, onToggle, onNavigation }: SidebarProps) {
  const pathname = usePathname();
  const [kpis, setKpis] = React.useState<any>({});

  React.useEffect(() => {
    const update = () => setKpis(dataStore.getCalculatedKPIs());
    update();
    return dataStore.subscribe(update);
  }, []);

  const mainNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Workflows', href: '/workflows', icon: Workflow, badgeKey: 'active_workflows' },
    { name: 'Tasks', href: '/tasks', icon: ListChecks },
    { name: 'Approvals', href: '/approvals', icon: ShieldCheck, badgeKey: 'pending_approvals' },
    { name: 'Projects', href: '/projects', icon: KanbanSquare },
    { name: 'Documents', href: '/documents', icon: FileText },
    { name: 'Meetings', href: '/meetings', icon: Users },
    { name: 'Incidents', href: '/incidents', icon: Siren, badgeKey: 'open_incidents' },
    { name: 'Monitor', href: '/monitor', icon: Activity },
    { name: 'Risks', href: '/risks', icon: ShieldAlert, badgeKey: 'operational_risks' },
    { name: 'KPI', href: '/kpis', icon: Gauge },
    { name: 'Analytics', href: '/bi', icon: BarChart3 },
  ];

  const footerNavItems = [
    { name: 'AI Copilot', href: '/ai-assistant', icon: Sparkles, highlight: true },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'Integrations', href: '/integrations', icon: Link2 },
  ];

  const adminNavItems = [
    { name: 'Audit', href: '/admin', icon: Shield },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const NavLink = ({ item }: { item: any }) => {
    const Icon = item.icon;
    const active = pathname === item.href || pathname.startsWith(item.href + '/');
    const badge = item.badgeKey ? kpis[item.badgeKey] : undefined;
    const showBadge = badge !== undefined && Number(badge) > 0;

    return (
      <Link
        href={item.href}
        onClick={onNavigation}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all relative ${
          active
            ? 'bg-brand-primary/15 text-brand-primary border border-brand-primary/30 shadow-sm'
            : 'text-text-secondary hover:bg-surface-2 hover:text-text-primary'
        } ${item.highlight && !active ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20' : ''}`}
      >
        <Icon className={`h-4 w-4 shrink-0 ${item.highlight ? 'text-brand-primary animate-pulse' : active ? 'text-brand-primary' : 'text-text-muted'}`} />
        {(!collapsed || mobileOpen) && (
          <span className="truncate flex-1">{item.name}</span>
        )}
        {(!collapsed || mobileOpen) && showBadge && (
          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
            item.badgeKey === 'open_incidents' || item.badgeKey === 'operational_risks'
              ? 'bg-status-danger-bg text-status-danger'
              : 'bg-surface-3 text-text-secondary border border-border-subtle'
          }`}>
            {badge}
          </span>
        )}
      </Link>
    );
  };

  const SectionLabel = ({ label }: { label: string }) => {
    if (collapsed && !mobileOpen) return null;
    return (
      <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-text-muted mb-1.5">
        {label}
      </p>
    );
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex fixed top-16 left-0 bottom-0 z-40 bg-surface-1 border-r border-border-subtle transition-all duration-300 flex-col justify-between ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className="py-4 px-2 space-y-4 overflow-y-auto flex-1">
          <div>
            <SectionLabel label="Operations" />
            <nav className="space-y-0.5">
              {mainNavItems.map((item) => <NavLink key={item.name} item={item} />)}
            </nav>
          </div>

          <div className="pt-2 border-t border-border-subtle">
            <SectionLabel label="Copilot & Feed" />
            <nav className="space-y-0.5">
              {footerNavItems.map((item) => <NavLink key={item.name} item={item} />)}
            </nav>
          </div>

          <div className="pt-2 border-t border-border-subtle">
            <SectionLabel label="Admin" />
            <nav className="space-y-0.5">
              {adminNavItems.map((item) => <NavLink key={item.name} item={item} />)}
            </nav>
          </div>
        </div>

        <div className="p-2 border-t border-border-subtle">
          <button
            onClick={onToggle}
            className="w-full p-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border-subtle flex items-center justify-center text-text-muted hover:text-text-primary transition-colors text-xs font-medium gap-2"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <><ChevronLeft className="h-4 w-4" /> Collapse</>}
          </button>
        </div>
      </aside>

      {/* Mobile sidebar drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-surface-1 border-r border-border-subtle flex flex-col transition-transform duration-300 md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between p-4 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-brand-primary flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-sm text-text-primary">Optra AI</span>
          </div>
          <button
            onClick={onNavigation}
            className="p-1.5 rounded-lg hover:bg-surface-2 text-text-muted hover:text-text-primary transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile nav */}
        <div className="flex-1 overflow-y-auto py-4 px-2 space-y-4">
          <div>
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-text-muted mb-1.5">Operations</p>
            <nav className="space-y-0.5">
              {mainNavItems.map((item) => <NavLink key={item.name} item={item} />)}
            </nav>
          </div>

          <div className="pt-2 border-t border-border-subtle">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-text-muted mb-1.5">Copilot & Feed</p>
            <nav className="space-y-0.5">
              {footerNavItems.map((item) => <NavLink key={item.name} item={item} />)}
            </nav>
          </div>

          <div className="pt-2 border-t border-border-subtle">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-text-muted mb-1.5">Admin</p>
            <nav className="space-y-0.5">
              {adminNavItems.map((item) => <NavLink key={item.name} item={item} />)}
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}
