import Header from "../components/Header";

function Home() {
  const menuItems = [
    { id: 1, label: "Dashboard" },
    { id: 2, label: "Decks" },
    { id: 3, label: "Settings" },
  ];

  return (
    <div className="min-h-screen flex">
      <Header items={menuItems} />

      <main className="flex-1 p-10 flex items-center justify-center">
        <div className="w-full max-w-sm rounded-3xl border border-gray-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/70 shadow-sm p-10 text-center">
          <p className="text-sm uppercase tracking-wide text-gray-400 dark:text-slate-500">
            Welcome
          </p>
          <h2 className="mt-3 text-2xl font-bold text-gray-900 dark:text-slate-100">
            Flash Card
          </h2>
          <p className="mt-2 text-gray-600 dark:text-slate-300">
            Start a quick review session.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Home;
