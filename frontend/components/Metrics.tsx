"use client";

const metrics = [
  {
    name: "Accuracy",
    value: 83,
  },
  {
    name: "Precision",
    value: 84,
  },
  {
    name: "Recall",
    value: 83,
  },
  {
    name: "F1 Score",
    value: 82,
  },
];

export default function Metrics() {
  return (
    <div className="card p-8">
      <h2 className="mb-5 text-xl font-bold theme-text">
        Neural Core Metrics
      </h2>

      {metrics.map((m) => (
        <div key={m.name} className="mb-5 last:mb-0">
          <div className="flex justify-between gap-3 text-sm">
            <span className="theme-text">{m.name}</span>

            <span className="font-semibold tabular-nums theme-muted">
              {m.value}%
            </span>
          </div>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-500/15">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700"
              style={{
                width: `${m.value}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}