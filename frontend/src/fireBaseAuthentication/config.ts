
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyAMd0Lv7B0fwp42wOJy_K7Z52aVDsQI4Rc",
  authDomain: "nestify-ba8c8.firebaseapp.com",
  projectId: "nestify-ba8c8",
  storageBucket: "nestify-ba8c8.firebasestorage.app",
  messagingSenderId: "247501862679",
  appId: "1:247501862679:web:b2329dc7c5bdf52a60a952",
  measurementId: "G-406KXNX11B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app