import { PLACES, PATHS } from "../data/campus.js";
import { KIND } from "../data/hazards.js";

/* Dijkstra. Paths with active hazards cost more, so routes go around them
   when a reasonable alternative exists. Pass avoidHazards=false for the usual route. */
export function findRoute(from, to, reports, avoidHazards = true) {
  const factor = (p) =>
    avoidHazards
      ? reports.filter((r) => r.active && r.pathId === p.id).reduce((m, r) => Math.max(m, KIND[r.kind].penalty), 1)
      : 1;
  const dist = Object.fromEntries(PLACES.map((p) => [p.id, Infinity]));
  const prev = {};
  const todo = new Set(PLACES.map((p) => p.id));
  dist[from] = 0;

  while (todo.size) {
    let u = null;
    todo.forEach((id) => { if (u === null || dist[id] < dist[u]) u = id; });
    if (dist[u] === Infinity || u === to) break;
    todo.delete(u);
    PATHS.filter((p) => p.a === u || p.b === u).forEach((p) => {
      const v = p.a === u ? p.b : p.a;
      const alt = dist[u] + p.metres * factor(p);
      if (alt < dist[v]) { dist[v] = alt; prev[v] = { node: u, path: p }; }
    });
  }
  if (dist[to] === Infinity) return null;

  const nodes = [to], edges = [];
  for (let c = to; prev[c]; c = prev[c].node) { nodes.unshift(prev[c].node); edges.unshift(prev[c].path); }
  return { nodes, edges, metres: edges.reduce((s, e) => s + e.metres, 0) };
}
