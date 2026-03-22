export function getFavorites() {
  const stored = localStorage.getItem("favoritePlaces");
  return stored ? JSON.parse(stored) : [];
}

export function saveFavorites(favorites) {
  localStorage.setItem("favoritePlaces", JSON.stringify(favorites));
}

export function isFavorite(placeId) {
  const favorites = getFavorites();
  return favorites.includes(placeId);
}

export function toggleFavorite(placeId) {
  const favorites = getFavorites();

  if (favorites.includes(placeId)) {
    const updated = favorites.filter((id) => id !== placeId);
    saveFavorites(updated);
    return updated;
  }

  const updated = [...favorites, placeId];
  saveFavorites(updated);
  return updated;
}
