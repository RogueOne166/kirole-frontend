import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import SectionHeader from "../components/SectionHeader";
import PlaceCard from "../components/PlaceCard";
import Footer from "../components/Footer";

function FeaturedPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await api.get("/places");
        const placesData = Array.isArray(res.data)
          ? res.data
          : res.data?.data || [];

        setPlaces(placesData);
      } catch (error) {
        console.error("Error fetching featured places:", error);
        setPlaces([]);
      }
    };

    fetchPlaces();
  }, []);

  const featuredPlaces = useMemo(() => {
    return places.filter((place) => place.featured);
  }, [places]);

  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content page-top-spacing">
        <SectionHeader
          title="Featured Places"
          subtitle="Handpicked spots worth discovering."
        />

        <section className="section">
          <div className="card-grid">
            {featuredPlaces.length > 0 ? (
              featuredPlaces.map((place) => (
                <PlaceCard key={place._id} place={place} />
              ))
            ) : (
              <p>No featured places found.</p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default FeaturedPage;
