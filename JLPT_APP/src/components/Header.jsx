export default function Header({
  items = [],
  theme = "light",
  onToggleTheme,
  isNavOpen = false,
  onToggleNav,
}) {
  const navId = "primary-navigation";

  return (
    <aside className="w-full md:w-72 md:min-h-screen bg-white/90 dark:bg-slate-900/80 backdrop-blur border-b md:border-b-0 md:border-r border-gray-200/70 dark:border-slate-800 flex flex-col px-4 py-4 md:px-5 md:py-6 sticky top-0 md:static z-20">
      <div className="mb-4 md:mb-7">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
              Flash Card
            </h1>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-2">
              JLPT study dashboard
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleNav}
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm font-medium text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              aria-expanded={isNavOpen}
              aria-controls={navId}
            >
              {isNavOpen ? "Close" : "Menu"}
            </button>

            <button
              type="button"
              onClick={onToggleTheme}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm font-medium text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              aria-pressed={theme === "dark"}
              aria-label="Toggle dark mode"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-blue-600" />
              {theme === "dark" ? "🌙" : "☀️"}
            </button>
          </div>
        </div>

        <p className="hidden md:block text-xs uppercase tracking-wide text-gray-400 dark:text-slate-500 mt-6">
          Navigation
        </p>
      </div>

      <div
        id={navId}
        className={
          "grid transition-[grid-template-rows,opacity] duration-200 ease-out " +
          (isNavOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0 md:opacity-100")
        }
      >
        <div className="overflow-hidden">
          <nav className="flex flex-col gap-2">
            {items.map((item) => (
              <button
                key={item.id}
                className="w-full text-left px-4 py-3 rounded-xl bg-gray-50/80 dark:bg-slate-800/60 text-gray-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-700 dark:hover:text-slate-50 transition-colors border border-transparent hover:border-blue-200/70 dark:hover:border-slate-700"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:block mt-auto pt-6">
            <div className="rounded-2xl border border-gray-200/70 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-4">
              <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">
                Tip
              </p>
              <p className="mt-1 text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                Try short, frequent sessions. Accuracy improves with spaced
                review.
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
