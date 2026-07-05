import { useEffect, useState, useCallback } from "react";
import { doc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { DEFAULT_STATE } from "../lib/constants";

const docRef = doc(db, "state", "bagsTracker");

// Realtime Firestore-backed state for the Bags Left Tracker module.
// Both the dashboard and the overlay page use this same hook, so any
// change made on the dashboard reaches the overlay the instant Firestore
// pushes the update (usually well under a second).
//
// Writes use setDoc(..., { merge: true }) instead of updateDoc on purpose:
// it works whether or not the document exists yet, so the very first
// change the admin makes creates it — no separate "initialize the
// database" step needed, and the public overlay page never has to write
// anything (it only reads), which keeps the security rules simple:
// public read, authenticated-only write.
export function useDripState() {
  const [data, setData] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(
      docRef,
      (snap) => {
        setConnected(true);
        setData(snap.exists() ? { ...DEFAULT_STATE, ...snap.data() } : DEFAULT_STATE);
      },
      (err) => {
        console.error("Drip Control: lost connection to Firestore:", err);
        setConnected(false);
      }
    );
    return () => unsub();
  }, []);

  const update = useCallback((patch) => {
    return setDoc(docRef, { ...patch, updatedAt: serverTimestamp() }, { merge: true });
  }, []);

  const resetAll = useCallback(() => {
    return setDoc(docRef, { ...DEFAULT_STATE, updatedAt: serverTimestamp() });
  }, []);

  return { data, connected, update, resetAll };
}
