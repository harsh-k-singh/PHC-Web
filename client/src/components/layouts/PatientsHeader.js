import React, { useContext } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import InstituteLogo from '../../images/InstituteLogo.jpg';
import GlobalContext from "../../context/global/GlobalContext";

const PatientsHeader = () => {
  const authContext = useContext(AuthContext);
  const { logout } = authContext;
  const globalContext = useContext(GlobalContext);
  const {isMobile} = globalContext;
  const handleLogout = () => {
    logout();
  };
  const navigate= useNavigate();
  const location = useLocation();
  
  return (
    <div>
      <nav class={`navbar ${!isMobile?'fixed-top':''} navbar-expand-lg bg-light`}>
        <div class="container-fluid">
          <a class="navbar-brand" href="#"> <img src={InstituteLogo} width="30" height="30" class="d-inline-block align-text-top mx-2" />
            PHC</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
              <button
                  className={`nav-link ${location.pathname==="/patient"?"fw-bolder text-primary active":""}`}
                  aria-current='page'
                  onClick={() => navigate("/patient")}
                  style={{ borderWidth: "0px", backgroundColor: "transparent" }}
                >
                  Dashboard
                </button>
              </li>
              <li class="nav-item">
              <button
                  className={`nav-link ${location.pathname==="/patient/schedule"?"fw-bolder text-primary active":""}`}
                  aria-current='page'
                  onClick={() => navigate("/patient/schedule")}
                  style={{ borderWidth: "0px", backgroundColor: "transparent" }}
                >
                  Schedule
                </button>
              </li>
              <li class="nav-item">
              <button
                  className={`nav-link ${location.pathname==="/patient/profile"?"fw-bolder text-primary active":""}`}
                  aria-current='page'
                  onClick={() => navigate("/patient/profile")}
                  style={{ borderWidth: "0px", backgroundColor: "transparent" }}
                >
                  Profile
                </button>
              </li>
            </ul>
            <ul className="navbar-nav mx-2 ms-auto">
              <li className="nav-item">
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
  )
}

export default PatientsHeader


//patien history
//doctors availability and schedule
//update/profile