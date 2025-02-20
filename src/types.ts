export interface Bin {
  id: string;
  area: string;
  smaster: string;
  sworker?: string;  // ✅ Made optional
  level: number;
  lat: number;
  lng: number;
}