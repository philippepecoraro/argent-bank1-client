import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../features/home/Home";
import Login from "../features/login/Login";
import Profile from "../features/profile/Profile";
import Navbar from "../common/Navbar/Navbar";
import Footer from "../common/Footer/Footer";
import NotFound from "../common/NotFound/NotFound";

function App() {
  const jwtToken = JSON.parse(localStorage.getItem("jwtToken"));

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route
            path="/"
            element={jwtToken ? <Navigate replace to="/profile" /> : <Home />}
          />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
