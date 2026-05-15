import { useEffect, useState } from "react";

import api from "../../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Orders</h1>

        <p className="text-gray-500 mt-2">Monitor customer purchases</p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">Order #{order.id}</h2>

                <p className="text-gray-500">{order.user?.name}</p>

                <p className="text-gray-400 text-sm">{order.user?.email}</p>
              </div>

              <div className="text-right">
                <p className="text-gray-500">Total</p>

                <h3 className="text-3xl font-bold">${order.totalAmount}</h3>

                <p className="text-sm text-gray-400 mt-1">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {order.items.map((item: any) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row md:items-center gap-4 border rounded-xl p-4"
                >
                  <img
                    src={item.product?.imageUrl}
                    alt={item.product?.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <h4 className="font-bold text-lg">{item.product?.name}</h4>

                    <p className="text-gray-500">
                      Quantity:
                      {item.quantity}
                    </p>
                  </div>

                  <div className="font-bold text-xl">${item.price}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOrders;
