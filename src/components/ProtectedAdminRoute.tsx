import { Navigate } from "react-router-dom";

function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" />;
  }

  const parsedUser = JSON.parse(user);

  if (parsedUser.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedAdminRoute;
