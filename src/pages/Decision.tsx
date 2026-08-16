import { useMemo, useState } from "react";
import { CheckCircle2, SlidersHorizontal } from "lucide-react";
import { Badge, Card, Metric, SectionHeader } from "../components/UI";
import { floodLocations } from "../data/floodData";
import { infrastructure, projects } from "../data/infrastructureData";
import { createDecision } from "../services/decisionEngine";
import { predictFloodRisk } from "../services/floodPredictor";
import { analyzeInfrastructure } from "../services/infrastructureAnalyzer";

export const Decision = () => {
  const [projectId, setProjectId] = useState(projects[0].id);
  const [multiplier, setMultiplier] = useState(1);
  const [startDate, setStartDate] = useState(projects[0].startDate);
  const [mitigation, setMitigation] = useState(false);
  const project = projects.find((item) => item.id === projectId) ?? projects[0];
  const location = floodLocations.find((item) => item.id === project.floodLocationId) ?? floodLocations[0];
  const infrastructureResult = useMemo(() => analyzeInfrastructure(project, infrastructure), [project]);
  const flood = useMemo(() => predictFloodRisk(location, location.baselineRainfall * multiplier, mitigation), [location, multiplier, mitigation]);
  const decision = useMemo(() => createDecision(project, infrastructureResult.score, flood, startDate, mitigation), [project, infrastructureResult.score, flood, startDate, mitigation]);

  return <div className="decision-page">
    <SectionHeader title="ANVAYA Decision Engine" subtitle="Combined infrastructure, flood, timing and scenario intelligence" />
    <div className="decision-grid">
      <section className="panel">
        <Card className="decision-hero">
          <p className="eyebrow">Overall project risk</p>
          <div className="decision-score"><strong>{decision.score}</strong><Badge className={`risk-${decision.risk.toLowerCase()}`}>{decision.risk}</Badge></div>
          <p>{decision.reason}</p>
          <div className="recommendation"><strong>{decision.recommendation}</strong><span>Decision-support recommendation</span></div>
        </Card>
        <Card title="Why this recommendation">
          <div className="signal-grid"><Metric label="Infrastructure Risk" value={infrastructureResult.score} /><Metric label="Flood Risk" value={flood.score} /><Metric label="Timing Risk" value={decision.timingRisk} /></div>
          <ol className="action-list">{decision.actions.map((action) => <li key={action}>{action}</li>)}</ol>
        </Card>
      </section>
      <aside className="panel">
        <Card title="What-if simulator" subtitle="Adjust a scenario and compare the result.">
          <div className="form-stack">
            <label className="field-label" htmlFor="decision-project">Project</label>
            <select id="decision-project" className="input-base" value={projectId} onChange={(event) => { const next = projects.find((item) => item.id === event.target.value); setProjectId(event.target.value); if (next) setStartDate(next.startDate); }}>{projects.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>
            <div className="linked-location"><span>Flood assessment location</span><strong>{location.name}</strong><small>Linked to selected project corridor</small></div>
            <div className="range-row"><label htmlFor="rainfall-multiplier">Rainfall multiplier</label><strong>{multiplier.toFixed(2)}×</strong></div>
            <input id="rainfall-multiplier" type="range" min="0.5" max="1.5" step="0.05" value={multiplier} onChange={(event) => setMultiplier(Number(event.target.value))} />
            <label className="field-label" htmlFor="project-date">Project start date</label>
            <input id="project-date" className="input-base" type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
            <label className="toggle-row"><input type="checkbox" checked={mitigation} onChange={(event) => setMitigation(event.target.checked)} /><span><CheckCircle2 size={16} />Drainage mitigation in place</span></label>
          </div>
        </Card>
        <Card title="Scenario outcome">
          <div className="scenario-result"><SlidersHorizontal size={18} /><div><small>Current simulation</small><strong>{decision.score} · {decision.risk}</strong></div></div>
          <p className="prototype-note">Move rainfall, timing or drainage controls to see the scenario update instantly.</p>
        </Card>
      </aside>
    </div>
  </div>;
};
