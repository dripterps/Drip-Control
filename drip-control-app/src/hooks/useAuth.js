import { useEffect, useState, useCallback } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut as fbSignOut } from "firebase/auth";
import { auth } from "../firebase";

// user === undefined -> still checking; null -> signed out; object -> signed in
export function useAuth() {
  const [user, setUser] = useState(undefined);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  const signIn = useCallback(
    (email, password) => signInWithEmailAndPassword(auth, email, password),
    []
  );
  const signOut = useCallback(() => fbSignOut(auth), []);

  return { user, loading: user === undefined, signIn, signOut };
}
