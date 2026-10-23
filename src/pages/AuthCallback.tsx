import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getSupabaseClient,
  isSupabaseConfigured,
} from "../utils/supabaseClient";
import { useLanguage } from "../i18n/LanguageContext";
import { text } from "../domain/exploration";
export default function AuthCallback() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [error, setError] = useState(false);
  useEffect(() => {
    let live = true;
    if (!isSupabaseConfigured()) {
      setError(true);
      return;
    }
    // Supabase initializes and exchanges the URL callback exactly once. getSession
    // awaits that initialization; an extra exchange breaks PKCE in StrictMode.
    getSupabaseClient()
      .auth.getSession()
      .then(({ data, error }) => {
        if (!live) return;
        if (error || !data.session) {
          setError(true);
          return;
        }
        history.replaceState(null, "", "/auth/callback");
        navigate("/profile", { replace: true });
      })
      .catch(() => {
        if (live) setError(true);
      });
    return () => {
      live = false;
    };
  }, [navigate]);
  return (
    <div className="empty-state">
      <h1>
        {text(
          language,
          error ? "登录尚未完成" : "正在读取你的档案…",
          error ? "Sign-in incomplete" : "Opening your archive…",
        )}
      </h1>
      {error && (
        <>
          <p>
            {text(
              language,
              "请返回档案页重试登录。此设备保存的访客资料仍然保留。",
              "Return to your archive and try signing in again. Guest data remains on this device.",
            )}
          </p>
          <Link className="button primary" to="/profile">
            {text(language, "返回我的档案", "Back to my archive")}
          </Link>
        </>
      )}
    </div>
  );
}
