import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

function OrganizerDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content page-top-spacing">
        <div className="company-dashboard">
          <div className="company-dashboard-card">
            <h1 className="company-dashboard-title">
              Welcome {user?.name || "Organizer"}
            </h1>

            <p className="company-dashboard-subtitle">
              This is your organizer dashboard.
            </p>

            <p className="company-dashboard-company">
              Company: {user?.companyName || "Not set"}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default OrganizerDashboardPage;
