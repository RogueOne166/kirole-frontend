import { Link } from "react-router-dom";

function Hero({ search, setSearch }) {
  return (
    <section className="hero">
      <p className="hero-kicker">Discover Mauritius</p>
      <h1>Find the best places <br /> and events around the <br /> 
      	<span className="hero-	  highlight"> island</span>
      </h1>
      <p className="hero-subtitle">
        Explore beaches, hikes, markets, food spots, and local events.
      </p>

      <div className="hero-actions">
        <Link to="/explore" className="btn-primary">
          Explore Places
        </Link>
        <Link to="/events" className="btn-secondary">
          See Events
        </Link>
      </div>

      <div className="hero-search">
        <input
          type="text"
          placeholder="Search places..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </section>
  );
}

export default Hero;
