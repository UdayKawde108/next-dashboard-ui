

"use client"
import React, { useState, useEffect } from "react";
import { ref, onValue, set, push } from "firebase/database";
import { database } from "@/firebase/firebaseConfig";
import MapComponent from "@/components/MapComponent";

interface Bin {
  id: string;
  area: string;
  smaster: string;
  sworker?: string;
  level: number;
  lat: number;
  lng: number;
}

const Binlocal: React.FC = () => {
  const [bins, setBins] = useState<Bin[]>([]);
  const [newBin, setNewBin] = useState({
    id: "",
    area: "",
    smaster: "",
    lat: "",
    lng: "",
  });

  // Fetch bins from Firebase
  useEffect(() => {
    const binsRef = ref(database, "bins");
    onValue(binsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const binList = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
        setBins(binList);
      }
    });
  }, []);

  // Add new bin to Firebase
  const handleAddBin = () => {
    if (!newBin.id || !newBin.area || !newBin.smaster || !newBin.lat || !newBin.lng) {
      alert("Please fill all fields");
      return;
    }
    const binRef = ref(database, `bins/${newBin.id}`);
    set(binRef, {
      area: newBin.area,
      smaster: newBin.smaster,
      lat: parseFloat(newBin.lat),
      lng: parseFloat(newBin.lng),
      level: 0, // Default level when bin is created
    });
    setNewBin({ id: "", area: "", smaster: "", lat: "", lng: "" });
  };

  return (
    <div className="flex h-screen">
      {/* Left Section - Bin Details & Form */}
      <div className="w-1/3 p-6 bg-gray-200 overflow-y-auto">
        <h1 className="text-2xl font-bold text-blue-900 mb-4">Bin Monitoring</h1>
        
        {/* Display Existing Bins */}
        <div className="space-y-4">
          {bins.length > 0 ? (
            bins.map((bin) => (
              <div key={bin.id} className="bg-white p-4 shadow-lg rounded-lg">
                <p className="font-semibold">Bin ID: {bin.id}</p>
                <p>Area: {bin.area}</p>
                <p>SMaster: {bin.smaster}</p>
                <p className={`font-bold ${bin.level >= 90 ? "text-red-600" : bin.level >= 51 ? "text-yellow-600" : "text-green-600"}`}>
                  Bin Level: {bin.level}%
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No bins available.</p>
          )}
        </div>
        
        {/* Add New Bin Form */}
        <div className="bg-white p-4 shadow-lg rounded-lg mt-6">
          <h2 className="text-lg font-bold mb-2">Add New Bin</h2>
          <div className="space-y-2">
            <input type="text" placeholder="Bin ID" className="w-full p-2 border rounded" value={newBin.id} onChange={(e) => setNewBin({ ...newBin, id: e.target.value })} />
            <input type="text" placeholder="Area" className="w-full p-2 border rounded" value={newBin.area} onChange={(e) => setNewBin({ ...newBin, area: e.target.value })} />
            <input type="text" placeholder="SMaster" className="w-full p-2 border rounded" value={newBin.smaster} onChange={(e) => setNewBin({ ...newBin, smaster: e.target.value })} />
            <input type="text" placeholder="Latitude" className="w-full p-2 border rounded" value={newBin.lat} onChange={(e) => setNewBin({ ...newBin, lat: e.target.value })} />
            <input type="text" placeholder="Longitude" className="w-full p-2 border rounded" value={newBin.lng} onChange={(e) => setNewBin({ ...newBin, lng: e.target.value })} />
            <button onClick={handleAddBin} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">Add Bin</button>
          </div>
        </div>
      </div>

      {/* Right Section - Map Display */}
      <div className="w-2/3 h-screen">
        <MapComponent bins={bins} />
      </div>
    </div>
  );
};

export default Binlocal;
