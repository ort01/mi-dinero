import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from "./pages/home/Home.js"
import Login from "./pages/login/Login.jsx"
import Signup from "./pages/signup/Signup.jsx"
import Navbar from "./components/Navbar.tsx"

function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
