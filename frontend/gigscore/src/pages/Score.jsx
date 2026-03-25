import { useEffect, useState } from "react";
import { getScore } from "../services/scoreService";
import { getUserDashboard } from "../services/userService";

function Score({ userId }) {
  const [score, setScore] = useState(null);
  const [jobsCompleted, setJobsCompleted] = useState(0);
  const [status, setStatus] = useState({ loading: true, error: "" });

  useEffect(() => {
    const fetchScore = async () => {
      setStatus({ loading: true, error: "" });
      try {
        const [scoreResponse, dashboardResponse] = await Promise.all([
          getScore(userId),
          getUserDashboard(userId),
        ]);
        setScore(Number(scoreResponse.score));
        setJobsCompleted(Number(dashboardResponse.jobsCompleted || 0));
        setStatus({ loading: false, error: "" });
      } catch (error) {
        setStatus({
          loading: false,
          error: error.response?.data?.message || "Unable to fetch score from backend.",
        });
      }
    };

    fetchScore();
  }, [userId]);

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Your GigScore</h1>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {status.loading ? <p className="text-slate-600 dark:text-slate-300">Loading score...</p> : null}

        {status.error ? (
          <p className="mx-auto max-w-md rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700">
            {status.error}
          </p>
        ) : null}

        {!status.loading && !status.error ? (
          <>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Financial Reputation</p>
            <p className="mt-2 text-7xl font-black tracking-tight text-blue-700">{score}</p>
            <p className="mx-auto mt-4 max-w-lg text-slate-600 dark:text-slate-300">
              This score reflects your consistency, earnings strength, and platform performance.
            </p>
          </>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Earnings Contribution</p>
          <p className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-100">High</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Rating Contribution</p>
          <p className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-100">Excellent</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Consistency Contribution</p>
          <p className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-100">Steady</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">How to Improve Your Score</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          {jobsCompleted < 3
            ? "Complete 3 deliveries tomorrow to increase your score by +25 points."
            : "Keep your rating above 4.8 this week and complete 2 more gigs for steady growth."}
        </p>
      </div>
    </section>
  );
}

export default Score;
