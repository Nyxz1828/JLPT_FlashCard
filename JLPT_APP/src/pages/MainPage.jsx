import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

const MotionDiv = motion.div;

function ProgressRow({ label, value, percent }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-slate-200">
          {label}
        </span>
        <span className="text-sm text-gray-500 dark:text-slate-400">
          {value}
        </span>
      </div>

      <div className="h-3 rounded-full bg-gray-200 dark:bg-slate-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-blue-600"
          style={{ width: `${Math.max(0, Math.min(100, percent))}%` }}
        />
      </div>
    </div>
  );
}

const FLASHCARDS = [
  {
    id: "n5-konnichiwa",
    type: "Vocabulary",
    front: "こんにちは",
    reading: "こんにちは",
    meaning: "Hello / Good afternoon",
    example: "こんにちは、はじめまして。",
    exampleMeaning: "Hello, nice to meet you.",
  },
  {
    id: "n5-arigatou",
    type: "Vocabulary",
    front: "ありがとう",
    reading: "ありがとう",
    meaning: "Thank you",
    example: "手伝ってくれて、ありがとう。",
    exampleMeaning: "Thank you for helping me.",
  },
  {
    id: "n5-daijoubu",
    type: "Vocabulary",
    front: "大丈夫",
    reading: "だいじょうぶ",
    meaning: "OK / All right",
    example: "大丈夫です。心配しないで。",
    exampleMeaning: "I'm okay. Don't worry.",
  },
  {
    id: "n5-ikura",
    type: "Vocabulary",
    front: "いくら",
    reading: "いくら",
    meaning: "How much?",
    example: "これはいくらですか。",
    exampleMeaning: "How much is this?",
  },
  {
    id: "n5-tokidoki",
    type: "Vocabulary",
    front: "時々",
    reading: "ときどき",
    meaning: "Sometimes",
    example: "時々、映画を見ます。",
    exampleMeaning: "Sometimes I watch movies.",
  },
  {
    id: "n5-ashita",
    type: "Vocabulary",
    front: "明日",
    reading: "あした",
    meaning: "Tomorrow",
    example: "明日、テストがあります。",
    exampleMeaning: "There is a test tomorrow.",
  },
  {
    id: "n5-benkyou",
    type: "Vocabulary",
    front: "勉強",
    reading: "べんきょう",
    meaning: "Study",
    example: "毎日、日本語を勉強しています。",
    exampleMeaning: "I study Japanese every day.",
  },
  {
    id: "n4-hajimete",
    type: "Vocabulary",
    front: "初めて",
    reading: "はじめて",
    meaning: "For the first time",
    example: "初めて日本に行きました。",
    exampleMeaning: "I went to Japan for the first time.",
  },
];

function getNextIndex(current, delta, length) {
  if (length <= 0) return 0;
  return (current + delta + length) % length;
}

export default function MainPage() {
  const cards = FLASHCARDS;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null
  const [resultsById, setResultsById] = useState(() => ({}));

  const currentCard = cards[index];

  const totals = useMemo(() => {
    const reviewed = Object.keys(resultsById).length;
    const correct = Object.values(resultsById).filter(
      (v) => v === "correct",
    ).length;
    const remaining = Math.max(0, cards.length - reviewed);

    return {
      total: cards.length,
      reviewed,
      correct,
      remaining,
    };
  }, [cards.length, resultsById]);

  const progress = useMemo(() => {
    const total = Math.max(1, totals.total);
    return {
      reviewed: (totals.reviewed / total) * 100,
      correct: (totals.correct / total) * 100,
      remaining: (totals.remaining / total) * 100,
    };
  }, [totals]);

  const cardVariants = useMemo(() => {
    return {
      enter: (dir) => ({
        opacity: 0,
        x: dir > 0 ? 36 : -36,
        scale: 0.98,
      }),
      center: {
        opacity: 1,
        x: 0,
        scale: 1,
      },
      exit: (dir) => ({
        opacity: 0,
        x: dir > 0 ? -36 : 36,
        scale: 0.98,
      }),
    };
  }, []);

  function go(delta) {
    setDirection(delta);
    setIndex((i) => getNextIndex(i, delta, cards.length));
    setShowAnswer(false);
    setFeedback(null);
  }

  function mark(result) {
    if (!currentCard) return;
    setFeedback(result);
    setResultsById((prev) => ({
      ...prev,
      [currentCard.id]: result,
    }));
  }

  return (
    <main className="flex-1 p-4 sm:p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <section className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100">
                Flashcard Dashboard
              </h2>
              <p className="mt-2 text-gray-600 dark:text-slate-300">
                Review vocabulary quickly, track progress, and keep short notes
                per session.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-gray-400 dark:text-slate-500">
                  Streak
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-slate-100">
                  3 days
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-gray-400 dark:text-slate-500">
                  Today
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-slate-100">
                  {totals.reviewed} / {totals.total}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/90 dark:bg-slate-900/70 rounded-2xl shadow-sm border border-gray-200/70 dark:border-slate-800 p-6">
            <p className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-3">
              Current Card
            </p>

            <div className="rounded-2xl border border-blue-100/80 dark:border-slate-700 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 overflow-hidden">
              <div className="px-4 sm:px-5 py-4 flex items-center justify-between">
                <p className="text-xs uppercase tracking-wide text-gray-400 dark:text-slate-500">
                  Card {index + 1} / {cards.length}
                </p>

                <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">
                  {currentCard?.type ?? "Vocabulary"}
                </p>
              </div>

              <div className="px-4 sm:px-5 pb-5">
                <AnimatePresence
                  initial={false}
                  custom={direction}
                  mode="popLayout"
                >
                  <MotionDiv
                    key={currentCard?.id ?? index}
                    custom={direction}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    className="min-h-56 rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-950/30 backdrop-blur flex items-center justify-center px-6 text-center"
                  >
                    <MotionDiv
                      animate={
                        feedback === "correct"
                          ? { scale: [1, 1.02, 1] }
                          : feedback === "wrong"
                            ? { x: [0, -10, 10, -6, 6, 0] }
                            : { x: 0, scale: 1 }
                      }
                      transition={{ duration: 0.35 }}
                      className="w-full"
                    >
                      <h3 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-slate-50 leading-tight break-words">
                        {currentCard?.front}
                      </h3>

                      <div className="mt-4">
                        {!showAnswer ? (
                          <p className="text-gray-600 dark:text-slate-300">
                            Tap “Show Answer” to reveal reading + meaning
                          </p>
                        ) : (
                          <MotionDiv
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-2"
                          >
                            <p className="text-sm text-gray-500 dark:text-slate-400">
                              Reading
                            </p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-slate-100">
                              {currentCard?.reading}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-slate-400 mt-2">
                              Meaning
                            </p>
                            <p className="text-gray-700 dark:text-slate-200">
                              {currentCard?.meaning}
                            </p>

                            <div className="mt-4 rounded-xl border border-gray-200/70 dark:border-slate-700 bg-white/60 dark:bg-slate-900/40 px-4 py-3 text-left">
                              <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">
                                Example
                              </p>
                              <p className="mt-1 text-gray-700 dark:text-slate-200">
                                {currentCard?.example}
                              </p>
                              <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                                {currentCard?.exampleMeaning}
                              </p>
                            </div>
                          </MotionDiv>
                        )}
                      </div>
                    </MotionDiv>
                  </MotionDiv>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-5">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="flex-1 px-5 py-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-200 font-medium hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="flex-1 px-5 py-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-200 font-medium hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Next
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAnswer((s) => !s);
                    setFeedback(null);
                  }}
                  className="w-full sm:w-auto sm:ml-auto px-5 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                >
                  {showAnswer ? "Hide Answer" : "Show Answer"}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => mark("wrong")}
                  disabled={!showAnswer}
                  className="flex-1 px-5 py-3 rounded-xl font-medium transition-colors border border-transparent bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-200 dark:hover:bg-rose-950/60 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Wrong
                </button>
                <button
                  type="button"
                  onClick={() => mark("correct")}
                  disabled={!showAnswer}
                  className="flex-1 px-5 py-3 rounded-xl font-medium transition-colors border border-transparent bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:bg-emerald-950/60 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Right
                </button>
              </div>

              {feedback ? (
                <MotionDiv
                  key={feedback}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={
                    feedback === "correct"
                      ? "rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/60 dark:bg-emerald-950/20 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-200"
                      : "rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/60 dark:bg-rose-950/20 px-4 py-3 text-sm text-rose-700 dark:text-rose-200"
                  }
                >
                  {feedback === "correct"
                    ? "Nice — marked as correct."
                    : "No worries — marked as incorrect."}
                </MotionDiv>
              ) : null}
            </div>
          </div>

          <div className="bg-white/90 dark:bg-slate-900/70 rounded-2xl shadow-sm border border-gray-200/70 dark:border-slate-800 p-6">
            <p className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-4">
              Study Progress
            </p>

            <div className="space-y-4">
              <ProgressRow
                label="Reviewed"
                value={`${totals.reviewed} cards`}
                percent={progress.reviewed}
              />
              <ProgressRow
                label="Correct"
                value={`${totals.correct} cards`}
                percent={progress.correct}
              />
              <ProgressRow
                label="Remaining"
                value={`${totals.remaining} cards`}
                percent={progress.remaining}
              />
            </div>

            <div className="mt-8 rounded-2xl bg-gray-50 dark:bg-slate-800/50 p-5 border border-gray-200/70 dark:border-slate-700">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
                Notes
              </h4>
              <p className="text-gray-600 dark:text-slate-300 mt-2 leading-relaxed">
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
