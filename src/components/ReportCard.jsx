import { PATHS, pathLabel } from "../data/campus.js";
import { KIND } from "../data/hazards.js";

export default function ReportCard({ report: r, onConfirm, onResolve }) {
  const p = PATHS.find((x) => x.id === r.pathId);
  return (
    <article className="card">
      <div className="flex items-center justify-between gap-2">
        <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${KIND[r.kind].chip}`}>{KIND[r.kind].icon} {KIND[r.kind].label}</span>
        <span className="text-xs text-navy/60">{r.confirms} people confirmed</span>
      </div>
      <h3 className="mt-2 font-medium">{pathLabel(p)}</h3>
      <p className="text-sm text-navy/80">{r.note}</p>
      <div className="mt-3 flex gap-2">
        <button className="btn-outline" onClick={() => onConfirm(r.id)}>I see this too</button>
        <button className="btn-outline border-navy/30" onClick={() => onResolve(r.id)}>It's fixed now</button>
      </div>
    </article>
  );
}
