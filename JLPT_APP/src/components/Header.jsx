export default function Header({ items }) {
  return (
    <aside className="w-68 min-h-screen bg-white border-r border-gray-200 shadow-sm flex flex-col px-5 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Flash Card
        </h1>
        <p className="text-sm text-gray-500 mt-2">Navigation</p>
      </div>

      <nav className="flex flex-col gap-3">
        {items.map((item) => (
          <button
            key={item.id}
            className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 border border-transparent hover:border-blue-200"
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}