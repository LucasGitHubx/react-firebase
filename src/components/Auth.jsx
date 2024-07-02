import { auth, googleProvider } from "../config/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(auth?.currentUser?.email);

  async function signIn(e) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function signInWithGoogle(e) {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function logOutWithGoogle(e) {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign in</button>

      <button onClick={signInWithGoogle}>Sign in with google</button>
      <button onClick={logOutWithGoogle}>Log Out</button>
    </div>
  );
}
