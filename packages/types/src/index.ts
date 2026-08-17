import { z } from 'zod';

// Roles
export const UserRoleSchema = z.enum([
  'super_admin',
  'company_admin',
  'coo',
  'operations_manager',
  'department_manager',
  'team_lead',
  'employee',
  'auditor',
  'compliance_officer',
  'viewer'
]);
export type UserRole = z.infer<typeof UserRoleSchema>;

// Tenant
export const TenantSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().min(1),
  status: z.enum(['active', 'suspended', 'trial', 'churned']),
  plan: z.enum(['starter', 'growth', 'enterprise']),
  settings: z.record(z.any()).default({}),
  created_at: z.string(),
  updated_at: z.string()
});
export type Tenant = z.infer<typeof TenantSchema>;

// User
export const UserSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  email: z.string().email(),
  full_name: z.string().min(1),
  avatar_url: z.string().nullable().optional(),
  status: z.enum(['invited', 'active', 'disabled', 'locked']),
  mfa_enabled: z.boolean().default(false),
  locale: z.string().default('en-US'),
  timezone: z.string().default('UTC'),
  role: UserRoleSchema.default('employee'),
  department_name: z.string().optional(),
  created_at: z.string()
});
export type User = z.infer<typeof UserSchema>;

// Auth
export const LoginInputSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  tenant_slug: z.string().optional(),
  remember_me: z.boolean().optional()
});
export type LoginInput = z.infer<typeof LoginInputSchema>;

export const RegisterInputSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  company_name: z.string().min(2, 'Company name is required'),
  subdomain: z.string().min(2, 'Subdomain is required'),
  plan: z.enum(['starter', 'growth', 'enterprise']).default('starter'),
  terms: z.boolean().refine((val) => val === true, 'You must accept the terms')
});
export type RegisterInput = z.infer<typeof RegisterInputSchema>;

// Workflow Nodes
export const WorkflowNodeKindSchema = z.enum([
  'start',
  'end',
  'task',
  'approval',
  'branch',
  'parallel',
  'merge',
  'wait',
  'webhook',
  'ai_prompt',
  'script',
  'subworkflow',
  'notification',
  'erp_call',
  'delay'
]);
export type WorkflowNodeKind = z.infer<typeof WorkflowNodeKindSchema>;

export const WorkflowNodeSchema = z.object({
  id: z.string(),
  kind: WorkflowNodeKindSchema,
  label: z.string().optional(),
  title: z.string().optional(),
  assignee: z.object({ type: z.string(), key: z.string() }).optional(),
  policy: z.string().optional(),
  threshold: z.record(z.any()).optional(),
  system_prompt: z.string().optional(),
  model: z.string().optional(),
  input: z.any().optional(),
  output_schema: z.any().optional(),
  sla: z.object({ minutes: z.number(), warn_pct: z.number().optional() }).optional(),
  channels: z.array(z.string()).optional(),
  template: z.string().optional(),
  next: z.union([z.string(), z.array(z.string())]).optional(),
  out: z.array(z.string()).optional()
});
export type WorkflowNode = z.infer<typeof WorkflowNodeSchema>;

export const WorkflowSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().nullable().optional(),
  version: z.number().default(1),
  status: z.enum(['draft', 'published', 'archived', 'disabled']).default('draft'),
  trigger_event: z.string().nullable().optional(),
  definition: z.object({
    key: z.string(),
    version: z.number(),
    nodes: z.array(z.any())
  }),
  sla_minutes: z.number().nullable().optional(),
  created_by: z.string().uuid().optional(),
  created_at: z.string(),
  updated_at: z.string()
});
export type Workflow = z.infer<typeof WorkflowSchema>;

// Tasks & Work
export const TaskPrioritySchema = z.enum(['low', 'medium', 'high', 'critical']);
export type TaskPriority = z.infer<typeof TaskPrioritySchema>;

export const TaskStatusSchema = z.enum(['todo', 'in_progress', 'blocked', 'review', 'done', 'cancelled']);
export type TaskStatus = z.infer<typeof TaskStatusSchema>;

export const TaskSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  project_id: z.string().uuid().nullable().optional(),
  milestone_id: z.string().uuid().nullable().optional(),
  parent_task_id: z.string().uuid().nullable().optional(),
  title: z.string().min(1),
  description: z.string().nullable().optional(),
  priority: TaskPrioritySchema.default('medium'),
  status: TaskStatusSchema.default('todo'),
  assignee_id: z.string().uuid().nullable().optional(),
  assignee_name: z.string().optional(),
  reporter_id: z.string().uuid().optional(),
  due_at: z.string().nullable().optional(),
  started_at: z.string().nullable().optional(),
  finished_at: z.string().nullable().optional(),
  estimate_minutes: z.number().nullable().optional(),
  actual_minutes: z.number().nullable().optional(),
  tags: z.array(z.string()).default([]),
  created_at: z.string(),
  updated_at: z.string()
});
export type Task = z.infer<typeof TaskSchema>;

// Approval Requests
export const ApprovalStatusSchema = z.enum(['pending', 'approved', 'rejected', 'cancelled', 'expired']);
export type ApprovalStatus = z.infer<typeof ApprovalStatusSchema>;

export const ApprovalRequestSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  policy_id: z.string().uuid().optional(),
  policy_name: z.string().optional(),
  subject: z.string().min(1),
  payload: z.record(z.any()).default({}),
  amount: z.number().nullable().optional(),
  currency: z.string().default('USD'),
  status: ApprovalStatusSchema.default('pending'),
  requester_id: z.string().uuid(),
  requester_name: z.string().optional(),
  sla_due_at: z.string().nullable().optional(),
  created_at: z.string()
});
export type ApprovalRequest = z.infer<typeof ApprovalRequestSchema>;

// Incidents
export const IncidentSeveritySchema = z.enum(['sev1', 'sev2', 'sev3', 'sev4']);
export type IncidentSeverity = z.infer<typeof IncidentSeveritySchema>;

export const IncidentStatusSchema = z.enum(['open', 'investigating', 'mitigated', 'resolved', 'closed']);
export type IncidentStatus = z.infer<typeof IncidentStatusSchema>;

export const IncidentSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().nullable().optional(),
  severity: IncidentSeveritySchema,
  status: IncidentStatusSchema.default('open'),
  reporter_id: z.string().uuid(),
  reporter_name: z.string().optional(),
  assignee_id: z.string().uuid().nullable().optional(),
  assignee_name: z.string().optional(),
  sla_due_at: z.string().nullable().optional(),
  created_at: z.string()
});
export type Incident = z.infer<typeof IncidentSchema>;

// Documents & SOPs
export const DocumentSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  folder_id: z.string().uuid().nullable().optional(),
  kind: z.enum(['sop', 'policy', 'contract', 'template', 'other']).default('other'),
  title: z.string().min(1),
  description: z.string().nullable().optional(),
  mime_type: z.string().optional(),
  version: z.number().default(1),
  owner_id: z.string().uuid().optional(),
  owner_name: z.string().optional(),
  tags: z.array(z.string()).default([]),
  created_at: z.string(),
  updated_at: z.string()
});
export type Document = z.infer<typeof DocumentSchema>;

// KPIs
export const KPISchema = z.object({
  id: z.string().uuid(),
  key: z.string(),
  name: z.string(),
  unit: z.string().optional(),
  target: z.number(),
  current_value: z.number(),
  warn_below: z.number().optional(),
  critical_below: z.number().optional(),
  trend: z.enum(['up', 'down', 'flat']).default('up'),
  cadence: z.enum(['hourly', 'daily', 'weekly', 'monthly']).default('hourly')
});
export type KPI = z.infer<typeof KPISchema>;

// Risk Signals
export const RiskSignalSchema = z.object({
  id: z.string().uuid(),
  source: z.enum(['workflow', 'sla', 'incident', 'workload', 'compliance', 'vendor']),
  entity_id: z.string().uuid(),
  score: z.number(), // 0..1
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  rationale: z.string(),
  recommendations: z.array(z.string()).default([]),
  detected_at: z.string()
});
export type RiskSignal = z.infer<typeof RiskSignalSchema>;

// Notifications
export const NotificationSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  user_id: z.string().uuid(),
  kind: z.string(),
  subject: z.string(),
  body: z.string().optional(),
  link: z.string().optional(),
  read_at: z.string().nullable().optional(),
  created_at: z.string()
});
export type Notification = z.infer<typeof NotificationSchema>;
