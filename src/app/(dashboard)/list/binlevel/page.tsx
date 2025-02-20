"use client";
import { useState, useEffect } from "react";
import { database } from "@/firebase/firebaseConfig";
import { ref, onValue } from "firebase/database";

const Binlevel = () => {
  const [binData, setBinData] = useState({
    id: "Loading...",
    area: "Loading...",
    smaster: "Loading...",
    level: 0,
  });

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const binRef = ref(database, "bins/bin1");

    onValue(binRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setBinData({
          id: data.id,
          area: data.area,
          smaster: data.smaster,
          level: data.level,
        });

        // Show alert if bin level reaches 90% or more
        if (data.level >= 90) {
          setShowAlert(true);
        } else {
          setShowAlert(false);
        }
      }
    });
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-900 mb-4">Bin Level Monitoring</h1>

      {/* Alert Message */}
      {showAlert && (
        <div className="bg-red-600 text-white p-3 rounded-lg mb-4 text-center font-bold">
          ⚠ Call SMaster ({binData.smaster})! Action Required!
        </div>
      )}

      <div className="bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4">
        <img src="/bin-icon.png" alt="Bin Icon" className="w-16 h-16" />
        <div>
          <p className="text-lg font-semibold">Bin ID: {binData.id}</p>
          <p className="text-lg">Area: {binData.area}</p>
          <p className="text-lg">Assigned SMaster: {binData.smaster}</p>
          <p className={`text-lg font-bold ${binData.level >= 90 ? "text-red-600" : "text-green-600"}`}>
            Bin Level: {binData.level}% Full
          </p>
        </div>
      </div>
    </div>
  );
};

export default Binlevel;
