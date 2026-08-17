'use client';

import React from 'react';
import { Users, Plus, Calendar, Clock, Sparkles, CheckCircle2, Video } from 'lucide-react';

export default function MeetingsPage() {
  const meetings = [
    { id: 'mtg-1', title: 'Weekly Operations Sync & Risk Review', date: 'Today, 14:00 - 15:00', organizer: 'Sara Connor', attendees: ['Mike Ross', 'Eve Polastri', 'Jonas Kahn'], summary: 'Reviewed SLA compliance rates across 14 active workflows. Vendor Onboarding PO #1042 flagged for escalation due to approval delay.', actionItems: 3 },
    { id: 'mtg-2', title: 'Q3 Enterprise Security Audit Readiness', date: 'Tomorrow, 10:00 - 11:30', organizer: 'Eve Polastri', attendees: ['Sara Connor', 'Adam Wu'], summary: 'Confirmed SOC2 Type II audit schedule and updated access control matrices.', actionItems: 2 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary flex items-center gap-2">
            <Users className="h-6 w-6 text-brand-primary" /> Meeting & Action Tracking
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Schedule meetings, record & transcribe via Whisper AI, and auto-convert action items into tracked tasks.
          </p>
        </div>

        <button className="px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-semibold text-xs transition-all flex items-center gap-1.5 shadow-glow-primary">
          <Plus className="h-4 w-4" /> Schedule Meeting
        </button>
      </div>

      {/* Meetings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {meetings.map((mtg) => (
          <div key={mtg.id} className="p-5 rounded-2xl bg-surface-1 border border-border-subtle space-y-4 shadow-sm hover:border-brand-primary/40 transition-all">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-brand-tertiary flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {mtg.date}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-2 text-status-success">Scheduled</span>
              </div>
              <h3 className="font-bold text-base text-text-primary">{mtg.title}</h3>
              <p className="text-xs text-text-muted">Organizer: <span className="text-text-secondary font-semibold">{mtg.organizer}</span></p>
            </div>

            {/* AI Summary Card */}
            <div className="p-3 rounded-xl bg-surface-2 border border-border-subtle space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-brand-primary">
                <Sparkles className="h-4 w-4" /> AI Generated Summary & Insights
              </div>
              <p className="text-text-secondary leading-relaxed">{mtg.summary}</p>
            </div>

            <div className="pt-3 border-t border-border-subtle flex justify-between items-center text-xs">
              <span className="text-text-muted">{mtg.actionItems} Action items converted to tasks</span>
              <button
                onClick={() => alert(`Converted ${mtg.actionItems} action items into assigned tasks in Module 2!`)}
                className="px-3 py-1.5 rounded-lg bg-brand-primary text-text-inverse font-semibold hover:bg-brand-primary-hover transition-all text-xs"
              >
                Extract Tasks →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
