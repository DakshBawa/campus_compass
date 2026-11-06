export const KIND = {
  construction: { label: "Construction", icon: "🚧", penalty: 6, chip: "bg-amber-100 text-amber-900 border-amber-300" },
  water: { label: "Waterlogging", icon: "💧", penalty: 3, chip: "bg-sky-100 text-sky-900 border-sky-300" },
};

// Sample reports. Replace with data from your backend later.
export const INITIAL_REPORTS = [
  { id: 1, pathId: "jEast-bcd", kind: "construction", note: "Drain repair near the B Block entrance. One lane open, no bikes.", confirms: 6, active: true },
  { id: 2, pathId: "vahni-canteen", kind: "water", note: "Park footpath floods after rain. Ankle deep near the pond.", confirms: 11, active: true },
];
