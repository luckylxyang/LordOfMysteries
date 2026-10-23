import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { BACKEND_ENABLED } from "../config/features";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// 检查 Supabase 是否已配置
export function isSupabaseConfigured(): boolean {
  if (!BACKEND_ENABLED) return false;
  try {
    const url = new URL(supabaseUrl);
    return (
      ["http:", "https:"].includes(url.protocol) &&
      !!supabaseAnonKey.trim() &&
      !supabaseAnonKey.startsWith("your") &&
      !url.hostname.startsWith("your-project")
    );
  } catch {
    return false;
  }
}

// 懒加载创建 Supabase 客户端
let clientInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase 未配置");
  }

  if (!clientInstance) {
    clientInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { flowType: "pkce", detectSessionInUrl: true },
    });
  }

  return clientInstance;
}

// 向后兼容的导出
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabaseClient();
    return client[prop as keyof typeof client];
  },
});
