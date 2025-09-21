"use client";

import { useEffect } from "react";
import { app } from "@/lib/firebase";
import { getAnalytics, isSupported, logEvent } from "firebase/analytics";

export function FirebaseAnalytics() {
  useEffect(() => {
    const initializeAnalytics = async () => {
      if (typeof window !== "undefined") {
        const supported = await isSupported();
        if (supported) {
          const analytics = getAnalytics(app);
          logEvent(analytics, "page_view", {
            page_title: "Orbet - AI-Powered Recruitment Platform",
            page_location: window.location.href,
          });
        }
      }
    };

    initializeAnalytics();
  }, []);

  return null; // This component doesn't render anything
}
