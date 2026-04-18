import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import { useEffect, useMemo, useState } from "react";

function getInitialTheme() {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
    ? "dark"
    : "light";
}

function applyTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const menuItems = [
    { id: 1, label: "JLPT N1" },
    { id: 2, label: "JLPT N2" },
    { id: 3, label: "JLPT N3" },
    { id: 4, label: "JLPT N4" },
    { id: 5, label: "JLPT N5" },
  ];

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia?.("(min-width: 768px)");
    if (!mq) return;

    const apply = () => setIsNavOpen(mq.matches);
    apply();

    const handler = (event) => setIsNavOpen(event.matches);
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }

    mq.addListener(handler);
    return () => mq.removeListener(handler);
  }, []);

  const handleToggleTheme = useMemo(() => {
    return () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Header
        items={menuItems}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        isNavOpen={isNavOpen}
        onToggleNav={() => setIsNavOpen((v) => !v)}
      />
      <MainPage />
    </div>
  );
}
