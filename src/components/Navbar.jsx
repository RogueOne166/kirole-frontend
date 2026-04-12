import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, isAuthenticated, logout, isOrganizer } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" onClick={closeMenu}>
          KiRole
        </Link>
      </div>

      {/* DESKTOP */}
      <div className="navbar-links navbar-links-desktop">
        <Link to="/explore">Explore</Link>
        <Link to="/featured">Featured</Link>
        <Link to="/events">Events</Link>
        <Link to="/saved">Favorites</Link>

        {isAuthenticated ? (
          <>
            {/*  organizer-only button */}
            {isOrganizer && (
              <Link to="/organizer/dashboard" className="navbar-dashboard-btn">
                Dashboard
              </Link>
            )}

            <span className="navbar-user">Hi, {user?.name}</span>

            <button className="navbar-auth-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
      </div>

      {/* MOBILE BUTTON */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Open menu"
      >
        ☰
      </button>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/explore" onClick={closeMenu}>
            Explore
          </Link>
          <Link to="/featured" onClick={closeMenu}>
            Featured
          </Link>
          <Link to="/events" onClick={closeMenu}>
            Events
          </Link>
          <Link to="/saved" onClick={closeMenu}>
            Saved
          </Link>

          {isAuthenticated ? (
            <>
              {/*  organizer dashboard in mobile */}
              {isOrganizer && (
                <Link to="/organizer/dashboard" onClick={closeMenu}>
                  Dashboard
                </Link>
              )}

              <span className="navbar-user mobile-user">
                Hi, {user?.name}
              </span>

              <button
                className="navbar-auth-btn mobile-auth-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>
                Login
              </Link>
              <Link to="/signup" onClick={closeMenu}>
                Sign up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
