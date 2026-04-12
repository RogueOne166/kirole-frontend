import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import api from "../api";

function OrganizerDashboardPage() {
  const { user } = useAuth();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/organizer/dashboard");
        setDashboard(res.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(
          err.response?.data?.message || "Failed to load organizer dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const organizer = dashboard?.organizer || user || {};

  const stats = useMemo(() => {
    if (!dashboard?.stats) return [];

    return [
      {
        label: "Total Events",
        value: dashboard.stats.totalEvents ?? 0,
        icon: "🎉",
      },
      {
        label: "Upcoming Events",
        value: dashboard.stats.upcomingEvents ?? 0,
        icon: "📅",
      },
      {
        label: "Tickets Sold",
        value: dashboard.stats.ticketsSold ?? 0,
        icon: "🎟️",
      },
    ];
  }, [dashboard]);

  const recentEvents = dashboard?.recentEvents || [];

  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content page-top-spacing">
        <section className="organizer-dashboard">
          <div className="dashboard-hero-card">
            <div>
              <p className="dashboard-kicker">Organizer Portal</p>
              <h1 className="dashboard-main-title">
                Welcome {organizer?.name || "Organizer"}
              </h1>
              <p className="dashboard-main-subtitle">
                Manage your events, track activity, and grow your organizer presence.
              </p>
            </div>

            <div className="dashboard-company-box">
              <span className="dashboard-company-label">Company</span>
              <strong className="dashboard-company-name">
                {organizer?.companyName || "Not set"}
              </strong>
            </div>
          </div>

          {loading ? (
            <section className="dashboard-panel">
              <p>Loading dashboard...</p>
            </section>
          ) : error ? (
            <section className="dashboard-panel">
              <p>{error}</p>
            </section>
          ) : (
            <>
              <section className="dashboard-stats-grid">
                {stats.map((stat) => (
                  <div className="dashboard-stat-card" key={stat.label}>
                    <div className="dashboard-stat-top">
                      <span className="dashboard-stat-icon">{stat.icon}</span>
                      <p className="dashboard-stat-label">{stat.label}</p>
                    </div>
                    <h2 className="dashboard-stat-value">{stat.value}</h2>
                  </div>
                ))}
              </section>

              <section className="dashboard-actions-section">
                <div className="dashboard-section-header">
                  <h2>Quick Actions</h2>
                  <p>Jump directly into your main organizer tasks.</p>
                </div>

                <div className="dashboard-actions-grid">
                  <Link to="/organizer/events/new" className="dashboard-action-btn">
                    <span>➕</span> Create Event
                  </Link>
                  <Link to="/organizer/events" className="dashboard-action-btn">
                    <span>🗂️</span> Manage Events
                  </Link>
                  <Link to="/organizer/bookings" className="dashboard-action-btn">
                    <span>🎫</span> View Bookings
                  </Link>
                  <Link to="/profile" className="dashboard-action-btn">
                    <span>👤</span> Edit Profile
                  </Link>
                </div>
              </section>

              <section className="dashboard-content-grid">
                <div className="dashboard-panel">
                  <div className="dashboard-section-header">
                    <h2>Recent Events</h2>
                    <p>Your latest event activity.</p>
                  </div>

                  <div className="dashboard-events-list">
                    {recentEvents.length === 0 ? (
                      <p className="dashboard-empty-text">No events yet.</p>
                    ) : (
                      recentEvents.map((event) => (
                        <div className="dashboard-event-row" key={event._id}>
                          <div>
                            <h3>{event.title || event.name || "Untitled event"}</h3>
                            <p>
                              {event.date || "No date"} •{" "}
                              {event.location || event.placeName || event.region || "No location"}
                            </p>
                          </div>
                          <span className="dashboard-status-badge">
                            {event.status || "Draft"}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="dashboard-panel">
                  <div className="dashboard-section-header">
                    <h2>Organizer Profile</h2>
                    <p>Your public organizer information.</p>
                  </div>

                  <div className="dashboard-profile-info">
                    <p>
                      <strong>Name:</strong> {organizer?.name || "Organizer"}
                    </p>
                    <p>
                      <strong>Email:</strong> {organizer?.email || "No email"}
                    </p>
                    <p>
                      <strong>Company:</strong> {organizer?.companyName || "Not set"}
                    </p>
                    <p>
                      <strong>Role:</strong> {organizer?.role || "Organizer"}
                    </p>
                  </div>
                </div>
              </section>
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default OrganizerDashboardPage;
