import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const name = user?.name;

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div>
      <h1>Seja bem vindo {name}</h1>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}
