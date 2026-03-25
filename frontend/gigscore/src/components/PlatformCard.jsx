function PlatformCard({ platform, isConnected, onConnectClick }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{platform}</h3>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-bold ${
            isConnected ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
          }`}
        >
          {isConnected ? "Connected" : "Not Connected"}
        </span>
      </div>

      <button
        type="button"
        disabled={isConnected}
        onClick={() => onConnectClick(platform)}
        className={`w-full rounded-lg px-4 py-3 text-sm font-bold transition ${
          isConnected
            ? "cursor-not-allowed bg-slate-200 text-slate-500"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isConnected ? "Connected" : "Connect"}
      </button>
    </div>
  );
}

export default PlatformCard;
