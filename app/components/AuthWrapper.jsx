"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";
import LoadingSpinner from "./loading/LoadingSpinner";

export default function AuthWrapper({ children }) {
  const { user, loading } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    // NOT LOGGED IN
    if (!user) {
      if (pathname !== "/login") {
        router.replace("/login");
      }
      return;
    }

    // LOGGED IN
    if (pathname === "/login") {
      switch (user.role) {
        case "admin":
          router.replace("/manageRetailer");
          break;

        case "retailer":
          router.replace("/retailerPlanogram");
          break;

        default:
          router.replace("/");
      }
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  // Block page render while redirecting
  if (!user && pathname !== "/login") {
    return <LoadingSpinner />;
  }

  if (user && pathname === "/login") {
    return <LoadingSpinner />;
  }

  return children;
}