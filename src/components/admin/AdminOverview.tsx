// function AdminOverview() {
//   const stats = [
//     {
//       title: "Products",
//       value: 24,
//       color: "bg-pink-100",
//     },
//     {
//       title: "Orders",
//       value: 18,
//       color: "bg-black",
//       text: "text-white",
//     },
//     {
//       title: "Customers",
//       value: 12,
//       color: "bg-white",
//     },
//     {
//       title: "Reviews",
//       value: 8,
//       color: "bg-pink-200",
//     },
//   ];

//   return (
//     <div>
//       <h1 className="text-4xl font-bold mb-8">Dashboard Overview</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
//         {stats.map((stat) => (
//           <div
//             key={stat.title}
//             className={`${stat.color} ${
//               stat.text || "text-black"
//             } rounded-2xl p-6 shadow-sm`}
//           >
//             <h2 className="text-lg opacity-70 mb-2">{stat.title}</h2>

//             <p className="text-4xl font-bold">{stat.value}</p>
//           </div>
//         ))}
//       </div>

//       <div className="bg-white rounded-2xl p-8 mt-10 shadow-sm">
//         <h2 className="text-2xl font-bold mb-4">Sales Summary</h2>

//         <div className="grid md:grid-cols-3 gap-6">
//           <div className="border rounded-xl p-6">
//             <p className="text-gray-500 mb-2">Revenue</p>

//             <h3 className="text-3xl font-bold">$4,250</h3>
//           </div>

//           <div className="border rounded-xl p-6">
//             <p className="text-gray-500 mb-2">Pending Orders</p>

//             <h3 className="text-3xl font-bold">5</h3>
//           </div>

//           <div className="border rounded-xl p-6">
//             <p className="text-gray-500 mb-2">Completed Orders</p>

//             <h3 className="text-3xl font-bold">13</h3>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminOverview;


import { useEffect, useState } from "react";
import api from "../../services/api";

interface Stats {
  products: number;
  orders: number;
  customers: number;
  revenue: number;
}

interface Order {
  id: number;
  totalAmount: number;
  createdAt: string;
  user: {
    name: string;
  };
}

function AdminOverview() {
  const [stats, setStats] = useState<Stats>({
    products: 0,
    orders: 0,
    customers: 0,
    revenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [productsRes, ordersRes, usersRes] = await Promise.all([
          api.get("/products"),
          api.get("/orders", { headers }),
          api.get("/users", { headers }),
        ]);

        const products = productsRes.data.products || [];
        const orders = ordersRes.data.orders || [];
        const users = usersRes.data.users || [];

        const revenue = orders.reduce(
          (sum: number, order: Order) => sum + order.totalAmount,
          0,
        );

        setStats({
          products: products.length,
          orders: orders.length,
          customers: users.length,
          revenue,
        });

        setRecentOrders(orders.slice(0, 5));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Dashboard Overview</h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-pink-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg opacity-70 mb-2">Products</h2>

          <p className="text-4xl font-bold">{stats.products}</p>
        </div>

        <div className="bg-black text-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg opacity-70 mb-2">Orders</h2>

          <p className="text-4xl font-bold">{stats.orders}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h2 className="text-lg opacity-70 mb-2">Customers</h2>

          <p className="text-4xl font-bold">{stats.customers}</p>
        </div>

        <div className="bg-pink-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg opacity-70 mb-2">Revenue</h2>

          <p className="text-4xl font-bold">
            ${stats.revenue.toFixed(2)}
          </p>
        </div>
      </div>

      {/* RECENT ORDERS */}
      <div className="bg-white rounded-2xl p-8 mt-10 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>

        {recentOrders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between border rounded-xl p-4"
              >
                <div>
                  <p className="font-semibold">
                    Order #{order.id}
                  </p>

                  <p className="text-sm text-gray-500">
                    {order.user?.name || "Unknown User"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold">
                    ${order.totalAmount}
                  </p>

                  <p className="text-sm text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOverview;