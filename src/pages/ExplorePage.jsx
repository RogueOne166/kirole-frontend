import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import MapView from "../components/MapView";
import SectionHeader from "../components/SectionHeader";
import PlaceCard from "../components/PlaceCard";
import CategoryList from "../components/CategoryList";
import RegionList from "../components/RegionList";
import Footer from "../components/Footer";

function ExplorePage() {
  const [places, setPlaces] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [sortBy, setSortBy] = useState("featured");
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await api.get("/places");
        setPlaces(Array.isArray(res.data) ? res.data : res.data.data || []);
      } catch (error) {
        console.error("Error fetching places:", error);
        setPlaces([]);
      }
    };

    fetchPlaces();
  }, []);

  const categories = useMemo(() => {
    return [...new Set(places.map((place) => place.category).filter(Boolean))];
  }, [places]);

  const regions = useMemo(() => {
    return [...new Set(places.map((place) => place.region).filter(Boolean))];
  }, [places]);

  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      const matchesCategory =
        selectedCategory === "All" || place.category === selectedCategory;

      const matchesRegion =
        selectedRegion === "All" || place.region === selectedRegion;

      const matchesSearch = (place.name || "")
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesRegion && matchesSearch;
    });
  }, [places, selectedCategory, selectedRegion, search]);

  const sortedPlaces = useMemo(() => {
    const sorted = [...filteredPlaces];

    if (sortBy === "az") {
      sorted.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    } else if (sortBy === "free") {
      sorted.sort((a, b) => {
        const aFree = a.price?.toLowerCase() === "free" ? 0 : 1;
        const bFree = b.price?.toLowerCase() === "free" ? 0 : 1;
        return aFree - bFree;
      });
    } else if (sortBy === "featured") {
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    return sorted;
  }, [filteredPlaces, sortBy]);

  useEffect(() => {
    setVisibleCount(6);
  }, [search, selectedCategory, selectedRegion, sortBy]);

  const visiblePlaces = useMemo(() => {
    return sortedPlaces.slice(0, visibleCount);
  }, [sortedPlaces, visibleCount]);

  const hasMore = visibleCount < sortedPlaces.length;

  const handleResetFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedRegion("All");
    setSortBy("featured");
    setSelectedPlace(null);
    setVisibleCount(6);
  };

  const filtersAreActive =
    search !== "" ||
    selectedCategory !== "All" ||
    selectedRegion !== "All" ||
    sortBy !== "featured";

  const activeFilters = [
    ...(search
      ? [
          {
            key: "search",
            label: `Search: ${search}`,
            onRemove: () => setSearch(""),
          },
        ]
      : []),
    ...(selectedCategory !== "All"
      ? [
          {
            key: "category",
            label: selectedCategory,
            onRemove: () => setSelectedCategory("All"),
          },
        ]
      : []),
    ...(selectedRegion !== "All"
      ? [
          {
            key: "region",
            label: selectedRegion,
            onRemove: () => setSelectedRegion("All"),
          },
        ]
      : []),
    ...(sortBy !== "featured"
      ? [
          {
            key: "sort",
            label:
              sortBy === "az"
                ? "Sort: A–Z"
                : sortBy === "free"
                ? "Sort: Free first"
                : `Sort: ${sortBy}`,
            onRemove: () => setSortBy("featured"),
          },
        ]
      : []),
  ];

  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content page-top-spacing">
        <SectionHeader
          title="Explore Places"
          subtitle="Browse all places around Mauritius."
        />

        <div className="explore-layout">
          <div className="explore-sidebar">
            <div className="explore-controls">
              <div className="page-search">
                <input
                  type="text"
                  placeholder="Search places..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="sort-row">
                <label htmlFor="sort-select">Sort by</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured first</option>
                  <option value="az">A–Z</option>
                  <option value="free">Free first</option>
                </select>
              </div>

              <section className="section">
                <CategoryList
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              </section>

              <section className="section">
                <RegionList
                  regions={regions}
                  selectedRegion={selectedRegion}
                  onSelectRegion={setSelectedRegion}
                />
              </section>

              {activeFilters.length > 0 && (
                <div className="active-filters-wrap">
                  <div className="active-filters-list">
                    {activeFilters.map((filter) => (
                      <button
                        key={filter.key}
                        className="active-filter-chip"
                        onClick={filter.onRemove}
                      >
                        <span>{filter.label}</span>
                        <span className="active-filter-close">×</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filtersAreActive && (
                <div className="reset-filters-wrap">
                  <button
                    className="reset-filters-btn"
                    onClick={handleResetFilters}
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="explore-map-panel">
            <div className="map-section explore-map-sticky">
              <MapView
                places={sortedPlaces}
                selectedPlace={selectedPlace}
                onSelectPlace={setSelectedPlace}
              />
            </div>
          </div>
        </div>

        <section className="explore-results-section">
          <div className="results-count">
            {sortedPlaces.length} place{sortedPlaces.length !== 1 ? "s" : ""} found
          </div>

          <div className="card-grid explore-card-grid">
            {visiblePlaces.length > 0 ? (
              visiblePlaces.map((place) => (
                <PlaceCard
                  key={place._id}
                  place={place}
                  isSelected={selectedPlace?._id === place._id}
                  onClick={() => setSelectedPlace(place)}
                />
              ))
            ) : (
              <p className="empty-state">
                No places match your search and filters.
              </p>
            )}
          </div>

          {hasMore && (
            <div className="load-more-wrap">
              <button
                className="load-more-btn"
                onClick={() => setVisibleCount((prev) => prev + 6)}
              >
                Load more
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ExplorePage;
