'use client';

import React from 'react';
import { Sparkles, Send, Plus, BarChart2, CheckCircle2, AlertTriangle, Clock, ArrowRight, TrendingUp, ShieldAlert } from 'lucide-react';
import { dataStore } from '../../../lib/data-store';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  cards?: Array<{
    label: string;
    value: string;
    status?: 'ok' | 'warn' | 'critical';
    href?: string;
  }>;
  actions?: Array<{
    label: string;
    href: string;
  }>;
}

function formatAIResponse(raw: string): string {
  // Convert markdown-style **bold** to readable text
  return raw.replace(/\*\*(.*?)\*\*/g, '$1').replace(/###\s/g, '').trim();
}

export default function AiAssistantPage() {
  const user = dataStore.getActiveUser();
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: 'm1',
      role: 'assistant',
      content: `Good ${new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, ${user.full_name.split(' ')[0]}. I'm your Operations Copilot — here to help you stay on top of what matters.\n\nYou can ask me about your tasks, pending approvals, active incidents, operational risks, or get a full briefing on today's priorities.`,
    }
  ]);
  const [input, setInput] = React.useState('');
  const [isThinking, setIsThinking] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickPrompts = [
    "What are my top priorities today?",
    "Which approvals need my attention?",
    "Give me an operational summary",
    "What tasks are overdue or blocked?",
    "What risks should I be aware of?",
    "Are there any active incidents?",
  ];

  const buildAssistantMessage = (query: string): Message => {
    const q = query.toLowerCase().trim();
    const kpis = dataStore.getCalculatedKPIs();

    // TODAY'S PRIORITIES / SUMMARY
    if (q.includes('priority') || q.includes('priorities') || q.includes('today') || q.includes('summary') || q.includes('briefing') || q.includes('report')) {
      const pending = dataStore.listApprovals().filter(a => a.status === 'pending');
      const activeTasks = dataStore.listTasks().filter(t => t.status !== 'done');
      const criticalTasks = activeTasks.filter(t => t.priority === 'critical' || t.priority === 'high');
      const openIncidents = dataStore.listIncidents().filter(i => i.status !== 'resolved');
      const activeRisks = dataStore.listRisks().filter(r => r.status === 'active');

      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Here's your operational summary for today:`,
        cards: [
          { label: 'Pending Approvals', value: `${pending.length} waiting`, status: pending.length > 3 ? 'warn' : 'ok', href: '/approvals' },
          { label: 'Active Tasks', value: `${activeTasks.length} total, ${criticalTasks.length} high priority`, status: criticalTasks.length > 2 ? 'warn' : 'ok', href: '/tasks' },
          { label: 'Open Incidents', value: openIncidents.length > 0 ? `${openIncidents.length} active` : 'None — all clear', status: openIncidents.length > 0 ? 'critical' : 'ok', href: '/incidents' },
          { label: 'Risk Signals', value: `${activeRisks.length} signals detected`, status: activeRisks.length > 1 ? 'warn' : 'ok', href: '/risks' },
        ],
        actions: [
          ...(pending.length > 0 ? [{ label: 'Review Approvals', href: '/approvals' }] : []),
          ...(openIncidents.length > 0 ? [{ label: 'View Incidents', href: '/incidents' }] : []),
        ]
      };
    }

    // APPROVALS
    if (q.includes('approval') || q.includes('approve') || q.includes('pending')) {
      const pending = dataStore.listApprovals().filter(a => a.status === 'pending');
      const highRisk = pending.filter(a => a.risk_badge?.includes('High') || a.risk_badge?.includes('Critical'));
      
      let content = '';
      if (pending.length === 0) {
        content = "You're all caught up — there are no pending approvals requiring your attention right now.";
      } else {
        content = `You have ${pending.length} pending approval${pending.length > 1 ? 's' : ''} waiting for review.`;
        if (highRisk.length > 0) {
          content += ` ${highRisk.length} of these are flagged as high risk and should be prioritized.`;
        }
        if (pending[0]) {
          content += `\n\nMost recent: "${pending[0].subject}" — $${pending[0].amount.toLocaleString()} requested by ${pending[0].requester_name}.`;
        }
      }

      return {
        id: Date.now().toString(),
        role: 'assistant',
        content,
        cards: pending.slice(0, 3).map(a => ({
          label: a.subject,
          value: `$${a.amount.toLocaleString()} · ${a.requester_name}`,
          status: (a.risk_badge?.includes('High') || a.risk_badge?.includes('Critical')) ? 'warn' : 'ok',
          href: '/approvals'
        })),
        actions: pending.length > 0 ? [{ label: 'Go to Approvals', href: '/approvals' }] : []
      };
    }

    // TASKS
    if (q.includes('task') || q.includes('overdue') || q.includes('assigned') || q.includes('blocked') || q.includes('workload')) {
      const allTasks = dataStore.listTasks();
      const activeTasks = allTasks.filter(t => t.status !== 'done');
      const myTasks = activeTasks.filter(t => t.assignee_name === user.full_name);
      const blocked = activeTasks.filter(t => t.status === 'blocked');
      const critical = activeTasks.filter(t => t.priority === 'critical');

      let content = `You currently have ${activeTasks.length} active task${activeTasks.length !== 1 ? 's' : ''} across the platform.`;
      if (myTasks.length > 0) content += ` ${myTasks.length} ${myTasks.length === 1 ? 'is' : 'are'} assigned directly to you.`;
      if (blocked.length > 0) content += ` ${blocked.length} ${blocked.length === 1 ? 'task is' : 'tasks are'} currently blocked and need attention.`;
      if (critical.length > 0) content += ` ${critical.length} critical-priority ${critical.length === 1 ? 'task requires' : 'tasks require'} immediate action.`;

      return {
        id: Date.now().toString(),
        role: 'assistant',
        content,
        cards: activeTasks.slice(0, 4).map(t => ({
          label: t.title,
          value: `${t.priority.toUpperCase()} · ${t.status.replace('_', ' ')} · ${t.assignee_name}`,
          status: t.priority === 'critical' ? 'critical' : t.status === 'blocked' ? 'warn' : 'ok',
          href: '/tasks'
        })),
        actions: [{ label: 'View All Tasks', href: '/tasks' }]
      };
    }

    // INCIDENTS
    if (q.includes('incident') || q.includes('outage') || q.includes('sev') || q.includes('down')) {
      const incidents = dataStore.listIncidents();
      const open = incidents.filter(i => i.status !== 'resolved');
      const sev1 = open.filter(i => i.severity === 'sev1');

      let content = '';
      if (open.length === 0) {
        content = "All systems are operating normally — there are no open incidents at this time.";
      } else {
        content = `There ${open.length === 1 ? 'is' : 'are'} currently ${open.length} active operational incident${open.length !== 1 ? 's' : ''}.`;
        if (sev1.length > 0) {
          content += ` This includes ${sev1.length} SEV1 incident${sev1.length > 1 ? 's' : ''} — these require immediate escalation.`;
        }
        if (open[0]) {
          content += `\n\nHighest priority: "${open[0].title}" — assigned to ${open[0].assignee_name} (${open[0].sla_countdown}).`;
        }
      }

      return {
        id: Date.now().toString(),
        role: 'assistant',
        content,
        cards: open.slice(0, 3).map(i => ({
          label: i.title,
          value: `${i.severity.toUpperCase()} · ${i.status} · ${i.sla_countdown}`,
          status: i.severity === 'sev1' ? 'critical' : i.severity === 'sev2' ? 'warn' : 'ok',
          href: '/incidents'
        })),
        actions: open.length > 0 ? [{ label: 'Manage Incidents', href: '/incidents' }] : []
      };
    }

    // RISKS
    if (q.includes('risk') || q.includes('anomaly') || q.includes('sla breach') || q.includes('alert')) {
      const risks = dataStore.listRisks().filter(r => r.status === 'active');
      const critical = risks.filter(r => r.severity === 'critical' || r.severity === 'high');

      let content = '';
      if (risks.length === 0) {
        content = "No active risk signals detected. All operational metrics are within normal bounds.";
      } else {
        content = `The risk engine has detected ${risks.length} active signal${risks.length !== 1 ? 's' : ''}.`;
        if (critical.length > 0) {
          content += ` ${critical.length} ${critical.length === 1 ? 'is' : 'are'} classified as high or critical severity.`;
        }
        if (risks[0]) {
          content += `\n\nTop risk: ${risks[0].rationale}`;
        }
      }

      return {
        id: Date.now().toString(),
        role: 'assistant',
        content,
        cards: risks.slice(0, 3).map(r => ({
          label: `${r.source.toUpperCase()} Risk`,
          value: r.rationale.length > 80 ? r.rationale.substring(0, 80) + '...' : r.rationale,
          status: r.severity === 'critical' ? 'critical' : r.severity === 'high' ? 'warn' : 'ok',
          href: '/risks'
        })),
        actions: risks.length > 0 ? [{ label: 'Review Risk Signals', href: '/risks' }] : []
      };
    }

    // KPIs / METRICS
    if (q.includes('kpi') || q.includes('metric') || q.includes('compliance') || q.includes('performance')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Here's a snapshot of your current operational metrics:`,
        cards: [
          { label: 'SLA Compliance', value: kpis.sla_compliance, status: 'ok' },
          { label: 'Task Completion Rate', value: kpis.task_completion_rate, status: 'ok' },
          { label: 'Active Workflows', value: String(kpis.active_workflows), status: 'ok', href: '/workflows' },
          { label: 'Total Operational Spend', value: `${kpis.total_spend} of ${kpis.budget_total}`, status: 'ok' },
        ],
        actions: [{ label: 'Full KPI Dashboard', href: '/kpis' }]
      };
    }

    // WORKFLOWS
    if (q.includes('workflow') || q.includes('automation') || q.includes('process')) {
      const workflows = dataStore.listWorkflows().filter(w => w.status === 'published');
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: `You have ${workflows.length} active automation workflow${workflows.length !== 1 ? 's' : ''} running across the platform.${workflows[0] ? ` The most active is "${workflows[0].name}" with ${workflows[0].runs_this_month} runs this month.` : ''}`,
        actions: [{ label: 'View Workflows', href: '/workflows' }]
      };
    }

    // DEFAULT - helpful response
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: `I can help you with:\n\n• Checking pending approvals and taking action\n• Reviewing your tasks and workload\n• Monitoring active incidents and SLA status\n• Assessing operational risk signals\n• Getting a full operational summary\n\nWhat would you like to know?`,
      actions: [
        { label: 'Operational Summary', href: '/dashboard' },
        { label: 'My Tasks', href: '/tasks' },
      ]
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isThinking) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    setTimeout(() => {
      const aiMsg = buildAssistantMessage(query);
      setMessages(prev => [...prev, aiMsg]);
      setIsThinking(false);
    }, 700);
  };

  const getCardIcon = (status?: string) => {
    if (status === 'critical') return <AlertTriangle className="h-3.5 w-3.5 text-status-danger shrink-0" />;
    if (status === 'warn') return <Clock className="h-3.5 w-3.5 text-status-warning shrink-0" />;
    return <CheckCircle2 className="h-3.5 w-3.5 text-status-success shrink-0" />;
  };

  const getCardBg = (status?: string) => {
    if (status === 'critical') return 'bg-status-danger-bg border-status-danger/30';
    if (status === 'warn') return 'bg-status-warning-bg border-status-warning/30';
    return 'bg-status-success-bg border-status-success/20';
  };

  return (
    <div className="-m-6 h-[calc(100vh-4rem)] flex flex-col bg-canvas">
      {/* Mobile Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border-subtle bg-surface-1 md:hidden">
        <Sparkles className="h-5 w-5 text-brand-primary animate-pulse" />
        <div>
          <p className="text-sm font-bold text-text-primary">Operations Copilot</p>
          <p className="text-[10px] text-text-muted">AI-powered operational intelligence</p>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel — desktop only */}
        <div className="w-64 bg-surface-1 border-r border-border-subtle p-4 space-y-4 hidden md:flex md:flex-col overflow-y-auto shrink-0">
          <button
            onClick={() => {
              const greeting = `Good ${new Date().getHours() < 12 ? 'morning' : 'afternoon'}, ${user.full_name.split(' ')[0]}. How can I help you?`;
              setMessages([{ id: Date.now().toString(), role: 'assistant', content: greeting }]);
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-brand-primary text-text-inverse font-bold flex items-center justify-center gap-1.5 shadow-glow-primary hover:bg-brand-primary-hover transition-all text-sm"
          >
            <Plus className="h-4 w-4" /> New Conversation
          </button>

          <div>
            <p className="font-bold text-text-muted uppercase tracking-wider text-[10px] mb-2">Quick Actions</p>
            <div className="space-y-1">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="w-full text-left p-2.5 rounded-lg hover:bg-surface-2 border border-transparent hover:border-border-subtle text-xs text-text-secondary hover:text-text-primary transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Live Status */}
          <div className="pt-3 border-t border-border-subtle space-y-2 mt-auto">
            <p className="font-bold text-text-muted uppercase tracking-wider text-[10px]">Live Status</p>
            <div className="space-y-1.5 text-xs">
              {[
                { label: 'Pending Approvals', value: dataStore.getCalculatedKPIs().pending_approvals, href: '/approvals' },
                { label: 'Active Tasks', value: dataStore.listTasks().filter(t => t.status !== 'done').length, href: '/tasks' },
                { label: 'Open Incidents', value: dataStore.getCalculatedKPIs().open_incidents, href: '/incidents' },
              ].map(item => (
                <Link key={item.label} href={item.href} className="flex justify-between items-center p-2 rounded-lg bg-surface-2 hover:bg-surface-3 transition-colors">
                  <span className="text-text-secondary">{item.label}</span>
                  <span className="font-bold text-text-primary">{item.value}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chat */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="h-8 w-8 rounded-xl bg-brand-primary/15 border border-brand-primary/30 flex items-center justify-center shrink-0 mr-3 mt-0.5">
                    <Sparkles className="h-4 w-4 text-brand-primary" />
                  </div>
                )}

                <div className={`max-w-[85%] md:max-w-2xl space-y-3 ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                  {/* Message bubble */}
                  <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-brand-primary text-text-inverse rounded-br-none'
                      : 'bg-surface-1 border border-border-subtle text-text-primary rounded-bl-none'
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>

                  {/* Data cards */}
                  {msg.cards && msg.cards.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                      {msg.cards.map((card, idx) => (
                        card.href ? (
                          <Link
                            key={idx}
                            href={card.href}
                            className={`flex items-start gap-2 p-3 rounded-xl border text-xs transition-all hover:opacity-80 ${getCardBg(card.status)}`}
                          >
                            {getCardIcon(card.status)}
                            <div className="min-w-0">
                              <p className="font-semibold text-text-secondary text-[11px] uppercase tracking-wide">{card.label}</p>
                              <p className="font-bold text-text-primary mt-0.5 truncate">{card.value}</p>
                            </div>
                          </Link>
                        ) : (
                          <div
                            key={idx}
                            className={`flex items-start gap-2 p-3 rounded-xl border text-xs ${getCardBg(card.status)}`}
                          >
                            {getCardIcon(card.status)}
                            <div className="min-w-0">
                              <p className="font-semibold text-text-secondary text-[11px] uppercase tracking-wide">{card.label}</p>
                              <p className="font-bold text-text-primary mt-0.5 truncate">{card.value}</p>
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  )}

                  {/* Action buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {msg.actions.map((action, idx) => (
                        <Link
                          key={idx}
                          href={action.href}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold hover:bg-brand-primary/20 transition-all"
                        >
                          {action.label} <ArrowRight className="h-3 w-3" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-brand-primary/15 border border-brand-primary/30 flex items-center justify-center shrink-0">
                  <Sparkles className="h-4 w-4 text-brand-primary animate-pulse" />
                </div>
                <div className="flex gap-1 px-4 py-3 bg-surface-1 border border-border-subtle rounded-2xl rounded-bl-none">
                  <div className="w-2 h-2 rounded-full bg-brand-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-brand-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-brand-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Mobile Quick Prompts */}
          <div className="md:hidden px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-none">
            {quickPrompts.slice(0, 4).map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="shrink-0 px-3 py-1.5 rounded-full bg-surface-2 border border-border-subtle text-xs text-text-secondary hover:text-text-primary whitespace-nowrap"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="px-4 pb-4 md:px-6 md:pb-6 pt-2 border-t border-border-subtle bg-canvas">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-2 p-2 rounded-2xl bg-surface-1 border border-border-subtle shadow-lg focus-within:border-brand-primary/60 transition-all"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about tasks, approvals, incidents, or today's priorities..."
                className="flex-1 px-3 py-2 bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
              />
              <button
                type="submit"
                disabled={isThinking || !input.trim()}
                className="p-2.5 rounded-xl bg-brand-primary text-text-inverse hover:bg-brand-primary-hover shadow-glow-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
