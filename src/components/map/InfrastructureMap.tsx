import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import { useEffect } from "react";

import "leaflet/dist/leaflet.css";
import "./leafletConfig";

import type { InfrastructureItem, Project, RoadSegment } from "../../data/infrastructureData";

interface InfrastructureMapProps {
  project?: Project;
  infrastructure: InfrastructureItem[];
  roads?: RoadSegment[];
  conflictIds?: string[];
}

const layerStyles = {
  sewer: {
    color: "#7C5CFC",
    weight: 4,
  },
  water: {
    color: "#2B7FFF",
    weight: 4,
  },
  stormwater: {
    color: "#147D78",
    weight: 4,
  },
};

function RecenterMap({ coordinates }: { coordinates: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coordinates, 13);
  }, [coordinates, map]);
  return null;
}

function InfrastructureMap({
  project,
  infrastructure,
  roads = [],
  conflictIds = [],
}: InfrastructureMapProps) {
  const defaultCenter: [number, number] = [21.1368, 79.0611];

  return (
    <div className="leaflet-map-shell">
    <MapContainer center={project?.coordinates ?? defaultCenter} zoom={13} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
      {project && <RecenterMap coordinates={project.coordinates} />}
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {roads.map((road) => (
        <Polyline key={road.id} positions={road.coordinates} pathOptions={{ color: "#8A9591", weight: 3, opacity: 0.65, dashArray: "7 5" }}>
          <Popup><strong>{road.name}</strong><br />Road reference layer</Popup>
        </Polyline>
      ))}

      {infrastructure.map((item) => {
        const isConflict = conflictIds.includes(item.id);
        return (
          <Polyline
            key={item.id}
            positions={item.coordinates}
            pathOptions={isConflict ? { color: "#C74444", weight: 7, opacity: 0.95 } : { ...layerStyles[item.type], opacity: 0.6 }}
          >
          <Popup>
            <strong>{item.name}</strong>
            <br />
            Type: {item.type}{isConflict && " — conflict detected"}
          </Popup>
          </Polyline>
        );
      })}

      {project && (
        <>
          <Polyline positions={project.geometry} pathOptions={{ color: "#0F3D3E", weight: 7, opacity: 0.95 }} />
          <Marker position={project.coordinates}>
            <Popup>
              <strong>{project.name}</strong>
              <br />
              {project.location}
            </Popup>
          </Marker>
        </>
      )}
    </MapContainer>
      <div className="map-legend" aria-label="Infrastructure layer legend">
        <span><i style={{ background: "#0F3D3E" }} />Proposed corridor</span>
        <span><i style={{ background: "#8A9591" }} />Roads</span>
        <span><i style={{ background: "#7C5CFC" }} />Sewer</span>
        <span><i style={{ background: "#2B7FFF" }} />Water</span>
        <span><i style={{ background: "#147D78" }} />Stormwater</span>
        <span><i style={{ background: "#C74444" }} />Conflict</span>
      </div>
    </div>
  );
}

export default InfrastructureMap;
