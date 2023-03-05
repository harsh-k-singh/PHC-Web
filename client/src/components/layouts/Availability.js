import React, { useContext, useEffect, useState } from "react";

import GlobalContext from "../../context/global/GlobalContext";

const Availability = () => {
const globalContext = useContext(GlobalContext);
const {getAvailable, available } =
    globalContext;
const [availableData, setAvailableData] = useState([]);
useEffect(() => {
    const fetchData = async () =>{
      await getAvailable();
      setAvailableData(available);
      console.log("available data",availableData);
    };
    fetchData();
  },);
  return (
    <div class='card-body'>
    <table
      class='table my-3 text-center'
      style={{ width: "80%", margin: "auto" }}
    >
      <thead class='table-dark'>
        <tr>
          <th scope='col'>S.No</th>
          <th scope='col'>Name</th>
          <th scope='col'>Suffix</th>
        </tr>
      </thead>
      <tbody>
        {availableData
          ? availableData.map((item, index) => {
              return (
                <tr>
                  <th scope='row'>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.degree}</td>
                </tr>
              );
            })
          : null}
      </tbody>
    </table>
  </div>
  )
}

export default Availability
