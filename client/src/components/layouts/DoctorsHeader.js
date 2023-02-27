import React, { useContext } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import InstituteLogo from "../../images/InstituteLogo.jpg";

const DoctorsHeader = () => {
  const authContext = useContext(AuthContext);
  const { logout } = authContext;
  const handleLogout = () => {
    logout();
  };
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div>
      <nav className='navbar fixed-top navbar-expand-lg bg-light'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='#'>
            <img
              src={InstituteLogo}
              width='30'
              height='30'
              class='d-inline-block align-text-top mx-2'
            />
            PHC
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNavDropdown'
            aria-controls='navbarNavDropdown'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavDropdown'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <button
                  className={`nav-link ${location.pathname==="/doctor"?"active fw-bold":""}`}
                  aria-current='page'
                  onClick={() => navigate("/doctor")}
                  style={{ borderWidth: "0px", backgroundColor: "transparent" }}
                >
                  Dashboard
                </button>
              </li>
              <li className='nav-item'>
                <button
                  className={`nav-link ${location.pathname==="/doctor/patientsList"?"active fw-bold ":""}`}
                  onClick={() => navigate("/doctor/patientsList")}
                  style={{ borderWidth: "0px", backgroundColor: "transparent" }}
                >
                  My Patients
                </button>
              </li>
              <li className='nav-item'>
                <button
                  className={`nav-link ${location.pathname==="/doctor/profile"?"active fw-bold":""}`}
                  onClick={() => navigate("/doctor/profile")}
                  style={{ borderWidth: "0px", backgroundColor: "transparent" }}
                >
                  My Profile
                </button>
              </li>
              <li className='nav-item'>
                <button
                  className={`nav-link ${location.pathname==="/doctor/schedule"?"active fw-bold":""}`}
                  onClick={() => navigate("/doctor/schedule")}
                  style={{ borderWidth: "0px", backgroundColor: "transparent" }}
                >
                  My Schedule
                </button>
              </li>
              <li className='nav-item'>
                <button
                  className={`nav-link ${location.pathname==="/doctor/inventory"?"active fw-bold":""}`}
                  onClick={() => navigate("/doctor/inventory")}
                  style={{ borderWidth: "0px", backgroundColor: "transparent" }}
                >
                  Peek in inventory
                </button>
              </li>
            </ul>
            <ul className='navbar-nav mx-2 ms-auto'>
              <li className='nav-item'>
                <button
                  type='button'
                  class='btn btn-primary'
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DoctorsHeader;
