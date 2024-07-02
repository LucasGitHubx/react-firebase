import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDXQSh2lteGSm1Ep50IVUTGQhdnmqe-kr0",
  authDomain: "fir-react-a8dbd.firebaseapp.com",
  projectId: "fir-react-a8dbd",
  storageBucket: "fir-react-a8dbd.appspot.com",
  messagingSenderId: "957484932386",
  appId: "1:957484932386:web:16e0787e3baf8fd3b1197b",
  measurementId: "G-7T8EC7N2SF",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
