import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rbqjjxtcwsaapcmlqchh.supabase.co'
const supabaseKey = 'your-full-publishable-key-here'

export const supabase = createClient(supabaseUrl, supabaseKey)