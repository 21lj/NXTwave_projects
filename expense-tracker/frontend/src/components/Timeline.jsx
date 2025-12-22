import React, { useMemo } from "react";
import { Chrono } from "react-chrono";

const MemoChrono = React.memo(Chrono);

export default function Timeline({ items = [] }) {
  const chronoItems = useMemo(() => {
    return [...items]
      .sort(
        (a, b) =>
          new Date(a?.date || 0).getTime() -
          new Date(b?.date || 0).getTime()
      )
      .slice(-10)
      .map((it) => ({
        title: new Date(it.date || Date.now()).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        cardTitle: it.title || "Untitled",
        cardSubtitle: it.category || "Uncategorized",
        cardDetailedText: [
          `Type: ${it.type}`,
          `Amount: ₹${Number(it.amount || 0).toFixed(2)}`,
          it.note && `Note: ${it.note}`,
        ].filter(Boolean),
      }));
  }, [items]);

  return (
    <section className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800 transition-all duration-300">
      {/* Header */}
      <header className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Activity Timeline
          </h4>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
            Recent Transactions
          </p>
        </div>
        <div className="h-3 w-3 animate-pulse rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)]" />
      </header>

      {chronoItems.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 dark:border-gray-700 dark:bg-gray-800/30">
          <span className="text-sm font-medium text-gray-400">
            No activity recorded yet
          </span>
        </div>
      ) : (
        <div className="relative min-h-[360px] max-h-[70vh] chrono-container">
          <MemoChrono
            items={chronoItems}
            mode="VERTICAL_ALTERNATING"
            disableToolbar
            hideControls
            scrollable={{ scrollbar: true }}
            cardHeight={140}
            theme={{
              primary: "#6366f1",
              secondary: "transparent",
              cardBgColor: "transparent",
              cardForeColor: "var(--chrono-text)",
              titleColor: "#8b5cf6",
            }}
            fontSizes={{
              title: "0.75rem",
              cardTitle: "1rem",
              cardSubtitle: "0.85rem",
              cardText: "0.75rem",
            }}
            classNames={{
              card: "my-custom-card",
              title: "my-custom-title",
            }}
          />
        </div>
      )}
    </section>
  );
}