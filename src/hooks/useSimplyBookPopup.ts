"use client";

import { useEffect, useCallback } from "react";

const COMPANY = process.env.NEXT_PUBLIC_SIMPLYBOOK_COMPANY ?? "";

/**
 * Loads the SimplyBook widget script once and provides an `open()` function
 * that launches the booking popup overlay without navigating away.
 */
export function useSimplyBookPopup() {
  useEffect(() => {
    // Only load the script once
    if (document.getElementById("simplybook-widget-script")) return;

    const script = document.createElement("script");
    script.id = "simplybook-widget-script";
    script.src = "https://widget.simplybook.me/v2/widget/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const open = useCallback(() => {
    // @ts-expect-error – SimplybookWidget is injected by the external script
    if (typeof window.SimplybookWidget === "undefined") {
      // Script hasn't loaded yet — fall back to opening in a new tab
      window.open(`https://${COMPANY}.simplybook.me`, "_blank");
      return;
    }

    // @ts-expect-error – SimplybookWidget is injected by the external script
    new window.SimplybookWidget({
      widget_type: "button",
      url: `https://${COMPANY}.simplybook.me`,
      theme: "default",
      theme_settings: {
        timeline_hide_unavailable: "1",
        hide_past_days: "0",
        timeline_modern_display: "as_table",
        sb_base_color: "#2563eb",
        btn_color_1: "#1d4ed8",
        link_color: "#2563eb",
        display_item_mode: "block",
      },
    });

    // The "button" widget type auto-opens a popup. SimplybookWidget creates a
    // trigger element; we click it programmatically so it opens immediately.
    requestAnimationFrame(() => {
      const trigger = document.querySelector(
        ".simplybook-widget-button"
      ) as HTMLElement | null;
      trigger?.click();
    });
  }, []);

  return open;
}
