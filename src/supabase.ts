import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://giwzsoguumocvhfbctru.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdpd3pzb2d1dW1vY3ZoZmJjdHJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5NzU3MTEsImV4cCI6MjA4OTU1MTcxMX0.nv5CXxdkq3m2kiQABU266RD9RpZbcvgzjYOnAVFCXq4'

export const supabase = createClient(supabaseUrl, supabaseKey)
