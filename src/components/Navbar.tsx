import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../contexts/authContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <nav className="top-navbar">
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/about")}>About</button>
      <p className="navbar-user-info">
        {isLoggedIn ? (
          <>{`Hello, ${user?.name}`} <button onClick={logout}>Logout</button></>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
      </p>
    </nav>
  );
}
