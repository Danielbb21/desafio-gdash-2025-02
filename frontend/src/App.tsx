import { Route, Routes } from "react-router"
import { Login } from "./pages/login"
import { Register } from "./pages/register"

function App() {

  return (
    <>
      <Routes>
        <Route element ={<Login />} path="/"/>
        <Route element ={<Register />} path="registrer"/>
      </Routes>
    </>
  )
}

export default App
