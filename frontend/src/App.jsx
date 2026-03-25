import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import Dashboard from "./pages/Dashboard";
import AddGig from "./pages/AddGig";
import Score from "./pages/Score";

function MainLayout({ currentUser, onLogout, isDarkMode, onToggleDarkMode, onUserAuthenticated }) {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login onUserAuthenticated={onUserAuthenticated} />} />
        <Route path="/register" element={<CreateUser onUserAuthenticated={onUserAuthenticated} />} />
      </Routes>
    );
  }

  if (!currentUser?.userId) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar
        userName={currentUser.name}
        onLogout={onLogout}
        isDarkMode={isDarkMode}
        onToggleDarkMode={onToggleDarkMode}
      />
      <div className="flex min-h-[calc(100vh-4rem)] items-stretch">
        <Sidebar />
        <main className="w-full p-4 md:p-6 lg:p-8">
          <Routes>
            <Route path="/dashboard" element={<Dashboard userId={currentUser.userId} />} />
            <Route path="/add-gig" element={<AddGig userId={currentUser.userId} />} />
            <Route path="/score" element={<Score userId={currentUser.userId} />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUserId = localStorage.getItem("gigscoreUserId");
    const storedUserName = localStorage.getItem("gigscoreUserName") || "";
    const storedUserEmail = localStorage.getItem("gigscoreUserEmail") || "";

    return storedUserId
      ? {
          userId: Number(storedUserId),
          name: storedUserName,
          email: storedUserEmail,
        }
      : null;
  });

  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("gigscoreDarkMode") === "true");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("gigscoreDarkMode", String(isDarkMode));
  }, [isDarkMode]);

  const handleUserAuthenticated = (userDashboard) => {
    const nextUser = {
      userId: userDashboard.userId,
      name: userDashboard.name,
      email: userDashboard.email,
    };

    localStorage.setItem("gigscoreUserId", String(nextUser.userId));
    localStorage.setItem("gigscoreUserName", nextUser.name || "");
    localStorage.setItem("gigscoreUserEmail", nextUser.email || "");
    setCurrentUser(nextUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("gigscoreUserId");
    localStorage.removeItem("gigscoreUserName");
    localStorage.removeItem("gigscoreUserEmail");
    setCurrentUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/*"
          element={
            <MainLayout
              currentUser={currentUser}
              onLogout={handleLogout}
              isDarkMode={isDarkMode}
              onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
              onUserAuthenticated={handleUserAuthenticated}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
