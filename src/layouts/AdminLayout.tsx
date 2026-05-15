import { useState } from "react";

import AdminSidebar from "../components/admin/AdminSidebar";

type Props = {
  activeTab: string;

  setActiveTab: (
    tab: string,
  ) => void;

  onLogout: () => void;

  children: React.ReactNode;
};

function AdminLayout({
  activeTab,
  setActiveTab,
  onLogout,
  children,
}: Props) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() =>
          setSidebarOpen(true)
        }
        className="lg:hidden fixed top-5 left-5 z-40 bg-black text-white px-4 py-3 rounded-xl"
      >
        ☰
      </button>

      {/* SIDEBAR */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={onLogout}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={
          setSidebarOpen
        }
      />

      {/* PAGE CONTENT */}
      <div className="flex-1 p-6 lg:p-10">
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;