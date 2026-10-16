
"use client";

import { useState } from "react";
import { UploadCloud, Trash2 } from "lucide-react";

export default function UploadPanel({ setResult }: any) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files?.[0];

    if (!img) return;

    if (!["image/jpeg", "image/png"].includes(img.type)) {
      setError("Please upload a JPG or PNG image.");
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFile(img);
    setPreview(URL.createObjectURL(img));
    setResult(null);
    setError("");
  };

  const analyze = async () => {
    if (!file) {
      setError("Upload MRI first.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const form = new FormData();
      form.append("file", file);

      const res = await fetch(
        "http://127.0.0.1:8000/predict-with-gradcam",
        {
          method: "POST",
          body: form,
        }
      );

      if (!res.ok) {
        const details = await res.text();
        throw new Error(details || "Analysis failed.");
      }

      const data = await res.json();

      setResult(data);
    } catch (err) {
      console.error("MRI analysis error:", err);

      setError(
        err instanceof Error && err.message !== "Failed to fetch"
          ? "MRI analysis failed. Please check the backend response."
          : "Backend connection failed. Make sure FastAPI is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const clearScan = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFile(null);
    setPreview("");
    setResult(null);
    setError("");
  };

  return (
    <div className="card p-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold">MRI Scan Input</h2>

        <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs">
          PNG/JPG
        </span>
      </div>

      <label
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-600 transition-all duration-500 hover:border-indigo-500 ${
          preview ? "h-24" : "h-64"
        }`}
      >
        <UploadCloud
          size={preview ? 30 : 45}
          className="text-indigo-400"
        />

        <p className="mt-3 font-medium">
          {preview ? "Upload another MRI scan" : "Drag & Drop MRI scan here"}
        </p>

        <p className="text-sm text-gray-400">
          {preview ? "Click to replace image" : "or browse files"}
        </p>

        <input
          type="file"
          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
          className="hidden"
          onChange={uploadImage}
        />
      </label>

      {preview && (
        <div className="mt-5 overflow-hidden rounded-xl">
          <img
            src={preview}
            alt="Uploaded MRI scan preview"
            className="h-80 w-full rounded-xl object-contain transition-transform duration-700 hover:scale-105"
          />

          <p className="mt-2 truncate text-sm text-gray-400">
            {file?.name}
          </p>
        </div>
      )}

      <button
        onClick={analyze}
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-indigo-600 py-3 font-bold transition hover:bg-indigo-500 disabled:opacity-50"
      >
        {loading ? "Generating Prediction & Heatmap..." : "🧠 Run MRI Analysis"}
      </button>

      <button
        onClick={clearScan}
        disabled={loading}
        className="mt-3 w-full rounded-xl bg-white/5 py-3 transition hover:bg-white/10 disabled:opacity-50"
      >
        <Trash2 size={16} className="mr-2 inline" />
        Clear Scan
      </button>

      {error && (
        <p className="mt-4 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
