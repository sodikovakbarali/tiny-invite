"use client";

import { useEffect, useRef } from "react";

interface UsePageTrackingOptions {
  name?: string;
}

export function usePageTracking({ name }: UsePageTrackingOptions = {}) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        path: window.location.pathname + window.location.search,
      }),
    }).catch(() => {
      // Silent fail — tracking should never block the invite flow.
    });
  }, [name]);
}
