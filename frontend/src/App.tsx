import { Route, Routes } from "react-router"
import { Login } from "./pages/login"
import { Register } from "./pages/register"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

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
          <Route element={<Login />} path="/" />
          <Route element={<Register />} path="registrer" />
        </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App
