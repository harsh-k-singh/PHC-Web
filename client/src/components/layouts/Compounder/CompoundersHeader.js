import React, { useContext } from 'react'
import { useNavigate ,useLocation} from "react-router-dom"
import AuthContext from '../../../context/auth/AuthContext';
import InstituteLogo from '../../../images/InstituteLogo.jpg';
import GlobalContext from "../../../context/global/GlobalContext";

const CompoundersHeader = () => {
  const authContext = useContext(AuthContext);
  const { logout } = authContext;
  const globalContext = useContext(GlobalContext);
  const {isMobile} = globalContext;
  const handleLogout = () => {
    logout();
  }
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div>
      <nav className={`navbar ${!isMobile?'fixed-top':''} navbar-expand-lg bg-light`}>
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
                <button
                  className={`nav-link ${location.pathname==="/compounder"?"fw-bolder text-primary active":""}`}
                  aria-current='page'
                  onClick={() => navigate("/compounder")}
                  style={{ borderWidth: "0px", backgroundColor: "transparent" }}
                >
                  Dashboard
                </button>
              </li>
              <li className='nav-item'>
                <button
                  className={`nav-link ${location.pathname==="/compounder/patientsList"?"fw-bolder text-primary active ":""}`}
                  onClick={() => navigate("/compounder/patientsList")}
                  style={{ borderWidth: "0px", backgroundColor: "transparent" }}
                >
                  My Patients
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${location.pathname==="/compounder/profile"?"fw-bolder text-primary active":""}`}
                  onClick={() => navigate("/compounder/profile")}
                  style={{ borderWidth: "0px", backgroundColor: "transparent" }}
                >
                  My Profile
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${location.pathname==="/compounder/schedule"?"fw-bolder text-primary active":""}`}
                  onClick={() => navigate("/compounder/schedule")}
                  style={{ borderWidth: "0px", backgroundColor: "transparent" }}
                >
                  My Schedule
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${location.pathname==="/compounder/viewCompMedicine"?"fw-bolder text-primary active":""}`}
                  onClick={() => navigate("/compounder/viewCompMedicine")}
                  style={{ borderWidth: "0px", backgroundColor: "transparent" }}
                >
                  Medicines
                </button>
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

export default CompoundersHeader
