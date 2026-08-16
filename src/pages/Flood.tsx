import { useMemo, useState } from "react";
import { CloudRain, Info } from "lucide-react";
import { Badge, Card, Metric, SectionHeader } from "../components/UI";
import { FloodRiskMap } from "../components/map/FloodRiskMap";
import { floodLocations, floodZones } from "../data/floodData";
import { predictFloodRisk } from "../services/floodPredictor";

export const Flood = () => {
  const [locationId, setLocationId] = useState(floodLocations[0].id);
  const location = floodLocations.find((item) => item.id === locationId) ?? floodLocations[0];
  const [rainfall, setRainfall] = useState(location.baselineRainfall);
  const prediction = useMemo(() => predictFloodRisk(location, rainfall), [location, rainfall]);

  return <div className="page-grid flood-grid">
    <div className="panel">
      <SectionHeader title="Flood Predictor" subtitle="Location-specific waterlogging decision support" />
      <Card title="Assessment inputs" subtitle="Prototype synthetic data">
        <div className="form-stack">
          <label className="field-label" htmlFor="flood-location">Location</label>
          <select id="flood-location" className="input-base" value={locationId} onChange={(event) => { const next = floodLocations.find((item) => item.id === event.target.value); setLocationId(event.target.value); if (next) setRainfall(next.baselineRainfall); }}>
            {floodLocations.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
          <div className="range-row"><label htmlFor="rainfall">Rainfall intensity</label><strong>{rainfall} mm/hr</strong></div>
          <input id="rainfall" type="range" min="0" max="100" value={rainfall} onChange={(event) => setRainfall(Number(event.target.value))} />
          <div className="input-facts"><span>Elevation <strong>{location.elevationMeters} m</strong></span><span>Drainage <strong>{location.drainageCapacity}%</strong></span><span>Historic risk <strong>{location.historicalRisk}%</strong></span></div>
        </div>
      </Card>
      <Card title="Flood risk assessment">
        <div className="score-row"><Metric label="Flood Risk Score" value={prediction.score} /><Badge className={`risk-${prediction.risk.toLowerCase()}`}>{prediction.risk}</Badge></div>
        <h4 className="subsection-label">Contributing factors</h4>
        <div className="factor-list">{prediction.factors.map((factor) => <div key={factor.label}><span>{factor.label}<small>{factor.value}</small></span><strong>{factor.contribution}</strong></div>)}</div>
        <p className="prototype-note"><Info size={14} />{prediction.disclaimer}</p>
      </Card>
    </div>
    <div className="panel">
      <Card className="map-wrapper" style={{ height: "100%", minHeight: "650px", padding: 0, overflow: "hidden" }}>
        <div className="map-titlebar"><span><CloudRain size={16} /> Flood inundation risk zones</span><small>Prototype risk layer</small></div>
        <div className="map-fill"><FloodRiskMap location={location} zones={floodZones} /></div>
      </Card>
    </div>
  </div>;
};
