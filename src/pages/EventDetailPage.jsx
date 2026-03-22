import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import MapView from "../components/MapView";
import Footer from "../components/Footer";

function EventDetailPage() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsRes = await api.get("/events?limit=100");
        const placesRes = await api.get("/places?limit=100");

        const eventsData = Array.isArray(eventsRes.data)
          ? eventsRes.data
          : eventsRes.data.data || [];

        const placesData = Array.isArray(placesRes.data)
          ? placesRes.data
          : placesRes.data.data || [];

        const selectedEvent = eventsData.find((e) => e.id === Number(id));

        setEvent(selectedEvent || null);
        setPlaces(placesData);
      } catch (error) {
        console.error("Error loading event details:", error);
        setEvent(null);
        setPlaces([]);
      }
    };

    fetchData();
  }, [id]);

  const relatedPlace = useMemo(() => {
    if (!event) return null;
    return places.find((place) => place.id === event.placeId) || null;
  }, [event, places]);

  if (!event) {
    return (
      <div className="app-shell">
        <Navbar />
        <main className="main-content page-top-spacing">
          <div className="back-link-wrap">
            <Link to="/events" className="back-link">
              ← Back to Events
            </Link>
          </div>
          <p>Event not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const mapPlaces =
    event.latitude && event.longitude
      ? [
          {
            id: event.id,
            name: event.name || event.title,
            category: event.category || "event",
            region: event.region || "",
            latitude: event.latitude,
            longitude: event.longitude,
          },
        ]
      : relatedPlace
      ? [relatedPlace]
      : [];

  const selectedMapPlace =
    mapPlaces.length > 0 ? mapPlaces[0] : null;

  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content page-top-spacing">
        <div className="back-link-wrap">
          <Link to="/events" className="back-link">
            ← Back to Events
          </Link>
        </div>

        <section className="detail-hero">
          <div className="detail-image">
            <img src={event.image} alt={event.name || event.title} />
            <div className="detail-image-overlay">
              <span className="detail-badge">{event.category || "event"}</span>
              <h1 className="detail-title">{event.name || event.title}</h1>
              <div className="detail-meta">
                {event.region && <span>📍 {event.region}</span>}
                {event.date && <span>📅 {event.date}</span>}
                {event.price && <span>💰 {event.price}</span>}
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="detail-info-card">
            <h2>About this event</h2>
            <p className="detail-description">{event.description}</p>

            {event.audience && (
              <div className="audience">
                {event.audience.map((item, index) => (
                  <span className="chip" key={index}>
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        {relatedPlace && (
          <section className="section">
            <h2 className="detail-section-title">Related place</h2>
            <div className="detail-info-card">
              <p>
                <strong>{relatedPlace.name}</strong>
              </p>
              <p className="detail-description">{relatedPlace.description}</p>
              <Link to={`/place/${relatedPlace.id}`} className="back-link">
                View place details →
              </Link>
            </div>
          </section>
        )}

        {selectedMapPlace && (
          <section className="section">
            <h2 className="detail-section-title">Location</h2>
            <div className="map-section">
              <MapView
                places={mapPlaces}
                selectedPlace={selectedMapPlace}
                onSelectPlace={() => {}}
              />
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default EventDetailPage;
