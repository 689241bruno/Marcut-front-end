import { useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const role = "client";

  const navigate = useNavigate();
  const handleRegister = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/users/signup", { name, email, password, phone, role });
      alert("Conta criada com sucesso");
      navigate("/login");
    } catch (error: any) {
      setError(error.response?.data?.error || "Erro ao cadastrar.");
    }
  };
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h2>🔑 MarCut - Criar na sua Conta</h2>

      <form
        onSubmit={handleRegister}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "320px",
        }}
      >
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Nome:</label>
          <input
            type="text"
            placeholder="Bruno Souza Santos"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Telefone:
          </label>
          <input
            type="phone"
            placeholder="+5511973546613"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
