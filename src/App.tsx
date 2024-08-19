import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import withAuth from "./main/com/RequiredAuth";
import React, { useEffect } from "react";
import Invoice from "./main/Home/Invoice/Invoice";

const Home = React.lazy(() => import("./main/Home/Home"));
const Login = React.lazy(() => import("./main/Login/Login"));
const InvoiceCase2 = React.lazy(
  () => import("./main/Home/InvoiceCase2/InvoiceCase2")
);

function App() {
  const ProtectedComponent = withAuth(Home);
  const navigate = useNavigate();
  const location = useLocation();

  const getToken = () => {
    const token = localStorage.getItem("access_token_installation");
    const expiration = localStorage.getItem("expiration_installation");
    if (token && expiration && new Date(expiration) > new Date()) {
      return token;
    }
    return null;
  };

  useEffect(() => {
    const token = getToken();
    if (token && location.pathname === "/") {
      console.log("success");
      navigate("/home"); // Chuyển hướng đến trang chủ nếu token còn hạn
    }
  }, [navigate, location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<ProtectedComponent element={<Home />} />} />
      <Route path="home/:id" element={<Invoice />} />
      <Route path="/Invoice" element={<InvoiceCase2 />} />
    </Routes>
  );
}

export default App;
