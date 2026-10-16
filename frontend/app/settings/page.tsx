
"use client";

import { useState } from "react";
import {
  Brain,
  Server,
  Palette,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

import Sidebar from "../../components/sidebar";
import Topbar from "../../components/Topbar";
import { useAppTheme } from "../../components/ThemeProvider";

export default function SettingsPage() {
  const { theme, setTheme } = useAppTheme();

  const [apiUrl, setApiUrl] = useState("http://127.0.0.1:8000");
  const [showConfidence, setShowConfidence] = useState(true);
  const [message, setMessage] = useState("");

  function resetSettings() {
    setTheme("dark");
    setApiUrl("http://127.0.0.1:8000");
    setShowConfidence(true);
    setMessage("Theme reset to dark. Other preferences reset on this page.");
  }

  function saveSettings() {
    setMessage(
      `Your ${theme} theme preference has been saved and applied across the app.`
    );
  }

  return (
    <div className="min-h-screen theme-bg theme-text">
      <Sidebar />

      <div className="ml-[280px]">
        <Topbar />

        <main className="space-y-8 p-8">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="mt-2 text-sm theme-muted">
              Manage dashboard preferences and review model configuration.
            </p>
          </div>

          {message && (
            <div
              role="status"
              className="flex items-start gap-3 rounded-xl border border-emerald-400/20 bg-emerald-500/5 p-4 text-sm text-emerald-500"
            >
              <CheckCircle2 size={19} className="shrink-0" />
              {message}
            </div>
          )}

          <section className="card p-6">
            <div className="mb-6 flex items-center gap-3">
              <Palette className="text-indigo-400" size={22} />
              <div>
                <h2 className="text-lg font-semibold">
                  Appearance & Preferences
                </h2>
                <p className="text-xs theme-muted">
                  Dashboard display options
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-medium">Theme preference</p>
                  <p className="mt-1 text-sm theme-muted">
                    Change the appearance of your dashboard.
                  </p>
                </div>

                <select
                  value={theme}
                  onChange={(e) => {
                    setTheme(e.target.value as "dark" | "light");
                    setMessage("");
                  }}
                  className="theme-input rounded-xl px-4 py-3 text-sm outline-none"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium">Show confidence scores</p>
                  <p className="mt-1 text-sm theme-muted">
                    Display confidence in the results interface.
                  </p>
                </div>

                <button
                  type="button"
                  aria-pressed={showConfidence}
                  onClick={() => setShowConfidence(!showConfidence)}
                  className={`relative h-7 w-12 rounded-full transition ${
                    showConfidence ? "bg-indigo-600" : "bg-gray-500"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${
                      showConfidence ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          <section className="card p-6">
            <div className="mb-6 flex items-center gap-3">
              <Server className="text-cyan-400" size={22} />
              <div>
                <h2 className="text-lg font-semibold">
                  Backend Configuration
                </h2>
                <p className="text-xs theme-muted">
                  Displayed API endpoint
                </p>
              </div>
            </div>

            <label className="mb-2 block text-sm theme-muted">
              FastAPI base URL
            </label>

            <input
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              className="theme-input w-full rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
              placeholder="http://127.0.0.1:8000"
            />

            <p className="mt-2 text-xs leading-5 text-amber-600">
              Editing this field does not change the URL used by UploadPanel.
              The setting needs to be connected to your frontend configuration.
            </p>
          </section>

          <section className="card p-6">
            <div className="mb-6 flex items-center gap-3">
              <Brain className="text-purple-400" size={22} />
              <div>
                <h2 className="text-lg font-semibold">Model Information</h2>
                <p className="text-xs theme-muted">
                  Current model details
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Info label="Model Architecture" value="EfficientNetB0" />
              <Info label="Classification Classes" value="4" />
              <Info label="Explainability Method" value="Grad-CAM" />
              <Info label="Reported Accuracy" value="83.18%" />
            </div>
          </section>

          <div className="flex flex-wrap justify-end gap-3">
            <button
              onClick={resetSettings}
              className="flex items-center gap-2 rounded-xl border theme-border px-4 py-3 text-sm theme-muted hover:opacity-75"
            >
              <RotateCcw size={16} />
              Reset
            </button>

            <button
              onClick={saveSettings}
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Save Preferences
            </button>
          </div>

          <div className="flex items-start gap-3 rounded-xl border theme-border p-4">
            <ShieldCheck className="mt-0.5 text-indigo-400" size={20} />
            <p className="text-xs leading-5 theme-muted">
              These are dashboard preferences, not security controls.
              Do not enter secrets, passwords, or API keys here.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap justify-between gap-3 border-b theme-border pb-3">
      <span className="text-sm theme-muted">{label}</span>
      <span className="text-sm font-medium theme-text">{value}</span>
    </div>
  );
}
