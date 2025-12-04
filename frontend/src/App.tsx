import { Route, Routes } from "react-router"
import { Login } from "./pages/login"
import { Register } from "./pages/register"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { AuthRoutes } from "./components/authRoutes";
import { ProtectedRoutes } from "./components/protectedRoutes";
import { Home } from "./pages/home";
import { Profile } from "./pages/profile";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>

        <Routes>
          <Route element={<AuthRoutes />}>
            <Route element={<Login />} path="/" />
            <Route element={<Register />} path="registrer" />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route element={<Home/>} path="/home"/>
            <Route element={<Profile/>} path="/profile"/>
          </Route>
        </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App
