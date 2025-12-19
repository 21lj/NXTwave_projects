import { Chrono } from "react-chrono";
import { useEffect, useState } from "react";

export default function Timeline({ items = [] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted || items.length === 0) return null;

  const chronoItems = items.slice(0, 12).map((it) => {
    const isExpense = it.type?.toLowerCase() === "expense";

    return {
      title: new Date(it.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      cardTitle: it.title,
      cardSubtitle: it.category,
      cardDetailedText: (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span
              className={`px-2.5 py-0.5 text-xs rounded-full font-medium
              ${isExpense
                ? "bg-red-500/10 text-red-400"
                : "bg-emerald-500/10 text-emerald-400"}`}
            >
              {it.type}
            </span>

            <span
              className={`text-sm font-semibold tracking-wide
              ${isExpense ? "text-red-400" : "text-emerald-400"}`}
            >
              ₹{it.amount.toLocaleString("en-IN")}
            </span>
          </div>

          {it.note && (
            <p className="text-sm text-gray-400 leading-relaxed">
              {it.note}
            </p>
          )}
        </div>
      ),
    };
  });

  return (
    <div className="mt-10 w-full rounded-3xl border border-white/10
      bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl
      p-6 shadow-[0_20px_50px_rgba(0,0,0,0.15)]">

      <div className="mb-6 flex items-center justify-between">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
          Activity Timeline
        </h4>
        <span className="text-xs uppercase tracking-wider text-gray-500">
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
          slideShow={false}
          theme={{
            primary: "#6366f1",
            secondary: "#3b82f6",
            cardBgColor: "#0f172a",
            cardForeColor: "#e5e7eb",
            titleColor: "#94a3b8",
            titleColorActive: "#60a5fa",
          }}
          fontSizes={{
            cardTitle: "0.95rem",
            cardSubtitle: "0.8rem",
            cardText: "0.85rem",
            title: "0.75rem",
          }}
          cardClassName="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        />
      </div>
    </div>
  );
}
