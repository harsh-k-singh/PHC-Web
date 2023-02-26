import React from "react";
const CheckDoctorsSchedule = () => {
  return (
    <>
      <h2 class="text-center">Doctors Schedule</h2>
      <table class="table my-3 text-center" style={{ width: "80%", margin: "auto" }}>
        <thead class="table-dark">
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Name</th>
            <th scope="col">Schedule</th>
            <th scope="col">Presently</th>
            <th scope="col">Visit Profile</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>ABC</td>
            <td>Monday-Friday 4PM-6PM</td>
            <td>Available</td>
            <td class="text-center"><button class="btn btn-sm btn-primary" type="button">Visit</button></td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>ABC</td>
            <td>Monday-Friday 4PM-6PM</td>
            <td>Unavailable</td>
            <td class="text-center"><button class="btn btn-sm btn-primary" type="button">Visit</button></td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>ABC</td>
            <td>Monday-Friday 4PM-6PM</td>
            <td>Available</td>
            <td class="text-center"><button class="btn btn-sm btn-primary" type="button">Visit</button></td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>ABC</td>
            <td>Monday-Friday 4PM-6PM</td>
            <td>Unavailable</td>
            <td class="text-center"><button class="btn btn-sm btn-primary" type="button">Visit</button></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default CheckDoctorsSchedule;
