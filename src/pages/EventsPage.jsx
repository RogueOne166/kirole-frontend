import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import SectionHeader from "../components/SectionHeader";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";

function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(Array.isArray(res.data) ? res.data : res.data.data || []);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content page-top-spacing">
        <SectionHeader
          title="Events"
          subtitle="See what’s happening around Mauritius."
        />

        <section className="section">
          <div className="card-grid">
            {events.length > 0 ? (
              events.map((event) => <EventCard key={event._id} event={event} />)
            ) : (
              <p>No events found.</p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default EventsPage;
