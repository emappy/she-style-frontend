import { useEffect, useState } from "react";

import api from "../../services/api";

function AdminCustomers() {
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Customers</h1>

        <p className="text-gray-500 mt-2">Registered users and admins</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        <div className="grid grid-cols-4 bg-black text-white p-5 font-bold">
          <div>Name</div>

          <div>Email</div>

          <div>Role</div>

          <div>Joined</div>
        </div>

        {users.map((user) => (
          <div
            key={user.id}
            className="grid grid-cols-4 p-5 border-b items-center"
          >
            <div className="font-medium">{user.name}</div>

            <div className="text-gray-600">{user.email}</div>

            <div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  user.role === "admin"
                    ? "bg-pink-200 text-black"
                    : "bg-gray-100"
                }`}
              >
                {user.role}
              </span>
            </div>

            <div className="text-gray-500 text-sm">
              {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminCustomers;
