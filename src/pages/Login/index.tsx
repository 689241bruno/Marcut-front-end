import { useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/users/signin", {
        email,
        password,
      });
      const { token, user } = response.data;
      login(token, user);
      navigate("/profile");
    } catch (err: any) {
      const apiError =
        err.response?.data?.error || "Erro ao conectar com o servidor.";
      setError(apiError);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h2>🔑 MarCut - Entrar na sua Conta</h2>

      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "320px",
        }}
      >
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>
            E-mail:
          </label>
          <input
            type="email"
            placeholder="Ex: bruno@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            required
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Senha:
          </label>
          <input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            required
          />
        </div>

        {error && (
          <p style={{ color: "red", margin: "0", fontSize: "14px" }}>
            ⚠️ {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px",
            background: loading ? "#999" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Carregando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
