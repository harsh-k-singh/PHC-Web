import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom"
import AuthContext from '../../context/auth/AuthContext';
import InstituteLogo from '../../images/InstituteLogo.jpg';
const DoctorsHeader = () => {
  const authContext = useContext(AuthContext);
  const { logout } = authContext;
  const handleLogout = () => {
    logout();
  }
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={InstituteLogo} width="30" height="30" class="d-inline-block align-text-top mx-2" />
            PHC
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/admin">
                  Home
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/admin/addActor">
                  Add actor
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/profile">
                  My Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/inventory">
                  Inventory.
                </a>
              </li>
            </ul>
            <ul className="navbar-nav mx-2 ms-auto">
              <li className="nav-item"><button type="button" class="btn btn-primary" onClick={handleLogout}>Sign Out</button></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default DoctorsHeader
