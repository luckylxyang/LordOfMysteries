import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Language, translations, Translations } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const LANGUAGE_STORAGE_KEY = "lotm-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // 从 localStorage 读取，或使用浏览器语言
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    } catch {
      /* Browser storage is optional. */
    }
    if (stored === "zh" || stored === "en") return stored;

    // 检测浏览器语言
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith("zh") ? "zh" : "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      /* Keep the in-memory language. */
    }
    // 更新 HTML lang 属性
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    // 设置初始 HTML lang 属性
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
