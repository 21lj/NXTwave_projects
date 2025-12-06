import React from "react";
import { Chrono } from "react-chrono";

export default function Timeline({ items = [] }) {
  const chronoItems = items.slice(0, 12).map((it) => ({
    title: new Date(it.date).toLocaleDateString(),
    cardTitle: it.title,
    cardSubtitle: `${it.category} • ${it.type}`,
    cardDetailedText: `₹${it.amount}${it.note ? ` — ${it.note}` : ""}`,
  }));

  return (
  <div className="mt-4 h-80 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
      Recent Timeline
    </h4>

    <div className="h-[260px]">
      <Chrono
        items={chronoItems}
        mode="HORIZONTAL"
        theme={{
          primary: "#3b82f6",   
          secondary: "#60a5fa",
          cardBgColor: "#ffffff",
          cardForeColor: "#1f2937",
        }}
        cardHeight={120}
        slideShow={false}
        disableToolbar
      />
    </div>
  </div>
);
}
