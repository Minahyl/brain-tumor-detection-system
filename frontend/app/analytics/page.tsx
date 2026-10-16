"use client";

import {
  BarChart3,
  Brain,
  Activity,
  ScanLine,
  TrendingUp,
} from "lucide-react";

import { useState } from "react";
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/Topbar";

const demoClasses = [
  { name: "Glioma", value: 32, color: "bg-blue-500" },
  { name: "Meningioma", value: 26, color: "bg-purple-500" },
  { name: "No Tumor", value: 24, color: "bg-emerald-500" },
  { name: "Pituitary", value: 18, color: "bg-orange-500" },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("7 days");

  return (
    <div className="min-h-screen theme-bg theme-text transition-colors duration-300">
      <Sidebar />

      <div className="ml-[280px]">
        <Topbar />

        <main className="space-y-8 p-8">
          {/* Page Heading */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Analytics</h1>
              <p className="mt-2 text-sm theme-muted">
                Brain MRI classification insights and model overview.
              </p>
            </div>

            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="theme-input rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500"
            >
              <option value="7 days">7 days</option>
              <option value="30 days">30 days</option>
              <option value="90 days">90 days</option>
            </select>
          </div>

          {/* Demo Notice */}
          <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-4 text-sm text-amber-700">
            Demo analytics: these values are illustrative, not actual
            historical scan records. Connect a scan-history database to
            display real analytics.
          </div>

          {/* Statistics */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <Stat
              title="Scans Analyzed"
              value="1,600"
              detail="Demo dataset"
              icon={<ScanLine />}
              color="text-blue-400"
            />

            <Stat
              title="Model Accuracy"
              value="83.18%"
              detail="Reported model metric"
              icon={<Brain />}
              color="text-emerald-400"
            />

            <Stat
              title="Tumor Classes"
              value="4"
              detail="Classification categories"
              icon={<Activity />}
              color="text-purple-400"
            />

            <Stat
              title="Analysis Period"
              value={period}
              detail="Selected display period"
              icon={<TrendingUp />}
              color="text-orange-400"
            />
          </div>

          {/* Analytics Details */}
          <div className="grid gap-8 xl:grid-cols-2">
            {/* Class Distribution */}
            <section className="card p-6">
              <div className="mb-6 flex items-center gap-3">
                <BarChart3 className="text-indigo-400" size={22} />

                <div>
                  <h2 className="text-lg font-semibold">
                    Class Distribution
                  </h2>
                  <p className="text-xs theme-muted">
                    Illustrative percentage breakdown
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {demoClasses.map((item) => (
                  <div key={item.name}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="theme-text">{item.name}</span>
                      <span className="theme-muted">
                        {item.value}%
                      </span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-slate-500/15">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Model Information */}
            <section className="card p-6">
              <h2 className="text-lg font-semibold">
                Model Information
              </h2>

              <p className="mt-1 text-sm theme-muted">
                Current classification configuration
              </p>

              <div className="mt-6 space-y-4">
                <Info
                  label="Architecture"
                  value="EfficientNetB0"
                />
                <Info
                  label="Input Type"
                  value="Brain MRI image"
                />
                <Info
                  label="Output Classes"
                  value="4 classes"
                />
                <Info
                  label="Explainability"
                  value="Grad-CAM"
                />
                <Info
                  label="Inference API"
                  value="FastAPI"
                />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function Stat({
  title,
  value,
  detail,
  icon,
  color,
}: {
  title: string;
  value: string;
  detail: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="card p-5">
      <div className={`mb-4 ${color}`}>{icon}</div>

      <p className="text-sm theme-muted">{title}</p>

      <h3 className="mt-2 text-2xl font-bold theme-text">
        {value}
      </h3>

      <p className="mt-2 text-xs theme-muted">{detail}</p>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-wrap justify-between gap-3 border-b theme-border pb-3">
      <span className="text-sm theme-muted">{label}</span>
      <span className="text-sm font-medium theme-text">
        {value}
      </span>
    </div>
  );
}