export default function Select({ label, value, onChange, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-navy/30 bg-white px-3 py-2.5">
        {children}
      </select>
    </label>
  );
}
