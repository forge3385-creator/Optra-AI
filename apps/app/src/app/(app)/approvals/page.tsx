'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Plus, CheckCircle2, XCircle, Clock, AlertTriangle, User, DollarSign } from 'lucide-react';

export default function ApprovalsPage() {
  const [filterCategory, setFilterCategory] = React.useState('all');

  const pendingRequests = [
    { id: 'req-1042', subject: 'SAP Purchase Order #PO-9401', category: 'purchase', amount: '$12,500.00', requester: 'Jonas Kahn', dept: 'Customer Ops', sla: '2 hours remaining', riskBadge: 'Low Risk' },
    { id: 'req-1043', subject: 'AWS Production Cloud Credit Expansion', category: 'finance', amount: '$5,000.00', requester: 'Adam Wu', dept: 'Engineering', sla: '5 hours remaining', riskBadge: 'Medium Risk' },
    { id: 'req-1044', subject: 'Senior Staff Engineer Access Delegation', category: 'it', amount: '$0.00', requester: 'Lin Dan', dept: 'HR Ops', sla: '1 day remaining', riskBadge: 'Low Risk' },
    { id: 'req-1045', subject: 'Vendor Contract Extension - CloudScale', category: 'procurement', amount: '$45,000.00', requester: 'Mike Ross', dept: 'Operations', sla: '4 hours remaining', riskBadge: 'High Risk' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-brand-primary" /> Approval Management
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Review pending requests, submit multi-step approvals, and manage organizational policy chains.
          </p>
        </div>

        <Link
          href="/approvals/new"
          className="px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-semibold text-xs transition-all flex items-center gap-1.5 shadow-glow-primary"
        >
          <Plus className="h-4 w-4" /> New Approval Request
        </Link>
      </div>

      {/* Filter Chips */}
      <div className="p-3 rounded-xl bg-surface-1 border border-border-subtle flex items-center gap-2 text-xs">
        <span className="text-text-muted">Category:</span>
        {['all', 'purchase', 'finance', 'it', 'procurement'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1 rounded-md font-semibold capitalize transition-all ${
              filterCategory === cat ? 'bg-brand-primary text-text-inverse' : 'bg-surface-2 text-text-muted hover:text-text-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Pending Approval Inbox */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-text-primary">Pending Approval Inbox ({pendingRequests.length})</h2>

        <div className="space-y-3">
          {pendingRequests.map((req) => (
            <div key={req.id} className="p-4 rounded-xl bg-surface-1 border border-border-subtle hover:border-brand-primary/40 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-text-primary">{req.subject}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-surface-2 text-brand-tertiary border border-border-subtle">{req.category}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    req.riskBadge === 'High Risk' ? 'bg-status-danger-bg text-status-danger' : 'bg-status-success-bg text-status-success'
                  }`}>{req.riskBadge}</span>
                </div>
                <p className="text-text-muted">
                  Requested by <span className="text-text-secondary font-semibold">{req.requester}</span> ({req.dept}) • Amount: <span className="font-mono text-text-primary font-bold">{req.amount}</span>
                </p>
                <p className="text-status-warning flex items-center gap-1 font-mono text-[11px]">
                  <Clock className="h-3 w-3" /> SLA Countdown: {req.sla}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button className="px-4 py-2 rounded-lg bg-status-success hover:bg-status-success/90 text-text-inverse font-bold flex items-center gap-1 shadow-sm">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                </button>
                <button className="px-4 py-2 rounded-lg bg-surface-2 border border-border-default hover:bg-status-danger-bg hover:text-status-danger text-text-secondary font-semibold transition-all flex items-center gap-1">
                  <XCircle className="h-3.5 w-3.5" /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
