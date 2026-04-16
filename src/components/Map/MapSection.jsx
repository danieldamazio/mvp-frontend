import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export function MapSection({ mapPoints }) {
  useEffect(() => {
    const map = L.map("map").setView([-22.445, -43.0], 11);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    const getCategoryStyle = (category) => {
      const styles = {
        acesso: { color: "#8a5a2b", radius: 8, layer: "Acessos principais" },
        parque: { color: "#1e8f4b", radius: 8, layer: "Parques" },
        pico_parnaso: { color: "#226aa0", radius: 7, layer: "Picos do PARNASO" }
      };
      return styles[category] || { color: "#7a2f8f", radius: 7, layer: "Montanhas e mirantes locais" };
    };

    mapPoints.forEach((point) => {
      const style = getCategoryStyle(point.category);
      L.circleMarker([point.lat, point.lng], {
        radius: style.radius,
        color: style.color,
        fillColor: style.color,
        fillOpacity: 0.85,
        weight: 1
      })
      .bindPopup(`<strong>${point.name}</strong><br>${point.address}`)
      .addTo(map);
    });

    return () => map.remove();
  }, [mapPoints]);

  return (
    <section id="mapa" className="section">
      <h2>Mapa interativo da região</h2>
      <div className="map-wrap card">
        <div id="map" style={{ height: '500px' }}></div>
      </div>
    </section>
  );
}