import { BrowserRouter, Route, Routes } from 'react-router-dom'
//components
import Home from "./pages/home/Home.js"
import Login from "./pages/login/Login.jsx"
import Signup from "./pages/signup/Signup.jsx"
import Navbar from "./components/Navbar.tsx"
//hooks
import { useAuthContext } from './hooks/useAuthContext.ts'



function App() {

  // app loads after cheching the value of user and then changing the authReady to true -> loads the page
  const { authReady } = useAuthContext()

  return (
    <>
      {authReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  )
}

export default App
