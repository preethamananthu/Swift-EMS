"use client";
import { useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from 'next/navigation';



export default function page() {
  const [login, setLogin] = useState(false);

  const router = useRouter();


  const emailRef = useRef(null); // Simplified type for useRef
  const passwordRef = useRef(null); // Simplified type for useRef

  const signup = async (e, type) => {
    e.preventDefault();
    const email = emailRef.current.value; // Removed optional chaining as it's not necessary here
    const password = passwordRef.current.value; // Removed optional chaining as it's not necessary here

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      // Use destructuring to get the user from userCredential directly
      const { user } = type === "signup"
        ? await createUserWithEmailAndPassword(auth, email, password)
        : await signInWithEmailAndPassword(auth, email, password);

      router.push("/Signed");
    } catch (error) {
      const errorMessage = error.message;
      alert(`Failed to ${type === "signup" ? "sign up" : "sign in"}: ${errorMessage}`);
      setLogin(true);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center custom-background">
      <div className="flex flex-col items-center justify-center shadow-md p-10 lg:w-[1290px] lg:h-[600px] bg-[rgba(255,255,255,0.8)] rounded-md">
        <div className="w-52 flex justify-between items-center font-semibold text-white">
          <div className={login === false ? "btn-active" : "btn"} onClick={() => setLogin(false)}>
            Sign Up
          </div>
          <div className={login === true ? "btn-active" : "btn"} onClick={() => setLogin(true)}>
            Sign In
          </div>
        </div>

        <form onSubmit={(e) => signup(e, login ? "signin" : "signup")} className="flex flex-col">
          <input name="email" type="email" ref={emailRef} placeholder="Email" className="px-4 py-2 rounded-md mb-1 border"/>
          <input name="pass" type="password" ref={passwordRef} placeholder="Password" className="px-4 py-2 rounded-md mb-2 border"/>
          <button type="submit" className="bg-green-600 py-2 px-2 rounded-md font-semibold text-white">
            {login ? "Sign In" : "Sign Up"}
          </button>
        </form>
      </div>
      <p className="text-white text-xs absolute bottom-0 tracking-widest">Copyright &copy; 2023  |  Preetham Ananthu  |  All Rights Reserved</p>
    </main>
  );
}
