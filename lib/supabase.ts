import { createClient } from '@supabase/supabase-js'

// ดึงค่าจาก .env.local ที่คุณตั้งไว้
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)