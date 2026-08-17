'use client';

import React from 'react';
import Link from 'next/link';
import { Bell, CheckCircle2, ShieldAlert, Workflow, Clock, Settings } from 'lucide-react';

export default function NotificationsInboxPage() {
  const notifications = [
    { id: 'n1', kind: 'approval', subject: 'Approval Requested: SAP Purchase Order #PO-9401', body: 'Amount $12,500 requires your review for Vendor Onboarding.', time: '10 minutes ago', read: false },
    { id: 'n2', kind: 'risk', subject: 'Risk Alert: Capacity drift detected in Customer Ops', body: 'Team capacity is 94% utilized. Consider task rebalancing.', time: '45 minutes ago', read: false },
    { id: 'n3', kind: 'workflow', subject: 'Workflow Step Finished: Vendor Compliance Check', body: 'AI Prompt node successfully extracted Tax ID and sanctions status.', time: '2 hours ago', read: true },
    { id: 'n4', kind: 'task', subject: 'Task Due Soon: Review Tax ID & Attachments', body: 'Task assigned to you is due in 2 hours.', time: '3 hours ago', read: true }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary flex items-center gap-2">
            <Bell className="h-6 w-6 text-brand-primary" /> Notifications Center
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Realtime notifications fanout router across In-App, Email, Slack, Teams, and SMS.
          </p>
        </div>

        <Link
          href="/settings/notifications"
          className="px-4 py-2 rounded-lg bg-surface-2 hover:bg-surface-3 border border-border-default text-text-primary font-semibold text-xs transition-all flex items-center gap-1.5"
        >
          <Settings className="h-4 w-4" /> Preferences Matrix
        </Link>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((n) => (
          <div key={n.id} className={`p-4 rounded-xl border transition-all flex justify-between items-center text-xs ${
            !n.read ? 'bg-surface-2 border-brand-primary/40 shadow-sm' : 'bg-surface-1 border-border-subtle opacity-75'
          }`}>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-text-primary">{n.subject}</span>
                {!n.read && <span className="h-2 w-2 rounded-full bg-brand-primary" />}
              </div>
              <p className="text-text-secondary">{n.body}</p>
              <span className="text-[10px] text-text-muted font-mono">{n.time}</span>
            </div>

            <button className="text-xs font-semibold text-brand-primary hover:underline">Mark as read</button>
          </div>
        ))}
      </div>
    </div>
  );
}
