import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="top-navbar">
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/about")}>About</button>
    </nav>
  );
}
