"use client";

import AppLayout from "@/components/layout/AppLayout";
import RoleGuard from "./components/RoleGuard";
import { useState } from "react";
import SuperSet from "./components/superset/SuperSet";



export default function HomePage() {
  const embeddedId = process.env.NEXT_PUBLIC_EMBEDDED_ID


  const [getTok, setGetTok] = useState("");
  return (
    <RoleGuard
      allowedRoles={[
        "admin",
        "retailer",
        "user",
      ]}
    >
      <AppLayout>
        {/* <h1 className="text-2xl font-bold">
          Dashboard
        </h1> */}

        <div
          id="superset-container"
          className="w-full h-screen"
        >
          <SuperSet
            EMBEDDED_ID={embeddedId}
            setGetTok={setGetTok}
          />
        </div>
      </AppLayout>
    </RoleGuard>
  );
}