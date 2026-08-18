'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Search, Bell, Command, ChevronDown, User, LogOut, Settings, ShieldAlert, CheckCircle2, Menu } from 'lucide-react';
import { dataStore, NotificationItem, UserProfile } from '../lib/data-store';

interface HeaderProps {
  onOpenCommandPalette: () => void;
  onToggleMobileSidebar?: () => void;
}

export function Header({ onOpenCommandPalette, onToggleMobileSidebar }: HeaderProps) {
  const router = useRouter();
  const [tenantOpen, setTenantOpen] = React.useState(false);
  const [notifOpen, setNotifOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState<NotificationItem[]>([]);
  const [currentUser, setCurrentUser] = React.useState<UserProfile>(dataStore.getActiveUser());
  const [users, setUsers] = React.useState<UserProfile[]>([]);

  React.useEffect(() => {
    const update = () => {
      setNotifications(dataStore.listNotifications());
      setCurrentUser(dataStore.getActiveUser());
      setUsers(dataStore.listUsers());
    };
    update();
    return dataStore.subscribe(update);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    dataStore.markAllNotificationsAsRead();
  };

  const handleSwitchUser = (userId: string) => {
    dataStore.setActiveUser(userId);
    setUserMenuOpen(false);
  };

  return (
    <header className="h-16 fixed top-0 left-0 right-0 z-50 bg-surface-1 border-b border-border-subtle flex items-center justify-between px-4 sm:px-6">
      {/* Brand & Mobile Menu */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* Mobile hamburger */}
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-surface-2 text-text-muted hover:text-text-primary transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>
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
                <span className="text-[10px] bg-brand-primary text-text-inverse px-1.5 py-0.5 rounded font-bold">Enterprise</span>
              </button>
              <button
                onClick={() => setTenantOpen(false)}
                className="w-full text-left px-2.5 py-1.5 rounded hover:bg-surface-2 text-text-secondary"
              >
                Acme Global Ops (Staging)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Global Search & Command Palette Trigger (⌘K) */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-lg bg-bg-input border border-border-default text-xs text-text-muted hover:border-brand-primary transition-all shadow-sm"
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
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-brand-primary shadow-glow-primary animate-pulse" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl bg-surface-3 border border-border-strong p-3 shadow-2xl z-50 text-xs space-y-3">
              <div className="flex justify-between items-center border-b border-border-subtle pb-2">
                <span className="font-bold text-text-primary">Notifications ({unreadCount} unread)</span>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-[10px] text-brand-primary hover:underline font-semibold"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-center text-text-muted py-4">No notifications</p>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        dataStore.markNotificationAsRead(notif.id);
                        if (notif.link) {
                          router.push(notif.link);
                          setNotifOpen(false);
                        }
                      }}
                      className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                        notif.read
                          ? 'bg-surface-2/40 border-border-subtle text-text-secondary'
                          : 'bg-surface-2 border-brand-primary/40 text-text-primary shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-xs flex items-center gap-1.5">
                          {notif.type === 'incident' ? (
                            <ShieldAlert className="h-3.5 w-3.5 text-status-danger" />
                          ) : notif.type === 'approval' ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-brand-primary" />
                          ) : null}
                          {notif.title}
                        </p>
                        {!notif.read && <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />}
                      </div>
                      <p className="text-[11px] text-text-muted mt-1 leading-snug">{notif.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Menu & Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 p-1 rounded-lg bg-surface-2 border border-border-subtle hover:border-brand-primary transition-all"
          >
            <div className="h-7 w-7 rounded-md bg-brand-primary text-text-inverse font-bold flex items-center justify-center text-xs">
              {currentUser.avatar_initials}
            </div>
            <span className="text-xs font-semibold text-text-primary hidden sm:inline">{currentUser.full_name}</span>
            <ChevronDown className="h-3.5 w-3.5 text-text-muted" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl bg-surface-3 border border-border-strong p-2 shadow-2xl z-50 text-xs space-y-2">
              <div className="px-2 py-1.5 border-b border-border-subtle">
                <p className="font-bold text-text-primary">{currentUser.full_name}</p>
                <p className="text-[10px] text-brand-tertiary font-medium">{currentUser.role} • {currentUser.department}</p>
              </div>

              <div>
                <p className="px-2 py-1 text-[10px] font-bold text-text-muted uppercase tracking-wider">Switch User Role (Demo RBAC)</p>
                <div className="space-y-1 max-h-36 overflow-y-auto">
                  {users.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => handleSwitchUser(u.id)}
                      className={`w-full text-left px-2 py-1 rounded text-[11px] flex justify-between items-center transition-all ${
                        u.id === currentUser.id
                          ? 'bg-brand-primary text-text-inverse font-bold'
                          : 'hover:bg-surface-2 text-text-secondary'
                      }`}
                    >
                      <span>{u.full_name}</span>
                      <span className="text-[10px] opacity-80">{u.role}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-border-subtle space-y-1">
                <Link
                  href="/admin"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-surface-2 text-text-secondary"
                >
                  <Settings className="h-3.5 w-3.5" /> Admin & Audit Logs
                </Link>
                <Link
                  href="/login"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-surface-2 text-status-danger"
                >
                  <LogOut className="h-3.5 w-3.5" /> Sign out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
