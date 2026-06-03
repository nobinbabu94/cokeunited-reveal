"use client";

import AppLayout from "@/components/layout/AppLayout";
import Link from "next/link";
import ManageRetailer from "../ManageRetailer";

export default function Table({ rows = [] }) {
  const columns = [
    "Created",
    "Retailer Name",
    "Call Points",
    "Time Period",
    "Set Status",
    "Total Planograms",
    "Total Products",
    "Total Stores",
    "Status",
    "Action",
  ];

  return (
    <AppLayout>
      <ManageRetailer />
    </AppLayout>
  );
}