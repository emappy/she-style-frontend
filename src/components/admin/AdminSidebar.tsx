type Props = {
  activeTab: string;

  setActiveTab: (tab: string) => void;

  onLogout: () => void;

  sidebarOpen: boolean;

  setSidebarOpen: (open: boolean) => void;
};

function AdminSidebar({
  activeTab,
  setActiveTab,
  onLogout,
  sidebarOpen,
  setSidebarOpen,
}: Props) {
  const menuItems = ["Overview", "Products", "Orders", "Customers", "Reviews"];

  return (
    <div
      className={`
    fixed top-0 left-0 z-50
    h-screen w-72
    bg-black text-white p-6
    transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0
  `}
    >
      <h1 className="text-4xl font-bold text-pink-300 mb-12">She Style</h1>
      <button
        onClick={() => setSidebarOpen(false)}
        className="lg:hidden mb-6 bg-pink-300 text-black px-4 py-2 rounded-lg"
      >
        Close
      </button>

      <div className="flex lg:block gap-3 overflow-x-auto lg:overflow-visible pb-2">
        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => setActiveTab(item)}
            className={`w-full text-left px-5 py-4 rounded-xl transition ${
              activeTab === item
                ? "bg-pink-300 text-black font-bold"
                : "hover:bg-gray-900"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-10 space-y-3">
        <button
          onClick={() => (window.location.href = "/")}
          className="w-full bg-pink-300 text-black py-3 rounded-xl font-medium"
        >
          Back To Store
        </button>

        <button
          onClick={onLogout}
          className="w-full bg-white text-black py-3 rounded-xl font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;
