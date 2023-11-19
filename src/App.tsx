import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
//components
import Home from "./pages/home/Home.js"
import Login from "./pages/login/Login.jsx"
import Signup from "./pages/signup/Signup.jsx"
import Navbar from "./components/Navbar.tsx"
//hooks
import { useAuthContext } from './hooks/useAuthContext.ts'



function App() {

  // app loads after cheching the value of user and then changing the authReady to true -> loads the page
  const { authReady, user } = useAuthContext()

  return (
    <>
      {authReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="login" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  )
}

export default App
