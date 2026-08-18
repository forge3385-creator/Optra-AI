-- ============================================================================
-- Optra AI / Operations Copilot
-- Initial Schema Migration v1
-- Run this in your Supabase Dashboard > SQL Editor
-- ============================================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── Organizations / Tenants ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  plan TEXT DEFAULT 'starter' CHECK (plan IN ('starter','growth','enterprise')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active','trial','suspended')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Demo tenant
INSERT INTO organizations (id, name, slug, plan, status)
VALUES ('11111111-1111-1111-1111-111111111111', 'AlgoForce Demo Co.', 'algoforce', 'enterprise', 'active')
ON CONFLICT (id) DO NOTHING;

-- ─── User Profiles ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_profiles (
  id TEXT PRIMARY KEY,
  tenant_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL,
  department TEXT,
  avatar_initials TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO user_profiles (id, tenant_id, email, full_name, role, department, avatar_initials) VALUES
  ('usr-1', '11111111-1111-1111-1111-111111111111', 'sara@demo.app', 'Sara Connor', 'Company Admin', 'Operations', 'SC'),
  ('usr-2', '11111111-1111-1111-1111-111111111111', 'mike@demo.app', 'Mike Ross', 'Operations Manager', 'Finance & Ops', 'MR'),
  ('usr-3', '11111111-1111-1111-1111-111111111111', 'priya@demo.app', 'Priya Sharma', 'Department Manager', 'Customer Ops', 'PS'),
  ('usr-4', '11111111-1111-1111-1111-111111111111', 'jonas@demo.app', 'Jonas Kahn', 'Team Lead', 'Engineering', 'JK'),
  ('usr-5', '11111111-1111-1111-1111-111111111111', 'lin@demo.app', 'Lin Dan', 'Employee', 'HR Ops', 'LD'),
  ('usr-6', '11111111-1111-1111-1111-111111111111', 'eve@demo.app', 'Eve Polastri', 'Compliance Officer', 'Security & Risk', 'EP'),
  ('usr-7', '11111111-1111-1111-1111-111111111111', 'adam@demo.app', 'Adam Wu', 'DevOps Lead', 'Infrastructure', 'AW'),
  ('usr-8', '11111111-1111-1111-1111-111111111111', 'aria@demo.app', 'Aria Stark', 'Auditor', 'Legal & Audit', 'AS')
ON CONFLICT (id) DO NOTHING;

-- ─── Tasks ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY,
  tenant_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  project_id TEXT,
  project_name TEXT,
  assignee_id TEXT,
  assignee_name TEXT NOT NULL,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low','medium','high','critical')),
  status TEXT DEFAULT 'todo' CHECK (status IN ('todo','in_progress','blocked','review','done')),
  due_at TIMESTAMPTZ,
  due_label TEXT,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- RLS Policy: users can only see tasks from their tenant
CREATE POLICY "tasks_tenant_isolation" ON tasks
  USING (tenant_id = '11111111-1111-1111-1111-111111111111'::UUID);

-- Seed demo tasks
INSERT INTO tasks (id, tenant_id, title, description, project_name, assignee_name, priority, status, due_label, progress, tags) VALUES
  ('tsk-1', '11111111-1111-1111-1111-111111111111', 'Review Tax ID & Compliance Attachments', 'Verify W-9 and international vendor tax compliance documentation.', 'Vendor Onboarding Wave', 'Eve Polastri', 'high', 'in_progress', 'Today', 65, ARRAY['compliance','vendor']),
  ('tsk-2', '11111111-1111-1111-1111-111111111111', 'Provision AWS Cloud IAM Credentials', 'Create zero-trust least-privilege IAM roles for contractors.', 'IT Infrastructure Scale', 'Jonas Kahn', 'critical', 'todo', 'Tomorrow', 0, ARRAY['security','aws']),
  ('tsk-3', '11111111-1111-1111-1111-111111111111', 'Draft Postmortem for DB Query Latency SEV2', 'Document replica lag root cause and preventative steps.', 'Incident Resolution', 'Sara Connor', 'medium', 'review', 'Aug 21', 90, ARRAY['incident','database']),
  ('tsk-4', '11111111-1111-1111-1111-111111111111', 'Quarterly Financial Expenditure Reconciliation', 'Audit department line items against planned Q3 budget.', 'Q3 Financial Audit', 'Mike Ross', 'medium', 'done', 'Aug 18', 100, ARRAY['finance']),
  ('tsk-5', '11111111-1111-1111-1111-111111111111', 'Update Customer Complaint Escalation Matrix SOP', 'Revise tier-3 technical escalation path in SOPs.', 'Customer Ops', 'Priya Sharma', 'low', 'blocked', 'Aug 24', 20, ARRAY['sop','docs'])
ON CONFLICT (id) DO NOTHING;

-- ─── Approval Requests ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS approval_requests (
  id TEXT PRIMARY KEY,
  tenant_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('purchase','finance','it','procurement','hr','operations')),
  amount NUMERIC(12,2) DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','cancelled')),
  requester_id TEXT,
  requester_name TEXT NOT NULL,
  department TEXT,
  sla_due_at TIMESTAMPTZ,
  sla_countdown TEXT,
  risk_badge TEXT,
  notes TEXT,
  rejection_reason TEXT,
  approved_by TEXT,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE approval_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "approvals_tenant_isolation" ON approval_requests
  USING (tenant_id = '11111111-1111-1111-1111-111111111111'::UUID);

INSERT INTO approval_requests (id, tenant_id, subject, category, amount, status, requester_name, department, risk_badge, notes) VALUES
  ('req-1042', '11111111-1111-1111-1111-111111111111', 'SAP Purchase Order #PO-9401', 'purchase', 12500, 'pending', 'Jonas Kahn', 'Customer Ops', 'Low Risk', 'Standard renewal of Customer Operations analytics licenses.'),
  ('req-1043', '11111111-1111-1111-1111-111111111111', 'AWS Production Cloud Credit Expansion', 'finance', 5000, 'pending', 'Adam Wu', 'Engineering', 'Medium Risk', 'Q3 reserve instance expansion for high-availability cluster.'),
  ('req-1044', '11111111-1111-1111-1111-111111111111', 'Senior Staff Engineer Access Delegation', 'it', 0, 'pending', 'Lin Dan', 'HR Ops', 'Low Risk', 'Elevated IAM permissions for SOC2 audit compliance logging.'),
  ('req-1045', '11111111-1111-1111-1111-111111111111', 'Vendor Contract Extension - CloudScale', 'procurement', 45000, 'pending', 'Mike Ross', 'Operations', 'High Risk', 'Annual contract renewal with 15% volume discount applied.')
ON CONFLICT (id) DO NOTHING;

-- ─── Workflows ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS workflows (
  id TEXT PRIMARY KEY,
  tenant_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  version INTEGER DEFAULT 1,
  status TEXT DEFAULT 'published' CHECK (status IN ('published','draft','archived')),
  category TEXT,
  nodes_count INTEGER DEFAULT 0,
  sla_minutes INTEGER DEFAULT 1440,
  runs_this_month INTEGER DEFAULT 0,
  last_run TEXT,
  definition JSONB DEFAULT '{"nodes": []}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "workflows_tenant_isolation" ON workflows
  USING (tenant_id = '11111111-1111-1111-1111-111111111111'::UUID);

-- ─── Incidents ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS incidents (
  id TEXT PRIMARY KEY,
  tenant_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  severity TEXT NOT NULL CHECK (severity IN ('sev1','sev2','sev3','sev4')),
  status TEXT DEFAULT 'open' CHECK (status IN ('open','investigating','mitigated','resolved')),
  reporter_name TEXT NOT NULL,
  assignee_name TEXT NOT NULL,
  sla_countdown TEXT,
  capas_count INTEGER DEFAULT 0,
  root_cause TEXT,
  postmortem TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "incidents_tenant_isolation" ON incidents
  USING (tenant_id = '11111111-1111-1111-1111-111111111111'::UUID);

INSERT INTO incidents (id, tenant_id, title, description, severity, status, reporter_name, assignee_name, sla_countdown, capas_count, root_cause) VALUES
  ('inc-101', '11111111-1111-1111-1111-111111111111', 'PostgreSQL Secondary Replica Lag Spiking > 45s', 'High read replication delay detected during batch indexing.', 'sev1', 'open', 'Jonas Kahn', 'Sara Connor', '14 min left', 2, 'Heavy analytical batch query without read-pool isolation.'),
  ('inc-102', '11111111-1111-1111-1111-111111111111', 'SAP OData API Authorization Timeout', 'OAuth2 token expiry causing intermittent ERP batch sync failure.', 'sev2', 'investigating', 'Mike Ross', 'Eve Polastri', '1h 20m left', 1, 'Expired certificate on intermediary SAP gateway.'),
  ('inc-103', '11111111-1111-1111-1111-111111111111', 'Webhook Outbound Delivery Failure to Slack', 'Rate limit hit on Slack enterprise webhook notifications.', 'sev3', 'mitigated', 'Priya Sharma', 'Lin Dan', '3h remaining', 0, NULL),
  ('inc-104', '11111111-1111-1111-1111-111111111111', 'User Avatar S3 Upload Thumbnail Delay', 'Lambda image resizer cold start delay.', 'sev4', 'resolved', 'Adam Wu', 'Adam Wu', 'Resolved', 1, 'Provisioned concurrency allocated to Lambda worker.')
ON CONFLICT (id) DO NOTHING;

-- ─── Projects ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  tenant_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  manager TEXT NOT NULL,
  department TEXT,
  budget NUMERIC(12,2) DEFAULT 0,
  actual_spend NUMERIC(12,2) DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active','on_track','at_risk','completed')),
  milestones_total INTEGER DEFAULT 0,
  milestones_completed INTEGER DEFAULT 0,
  due_date TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "projects_tenant_isolation" ON projects
  USING (tenant_id = '11111111-1111-1111-1111-111111111111'::UUID);

INSERT INTO projects (id, tenant_id, name, manager, department, budget, actual_spend, status, milestones_total, milestones_completed, due_date, description) VALUES
  ('proj-1', '11111111-1111-1111-1111-111111111111', 'Vendor Onboarding Digital Transformation', 'Sara Connor', 'Operations', 45000, 38200, 'active', 4, 3, 'Sep 30, 2026', 'Enterprise supplier portal automation and SAP ERP integration.'),
  ('proj-2', '11111111-1111-1111-1111-111111111111', 'Q3 Enterprise Security Audit & SOC2 Renewal', 'Eve Polastri', 'Security', 20000, 19500, 'active', 3, 2, 'Oct 15, 2026', 'Third-party auditor evaluation and identity access governance.'),
  ('proj-3', '11111111-1111-1111-1111-111111111111', 'SAP S/4HANA OData Connector Migration', 'Mike Ross', 'IT Systems', 60000, 64100, 'at_risk', 5, 3, 'Aug 31, 2026', 'Migration from legacy RFC endpoints to REST/OData APIs.')
ON CONFLICT (id) DO NOTHING;

-- ─── Documents ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS documents (
  id TEXT PRIMARY KEY,
  tenant_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  kind TEXT DEFAULT 'other' CHECK (kind IN ('sop','policy','contract','template','other')),
  version INTEGER DEFAULT 1,
  owner_name TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  summary TEXT,
  file_url TEXT,
  updated_at TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "documents_tenant_isolation" ON documents
  USING (tenant_id = '11111111-1111-1111-1111-111111111111'::UUID);

-- ─── Meetings ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS meetings (
  id TEXT PRIMARY KEY,
  tenant_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  organizer TEXT NOT NULL,
  department TEXT,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 45,
  participants TEXT[] DEFAULT '{}',
  summary TEXT,
  action_items JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "meetings_tenant_isolation" ON meetings
  USING (tenant_id = '11111111-1111-1111-1111-111111111111'::UUID);

-- ─── Risk Signals ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS risk_signals (
  id TEXT PRIMARY KEY,
  tenant_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  source TEXT,
  entity_id TEXT,
  score NUMERIC(4,2) DEFAULT 0,
  severity TEXT DEFAULT 'medium' CHECK (severity IN ('low','medium','high','critical')),
  rationale TEXT,
  recommendations TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'active' CHECK (status IN ('active','mitigated','snoozed')),
  detected_at TEXT DEFAULT 'Just now'
);

ALTER TABLE risk_signals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "risks_tenant_isolation" ON risk_signals
  USING (tenant_id = '11111111-1111-1111-1111-111111111111'::UUID);

-- ─── Notifications ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY,
  tenant_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('approval','sla_warning','incident','task','system','info')),
  read BOOLEAN DEFAULT FALSE,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notifications_user_isolation" ON notifications
  USING (user_id = current_setting('app.current_user_id', TRUE) OR tenant_id = '11111111-1111-1111-1111-111111111111'::UUID);

-- ─── Audit Logs ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY,
  tenant_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  user_role TEXT NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  details TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "audit_logs_tenant_isolation" ON audit_logs
  USING (tenant_id = '11111111-1111-1111-1111-111111111111'::UUID);

-- ─── Integration Connections ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS integration_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  provider TEXT NOT NULL CHECK (provider IN ('google_calendar','google_drive','slack','gmail','sap','okta','salesforce','aws')),
  provider_account_id TEXT,
  status TEXT DEFAULT 'disconnected' CHECK (status IN ('connected','disconnected','error','expired')),
  scopes TEXT[] DEFAULT '{}',
  encrypted_credentials TEXT, -- encrypted, never exposed to frontend
  expires_at TIMESTAMPTZ,
  last_sync_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, user_id, provider)
);

ALTER TABLE integration_connections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "integrations_user_isolation" ON integration_connections
  USING (user_id = current_setting('app.current_user_id', TRUE) OR organization_id = '11111111-1111-1111-1111-111111111111'::UUID);

-- ─── Enable Realtime on all core tables ───────────────────────────────────────
-- Run these in Supabase Dashboard > Database > Replication
-- Or via the Realtime panel in the Supabase Dashboard

-- ALTER PUBLICATION supabase_realtime ADD TABLE tasks;
-- ALTER PUBLICATION supabase_realtime ADD TABLE approval_requests;
-- ALTER PUBLICATION supabase_realtime ADD TABLE workflows;
-- ALTER PUBLICATION supabase_realtime ADD TABLE incidents;
-- ALTER PUBLICATION supabase_realtime ADD TABLE projects;
-- ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
-- ALTER PUBLICATION supabase_realtime ADD TABLE risk_signals;
-- ALTER PUBLICATION supabase_realtime ADD TABLE audit_logs;
