"use client";

import { lambdaGet } from "@/app/lamda/lambdaClient";
import { embedDashboard } from "@preset-sdk/embedded";
import React, { useEffect, useState } from "react";

const SuperSet = ({ EMBEDDED_ID, setGetTok, report }) => {
  const [tok, setTok] = useState("");

  async function fetchGuestTokenFromBackend() {
    try {
      if (!EMBEDDED_ID) {
        console.warn(
          "fetchGuestTokenFromBackend called without EMBEDDED_ID"
        );
        return null;
      }

      const url = `/getdashboardtoken/${EMBEDDED_ID}`;
      const res = await lambdaGet(url);

      const token =
        res?.response?.token ||
        res?.token ||
        res?.response?.body?.token ||
        null;

      if (!token) {
        console.warn("No token found in response", res);
        return null;
      }

      setGetTok?.(token);
      setTok(token);

      return token;
    } catch (error) {
      console.error("Error fetching guest token:", error);
      return null;
    }
  }

  useEffect(() => {
    if (!EMBEDDED_ID) return;

    const mountPoint = document.getElementById("analytic2");
    const presetDashboard = process.env.NEXT_PUBLIC_PRESET_URL;

    if (!mountPoint) return;

    mountPoint.innerHTML = "";

    embedDashboard({
      id: EMBEDDED_ID,
      supersetDomain: presetDashboard,
      mountPoint,
      fetchGuestToken: fetchGuestTokenFromBackend,
      dashboardUiConfig: {
        hideTitle: true,
        hideChartControls: false,
        filters: {
          expanded: report === "report",
        },
      },
    }).catch((error) => {
      console.error("Error embedding dashboard:", error);
    });
  }, [EMBEDDED_ID, report]);

  return (
    <main className="w-full h-full">
      <div
        id="analytic2"
        className="w-full h-full"
      />
    </main>
  );
};

export default SuperSet;