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
        setPlaces(res.data.data);
      } catch (error) {
        console.error("Error fetching featured places:", error);
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
            {featuredPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default FeaturedPage;
