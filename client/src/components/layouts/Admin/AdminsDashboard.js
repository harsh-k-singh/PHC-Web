import React, { useEffect, useState, useContext } from "react";
import AdminContext from "../../../context/admin/AdminContext";
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

  const renderActors = () => {
    // if (actors) {
    //   if (actorType === "doctor") {
    //     return actors.doctors.map((item, index) => {
    //       return (
    //         <tr>
    //           <th scope='row'>{index + 1}</th>
    //           <td>{item.name}</td>
    //           <td>{item.degree ? item.degree : "NA"}</td>
    //           <td>{item.email}</td>
    //           <td>{item.phone ? item.phone : "NA"}</td>
    //           <td
    //             class={`${item.availability ? "text-success" : "text-danger"}`}
    //           >
    //             {item.availability ? "Available" : "Unavailable"}
    //           </td>
    //         </tr>
    //       );
    //     });
    //   } else if (actorType === "compounder") {
    //     return actors.compounders.map((item, index) => {
    //       return (
    //         <tr>
    //           <th scope='row'>{index + 1}</th>
    //           <td>{item.name}</td>
    //           <td>{item.email}</td>
    //           <td>{item.phone ? item.phone : "NA"}</td>
    //         </tr>
    //       );
    //     });
    //   } else {
    //     return actors.admins.map((item, index) => {
    //       return (
    //         <tr>
    //           <th scope='row'>{index + 1}</th>
    //           <td>{item.name}</td>
    //           <td>{item.email}</td>
    //           <td>{item.phone ? item.phone : "NA"}</td>
    //         </tr>
    //       );
    //     });
    //   }
    // }
  };          
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
        <div class='card-body'>
          <table
            class='table my-3 text-center'
            style={{ width: "80%", margin: "auto" }}
          >
            <thead class='table-dark'>
              <tr>
                <th scope='col'>S.No</th>
                <th scope='col'>Name</th>
                {actorType === "doctor" ? <th scope='col'>Degree</th> : null}
                <th scope='col'>Email</th>
                <th scope='col'>Phone</th>
                {actorType === "doctor" ? (
                  <th scope='col'>Present Availability</th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {/* {actors
                ?( actorType==="doctor"? actors.doctors.map((item, index) => {
                      return (
                        <tr>
                          <th scope='row'>{index + 1}</th>
                          <td>{item.name}</td>
                          <td>{item.degree?item.degree:"NA"}</td>
                          <td>{item.email}</td>
                          <td>{item.phone?item.phone:"NA"}</td>
                          <td class={`${item.availability?"text-success":"text-danger"}`}>{item.availability?"Available":"Unavailable"}</td>
                        </tr>
                      );
                   }):actorType==="compounder"?actors.compounders.map((item, index) => {
                        return (
                          <tr>
                            <th scope='row'>{index + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone?item.phone:"NA"}</td>
                          </tr>
                        );
                   }):actors.admins.map((item, index) => {
                        return (
                          <tr>
                            <th scope='row'>{index + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone?item.phone:"NA"}</td>

                          </tr>
                        );
                   }))
                : null} */}
              {renderActors()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminsDashboard;
