import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "ar" | "en";
type Theme = "light" | "dark";

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
  user: { id: string; name: string } | null;
  setUser: (u: { id: string; name: string } | null) => void;
  t: (ar: string, en: string) => string;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("ar");
  const [theme, setTheme] = useState<Theme>("light");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const t = (ar: string, en: string) => (language === "ar" ? ar : en);

  return (
    <AppContext.Provider
      value={{ language, setLanguage, theme, setTheme, isLoggedIn, setIsLoggedIn, user, setUser, t }}
    >
      {children}
    </AppContext.Provider>
  );
};
