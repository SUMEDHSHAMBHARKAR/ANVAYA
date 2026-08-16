import { Link } from "react-router-dom";
import { ArrowRight, MapPinned } from "lucide-react";
import { Card, SectionHeader } from "../components/UI";
import { FloodRiskMap } from "../components/map/FloodRiskMap";
import { floodLocations, floodZones } from "../data/floodData";

const modules = [
  ["01", "Infrastructure Planner", "Identify infrastructure conflicts before construction.", "/infrastructure"],
  ["02", "Flood Predictor", "Estimate flood and waterlogging risk.", "/flood"],
  ["03", "Decision Engine", "Combine both signals into an actionable recommendation.", "/decision"],
] as const;

export const Overview = () => (
  <div className="home-page">
    <section className="home-hero">
      <div className="hero-copy">
        <p className="eyebrow">AI ALCHEMISTS · OPEN INNOVATION FOR VIKSIT NAGPUR</p>
        <h1>ANVAYA</h1>
        <h2>Urban Infrastructure &amp; Climate Resilience Intelligence</h2>
        <p className="hero-lead">Connect infrastructure planning with environmental risk intelligence.</p>
        <p className="hero-statement">Plan better. Predict earlier. Build resiliently.</p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/infrastructure">Open Infrastructure Planner <ArrowRight size={16} /></Link>
          <Link className="btn btn-secondary" to="/flood">Explore Flood Predictor</Link>
        </div>
      </div>
      <Card className="home-map-card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="map-card-header"><MapPinned size={16} /> Nagpur resilience context</div>
        <div className="home-map"><FloodRiskMap location={floodLocations[0]} zones={floodZones} /></div>
      </Card>
    </section>

    <section className="home-concept">
      <SectionHeader title="Connected city intelligence" subtitle="Cities are interconnected systems." />
      <p>Roads, water, sewer, drainage, weather and construction cannot be planned independently. ANVAYA brings these signals into one practical, map-led workflow for municipal engineering decisions.</p>
    </section>

    <section className="module-grid">
      {modules.map(([number, title, description, path]) => (
        <Link className="module-card" to={path} key={number}>
          <span>{number}</span><h3>{title}</h3><p>{description}</p><ArrowRight size={17} />
        </Link>
      ))}
    </section>
  </div>
);
