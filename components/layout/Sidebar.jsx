"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// base nav when not in projectSetup

export default function Sidebar({ isOpen }) {
  const pathname = usePathname();
  const getDefaultExpanded = () => {
    if (pathname.includes("/uploads")) {
      return ["Project Setup"];
    }

    if (
      pathname.includes("/retailerProducts") ||
      pathname.includes("/retailerStores")
    ) {
      return ["Data Validation"];
    }

    if (pathname.includes("/users")) {
      return ["Settings"];
    }

    return ["Project Setup"];
  };
  const [expandedItems, setExpandedItems] = useState([]);

  useEffect(() => {
    setExpandedItems(getDefaultExpanded());
  }, [pathname]);

  // derive nav items based on whether we're in projectSetup routes

  const getNavItems = () => {
    // Retailer Planogram navigation
    if (pathname?.startsWith("/retailerPlanogram")) {
      const parts = pathname.split("/");
      const id = parts[2] || "0";

      return [
        {
          label: "Project Setup",
          href: "#",
          icon: (
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path
                d="M3 7H21V17H3z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          ),
          children: [
            {
              label: "Uploads",
              href: `/retailerPlanogram/${id}/uploads`,
            },
          ],
        },
        {
          label: "Data Validation",
          href: "#",
          icon: (
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M9 12L11 14L15 10"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
          children: [
            {
              label: "Retailer Products",
              href: `/retailerPlanogram/${id}/retailerProducts`,
            },
            {
              label: "Retailer Stores",
              href: `/retailerPlanogram/${id}/retailerStores`,
            },
          ],
        },
        {
          label: "Publish",
          href: `/retailerPlanogram/${id}/publish`,
          icon: (
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path
                d="M12 3V15"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M8 7L12 3L16 7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 21H19"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          ),
        },
        {
          label: "Dashboards",
          href: `/retailerPlanogram/${id}/dashboards`,
          icon: (
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <rect
                x="3"
                y="3"
                width="7"
                height="7"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <rect
                x="14"
                y="3"
                width="7"
                height="7"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <rect
                x="3"
                y="14"
                width="7"
                height="7"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <rect
                x="14"
                y="14"
                width="7"
                height="7"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.8"
              />
            </svg>
          ),
        },
        {
          label: "Settings",
          href: `#`,
          children: [
            {
              label: "Users",
              href: `/retailerPlanogram/${id}/users`,
            },
          ],
          icon: (
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="3"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M12 2V5M12 19V22M2 12H5M19 12H22M4.9 4.9L7 7M17 17L19.1 19.1M19.1 4.9L17 7M7 17L4.9 19.1"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          ),
        },
      ];
    }

    // DEFAULT APP NAVIGATION
    return [
      {
        label: "Dashboard",
        href: "/",
        icon: (
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        ),
      },
      {
        label: "Manage Reports",
        href: "/manageRetailer",
        icon: (
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path
              d="M9 17H15M9 13H15M9 9H11M5 3H19C19.5523 3 20 3.44772 20 4V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V4C4 3.44772 4.44772 3 5 3Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        label: "Admin Menu",
        href: "#",
        icon: (
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
            <path
              d="M5 20C5 16.6863 8.13401 14 12 14C15.866 14 19 16.6863 19 20"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        ),
        children: [
          { label: "Master Data", href: "/admin/master-data" },
          { label: "Manage TimePeriod", href: "/admin/time-period" },
          { label: "Manage Users", href: "/admin/users" },
        ],
      },
    ];
  };
  const navItems = useMemo(() => getNavItems(), [pathname]);

  // Auto-expand parent when a child route is active
  useEffect(() => {
    const parent = navItems.find(
      (item) =>
        item.children &&
        item.children.some(
          (c) => pathname === c.href || pathname?.startsWith(c.href + "/")
        )
    );

    if (parent) {
      setExpandedItems((prev) =>
        prev.includes(parent.label) ? prev : [...prev, parent.label]
      );
    }
  }, [pathname, navItems]);

  return (
    <aside className={`h-screen bg-gray-900 text-white transition-all duration-200 flex flex-col ${isOpen ? 'w-72' : 'w-16'}`}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-4">
        <div className="flex items-center justify-center w-8 h-8">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
            <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        </div>
        {isOpen && (
          <Link href="/" className="flex flex-col">
            <span className="text-red-500 text-lg font-semibold">Reveal</span>
            <span className="text-white text-base">Space Analysis System</span>
          </Link>
        )}
      </div>

      {/* Nav */}
      <nav className="px-2 flex-1 overflow-auto" role="navigation" aria-label="Main navigation">
        {navItems.map((item) => {
          const isExpanded = expandedItems.includes(item.label);
          const isActive =
            item.children?.some(
              (child) =>
                pathname === child.href || pathname.startsWith(child.href + "/")
            ) ||
            (item.href !== "#" &&
              (pathname === item.href || pathname.startsWith(item.href + "/")));

          // render a toggle button for items with children to improve accessibility
          if (item.children) {
            const submenuId = `submenu-${item.label.replace(/\s+/g, "-")}`;

            return (
              <div key={item.label}>
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={submenuId}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setExpandedItems((prev) =>
                        prev.includes(item.label)
                          ? prev.filter((x) => x !== item.label)
                          : [...prev, item.label]
                      );
                    }
                  }}
                  onClick={() =>
                    setExpandedItems((prev) =>
                      prev.includes(item.label)
                        ? prev.filter((x) => x !== item.label)
                        : [...prev, item.label]
                    )
                  }
                  className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-gray-500 text-white font-semibold border-l-4 border-[#F40009] pl-2' : 'text-white hover:bg-gray-500'}`}
                >
                  <span className="w-5 h-5">{item.icon}</span>
                  {isOpen && (
                    <>
                      <span className="flex-1 text-lg">{item.label}</span>
                      <span className={`ml-2 ${isExpanded ? 'rotate-180' : ''} transition-transform`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </>
                  )}
                </button>

                {isExpanded && isOpen && (
                  <div id={submenuId} role="group" aria-label={`${item.label} submenu`} className="pl-8 mt-1 flex flex-col gap-1">
                    {item.children.map((child) => {
                      const childActive = pathname === child.href || pathname?.startsWith(child.href + "/");
                      return (
                        <Link
                          key={child.label}
                          href={child.href}
                          aria-current={childActive ? 'page' : undefined}
                          className={`text-base px-2 py-1 rounded-md ${childActive ? 'bg-gray-500 text-white' : 'text-white hover:bg-gray-500'}`}
                        >
                          <span className="inline-block w-2 h-2 rounded-full bg-[#F40009] mr-2 align-middle" />
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          // normal link item
          return (
            <div key={item.label}>
              <Link
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-gray-500 text-white font-semibold border-l-4 border-[#F40009] pl-2' : 'text-white hover:bg-gray-500'}`}
              >
                <span className="w-5 h-5">{item.icon}</span>
                {isOpen && <span className="flex-1 text-lg">{item.label}</span>}
              </Link>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}