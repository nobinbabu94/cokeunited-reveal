"use client";

import AppLayout from "@/app/components/layout/AppLayout";
import RoleGuard from "../components/RoleGuard";
import ManageRetailer from "../components/ManageRetailer";



export default function Page() {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <AppLayout>
        <ManageRetailer />
      </AppLayout>
    </RoleGuard>
  );
}