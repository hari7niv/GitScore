import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import { getUserDashboard } from "../services/userService";
import { getRecentActivities } from "../services/activityService";

function Dashboard({ userId }) {
  const [dashboard, setDashboard] = useState(null);
  const [activities, setActivities] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: "" });

  useEffect(() => {
    const fetchDashboard = async () => {
      setStatus({ loading: true, error: "" });
      try {
        const [dashboardResponse, activityResponse] = await Promise.all([
          getUserDashboard(userId),
          getRecentActivities(userId),
        ]);

        setDashboard(dashboardResponse);
        setActivities(activityResponse);
        setStatus({ loading: false, error: "" });
      } catch (error) {
        setStatus({
          loading: false,
          error: error.response?.data?.message || "Unable to load dashboard metrics.",
        });
      }
    };

    fetchDashboard();
  }, [userId]);

  if (status.loading) {
    return <p className="text-sm text-slate-600 dark:text-slate-300">Loading dashboard...</p>;
  }

  if (status.error) {
    return <p className="rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700">{status.error}</p>;
  }

  return (
    <section>
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Dashboard</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">Live metrics fetched from backend aggregation APIs.</p>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Earnings"
          value={`$${Number(dashboard.totalEarnings || 0).toFixed(2)}`}
          subtitle="Aggregated across connected platforms"
        />
        <StatCard title="Jobs Completed" value={dashboard.jobsCompleted || 0} subtitle="Total completed gigs" />
        <StatCard
          title="Average Rating"
          value={Number(dashboard.avgRating || 0).toFixed(2)}
          subtitle="Weighted platform rating"
        />
        <StatCard title="Activity Days" value={dashboard.activeDays || 0} subtitle="Total active work days" />
      </div>

      <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Recent Activity</h2>
        {activities.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">No recent activity yet.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {activities.map((activity) => (
              <li
                key={activity.id}
                className="flex flex-col gap-1 rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm dark:border-slate-800 dark:bg-slate-950"
              >
                <p className="font-semibold text-slate-800 dark:text-slate-100">
                  {activity.platform} - {activity.action}
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  {activity.amount !== null && activity.amount !== undefined
                    ? `Amount: $${Number(activity.amount).toFixed(2)}`
                    : "Amount: N/A"}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default Dashboard;
