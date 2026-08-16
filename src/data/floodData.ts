export type RiskLevel = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

export type FloodZone = {
  id: string;
  name: string;
  center: [number, number];
  radiusMeters: number;
  risk: RiskLevel;
};

export type FloodLocation = {
  id: string;
  name: string;
  coordinates: [number, number];
  elevationMeters: number;
  drainageCapacity: number;
  historicalRisk: number;
  baselineRainfall: number;
};

export type WeatherScenario = {
  id: string;
  label: string;
  rainfallMultiplier: number;
};

export const floodLocations: FloodLocation[] = [
  { id: "wardha", name: "Manish Nagar Underpass", coordinates: [21.0926253, 79.0707713], elevationMeters: 294, drainageCapacity: 46, historicalRisk: 68, baselineRainfall: 48 },
  { id: "central", name: "Central Basin", coordinates: [21.145, 79.073], elevationMeters: 286, drainageCapacity: 32, historicalRisk: 86, baselineRainfall: 52 },
  { id: "civil", name: "Civil Lines", coordinates: [21.1458, 79.0806], elevationMeters: 310, drainageCapacity: 74, historicalRisk: 26, baselineRainfall: 38 },
];

export const floodZones: FloodZone[] = [
  { id: "zone-a", name: "Zone A · North", center: [21.156, 79.064], radiusMeters: 850, risk: "MODERATE" },
  { id: "zone-b", name: "Zone B · Central Basin", center: [21.145, 79.073], radiusMeters: 1050, risk: "CRITICAL" },
  { id: "zone-c", name: "Zone C · South", center: [21.128, 79.058], radiusMeters: 900, risk: "LOW" },
  { id: "zone-d", name: "Manish Nagar underpass corridor", center: [21.0926253, 79.0707713], radiusMeters: 700, risk: "HIGH" },
];

export const weatherScenarios: WeatherScenario[] = [
  { id: "normal", label: "Normal monsoon", rainfallMultiplier: 1 },
  { id: "heavy", label: "Heavy rainfall event", rainfallMultiplier: 1.35 },
  { id: "reduced", label: "Reduced rainfall window", rainfallMultiplier: 0.65 },
];
