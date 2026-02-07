/**
 * SimplyBook.me booking widget loader (client-side).
 *
 * This component embeds the SimplyBook widget script so visitors can
 * book directly on your site without being redirected.
 *
 * Set NEXT_PUBLIC_SIMPLYBOOK_COMPANY in your .env.local to your
 * SimplyBook company login / subdomain.
 */
"use client";

import { useEffect } from "react";

interface SimplyBookWidgetProps {
  /** Override the company login (defaults to env var) */
  company?: string;
  /** Pre-select a specific service/event by ID */
  service?: string;
}

export default function SimplyBookWidget({ company, service }: SimplyBookWidgetProps) {
  const companyLogin =
    company ?? process.env.NEXT_PUBLIC_SIMPLYBOOK_COMPANY ?? "";

  useEffect(() => {
    if (!companyLogin) {
      console.warn("SimplyBookWidget: no company login provided.");
      return;
    }

    // Avoid loading the script twice
    if (document.getElementById("simplybook-widget-script")) return;

    const script = document.createElement("script");
    script.id = "simplybook-widget-script";
    script.src =
      "https://widget.simplybook.me/v2/widget/widget.js";
    script.async = true;
    script.onload = () => {
      // @ts-expect-error – SimplybookWidget is injected by the script
      new window.SimplybookWidget({
        widget_type: "iframe",
        url: `https://${companyLogin}.simplybook.me`,
        theme: "default",
        theme_settings: {
          timeline_hide_unavailable: "1",
          hide_past_days: "0",
          timeline_modern_display: "as_table",
          sb_base_color: "#2563eb", // Tailwind blue-600
          btn_color_1: "#1d4ed8",
          link_color: "#2563eb",
          display_item_mode: "block",
        },
        container_id: "simplybook-widget-container",
        ...(service ? { navigate: "book", service } : {}),
      });
    };
    document.body.appendChild(script);
  }, [companyLogin]);

  return (
    <div
      id="simplybook-widget-container"
      className="w-full min-h-[600px]"
    />
  );
}
