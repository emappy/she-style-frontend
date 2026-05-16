// import { useEffect, useState } from "react";

// import api from "../../services/api";

// function AdminOrders() {
//   const [orders, setOrders] = useState<any[]>([]);

//   const fetchOrders = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const response = await api.get("/orders", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setOrders(response.data.orders);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const updateStatus = async (id: number, status: string) => {
//     try {
//       const token = localStorage.getItem("token");

//       await api.put(
//         `/orders/${id}/status`,
//         { status },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       fetchOrders();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   return (
//     <div>
//       <div className="mb-8">
//         <h1 className="text-4xl font-bold">Orders</h1>

//         <p className="text-gray-500 mt-2">Monitor customer purchases</p>
//       </div>

//       <div className="space-y-6">
//         {orders.map((order) => (
//           <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm">
//             <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
//               <div>
//                 <h2 className="text-2xl font-bold">Order #{order.id}</h2>

//                 <p className="text-gray-500">{order.user?.name}</p>

//                 <p className="text-gray-400 text-sm">{order.user?.email}</p>
//               </div>

//               {/* <div className="text-right">
//                 <p className="text-gray-500">Total</p>

//                 <h3 className="text-3xl font-bold">${order.totalAmount}</h3>

//                 <p className="text-sm text-gray-400 mt-1">
//                   {new Date(order.createdAt).toLocaleDateString()}
//                 </p>
//               </div> */}

//               <div className="text-right">
//                 <p className="text-gray-500">Total</p>

//                 <h3 className="text-3xl font-bold">${order.totalAmount}</h3>

//                 <p className="text-sm text-gray-400 mt-1">
//                   {new Date(order.createdAt).toLocaleDateString()}
//                 </p>

//                 <div className="mt-3">
//                   <span
//                     className={`px-3 py-1 rounded-full text-xs font-bold ${
//                       order.status === "DELIVERED"
//                         ? "bg-green-100 text-green-700"
//                         : order.status === "CANCELED"
//                           ? "bg-red-100 text-red-700"
//                           : "bg-yellow-100 text-yellow-700"
//                     }`}
//                   >
//                     {order.status}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-4">
//               {order.items.map((item: any) => (
//                 <div
//                   key={item.id}
//                   className="flex flex-col md:flex-row md:items-center gap-4 border rounded-xl p-4"
//                 >
//                   <img
//                     src={item.product?.imageUrl}
//                     alt={item.product?.name}
//                     className="w-20 h-20 rounded-xl object-cover"
//                   />

//                   <div className="flex-1">
//                     <h4 className="font-bold text-lg">{item.product?.name}</h4>

//                     <p className="text-gray-500">
//                       Quantity:
//                       {item.quantity}
//                     </p>
//                   </div>

//                   <div className="font-bold text-xl">${item.price}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default AdminOrders;

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

  const updateStatus = async (
    id: number,
    status: string,
  ) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/orders/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchOrders();
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

        <p className="text-gray-500 mt-2">
          Monitor customer purchases
        </p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  Order #{order.id}
                </h2>

                <p className="text-gray-500">
                  {order.user?.name}
                </p>

                <p className="text-gray-400 text-sm">
                  {order.user?.email}
                </p>
              </div>

              <div className="text-right">
                <p className="text-gray-500">Total</p>

                <h3 className="text-3xl font-bold">
                  ${order.totalAmount}
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  {new Date(
                    order.createdAt,
                  ).toLocaleDateString()}
                </p>

                <div className="mt-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === "DELIVERED"
                        ? "bg-green-100 text-green-700"
                        : order.status === "CANCELED"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            </div>

            {/* ORDER ITEMS */}
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
                    <h4 className="font-bold text-lg">
                      {item.product?.name}
                    </h4>

                    <p className="text-gray-500">
                      Quantity: {item.quantity}
                    </p>

                    <p className="text-sm text-gray-400">
                      Remaining Stock:{" "}
                      {item.product?.stock}
                    </p>
                  </div>

                  <div className="font-bold text-xl">
                    ${item.price}
                  </div>
                </div>
              ))}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() =>
                  updateStatus(
                    order.id,
                    "DELIVERED",
                  )
                }
                disabled={
                  order.status === "DELIVERED"
                }
                className="bg-green-500 text-white px-5 py-2 rounded-xl hover:bg-green-600 transition disabled:opacity-50"
              >
                Delivered
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    order.id,
                    "CANCELED",
                  )
                }
                disabled={
                  order.status === "CANCELED"
                }
                className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition disabled:opacity-50"
              >
                Canceled
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOrders;
