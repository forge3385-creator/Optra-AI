'use client';

import { supabase } from './supabase';

export interface OrgTenant {
  id: string;
  name: string;
  slug: string;
  plan: 'starter' | 'growth' | 'enterprise';
  status: 'active' | 'trial' | 'suspended';
}

export interface UserProfile {
  id: string;
  tenant_id: string;
  email: string;
  full_name: string;
  role: string;
  department: string;
  avatar_initials: string;
}

export interface ApprovalItem {
  id: string;
  tenant_id: string;
  subject: string;
  category: 'purchase' | 'finance' | 'it' | 'procurement' | 'hr' | 'operations';
  amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  requester_id: string;
  requester_name: string;
  department: string;
  sla_due_at: string;
  sla_countdown?: string;
  risk_badge: 'Low Risk' | 'Medium Risk' | 'High Risk' | 'Critical Risk';
  notes?: string;
  rejection_reason?: string;
  approved_by?: string;
  approved_at?: string;
  created_at: string;
}

export interface TaskItem {
  id: string;
  tenant_id: string;
  title: string;
  description?: string;
  project_id?: string;
  project_name?: string;
  assignee_id?: string;
  assignee_name: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'todo' | 'in_progress' | 'blocked' | 'review' | 'done';
  due_at: string;
  due_label: string;
  progress: number;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface WorkflowItem {
  id: string;
  tenant_id: string;
  name: string;
  description?: string;
  version: number;
  status: 'published' | 'draft' | 'archived';
  category: string;
  nodes_count: number;
  sla_minutes: number;
  runs_this_month: number;
  last_run: string;
  definition: {
    nodes: Array<{
      id: string;
      kind: string;
      label: string;
      desc?: string;
      assignee?: string;
      config?: Record<string, any>;
    }>;
  };
  created_at: string;
  updated_at: string;
}

export interface IncidentItem {
  id: string;
  tenant_id: string;
  title: string;
  description?: string;
  severity: 'sev1' | 'sev2' | 'sev3' | 'sev4';
  status: 'open' | 'investigating' | 'mitigated' | 'resolved';
  reporter_name: string;
  assignee_name: string;
  sla_countdown: string;
  capas_count: number;
  root_cause?: string;
  postmortem?: string;
  created_at: string;
  updated_at: string;
}

export interface RiskSignalItem {
  id: string;
  tenant_id: string;
  source: 'workflow' | 'sla' | 'incident' | 'workload' | 'compliance' | 'vendor';
  entity_id: string;
  score: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  rationale: string;
  recommendations: string[];
  status: 'active' | 'mitigated' | 'snoozed';
  detected_at: string;
}

export interface ProjectItem {
  id: string;
  tenant_id: string;
  name: string;
  manager: string;
  department: string;
  budget: number;
  actual_spend: number;
  status: 'active' | 'on_track' | 'at_risk' | 'completed';
  milestones_total: number;
  milestones_completed: number;
  due_date: string;
  description?: string;
  created_at: string;
}

export interface DocumentItem {
  id: string;
  tenant_id: string;
  title: string;
  kind: 'sop' | 'policy' | 'contract' | 'template' | 'other';
  version: number;
  owner_name: string;
  tags: string[];
  summary: string;
  file_url?: string;
  updated_at: string;
  created_at: string;
}

export interface MeetingItem {
  id: string;
  tenant_id: string;
  title: string;
  organizer: string;
  department: string;
  scheduled_at: string;
  duration_minutes: number;
  participants: string[];
  summary?: string;
  action_items: Array<{
    id: string;
    title: string;
    assignee: string;
    due_date: string;
    status: 'pending' | 'converted_to_task' | 'completed';
    task_id?: string;
  }>;
  created_at: string;
}

export interface NotificationItem {
  id: string;
  tenant_id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'approval' | 'sla_warning' | 'incident' | 'task' | 'system' | 'info';
  read: boolean;
  link?: string;
  created_at: string;
}

export interface AuditLogItem {
  id: string;
  tenant_id: string;
  user_name: string;
  user_role: string;
  action: string;
  entity_type: string;
  entity_id: string;
  details: string;
  timestamp: string;
}

export interface IntegrationItem {
  id: string;
  name: string;
  category: string;
  status: 'connected' | 'disconnected' | 'error';
  last_sync: string;
  sync_frequency: string;
  icon: string;
}

// Initial Seed Data
const DEFAULT_TENANT: OrgTenant = {
  id: '11111111-1111-1111-1111-111111111111',
  name: 'AlgoForce Demo Co.',
  slug: 'algoforce',
  plan: 'enterprise',
  status: 'active'
};

const DEFAULT_USERS: UserProfile[] = [
  { id: 'usr-1', tenant_id: DEFAULT_TENANT.id, email: 'sara@demo.app', full_name: 'Sara Connor', role: 'Company Admin', department: 'Operations', avatar_initials: 'SC' },
  { id: 'usr-2', tenant_id: DEFAULT_TENANT.id, email: 'mike@demo.app', full_name: 'Mike Ross', role: 'Operations Manager', department: 'Finance & Ops', avatar_initials: 'MR' },
  { id: 'usr-3', tenant_id: DEFAULT_TENANT.id, email: 'priya@demo.app', full_name: 'Priya Sharma', role: 'Department Manager', department: 'Customer Ops', avatar_initials: 'PS' },
  { id: 'usr-4', tenant_id: DEFAULT_TENANT.id, email: 'jonas@demo.app', full_name: 'Jonas Kahn', role: 'Team Lead', department: 'Engineering', avatar_initials: 'JK' },
  { id: 'usr-5', tenant_id: DEFAULT_TENANT.id, email: 'lin@demo.app', full_name: 'Lin Dan', role: 'Employee', department: 'HR Ops', avatar_initials: 'LD' },
  { id: 'usr-6', tenant_id: DEFAULT_TENANT.id, email: 'eve@demo.app', full_name: 'Eve Polastri', role: 'Compliance Officer', department: 'Security & Risk', avatar_initials: 'EP' },
  { id: 'usr-7', tenant_id: DEFAULT_TENANT.id, email: 'adam@demo.app', full_name: 'Adam Wu', role: 'DevOps Lead', department: 'Infrastructure', avatar_initials: 'AW' },
  { id: 'usr-8', tenant_id: DEFAULT_TENANT.id, email: 'aria@demo.app', full_name: 'Aria Stark', role: 'Auditor', department: 'Legal & Audit', avatar_initials: 'AS' }
];

const INITIAL_APPROVALS: ApprovalItem[] = [
  {
    id: 'req-1042',
    tenant_id: DEFAULT_TENANT.id,
    subject: 'SAP Purchase Order #PO-9401',
    category: 'purchase',
    amount: 12500,
    currency: 'USD',
    status: 'pending',
    requester_id: 'usr-4',
    requester_name: 'Jonas Kahn',
    department: 'Customer Ops',
    sla_due_at: new Date(Date.now() + 2 * 3600 * 1000).toISOString(),
    sla_countdown: '2 hours remaining',
    risk_badge: 'Low Risk',
    notes: 'Standard renewal of Customer Operations analytics licenses.',
    created_at: new Date(Date.now() - 4 * 3600 * 1000).toISOString()
  },
  {
    id: 'req-1043',
    tenant_id: DEFAULT_TENANT.id,
    subject: 'AWS Production Cloud Credit Expansion',
    category: 'finance',
    amount: 5000,
    currency: 'USD',
    status: 'pending',
    requester_id: 'usr-7',
    requester_name: 'Adam Wu',
    department: 'Engineering',
    sla_due_at: new Date(Date.now() + 5 * 3600 * 1000).toISOString(),
    sla_countdown: '5 hours remaining',
    risk_badge: 'Medium Risk',
    notes: 'Q3 reserve instance expansion for high-availability cluster.',
    created_at: new Date(Date.now() - 6 * 3600 * 1000).toISOString()
  },
  {
    id: 'req-1044',
    tenant_id: DEFAULT_TENANT.id,
    subject: 'Senior Staff Engineer Access Delegation',
    category: 'it',
    amount: 0,
    currency: 'USD',
    status: 'pending',
    requester_id: 'usr-5',
    requester_name: 'Lin Dan',
    department: 'HR Ops',
    sla_due_at: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
    sla_countdown: '1 day remaining',
    risk_badge: 'Low Risk',
    notes: 'Elevated IAM permissions for SOC2 audit compliance logging.',
    created_at: new Date(Date.now() - 8 * 3600 * 1000).toISOString()
  },
  {
    id: 'req-1045',
    tenant_id: DEFAULT_TENANT.id,
    subject: 'Vendor Contract Extension - CloudScale',
    category: 'procurement',
    amount: 45000,
    currency: 'USD',
    status: 'pending',
    requester_id: 'usr-2',
    requester_name: 'Mike Ross',
    department: 'Operations',
    sla_due_at: new Date(Date.now() + 4 * 3600 * 1000).toISOString(),
    sla_countdown: '4 hours remaining',
    risk_badge: 'High Risk',
    notes: 'Annual contract renewal with 15% volume discount applied.',
    created_at: new Date(Date.now() - 10 * 3600 * 1000).toISOString()
  }
];

const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'tsk-1',
    tenant_id: DEFAULT_TENANT.id,
    title: 'Review Tax ID & Compliance Attachments',
    description: 'Verify W-9 and international vendor tax compliance documentation for onboarding wave.',
    project_id: 'proj-1',
    project_name: 'Vendor Onboarding Wave',
    assignee_id: 'usr-6',
    assignee_name: 'Eve Polastri',
    priority: 'high',
    status: 'in_progress',
    due_at: new Date(Date.now() + 12 * 3600 * 1000).toISOString(),
    due_label: 'Today',
    progress: 65,
    tags: ['compliance', 'vendor'],
    created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'tsk-2',
    tenant_id: DEFAULT_TENANT.id,
    title: 'Provision AWS Cloud IAM Credentials',
    description: 'Create zero-trust least-privilege IAM roles for incoming data engineering contractors.',
    project_id: 'proj-2',
    project_name: 'IT Infrastructure Scale',
    assignee_id: 'usr-4',
    assignee_name: 'Jonas Kahn',
    priority: 'critical',
    status: 'todo',
    due_at: new Date(Date.now() + 36 * 3600 * 1000).toISOString(),
    due_label: 'Tomorrow',
    progress: 0,
    tags: ['security', 'aws'],
    created_at: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'tsk-3',
    tenant_id: DEFAULT_TENANT.id,
    title: 'Draft Postmortem for DB Query Latency SEV2',
    description: 'Document replica lag root cause and preventative index optimization steps.',
    project_id: 'proj-3',
    project_name: 'Incident Resolution',
    assignee_id: 'usr-1',
    assignee_name: 'Sara Connor',
    priority: 'medium',
    status: 'review',
    due_at: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
    due_label: 'Aug 21',
    progress: 90,
    tags: ['incident', 'database'],
    created_at: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'tsk-4',
    tenant_id: DEFAULT_TENANT.id,
    title: 'Quarterly Financial Expenditure Reconciliation',
    description: 'Audit department line items against planned Q3 budget and highlight variances.',
    project_id: 'proj-1',
    project_name: 'Q3 Financial Audit',
    assignee_id: 'usr-2',
    assignee_name: 'Mike Ross',
    priority: 'medium',
    status: 'done',
    due_at: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    due_label: 'Aug 18',
    progress: 100,
    tags: ['finance'],
    created_at: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'tsk-5',
    tenant_id: DEFAULT_TENANT.id,
    title: 'Update Customer Complaint Escalation Matrix SOP',
    description: 'Revise tier-3 technical escalation path in standard operating procedure docs.',
    project_id: 'proj-1',
    project_name: 'Customer Ops',
    assignee_id: 'usr-3',
    assignee_name: 'Priya Sharma',
    priority: 'low',
    status: 'blocked',
    due_at: new Date(Date.now() + 120 * 3600 * 1000).toISOString(),
    due_label: 'Aug 24',
    progress: 20,
    tags: ['sop', 'docs'],
    created_at: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString()
  }
];

const INITIAL_WORKFLOWS: WorkflowItem[] = [
  {
    id: 'wf-1',
    tenant_id: DEFAULT_TENANT.id,
    name: 'Vendor Onboarding & Compliance Validation',
    description: 'Automated supplier verification, AI tax validation, and multi-tier finance approval pipeline.',
    version: 3,
    status: 'published',
    category: 'Procurement',
    nodes_count: 7,
    sla_minutes: 1440,
    runs_this_month: 342,
    last_run: '12 minutes ago',
    definition: {
      nodes: [
        { id: 'n1', kind: 'start', label: 'Vendor Submits Request Form', desc: 'Entry trigger via web portal form' },
        { id: 'n2', kind: 'ai_prompt', label: 'AI Compliance Validation', desc: 'Validates Tax ID, W-9, & OFAC checks' },
        { id: 'n3', kind: 'approval', label: 'Manager Approval Gate', desc: 'SLA: 24 hours, Assignee: Department Lead' },
        { id: 'n4', kind: 'approval', label: 'Finance Director Signoff', desc: 'Policy: Threshold >= $5,000' },
        { id: 'n5', kind: 'task', label: 'SAP PO Entry Dispatch', desc: 'Task auto-dispatched to ERP team' },
        { id: 'n6', kind: 'notification', label: 'Slack & Email Notification', desc: 'Broadcasts completion status' },
        { id: 'n7', kind: 'end', label: 'Process Completion', desc: 'Terminal state & audit log write' }
      ]
    },
    created_at: new Date(Date.now() - 30 * 86400 * 1000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'wf-2',
    tenant_id: DEFAULT_TENANT.id,
    name: 'IT Access & Privilege Grant Request',
    description: 'Zero-trust role-based IAM provisioning workflow with automated compliance logging.',
    version: 2,
    status: 'published',
    category: 'IT & Security',
    nodes_count: 5,
    sla_minutes: 480,
    runs_this_month: 890,
    last_run: '2 hours ago',
    definition: {
      nodes: [
        { id: 'n1', kind: 'start', label: 'User Submits IAM Access Request' },
        { id: 'n2', kind: 'approval', label: 'Security Officer Approval' },
        { id: 'n3', kind: 'task', label: 'Okta / AWS Provisioning' },
        { id: 'n4', kind: 'notification', label: 'User Credential Delivery' },
        { id: 'n5', kind: 'end', label: 'Access Active' }
      ]
    },
    created_at: new Date(Date.now() - 45 * 86400 * 1000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'wf-3',
    tenant_id: DEFAULT_TENANT.id,
    name: 'Customer Complaint AI Triage & Resolution',
    description: 'LLM sentiment analysis, priority routing, automated SLA timers, and team escalation.',
    version: 5,
    status: 'published',
    category: 'Customer Ops',
    nodes_count: 6,
    sla_minutes: 120,
    runs_this_month: 1240,
    last_run: '4 minutes ago',
    definition: {
      nodes: [
        { id: 'n1', kind: 'start', label: 'Inbound Ticket Ingestion' },
        { id: 'n2', kind: 'ai_prompt', label: 'LLM Sentiment & Severity Analysis' },
        { id: 'n3', kind: 'branch', label: 'High Priority vs Standard Gate' },
        { id: 'n4', kind: 'task', label: 'Tier-2 Specialist Assignment' },
        { id: 'n5', kind: 'notification', label: 'Customer Live Update' },
        { id: 'n6', kind: 'end', label: 'Ticket Resolved' }
      ]
    },
    created_at: new Date(Date.now() - 60 * 86400 * 1000).toISOString(),
    updated_at: new Date().toISOString()
  }
];

const INITIAL_INCIDENTS: IncidentItem[] = [
  {
    id: 'inc-101',
    tenant_id: DEFAULT_TENANT.id,
    title: 'PostgreSQL Secondary Replica Lag Spiking > 45s',
    description: 'High read replication delay detected on production cluster during batch indexing.',
    severity: 'sev1',
    status: 'open',
    reporter_name: 'Jonas Kahn',
    assignee_name: 'Sara Connor',
    sla_countdown: '14 min left',
    capas_count: 2,
    root_cause: 'Heavy analytical batch query without read-pool isolation.',
    created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'inc-102',
    tenant_id: DEFAULT_TENANT.id,
    title: 'SAP OData API Authorization Timeout',
    description: 'OAuth2 token expiry issue causing intermittent failure in ERP batch sync.',
    severity: 'sev2',
    status: 'investigating',
    reporter_name: 'Mike Ross',
    assignee_name: 'Eve Polastri',
    sla_countdown: '1h 20m left',
    capas_count: 1,
    root_cause: 'Expired certificate on intermediary SAP gateway.',
    created_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'inc-103',
    tenant_id: DEFAULT_TENANT.id,
    title: 'Webhook Outbound Delivery Failure to Slack',
    description: 'Rate limit hit on Slack enterprise webhook notifications.',
    severity: 'sev3',
    status: 'mitigated',
    reporter_name: 'Priya Sharma',
    assignee_name: 'Lin Dan',
    sla_countdown: '3h remaining',
    capas_count: 0,
    created_at: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'inc-104',
    tenant_id: DEFAULT_TENANT.id,
    title: 'User Avatar S3 Upload Thumbnail Delay',
    description: 'Lambda image resizer cold start delay.',
    severity: 'sev4',
    status: 'resolved',
    reporter_name: 'Adam Wu',
    assignee_name: 'Adam Wu',
    sla_countdown: 'Resolved',
    capas_count: 1,
    root_cause: 'Provisioned concurrency allocated to Lambda worker.',
    created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString()
  }
];

const INITIAL_RISKS: RiskSignalItem[] = [
  {
    id: 'risk-1',
    tenant_id: DEFAULT_TENANT.id,
    source: 'workflow',
    entity_id: 'wf-1',
    score: 0.78,
    severity: 'high',
    rationale: "Workflow 'Vendor Onboarding' avg breach rate 24% over last 30 runs. Assignee workload above 1.5σ.",
    recommendations: [
      "Add backup approver at step 'finance_review'",
      "Split workload across 2 reviewers"
    ],
    status: 'active',
    detected_at: '10 minutes ago'
  },
  {
    id: 'risk-2',
    tenant_id: DEFAULT_TENANT.id,
    source: 'workload',
    entity_id: 'dept-customer-ops',
    score: 0.65,
    severity: 'medium',
    rationale: 'Customer Ops team capacity is at 94% utilization for 3 consecutive weeks.',
    recommendations: [
      "Reassign 12 non-critical tasks to Back-Office pool",
      "Enable automated complaint triage bot"
    ],
    status: 'active',
    detected_at: '35 minutes ago'
  },
  {
    id: 'risk-3',
    tenant_id: DEFAULT_TENANT.id,
    source: 'vendor',
    entity_id: 'conn-sap-s4hana',
    score: 0.82,
    severity: 'critical',
    rationale: 'SAP S/4HANA OData API latency increased by 420ms (3.2σ above baseline).',
    recommendations: [
      "Fallback to cached PO payload queue",
      "Notify SAP Administrator"
    ],
    status: 'active',
    detected_at: '1 hour ago'
  }
];

const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    tenant_id: DEFAULT_TENANT.id,
    name: 'Vendor Onboarding Digital Transformation',
    manager: 'Sara Connor',
    department: 'Operations',
    budget: 45000,
    actual_spend: 38200,
    status: 'active',
    milestones_total: 4,
    milestones_completed: 3,
    due_date: 'Sep 30, 2026',
    description: 'Enterprise supplier portal automation and SAP ERP integration.',
    created_at: new Date(Date.now() - 60 * 86400 * 1000).toISOString()
  },
  {
    id: 'proj-2',
    tenant_id: DEFAULT_TENANT.id,
    name: 'Q3 Enterprise Security Audit & SOC2 Renewal',
    manager: 'Eve Polastri',
    department: 'Security',
    budget: 20000,
    actual_spend: 19500,
    status: 'active',
    milestones_total: 3,
    milestones_completed: 2,
    due_date: 'Oct 15, 2026',
    description: 'Third-party auditor evaluation and identity access governance.',
    created_at: new Date(Date.now() - 30 * 86400 * 1000).toISOString()
  },
  {
    id: 'proj-3',
    tenant_id: DEFAULT_TENANT.id,
    name: 'SAP S/4HANA OData Connector Migration',
    manager: 'Mike Ross',
    department: 'IT Systems',
    budget: 60000,
    actual_spend: 64100,
    status: 'at_risk',
    milestones_total: 5,
    milestones_completed: 3,
    due_date: 'Aug 31, 2026',
    description: 'Migration from legacy RFC endpoints to REST/OData APIs.',
    created_at: new Date(Date.now() - 90 * 86400 * 1000).toISOString()
  }
];

const INITIAL_DOCS: DocumentItem[] = [
  {
    id: 'doc-1',
    tenant_id: DEFAULT_TENANT.id,
    title: 'SOP - Vendor Compliance & Tax Verification',
    kind: 'sop',
    version: 3,
    owner_name: 'Eve Polastri',
    tags: ['compliance', 'vendor', 'tax', 'sop'],
    summary: 'Standard operating procedure detailing step-by-step verification of vendor tax identification, W-9/W-8BEN forms, and OFAC sanction checks.',
    updated_at: '2 days ago',
    created_at: new Date(Date.now() - 10 * 86400 * 1000).toISOString()
  },
  {
    id: 'doc-2',
    tenant_id: DEFAULT_TENANT.id,
    title: 'Policy - Financial Expenditure & Approval Thresholds',
    kind: 'policy',
    version: 2,
    owner_name: 'Mike Ross',
    tags: ['finance', 'policy', 'approvals'],
    summary: 'Mandatory financial policy defining single-approver caps, CFO sign-off thresholds ($5,000+), and audit logging requirements.',
    updated_at: '1 week ago',
    created_at: new Date(Date.now() - 20 * 86400 * 1000).toISOString()
  },
  {
    id: 'doc-3',
    tenant_id: DEFAULT_TENANT.id,
    title: 'Master Service Agreement - CloudScale Inc.',
    kind: 'contract',
    version: 1,
    owner_name: 'Sara Connor',
    tags: ['contract', 'vendor', 'legal'],
    summary: 'Binding enterprise cloud hosting agreement including 99.95% uptime guarantees, DPA terms, and liability limits.',
    updated_at: 'Aug 10',
    created_at: new Date(Date.now() - 30 * 86400 * 1000).toISOString()
  },
  {
    id: 'doc-4',
    tenant_id: DEFAULT_TENANT.id,
    title: 'Template - SEV1 Incident Postmortem Report',
    kind: 'template',
    version: 4,
    owner_name: 'Jonas Kahn',
    tags: ['incident', 'template', 'engineering'],
    summary: 'Standardized postmortem structure detailing timeline of events, root cause analysis, contributing factors, and CAPA item assignments.',
    updated_at: 'Aug 05',
    created_at: new Date(Date.now() - 40 * 86400 * 1000).toISOString()
  }
];

const INITIAL_MEETINGS: MeetingItem[] = [
  {
    id: 'mtg-1',
    tenant_id: DEFAULT_TENANT.id,
    title: 'Operations Standup & SLA Triage',
    organizer: 'Sara Connor',
    department: 'Operations',
    scheduled_at: new Date(Date.now() + 4 * 3600 * 1000).toISOString(),
    duration_minutes: 30,
    participants: ['Sara Connor', 'Mike Ross', 'Priya Sharma', 'Eve Polastri'],
    summary: 'Daily operational review covering open SEV1 incident #101, overdue SAP approvals, and Q3 SOC2 audit schedule.',
    action_items: [
      { id: 'act-1', title: 'Isolate read replica queries for analytics', assignee: 'Jonas Kahn', due_date: 'Today', status: 'pending' },
      { id: 'act-2', title: 'Schedule vendor renewal call with CloudScale', assignee: 'Mike Ross', due_date: 'Tomorrow', status: 'pending' }
    ],
    created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
  }
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    tenant_id: DEFAULT_TENANT.id,
    user_id: 'usr-1',
    title: 'Approval Requested',
    message: 'SAP Purchase Order #PO-9401 ($12,500.00) is awaiting your review.',
    type: 'approval',
    read: false,
    link: '/approvals',
    created_at: new Date(Date.now() - 20 * 60 * 1000).toISOString()
  },
  {
    id: 'notif-2',
    tenant_id: DEFAULT_TENANT.id,
    user_id: 'usr-1',
    title: 'SLA Breach Warning',
    message: 'Incident #inc-101 (PostgreSQL Lag) is 14 minutes away from breaching SLA.',
    type: 'sla_warning',
    read: false,
    link: '/incidents',
    created_at: new Date(Date.now() - 35 * 60 * 1000).toISOString()
  },
  {
    id: 'notif-3',
    tenant_id: DEFAULT_TENANT.id,
    user_id: 'usr-1',
    title: 'New Task Assigned',
    message: 'You were assigned to "Draft Postmortem for DB Query Latency SEV2".',
    type: 'task',
    read: true,
    link: '/tasks',
    created_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
  }
];

const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'aud-1',
    tenant_id: DEFAULT_TENANT.id,
    user_name: 'Sara Connor',
    user_role: 'Company Admin',
    action: 'APPROVAL_CREATED',
    entity_type: 'Approval',
    entity_id: 'req-1045',
    details: 'Submitted Vendor Contract Extension for $45,000',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  },
  {
    id: 'aud-2',
    tenant_id: DEFAULT_TENANT.id,
    user_name: 'Jonas Kahn',
    user_role: 'Team Lead',
    action: 'INCIDENT_DECLARED',
    entity_type: 'Incident',
    entity_id: 'inc-101',
    details: 'Declared SEV1: PostgreSQL Secondary Replica Lag',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString()
  }
];

const INITIAL_INTEGRATIONS: IntegrationItem[] = [
  { id: 'int-1', name: 'SAP S/4HANA ERP', category: 'ERP & Finance', status: 'connected', last_sync: '4 minutes ago', sync_frequency: 'Real-time (Webhook)', icon: 'Database' },
  { id: 'int-2', name: 'AWS CloudWatch & IAM', category: 'Cloud Infrastructure', status: 'connected', last_sync: '1 minute ago', sync_frequency: 'Every 60s', icon: 'Cloud' },
  { id: 'int-3', name: 'Slack Enterprise Grid', category: 'Collaboration', status: 'connected', last_sync: 'Just now', sync_frequency: 'Real-time', icon: 'MessageSquare' },
  { id: 'int-4', name: 'Okta Identity Cloud', category: 'Security & Auth', status: 'connected', last_sync: '12 minutes ago', sync_frequency: 'Every 15m', icon: 'Shield' },
  { id: 'int-5', name: 'Salesforce CRM', category: 'Customer Ops', status: 'connected', last_sync: '20 minutes ago', sync_frequency: 'Hourly', icon: 'Users' }
];

// Persistent State Storage Key
const STORAGE_KEY = 'optra_ai_enterprise_data_v1';

class DataStore {
  private approvals: ApprovalItem[] = [];
  private tasks: TaskItem[] = [];
  private workflows: WorkflowItem[] = [];
  private incidents: IncidentItem[] = [];
  private risks: RiskSignalItem[] = [];
  private projects: ProjectItem[] = [];
  private documents: DocumentItem[] = [];
  private meetings: MeetingItem[] = [];
  private notifications: NotificationItem[] = [];
  private auditLogs: AuditLogItem[] = [];
  private integrations: IntegrationItem[] = [];
  private activeUser: UserProfile = DEFAULT_USERS[0];
  private activeTenant: OrgTenant = DEFAULT_TENANT;
  private listeners: Set<() => void> = new Set();
  private broadcastChannel: BroadcastChannel | null = null;
  private supabaseReady = false;
  private realtimeCleanups: Array<() => void> = [];

  constructor() {
    this.loadState();
    if (typeof window !== 'undefined') {
      try {
        this.broadcastChannel = new BroadcastChannel('optra_realtime_sync');
        this.broadcastChannel.onmessage = (event) => {
          if (event.data === 'sync_event') {
            this.loadState();
            this.notify();
          }
        };
      } catch (e) {
        // Fallback for environments without BroadcastChannel
      }
      // Initialize Supabase sync (async, non-blocking)
      this.initSupabaseSync();
    }
  }

  /**
   * Attempt to sync from Supabase. If tables exist and have data,
   * use them as source of truth. Otherwise fall back to localStorage/seed.
   * Also sets up realtime subscriptions for cross-session sync.
   */
  private async initSupabaseSync() {
    try {
      // Try fetching tasks as a canary check
      const { data: taskData, error: taskError } = await supabase
        .from('tasks')
        .select('*')
        .eq('tenant_id', this.activeTenant.id)
        .order('created_at', { ascending: false });

      if (!taskError && taskData) {
        this.supabaseReady = true;
        // Fetch all tables from Supabase
        if (taskData.length > 0) this.tasks = taskData;

        const [approvalRes, workflowRes, incidentRes, projectRes, docRes, meetingRes, riskRes, notifRes, auditRes] = await Promise.allSettled([
          supabase.from('approval_requests').select('*').eq('tenant_id', this.activeTenant.id).order('created_at', { ascending: false }),
          supabase.from('workflows').select('*').eq('tenant_id', this.activeTenant.id).order('created_at', { ascending: false }),
          supabase.from('incidents').select('*').eq('tenant_id', this.activeTenant.id).order('created_at', { ascending: false }),
          supabase.from('projects').select('*').eq('tenant_id', this.activeTenant.id).order('created_at', { ascending: false }),
          supabase.from('documents').select('*').eq('tenant_id', this.activeTenant.id).order('created_at', { ascending: false }),
          supabase.from('meetings').select('*').eq('tenant_id', this.activeTenant.id).order('created_at', { ascending: false }),
          supabase.from('risk_signals').select('*').eq('tenant_id', this.activeTenant.id),
          supabase.from('notifications').select('*').eq('user_id', this.activeUser.id).order('created_at', { ascending: false }).limit(50),
          supabase.from('audit_logs').select('*').eq('tenant_id', this.activeTenant.id).order('timestamp', { ascending: false }).limit(100),
        ]);

        // Only override from Supabase if we got successful, non-empty results
        if (approvalRes.status === 'fulfilled' && approvalRes.value.data?.length) this.approvals = approvalRes.value.data;
        if (workflowRes.status === 'fulfilled' && workflowRes.value.data?.length) this.workflows = workflowRes.value.data;
        if (incidentRes.status === 'fulfilled' && incidentRes.value.data?.length) this.incidents = incidentRes.value.data;
        if (projectRes.status === 'fulfilled' && projectRes.value.data?.length) this.projects = projectRes.value.data;
        if (docRes.status === 'fulfilled' && docRes.value.data?.length) this.documents = docRes.value.data;
        if (meetingRes.status === 'fulfilled' && meetingRes.value.data?.length) this.meetings = meetingRes.value.data;
        if (riskRes.status === 'fulfilled' && riskRes.value.data?.length) this.risks = riskRes.value.data;
        if (notifRes.status === 'fulfilled' && notifRes.value.data?.length) this.notifications = notifRes.value.data;
        if (auditRes.status === 'fulfilled' && auditRes.value.data?.length) this.auditLogs = auditRes.value.data;

        this.saveState(); // Cache in localStorage
        this.notify();

        // Set up realtime subscriptions
        this.setupRealtimeSubscriptions();

        console.info('[Optra] Supabase sync initialized — database is source of truth');
      } else {
        // If tables don't exist yet, seed them
        if (taskError?.code === '42P01') {
          console.info('[Optra] Supabase tables not found. Using localStorage + seed data. Run migrations to enable DB persistence.');
        } else {
          console.info('[Optra] Supabase available but empty. Seeding initial data...');
          await this.seedSupabase();
        }
      }
    } catch (err) {
      console.warn('[Optra] Supabase sync unavailable, using localStorage fallback:', err);
    }
  }

  private setupRealtimeSubscriptions() {
    const tid = this.activeTenant.id;
    const tables = ['tasks', 'approval_requests', 'incidents', 'workflows', 'projects', 'notifications', 'risk_signals'] as const;

    for (const table of tables) {
      const channel = supabase
        .channel(`optra-${table}-${tid}`)
        .on('postgres_changes' as any, { event: '*', schema: 'public', table, filter: `tenant_id=eq.${tid}` }, () => {
          // Re-fetch from Supabase on any change
          this.initSupabaseSync();
        })
        .subscribe();

      this.realtimeCleanups.push(() => supabase.removeChannel(channel));
    }
  }

  private async seedSupabase() {
    try {
      // Seed tasks
      for (const task of INITIAL_TASKS) {
        await supabase.from('tasks').upsert(task).select();
      }
      // Seed approvals
      for (const appr of INITIAL_APPROVALS) {
        await supabase.from('approval_requests').upsert(appr).select();
      }
      // Seed incidents
      for (const inc of INITIAL_INCIDENTS) {
        await supabase.from('incidents').upsert(inc).select();
      }
      // Seed projects
      for (const proj of INITIAL_PROJECTS) {
        await supabase.from('projects').upsert(proj).select();
      }
      this.supabaseReady = true;
      console.info('[Optra] Supabase seeded with initial demo data');
    } catch (err) {
      console.warn('[Optra] Supabase seed failed:', err);
    }
  }

  /**
   * Write a mutation to Supabase (fire-and-forget, non-blocking).
   * The local state is already updated synchronously for instant UI.
   */
  private syncToSupabase(table: string, operation: 'insert' | 'update' | 'upsert' | 'delete', data: any, id?: string) {
    if (!this.supabaseReady) return;
    (async () => {
      try {
        if (operation === 'insert') {
          await supabase.from(table).insert(data);
        } else if (operation === 'update' && id) {
          await supabase.from(table).update(data).eq('id', id);
        } else if (operation === 'upsert') {
          await supabase.from(table).upsert(data);
        } else if (operation === 'delete' && id) {
          await supabase.from(table).delete().eq('id', id);
        }
      } catch (err) {
        console.warn(`[Optra] Supabase sync failed for ${table}:`, err);
      }
    })();
  }

  private loadState() {
    if (typeof window === 'undefined') {
      this.seedInitial();
      return;
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.approvals = parsed.approvals || INITIAL_APPROVALS;
        this.tasks = parsed.tasks || INITIAL_TASKS;
        this.workflows = parsed.workflows || INITIAL_WORKFLOWS;
        this.incidents = parsed.incidents || INITIAL_INCIDENTS;
        this.risks = parsed.risks || INITIAL_RISKS;
        this.projects = parsed.projects || INITIAL_PROJECTS;
        this.documents = parsed.documents || INITIAL_DOCS;
        this.meetings = parsed.meetings || INITIAL_MEETINGS;
        this.notifications = parsed.notifications || INITIAL_NOTIFICATIONS;
        this.auditLogs = parsed.auditLogs || INITIAL_AUDIT_LOGS;
        this.integrations = parsed.integrations || INITIAL_INTEGRATIONS;
        this.activeUser = parsed.activeUser || DEFAULT_USERS[0];
        this.activeTenant = parsed.activeTenant || DEFAULT_TENANT;
      } else {
        this.seedInitial();
        this.saveState();
      }
    } catch (err) {
      console.warn('Error reading stored state, resetting to initial seed:', err);
      this.seedInitial();
    }
  }

  private seedInitial() {
    this.approvals = [...INITIAL_APPROVALS];
    this.tasks = [...INITIAL_TASKS];
    this.workflows = [...INITIAL_WORKFLOWS];
    this.incidents = [...INITIAL_INCIDENTS];
    this.risks = [...INITIAL_RISKS];
    this.projects = [...INITIAL_PROJECTS];
    this.documents = [...INITIAL_DOCS];
    this.meetings = [...INITIAL_MEETINGS];
    this.notifications = [...INITIAL_NOTIFICATIONS];
    this.auditLogs = [...INITIAL_AUDIT_LOGS];
    this.integrations = [...INITIAL_INTEGRATIONS];
    this.activeUser = DEFAULT_USERS[0];
    this.activeTenant = DEFAULT_TENANT;
  }

  private saveState() {
    if (typeof window === 'undefined') return;
    try {
      const payload = {
        approvals: this.approvals,
        tasks: this.tasks,
        workflows: this.workflows,
        incidents: this.incidents,
        risks: this.risks,
        projects: this.projects,
        documents: this.documents,
        meetings: this.meetings,
        notifications: this.notifications,
        auditLogs: this.auditLogs,
        integrations: this.integrations,
        activeUser: this.activeUser,
        activeTenant: this.activeTenant
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      this.broadcastChannel?.postMessage('sync_event');
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  }

  public subscribe(fn: () => void) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  // --- Auth & Tenant ---
  public getActiveUser(): UserProfile {
    return this.activeUser;
  }

  public setActiveUser(userId: string) {
    const user = DEFAULT_USERS.find((u) => u.id === userId) || DEFAULT_USERS.find((u) => u.email === userId);
    if (user) {
      this.activeUser = user;
      this.logAudit('USER_SWITCH', 'User', user.id, `Switched active session to ${user.full_name} (${user.role})`);
      this.saveState();
      this.notify();
    }
  }

  public getActiveTenant(): OrgTenant {
    return this.activeTenant;
  }

  public listUsers(): UserProfile[] {
    return DEFAULT_USERS;
  }

  // --- Approvals Module ---
  public listApprovals(): ApprovalItem[] {
    return [...this.approvals];
  }

  public getApproval(id: string): ApprovalItem | undefined {
    return this.approvals.find((a) => a.id === id);
  }

  public createApproval(item: Omit<ApprovalItem, 'id' | 'tenant_id' | 'created_at' | 'status'>): ApprovalItem {
    const newApproval: ApprovalItem = {
      ...item,
      id: `req-${Math.floor(1000 + Math.random() * 9000)}`,
      tenant_id: this.activeTenant.id,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    this.approvals.unshift(newApproval);
    this.syncToSupabase('approval_requests', 'insert', newApproval);
    this.createNotification(
      'New Approval Submitted',
      `Approval "${newApproval.subject}" ($${newApproval.amount.toLocaleString()}) submitted by ${newApproval.requester_name}`,
      'approval',
      '/approvals'
    );
    this.logAudit('APPROVAL_CREATED', 'Approval', newApproval.id, `Created approval request: ${newApproval.subject}`);
    this.saveState();
    this.notify();
    return newApproval;
  }

  public approveRequest(id: string, notes?: string): ApprovalItem | null {
    const approval = this.approvals.find((a) => a.id === id);
    if (!approval) return null;

    approval.status = 'approved';
    approval.approved_by = this.activeUser.full_name;
    approval.approved_at = new Date().toISOString();
    if (notes) approval.notes = notes;

    this.syncToSupabase('approval_requests', 'update', {
      status: approval.status,
      approved_by: approval.approved_by,
      approved_at: approval.approved_at,
      notes: approval.notes
    }, approval.id);

    // Cross-module update: Notify requester
    this.createNotification(
      'Approval Request Approved',
      `Your request "${approval.subject}" was approved by ${this.activeUser.full_name}.`,
      'approval',
      '/approvals'
    );

    // Cross-module update: Log audit trail
    this.logAudit('APPROVAL_APPROVED', 'Approval', approval.id, `Approved by ${this.activeUser.full_name}`);

    // If related tasks exist, advance them
    const matchingTask = this.tasks.find((t) => t.title.toLowerCase().includes(approval.category) || t.description?.includes(approval.id));
    if (matchingTask && matchingTask.status === 'todo') {
      matchingTask.status = 'in_progress';
      matchingTask.progress = 50;
      this.syncToSupabase('tasks', 'update', { status: matchingTask.status, progress: matchingTask.progress }, matchingTask.id);
    }

    this.saveState();
    this.notify();
    return approval;
  }

  public rejectRequest(id: string, reason: string): ApprovalItem | null {
    const approval = this.approvals.find((a) => a.id === id);
    if (!approval) return null;

    approval.status = 'rejected';
    approval.rejection_reason = reason;
    approval.approved_by = this.activeUser.full_name;
    approval.approved_at = new Date().toISOString();

    this.syncToSupabase('approval_requests', 'update', {
      status: approval.status,
      rejection_reason: approval.rejection_reason,
      approved_by: approval.approved_by,
      approved_at: approval.approved_at
    }, approval.id);

    this.createNotification(
      'Approval Request Rejected',
      `Your request "${approval.subject}" was rejected by ${this.activeUser.full_name}. Reason: ${reason}`,
      'approval',
      '/approvals'
    );

    this.logAudit('APPROVAL_REJECTED', 'Approval', approval.id, `Rejected by ${this.activeUser.full_name}. Reason: ${reason}`);

    this.saveState();
    this.notify();
    return approval;
  }

  public deleteApproval(id: string): boolean {
    const initialLen = this.approvals.length;
    this.approvals = this.approvals.filter((a) => a.id !== id);
    if (this.approvals.length !== initialLen) {
      this.syncToSupabase('approval_requests', 'delete', null, id);
      this.logAudit('APPROVAL_DELETED', 'Approval', id, 'Deleted approval record');
      this.saveState();
      this.notify();
      return true;
    }
    return false;
  }

  // --- Tasks Module ---
  public listTasks(): TaskItem[] {
    return [...this.tasks];
  }

  public createTask(item: {
    title: string;
    description?: string;
    project_name?: string;
    assignee_name?: string;
    priority: TaskItem['priority'];
    due_label?: string;
    tags?: string[];
  }): TaskItem {
    const newTask: TaskItem = {
      id: `tsk-${Date.now().toString().slice(-4)}`,
      tenant_id: this.activeTenant.id,
      title: item.title,
      description: item.description,
      project_name: item.project_name || 'General Operations',
      assignee_name: item.assignee_name || this.activeUser.full_name,
      priority: item.priority || 'medium',
      status: 'todo',
      due_at: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
      due_label: item.due_label || 'In 2 days',
      progress: 0,
      tags: item.tags || ['ops'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.tasks.unshift(newTask);
    this.syncToSupabase('tasks', 'insert', newTask);
    this.createNotification(
      'New Task Created',
      `Task "${newTask.title}" assigned to ${newTask.assignee_name}`,
      'task',
      '/tasks'
    );
    this.logAudit('TASK_CREATED', 'Task', newTask.id, `Created task: ${newTask.title}`);
    this.saveState();
    this.notify();
    return newTask;
  }

  public updateTaskStatus(id: string, newStatus: TaskItem['status']): TaskItem | null {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return null;

    task.status = newStatus;
    if (newStatus === 'done') {
      task.progress = 100;
    } else if (newStatus === 'in_progress' && task.progress === 0) {
      task.progress = 35;
    }
    task.updated_at = new Date().toISOString();

    // Cross-module update: Check linked project
    if (task.project_name) {
      const proj = this.projects.find((p) => p.name === task.project_name);
      if (proj && newStatus === 'done') {
        proj.milestones_completed = Math.min(proj.milestones_total, proj.milestones_completed + 1);
        if (proj.milestones_completed === proj.milestones_total) {
          proj.status = 'completed';
        }
        this.syncToSupabase('projects', 'update', proj, proj.id);
      }
    }

    this.syncToSupabase('tasks', 'update', { status: task.status, progress: task.progress, updated_at: task.updated_at }, task.id);
    this.logAudit('TASK_STATUS_UPDATED', 'Task', task.id, `Status updated to ${newStatus}`);
    this.saveState();
    this.notify();
    return task;
  }

  public updateTaskPriority(id: string, newPriority: TaskItem['priority']): TaskItem | null {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return null;
    task.priority = newPriority;
    task.updated_at = new Date().toISOString();
    this.syncToSupabase('tasks', 'update', { priority: task.priority, updated_at: task.updated_at }, task.id);
    this.logAudit('TASK_PRIORITY_UPDATED', 'Task', task.id, `Priority set to ${newPriority}`);
    this.saveState();
    this.notify();
    return task;
  }

  public deleteTask(id: string): boolean {
    const initialLen = this.tasks.length;
    this.tasks = this.tasks.filter((t) => t.id !== id);
    if (this.tasks.length !== initialLen) {
      this.syncToSupabase('tasks', 'delete', null, id);
      this.logAudit('TASK_DELETED', 'Task', id, 'Deleted task');
      this.saveState();
      this.notify();
      return true;
    }
    return false;
  }

  // --- Workflows Module ---
  public listWorkflows(): WorkflowItem[] {
    return [...this.workflows];
  }

  public getWorkflow(id: string): WorkflowItem | undefined {
    return this.workflows.find((w) => w.id === id);
  }

  public createWorkflow(item: {
    name: string;
    description?: string;
    category?: string;
    sla_minutes?: number;
    nodes?: Array<{ id: string; kind: string; label: string; desc?: string }>;
  }): WorkflowItem {
    const newWf: WorkflowItem = {
      id: `wf-${Date.now().toString().slice(-4)}`,
      tenant_id: this.activeTenant.id,
      name: item.name,
      description: item.description || 'Custom automated workflow process',
      version: 1,
      status: 'published',
      category: item.category || 'Operations',
      nodes_count: item.nodes ? item.nodes.length : 4,
      sla_minutes: item.sla_minutes || 1440,
      runs_this_month: 1,
      last_run: 'Just now',
      definition: {
        nodes: item.nodes || [
          { id: 'n1', kind: 'start', label: 'Trigger Event Initiated' },
          { id: 'n2', kind: 'approval', label: 'Manager Signoff' },
          { id: 'n3', kind: 'task', label: 'Action Fulfillment' },
          { id: 'n4', kind: 'end', label: 'Completed' }
        ]
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.workflows.unshift(newWf);
    this.syncToSupabase('workflows', 'insert', newWf);
    this.createNotification(
      'New Workflow Published',
      `Workflow "${newWf.name}" was published and is active.`,
      'system',
      `/workflows`
    );
    this.logAudit('WORKFLOW_CREATED', 'Workflow', newWf.id, `Created & published workflow: ${newWf.name}`);
    this.saveState();
    this.notify();
    return newWf;
  }

  public updateWorkflow(id: string, updates: Partial<WorkflowItem>): WorkflowItem | null {
    const wf = this.workflows.find((w) => w.id === id);
    if (!wf) return null;

    Object.assign(wf, updates);
    wf.updated_at = new Date().toISOString();
    this.syncToSupabase('workflows', 'update', wf, wf.id);
    this.logAudit('WORKFLOW_UPDATED', 'Workflow', wf.id, `Updated workflow ${wf.name} (v${wf.version})`);
    this.saveState();
    this.notify();
    return wf;
  }

  public executeWorkflow(id: string): { success: boolean; message: string; run_id: string } {
    const wf = this.workflows.find((w) => w.id === id);
    if (!wf) return { success: false, message: 'Workflow not found', run_id: '' };

    wf.runs_this_month += 1;
    wf.last_run = 'Just now';

    const runId = `run-${Math.floor(100000 + Math.random() * 900000)}`;

    // Cross-module update: Auto-create linked task & notification
    this.createTask({
      title: `[Run: ${wf.name}] Execute automated task step`,
      description: `Auto-generated from workflow execution ${runId}`,
      project_name: 'Workflow Runs',
      priority: 'high'
    });

    this.createNotification(
      'Workflow Executed',
      `Workflow "${wf.name}" triggered execution run #${runId}.`,
      'system',
      `/workflows`
    );

    this.syncToSupabase('workflows', 'update', { runs_this_month: wf.runs_this_month, last_run: wf.last_run }, wf.id);
    this.logAudit('WORKFLOW_EXECUTED', 'Workflow', wf.id, `Executed run ${runId}`);
    this.saveState();
    this.notify();

    return {
      success: true,
      message: `Workflow "${wf.name}" executed successfully across all ${wf.nodes_count} nodes.`,
      run_id: runId
    };
  }

  // --- Incidents Module ---
  public listIncidents(): IncidentItem[] {
    return [...this.incidents];
  }

  public createIncident(item: {
    title: string;
    description?: string;
    severity: IncidentItem['severity'];
    assignee_name?: string;
  }): IncidentItem {
    const newInc: IncidentItem = {
      id: `inc-${Math.floor(200 + Math.random() * 800)}`,
      tenant_id: this.activeTenant.id,
      title: item.title,
      description: item.description || '',
      severity: item.severity,
      status: 'open',
      reporter_name: this.activeUser.full_name,
      assignee_name: item.assignee_name || 'Sara Connor',
      sla_countdown: item.severity === 'sev1' ? '15 min left' : '2 hours left',
      capas_count: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.incidents.unshift(newInc);
    this.syncToSupabase('incidents', 'insert', newInc);

    // Cross-module alert
    this.createNotification(
      `🚨 ${newInc.severity.toUpperCase()} Incident Declared`,
      newInc.title,
      'incident',
      '/incidents'
    );

    // Cross-module risk signal
    if (newInc.severity === 'sev1' || newInc.severity === 'sev2') {
      const riskItem: RiskSignalItem = {
        id: `risk-inc-${newInc.id}`,
        tenant_id: this.activeTenant.id,
        source: 'incident',
        entity_id: newInc.id,
        score: newInc.severity === 'sev1' ? 0.95 : 0.75,
        severity: newInc.severity === 'sev1' ? 'critical' : 'high',
        rationale: `Active ${newInc.severity.toUpperCase()} incident: "${newInc.title}" requires immediate mitigation.`,
        recommendations: [
          'Page lead engineer on-call',
          'Deploy hotfix and trigger failover'
        ],
        status: 'active',
        detected_at: 'Just now'
      };
      this.risks.unshift(riskItem);
      this.syncToSupabase('risk_signals', 'upsert', riskItem);
    }

    this.logAudit('INCIDENT_DECLARED', 'Incident', newInc.id, `Declared ${newInc.severity.toUpperCase()}: ${newInc.title}`);
    this.saveState();
    this.notify();
    return newInc;
  }

  public updateIncidentStatus(id: string, status: IncidentItem['status']): IncidentItem | null {
    const inc = this.incidents.find((i) => i.id === id);
    if (!inc) return null;

    inc.status = status;
    inc.updated_at = new Date().toISOString();

    if (status === 'resolved') {
      inc.sla_countdown = 'Resolved';
      // Mark linked risk as mitigated
      const linkedRisk = this.risks.find((r) => r.entity_id === inc.id);
      if (linkedRisk) {
        linkedRisk.status = 'mitigated';
        this.syncToSupabase('risk_signals', 'update', { status: 'mitigated' }, linkedRisk.id);
      }
    }

    this.syncToSupabase('incidents', 'update', { status: inc.status, sla_countdown: inc.sla_countdown, updated_at: inc.updated_at }, inc.id);
    this.logAudit('INCIDENT_STATUS_UPDATED', 'Incident', inc.id, `Incident status changed to ${status}`);
    this.saveState();
    this.notify();
    return inc;
  }

  // --- Risks Module ---
  public listRisks(): RiskSignalItem[] {
    return [...this.risks];
  }

  public runRiskScan(): { detected: number; high_risks: number } {
    // Dynamically calculate risk signals from current state
    const openSev1 = this.incidents.filter((i) => i.status !== 'resolved' && (i.severity === 'sev1' || i.severity === 'sev2')).length;
    const delayedTasks = this.tasks.filter((t) => t.status === 'blocked').length;
    const pendingHighApprovals = this.approvals.filter((a) => a.status === 'pending' && a.amount > 10000).length;

    const newScanRisks: RiskSignalItem[] = [
      {
        id: `risk-${Date.now()}-1`,
        tenant_id: this.activeTenant.id,
        source: 'workflow',
        entity_id: 'wf-vendor-onboarding',
        score: openSev1 > 0 ? 0.88 : 0.65,
        severity: openSev1 > 0 ? 'critical' : 'high',
        rationale: `AI Realtime Engine detected ${pendingHighApprovals} high-value approvals pending and ${delayedTasks} blocked operational tasks.`,
        recommendations: [
          'Reassign approvers for items exceeding 4h SLA',
          'Automate routine low-risk approval gates'
        ],
        status: 'active',
        detected_at: 'Just now'
      },
      ...this.risks.slice(0, 3)
    ];

    this.risks = newScanRisks;
    newScanRisks.forEach((r) => this.syncToSupabase('risk_signals', 'upsert', r));
    this.logAudit('RISK_SCAN_COMPLETED', 'RiskSignal', 'all', 'Executed AI operational risk scan across tenant');
    this.saveState();
    this.notify();

    return {
      detected: this.risks.length,
      high_risks: this.risks.filter((r) => r.severity === 'critical' || r.severity === 'high').length
    };
  }

  public resolveRisk(id: string) {
    const r = this.risks.find((item) => item.id === id);
    if (r) {
      r.status = 'mitigated';
      this.syncToSupabase('risk_signals', 'update', { status: 'mitigated' }, r.id);
      this.logAudit('RISK_MITIGATED', 'RiskSignal', r.id, `Mitigated operational risk signal`);
      this.saveState();
      this.notify();
    }
  }

  // --- Projects Module ---
  public listProjects(): ProjectItem[] {
    return [...this.projects];
  }

  public createProject(item: {
    name: string;
    manager: string;
    department: string;
    budget: number;
    due_date: string;
    description?: string;
  }): ProjectItem {
    const newProj: ProjectItem = {
      id: `proj-${Date.now().toString().slice(-4)}`,
      tenant_id: this.activeTenant.id,
      name: item.name,
      manager: item.manager || this.activeUser.full_name,
      department: item.department || 'Operations',
      budget: item.budget || 25000,
      actual_spend: 0,
      status: 'active',
      milestones_total: 4,
      milestones_completed: 0,
      due_date: item.due_date || 'Dec 31, 2026',
      description: item.description || '',
      created_at: new Date().toISOString()
    };

    this.projects.unshift(newProj);
    this.syncToSupabase('projects', 'insert', newProj);
    this.logAudit('PROJECT_CREATED', 'Project', newProj.id, `Created project: ${newProj.name}`);
    this.saveState();
    this.notify();
    return newProj;
  }

  // --- Documents Module ---
  public listDocuments(): DocumentItem[] {
    return [...this.documents];
  }

  public createDocument(item: {
    title: string;
    kind: DocumentItem['kind'];
    tags: string[];
    summary: string;
  }): DocumentItem {
    const newDoc: DocumentItem = {
      id: `doc-${Date.now().toString().slice(-4)}`,
      tenant_id: this.activeTenant.id,
      title: item.title,
      kind: item.kind,
      version: 1,
      owner_name: this.activeUser.full_name,
      tags: item.tags.length > 0 ? item.tags : ['general'],
      summary: item.summary,
      updated_at: 'Just now',
      created_at: new Date().toISOString()
    };

    this.documents.unshift(newDoc);
    this.syncToSupabase('documents', 'insert', newDoc);
    this.createNotification(
      'Document Uploaded',
      `New document "${newDoc.title}" indexed for hybrid RAG search.`,
      'system',
      '/documents'
    );
    this.logAudit('DOCUMENT_UPLOADED', 'Document', newDoc.id, `Uploaded ${newDoc.kind.toUpperCase()}: ${newDoc.title}`);
    this.saveState();
    this.notify();
    return newDoc;
  }

  public deleteDocument(id: string): boolean {
    const initialLen = this.documents.length;
    this.documents = this.documents.filter((d) => d.id !== id);
    if (this.documents.length !== initialLen) {
      this.syncToSupabase('documents', 'delete', null, id);
      this.logAudit('DOCUMENT_DELETED', 'Document', id, 'Deleted document');
      this.saveState();
      this.notify();
      return true;
    }
    return false;
  }

  // --- Meetings Module ---
  public listMeetings(): MeetingItem[] {
    return [...this.meetings];
  }

  public createMeeting(item: {
    title: string;
    department: string;
    scheduled_at: string;
    participants: string[];
    summary: string;
    action_items?: Array<{ title: string; assignee: string; due_date: string }>;
  }): MeetingItem {
    const newMtg: MeetingItem = {
      id: `mtg-${Date.now().toString().slice(-4)}`,
      tenant_id: this.activeTenant.id,
      title: item.title,
      organizer: this.activeUser.full_name,
      department: item.department || 'Operations',
      scheduled_at: item.scheduled_at,
      duration_minutes: 45,
      participants: item.participants,
      summary: item.summary,
      action_items: (item.action_items || []).map((ai, idx) => ({
        id: `act-${Date.now()}-${idx}`,
        title: ai.title,
        assignee: ai.assignee,
        due_date: ai.due_date,
        status: 'pending'
      })),
      created_at: new Date().toISOString()
    };

    this.meetings.unshift(newMtg);
    this.syncToSupabase('meetings', 'insert', newMtg);
    this.logAudit('MEETING_CREATED', 'Meeting', newMtg.id, `Created meeting: ${newMtg.title}`);
    this.saveState();
    this.notify();
    return newMtg;
  }

  public convertActionItemToTask(meetingId: string, actionItemId: string): TaskItem | null {
    const mtg = this.meetings.find((m) => m.id === meetingId);
    if (!mtg) return null;

    const actionItem = mtg.action_items.find((ai) => ai.id === actionItemId);
    if (!actionItem) return null;

    const createdTask = this.createTask({
      title: actionItem.title,
      description: `Extracted action item from meeting "${mtg.title}"`,
      assignee_name: actionItem.assignee,
      project_name: `${mtg.department} Action Items`,
      priority: 'high',
      due_label: actionItem.due_date,
      tags: ['meeting', 'action-item']
    });

    actionItem.status = 'converted_to_task';
    actionItem.task_id = createdTask.id;
    this.syncToSupabase('meetings', 'update', { action_items: mtg.action_items }, mtg.id);
    this.saveState();
    this.notify();
    return createdTask;
  }

  // --- Notifications Module ---
  public listNotifications(): NotificationItem[] {
    return [...this.notifications];
  }

  public createNotification(title: string, message: string, type: NotificationItem['type'] = 'info', link?: string): NotificationItem {
    const notif: NotificationItem = {
      id: `notif-${Date.now().toString().slice(-5)}`,
      tenant_id: this.activeTenant.id,
      user_id: this.activeUser.id,
      title,
      message,
      type,
      read: false,
      link,
      created_at: new Date().toISOString()
    };
    this.notifications.unshift(notif);
    this.syncToSupabase('notifications', 'insert', notif);
    this.saveState();
    this.notify();
    return notif;
  }

  public markNotificationAsRead(id: string) {
    const n = this.notifications.find((item) => item.id === id);
    if (n) {
      n.read = true;
      this.syncToSupabase('notifications', 'update', { read: true }, id);
      this.saveState();
      this.notify();
    }
  }

  public markAllNotificationsAsRead() {
    this.notifications.forEach((n) => {
      n.read = true;
      this.syncToSupabase('notifications', 'update', { read: true }, n.id);
    });
    this.saveState();
    this.notify();
  }

  // --- Audit Logs ---
  public listAuditLogs(): AuditLogItem[] {
    return [...this.auditLogs];
  }

  public logAudit(action: string, entity_type: string, entity_id: string, details: string) {
    const log: AuditLogItem = {
      id: `aud-${Date.now().toString().slice(-6)}`,
      tenant_id: this.activeTenant.id,
      user_name: this.activeUser.full_name,
      user_role: this.activeUser.role,
      action,
      entity_type,
      entity_id,
      details,
      timestamp: new Date().toISOString()
    };
    this.auditLogs.unshift(log);
    if (this.auditLogs.length > 200) {
      this.auditLogs = this.auditLogs.slice(0, 200);
    }
    this.syncToSupabase('audit_logs', 'insert', log);
  }

  // --- Integrations ---
  public listIntegrations(): IntegrationItem[] {
    return [...this.integrations];
  }

  // --- Real-time Calculated KPIs ---
  public getCalculatedKPIs() {
    const totalApprovals = this.approvals.length;
    const approvedCount = this.approvals.filter((a) => a.status === 'approved').length;
    const pendingApprovalsCount = this.approvals.filter((a) => a.status === 'pending').length;

    const totalTasks = this.tasks.length;
    const doneTasks = this.tasks.filter((t) => t.status === 'done').length;
    const taskCompletionRate = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 100;

    const activeWorkflowsCount = this.workflows.filter((w) => w.status === 'published').length;
    const openIncidentsCount = this.incidents.filter((i) => i.status !== 'resolved').length;
    const criticalRisksCount = this.risks.filter((r) => r.severity === 'critical' || r.severity === 'high').length;

    return {
      sla_compliance: openIncidentsCount === 0 ? '98.4%' : `${Math.max(88, 98 - openIncidentsCount * 3)}%`,
      sla_trend: '+1.8%',
      task_completion_rate: `${taskCompletionRate}%`,
      active_workflows: activeWorkflowsCount,
      pending_approvals: pendingApprovalsCount,
      open_incidents: openIncidentsCount,
      operational_risks: criticalRisksCount,
      total_spend: `$${this.projects.reduce((acc, p) => acc + p.actual_spend, 0).toLocaleString()}`,
      budget_total: `$${this.projects.reduce((acc, p) => acc + p.budget, 0).toLocaleString()}`
    };
  }

  // --- Global Search (⌘K) ---
  public globalSearch(query: string) {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const results: Array<{ id: string; title: string; category: string; href: string; detail: string }> = [];

    // Search Workflows
    this.workflows.forEach((wf) => {
      if (wf.name.toLowerCase().includes(q) || wf.category.toLowerCase().includes(q)) {
        results.push({
          id: wf.id,
          title: wf.name,
          category: 'Workflow',
          href: `/workflows`,
          detail: `${wf.category} • ${wf.nodes_count} nodes • v${wf.version}`
        });
      }
    });

    // Search Tasks
    this.tasks.forEach((task) => {
      if (task.title.toLowerCase().includes(q) || task.tags.some((t) => t.toLowerCase().includes(q))) {
        results.push({
          id: task.id,
          title: task.title,
          category: 'Task',
          href: `/tasks`,
          detail: `Priority: ${task.priority} • Status: ${task.status.replace('_', ' ')} • Assignee: ${task.assignee_name}`
        });
      }
    });

    // Search Approvals
    this.approvals.forEach((appr) => {
      if (appr.subject.toLowerCase().includes(q) || appr.requester_name.toLowerCase().includes(q)) {
        results.push({
          id: appr.id,
          title: appr.subject,
          category: 'Approval',
          href: `/approvals`,
          detail: `$${appr.amount.toLocaleString()} • Requester: ${appr.requester_name} • ${appr.status}`
        });
      }
    });

    // Search Projects
    this.projects.forEach((proj) => {
      if (proj.name.toLowerCase().includes(q) || proj.manager.toLowerCase().includes(q)) {
        results.push({
          id: proj.id,
          title: proj.name,
          category: 'Project',
          href: `/projects`,
          detail: `${proj.department} • Budget: $${proj.budget.toLocaleString()} • Status: ${proj.status}`
        });
      }
    });

    // Search Documents
    this.documents.forEach((doc) => {
      if (doc.title.toLowerCase().includes(q) || doc.summary.toLowerCase().includes(q) || doc.tags.some((t) => t.toLowerCase().includes(q))) {
        results.push({
          id: doc.id,
          title: doc.title,
          category: 'Document',
          href: `/documents`,
          detail: `${doc.kind.toUpperCase()} • Owner: ${doc.owner_name} • v${doc.version}`
        });
      }
    });

    // Search Incidents
    this.incidents.forEach((inc) => {
      if (inc.title.toLowerCase().includes(q) || inc.description?.toLowerCase().includes(q)) {
        results.push({
          id: inc.id,
          title: inc.title,
          category: 'Incident',
          href: `/incidents`,
          detail: `${inc.severity.toUpperCase()} • Status: ${inc.status} • Assignee: ${inc.assignee_name}`
        });
      }
    });

    return results;
  }

  // --- AI Operations Copilot Integration ---
  public executeCopilotTool(toolName: string, params: Record<string, any>): any {
    switch (toolName) {
      case 'list_approvals':
        return this.approvals.filter((a) => (!params.status || a.status === params.status));
      case 'list_tasks':
        return this.tasks.filter((t) => (!params.priority || t.priority === params.priority) && (!params.status || t.status === params.status));
      case 'list_incidents':
        return this.incidents.filter((i) => (!params.status || i.status === params.status));
      case 'list_risks':
        return this.risks.filter((r) => r.status === 'active');
      case 'list_projects':
        return this.projects;
      case 'get_kpis':
        return this.getCalculatedKPIs();
      case 'approve_request':
        if (params.id) {
          return this.approveRequest(params.id, params.notes);
        }
        return { error: 'Missing approval ID' };
      case 'create_task':
        return this.createTask({
          title: params.title || 'AI Generated Action Item',
          description: params.description,
          priority: params.priority || 'medium',
          assignee_name: params.assignee_name || this.activeUser.full_name
        });
      default:
        return { message: `Executed tool ${toolName}` };
    }
  }

  public askCopilot(query: string): { response: string; toolCall?: { name: string; input: any; result: any } } {
    const q = query.toLowerCase().trim();

    if (q.includes('approval') || q.includes('pending') || q.includes('/approvals')) {
      const pending = this.approvals.filter((a) => a.status === 'pending');
      return {
        response: `Found **${pending.length} pending approval requests** requiring action. The highest amount is **$${Math.max(...pending.map((p) => p.amount), 0).toLocaleString()}** for "${pending[0]?.subject || 'N/A'}".`,
        toolCall: {
          name: 'list_approvals',
          input: { status: 'pending' },
          result: pending.map((p) => ({
            id: p.id,
            subject: p.subject,
            amount: `$${p.amount.toLocaleString()}`,
            requester: p.requester_name,
            risk: p.risk_badge
          }))
        }
      };
    }

    if (q.includes('task') || q.includes('due') || q.includes('/tasks')) {
      const activeTasks = this.tasks.filter((t) => t.status !== 'done');
      return {
        response: `You have **${activeTasks.length} active tasks** in the pipeline. **${this.tasks.filter((t) => t.priority === 'critical' || t.priority === 'high').length} are marked High/Critical Priority**.`,
        toolCall: {
          name: 'list_tasks',
          input: { status: 'active' },
          result: activeTasks.slice(0, 5).map((t) => ({
            id: t.id,
            title: t.title,
            priority: t.priority,
            assignee: t.assignee_name,
            due: t.due_label
          }))
        }
      };
    }

    if (q.includes('incident') || q.includes('outage') || q.includes('/incidents')) {
      const activeIncidents = this.incidents.filter((i) => i.status !== 'resolved');
      return {
        response: `There are currently **${activeIncidents.length} active operational incidents**. The most urgent is **${activeIncidents[0]?.title || 'None'}** (${activeIncidents[0]?.severity.toUpperCase()}).`,
        toolCall: {
          name: 'list_incidents',
          input: { status: 'open' },
          result: activeIncidents.map((i) => ({
            id: i.id,
            title: i.title,
            severity: i.severity,
            assignee: i.assignee_name,
            sla: i.sla_countdown
          }))
        }
      };
    }

    if (q.includes('risk') || q.includes('sla') || q.includes('/risks')) {
      const activeRisks = this.risks.filter((r) => r.status === 'active');
      return {
        response: `The Operations Copilot Risk Engine identified **${activeRisks.length} active risk signals**. Critical risk detected on **${activeRisks[0]?.rationale || 'Workflow bottleneck'}**.`,
        toolCall: {
          name: 'list_risks',
          input: {},
          result: activeRisks.map((r) => ({
            id: r.id,
            source: r.source,
            severity: r.severity,
            rationale: r.rationale,
            recommendations: r.recommendations
          }))
        }
      };
    }

    if (q.includes('report') || q.includes('kpi') || q.includes('summary')) {
      const kpis = this.getCalculatedKPIs();
      return {
        response: `### 📊 Daily Executive Operations Report\n\n- **SLA Compliance Rate**: ${kpis.sla_compliance} (Target: 95%)\n- **Active Workflows**: ${kpis.active_workflows}\n- **Pending Approvals**: ${kpis.pending_approvals}\n- **Task Completion Rate**: ${kpis.task_completion_rate}\n- **Open Incidents**: ${kpis.open_incidents}\n- **Total Project Spend**: ${kpis.total_spend} / ${kpis.budget_total}\n\n*All systems operating within acceptable operational bounds.*`,
        toolCall: {
          name: 'get_kpis',
          input: {},
          result: kpis
        }
      };
    }

    // Default intelligent assistant reply
    return {
      response: `I analyzed your query across all operational tables (Workflows, Tasks, Approvals, Risks, Incidents, and SOPs). All systems and data pipelines are fully synchronized in realtime.`
    };
  }
}

export const dataStore = new DataStore();
