import ReportForm from "../components/ReportForm.jsx";
import ReportCard from "../components/ReportCard.jsx";

export default function Alerts({ reports, setReports }) {
  const active = reports.filter((r) => r.active);
  const update = (id, fn) => setReports((rs) => rs.map((r) => (r.id === id ? fn(r) : r)));

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <ReportForm onSubmit={(r) => setReports((rs) => [r, ...rs])} />
      <div className="space-y-3">
        <h2 className="font-semibold">Active reports ({active.length})</h2>
        {active.length === 0 && (
          <p className="rounded-xl border border-dashed border-navy/30 p-6 text-sm text-navy/70">
            No active problems. If you see construction or waterlogging, post it so others can avoid it.
          </p>
        )}
        {active.map((r) => (
          <ReportCard key={r.id} report={r}
            onConfirm={(id) => update(id, (x) => ({ ...x, confirms: x.confirms + 1 }))}
            onResolve={(id) => update(id, (x) => ({ ...x, active: false }))} />
        ))}
      </div>
    </div>
  );
}
