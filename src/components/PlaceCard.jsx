import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function PlaceCard({ place, onClick, isSelected }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      if (!isAuthenticated) {
        setFavorite(false);
        return;
      }

      try {
        const res = await api.get("/favorites");
        const favoritePlaces = res.data.places || [];
        setFavorite(favoritePlaces.some((item) => item.id === place.id));
      } catch (error) {
        console.error("Error checking favorite:", error.response?.data || error);
      }
    };

    checkFavorite();
  }, [place.id, isAuthenticated]);

  const handleCardClick = () => {
    if (onClick) onClick();
    navigate(`/place/${place.id}`);
  };

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      if (favorite) {
        await api.delete(`/favorites/places/${place.id}`);
        setFavorite(false);
      } else {
        await api.post(`/favorites/places/${place.id}`);
        setFavorite(true);
      }
    } catch (error) {
      console.error("Error updating favorite:", error.response?.data || error);
    }
  };

  return (
    <div
      className={`card place-card ${isSelected ? "card-selected" : ""}`}
      onClick={handleCardClick}
    >
      <div className="card-image">
        <img src={place.image} alt={place.name} />
        <button className="favorite-btn" onClick={handleFavoriteClick}>
          {favorite ? "❤" : "♡"}
        </button>
      </div>

      <div className="card-content">
        <div className="card-top">
          <h3>{place.name}</h3>
          <span className="badge">{place.category}</span>
        </div>

        <p className="card-description">{place.description}</p>

        <div className="card-meta">
          <span>📍 {place.region}</span>
          <span>💰 {place.price}</span>
        </div>

        <div className="audience">
          {place.audience?.map((item, index) => (
            <span className="chip" key={index}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlaceCard;
