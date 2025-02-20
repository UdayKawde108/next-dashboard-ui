import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

interface Bin {
  id: string;      // ✅ Matches Firebase key
  area: string;    // ✅ Firebase field: 'area'
  smaster: string; // ✅ Firebase field: 'smaster'
  sworker?: string; // ✅ Firebase field: 'sworker'
  level: number;   // ✅ Firebase field: 'level'
  lat: number;     // ✅ Firebase field: 'lat' (latitude)
  lng: number;     // ✅ Firebase field: 'lng' (longitude)
}

// Define props interface
interface MapComponentProps {
  bins: Bin[];
}

// Function to get marker color based on bin level
const getMarkerColor = (level: number) => {
  if (level >= 90) return "red";   // Critical level 🚨
  if (level >= 51) return "yellow"; // Warning level ⚠️
  return "green";                   // Normal level ✅
};

// Create custom marker icons
const createCustomIcon = (color: string) =>
  new L.Icon({
    iconUrl: `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

const MapComponent: React.FC<MapComponentProps> = ({ bins }) => {
  return (
    <MapContainer style={{ width: "100%", height: "100%" }} center={[19.076, 72.8777]} zoom={12}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {bins.map((bin) => {
  if (!bin.lat || !bin.lng) return null; // Skip if coordinates are missing ✅

  return (
    <Marker
      key={bin.id}
      position={[bin.lat, bin.lng]}
      icon={createCustomIcon(getMarkerColor(bin.level))}
    >
      <Popup>
        <div>
          <h3>Area: {bin.area}</h3>
          <p><strong>Bin Level:</strong> {bin.level}%</p>
          <p><strong>Smaster:</strong> {bin.smaster}</p>
          <p><strong>Sworker:</strong> {bin.sworker || "N/A"}</p>
        </div>
      </Popup>
    </Marker>
  );
})}
    </MapContainer>
  );
};

export default MapComponent;
