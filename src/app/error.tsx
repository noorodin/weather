"use client";
import React from "react";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      <h1 className="text-2xl font-bold text-red-600">Something went wrong</h1>
      <p className="mt-4 text-gray-600">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        onClick={reset}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Try Again
      </button>
    </div>
  );
}
