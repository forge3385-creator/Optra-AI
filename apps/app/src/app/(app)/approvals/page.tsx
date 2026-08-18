'use client';

import React from 'react';
import { ShieldCheck, Plus, CheckCircle2, XCircle, Clock, AlertTriangle, User, DollarSign, X, Trash2, Check, Filter } from 'lucide-react';
import { dataStore, ApprovalItem } from '../../../lib/data-store';

export default function ApprovalsPage() {
  const [approvals, setApprovals] = React.useState<ApprovalItem[]>([]);
  const [filterCategory, setFilterCategory] = React.useState('all');
  const [statusTab, setStatusTab] = React.useState<'pending' | 'approved' | 'rejected' | 'all'>('pending');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [rejectModalOpen, setRejectModalOpen] = React.useState(false);
  const [selectedApprovalId, setSelectedApprovalId] = React.useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = React.useState('');

  // Form State
  const [formSubject, setFormSubject] = React.useState('');
  const [formCategory, setFormCategory] = React.useState<'purchase' | 'finance' | 'it' | 'procurement' | 'hr' | 'operations'>('purchase');
  const [formAmount, setFormAmount] = React.useState('');
  const [formDept, setFormDept] = React.useState('Operations');
  const [formRisk, setFormRisk] = React.useState<'Low Risk' | 'Medium Risk' | 'High Risk' | 'Critical Risk'>('Low Risk');
  const [formNotes, setFormNotes] = React.useState('');

  React.useEffect(() => {
    const syncData = () => {
      setApprovals(dataStore.listApprovals());
    };
    syncData();
    return dataStore.subscribe(syncData);
  }, []);

  const handleApprove = (id: string) => {
    dataStore.approveRequest(id, 'Approved via Approval Management Console');
  };

  const openRejectModal = (id: string) => {
    setSelectedApprovalId(id);
    setRejectionReason('');
    setRejectModalOpen(true);
  };

  const handleConfirmReject = () => {
    if (selectedApprovalId) {
      dataStore.rejectRequest(selectedApprovalId, rejectionReason || 'Rejected by policy compliance reviewer');
      setRejectModalOpen(false);
      setSelectedApprovalId(null);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this approval request?')) {
      dataStore.deleteApproval(id);
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formSubject.trim()) return;

    dataStore.createApproval({
      subject: formSubject,
      category: formCategory,
      amount: parseFloat(formAmount) || 0,
      currency: 'USD',
      requester_id: dataStore.getActiveUser().id,
      requester_name: dataStore.getActiveUser().full_name,
      department: formDept,
      sla_due_at: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
      sla_countdown: '24 hours remaining',
      risk_badge: formRisk,
      notes: formNotes
    });

    setFormSubject('');
    setFormAmount('');
    setFormNotes('');
    setModalOpen(false);
  };

  const filteredApprovals = approvals.filter((req) => {
    const matchesCat = filterCategory === 'all' || req.category === filterCategory;
    const matchesStatus = statusTab === 'all' || req.status === statusTab;
    return matchesCat && matchesStatus;
  });

  const pendingCount = approvals.filter((a) => a.status === 'pending').length;
  const approvedCount = approvals.filter((a) => a.status === 'approved').length;
  const rejectedCount = approvals.filter((a) => a.status === 'rejected').length;

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

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-semibold text-xs transition-all flex items-center gap-1.5 shadow-glow-primary"
        >
          <Plus className="h-4 w-4" /> New Approval Request
        </button>
      </div>

      {/* Status Tabs & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-3 rounded-xl bg-surface-1 border border-border-subtle text-xs">
        {/* Status Tabs */}
        <div className="flex bg-surface-2 p-1 rounded-lg border border-border-subtle">
          {[
            { id: 'pending', label: `Pending (${pendingCount})` },
            { id: 'approved', label: `Approved (${approvedCount})` },
            { id: 'rejected', label: `Rejected (${rejectedCount})` },
            { id: 'all', label: `All (${approvals.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                statusTab === tab.id
                  ? 'bg-brand-primary text-text-inverse shadow-sm'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-text-muted mr-1">Category:</span>
          {['all', 'purchase', 'finance', 'it', 'procurement', 'operations'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold capitalize transition-all ${
                filterCategory === cat
                  ? 'bg-brand-primary text-text-inverse'
                  : 'bg-surface-2 text-text-muted hover:text-text-primary border border-border-subtle'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Approvals List */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-text-primary">
          {statusTab === 'pending' ? 'Pending Approval Inbox' : `${statusTab.toUpperCase()} Requests`} ({filteredApprovals.length})
        </h2>

        {filteredApprovals.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-surface-1 border border-dashed border-border-subtle space-y-3">
            <CheckCircle2 className="h-10 w-10 text-status-success mx-auto opacity-70" />
            <h3 className="font-bold text-sm text-text-primary">No approval requests found</h3>
            <p className="text-xs text-text-muted">There are no {statusTab} approval items in this category.</p>
            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-brand-primary text-text-inverse text-xs font-bold shadow-glow-primary"
            >
              Submit New Request
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredApprovals.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-xl bg-surface-1 border border-border-subtle hover:border-brand-primary/40 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs shadow-sm"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-text-primary">{req.subject}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-surface-2 text-brand-tertiary border border-border-subtle">
                      {req.category}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        req.risk_badge === 'Critical Risk' || req.risk_badge === 'High Risk'
                          ? 'bg-status-danger-bg text-status-danger'
                          : req.risk_badge === 'Medium Risk'
                          ? 'bg-status-warning-bg text-status-warning'
                          : 'bg-status-success-bg text-status-success'
                      }`}
                    >
                      {req.risk_badge}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        req.status === 'approved'
                          ? 'bg-status-success-bg text-status-success'
                          : req.status === 'rejected'
                          ? 'bg-status-danger-bg text-status-danger'
                          : 'bg-brand-primary/20 text-brand-primary'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>

                  <p className="text-text-muted">
                    Requested by <span className="text-text-secondary font-semibold">{req.requester_name}</span> ({req.department}) • Amount:{' '}
                    <span className="font-mono text-text-primary font-bold">
                      ${req.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </p>

                  {req.notes && <p className="text-[11px] text-text-secondary italic">&ldquo;{req.notes}&rdquo;</p>}
                  {req.rejection_reason && (
                    <p className="text-[11px] text-status-danger font-semibold">
                      Rejection Reason: {req.rejection_reason} (by {req.approved_by})
                    </p>
                  )}

                  {req.status === 'pending' && (
                    <p className="text-status-warning flex items-center gap-1 font-mono text-[11px]">
                      <Clock className="h-3 w-3" /> SLA: {req.sla_countdown || 'In 4 hours'}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {req.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleApprove(req.id)}
                        className="px-4 py-2 rounded-lg bg-status-success hover:bg-status-success/90 text-text-inverse font-bold flex items-center gap-1 shadow-sm transition-all"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                      </button>
                      <button
                        onClick={() => openRejectModal(req.id)}
                        className="px-4 py-2 rounded-lg bg-surface-2 border border-border-default hover:bg-status-danger-bg hover:text-status-danger text-text-secondary font-semibold transition-all flex items-center gap-1"
                      >
                        <XCircle className="h-3.5 w-3.5" /> Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-[11px] font-mono text-text-muted">
                      Processed by {req.approved_by || 'Admin'}
                    </span>
                  )}
                  <button
                    onClick={() => handleDelete(req.id)}
                    className="p-2 rounded-lg bg-surface-2 text-text-muted hover:text-status-danger transition-colors"
                    title="Delete Request"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Approval Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-canvas/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-surface-1 border border-border-strong p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-border-subtle pb-3">
              <h3 className="font-bold text-lg text-text-primary">Create New Approval Request</h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded hover:bg-surface-2 text-text-muted">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-text-secondary mb-1">Subject / Item Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AWS Production GPU Cluster Expansion"
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-text-secondary mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary"
                  >
                    <option value="purchase">Purchase Order</option>
                    <option value="finance">Finance / Budget</option>
                    <option value="it">IT Access & IAM</option>
                    <option value="procurement">Vendor Procurement</option>
                    <option value="hr">HR & Hiring</option>
                    <option value="operations">Operations</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-text-secondary mb-1">Amount ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formAmount}
                    onChange={(e) => setFormAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-text-secondary mb-1">Department</label>
                  <input
                    type="text"
                    value={formDept}
                    onChange={(e) => setFormDept(e.target.value)}
                    className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-text-secondary mb-1">Risk Assessment</label>
                  <select
                    value={formRisk}
                    onChange={(e) => setFormRisk(e.target.value as any)}
                    className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary"
                  >
                    <option value="Low Risk">Low Risk</option>
                    <option value="Medium Risk">Medium Risk</option>
                    <option value="High Risk">High Risk</option>
                    <option value="Critical Risk">Critical Risk</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-text-secondary mb-1">Business Justification / Notes</label>
                <textarea
                  rows={3}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Provide contract references, vendor quotes, or operational rationale..."
                  className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary"
                />
              </div>

              <div className="pt-4 border-t border-border-subtle flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-surface-2 text-text-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-brand-primary text-text-inverse font-bold shadow-glow-primary"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectModalOpen && (
        <div className="fixed inset-0 z-50 bg-canvas/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-surface-1 border border-border-strong p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-border-subtle pb-3">
              <h3 className="font-bold text-base text-status-danger flex items-center gap-2">
                <XCircle className="h-5 w-5" /> Reject Approval Request
              </h3>
              <button onClick={() => setRejectModalOpen(false)} className="p-1 rounded hover:bg-surface-2 text-text-muted">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-text-secondary">
                Please provide a compliance or policy reason for rejecting this request. The requester will be notified immediately.
              </p>
              <div>
                <label className="block font-semibold text-text-secondary mb-1">Rejection Reason</label>
                <textarea
                  rows={3}
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="e.g. Missing required SOC2 vendor compliance certificate; exceed departmental quarterly cap."
                  className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-border-subtle flex justify-end gap-2 text-xs">
              <button
                onClick={() => setRejectModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-surface-2 text-text-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded-lg bg-status-danger text-text-inverse font-bold shadow-glow-danger"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
