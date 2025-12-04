import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../providers/authProvider";
import { NavBar } from "./navbar/Navbar";

export const ProtectedRoutes = () => {
  const { user } = useAuthContext();
  if (!user) {
    return <Navigate to="/" />
  }

  return (
    <div className="w-full min-h-screen bg-cover bg-gradient-to-r from-secundary to-primary/90">
      <NavBar />
      <Outlet />
    </div>
  )
    ;
}