import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mpcriihahsgzsewpneio.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wY3JpaWhhaHNnenNld3BuZWlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5ODQ1NDQsImV4cCI6MjEwMjU2MDU0NH0.slqvfPDDXVUR0fkWvdfP1ASv4t6cG1Hgea0vIKIRNZw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
