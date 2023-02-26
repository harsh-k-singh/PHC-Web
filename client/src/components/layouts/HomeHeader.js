import React from 'react'
import RegisterForm from './RegisterForm';
import InstituteLogo from '../../images/InstituteLogo.jpg';
const HomeHeader = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={InstituteLogo} width="37%" height="30" class="d-inline-block align-text-top mx-2" />
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
                <a className="nav-link active" aria-current="page" href="#">
                  Sign In
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Doctors
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Ambulance
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About Us
                </a>
              </li>

            </ul>
            <ul className="navbar-nav mx-2 ms-auto">
              <li className="nav-item"><RegisterForm /></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default HomeHeader
