"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import LoadingSpinner from "./loading/LoadingSpinner";

export default function AuthWrapper({
  children,
  mode = "protected",
}) {
  const router = useRouter();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (mode === "protected" && !user) {
      router.replace("/login");
    }

    if (mode === "auth" && user) {
      router.replace("/");
    }
  }, [loading, user, mode, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (mode === "protected" && !user) {
    return <LoadingSpinner />;
  }

  return children;
}