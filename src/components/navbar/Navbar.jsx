import React, { useState, useEffect } from "react";
import "../navbar/navbar.css";
import axiosInstance from "../../utils/axiosInstance";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  const handleLogout = () => {
    // Remove token, role, and username from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    // Update state
    setIsAuthenticated(false);
    setUsername("");
    setRole("");
  };

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");

    let displayName = "";
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        displayName = userObj.name || storedUser;
      } catch {
        displayName = storedUser;
      }
    }

    if (token) {
      setIsAuthenticated(true);
      setUsername(displayName);
      setRole(storedRole);
    }
  }, []);

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
              <a href="/">Home</a>
            </li>
            {String(role || "") !== "ADMIN" && (
              <li>
                <a href="/room">Rooms</a>
              </li>
            )}
            {String(role || "") === "ADMIN" && (
              <li>
                <a href="/admin/app/room">Room</a>
              </li>
            )}
            {String(role || "") !== "ADMIN" && (
              <li>
                <a href="/mybookings">My Bookings</a>
              </li>
            )}
            <li>
              <a href="/contact">Contact</a>
            </li>
            {isAuthenticated ? (
              <>
                <li className="username">{username}</li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
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
