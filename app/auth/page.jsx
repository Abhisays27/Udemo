// Import dependencies
"use client"

import styles from "@/styles/auth.module.css";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import "@/styles/global.css";
import { useGlobalContext } from "@/utils/useContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js"
import GoogleButton from 'react-google-button'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl) throw new Error('Supabase URL not found.')
if (!supabaseAnonKey) throw new Error('Supabase Anon key not found.')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function AuthForm() {
  const { login, user } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state variable
  const [view, setView] = useState("sign-in");
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password.length < 5)
      return alert("Password must be at least 5 characters long");
    if (password !== confirmPassword) // Check if passwords match
      return alert("Passwords do not match");

    const res = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/v1/callback`,
      },
    });
    if (res.error) {
      return alert(res.error.message);
    }
    setView("check-email");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (res.error) {
      return alert(res.error.message);
    }
    router.push("/");
    router.refresh();
  };

  // Function to handle Google authentication
  const handleGoogleSignIn = async () => {
    const { user, error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) {
      alert("Google authentication failed. Please try again.");
    } else if (user) {
      // Set the user details in the global context or update login status
      login(user);
      // Redirect to the homepage or desired page
      router.push("/");
    }
  };
  
  const { userDetails } = useGlobalContext();
  if (userDetails?.email) {
    router.push("/");
  }

  return (
    
    <div className={styles.container}>
       
      <div className="google">
        <GoogleButton type="dark" onClick={handleGoogleSignIn} />
      </div>
      
      <div className={styles.orOption}>OR</div>
      
      {view === "check-email" ? (
        <p className={styles.checkEmailText}>
          Check <span className={styles.bold}>{email}</span> to continue signing up
        </p>
      ) : (
        <form className={styles.form} onSubmit={view === "sign-in" ? handleSignIn : handleSignUp}>
          <label className={styles.textMd} htmlFor="email">
            Email
          </label>
          <input
            className={styles.input}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="abhi@example.com"
          />
          <label className={styles.textMd} htmlFor="password">
            Password
          </label>
          <input
            className={styles.input}
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="•••••••• ( min 5 characters )"
          />

          {/* Confirm Password input for sign-up */}
          {view === "sign-up" && (
            <>
              <label className={styles.textMd} htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className={styles.input}
                type="password"
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                placeholder="•••••••• ( min 5 characters )"
              />
            </>
          )}

          {view === "sign-in" ? (
            <>
              <button className={styles.submitButton}>Log In</button>
              <p className={styles.optionText}>
                Don&rsquo;t have an account?
                <span
                  className={styles.optionLink}
                  onClick={() => setView("sign-up")}
                >
                  Register Now
                </span>
              </p>
            </>
          ) : (
            <>
              <button className={styles.submitButton}>Sign Up</button>
              <p className={styles.optionText}>
                Already have an account?
                <span
                  className={styles.optionLink}
                  onClick={() => setView("sign-in")}
                >
                  Log In 
                </span>
              </p>
            </>
          )}
        </form>
      )}
    </div>
  );
}
