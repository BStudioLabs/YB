"use client";

import { useEffect } from "react";

/** Start at the top on page load/refresh instead of restoring scroll position.
 *  Direct anchor links (e.g. /#contact) are left alone. */
export default function ScrollToTop() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (!location.hash) window.scrollTo(0, 0);
  }, []);
  return null;
}
