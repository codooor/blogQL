import { Link, useNavigate } from "react-router-dom";

export default function Header({ isLoggedIn, handleLogout }) {
  const navigate = useNavigate();

  return (
    <>
      <nav
        className="navbar  navbar-expand-lg border-bottom border-bottom-dark"
        style={{ backgroundColor: "gray" }}
      >
        <div className="container-fluid">
          <Link to="/profile" className="navbar-brand">
            BlogQL
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/profile" className="nav-link" aria-current="page">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/posts" className="nav-link">
                  Posts
                </Link>
              </li>
              {isLoggedIn ? (
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/"
                    onClick={() => {
                      handleLogout();
                      navigate("/");
                    }}
                  >
                    {" "}
                    Logout{" "}
                  </a>
                </li>
              ) : (
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
