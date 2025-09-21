"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { Login03 } from "@/components/ui/login-03";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailLogin = async (data: { email: string; password: string }) => {
    setLoading(true);
    setError("");

        try {
          await signInWithEmailAndPassword(auth, data.email, data.password);
          router.push("/select-role");
        } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
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
      onSubmit={handleEmailLogin}
      onGoogleAuth={handleGoogleLogin}
      loading={loading}
      error={error}
    />
  );
}