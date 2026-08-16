import { useMemo, useState } from "react";
import { Badge, Button, Card, SectionHeader } from "../components/UI";
import { projects, infrastructure, roadNetwork } from "../data/infrastructureData";
import InfrastructureMap from "../components/map/InfrastructureMap";
import { analyzeInfrastructure } from "../services/infrastructureAnalyzer";

export const Infrastructure = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);
  const [analysis, setAnalysis] = useState<ReturnType<
    typeof analyzeInfrastructure
  > | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId),
    [selectedProjectId],
  );

  const handleAnalyze = () => {
    if (!selectedProject) return;

    try {
      const result = analyzeInfrastructure(selectedProject, infrastructure);
      setAnalysis(result);
      setAnalysisError(null);
    } catch {
      setAnalysis(null);
      setAnalysisError("The prototype spatial analysis could not be completed. Please try again.");
    }
  };

  return (
    <div className="page-grid">
      {/* LEFT PANEL */}
      <div className="panel">
        <SectionHeader
          title="Infrastructure Planner"
          subtitle="Evaluate infrastructure conflicts before construction."
        />

        <Card title="Project">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginTop: "12px",
            }}
          >
            <div>
              <label className="field-label">Proposed Project</label>

              <select
                className="input"
                value={selectedProjectId}
                onChange={(event) => {
                  setSelectedProjectId(event.target.value);
                  setAnalysis(null);
                  setAnalysisError(null);
                }}
              >
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedProject && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  fontSize: "13px",
                }}
              >
                <div className="project-meta">
                  <span>Project ID</span>
                  <strong>{selectedProject.id}</strong>
                </div>

                <div className="project-meta">
                  <span>Type</span>
                  <strong>{selectedProject.type}</strong>
                </div>

                <div className="project-meta">
                  <span>Location</span>
                  <strong>{selectedProject.location}</strong>
                </div>

                <div className="project-meta">
                  <span>Start Date</span>
                  <strong>{selectedProject.startDate}</strong>
                </div>

                <div className="project-meta">
                  <span>Duration</span>
                  <strong>{selectedProject.duration} days</strong>
                </div>
              </div>
            )}

            <Button variant="primary" onClick={handleAnalyze}>
              Analyze Project
            </Button>
          </div>
        </Card>

        {analysis && (
          <Card
            title="Infrastructure Analysis"
            subtitle="Detected conflicts around the proposed project."
          >
            <div style={{ marginTop: "12px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "18px",
                }}
              >
                <span style={{ fontSize: "13px", color: "var(--muted)" }}>
                  Overall Infrastructure Risk
                </span>

                <Badge
                  className={
                    analysis.risk === "HIGH"
                      ? "risk-high"
                      : analysis.risk === "MODERATE"
                        ? "risk-moderate"
                        : "risk-low"
                  }
                >
                  {analysis.risk}
                </Badge>
              </div>

              <div className="conflict-summary">
                {analysis.conflictCount} conflict{analysis.conflictCount === 1 ? "" : "s"} detected within the 60 m planning corridor.
              </div>

              {analysis.conflicts.length > 0 && (
                <div className="risk-list">
                  {analysis.conflicts.map((conflict) => (
                    <div className="risk-row conflict-row" key={conflict.infrastructureId}>
                      <div>
                        <strong>{conflict.infrastructureName}</strong>
                        <span>{conflict.distanceMeters} m from corridor · {conflict.type}</span>
                      </div>
                      <Badge className={`risk-${conflict.severity.toLowerCase()}`}>
                        {conflict.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}

              <div
                style={{
                  marginTop: "20px",
                  padding: "14px",
                  borderRadius: "10px",
                  background: "var(--surface-muted)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--muted)",
                    marginBottom: "6px",
                  }}
                >
                  ANVAYA Recommendation
                </div>

                <div style={{ fontSize: "13px", lineHeight: 1.6 }}>
                  {analysis.recommendation}
                </div>
              </div>

              {analysis.affectedTypes.length > 0 && (
                <div className="dig-once">
                  <div className="dig-once-title">Dig Once</div>
                  <p>{analysis.affectedTypes.length} infrastructure system{analysis.affectedTypes.length === 1 ? "" : "s"} intersect the proposed work corridor.</p>
                  <div className="dig-once-types">{analysis.affectedTypes.join(" · ")}</div>
                  <p>Execute coordinated utility work first, followed by final road restoration.</p>
                  <div className="dig-once-flow">
                    <div><strong>Current</strong><span>Road → utility repair → road → utility repair</span></div>
                    <div className="flow-arrow">→</div>
                    <div><strong>ANVAYA</strong><span>Utilities → single work window → final road restoration</span></div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}
        {analysisError && <div className="analysis-error" role="alert">{analysisError}</div>}
      </div>

      {/* MAP */}
      <div className="panel">
        <Card
          className="map-wrapper"
          style={{
            height: "100%",
            minHeight: "650px",
            padding: 0,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <h3 className="card-title" style={{ margin: 0 }}>
              Nagpur Infrastructure Map
            </h3>

            <div
              style={{
                marginTop: "4px",
                fontSize: "12px",
                color: "var(--muted)",
              }}
            >
              Prototype infrastructure dataset
            </div>
          </div>

          <div style={{ height: "calc(100% - 73px)" }}>
            <InfrastructureMap
              project={selectedProject}
              infrastructure={infrastructure}
              roads={roadNetwork}
              conflictIds={analysis?.conflicts.map((conflict) => conflict.infrastructureId)}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};
