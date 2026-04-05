import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

function OrganizerDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content page-top-spacing">
        <div className="auth-card">
          <h1 className="auth-title">
            Welcome {user?.name || "Organizer"}
          </h1>

          <p className="auth-subtitle">
            This is your organizer dashboard.
          </p>

          <p>
            Company: {user?.companyName || "Not set"}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default OrganizerDashboardPage;
