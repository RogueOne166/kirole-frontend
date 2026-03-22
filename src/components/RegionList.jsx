function RegionList({ regions, selectedRegion, onSelectRegion }) {
  return (
    <div className="pill-list">
      <button
        className={`pill ${selectedRegion === "All" ? "pill-active" : ""}`}
        onClick={() => onSelectRegion("All")}
      >
        All
      </button>

      {regions.map((region) => (
        <button
          key={region}
          className={`pill ${selectedRegion === region ? "pill-active" : ""}`}
          onClick={() => onSelectRegion(region)}
        >
          {region}
        </button>
      ))}
    </div>
  );
}

export default RegionList;
