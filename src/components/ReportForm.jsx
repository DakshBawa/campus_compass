import { useState } from "react";
import Select from "./Select.jsx";
import { PATHS, pathLabel } from "../data/campus.js";
import { KIND } from "../data/hazards.js";

export default function ReportForm({ onSubmit }) {
  const [kind, setKind] = useState("water");
  const [pathId, setPathId] = useState(PATHS[0].id);
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  const submit = () => {
    onSubmit({ id: Date.now(), pathId, kind, note: note.trim(), confirms: 1, active: true });
    setNote(""); setSent(true); setTimeout(() => setSent(false), 2500);
  };

  return (
    <div className="card space-y-3 self-start">
      <h2 className="font-semibold">Report a problem</h2>
      <p className="text-sm text-navy/70">Reports change walking routes for everyone, so keep them accurate.</p>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(KIND).map(([k, v]) => (
          <button key={k} onClick={() => setKind(k)} aria-pressed={kind === k}
            className={`rounded-lg border px-3 py-2 text-sm font-medium ${kind === k ? "border-navy bg-navy text-white" : "border-navy/30 hover:bg-navy/5"}`}>
            {v.icon} {v.label}
          </button>
        ))}
      </div>
      <Select label="Which path?" value={pathId} onChange={setPathId}>
        {PATHS.map((p) => <option key={p.id} value={p.id}>{pathLabel(p)}</option>)}
      </Select>
      <label className="block">
        <span className="text-sm font-medium">What did you see?</span>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3}
          placeholder="e.g. Knee-deep water outside the library"
          className="mt-1 w-full rounded-lg border border-navy/30 px-3 py-2" />
      </label>
      <button className="btn-primary" disabled={!note.trim()} onClick={submit}>Post report</button>
      {sent && <p role="status" className="text-sm text-emerald-700">Report posted. Routes now avoid this path.</p>}
    </div>
  );
}
