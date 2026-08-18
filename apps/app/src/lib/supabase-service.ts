/**
 * Supabase Backend Service
 * 
 * This module wraps Supabase CRUD operations.
 * The dataStore uses this for all persistent operations.
 * localStorage is used only as a UI cache/fallback.
 * 
 * Architecture:
 *   Supabase/PostgreSQL (source of truth)
 *     ↓
 *   supabaseService (this file)
 *     ↓
 *   dataStore (reactive in-memory cache + UI)
 *     ↓
 *   Components
 */

import { supabase } from './supabase';

// Check if Supabase is configured and reachable
let _supabaseAvailable: boolean | null = null;

export async function checkSupabaseAvailability(): Promise<boolean> {
  if (_supabaseAvailable !== null) return _supabaseAvailable;
  try {
    const { error } = await supabase.from('tasks').select('id').limit(1);
    // If the table doesn't exist we get an error but Supabase itself is reachable
    _supabaseAvailable = !error || error.code !== 'PGRST301';
    if (error && error.code === 'PGRST116') _supabaseAvailable = true; // No rows = table exists
    return _supabaseAvailable;
  } catch {
    _supabaseAvailable = false;
    return false;
  }
}

// ─── Tasks ───────────────────────────────────────────────────────────────────

export async function dbFetchTasks(tenantId: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function dbCreateTask(task: Record<string, any>) {
  const { data, error } = await supabase
    .from('tasks')
    .insert(task)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function dbUpdateTask(id: string, updates: Record<string, any>) {
  const { data, error } = await supabase
    .from('tasks')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function dbDeleteTask(id: string) {
  const { error } = await supabase.from('tasks').delete().eq('id', id);
  if (error) throw error;
}

// ─── Approvals ───────────────────────────────────────────────────────────────

export async function dbFetchApprovals(tenantId: string) {
  const { data, error } = await supabase
    .from('approval_requests')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function dbCreateApproval(approval: Record<string, any>) {
  const { data, error } = await supabase
    .from('approval_requests')
    .insert(approval)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function dbUpdateApproval(id: string, updates: Record<string, any>) {
  const { data, error } = await supabase
    .from('approval_requests')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ─── Workflows ────────────────────────────────────────────────────────────────

export async function dbFetchWorkflows(tenantId: string) {
  const { data, error } = await supabase
    .from('workflows')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function dbUpsertWorkflow(workflow: Record<string, any>) {
  const { data, error } = await supabase
    .from('workflows')
    .upsert(workflow)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ─── Incidents ────────────────────────────────────────────────────────────────

export async function dbFetchIncidents(tenantId: string) {
  const { data, error } = await supabase
    .from('incidents')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function dbCreateIncident(incident: Record<string, any>) {
  const { data, error } = await supabase
    .from('incidents')
    .insert(incident)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function dbUpdateIncident(id: string, updates: Record<string, any>) {
  const { data, error } = await supabase
    .from('incidents')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export async function dbFetchProjects(tenantId: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function dbCreateProject(project: Record<string, any>) {
  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function dbUpdateProject(id: string, updates: Record<string, any>) {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ─── Notifications ────────────────────────────────────────────────────────────

export async function dbFetchNotifications(userId: string) {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(50);
  if (error) throw error;
  return data || [];
}

export async function dbCreateNotification(notification: Record<string, any>) {
  const { data, error } = await supabase
    .from('notifications')
    .insert(notification)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function dbMarkNotificationRead(id: string) {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', id);
  if (error) throw error;
}

// ─── Audit Logs ───────────────────────────────────────────────────────────────

export async function dbInsertAuditLog(log: Record<string, any>) {
  const { error } = await supabase.from('audit_logs').insert(log);
  if (error) console.warn('Audit log insert failed:', error.message);
}

// ─── Documents ────────────────────────────────────────────────────────────────

export async function dbFetchDocuments(tenantId: string) {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function dbCreateDocument(doc: Record<string, any>) {
  const { data, error } = await supabase
    .from('documents')
    .insert(doc)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ─── Meetings ─────────────────────────────────────────────────────────────────

export async function dbFetchMeetings(tenantId: string) {
  const { data, error } = await supabase
    .from('meetings')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function dbCreateMeeting(meeting: Record<string, any>) {
  const { data, error } = await supabase
    .from('meetings')
    .insert(meeting)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ─── Risk Signals ─────────────────────────────────────────────────────────────

export async function dbFetchRisks(tenantId: string) {
  const { data, error } = await supabase
    .from('risk_signals')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('detected_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function dbUpsertRisk(risk: Record<string, any>) {
  const { data, error } = await supabase
    .from('risk_signals')
    .upsert(risk)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ─── Realtime Subscriptions ────────────────────────────────────────────────────

export function subscribeToTableChanges(
  table: string,
  tenantId: string,
  callback: (event: any) => void
) {
  const channel = supabase
    .channel(`${table}-${tenantId}`)
    .on(
      'postgres_changes' as any,
      { event: '*', schema: 'public', table, filter: `tenant_id=eq.${tenantId}` },
      callback
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

// ─── Supabase SQL Seed Migration ──────────────────────────────────────────────
// This creates the tables if they don't already exist.
// Run once on first app start via: await runSchemaMigration()

export async function runSchemaMigration() {
  // We check by attempting to query — if table doesn't exist, this will fail
  // The actual migration should be run via Supabase Dashboard SQL Editor
  // using the SQL in supabase/migrations/001_initial_schema.sql
  console.info('[Optra] Supabase schema migration should be run via Dashboard SQL Editor.');
}
