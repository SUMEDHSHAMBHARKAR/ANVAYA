import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import type { FloodLocation, FloodZone, RiskLevel } from "../../data/floodData";
import "leaflet/dist/leaflet.css";
import "./leafletConfig";

const riskColors: Record<RiskLevel, string> = {
  LOW: "#2E8B57",
  MODERATE: "#C89B2C",
  HIGH: "#D97732",
  CRITICAL: "#C74444",
};

export function FloodRiskMap({ location, zones }: { location: FloodLocation; zones: FloodZone[] }) {
  return (
    <div className="leaflet-map-shell">
      <MapContainer center={location.coordinates} zoom={12} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
        <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {zones.map((zone) => (
          <Circle key={zone.id} center={zone.center} radius={zone.radiusMeters} pathOptions={{ color: riskColors[zone.risk], fillColor: riskColors[zone.risk], fillOpacity: 0.26, weight: 2 }}>
            <Popup><strong>{zone.name}</strong><br />{zone.risk} flood-risk zone</Popup>
          </Circle>
        ))}
        <Marker position={location.coordinates}><Popup><strong>{location.name}</strong><br />Selected assessment location</Popup></Marker>
      </MapContainer>
      <div className="map-legend" aria-label="Flood risk legend">
        {Object.entries(riskColors).map(([risk, color]) => <span key={risk}><i style={{ background: color }} />{risk}</span>)}
      </div>
    </div>
  );
}
