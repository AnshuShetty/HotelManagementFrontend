import { useState } from "react";
import "../navbar/navbar.css";
import logo from "../../assets/logo.png";
import { useAuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { auth, logout } = useAuthContext();

  return (
    <div className="navbar">
      <nav>
        <div className="logo">
          <img src={logo} alt="" className="avinya-logo" />
          <h2>Hotel Avinya</h2>
        </div>
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`nav-ele ${menuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <a
                href={
                  String(auth.role || "") === "ADMIN" ? "/admin/app/page" : "/"
                }
              >
                Home
              </a>
            </li>
            {String(auth.role || "") !== "ADMIN" && (
              <li>
                <a href="/rooms">Rooms</a>
              </li>
            )}
            {String(auth.role || "") === "ADMIN" && (
              <li>
                <a href="/admin/app/room">Room</a>
              </li>
            )}
            {String(auth.role || "") !== "ADMIN" && (
              <li>
                <a href="/mybookings">Bookings</a>
              </li>
            )}
            {String(auth.role || "") !== "ADMIN" && (
              <li>
                <a href="/favorites">Favorites</a>
              </li>
            )}
            <li>
              <a href="/contact">Contact</a>
            </li>
            {auth.isAuthenticated ? (
              <>
                <li className="username">
                  {typeof auth.user === "object" ? auth.user?.name : auth.user}
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </>
            ) : (
              <li>
                <a href="/login">Login</a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
