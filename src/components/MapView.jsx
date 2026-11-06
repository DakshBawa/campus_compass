import { MAP, PATHS, place } from "../data/campus.js";
import { KIND } from "../data/hazards.js";

export default function MapView({ route, reports, from, to }) {
  const routeIds = route ? route.edges.map((e) => e.id) : [];
  const pin = (id, color) => {
    const p = place(id);
    return (
      <div key={id} className="pin absolute flex flex-col items-center" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
        <span className="mb-1 whitespace-nowrap rounded bg-navy px-1.5 py-0.5 text-[11px] font-medium text-white">{p.name}</span>
        <span className="pin-dot" style={{ background: color }} />
      </div>
    );
  };

  return (
    <div className="map-frame relative w-full overflow-hidden rounded-xl border-2 border-navy bg-white">
      <img src={MAP.src} alt="Campus map" className="absolute inset-0 h-full w-full object-fill" />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {route?.edges.map((e) => {
          const [s, t] = [place(e.a), place(e.b)];
          const line = { x1: s.x, y1: s.y, x2: t.x, y2: t.y, vectorEffect: "non-scaling-stroke" };
          return (
            <g key={e.id}>
              <line {...line} className="route-casing" />
              <line {...line} className={`route-line ${e.shortcut ? "shortcut" : ""}`} />
            </g>
          );
        })}
      </svg>

      {reports.filter((r) => r.active).map((r) => {
        const p = PATHS.find((x) => x.id === r.pathId);
        const [a, b] = [place(p.a), place(p.b)];
        return (
          <div key={r.id} title={`${KIND[r.kind].label}: ${r.note}`}
            className={`hazard-marker absolute grid h-8 w-8 place-items-center rounded-full border text-base shadow ${KIND[r.kind].chip} ${routeIds.includes(p.id) ? "ring-2 ring-red-500" : ""}`}
            style={{ left: `${(a.x + b.x) / 2}%`, top: `${(a.y + b.y) / 2}%` }}>
            {KIND[r.kind].icon}
          </div>
        );
      })}

      {from && pin(from, "#10b981")}
      {to && pin(to, "#dc2626")}
    </div>
  );
}
