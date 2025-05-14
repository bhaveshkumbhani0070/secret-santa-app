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
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      {/* Current Employees File */}
      <div>
        <label
          htmlFor="currentFile"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select current employees CSV <span className="text-red-500">*</span>
        </label>
        <input
          id="currentFile"
          type="file"
          accept=".csv"
          onChange={(e) => setCurrentFile(e.target.files?.[0] || null)}
          required
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                 file:rounded file:border-0
                 file:text-sm file:font-semibold
                 file:bg-blue-50 file:text-blue-700
                 hover:file:bg-blue-100"
        />
      </div>

      {/* Previous Assignments File */}
      <div>
        <label
          htmlFor="previousFile"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select previous assignments CSV
        </label>
        <input
          id="previousFile"
          type="file"
          accept=".csv"
          onChange={(e) => setPreviousFile(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                 file:rounded file:border-0
                 file:text-sm file:font-semibold
                 file:bg-green-50 file:text-green-700
                 hover:file:bg-green-100"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            Assigning...
          </>
        ) : (
          "Assign Secret Santa"
        )}
      </button>
    </form>
  );
}
