import { Chrono } from "react-chrono";
import { useEffect, useState } from "react";

export default function Timeline({ items = [] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || items.length === 0) return null;

  const chronoItems = items.slice(0, 12).map((it) => ({
    title: new Date(it.date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    cardTitle: it.title,
    cardSubtitle: it.category,
    cardDetailedText: (
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 text-xs rounded-full bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20">
            {it.type}
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            ₹{it.amount.toLocaleString("en-IN")}
          </span>
        </div>

        {it.note && (
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {it.note}
          </p>
        )}
      </div>
    ),
  }));

  return (
    <div className="mt-10 w-full rounded-3xl bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5 dark:ring-white/10">
      <div className="mb-6 flex items-center justify-between">
        <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Activity Timeline
        </h4>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Last 12 entries
        </span>
      </div>

      <div className="w-full min-h-[520px]">
        <Chrono
          items={chronoItems}
          mode="VERTICAL_ALTERNATING"
          hideControls
          disableToolbar
          cardHeight={170}
          theme={{
            primary: "linear-gradient(180deg, #6366f1, #22d3ee)",
            secondary: "#22d3ee",
            cardBgColor: "rgba(17,24,39,0.6)",
            cardForeColor: "#e5e7eb",
            titleColor: "#9ca3af",
            titleColorActive: "#818cf8",
          }}
          fontSizes={{
            cardTitle: "0.95rem",
            cardSubtitle: "0.8rem",
            cardText: "0.85rem",
            title: "0.8rem",
          }}
        />
      </div>
    </div>
  );
}
