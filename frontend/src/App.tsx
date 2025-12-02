import { Route, Routes } from "react-router"
import { Login } from "./pages/login"

function App() {

  return (
    <>
      <Routes>
        <Route element ={<Login />} path="/"/>
      </Routes>
    </>
  )
}

export default App
