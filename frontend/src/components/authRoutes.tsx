import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../providers/authProvider"

export const AuthRoutes = () => {
  const {user} = useAuthContext();
  if(user){
    return <Navigate to = "/home" />
  }
  
  return <Outlet />
}
