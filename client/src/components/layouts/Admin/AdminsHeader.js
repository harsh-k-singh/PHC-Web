import React, { useContext } from 'react'
import { useNavigate,useLocation, Link} from "react-router-dom"
import AuthContext from '../../../context/auth/AuthContext';
import GlobalContext from '../../../context/global/GlobalContext';
import InstituteLogo from '../../../images/InstituteLogo.jpg';
const DoctorsHeader = () => {
  const authContext = useContext(AuthContext);
  const globalContext = useContext(GlobalContext);
  const {isMobile} = globalContext;
  const { logout } = authContext;
  const handleLogout = () => {
    logout();
  };

  const navigate = useNavigate();
  const location=useLocation();
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
                  className={`nav-link ${location.pathname==="/admin"?"fw-bolder text-primary active":""}`}
                  aria-current='page'
                  onClick={() => navigate("/admin")}
                  style={{ borderWidth: "0px", backgroundColor: "transparent" }}
                >
                  Dashboard
                </button>
              </li>

              <li className="nav-item">
              <button
                  className={`nav-link ${location.pathname==="/admin/addActor"?"fw-bolder text-primary active":""}`}
                  aria-current='page'
                  onClick={() => navigate("/admin/addActor")}
                  style={{ borderWidth: "0px", backgroundColor: "transparent" }}
                >
                  Add actor
                </button>
              </li>
              <li className="nav-item">
              <button
                  className={`nav-link ${location.pathname==="/admin/medicineReport"?"fw-bolder text-primary active":""}`}
                  aria-current='page'
                  onClick={() => navigate("/admin/medicineReport")}
                  style={{ borderWidth: "0px", backgroundColor: "transparent" }}
                >
                 Medicine Report
                </button>
              </li>
              {/* <li className="nav-item">
              <button
                  className={`nav-link ${location.pathname==="/admin/profile"?"fw-bolder text-primary active":""}`}
                  aria-current='page'
                  onClick={() => navigate("/admin/profile")}
                  style={{ borderWidth: "0px", backgroundColor: "transparent" }}
                >
                  Profile
                </button>
              </li> */}
              <li class="nav-item dropdown">
                <a class={`nav-link dropdown-toggle  ${(location.pathname==="/admin/viewStock"||location.pathname==="/admin/addStock"||location.pathname==="/admin/viewMedicine")?"fw-bolder text-primary active":""}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Stock
                </a>
                <ul class="dropdown-menu">
                  <li className="dropdown-item">
                  <Link class={`dropdown-item  ${location.pathname==="/admin/viewStock"?"fw-bolder":""}`} to="/admin/viewStock">View Complete Stock</Link>
                  </li>
                  <li><hr class="dropdown-divider"/></li>
                  <li className="dropdown-item">
                  <Link class={`dropdown-item  ${location.pathname==="/admin/viewAdminMedicine"?"fw-bolder":""}`} to="/admin/viewAdminMedicine">View Medicine</Link>
                  </li>
                  <li><hr class="dropdown-divider"/></li>
                  <li className="dropdown-item">
                  <Link class={`dropdown-item  ${location.pathname==="/admin/addStock"?"fw-bolder":""}`} to="/admin/addStock">Add New Stock</Link>
                  </li>
                  <li><hr class="dropdown-divider"/></li>
                  <li className="dropdown-item">
                  <Link class={`dropdown-item  ${location.pathname==="/admin/addMedicine"?"fw-bolder":""}`} to="/admin/addMedicine">Add New Medicine</Link>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="navbar-nav mx-2 ms-auto">
              <li className="nav-item">
              {/* <button
                  type='button'
                  class='btn btn-primary'
                  onClick={handleLogout}
                >
                  Sign Out
                </button> */}
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Sign Out
                  </button>
                  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel">Sign Out</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          Are you sure you want to sign out?
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                          <button type="button" class="btn btn-primary" onClick={handleLogout}>Yes</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default DoctorsHeader
