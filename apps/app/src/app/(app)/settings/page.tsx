'use client';

import React from 'react';
import { Settings, Shield, User, Bell, Link2, Palette, Building2, LogOut, Check, AlertCircle, ChevronRight } from 'lucide-react';
import { dataStore } from '../../../lib/data-store';
import { useRouter } from 'next/navigation';

type Tab = 'profile' | 'notifications' | 'appearance' | 'security' | 'organization' | 'integrations';

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<Tab>('profile');
  const [user, setUser] = React.useState(dataStore.getActiveUser());
  const [tenant, setTenant] = React.useState(dataStore.getActiveTenant());
  const [saved, setSaved] = React.useState(false);
  const [formName, setFormName] = React.useState(user.full_name);
  const [formEmail, setFormEmail] = React.useState(user.email);

  React.useEffect(() => {
    const update = () => {
      setUser(dataStore.getActiveUser());
      setTenant(dataStore.getActiveTenant());
    };
    update();
    return dataStore.subscribe(update);
  }, []);

  const handleSaveProfile = () => {
    setSaved(true);
    dataStore.logAudit('PROFILE_UPDATED', 'User', user.id, `Profile updated by ${user.full_name}`);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = () => {
    router.push('/login');
  };

  const tabs = [
    { id: 'profile' as Tab, name: 'Profile', icon: User },
    { id: 'notifications' as Tab, name: 'Notifications', icon: Bell },
    { id: 'appearance' as Tab, name: 'Appearance', icon: Palette },
    { id: 'security' as Tab, name: 'Security', icon: Shield },
    { id: 'organization' as Tab, name: 'Organization', icon: Building2 },
    { id: 'integrations' as Tab, name: 'Integrations', icon: Link2 },
  ];

  const integrations = [
    {
      provider: 'google_calendar',
      name: 'Google Calendar',
      description: 'Sync meetings and create calendar events from Optra.',
      status: 'disconnected' as const,
      icon: '📅',
    },
    {
      provider: 'google_drive',
      name: 'Google Drive',
      description: 'Import and index documents from your Drive.',
      status: 'disconnected' as const,
      icon: '📁',
    },
    {
      provider: 'slack',
      name: 'Slack',
      description: 'Send approval notifications and incident alerts to Slack.',
      status: 'connected' as const,
      lastSync: '5 minutes ago',
      icon: '💬',
    },
    {
      provider: 'gmail',
      name: 'Gmail',
      description: 'Create tasks and approvals from authorized emails.',
      status: 'disconnected' as const,
      icon: '✉️',
    },
    {
      provider: 'sap',
      name: 'SAP S/4HANA',
      description: 'ERP integration for purchase orders and financial data.',
      status: 'connected' as const,
      lastSync: '4 minutes ago',
      icon: '🏭',
    },
    {
      provider: 'okta',
      name: 'Okta Identity',
      description: 'SSO and identity governance.',
      status: 'connected' as const,
      lastSync: '12 minutes ago',
      icon: '🔐',
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-text-primary flex items-center gap-2">
          <Settings className="h-6 w-6 text-brand-primary" /> Settings
        </h1>
        <p className="text-xs text-text-secondary mt-1">
          Manage your profile, preferences, security, and external integrations.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Tab Navigation */}
        <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible md:w-52 shrink-0 pb-2 md:pb-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-brand-primary text-text-inverse shadow-glow-primary'
                    : 'text-text-secondary hover:bg-surface-2 hover:text-text-primary'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {tab.name}
              </button>
            );
          })}

          <div className="mt-4 pt-4 border-t border-border-subtle hidden md:block">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-status-danger hover:bg-status-danger-bg transition-all"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
        </nav>

        {/* Tab Content */}
        <div className="flex-1 bg-surface-1 rounded-2xl border border-border-subtle p-6 min-h-96">
          {/* Profile */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-brand-primary/20 border-2 border-brand-primary/30 flex items-center justify-center text-2xl font-black text-brand-primary">
                  {user.avatar_initials}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-text-primary">{user.full_name}</h2>
                  <p className="text-sm text-text-secondary">{user.role} · {user.department}</p>
                  <p className="text-xs text-brand-primary font-semibold mt-0.5">{tenant.name}</p>
                </div>
              </div>

              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-bg-input border border-border-default rounded-xl text-sm text-text-primary focus:outline-none focus:border-brand-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">Work Email</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-3 py-2.5 bg-bg-input border border-border-default rounded-xl text-sm text-text-primary focus:outline-none focus:border-brand-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">Role</label>
                  <input
                    type="text"
                    value={user.role}
                    disabled
                    className="w-full px-3 py-2.5 bg-surface-2 border border-border-default rounded-xl text-sm text-text-muted cursor-not-allowed"
                  />
                  <p className="text-[11px] text-text-muted mt-1">Role is managed by your organization administrator.</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">Department</label>
                  <input
                    type="text"
                    defaultValue={user.department}
                    disabled
                    className="w-full px-3 py-2.5 bg-surface-2 border border-border-default rounded-xl text-sm text-text-muted cursor-not-allowed"
                  />
                </div>

                <button
                  onClick={handleSaveProfile}
                  className="px-5 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl text-sm font-bold shadow-glow-primary transition-all flex items-center gap-2"
                >
                  {saved ? <><Check className="h-4 w-4" /> Saved!</> : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-text-primary">Notification Preferences</h2>
              <div className="space-y-4 max-w-md">
                {[
                  { label: 'Approval requests assigned to me', description: 'Get notified when an approval requires your review', defaultChecked: true },
                  { label: 'Task assignments', description: 'When tasks are assigned to or updated by you', defaultChecked: true },
                  { label: 'Incident alerts (SEV1/SEV2)', description: 'Critical operational incidents', defaultChecked: true },
                  { label: 'SLA breach warnings', description: 'When a workflow or task is approaching SLA threshold', defaultChecked: true },
                  { label: 'Workflow execution results', description: 'Success and failure notifications for workflow runs', defaultChecked: false },
                  { label: 'Email digest (daily summary)', description: 'Receive a morning email with your daily priorities', defaultChecked: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-4 p-4 rounded-xl bg-surface-2 border border-border-subtle">
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{item.label}</p>
                      <p className="text-xs text-text-secondary mt-0.5">{item.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                      <input type="checkbox" defaultChecked={item.defaultChecked} className="sr-only peer" />
                      <div className="w-9 h-5 bg-surface-3 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-primary border border-border-default" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Appearance */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-text-primary">Appearance</h2>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-3">Theme</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'dark', label: 'Dark', preview: 'bg-gray-900 border-gray-700' },
                      { id: 'light', label: 'Light', preview: 'bg-white border-gray-200' },
                      { id: 'system', label: 'System', preview: 'bg-gradient-to-br from-gray-900 to-white border-gray-400' },
                    ].map((theme) => (
                      <button
                        key={theme.id}
                        className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                          theme.id === 'dark' ? 'border-brand-primary ring-2 ring-brand-primary/30' : 'border-border-subtle'
                        }`}
                      >
                        <div className={`h-10 w-full rounded-lg ${theme.preview} border`} />
                        <span className="text-xs font-semibold text-text-secondary">{theme.label}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-text-muted mt-2">Dark mode is currently active.</p>
                </div>
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-text-primary">Security & Access</h2>
              <div className="space-y-4 max-w-md">
                <div className="p-4 rounded-xl bg-status-success-bg border border-status-success/20 flex items-start gap-3">
                  <Check className="h-5 w-5 text-status-success shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-status-success">Session Active</p>
                    <p className="text-xs text-text-secondary mt-0.5">Last sign-in: Today at {new Date().toLocaleTimeString()}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-surface-2 border border-border-subtle space-y-3">
                  <h3 className="text-sm font-bold text-text-primary">Multi-Factor Authentication</h3>
                  <p className="text-xs text-text-secondary">MFA adds an extra layer of security to your account.</p>
                  <button className="px-4 py-2 bg-brand-primary text-white rounded-lg text-xs font-bold">Enable MFA</button>
                </div>

                <div className="p-4 rounded-xl bg-surface-2 border border-border-subtle space-y-3">
                  <h3 className="text-sm font-bold text-text-primary">Change Password</h3>
                  <input type="password" placeholder="Current password" className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-sm text-text-primary focus:outline-none focus:border-brand-primary" />
                  <input type="password" placeholder="New password" className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-sm text-text-primary focus:outline-none focus:border-brand-primary" />
                  <button className="px-4 py-2 bg-surface-3 border border-border-default text-text-primary rounded-lg text-xs font-bold">Update Password</button>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-status-danger-bg border border-status-danger/30 text-status-danger rounded-xl text-sm font-bold hover:bg-status-danger/10 transition-all"
                >
                  <LogOut className="h-4 w-4" /> Sign Out of All Devices
                </button>
              </div>
            </div>
          )}

          {/* Organization */}
          {activeTab === 'organization' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-text-primary">Organization</h2>
              <div className="space-y-4 max-w-md">
                <div className="p-4 rounded-xl bg-surface-2 border border-border-subtle space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center text-brand-primary font-black text-lg">A</div>
                    <div>
                      <p className="font-bold text-text-primary">{tenant.name}</p>
                      <p className="text-xs text-text-muted">/{tenant.slug}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-border-subtle grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-text-muted">Plan</p>
                      <p className="font-bold text-text-primary capitalize">{tenant.plan}</p>
                    </div>
                    <div>
                      <p className="text-text-muted">Status</p>
                      <p className="font-bold text-status-success capitalize">{tenant.status}</p>
                    </div>
                    <div>
                      <p className="text-text-muted">Your Role</p>
                      <p className="font-bold text-text-primary">{user.role}</p>
                    </div>
                    <div>
                      <p className="text-text-muted">Department</p>
                      <p className="font-bold text-text-primary">{user.department}</p>
                    </div>
                  </div>
                </div>

                {user.role === 'Company Admin' && (
                  <div className="p-4 rounded-xl bg-surface-2 border border-border-subtle">
                    <h3 className="text-sm font-bold text-text-primary mb-2">Admin Controls</h3>
                    <p className="text-xs text-text-secondary">Manage users, billing, and organizational settings in the Admin panel.</p>
                    <a href="/admin" className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 bg-brand-primary text-white rounded-lg text-xs font-bold">
                      Open Admin Panel <ChevronRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Integrations */}
          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-text-primary">Connected Integrations</h2>
                <p className="text-xs text-text-secondary mt-1">Connect external services to sync data and send notifications.</p>
              </div>

              <div className="space-y-3">
                {integrations.map((integration) => (
                  <div key={integration.provider} className="flex items-center justify-between p-4 rounded-xl bg-surface-2 border border-border-subtle hover:border-brand-primary/30 transition-all">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{integration.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-text-primary">{integration.name}</p>
                          {integration.status === 'connected' ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-status-success-bg text-status-success">Connected</span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-surface-3 text-text-muted border border-border-subtle">Not connected</span>
                          )}
                        </div>
                        <p className="text-xs text-text-secondary mt-0.5">{integration.description}</p>
                        {integration.status === 'connected' && 'lastSync' in integration && (
                          <p className="text-[11px] text-text-muted mt-0.5">Last synced: {(integration as any).lastSync}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      {integration.status === 'connected' ? (
                        <>
                          <button className="px-3 py-1.5 bg-surface-3 border border-border-subtle text-text-secondary rounded-lg text-xs font-semibold hover:text-text-primary transition-all">Sync</button>
                          <button className="px-3 py-1.5 bg-status-danger-bg border border-status-danger/30 text-status-danger rounded-lg text-xs font-semibold hover:bg-status-danger/20 transition-all">Disconnect</button>
                        </>
                      ) : (
                        <button className="px-3 py-1.5 bg-brand-primary text-white rounded-lg text-xs font-bold hover:bg-brand-primary-hover shadow-sm transition-all">Connect</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
