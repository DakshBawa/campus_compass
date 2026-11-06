import { useMemo, useState } from "react";
import Select from "../components/Select.jsx";
import MapView from "../components/MapView.jsx";
import RouteSummary from "../components/RouteSummary.jsx";
import { PLACES, DESTINATION_TYPES } from "../data/campus.js";
import { findRoute } from "../utils/routing.js";

export default function Navigate({ reports }) {
  const [from, setFrom] = useState("entrance");
  const [to, setTo] = useState("");
  const [go, setGo] = useState(false);
  const spots = PLACES.filter((p) => p.type !== "Junction");

  const route = useMemo(() => (go && to && from !== to ? findRoute(from, to, reports) : null), [go, from, to, reports]);
  const usual = useMemo(() => (route ? findRoute(from, to, reports, false) : null), [route, from, to, reports]);
  const rerouted = route && usual && usual.edges.map((e) => e.id).join() !== route.edges.map((e) => e.id).join();

  const change = (set) => (v) => { set(v); setGo(false); };
  const swap = () => { if (to) { setFrom(to); setTo(from); setGo(false); } };

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <aside className="space-y-4">
        <div className="card space-y-3">
          <Select label="Where are you?" value={from} onChange={change(setFrom)}>
            {spots.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </Select>
          <div className="flex justify-center">
            <button onClick={swap} className="text-sm underline underline-offset-2 hover:no-underline">Swap places</button>
          </div>
          <Select label="Where do you want to go?" value={to} onChange={change(setTo)}>
            <option value="">Choose a destination</option>
            {DESTINATION_TYPES.map((t) => (
              <optgroup key={t} label={t}>
                {spots.filter((p) => p.type === t && p.id !== from).map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </optgroup>
            ))}
          </Select>
          <button className="btn-primary" disabled={!to || from === to} onClick={() => setGo(true)}>Show route</button>
        </div>
        {route && <RouteSummary route={route} rerouted={rerouted} reports={reports} from={from} to={to} />}
        {go && to && !route && <p className="text-sm text-red-700">No route found between these places.</p>}
      </aside>

      <section className="space-y-3">
        <MapView route={route} reports={reports} from={go ? from : ""} to={go ? to : ""} />
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-navy/70">
          <span><i className="mr-1 inline-block h-1 w-4 bg-navy align-middle" />Your route</span>
          <span><i className="mr-1 inline-block w-4 border-t-2 border-dashed border-navy align-middle" />Shortcut</span>
          <span>🚧 Construction</span><span>💧 Waterlogging</span>
        </div>
      </section>
    </div>
  );
}
