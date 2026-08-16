import type { FloodPrediction } from "./floodPredictor";
import type { Project } from "../data/infrastructureData";
import type { RiskLevel } from "../data/floodData";

export type DecisionResult = {
  score: number;
  risk: RiskLevel;
  timingRisk: number;
  reason: string;
  recommendation: string;
  actions: string[];
};

const riskFromScore = (score: number): RiskLevel =>
  score >= 80 ? "CRITICAL" : score >= 60 ? "HIGH" : score >= 35 ? "MODERATE" : "LOW";

const isMonsoonDate = (date: string) => {
  const month = new Date(`${date}T00:00:00`).getMonth();
  return month >= 5 && month <= 8;
};

export function createDecision(
  project: Project,
  infrastructureScore: number,
  flood: FloodPrediction,
  startDate: string,
  drainageMitigation: boolean,
): DecisionResult {
  const timingRisk = isMonsoonDate(startDate) ? 82 : 28;
  const mitigationAdjustment = drainageMitigation ? 12 : 0;
  const score = Math.max(0, Math.round(infrastructureScore * 0.38 + flood.score * 0.43 + timingRisk * 0.19 - mitigationAdjustment));
  const hasConflict = infrastructureScore >= 50;
  const monsoon = isMonsoonDate(startDate);

  return {
    score,
    risk: riskFromScore(score),
    timingRisk,
    reason: hasConflict && monsoon
      ? `${project.name} interacts with underground infrastructure while its planned construction period overlaps with elevated monsoon rainfall risk.`
      : hasConflict
        ? "The planned corridor interacts with existing underground infrastructure and needs coordinated construction sequencing."
        : monsoon
          ? "The proposed schedule overlaps with elevated monsoon rainfall risk despite limited utility conflict."
          : "Current prototype signals indicate a manageable construction scenario with standard coordination checks.",
    recommendation: score >= 60 ? "REPLAN PROJECT" : "PROCEED WITH CONDITIONS",
    actions: [
      "Coordinate sewer, water, and drainage work before final road restoration.",
      "Maintain drainage flow and safe access throughout construction.",
      monsoon ? "Shift excavation outside the high-risk rainfall period where feasible." : "Confirm the drainage protection plan before mobilisation.",
      "Recalculate after any schedule or mitigation adjustment.",
    ],
  };
}
