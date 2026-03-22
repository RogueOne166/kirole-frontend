import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import SectionHeader from "../components/SectionHeader";
import PlaceCard from "../components/PlaceCard";
import Footer from "../components/Footer";

function SavedPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchSavedPlaces = async () => {
      try {
        const res = await api.get("/users/favorites");
        setPlaces(Array.isArray(res.data) ? res.data : res.data.data || []);
      } catch (error) {
        console.error("Error fetching saved places:", error);
        setPlaces([]);
      }
    };

    fetchSavedPlaces();
  }, []);

  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content page-top-spacing">
        <SectionHeader
          title="Saved Places"
          subtitle="Your favorite spots in Mauritius."
        />

        <section className="section">
          <div className="card-grid">
            {places.length > 0 ? (
              places.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))
            ) : (
              <p>You haven’t saved any places yet.</p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default SavedPage;
