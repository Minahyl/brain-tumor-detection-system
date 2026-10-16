
"use client";

import {
  Network,
  TestTube,
  UserCircle,
} from "lucide-react";

export default function Topbar() {
  return (
    <header
      className="
        min-h-20
        border-b theme-border
        theme-sidebar theme-text
        flex items-center justify-between
        px-8 py-4 gap-4
        transition-colors duration-300
      "
    >
      <div>
        <h1 className="text-2xl font-bold">
          Dashboard & Detection
        </h1>

        <p className="text-sm theme-muted">
          Upload MRI scans and connect your trained backend model
        </p>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <button
          type="button"
          className="
            px-4 py-2 rounded-lg
            bg-indigo-500/10
            border border-indigo-500/30
            text-indigo-500
            flex gap-2 items-center
            transition hover:bg-indigo-500/20
          "
        >
          <Network size={18} />
          Configure API
        </button>

        <button
          type="button"
          className="
            px-4 py-2 rounded-lg
            bg-black/5
            border theme-border
            theme-text
            flex gap-2 items-center
            transition hover:bg-indigo-500/10
          "
        >
          <TestTube size={18} />
          Sample MRI
        </button>

        <div className="flex items-center gap-3 ml-3">
          <UserCircle
            size={40}
            className="text-indigo-400"
          />

          <div>
            <p className="font-semibold">
              Dr. AI System
            </p>

            <p className="text-xs theme-muted">
              Lead Neurologist
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
