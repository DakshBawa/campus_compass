const TABS = [["nav", "Find my way"], ["alerts", "Campus alerts"]];

export default function Header({ tab, setTab, alertCount }) {
  return (
    <header className="bg-navy text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Campus Compass</h1>
          <p className="text-sm text-white/70">Find any classroom, lab, office or department.</p>
        </div>
        <nav className="flex gap-1 rounded-lg bg-white/10 p-1">
          {TABS.map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} aria-current={tab === id ? "page" : undefined}
              className={`rounded-md px-4 py-1.5 text-sm font-medium ${tab === id ? "bg-white text-navy" : "text-white hover:bg-white/10"}`}>
              {label}{id === "alerts" && alertCount ? ` (${alertCount})` : ""}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
