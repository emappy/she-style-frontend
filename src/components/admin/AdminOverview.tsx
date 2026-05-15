function AdminOverview() {
  const stats = [
    {
      title: "Products",
      value: 24,
      color: "bg-pink-100",
    },
    {
      title: "Orders",
      value: 18,
      color: "bg-black",
      text: "text-white",
    },
    {
      title: "Customers",
      value: 12,
      color: "bg-white",
    },
    {
      title: "Reviews",
      value: 8,
      color: "bg-pink-200",
    },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`${stat.color} ${
              stat.text || "text-black"
            } rounded-2xl p-6 shadow-sm`}
          >
            <h2 className="text-lg opacity-70 mb-2">{stat.title}</h2>

            <p className="text-4xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-8 mt-10 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Sales Summary</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="border rounded-xl p-6">
            <p className="text-gray-500 mb-2">Revenue</p>

            <h3 className="text-3xl font-bold">$4,250</h3>
          </div>

          <div className="border rounded-xl p-6">
            <p className="text-gray-500 mb-2">Pending Orders</p>

            <h3 className="text-3xl font-bold">5</h3>
          </div>

          <div className="border rounded-xl p-6">
            <p className="text-gray-500 mb-2">Completed Orders</p>

            <h3 className="text-3xl font-bold">13</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOverview;
