import {
  booleanIntersects,
  buffer,
  distance,
  lineString,
  nearestPointOnLine,
  point,
} from "@turf/turf";
import type { InfrastructureItem, Project } from "../data/infrastructureData";

export type ConflictSeverity = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

export type InfrastructureConflict = {
  infrastructureId: string;
  infrastructureName: string;
  type: InfrastructureItem["type"];
  distanceMeters: number;
  severity: ConflictSeverity;
};

const SEVERITY_ORDER: Record<ConflictSeverity, number> = {
  LOW: 1,
  MODERATE: 2,
  HIGH: 3,
  CRITICAL: 4,
};

const toLineCoordinates = (coordinates: [number, number][]) =>
  coordinates.map(([lat, lng]) => [lng, lat]);

function getSeverity(distanceMeters: number): ConflictSeverity {
  if (distanceMeters <= 15) return "CRITICAL";
  if (distanceMeters <= 30) return "HIGH";
  return "MODERATE";
}

function minimumLineDistanceMeters(
  projectLine: ReturnType<typeof lineString>,
  projectGeometry: [number, number][],
  infrastructureLine: ReturnType<typeof lineString>,
  infrastructureGeometry: [number, number][],
) {
  if (booleanIntersects(projectLine, infrastructureLine)) return 0;

  const distances = [
    ...projectGeometry.map(([lat, lng]) => {
      const projectPoint = point([lng, lat]);
      const nearest = nearestPointOnLine(infrastructureLine, projectPoint);
      return distance(projectPoint, nearest, { units: "meters" });
    }),
    ...infrastructureGeometry.map(([lat, lng]) => {
      const infrastructurePoint = point([lng, lat]);
      const nearest = nearestPointOnLine(projectLine, infrastructurePoint);
      return distance(infrastructurePoint, nearest, { units: "meters" });
    }),
  ];

  return Math.min(...distances);
}

/**
 * Finds utilities that enter a configurable 60 m planning corridor around a
 * project and classifies them using prototype (not engineering) thresholds.
 */
export function analyzeSpatialConflicts(
  project: Project,
  infrastructure: InfrastructureItem[],
): InfrastructureConflict[] {
  const projectLine = lineString(toLineCoordinates(project.geometry));
  const projectBuffer = buffer(projectLine, 60, { units: "meters" });

  if (!projectBuffer) return [];

  const conflicts = infrastructure.flatMap((item) => {
    const infrastructureLine = lineString(toLineCoordinates(item.coordinates));

    if (!booleanIntersects(projectBuffer, infrastructureLine)) return [];

    const distanceMeters = minimumLineDistanceMeters(
      projectLine,
      project.geometry,
      infrastructureLine,
      item.coordinates,
    );

    return [{
      infrastructureId: item.id,
      infrastructureName: item.name,
      type: item.type,
      distanceMeters: Number(distanceMeters.toFixed(1)),
      severity: getSeverity(distanceMeters),
    }];
  });

  return conflicts.sort(
    (a, b) => SEVERITY_ORDER[b.severity] - SEVERITY_ORDER[a.severity],
  );
}
