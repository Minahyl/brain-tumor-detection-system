
"use client";

import { useState } from "react";
import {
  FileText,
  Printer,
  ShieldCheck,
  ClipboardList,
} from "lucide-react";

import Sidebar from "../../components/sidebar";
import Topbar from "../../components/Topbar";

export default function ReportsPage() {
  const [reportId, setReportId] = useState("NS-DEMO-001");

  function printReport() {
    window.print();
  }

  return (
    <div className="min-h-screen theme-bg theme-text transition-colors duration-300">
      <Sidebar />

      <div className="ml-[280px]">
        <Topbar />

        <main className="space-y-8 p-8">
          <div>
            <h1 className="text-3xl font-bold">Reports</h1>
            <p className="mt-2 text-sm theme-muted">
              Review and print a sample MRI analysis report.
            </p>
          </div>

          <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-4 text-sm text-amber-700">
            This is a demonstration report, not a real patient report.
            Connect saved prediction records to generate reports from
            actual analyses.
          </div>

          <section className="card p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-indigo-500/10 p-3">
                  <FileText className="text-indigo-400" size={24} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold">
                    Report Preview
                  </h2>
                  <p className="text-xs theme-muted">
                    NeuroScanAI · Demonstration
                  </p>
                </div>
              </div>

              <button
                onClick={printReport}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-500"
              >
                <Printer size={17} />
                Print / Save PDF
              </button>
            </div>

            <label className="mb-2 block text-sm theme-muted">
              Report reference
            </label>

            <input
              value={reportId}
              onChange={(e) => setReportId(e.target.value)}
              className="theme-input mb-6 w-full rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
            />

            <div
              id="printable-report"
              className="theme-panel space-y-6 rounded-xl border theme-border p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b theme-border pb-5">
                <div>
                  <h3 className="text-2xl font-bold">
                    NeuroScanAI
                  </h3>
                  <p className="mt-1 text-sm theme-muted">
                    Brain MRI Classification Report
                  </p>
                </div>

                <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-700">
                  DEMO REPORT
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <ReportField
                  label="Reference ID"
                  value={reportId || "Not set"}
                />
                <ReportField label="Model" value="EfficientNetB0" />
                <ReportField
                  label="Prediction"
                  value="Sample only — no prediction loaded"
                />
                <ReportField label="Confidence" value="Not available" />
                <ReportField label="Input" value="No scan linked" />
                <ReportField
                  label="Explainability"
                  value="Grad-CAM supported by application"
                />
              </div>

              <div className="rounded-xl border theme-border p-4">
                <h4 className="mb-2 flex items-center gap-2 font-semibold">
                  <ClipboardList size={18} className="text-indigo-400" />
                  Report Notes
                </h4>

                <p className="text-sm leading-6 theme-muted">
                  This page is a report template only. It does not
                  contain a real scan, prediction, or medical finding.
                  No diagnostic conclusion can be drawn from this
                  demonstration.
                </p>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-emerald-400/20 bg-emerald-500/5 p-4">
                <ShieldCheck
                  className="mt-0.5 shrink-0 text-emerald-500"
                  size={20}
                />
                <p className="text-xs leading-5 theme-muted">
                  AI-generated classifications are decision-support
                  information and require qualified clinical review.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function ReportField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="theme-panel rounded-lg border theme-border p-4">
      <p className="text-xs theme-muted">{label}</p>
      <p className="mt-2 break-words text-sm font-medium theme-text">
        {value}
      </p>
    </div>
  );
}
