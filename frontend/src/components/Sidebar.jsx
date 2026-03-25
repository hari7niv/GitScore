import { NavLink } from "react-router-dom";

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-all ${
      isActive
        ? "bg-blue-600 text-white shadow"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
    }`;

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-slate-200 bg-white p-4 lg:flex lg:flex-col dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-black tracking-tight text-blue-700">GigScore</h1>
        <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">The Financial Architect</p>
      </div>

      <nav className="flex flex-col gap-2">
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/add-gig" className={linkClass}>
          Add Gig
        </NavLink>
        <NavLink to="/score" className={linkClass}>
          Score
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
