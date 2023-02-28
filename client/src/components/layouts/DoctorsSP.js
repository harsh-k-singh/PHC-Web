import React, { useContext, useState, useEffect } from "react";
import DoctorsDP from "../../images/DoctorsDP.png";
// import "../../CSSFiles/SideProfile.css";
import styles from "../../CSSFiles/SideProfile.module.css";
import AuthContext from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const DoctorSP = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [isMobile, setIsMobile] = useState(false);

  const updateDimensions = () => { 
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
  }
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  useEffect(() => {
    if (width < 1024) {
      setIsMobile(true);
    }
    else {
      setIsMobile(false);
    }
  }, [width]);

  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const navigate = useNavigate();
  return (
    <div class={`${styles.accordian} accordion`} id="accordionExample">
      <div class="accordion-item" hidden={!isMobile}>
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button" style={{height:"0.1rem"}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            User Info
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <div className={`${styles.sideProfile} card px-2 py-2 mx-2 shadow-sm`} hidden={!isMobile}>
              <ul className='nav flex-column text-center' style={{ fontSize: 20 }}>
                <div className='card px-2 py-2 mx-2 my-2 mt-4 shadow-sm'>
                  <li>
                    <img
                      className='text-center rounded-circle my-2'
                      src={DoctorsDP}
                      width='45%'
                     height="80%"
                      border='2px solid black'
                    />
                  </li>
                  <li classNmae='my-8'>{user ? user.email : "email"}</li>
                  <li>{user ? user.name : "name"}</li>
                  <li style={{ fontSize: "2rem", color: "Green", margin: 4 }}>
                    Doctor
                  </li>
                </div>
                <h3 style={{ margin: 8 }}>Schedule</h3>
                <ul class="list-group">
                  <li class="list-group-item">An item</li>
                  <li class="list-group-item">A second item</li>
                  <li class="list-group-item">A third item</li>
                  <li class="list-group-item">A fourth item</li>
                  <li class="list-group-item">And a fifth one</li>
                  <li class="list-group-item">And a fifth one</li>
                  <li class="list-group-item">And a fifth one</li>
                </ul>
              </ul>
              <div className='mt-auto'>
                <div class='d-grid gap-2'>
                  <button
                    class='btn btn-outline-primary'
                    onClick={() => navigate("/doctor/profile")}
                  >
                    Manage Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.sideProfile} card px-2 py-2 mx-2 shadow-sm`} hidden={isMobile}>
        <ul className='nav flex-column text-center' style={{ fontSize: 20 }}>
          <div className='card px-2 py-2 mx-2 my-2 mt-4 shadow-sm'>
            <li>
              <img
                className='text-center rounded-circle my-2'
                src={DoctorsDP}
                width='45%'
                height="80%"
                border='2px solid black'
              />
            </li>
            <li classNmae='my-8'>{user ? user.email : "email"}</li>
            <li>{user ? user.name : "name"}</li>
            <li style={{ fontSize: "2rem", color: "Green", margin: 4 }}>
              Doctor
            </li>
          </div>
          <h3 style={{ margin: 8 }}>Schedule</h3>
          <ul class="list-group">
            <li class="list-group-item">An item</li>
            <li class="list-group-item">A second item</li>
            <li class="list-group-item">A third item</li>
            <li class="list-group-item">A fourth item</li>
            <li class="list-group-item">And a fifth one</li>
            <li class="list-group-item">And a fifth one</li>
            <li class="list-group-item">And a fifth one</li>
          </ul>
        </ul>
        <div className='mt-auto'>
          <div class='d-grid gap-2'>
            <button
              class='btn btn-outline-primary'
              onClick={() => navigate("/doctor/profile")}
            >
              Manage Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSP;
