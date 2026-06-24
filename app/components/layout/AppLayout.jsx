
import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AppLayout({ children }) {

  return (
    <div className="flex h-screen">
      {/* <Sidebar isOpen={isOpen} onToggleSidebar={() => setIsOpen(!isOpen)} /> */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main
          className="
    flex-1
    overflow-auto
    p-4
    bg-gray-100
    dark:bg-[#191919]
    text-gray-900
    dark:text-white
  "
        >
          {children}</main>
        <Footer />
      </div>

    </div>
  );
}