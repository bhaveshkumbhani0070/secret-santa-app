"use client";

import { useState } from "react";
import { saveAs } from "file-saver";

export default function UploadForm() {
  const [currentFile, setCurrentFile] = useState(null);
  const [previousFile, setPreviousFile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!currentFile) return;

    const formData = new FormData();
    formData.append("current", currentFile);
    if (previousFile) formData.append("previous", previousFile);

    setLoading(true);

    const res = await fetch("/api/assign", {
      method: "POST",
      body: formData,
    });

    const blob = await res.blob();
    saveAs(blob, "secret-santa-result.csv");
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setCurrentFile(e.target.files?.[0] || null)}
        required
      />
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setPreviousFile(e.target.files?.[0] || null)}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 px-4 py-2 text-white rounded"
      >
        {loading ? "Assigning..." : "Assign Secret Santa"}
      </button>
    </form>
  );
}
