"use client";

import {
  Activity,
  Image as ImageIcon,
  Layers3,
  ScanEye,
} from "lucide-react";

export default function GradCAMPanel({ result }: any) {
  // Show Grad-CAM only when a prediction result is available.
  if (!result) return null;

  const imageClass =
    "h-full max-h-[420px] w-full object-contain";

  return (
    <section className="card overflow-hidden">
      {/* Section Heading */}
      <div className="border-b theme-border bg-gradient-to-r from-violet-500/10 via-blue-500/5 to-transparent p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-4">
          <div className="rounded-xl border border-violet-400/20 bg-violet-500/10 p-3">
            <ScanEye className="h-7 w-7 text-violet-500" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-bold theme-text sm:text-2xl">
                Grad-CAM Explainable AI
              </h2>

              <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-600">
                XAI Visualization
              </span>
            </div>

            <p className="mt-2 max-w-2xl text-sm leading-6 theme-muted">
              Visualize the regions that contributed to the
              model&apos;s prediction using Gradient-weighted
              Class Activation Mapping.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg border theme-border theme-panel px-3 py-2">
            <Activity className="h-4 w-4 text-emerald-500" />
            <span className="text-xs theme-text">
              Analysis Complete
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-5 sm:p-8">
        {/* Main Grad-CAM Overlay */}
        {result.overlay_image && (
          <div className="theme-panel rounded-xl border border-violet-400/20 p-4 sm:p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-violet-500/10 p-2">
                  <Layers3 className="h-5 w-5 text-violet-500" />
                </div>

                <div>
                  <h3 className="font-semibold theme-text">
                    Grad-CAM Overlay
                  </h3>

                  <p className="mt-1 text-xs theme-muted">
                    Heatmap superimposed on the original MRI
                  </p>
                </div>
              </div>

              <span className="rounded-md bg-slate-500/10 px-2.5 py-1 text-xs theme-muted">
                Primary Visualization
              </span>
            </div>

            <div className="flex min-h-[260px] items-center justify-center overflow-hidden rounded-xl border theme-border bg-slate-500/5 p-3 sm:min-h-[360px]">
              <img
                src={result.overlay_image}
                alt="Grad-CAM heatmap overlay on brain MRI"
                className={imageClass}
              />
            </div>

            <p className="mt-3 text-xs leading-5 theme-muted">
              Colored regions highlight areas associated with the
              model&apos;s prediction. This visualization explains
              model attention; it does not independently confirm
              tumor location.
            </p>
          </div>
        )}

        {/* Original MRI and Heatmap */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {result.original_image && (
            <div className="theme-panel rounded-xl border theme-border p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-cyan-500/10 p-2">
                  <ImageIcon className="h-5 w-5 text-cyan-500" />
                </div>

                <div>
                  <h3 className="font-semibold theme-text">
                    Original MRI
                  </h3>

                  <p className="mt-1 text-xs theme-muted">
                    Input image
                  </p>
                </div>
              </div>

              <div className="flex min-h-[240px] items-center justify-center overflow-hidden rounded-lg border theme-border bg-slate-500/5 p-3">
                <img
                  src={result.original_image}
                  alt="Original brain MRI scan"
                  className={imageClass}
                />
              </div>
            </div>
          )}

          {result.heatmap_image && (
            <div className="theme-panel rounded-xl border theme-border p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-orange-500/10 p-2">
                  <Layers3 className="h-5 w-5 text-orange-500" />
                </div>

                <div>
                  <h3 className="font-semibold theme-text">
                    Activation Heatmap
                  </h3>

                  <p className="mt-1 text-xs theme-muted">
                    Model activation visualization
                  </p>
                </div>
              </div>

              <div className="flex min-h-[240px] items-center justify-center overflow-hidden rounded-lg border theme-border bg-slate-500/5 p-3">
                <img
                  src={result.heatmap_image}
                  alt="Grad-CAM activation heatmap"
                  className={imageClass}
                />
              </div>
            </div>
          )}
        </div>

        {/* Medical Disclaimer */}
        <div className="rounded-xl border border-amber-400/20 bg-amber-500/5 p-4">
          <p className="text-xs leading-6 theme-muted">
            <span className="font-semibold text-amber-600">
              Research disclaimer:
            </span>{" "}
            Grad-CAM is an interpretability aid, not a diagnostic
            tool. The highlighted regions should not be interpreted
            as definitive tumor boundaries or used as a substitute
            for assessment by a qualified medical professional.
          </p>
        </div>
      </div>
    </section>
  );
}