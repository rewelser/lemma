import { Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  return (
    <div className="w-full min-h-screen flex bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* Sidebar */}
      <aside className="w-64 bg-[var(--color-soft)] p-6 shadow-md hidden md:block">
        <h2 className="text-xl font-(--font-weight-header) mb-6">Navigation</h2>
        <ul className="space-y-4">
          <li>
            <button onClick={() => navigate("/home")} className="hover:underline">
              🏠 Home
            </button>
          </li>
          {authContext?.isAuthenticated && (
            <li>
              <button onClick={() => navigate("/profile")} className="hover:underline">
                👤 Profile
              </button>
            </li>
          )}
          {!authContext?.isAuthenticated && (
            <li>
              <button onClick={() => navigate("/login")} className="hover:underline">
                🔐 Login
              </button>
            </li>
          )}
          <li>
            <button onClick={() => navigate("/register")} className="hover:underline">
              ✍️ Register
            </button>
          </li>
          {authContext?.isAuthenticated && (
            <li>
              <button
                onClick={() => {
                  authContext.logout();
                  navigate("/login");
                }}
                className="text-red-500 hover:underline"
              >
                🚪 Logout
              </button>
            </li>
          )}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-grow px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
