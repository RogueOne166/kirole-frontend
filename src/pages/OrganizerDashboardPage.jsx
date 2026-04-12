import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

function OrganizerDashboardPage() {
  const { user } = useAuth();

  const stats = [
    { label: "Total Events", value: 12 },
    { label: "Upcoming Events", value: 5 },
    { label: "Tickets Sold", value: 248 },
    { label: "Saved Places", value: 9 },
  ];

  const recentEvents = [
    {
      id: 1,
      title: "Sunset Beach Party",
      date: "18 April 2026",
      location: "Flic en Flac",
      status: "Upcoming",
    },
    {
      id: 2,
      title: "Tech Networking Night",
      date: "22 April 2026",
      location: "Ebene",
      status: "Open",
    },
    {
      id: 3,
      title: "Food Festival",
      date: "30 April 2026",
      location: "Port Louis",
      status: "Draft",
    },
  ];

  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content page-top-spacing">
        <section className="organizer-dashboard">
          <div className="dashboard-hero-card">
            <div>
              <p className="dashboard-kicker">Organizer Portal</p>
              <h1 className="dashboard-main-title">
                Welcome {user?.name || "Organizer"}
              </h1>
              <p className="dashboard-main-subtitle">
                Manage your events, track activity, and grow your organizer presence.
              </p>
            </div>

            <div className="dashboard-company-box">
              <span className="dashboard-company-label">Company</span>
              <strong className="dashboard-company-name">
                {user?.companyName || "Not set"}
              </strong>
            </div>
          </div>

          <section className="dashboard-stats-grid">
            {stats.map((stat) => (
              <div className="dashboard-stat-card" key={stat.label}>
                <p className="dashboard-stat-label">{stat.label}</p>
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
              <button className="dashboard-action-btn">Create Event</button>
              <button className="dashboard-action-btn">Manage Events</button>
              <button className="dashboard-action-btn">View Bookings</button>
              <button className="dashboard-action-btn">Edit Profile</button>
            </div>
          </section>

          <section className="dashboard-content-grid">
            <div className="dashboard-panel">
              <div className="dashboard-section-header">
                <h2>Recent Events</h2>
                <p>Your latest event activity.</p>
              </div>

              <div className="dashboard-events-list">
                {recentEvents.map((event) => (
                  <div className="dashboard-event-row" key={event.id}>
                    <div>
                      <h3>{event.title}</h3>
                      <p>
                        {event.date} • {event.location}
                      </p>
                    </div>
                    <span className="dashboard-status-badge">{event.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-panel">
              <div className="dashboard-section-header">
                <h2>Organizer Profile</h2>
                <p>Your public organizer information.</p>
              </div>

              <div className="dashboard-profile-info">
                <p>
                  <strong>Name:</strong> {user?.name || "Organizer"}
                </p>
                <p>
                  <strong>Email:</strong> {user?.email || "No email"}
                </p>
                <p>
                  <strong>Company:</strong> {user?.companyName || "Not set"}
                </p>
                <p>
                  <strong>Role:</strong> Organizer
                </p>
              </div>
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default OrganizerDashboardPage;
