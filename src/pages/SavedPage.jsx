import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import SectionHeader from "../components/SectionHeader";
import PlaceCard from "../components/PlaceCard";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

function SavedPage() {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchSavedPlaces = async () => {
      if (!isAuthenticated) {
        setPlaces([]);
        return;
      }

      try {
        const res = await api.get("/favorites");

        // Supports both:
        // 1) { places: [...] }
        // 2) plain array [...]
        const favoritePlaces = Array.isArray(res.data)
          ? res.data
          : res.data.places || [];

        setPlaces(favoritePlaces);
      } catch (error) {
        console.error("Error fetching saved places:", error.response?.data || error);
        setPlaces([]);
      }
    };

    fetchSavedPlaces();
  }, [isAuthenticated]);

  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content page-top-spacing">
        <SectionHeader
          title="Saved Places"
          subtitle="Your favorite spots in Mauritius."
        />

        <section className="section">
          {!isAuthenticated ? (
            <p>
              Please{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  color: "inherit",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                log in
              </button>{" "}
              to view your saved places.
            </p>
          ) : (
            <div className="card-grid">
              {places.length > 0 ? (
                places.map((place) => <PlaceCard key={place._id} place={place} />)
              ) : (
                <p>You haven’t saved any places yet.</p>
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default SavedPage;
