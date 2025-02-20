"use client"; // ✅ Ensure it's client-side

import { useEffect, useState } from "react";

interface Bin {
  id: string;
  location: string;
  currentLevel: number;
  status: "NORMAL" | "FULL";
}

export default function Binstatus() {
  const [bins, setBins] = useState<Bin[]>([]);
  const [alertBin, setAlertBin] = useState<Bin | null>(null);
  const [loading, setLoading] = useState(true); // ✅ Add loading state

  useEffect(() => {
    const fetchBins = async () => {
      const res = await fetch("/api/bins");
      const data = await res.json();
      console.log("Fetched bin data:", data); // ✅ Debug: Check if it's updating
  
      setBins(data);
    };
  
    fetchBins();
    const interval = setInterval(fetchBins, 5000); // ✅ Poll every 5 sec
  
    return () => clearInterval(interval);
  }, []);// Removed interval to prevent excessive API calls

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Bin Status Dashboard</h1>

      {/* Loading State */}
      {loading && <p>Loading bins...</p>}

      {/* Alert Banner */}
      {alertBin && (
        <div className="bg-red-500 text-white p-3 rounded-md mt-3">
          ⚠️ Bin at {alertBin.location} is FULL! Immediate action required.
        </div>
      )}

      {/* Bin List */}
      <ul className="mt-4 space-y-2">
        {bins.map((bin) => (
          <li
            key={bin.id}
            className={`p-3 border rounded-md ${
              bin.status === "FULL" ? "bg-red-100 border-red-500" : "bg-green-100 border-green-500"
            }`}
          >
            <strong>{bin.location}</strong> - {bin.currentLevel}% full
          </li>
        ))}
      </ul>

      {/* No Bins Found */}
      {!loading && bins.length === 0 && <p>No bins available.</p>}
    </div>
  );
}
