import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL  = 'https://lvcfnsltefgpedarfzaa.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2Y2Zuc2x0ZWZncGVkYXJmemFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NDk3MzAsImV4cCI6MjA1MDUyNTczMH0.q7e366nFrWVHXEmHVAlIGhol-X0MgA0bN0lksBhNxPU';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
