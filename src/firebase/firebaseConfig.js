// Import the required functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // For Realtime Database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBedoDvm_FLyIqg34WK6c06PyPxyL1SWIc",
  authDomain: "binlevelmonitor.firebaseapp.com",
  databaseURL: "https://binlevelmonitor-default-rtdb.asia-southeast1.firebasedatabase.app",  // ✅ Add this
  projectId: "binlevelmonitor",
  storageBucket: "binlevelmonitor.firebasestorage.app",
  messagingSenderId: "43239387515",
  appId: "1:432393875152:web:e03f978e8d0c9be22038d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Initialize Realtime Database

// Export Firebase modules
export { database };
