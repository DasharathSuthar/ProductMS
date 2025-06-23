import { Navigate, Outlet } from 'react-router-dom';

function RequireAdminAuth() {
  const isAdminLoggedIn = localStorage.getItem("adminLoggedIn");

  return isAdminLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default RequireAdminAuth;
