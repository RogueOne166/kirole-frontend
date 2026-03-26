import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import MapView from "../components/MapView";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";

function PlaceDetailPage() {
  const { id } = useParams();

  const [place, setPlace] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const placeRes = await api.get(`/places/${id}`);
        const eventsRes = await api.get("/events?limit=100");

        const eventsData = Array.isArray(eventsRes.data)
          ? eventsRes.data
          : eventsRes.data.data || [];

        setPlace(placeRes.data || null);
        setEvents(eventsData);
      } catch (error) {
        console.error("Error loading place details:", error);
        setPlace(null);
        setEvents([]);
      }
    };

    fetchData();
  }, [id]);

  const relatedEvents = useMemo(() => {
    if (!place) return [];

    return events.filter(
      (event) =>
        event.placeId === place._id ||
        String(event.placeId) === String(place._id)
    );
  }, [events, place]);

  if (!place) {
    return (
      <div className="app-shell">
        <Navbar />
        <main className="main-content page-top-spacing">
          <div className="back-link-wrap">
            <Link to="/explore" className="back-link">
              ← Back to Explore
            </Link>
          </div>
          <p>Place not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content page-top-spacing">
        <div className="back-link-wrap">
          <Link to="/explore" className="back-link">
            ← Back to Explore
          </Link>
        </div>

        <section className="detail-hero">
          <div className="detail-image">
            <img src={place.image} alt={place.name} />
            <div className="detail-image-overlay">
              <span className="detail-badge">{place.category}</span>
              <h1 className="detail-title">{place.name}</h1>
              <div className="detail-meta">
                <span>📍 {place.region}</span>
                <span>💰 {place.price}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="detail-info-card">
            <h2>About this place</h2>
            <p className="detail-description">{place.description}</p>

            <div className="audience">
              {place.audience?.map((item, index) => (
                <span className="chip" key={index}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="detail-section-title">Location</h2>
          <div className="map-section">
            <MapView
              places={[place]}
              selectedPlace={place}
              onSelectPlace={() => {}}
            />
          </div>
        </section>

        <section className="section">
          <h2 className="detail-section-title">Events at this place</h2>
          <div className="card-grid">
            {relatedEvents.length > 0 ? (
              relatedEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))
            ) : (
              <p>No events available for this place yet.</p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default PlaceDetailPage;
