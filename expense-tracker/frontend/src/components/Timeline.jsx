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
    primary: "#60a5fa",
    secondary: "#3b82f6",
    cardBgColor: "#1f2937",      
    cardForeColor: "#f9fafb",    
    titleColor: "#f9fafb",
    titleColorActive: "#ffffff",
  }}
  fontSizes={{
    title: "0.85rem",
    cardTitle: "1rem",
    cardSubtitle: "0.8rem",
    cardText: "0.9rem",
  }}
  cardHeight={140}
  disableToolbar
/>
    </div>
  </div>
);
}
