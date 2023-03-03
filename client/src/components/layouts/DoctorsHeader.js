import React, { useContext, useEffect,useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import InstituteLogo from "../../images/InstituteLogo.jpg";
import GlobalContext from "../../context/global/GlobalContext";
const DoctorsHeader = () => {
  const authContext = useContext(AuthContext);
  const { logout } = authContext;
  const globalContext = useContext(GlobalContext);
  const {isMobile} = globalContext;
  const handleLogout = () => {
    logout();
  };
  const location = useLocation();
  const navigate = useNavigate();

  const [available,setAvailable] = useState(false);
  useEffect(() => {
    setAvailable(available);
  }, [available]);

  return (
    <div>
      <nav className={`navbar ${!isMobile?'fixed-top':''} navbar-expand-lg bg-light`}>
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
            aria-expanded='true'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavDropdown'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <button
                  className={`nav-link ${location.pathname==="/doctor"?"fw-bolder text-primary active":""}`}
                  aria-current='page'
                  onClick={() => navigate("/doctor")}
                  style={{ borderWidth: "0px", backgroundColor: "transparent" }}
                >
                  Dashboard
                </button>
              </li>
              <li className='nav-item'>
                <button
                  className={`nav-link ${location.pathname==="/doctor/patientsList"?"fw-bolder text-primary active ":""}`}
                  onClick={() => navigate("/doctor/patientsList")}
                  style={{ borderWidth: "0px", backgroundColor: "transparent" }}
                >
                  My Patients
                </button>
              </li>
              <li className='nav-item'>
                <button
                  className={`nav-link ${location.pathname==="/doctor/profile"?"fw-bolder text-primary active":""}`}
                  onClick={() => navigate("/doctor/profile")}
                  style={{ borderWidth: "0px", backgroundColor: "transparent" }}
                >
                  My Profile
                </button>
              </li>
              <li className='nav-item'>
                <button
                  className={`nav-link ${location.pathname==="/doctor/schedule"?"fw-bolder text-primary active":""}`}
                  onClick={() => navigate("/doctor/schedule")}
                  style={{ borderWidth: "0px", backgroundColor: "transparent" }}
                >
                  My Schedule
                </button>
              </li>
              <li className='nav-item'>
                <button
                  className={`nav-link ${location.pathname==="/doctor/inventory"?"fw-bolder text-primary active":""}`}
                  onClick={() => navigate("/doctor/inventory")}
                  style={{ borderWidth: "0px", backgroundColor: "transparent" }}
                >
                  Peek in inventory
                </button>
              </li>
            </ul>
            <ul className='navbar-nav mx-2 ms-auto'>
              <li>
               <h5>
               <div class="form-check form-switch mx-2 mt-2">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={()=>setAvailable(!available)}/>
                {available?<label class="form-check-label text-success" for="flexSwitchCheckDefault">Available</label>
                 :<label class="form-check-label text-danger" for="flexSwitchCheckDefault">Unavailable</label>}
               </div>
               </h5>
              </li>
              <li className='nav-item mx-2'>
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
