import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import EditProfile from "./pages/EditProfile/EditProfile";


function App() {
  const { authUser } = useAuthContext();
  
  return (
    <>
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />} />
        <Route path="/edit" element={  authUser ? <EditProfile /> : <Navigate to="/login" /> } />
      </Routes>
      <Toaster />
    </>
  );  
}

export default App;
