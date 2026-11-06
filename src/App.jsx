import { useState } from "react";
import Header from "./components/Header.jsx";
import Navigate from "./pages/Navigate.jsx";
import Alerts from "./pages/Alerts.jsx";
import { INITIAL_REPORTS } from "./data/hazards.js";

export default function App() {
  const [tab, setTab] = useState("nav");
  const [reports, setReports] = useState(INITIAL_REPORTS);

  return (
    <div className="min-h-screen">
      <Header tab={tab} setTab={setTab} alertCount={reports.filter((r) => r.active).length} />
      <main className="mx-auto max-w-6xl px-4 py-6">
        {tab === "nav" ? <Navigate reports={reports} /> : <Alerts reports={reports} setReports={setReports} />}
      </main>
    </div>
  );
}
