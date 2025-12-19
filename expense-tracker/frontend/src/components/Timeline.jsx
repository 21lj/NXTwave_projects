import { Chrono } from "react-chrono";
import { useEffect, useState } from "react";

export default function Timeline({ items = [] }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const chronoItems = items.slice(0, 12).map((it) => ({
    title: new Date(it.date).toLocaleDateString(),
    cardTitle: it.title,
    cardSubtitle: `${it.category} • ${it.type}`,
    cardDetailedText: `₹${it.amount}${it.note ? ` — ${it.note}` : ""}`,
  }));

  return (
    <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm w-full">
      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Recent Timeline
      </h4>

      <div className="w-full min-h-[400px]"> 
        {ready && chronoItems.length > 0 && (
          <Chrono
            items={chronoItems}
            mode="HORIZONTAL"
            cardHeight={160} 
            itemWidth={200}
            showAllCardsHorizontal
            disableToolbar
            theme={{
              primary: "#3b82f6",
              secondary: "#60a5fa",
              cardBgColor: "#374151", 
              cardForeColor: "#ffffff",
              titleColor: "#9ca3af",
              titleColorActive: "#3b82f6",
            }}
            classNames={{
              card: "my-custom-card",
              title: "my-custom-title",
            }}
          />
        )}
      </div>
    </div>
  );
}

