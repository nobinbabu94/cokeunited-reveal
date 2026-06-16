"use client";

import { lambdaGet } from "@/app/lamda/lambdaClient";
import { embedDashboard } from "@preset-sdk/embedded";
import React, { useEffect, useState } from "react";

const SuperSet = ({ EMBEDDED_ID, setGetTok, report }) => {
  const [tok, setTok] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchGuestTokenFromBackend() {
    try {
      setLoading(true);

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

    const loadDashboard = async () => {
      try {
        setLoading(true);

        const mountPoint = document.getElementById("analytic2");
        const presetDashboard = process.env.NEXT_PUBLIC_PRESET_URL;

        if (!mountPoint) return;

        mountPoint.innerHTML = "";

        await embedDashboard({
          id: EMBEDDED_ID,
          supersetDomain: presetDashboard,
          mountPoint,
          fetchGuestToken: fetchGuestTokenFromBackend,
          dashboardUiConfig: {
            hideTitle: true,
            hideChartControls: false,
          },
        });
      } catch (error) {
        console.error("Error embedding dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [EMBEDDED_ID, report]);

  return (
    <main className="w-full h-full relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-50">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
        </div>
      )}

      <div
        id="analytic2"
        className="w-full h-full"
      />
    </main>
  );
};

export default SuperSet;