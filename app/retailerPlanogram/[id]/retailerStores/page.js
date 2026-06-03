"use client";

import AppLayout from "@/components/layout/AppLayout";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const id = params?.id || '0';

  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Retailer Stores, (ID: {id})</h1>
        
      </div>
    </AppLayout>
  );
}
