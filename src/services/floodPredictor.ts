import type { FloodLocation, RiskLevel } from "../data/floodData";

export type FloodPrediction = {
  score: number;
  risk: RiskLevel;
  rainfall: number;
  factors: { label: string; value: string; contribution: number }[];
  disclaimer: string;
};

const getRiskLevel = (score: number): RiskLevel =>
  score >= 80 ? "CRITICAL" : score >= 60 ? "HIGH" : score >= 35 ? "MODERATE" : "LOW";

/** Explainable prototype model, calibrated only for the demo dataset. */
export function predictFloodRisk(location: FloodLocation, rainfall: number, drainageMitigation = false): FloodPrediction {
  const rainfallExposure = Math.min(100, (rainfall / 80) * 100);
  const elevationExposure = Math.min(100, Math.max(0, (315 - location.elevationMeters) * 3.2));
  const drainageExposure = Math.max(0, 100 - location.drainageCapacity - (drainageMitigation ? 25 : 0));
  const score = Math.round(
    rainfallExposure * 0.36 + elevationExposure * 0.2 + drainageExposure * 0.24 + location.historicalRisk * 0.2,
  );

  return {
    score,
    risk: getRiskLevel(score),
    rainfall,
    factors: [
      { label: "Rainfall intensity", value: `${rainfall.toFixed(0)} mm/hr`, contribution: Math.round(rainfallExposure) },
      { label: "Site elevation", value: `${location.elevationMeters} m`, contribution: Math.round(elevationExposure) },
      { label: "Drainage capacity", value: `${drainageMitigation ? Math.min(100, location.drainageCapacity + 25) : location.drainageCapacity}%`, contribution: Math.round(drainageExposure) },
      { label: "Historical flood exposure", value: `${location.historicalRisk}%`, contribution: location.historicalRisk },
    ],
    disclaimer: "Prototype decision-support model using synthetic location data; not a production flood forecast.",
  };
}
