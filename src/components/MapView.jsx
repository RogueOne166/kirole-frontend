import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function FlyToPlace({ selectedPlace }) {
  const map = useMap();

  useEffect(() => {
    if (selectedPlace) {
      map.flyTo([selectedPlace.latitude, selectedPlace.longitude], 13, {
        duration: 1.5,
      });
    }
  }, [selectedPlace, map]);

  return null;
}

function MapView({ places = [], selectedPlace = null, onSelectPlace = () => {} }) {
  const center = [-20.2, 57.5];

  return (
    <MapContainer
      center={center}
      zoom={9}
      scrollWheelZoom={true}
      style={{ height: "460px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FlyToPlace selectedPlace={selectedPlace} />

      {Array.isArray(places) &&
        places.filter(Boolean).map((place) => (
          <Marker
            key={place.id}
            position={[place.latitude, place.longitude]}
            eventHandlers={{
              click: () => onSelectPlace(place),
            }}
          >
            <Popup>
              <strong>{place.name}</strong>
              <br />
              {place.category}
              <br />
              {place.region}
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}

export default MapView;
