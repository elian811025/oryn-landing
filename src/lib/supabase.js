import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ldsxcvvyybijcylxbunm.supabase.co'
const supabaseAnonKey = 'sb_publishable_FOjBvXbj1NeAzocO_nx53Q_Q1WvKsCP'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
