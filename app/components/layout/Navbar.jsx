"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../AuthProvider";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  const { logout } = useAuth();

  const isRetailerPlanogram =
    pathname?.startsWith("/retailerPlanogram");

  const parts = pathname?.split("/") || [];
  const projectId = parts[2];

  const projectName = projectId
    ? `Project ${projectId}`
    : "Retailer Planogram";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <header className="flex items-center px-4 py-3 bg-white border-b border-gray-200">
      {/* Retailer Planogram Header */}
      {isRetailerPlanogram && (
        <div className="flex items-center">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-[#0066B3] transition-colors cursor-pointer"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="text-sm">Back</span>
          </button>

          <div className="mx-4 h-6 w-px bg-gray-200" />

          <div className="flex flex-col">
            <span className="text-gray-800 font-semibold text-lg">
              {projectName}
            </span>

            <span className="text-gray-400 text-xs">
              Retailer Planogram
            </span>
          </div>
        </div>
      )}
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-2 pl-2 pr-24">
          <img
            src="/cokeunited-logo.png"
            alt="Parker's Kitchen"
            className="h-16   w-auto"
          />
          <img
            src="/Parkers-Kitchen-Logo.png"
            alt="Parker's Kitchen"
            className="h-10   w-auto"
          />
        </Link>
      </div>
      {/* Report Details */}
      <div className="flex-1 flex justify-start">


        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="font-medium text-gray-800">
            Category Report
          </span>

          <div className="h-4 w-px bg-gray-300" />

          <span>
            Data Last Updated:
            <span className="ml-1 font-medium text-gray-800">
              6/12/2025
            </span>
          </span>

          <div className="h-4 w-px bg-gray-300" />

          <span>
            WE:
            <span className="ml-1 font-medium text-gray-800">
              6/12 (Week 24)
            </span>
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        {/* <button
          className="p-2 rounded-md hover:bg-gray-100 text-gray-500 hover:text-[#0066B3] transition-colors"
          aria-label="Notifications"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.73 21a2 2 0 0 1-3.46 0"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button> */}

        {/* User Menu */}
        <div
          className="relative group"
          ref={menuRef}
        >
          <button
            className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 text-gray-600 hover:text-[#0066B3] transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0066B3] flex items-center justify-center">
              {/* User Icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="8"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              className="transition-transform duration-200 group-hover:rotate-180"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl border border-gray-200 overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            {/* Profile */}
            <button
              onClick={() => router.push("/profile")}
              className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="8"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>

              Profile
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9 21H5C4.44772 21 4 20.5523 4 20V4C4 3.44772 4.44772 3 5 3H9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M16 17L21 12L16 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 12H9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>

              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}