import { useEffect, useState } from "react";
import { subscribeLoading } from "../utils/loadingService";

export default function Loader() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeLoading(setLoading);
    return () => unsubscribe();
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative bg-white rounded-lg shadow-lg px-4 py-3 flex items-center gap-3 pointer-events-auto">
        <svg
          className="w-6 h-6 animate-spin"
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
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>

        <span className="text-sm font-medium">Loading…</span>
      </div>
    </div>
  );
}
