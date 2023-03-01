import React, { useContext, useEffect, useState } from "react";

import GlobalContext from "../../context/global/GlobalContext";

const CheckDoctorsSchedule = () => {
  const globalContext = useContext(GlobalContext);
  const { getSchedule, schedule } = globalContext;
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      await getSchedule();
      setData(schedule);
    };
    fetchData();
  }, []);
  console.log("data", data);
  return (
    <div className='container'>
      <h2 class='text-center'>Doctors Schedule</h2>
      <table
        class='table my-3 text-center'
        style={{ width: "80%", margin: "auto" }}
      >
        <thead class='table-dark'>
          <tr>
            <th scope='col'>S.No</th>
            <th scope='col'>Phc user</th>
            <th scope='col'>Schedule</th>
            <th scope='col'>Presently</th>
            <th scope='col'>Visit Profile</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope='row'>1</th>
            <td>{data ? data[0].name: 'ABC'}</td>
            <td>Monday-Friday 4PM-6PM</td>
            <td>Available</td>
            <td class='text-center'>
              <button class='btn btn-sm btn-primary' type='button'>
                Visit
              </button>
            </td>
          </tr>
          <tr>
            <th scope='row'>2</th>
            <td>ABC</td>
            <td>Monday-Friday 4PM-6PM</td>
            <td>Unavailable</td>
            <td class='text-center'>
              <button class='btn btn-sm btn-primary' type='button'>
                Visit
              </button>
            </td>
          </tr>
          <tr>
            <th scope='row'>3</th>
            <td>ABC</td>
            <td>Monday-Friday 4PM-6PM</td>
            <td>Available</td>
            <td class='text-center'>
              <button class='btn btn-sm btn-primary' type='button'>
                Visit
              </button>
            </td>
          </tr>
          <tr>
            <th scope='row'>4</th>
            <td>ABC</td>
            <td>Monday-Friday 4PM-6PM</td>
            <td>Unavailable</td>
            <td class='text-center'>
              <button class='btn btn-sm btn-primary' type='button'>
                Visit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CheckDoctorsSchedule;
