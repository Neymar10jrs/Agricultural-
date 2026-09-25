import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2oLwzjpFhiwDLWDdSend1qv_n-ct5hMc",
  authDomain: "sign-in-method-46a0f.firebaseapp.com",
  projectId: "sign-in-method-46a0f",
  storageBucket: "sign-in-method-46a0f.firebasestorage.app",
  messagingSenderId: "608935694692",
  appId: "1:608935694692:web:2c9fc364b9c3f6e15b2a71",
  measurementId: "G-5PR937C66W"
};

const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export default app;
