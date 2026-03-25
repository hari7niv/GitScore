function StatCard({ title, value, subtitle }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{title}</p>
      <h3 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-slate-100">{value}</h3>
      {subtitle ? <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p> : null}
    </div>
  );
}

export default StatCard;
