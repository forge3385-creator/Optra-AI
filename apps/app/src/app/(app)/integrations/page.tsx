'use client';

import React from 'react';
import { Layers, CheckCircle2, RefreshCw, Zap, Shield, ExternalLink } from 'lucide-react';

export default function IntegrationsPage() {
  const integrations = [
    { provider: 'sap', name: 'SAP S/4HANA', cat: 'ERP', status: 'connected', desc: 'OAuth 2.0 + SAML combo. Actions: Purchase orders, Vendors, Invoices.' },
    { provider: 'salesforce', name: 'Salesforce CRM', cat: 'CRM', status: 'connected', desc: 'Bidirectional sync every 5 min for Accounts, Contacts, and Opportunities.' },
    { provider: 'slack', name: 'Slack Workspace', cat: 'Communication', status: 'connected', desc: 'Bot notifications, interactive approval buttons, and `/opscopilot` slash commands.' },
    { provider: 'okta', name: 'Okta Identity', cat: 'Identity', status: 'connected', desc: 'SAML 2.0 SSO and SCIM user provisioning.' },
    { provider: 'oracle', name: 'Oracle ERP Cloud', cat: 'ERP', status: 'available', desc: 'GL entries, AP/AR, and vendor master polling integration.' },
    { provider: 'dynamics', name: 'Microsoft Dynamics 365', cat: 'ERP', status: 'available', desc: 'Azure Event Grid webhooks and journal entries sync.' },
    { provider: 'jira', name: 'Jira Software', cat: 'Productivity', status: 'available', desc: 'Two-way task and issue sync with custom field mapping.' },
    { provider: 'msteams', name: 'Microsoft Teams', cat: 'Communication', status: 'available', desc: 'Adaptive card notifications and 1:1 decision prompts.' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary flex items-center gap-2">
            <Layers className="h-6 w-6 text-brand-primary" /> Enterprise Integrations Hub
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Unified adapter pattern for 28+ ERP, CRM, Communication, Productivity, and Identity providers.
          </p>
        </div>
      </div>

      {/* Integration Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((item) => (
          <div key={item.provider} className="p-5 rounded-2xl bg-surface-1 border border-border-subtle hover:border-brand-primary/40 transition-all space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-surface-2 text-brand-tertiary border border-border-subtle">{item.cat}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  item.status === 'connected' ? 'bg-status-success-bg text-status-success' : 'bg-surface-2 text-text-muted'
                }`}>
                  {item.status}
                </span>
              </div>

              <h3 className="font-bold text-base text-text-primary">{item.name}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
            </div>

            <div className="pt-3 border-t border-border-subtle flex justify-between items-center text-xs">
              <span className="text-text-muted font-mono">HMAC SHA-256</span>
              <button
                onClick={() => alert(`Configured integration connection for ${item.name}!`)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  item.status === 'connected' ? 'bg-surface-2 text-text-primary hover:bg-surface-3 border border-border-subtle' : 'bg-brand-primary text-text-inverse font-bold'
                }`}
              >
                {item.status === 'connected' ? 'Manage Connection' : 'Connect Provider'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
