import type { InfrastructureItem, Project } from "../data/infrastructureData";
import { analyzeSpatialConflicts } from "./spatialAnalyzer";

export function analyzeInfrastructure(
  project: Project,
  infrastructure: InfrastructureItem[],
) {
  const conflicts = analyzeSpatialConflicts(project, infrastructure);
  const severityScore = { LOW: 25, MODERATE: 50, HIGH: 75, CRITICAL: 100 };
  const score = conflicts.length
    ? Math.round(
        conflicts.reduce((total, conflict) => total + severityScore[conflict.severity], 0) /
          conflicts.length,
      )
    : 0;

  const risk = score >= 80 ? "CRITICAL" : score >= 60 ? "HIGH" : score >= 30 ? "MODERATE" : "LOW";
  const affectedTypes = [...new Set(conflicts.map((conflict) => conflict.type))];

  return {
    projectId: project.id,
    risk,
    score,
    conflicts,
    conflictCount: conflicts.length,
    affectedTypes,
    recommendation:
      conflicts.length === 0
        ? "No significant infrastructure conflicts detected within the 60 m planning corridor."
        : "Coordinate overlapping utility and drainage works before construction to reduce repeated excavation and project disruption.",
  };
}
