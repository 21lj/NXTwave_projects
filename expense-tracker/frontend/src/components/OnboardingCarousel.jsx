import React, { useState, useEffect } from 'react';
import { FiTrendingUp, FiBarChart2, FiClock } from 'react-icons/fi';

const slides = [
  {
    icon: FiTrendingUp,
    title: 'See where your money goes',
    desc: 'Visualize expenses by category and month to spot patterns instantly.',
  },
  {
    icon: FiBarChart2,
    title: 'Balance at a glance',
    desc: 'Track income vs expenses and always know your current balance.',
  },
  {
    icon: FiClock,
    title: 'Timeline of your life',
    desc: 'Scroll a timeline of your recent activity — purchases, bills, income.',
  },
];

export default function OnboardingCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const current = slides[index];
  const Icon = current.icon;

  return (
    <div className="hidden h-full flex-1 flex-col justify-between rounded-3xl bg-slate-900 p-8 text-slate-50 md:flex">
      <div>
        <span className="inline-flex rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
          Smart Expense Tracker
        </span>
        <h2 className="mt-4 text-3xl font-semibold leading-tight">
          Own your money story.
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          Track expenses, income and patterns in one clean dashboard.
        </p>
      </div>

      <div className="mt-8 flex flex-1 flex-col justify-center">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800">
            <Icon className="text-lg text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold">{current.title}</h3>
        </div>
        <p className="mt-2 text-sm text-slate-300">{current.desc}</p>

        <div className="mt-4 flex gap-2">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`h-1 flex-1 rounded-full ${
                i === index ? 'bg-emerald-400' : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      <p className="mt-6 text-xs text-slate-500">
        Encrypted auth. Your data is yours.
      </p>
    </div>
  );
}
