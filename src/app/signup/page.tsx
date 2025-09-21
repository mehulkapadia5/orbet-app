"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { Login03 } from "@/components/ui/login-03";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailSignup = async (data: { email: string; password: string; name?: string; confirmPassword?: string }) => {
    setLoading(true);
    setError("");

    try {
      if (data.password !== data.confirmPassword) {
        setError("Passwords don't match");
        setLoading(false);
        return;
      }
          await createUserWithEmailAndPassword(auth, data.email, data.password);
          router.push("/select-role");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError("");

        try {
          await signInWithPopup(auth, googleProvider);
          router.push("/select-role");
        } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Login03
      onSubmit={handleEmailSignup}
      onGoogleAuth={handleGoogleSignup}
      loading={loading}
      error={error}
    />
  );
}