import { useState } from "react";
import AdminOverview from "../components/admin/AdminOverview";
import AdminProducts from "../components/admin/AdminProducts";
import AdminOrders from "../components/admin/AdminOrders";
import AdminCustomers from "../components/admin/AdminCustomers";
import AdminReviews from "../components/admin/AdminReviews";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../components/admin/AdminSidebar";

function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("Overview");
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="relative flex bg-gray-100 min-h-screen">
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-5 left-5 z-40 bg-black text-white px-4 py-3 rounded-xl"
      >
        ☰
      </button>

      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 p-6 lg:p-10 lg:ml-72 mt-20 lg:mt-0">
        {activeTab === "Overview" && <AdminOverview />}

        {activeTab === "Products" && <AdminProducts />}

        {activeTab === "Orders" && <AdminOrders />}

        {activeTab === "Customers" && <AdminCustomers />}

        {activeTab === "Reviews" && <AdminReviews />}
      </div>
    </div>
  );
}

export default AdminDashboardPage;
