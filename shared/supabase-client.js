// Supabase 客户端配置
// anon key 设计为公开的，可以放前端，但 RLS 必须在数据库侧开启
// Project Dashboard: https://supabase.com/dashboard/project/rjkdtbvohnddbihxioqz

export const SUPABASE_URL = 'https://rjkdtbvohnddbihxioqz.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqa2R0YnZvaG5kZGJpaHhpb3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5MzQ0NTQsImV4cCI6MjA5MjUxMDQ1NH0.n3AXAzKhttfozprBRTbiKe6A1m5KJLob46unFPIX7w8';

// 非模块化使用场景（phd-workspace-v3.html 是 script 直接引入，不是 type=module）
// 所以也挂到 window 上
if (typeof window !== 'undefined') {
  window.SUPABASE_URL = SUPABASE_URL;
  window.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;
}

// 懒加载 supabase-js：第一次调用 getSupabase() 时从 CDN 引入
let _client = null;
export async function getSupabase() {
  if (_client) return _client;
  const mod = await import('https://esm.sh/@supabase/supabase-js@2');
  _client = mod.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
  return _client;
}

if (typeof window !== 'undefined') {
  window.getSupabase = getSupabase;
}
