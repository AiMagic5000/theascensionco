import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: { schema: 'ascension' }
})

// Also export a client for the public schema if needed
export const supabasePublic = createClient(supabaseUrl, supabaseAnonKey)

export type Account = {
  id: string
  user_id: string
  name: string
  type: 'business' | 'personal'
  category: string
  balance: number
  institution: string
  account_number: string
  created_at: string
  updated_at?: string
}

export type Transaction = {
  id: string
  account_id: string
  description: string
  amount: number
  type: 'credit' | 'debit'
  category: string
  date: string
  created_at: string
}

export type BusinessProfile = {
  id: string
  user_id: string
  company_name: string
  duns_number: string
  paydex_score: number
  ein: string
  state_of_formation: string
  formation_date?: string
  industry: string
  notes?: string
  created_at: string
  updated_at: string
}

export type Folder = {
  id: string
  user_id: string
  name: string
  parent_id: string | null
  created_at: string
}

export type FileRecord = {
  id: string
  user_id: string
  name: string
  type: string
  size: number
  folder_id: string | null
  storage_path: string | null
  content: string | null
  ai_processed: boolean
  created_at: string
}
