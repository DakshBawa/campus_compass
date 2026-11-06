import mapImage from "../assets/campus-map.jpeg";

export const MAP = { src: mapImage, width: 1600, height: 892 };

/* Positions are % of the map image: [id, name, type, x, y].
   Type "Junction" = road crossing (hidden from dropdowns, used for routing). */
const RAW = [
  ["entrance", "Main Entrance", "Entrance", 87.5, 90.5],
  ["tslas", "TSLAS Gate", "Entrance", 95, 54],
  ["west", "Western Gate", "Entrance", 6, 59],
  ["poly", "Polytechnic Gate", "Entrance", 48, 8.7],

  ["cs", "CS Block (CSED)", "Department", 69, 41],
  ["bcd", "B, C & D Blocks", "Department", 76, 65],
  ["eblock", "E Block", "Department", 85, 68],
  ["fblock", "F Block", "Department", 83, 62],
  ["hblock", "H Block", "Department", 87, 75],
  ["directorate", "Directorate", "Department", 79, 77],

  ["dean", "Dean Office & Visitors' Lounge", "Faculty", 76, 46],

  ["lp", "Lecture Rooms LP 101-103", "Laboratory", 67, 56],
  ["lt", "Lecture Theatre (LT)", "Laboratory", 69, 49],
  ["mech", "Mechanical Workshop", "Laboratory", 83, 52],
  ["venture", "Venture Lab", "Laboratory", 87, 44],

  ["library", "Library", "Facility", 73, 56],
  ["foodcourt", "Food Court", "Facility", 54, 63.5],
  ["canteen", "Canteen", "Facility", 66, 74],
  ["gblock", "G Block", "Facility", 68, 66],
  ["park", "Central Park", "Facility", 47, 67],
  ["sports", "Sports Complex", "Facility", 47, 39],
  ["audi", "Main Auditorium", "Facility", 74, 87],
  ["cafe", "Street Cafe", "Facility", 75, 80],
  ["vasudha", "Vasudha Hall", "Facility", 55, 48],
  ["ira", "Ira Hall", "Facility", 61.5, 44],
  ["ananta", "Ananta Hall", "Facility", 61.5, 53],

  ["anantam", "Anantam Hall", "Hostel", 18, 67],
  ["tejas", "Tejas Hall", "Hostel", 32.5, 68],
  ["vyan", "Vyan Hall", "Hostel", 39, 68],
  ["neeram", "Neeram Hall", "Hostel", 11, 84],
  ["prithvi", "Prithvi Hall", "Hostel", 18, 84],
  ["vyom", "Vyom Hall", "Hostel", 25, 84],
  ["amritam", "Amritam Hall", "Hostel", 32, 84],
  ["agira", "Agira Hall", "Hostel", 39, 84],
  ["hostelpg", "Hostel PG", "Hostel", 47.5, 82],
  ["vahni", "Vahni Hall", "Hostel", 54, 82],

  ["jSouth", "South Road", "Junction", 43, 91.5],
  ["jMid", "Central Crossing", "Junction", 43, 58.5],
  ["jTop", "North Road", "Junction", 43, 9],
  ["r2", "Main Road (Sports side)", "Junction", 58, 58.5],
  ["r1", "Main Road (Library side)", "Junction", 70, 58.5],
  ["jEast", "East Crossing", "Junction", 85, 58.5],
  ["jW1", "West Road", "Junction", 20, 58.5],
  ["jW2", "West Road (Tejas side)", "Junction", 35, 58.5],
  ["hw", "Hostel Road (West)", "Junction", 13, 77],
  ["hm", "Hostel Road (Middle)", "Junction", 28, 77],
  ["h2", "Hostel Road (East)", "Junction", 43, 77],
];

export const PLACES = RAW.map(([id, name, type, x, y]) => ({ id, name, type, x, y }));
export const place = (id) => PLACES.find((p) => p.id === id);
export const DESTINATION_TYPES = ["Department", "Laboratory", "Faculty", "Facility", "Hostel", "Entrance"];

/* Paths between places. `shortcut` paths are footpaths that cut through. */
const EDGES = [
  ["entrance", "jSouth"], ["jSouth", "h2"], ["h2", "jMid"], ["h2", "hm"], ["hm", "hw"],
  ["jMid", "r2"], ["r2", "r1"], ["r1", "jEast"], ["jMid", "jTop"], ["jTop", "poly"],
  ["jMid", "jW2"], ["jW2", "jW1"], ["jW1", "west"], ["jEast", "tslas"],
  ["jEast", "bcd"], ["r1", "bcd"], ["jEast", "fblock"], ["jEast", "mech"], ["mech", "venture"],
  ["entrance", "bcd", { shortcut: true, note: "Past the parking lot" }],
  ["entrance", "audi"], ["bcd", "eblock"], ["bcd", "hblock"], ["bcd", "directorate"], ["bcd", "cafe"],
  ["r1", "library"], ["r1", "lp"], ["r1", "lt"], ["lt", "cs"], ["library", "dean"], ["r1", "gblock"],
  ["gblock", "canteen"], ["r2", "foodcourt"], ["r2", "vasudha"], ["r2", "ira"], ["r2", "ananta"],
  ["jMid", "sports"], ["jMid", "park"],
  ["foodcourt", "canteen", { shortcut: true, note: "Footpath through Central Park" }],
  ["vahni", "canteen", { shortcut: true, note: "Footpath through Central Park" }],
  ["vahni", "h2"], ["hostelpg", "h2"],
  ["anantam", "jW1"], ["tejas", "jW2"], ["vyan", "jW2"],
  ["neeram", "hw"], ["prithvi", "hw"], ["vyom", "hm"], ["amritam", "hm"], ["agira", "h2"],
];

const METRES_PER_PERCENT = 6.5; // rough scale; tune to your campus
export const PATHS = EDGES.map(([a, b, o = {}]) => {
  const A = place(a), B = place(b);
  const pct = Math.hypot((A.x - B.x) * 1.6, (A.y - B.y) * 0.892) / 1.6; // keep image aspect ratio
  return { id: `${a}-${b}`, a, b, metres: Math.max(10, Math.round(pct * METRES_PER_PERCENT)), ...o };
});
export const pathLabel = (p) => `${place(p.a).name} ↔ ${place(p.b).name}`;
