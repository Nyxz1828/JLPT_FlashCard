function ProgressRow({ label, value, width }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-500">{value}</span>
      </div>

      <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
        <div className={`h-full rounded-full bg-blue-500 ${width}`} />
      </div>
    </div>
  );
}

export default function MainPage() {
  return (
    <main className="flex-1 p-8 md:p-10">
      <div className="max-w-5xl mx-auto">
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Flashcard Dashboard
          </h2>
          <p className="mt-2 text-gray-600">
            This is the main page area. You can later replace the placeholder
            navigation items with real page names and route each one to a
            different screen.
          </p>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm font-medium text-gray-500 mb-3">
              Current Card
            </p>

            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 min-h-64 flex items-center justify-center px-6 text-center">
              <div>
                <p className="text-sm uppercase tracking-wide text-blue-500 font-semibold">
                  Vocabulary
                </p>
                <h3 className="text-3xl font-bold text-gray-900 mt-3">
                  こんにちは
                </h3>
                <p className="mt-3 text-gray-600">
                  Sample flashcard content goes here
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button className="px-5 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
                Show Answer
              </button>
              <button className="px-5 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors">
                Next Card
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm font-medium text-gray-500 mb-4">
              Study Progress
            </p>

            <div className="space-y-4">
              <ProgressRow label="Reviewed" value="24 cards" width="w-3/4" />
              <ProgressRow label="Correct" value="18 cards" width="w-2/3" />
              <ProgressRow label="Remaining" value="12 cards" width="w-1/3" />
            </div>

            <div className="mt-8 rounded-2xl bg-gray-50 p-5 border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900">Notes</h4>
              <p className="text-gray-600 mt-2 leading-relaxed">
                Keep this area for quick summaries, example sentences, hints, or
                future study statistics.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}