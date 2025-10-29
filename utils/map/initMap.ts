import L from "leaflet";

export const initMap = (id: string, center: L.LatLngExpression) => {
  /* Set User Location */
  const map = L.map(id).setView(center, 20);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
    minZoom: 17,
  }).addTo(map);
  return map;
};