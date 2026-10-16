"use client";

const performanceData = [
  ["Accuracy", "83.18%"],
  ["Model", "EfficientNetB0"],
  ["Classes", "4"],
  ["Framework", "TensorFlow"],
];

export default function Performance() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
      {performanceData.map((item) => (
        <div
          key={item[0]}
          className="card p-6"
        >
          <p className="text-sm theme-muted">
            {item[0]}
          </p>

          <h2 className="mt-2 break-words text-xl font-bold theme-text">
            {item[1]}
          </h2>
        </div>
      ))}
    </div>
  );
}