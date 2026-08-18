'use client';

import React from 'react';
import { Calendar, Plus, Clock, Users, CheckCircle2, Sparkles, ArrowRight, X, ListChecks, Check } from 'lucide-react';
import { dataStore, MeetingItem } from '../../../lib/data-store';

export default function MeetingsPage() {
  const [meetings, setMeetings] = React.useState<MeetingItem[]>([]);
  const [modalOpen, setModalOpen] = React.useState(false);

  // Form State
  const [formTitle, setFormTitle] = React.useState('');
  const [formDept, setFormDept] = React.useState('Operations');
  const [formScheduled, setFormScheduled] = React.useState(new Date(Date.now() + 3600000).toISOString());
  const [formParticipants, setFormParticipants] = React.useState('Sara Connor, Mike Ross, Jonas Kahn');
  const [formSummary, setFormSummary] = React.useState('');
  const [formActionItem1, setFormActionItem1] = React.useState('');
  const [formAssignee1, setFormAssignee1] = React.useState('Mike Ross');

  React.useEffect(() => {
    const syncData = () => {
      setMeetings(dataStore.listMeetings());
    };
    syncData();
    return dataStore.subscribe(syncData);
  }, []);

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    dataStore.createMeeting({
      title: formTitle,
      department: formDept,
      scheduled_at: formScheduled,
      participants: formParticipants.split(',').map((p) => p.trim()).filter(Boolean),
      summary: formSummary || 'Operational review and tactical action planning.',
      action_items: formActionItem1 ? [{ title: formActionItem1, assignee: formAssignee1, due_date: 'In 2 days' }] : []
    });

    setFormTitle('');
    setFormSummary('');
    setFormActionItem1('');
    setModalOpen(false);
  };

  const handleConvertActionItem = (meetingId: string, actionItemId: string) => {
    const task = dataStore.convertActionItemToTask(meetingId, actionItemId);
    if (task) {
      alert(`Action item converted into Task #${task.id} in Task Management.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary flex items-center gap-2">
            <Calendar className="h-6 w-6 text-brand-primary" /> Operations Meetings & AI Action Items
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Capture operational syncs, summarize minutes, and auto-dispatch action items into live tasks.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-semibold text-xs transition-all flex items-center gap-1.5 shadow-glow-primary"
        >
          <Plus className="h-4 w-4" /> Schedule Operational Meeting
        </button>
      </div>

      {/* Meetings Feed */}
      <div className="space-y-4">
        {meetings.map((mtg) => (
          <div
            key={mtg.id}
            className="p-5 rounded-2xl bg-surface-1 border border-border-subtle hover:border-brand-primary/40 transition-all space-y-4 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-surface-2 text-brand-primary">
                  {mtg.department}
                </span>
                <h3 className="font-bold text-base text-text-primary mt-1">{mtg.title}</h3>
                <p className="text-xs text-text-muted mt-0.5">
                  Organizer: <span className="text-text-secondary font-semibold">{mtg.organizer}</span> • Duration: {mtg.duration_minutes} mins
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs text-text-secondary">
                <Users className="h-4 w-4 text-brand-primary" />
                <span>{mtg.participants.join(', ')}</span>
              </div>
            </div>

            {mtg.summary && (
              <div className="p-3.5 rounded-xl bg-surface-2 text-xs space-y-1">
                <p className="font-bold text-brand-primary flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
                  <Sparkles className="h-3.5 w-3.5" /> AI Executive Summary
                </p>
                <p className="text-text-secondary leading-relaxed">{mtg.summary}</p>
              </div>
            )}

            {/* Extracted Action Items */}
            {mtg.action_items.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-border-subtle text-xs">
                <p className="font-bold text-text-primary flex items-center gap-1.5">
                  <ListChecks className="h-4 w-4 text-brand-primary" /> Action Items ({mtg.action_items.length})
                </p>
                <div className="space-y-1.5">
                  {mtg.action_items.map((ai) => (
                    <div
                      key={ai.id}
                      className="p-2.5 rounded-lg bg-surface-2 border border-border-subtle flex items-center justify-between gap-3"
                    >
                      <div className="space-y-0.5">
                        <p className="font-semibold text-text-primary">{ai.title}</p>
                        <p className="text-[11px] text-text-muted">
                          Assignee: <span className="text-text-secondary">{ai.assignee}</span> • Due: {ai.due_date}
                        </p>
                      </div>

                      {ai.status === 'converted_to_task' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-status-success-bg text-status-success flex items-center gap-1">
                          <Check className="h-3 w-3" /> Converted to Task
                        </span>
                      ) : (
                        <button
                          onClick={() => handleConvertActionItem(mtg.id, ai.id)}
                          className="px-3 py-1 rounded bg-brand-primary text-text-inverse font-bold text-[11px] shadow-sm hover:bg-brand-primary-hover transition-all"
                        >
                          Convert to Task &rarr;
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New Meeting Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-canvas/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-surface-1 border border-border-strong p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-border-subtle pb-3">
              <h3 className="font-bold text-lg text-text-primary">Record Operational Meeting</h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded hover:bg-surface-2 text-text-muted">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMeeting} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-text-secondary mb-1">Meeting Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q3 Vendor SLA Review & Incident Postmortem"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-brand-primary"
                />
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
                  <label className="block font-semibold text-text-secondary mb-1">Participants (comma separated)</label>
                  <input
                    type="text"
                    value={formParticipants}
                    onChange={(e) => setFormParticipants(e.target.value)}
                    className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-text-secondary mb-1">Discussion Notes / Executive Summary</label>
                <textarea
                  rows={2}
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  placeholder="Key decisions, blockers resolved, and strategic directives..."
                  className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary"
                />
              </div>

              <div className="p-3 rounded-xl bg-surface-2 space-y-2 border border-border-subtle">
                <label className="block font-bold text-brand-primary uppercase text-[10px]">Action Item to Extract</label>
                <input
                  type="text"
                  placeholder="e.g. Deploy read replica query optimizer"
                  value={formActionItem1}
                  onChange={(e) => setFormActionItem1(e.target.value)}
                  className="w-full px-3 py-1.5 bg-bg-input border border-border-default rounded-lg text-text-primary text-xs"
                />
                <div className="flex justify-between items-center text-xs">
                  <span className="text-text-muted">Assignee:</span>
                  <select
                    value={formAssignee1}
                    onChange={(e) => setFormAssignee1(e.target.value)}
                    className="px-2 py-1 bg-bg-input border border-border-default rounded-lg text-text-primary text-xs"
                  >
                    <option>Mike Ross</option>
                    <option>Eve Polastri</option>
                    <option>Jonas Kahn</option>
                    <option>Sara Connor</option>
                  </select>
                </div>
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
                  Save Meeting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
