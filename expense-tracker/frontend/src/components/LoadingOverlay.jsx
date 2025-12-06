import React from 'react';

export default function LoadingOverlay({ show }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/20">
      <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg shadow-slate-300">
        <span className="h-3 w-3 animate-ping rounded-full bg-slate-900" />
        <span className="text-xs font-medium text-slate-800">Loading...</span>
      </div>
    </div>
  );
}
