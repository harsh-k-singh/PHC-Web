import React, { useEffect, useState, useContext } from "react";
import AdminContext from "../../../context/admin/AdminContext";
import RenderActor from "./RenderActor";
const AdminsDashboard = () => {
  const adminContext = useContext(AdminContext);
  const { getActors, actors } = adminContext;
  const [actorType, setActorType] = useState("doctor");
  useEffect(() => {
    const func = async () => {
      await getActors();
    };
    func();
  }, []);

  return (
    <div className='container'>
      <h3 className='text-center mb-4'>REGISTERED STAFF</h3>
      <div class='card text-center'>
        <div class='card-header'>
          <ul class='nav nav-tabs card-header-tabs'>
            <li class='nav-item'>
              <a
                class={`nav-link ${actorType === "doctor" ? "active" : ""}`}
                aria-current={actorType === "doctor" ? "true" : "false"}
                href='#'
                onClick={() => setActorType("doctor")}
              >
                Doctor
              </a>
            </li>
            <li class='nav-item'>
              <a
                class={`nav-link ${actorType === "compounder" ? "active" : ""}`}
                aria-current={actorType === "compounder" ? "true" : "false"}
                href='#'
                onClick={() => setActorType("compounder")}
              >
                Compounder
              </a>
            </li>
            <li class='nav-item'>
              <a
                class={`nav-link ${actorType === "admin" ? "active" : ""}`}
                aria-current={actorType === "admin" ? "true" : "false"}
                href='#'
                onClick={() => setActorType("admin")}
              >
                Admin
              </a>
            </li>
          </ul>
        </div>
        <RenderActor actorType={actorType} />
      </div>
    </div>
  );
};

export default AdminsDashboard;
