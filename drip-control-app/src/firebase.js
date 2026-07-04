import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  getFirestore,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// These come from your .env file (see .env.example). Never commit real
// values to git — Vite only exposes variables prefixed with VITE_ to the
// browser, and Firebase's client config is meant to be public anyway
// (security is enforced by firestore.rules, not by hiding this config).
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);

// Multi-tab persistent cache means a brief connection drop (wifi hiccup
// mid-stream) doesn't blank the dashboard or overlay — they keep showing
// the last known value and resync automatically once the connection
// returns. Some embedded browser contexts (private browsing, or an
// unusually locked-down browser source) don't support IndexedDB, so this
// falls back to the plain in-memory client rather than crashing the app.
let firestoreInstance;
try {
  firestoreInstance = initializeFirestore(app, {
    localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
  });
} catch (err) {
  console.warn("Firestore persistent cache unavailable, falling back to in-memory cache:", err);
  firestoreInstance = getFirestore(app);
}
export const db = firestoreInstance;

export const auth = getAuth(app);
