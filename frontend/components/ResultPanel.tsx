"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  CheckCircle2,
  ScanEye,
} from "lucide-react";

export default function ResultPanel({ result }: any) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(false);

    const timer = setTimeout(() => {
      setAnimated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [result]);

  const formatLabel = (label: string) => {
    if (!label) return "Unknown";

    if (label.toLowerCase() === "notumor") {
      return "No Tumor";
    }

    return label.charAt(0).toUpperCase() + label.slice(1);
  };

  const confidence = Number(result?.confidence ?? 0);
  const probabilities = result?.probabilities ?? {};

  const getConfidenceColor = (value: number) => {
    if (value >= 80) return "text-emerald-500";
    if (value >= 50) return "text-yellow-500";
    return "text-orange-500";
  };

  return (
    <div className="card p-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-cyan-500/10 p-3">
          <Activity className="h-6 w-6 text-cyan-500" />
        </div>

        <div>
          <h2 className="text-xl font-semibold theme-text">
            MRI Result Analysis
          </h2>

          <p className="mt-1 text-sm theme-muted">
            AI-powered brain MRI classification
          </p>
        </div>
      </div>

      {!result ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed theme-border theme-panel p-6 text-center">
          <div className="mb-4 rounded-full bg-cyan-500/10 p-5">
            <ScanEye className="h-10 w-10 text-cyan-500" />
          </div>

          <h3 className="text-lg font-medium theme-text">
            No Analysis Available
          </h3>

          <p className="mt-2 max-w-xs text-sm leading-6 theme-muted">
            Upload a brain MRI image and run the analysis to see the
            prediction results here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Prediction Summary */}
          <div className="rounded-xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 p-5">
            <div className="mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-cyan-500" />

              <span className="text-sm font-medium theme-muted">
                Predicted Class
              </span>
            </div>

            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h3 className="text-3xl font-bold theme-text">
                  {formatLabel(result.prediction)}
                </h3>

                <p className="mt-2 text-sm theme-muted">
                  EfficientNetB0 Classification
                </p>
              </div>

              <div className="text-right">
                <p
                  className={`text-3xl font-bold ${getConfidenceColor(
                    confidence
                  )}`}
                >
                  {confidence.toFixed(2)}%
                </p>

                <p className="mt-1 text-xs theme-muted">
                  Model Confidence
                </p>
              </div>
            </div>
          </div>

          {/* Class Probabilities */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold theme-text">
                Class Probabilities
              </h3>

              <span className="text-xs theme-muted">
                All classes
              </span>
            </div>

            <div className="space-y-5">
              {Object.entries(probabilities).map(
                ([label, rawValue]: [string, any]) => {
                  const value = Number(rawValue);

                  const safeValue = Number.isFinite(value)
                    ? Math.max(0, Math.min(100, value))
                    : 0;

                  const isPrediction =
                    label.toLowerCase() ===
                    String(result.prediction).toLowerCase();

                  return (
                    <div key={label}>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium theme-text">
                            {formatLabel(label)}
                          </span>

                          {isPrediction && (
                            <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-600">
                              PREDICTED
                            </span>
                          )}
                        </div>

                        <span className="text-sm font-semibold tabular-nums theme-muted">
                          {Number.isFinite(value)
                            ? value.toFixed(2)
                            : "0.00"}
                          %
                        </span>
                      </div>

                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-500/15">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ease-out ${
                            isPrediction
                              ? "bg-gradient-to-r from-cyan-500 to-blue-400"
                              : "bg-gradient-to-r from-slate-500 to-slate-400"
                          }`}
                          style={{
                            width: animated
                              ? `${safeValue}%`
                              : "0%",
                          }}
                        />
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div className="rounded-lg border theme-border theme-panel p-4">
            <p className="text-xs leading-5 theme-muted">
              These probabilities represent the model&apos;s
              classification scores. They should not be treated as a
              confirmed medical diagnosis.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}