import { useNavigate } from "react-router-dom";

function EventCard({ event }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/event/${event.id}`);
  };

  return (
    <div className="card place-card" onClick={handleClick}>
      <div className="card-image">
        <img src={event.image} alt={event.name || event.title} />
      </div>

      <div className="card-content">
        <div className="card-top">
          <h3>{event.name || event.title}</h3>
          <span className="badge">{event.category || "event"}</span>
        </div>

        <p className="card-description">{event.description}</p>

        <div className="card-meta">
          {event.region && <span>📍 {event.region}</span>}
          {event.date && <span>📅 {event.date}</span>}
          {event.price && <span>💰 {event.price}</span>}
        </div>

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
    </div>
  );
}

export default EventCard;
