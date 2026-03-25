import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUserDashboard } from "../services/userService";

function Login({ onUserAuthenticated }) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState({ loading: false, error: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userId) {
      return;
    }

    setStatus({ loading: true, error: "" });
    try {
      const dashboard = await getUserDashboard(Number(userId));
      onUserAuthenticated(dashboard);
      navigate("/dashboard");
    } catch (error) {
      setStatus({
        loading: false,
        error: error.response?.data?.message || "Unable to find user. Enter a valid user ID.",
      });
      return;
    }

    setStatus({ loading: false, error: "" });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 dark:bg-slate-950">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-blue-700">GigScore</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Sign in with your user ID to load live backend data.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              User Name
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your user name"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none ring-blue-200 transition focus:ring dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none ring-blue-200 transition focus:ring dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <div>
            <label htmlFor="userId" className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              User ID
            </label>
            <input
              id="userId"
              type="number"
              min="1"
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              placeholder="Enter your user ID"
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none ring-blue-200 transition focus:ring dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-bold text-white transition hover:bg-blue-700"
          >
            {status.loading ? "Signing In..." : "Sign In to Dashboard"}
          </button>

          {status.error ? (
            <p className="rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700">{status.error}</p>
          ) : null}
        </form>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
          Do not have an account?{" "}
          <Link to="/register" className="font-bold text-blue-700 hover:underline">
            Create Account
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
