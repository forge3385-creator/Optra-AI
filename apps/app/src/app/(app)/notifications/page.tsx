'use client';

import React from 'react';
import Link from 'next/link';
import { Bell, CheckCircle2, ShieldAlert, Clock, Check, Trash2, ArrowRight } from 'lucide-react';
import { dataStore, NotificationItem } from '../../../lib/data-store';

export default function NotificationsPage() {
  const [notifications, setNotifications] = React.useState<NotificationItem[]>([]);
  const [filterType, setFilterType] = React.useState('all');

  React.useEffect(() => {
    const syncData = () => {
      setNotifications(dataStore.listNotifications());
    };
    syncData();
    return dataStore.subscribe(syncData);
  }, []);

  const handleMarkAllRead = () => {
    dataStore.markAllNotificationsAsRead();
  };

  const handleMarkRead = (id: string) => {
    dataStore.markNotificationAsRead(id);
  };

  const filtered = notifications.filter(
    (n) => filterType === 'all' || n.type === filterType
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary flex items-center gap-2">
            <Bell className="h-6 w-6 text-brand-primary" /> Notifications & Alerts Center
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Real-time multi-channel alerts, approval pings, SLA warnings, and system notifications.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="px-4 py-2 rounded-lg bg-surface-2 hover:bg-surface-3 text-text-primary font-semibold text-xs transition-all flex items-center gap-1.5 border border-border-subtle"
          >
            <Check className="h-4 w-4" /> Mark All as Read ({unreadCount})
          </button>
        )}
      </div>

      {/* Filter Toolbar */}
      <div className="p-3 rounded-xl bg-surface-1 border border-border-subtle flex items-center gap-2 text-xs flex-wrap">
        <span className="text-text-muted mr-1">Filter by Type:</span>
        {['all', 'approval', 'sla_warning', 'incident', 'task', 'system'].map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-3 py-1 rounded-md font-semibold capitalize transition-all ${
              filterType === t
                ? 'bg-brand-primary text-text-inverse'
                : 'bg-surface-2 text-text-muted hover:text-text-primary'
            }`}
          >
            {t.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-surface-1 border border-dashed border-border-subtle text-text-muted text-xs">
            No notifications in this view.
          </div>
        ) : (
          filtered.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleMarkRead(notif.id)}
              className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 text-xs shadow-sm cursor-pointer ${
                notif.read
                  ? 'bg-surface-1 border-border-subtle text-text-secondary'
                  : 'bg-surface-1 border-brand-primary/40 text-text-primary ring-1 ring-brand-primary/20'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-surface-2 shrink-0">
                  {notif.type === 'incident' ? (
                    <ShieldAlert className="h-4 w-4 text-status-danger" />
                  ) : notif.type === 'approval' ? (
                    <CheckCircle2 className="h-4 w-4 text-brand-primary" />
                  ) : (
                    <Bell className="h-4 w-4 text-brand-tertiary" />
                  )}
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-text-primary">{notif.title}</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-surface-2 text-brand-primary">
                      {notif.type.replace('_', ' ')}
                    </span>
                    {!notif.read && (
                      <span className="h-2 w-2 rounded-full bg-brand-primary shadow-glow-primary" />
                    )}
                  </div>
                  <p className="text-text-secondary leading-relaxed">{notif.message}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {notif.link && (
                  <Link
                    href={notif.link}
                    className="px-3 py-1.5 rounded-lg bg-brand-primary text-text-inverse font-bold flex items-center gap-1 hover:bg-brand-primary-hover transition-all"
                  >
                    View &rarr;
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
