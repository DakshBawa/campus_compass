import { place, pathLabel } from "../data/campus.js";
import { KIND } from "../data/hazards.js";

export default function RouteSummary({ route, rerouted, reports, from, to }) {
  const warnings = route.edges.flatMap((e) => reports.filter((r) => r.active && r.pathId === e.id).map((r) => ({ r, e })));
  const shortcuts = route.edges.filter((e) => e.shortcut);

  return (
    <div className="card space-y-3">
      <div>
        <h2 className="font-semibold">{place(from).name} to {place(to).name}</h2>
        <p className="text-sm text-navy/70">About {route.metres} m · {Math.max(1, Math.round(route.metres / 80))} min walk</p>
      </div>

      {rerouted && (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 p-2.5 text-sm text-emerald-900">
          This route avoids a reported problem. The usual way is shorter but affected.
        </p>
      )}
      {warnings.map(({ r, e }) => (
        <div key={r.id} className={`rounded-lg border p-2.5 text-sm ${KIND[r.kind].chip}`}>
          <p className="font-medium">{KIND[r.kind].icon} {KIND[r.kind].label} on {pathLabel(e)}</p>
          <p>{r.note}</p>
        </div>
      ))}
      {shortcuts.map((e) => (
        <p key={e.id} className="rounded-lg border border-navy/15 bg-navy/5 p-2.5 text-sm">⚡ Shortcut: {e.note}.</p>
      ))}

      <ol className="space-y-2">
        {route.edges.map((e, i) => (
          <li key={e.id} className="flex gap-3 text-sm">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-navy text-xs text-white">{i + 1}</span>
            <span>Go to <b>{place(route.nodes[i + 1]).name}</b> <span className="text-navy/60">({e.metres} m{e.shortcut ? ", shortcut" : ""})</span></span>
          </li>
        ))}
      </ol>
    </div>
  );
}
