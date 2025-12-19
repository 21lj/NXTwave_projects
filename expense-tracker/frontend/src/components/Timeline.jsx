import { useEffect, useState } from "react";

export default function Timeline({ items = [] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted || items.length === 0) return null;

  const grouped = items.slice(0, 15).reduce((acc, item) => {
    const key = new Date(item.date).toDateString();
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <section className="mt-8 w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Recent Activity
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {items.length} entries
        </span>
      </header>

      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {Object.entries(grouped).map(([date, entries]) => (
          <div key={date} className="px-6 py-4">
            <p className="mb-3 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {date}
            </p>

            <ul className="space-y-3">
              {entries.map((it, idx) => (
                <li
                  key={idx}
                  className="group flex items-start gap-4 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  {/* Indicator */}
                  <div
                    className={`mt-1 h-2.5 w-2.5 rounded-full ${
                      it.type === "income"
                        ? "bg-emerald-500"
                        : "bg-rose-500"
                    }`}
                  />

                  {/* Main */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {it.title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {it.category}
                        </p>
                      </div>

                      <p
                        className={`font-semibold ${
                          it.type === "income"
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-rose-600 dark:text-rose-400"
                        }`}
                      >
                        {it.type === "income" ? "+" : "-"}₹
                        {it.amount.toLocaleString("en-IN")}
                      </p>
                    </div>

                    {it.note && (
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        {it.note}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
