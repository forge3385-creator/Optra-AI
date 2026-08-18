'use client';

import React from 'react';
import { Search, Workflow, ListChecks, ShieldCheck, Siren, FileText, Sparkles, X, KanbanSquare, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { dataStore } from '../lib/data-store';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<Array<{ id: string; title: string; category: string; href: string; detail: string }>>([]);

  React.useEffect(() => {
    if (query.trim()) {
      setSearchResults(dataStore.globalSearch(query));
    } else {
      // Default quick access actions
      setSearchResults([
        { id: 'act-1', title: 'Open Executive Dashboard', category: 'Navigation', href: '/dashboard', detail: 'Real-time Operations Intelligence' },
        { id: 'act-2', title: 'Pending Approval Inbox', category: 'Approvals', href: '/approvals', detail: 'Review POs, contracts, and access requests' },
        { id: 'act-3', title: 'Task & Work Kanban', category: 'Tasks', href: '/tasks', detail: 'Manage active operational tasks' },
        { id: 'act-4', title: 'Visual Workflow Engine', category: 'Workflows', href: '/workflows', detail: 'Automated graph builder and triggers' },
        { id: 'act-5', title: 'Ask AI Copilot Assistant', category: 'AI Assistant', href: '/ai-assistant', detail: 'Natural language query over database' },
        { id: 'act-6', title: 'Active Incident Center', category: 'Incidents', href: '/incidents', detail: 'SEV1-SEV4 triage and postmortems' },
        { id: 'act-7', title: 'Operational Risk Signals', category: 'Risks', href: '/risks', detail: 'AI predictive risk analysis' },
        { id: 'act-8', title: 'Knowledge Base & SOPs', category: 'Documents', href: '/documents', detail: 'Hybrid BM25 + vector search' }
      ]);
    }
  }, [query, open]);

  if (!open) return null;

  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'workflow':
        return Workflow;
      case 'task':
      case 'tasks':
        return ListChecks;
      case 'approval':
      case 'approvals':
        return ShieldCheck;
      case 'incident':
      case 'incidents':
        return Siren;
      case 'document':
      case 'documents':
        return FileText;
      case 'project':
      case 'projects':
        return KanbanSquare;
      case 'ai assistant':
        return Sparkles;
      default:
        return ArrowRight;
    }
  };

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <div className="fixed inset-0 z-50 bg-canvas/80 backdrop-blur-md flex items-start justify-center pt-20 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-surface-3 border border-border-strong shadow-2xl overflow-hidden">
        {/* Input */}
        <div className="p-4 border-b border-border-subtle flex items-center gap-3">
          <Search className="h-5 w-5 text-brand-primary" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across workflows, tasks, approvals, projects, incidents, SOPs..."
            className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
          />
          <button onClick={onClose} className="p-1 rounded hover:bg-surface-2 text-text-muted">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {searchResults.length === 0 ? (
            <div className="p-6 text-center text-xs text-text-muted">
              No matching records found for &quot;{query}&quot;
            </div>
          ) : (
            searchResults.map((item) => {
              const Icon = getIcon(item.category);
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.href)}
                  className="w-full text-left p-3 rounded-xl hover:bg-surface-1 flex items-center justify-between group transition-colors text-xs border border-transparent hover:border-border-subtle"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-surface-2 text-brand-primary group-hover:bg-brand-primary/20 transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-bold text-text-primary">{item.title}</p>
                      <p className="text-[11px] text-text-muted">{item.detail}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-text-muted bg-bg-input px-2.5 py-1 rounded-md border border-border-subtle">
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div className="p-3 border-t border-border-subtle bg-surface-1 text-[11px] text-text-muted flex justify-between px-4">
          <span>Press Enter to select</span>
          <span>Esc to close</span>
        </div>
      </div>
    </div>
  );
}
