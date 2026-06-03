"use client";

import { usePathname, useRouter } from "next/navigation";

export default function Navbar({ onToggleSidebar }) {
  const pathname = usePathname();
  const router = useRouter();

  const isRetailerPlanogram = pathname?.startsWith("/retailerPlanogram");

  // Example:
  // /retailerPlanogram/123/publish
  const parts = pathname?.split("/") || [];
  const projectId = parts[2];

  // Later replace this with actual project name from API
  const projectName = projectId
    ? `Project ${projectId}`
    : "Retailer Planogram";

  return (
    <header className="flex items-center px-4 py-2 bg-gray-900">
      {/* Hamburger */}
      <button
        className="p-2 rounded-md hover:bg-gray-500 text-white cursor-pointer"
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 6H20M4 12H20M4 18H20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Project Header */}
      {isRetailerPlanogram && (
        <div className="flex items-center ml-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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

          <div className="mx-4 h-6 w-px bg-gray-600" />

          <div className="flex flex-col">
            <span className="text-white font-semibold text-lg">
              {projectName}
            </span>
            <span className="text-gray-400 text-xs">
              Retailer Planogram
            </span>
          </div>
        </div>
      )}

      <div className="flex-1" />

      {/* Right section */}
      <div className="flex items-center gap-3">
        <button
          className="p-2 rounded-md hover:bg-gray-500 text-white"
          aria-label="Notifications"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center font-medium">
            F
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </header>
  );
}