'use client';

import React from 'react';
import { Sparkles, Send, Paperclip, Mic, ShieldCheck, Workflow, CheckCircle2, Copy, Plus } from 'lucide-react';

export default function AiAssistantPage() {
  const [messages, setMessages] = React.useState([
    {
      id: 'm1',
      role: 'assistant',
      content: 'Hello Sara! I am your Operations Copilot Assistant. How can I help you manage your workflows, approvals, risks, or incidents today?',
      toolCall: null
    }
  ]);
  const [input, setInput] = React.useState('');
  const [isStreaming, setIsStreaming] = React.useState(false);

  const slashActions = [
    '/approvals overdue',
    '/tasks assigned to me',
    '/risks high severity',
    '/draft email to vendor about delay',
    '/summarize latest SOP',
    '/generate weekly executive report'
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { id: Date.now().toString(), role: 'user', content: query, toolCall: null };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsStreaming(true);

    setTimeout(() => {
      let aiReply = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I executed your request "${query}". Found 3 pending approval items awaiting your decision.`,
        toolCall: {
          name: 'list_approvals',
          input: { status: 'pending', overdue: true },
          result: [
            { id: 'req-1042', subject: 'SAP Purchase Order #PO-9401', amount: '$12,500.00', status: 'Pending Approval' },
            { id: 'req-1043', subject: 'AWS Production Cloud Credit Expansion', amount: '$5,000.00', status: 'Pending Approval' }
          ]
        }
      };

      setMessages((prev) => [...prev, aiReply]);
      setIsStreaming(false);
    }, 1000);
  };

  return (
    <div className="-m-6 h-[calc(100vh-4rem)] flex bg-canvas">
      {/* Left Chat History List */}
      <div className="w-64 bg-surface-1 border-r border-border-subtle p-4 space-y-4 text-xs overflow-y-auto hidden md:block">
        <button
          onClick={() => setMessages([messages[0]])}
          className="w-full py-2 px-3 rounded-lg bg-brand-primary text-text-inverse font-bold flex items-center justify-center gap-1.5 shadow-glow-primary"
        >
          <Plus className="h-4 w-4" /> New Conversation
        </button>

        <div>
          <p className="font-bold text-text-muted uppercase tracking-wider text-[10px] mb-2">Recent Threads</p>
          <div className="space-y-1">
            <div className="p-2.5 rounded-lg bg-surface-2 border border-border-subtle font-semibold text-text-primary">
              Overdue Approvals Audit
            </div>
            <div className="p-2.5 rounded-lg hover:bg-surface-2 text-text-secondary cursor-pointer">
              Vendor Onboarding Risk Analysis
            </div>
            <div className="p-2.5 rounded-lg hover:bg-surface-2 text-text-secondary cursor-pointer">
              Q3 Financial Budget Variance
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Thread Area */}
      <div className="flex-1 flex flex-col justify-between p-6">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-2xl p-4 rounded-2xl text-xs space-y-3 leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-brand-primary text-text-inverse rounded-br-none'
                    : 'bg-surface-1 border border-border-subtle text-text-primary rounded-bl-none'
                }`}
              >
                <div className="flex items-center gap-2 font-bold">
                  {msg.role === 'assistant' ? <Sparkles className="h-4 w-4 text-brand-primary" /> : null}
                  <span>{msg.role === 'assistant' ? 'Operations Copilot AI' : 'You'}</span>
                </div>
                <p>{msg.content}</p>

                {/* Tool Call Card */}
                {msg.toolCall && (
                  <div className="p-3 rounded-xl bg-surface-2 border border-border-strong space-y-2 text-xs">
                    <div className="flex justify-between items-center border-b border-border-subtle pb-1.5 font-mono text-[10px] text-brand-tertiary">
                      <span>Tool Call: {msg.toolCall.name}</span>
                      <span className="text-status-success">Executed</span>
                    </div>

                    <div className="space-y-1.5">
                      {msg.toolCall.result.map((res: any, idx: number) => (
                        <div key={idx} className="p-2 rounded bg-surface-1 border border-border-subtle flex justify-between items-center text-text-primary font-semibold">
                          <span>{res.subject} ({res.amount})</span>
                          <button
                            onClick={() => alert(`Decided approval for ${res.id}`)}
                            className="px-2.5 py-1 rounded bg-status-success text-text-inverse font-bold text-[10px]"
                          >
                            Approve
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isStreaming && (
            <div className="flex items-center gap-2 text-xs text-brand-primary font-mono animate-pulse">
              <Sparkles className="h-4 w-4" /> Assistant is thinking and streaming response...
            </div>
          )}
        </div>

        {/* Input & Slash Command Menu */}
        <div className="mt-4 space-y-3">
          {/* Prebuilt Slash Commands */}
          <div className="flex flex-wrap gap-2 text-xs">
            {slashActions.map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleSend(cmd)}
                className="px-2.5 py-1 rounded-full bg-surface-1 hover:bg-surface-2 border border-border-subtle text-text-secondary hover:text-text-primary font-mono text-[11px] transition-all"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-2 rounded-2xl bg-surface-1 border border-border-strong flex items-center gap-2 shadow-glow-primary">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask the AI Assistant or type / for slash commands..."
              className="flex-1 bg-transparent px-3 py-2 text-xs text-text-primary placeholder:text-text-muted focus:outline-none"
            />
            <button
              onClick={() => handleSend()}
              className="p-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-text-inverse transition-all"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
