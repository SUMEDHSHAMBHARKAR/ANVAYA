export type Project = {
  id: string;
  name: string;
  type: string;
  location: string;
  coordinates: [number, number];
  geometry: [number, number][];
  startDate: string;
  duration: number;
  floodLocationId: string;
};

export type InfrastructureType =
  | "sewer"
  | "water"
  | "stormwater";

export type InfrastructureItem = {
  id: string;
  type: InfrastructureType;
  name: string;
  coordinates: [number, number][];
};

export type RoadSegment = {
  id: string;
  name: string;
  coordinates: [number, number][];
};

export const projects: Project[] = [
  {
    id: "P-104",
    name: "Manish Nagar Road Resurfacing",
    type: "Road Resurfacing",
    location: "Manish Nagar Underpass",
    coordinates: [21.0926253, 79.0707713],
    geometry: [
      [21.0890, 79.0670],
      [21.0926253, 79.0707713],
      [21.0960, 79.0740],
    ],
    startDate: "2026-09-15",
    duration: 20,
    floodLocationId: "wardha",
  },
  {
    id: "P-105",
    name: "Pratap Nagar Road Upgrade",
    type: "Road Upgrade",
    location: "Pratap Nagar",
    coordinates: [21.1216, 79.0615],
    geometry: [
      [21.1170, 79.0560],
      [21.1220, 79.0610],
      [21.1270, 79.0670],
    ],
    startDate: "2026-09-22",
    duration: 15,
    floodLocationId: "wardha",
  },
  {
    id: "P-106",
    name: "Civil Lines Drain Improvement",
    type: "Drain Improvement",
    location: "Civil Lines",
    coordinates: [21.1458, 79.0806],
    geometry: [
      [21.1410, 79.0750],
      [21.1460, 79.0800],
      [21.1510, 79.0860],
    ],
    startDate: "2026-10-05",
    duration: 12,
    floodLocationId: "civil",
  },
];

export const infrastructure: InfrastructureItem[] = [
  {
    id: "S-01",
    type: "sewer",
    name: "Sewer Line S-01",
    coordinates: [
      [21.0890, 79.0670],
      [21.0926253, 79.0707713],
      [21.0960, 79.0740],
    ],
  },
  {
    id: "S-02",
    type: "sewer",
    name: "Sewer Line S-02",
    coordinates: [
      [21.1180, 79.0550],
      [21.1220, 79.0600],
      [21.1270, 79.0660],
    ],
  },
  {
    id: "W-01",
    type: "water",
    name: "Water Pipeline W-01",
    coordinates: [
      [21.0892, 79.0672],
      [21.0928, 79.0710],
      [21.0962, 79.0742],
    ],
  },
  {
    id: "W-02",
    type: "water",
    name: "Water Pipeline W-02",
    coordinates: [
      [21.1170, 79.0570],
      [21.1210, 79.0630],
      [21.1260, 79.0690],
    ],
  },
  {
    id: "D-01",
    type: "stormwater",
    name: "Stormwater Drain D-01",
    coordinates: [
      [21.0875, 79.0700],
      [21.0926253, 79.0707713],
      [21.0970, 79.0715],
    ],
  },
  {
    id: "D-02",
    type: "stormwater",
    name: "Stormwater Drain D-02",
    coordinates: [
      [21.1160, 79.0590],
      [21.1210, 79.0640],
      [21.1280, 79.0680],
    ],
  },
];

export const roadNetwork: RoadSegment[] = [
  { id: "R-01", name: "Manish Nagar Road", coordinates: [[21.087, 79.065], [21.0926253, 79.0707713], [21.098, 79.076]] },
  { id: "R-02", name: "Pratap Nagar Road", coordinates: [[21.114, 79.054], [21.122, 79.061], [21.13, 79.069]] },
  { id: "R-03", name: "Civil Lines Connector", coordinates: [[21.139, 79.073], [21.146, 79.08], [21.153, 79.087]] },
];
