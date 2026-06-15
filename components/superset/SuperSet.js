"use client";
import { lambdaGet } from "@/app/lamda/lambdaClient";
import { embedDashboard } from "@preset-sdk/embedded";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";


const SuperSet = ({ EMBEDDED_ID, setGetTok, report, dash = null }) => {

  // EMBEDDED_ID may be passed asynchronously by parent; log for debugging
  console.log(EMBEDDED_ID, "EMBEDDED_ID");

  const [tok, setTok] = useState("");

  async function fetchGuestTokenFromBackend() {
    try {
      if (!EMBEDDED_ID) {
        console.warn("fetchGuestTokenFromBackend called without EMBEDDED_ID");
        return null;
      }

      const url = `/getdashboardtoken/${EMBEDDED_ID}`;
      const res = await lambdaGet(url);

      // Support multiple possible response shapes
      const token = res?.response?.token || res?.token || res?.response?.body?.token || null;
      if (!token) {
        console.warn("No token found in response", res);
        return null;
      }

      setGetTok && setGetTok(token);
      setTok(token);
      return token;
    } catch (error) {
      console.error("Error fetching guest token:", error);
      return null;
    }
  }


  useEffect(() => {
    // Only attempt embedding when an id is available
    if (!EMBEDDED_ID) return;

    const el2 = document.getElementById("superset-container");
    const dashboardId = EMBEDDED_ID;
    const presetDashboard = process.env.NEXT_PUBLIC_PRESET_URL;
    if (el2 && dashboardId) {
      embedDashboard({
        id: dashboardId,
        supersetDomain: presetDashboard,
        mountPoint: document.getElementById("analytic2"),
        fetchGuestToken: fetchGuestTokenFromBackend,
        dashboardUiConfig: {
          hideTitle: true,
          hideChartControls: false,
          filters: {
            expanded: report === "report",
          },
        },
      }).catch((error) => {
        console.error("error embedding dashboard", error);
      });
    }
  }, [EMBEDDED_ID]);



  return (
    <>
      <main className="MainAnalytic1" >
        <div
          className={dash === 'dash' ? "analytic2" : "analytic"}
          id="analytic2"
          style={{ width: '100%', height: '100%' }}
        ></div>
      </main>
    </>
  );
};

export default SuperSet;