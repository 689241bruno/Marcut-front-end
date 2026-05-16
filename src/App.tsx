import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { PrivateRoute } from "./components/PrivateRoute";
import { PublicOnlyRoute } from "./components/PublicOnlyRoute";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { user, loading } = useAuth();
  const isLoggedIn = !!user;
  if (loading) {
    return (
      <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
        Carregando...
      </div>
    );
  }
  return (
    <BrowserRouter>
      <nav
        style={{
          padding: "20px",
          background: "#f0f0f0",
          display: "flex",
          gap: "20px",
          fontFamily: "sans-serif",
        }}
      >
        <Link to="/">Página Inicial</Link>
        {!isLoggedIn && (
          <>
            <Link to="/login">Ir para Login</Link>
            <Link to="/register">Ir para Cadastro</Link>
          </>
        )}
        {isLoggedIn && <Link to="/profile">Meu Perfil (🔒)</Link>}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
