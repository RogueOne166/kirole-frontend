import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MapView from "../components/MapView";
import SectionHeader from "../components/SectionHeader";
import PlaceCard from "../components/PlaceCard";
import EventCard from "../components/EventCard";
import CategoryList from "../components/CategoryList";
import RegionList from "../components/RegionList";
import Footer from "../components/Footer";

function HomePage() {
  const [places, setPlaces] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const placesRes = await api.get("/places");
        const eventsRes = await api.get("/events");

        setPlaces(placesRes.data.data);
        setEvents(eventsRes.data.data);
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      }
    };

    fetchData();
  }, []);

  const categories = useMemo(() => {
    return [...new Set(places.map((place) => place.category))];
  }, [places]);

  const regions = useMemo(() => {
    return [...new Set(places.map((place) => place.region))];
  }, [places]);

  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      const matchesCategory =
        selectedCategory === "All" || place.category === selectedCategory;

      const matchesRegion =
        selectedRegion === "All" || place.region === selectedRegion;

      const matchesSearch =
        place.name.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesRegion && matchesSearch;
    });
  }, [places, selectedCategory, selectedRegion, search]);

  const featuredPlaces = useMemo(() => {
    return filteredPlaces.filter((place) => place.featured).slice(0, 4);
  }, [filteredPlaces]);

  const upcomingEvents = useMemo(() => {
    return events.slice(0, 4);
  }, [events]);

  return (
    <div className="app-shell">
      <Navbar />
      <Hero search={search} setSearch={setSearch} />

      <main className="main-content">
        <section id="map" className="section">
          <SectionHeader
            title="Explore Mauritius"
            subtitle="Browse the island through the interactive map."
          />
          <div className="map-section">
            <MapView 
            	places={filteredPlaces} 
            	selectedPlace={selectedPlace}
            	onSelectPlace={setSelectedPlace}
             />
          </div>
        </section>

        <section className="section">
          <SectionHeader
            title="Browse by Category"
            subtitle="Quick ways to explore what interests you."
          />
          <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </section>

        <section className="section">
          <SectionHeader
            title="Explore by Region"
            subtitle="Find spots based on where you want to go."
          />
          <RegionList
            regions={regions}
            selectedRegion={selectedRegion}
            onSelectRegion={setSelectedRegion}
          />
        </section>

        <section id="featured" className="section">
          <SectionHeader
            title="Featured Places"
            subtitle="Handpicked locations to discover this week."
          />
          <div className="card-grid">
            {featuredPlaces.length > 0 ? (
              featuredPlaces.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  isSelected={selectedPlace?.id === place.id}
                  onClick={() => setSelectedPlace(place)}
                />
              ))
            ) : (
              <p>No featured places match your filters.</p>
            )}
          </div>
        </section>

        <section id="events" className="section">
          <SectionHeader
            title="Upcoming Events"
            subtitle="What’s happening around Mauritius."
          />
          <div className="card-grid">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;
