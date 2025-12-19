import { Chrono } from "react-chrono";
import { useEffect, useState } from "react";

export default function Timeline({ items = [] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 text-xs rounded-full bg-blue-500/10 text-blue-400">
            {it.type}
          </span>
          <span className="text-sm text-gray-400">
            ₹{it.amount.toLocaleString("en-IN")}
          </span>
        </div>

        {it.note && (
          <p className="text-sm text-gray-300 leading-relaxed">
            {it.note}
          </p>
        )}
      </div>
    ),
  }));

  return (
    <div className="mt-8 w-full rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Activity Timeline
        </h4>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Last 12 entries
        </span>
      </div>

      <div className="w-full min-h-[500px]">
        <Chrono
          items={chronoItems}
          mode="VERTICAL_ALTERNATING"
          hideControls
          disableToolbar
          cardHeight={180}
          theme={{
            primary: "linear-gradient(180deg, #3b82f6, #6366f1)",
            secondary: "#6366f1",
            cardBgColor: "#111827",
            cardForeColor: "#e5e7eb",
            titleColor: "#9ca3af",
            titleColorActive: "#60a5fa",
          }}
          fontSizes={{
            cardTitle: "1rem",
            cardSubtitle: "0.875rem",
            cardText: "0.85rem",
            title: "0.85rem",
          }}
        />
      </div>
    </div>
  );
}

