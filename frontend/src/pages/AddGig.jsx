import { useEffect, useMemo, useState } from "react";
import PlatformCard from "../components/PlatformCard";
import { addGig } from "../services/gigService";
import { getUserDashboard } from "../services/userService";

const PLATFORMS = ["Swiggy", "Zomato", "Uber", "Rapido", "Upwork"];

function AddGig({ userId }) {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [amount, setAmount] = useState("");
  const [rating, setRating] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const response = await getUserDashboard(userId);
        setDashboard(response);
      } catch (error) {
        setStatus({
          type: "error",
          message: error.response?.data?.message || "Unable to load platform status.",
        });
      }
      setLoading(false);
    };

    fetchDashboard();
  }, [userId]);

  const connectedPlatforms = useMemo(
    () => new Set((dashboard?.gigSummaries || []).filter((gig) => gig.jobsCompleted > 0).map((gig) => gig.platform)),
    [dashboard],
  );

  const handleConnectClick = (platform) => {
    setSelectedPlatform(platform);
    setAmount("");
    setRating("");
    setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    const payload = {
      userId,
      platform: selectedPlatform,
      amount: Number(amount),
      rating: Number(rating),
    };

    try {
      const updatedDashboard = await addGig(payload);
      setDashboard(updatedDashboard);
      setStatus({ type: "success", message: `${selectedPlatform} connected successfully.` });
      setSelectedPlatform("");
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Failed to connect platform.",
      });
    }
  };

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Add Gig Platform</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Connect platforms and send gig activity to backend.</p>
      </div>

      {loading ? <p className="text-sm text-slate-600 dark:text-slate-300">Loading platform status...</p> : null}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {PLATFORMS.map((platform) => (
          <PlatformCard
            key={platform}
            platform={platform}
            isConnected={connectedPlatforms.has(platform)}
            onConnectClick={handleConnectClick}
          />
        ))}
      </div>

      {selectedPlatform ? (
        <form
          onSubmit={handleSubmit}
          className="max-w-xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Connect {selectedPlatform}</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Submit gig details to the backend.</p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="amount" className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Amount
              </label>
              <input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none ring-blue-200 transition focus:ring dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>

            <div>
              <label htmlFor="rating" className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Rating
              </label>
              <input
                id="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={rating}
                onChange={(event) => setRating(event.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none ring-blue-200 transition focus:ring dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="mt-5 flex gap-3">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Submit Gig
            </button>
            <button
              type="button"
              onClick={() => setSelectedPlatform("")}
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      {status.message ? (
        <p
          className={`rounded-lg px-3 py-2 text-sm font-medium ${
            status.type === "success" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-700"
          }`}
        >
          {status.message}
        </p>
      ) : null}
    </section>
  );
}

export default AddGig;
