import React from 'react';

export default function StatCard({ title, value, icon: Icon, color, description }) {
  // Color presets mapping to styles
  const colorMap = {
    primary: {
      bg: 'bg-primary/10',
      text: 'text-primary',
      border: 'border-primary/10'
    },
    secondary: {
      bg: 'bg-secondary/10',
      text: 'text-secondary-dark',
      border: 'border-secondary/10'
    },
    danger: {
      bg: 'bg-rose-50',
      text: 'text-rose-600',
      border: 'border-rose-100'
    },
    warning: {
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-100'
    },
    info: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-600',
      border: 'border-indigo-100'
    }
  };

  const currentTheme = colorMap[color] || colorMap.primary;

  return (
    <div className={`bg-white rounded-2xl p-6 border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md flex items-center justify-between`}>
      <div className="space-y-2">
        <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider block">
          {title}
        </span>
        <h3 className="font-display font-bold text-3xl text-slate-800 leading-tight">
          {value}
        </h3>
        {description && (
          <p className="text-xs text-slate-400 font-medium">
            {description}
          </p>
        )}
      </div>
      <div className={`p-4 rounded-2xl ${currentTheme.bg} ${currentTheme.text}`}>
        <Icon className="text-2xl" />
      </div>
    </div>
  );
}
