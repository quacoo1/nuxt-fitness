import { createClient } from '@supabase/supabase-js'

import env from '~/lib/env'

const supabaseUrl = env.SUPABASE_URL
const supabaseKey = env.SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)
