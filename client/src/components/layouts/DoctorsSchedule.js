import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../../context/auth/AuthContext';

const DoctorsSchedule = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenicated, user } = authContext;
  useEffect(() => {
    console.log(user, 'user');
    console.log(isAuthenicated, 'isauth');
  })
  const [sche, setSche] = useState({
    monAT: '',
    monDT: '',
    tueAT: '',
    tueDT: '',
    wedAT: '',
    wedDT: '',
    thuAT: '',
    thuDT: '',
    friAT: '',
    friDT: '',
    satAT: '',
    satDT: '',
    sunAT: '',
    sunDT: '',
  });
  const onChange = (e) => {
    setSche({ ...sche, [e.target.name]: e.target.value });
  }
  console.log(sche);
  return (
    <>
      <h2 class="text-center">Your Schedule</h2>
      <table class="table my-3 text-center" style={{ width: "80%", margin: "auto" }}>
        <thead class="table-dark">
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Day</th>
            <th scope="col">Arrival time</th>
            <th scope="col">Depart time</th>
            <th scope="col">Update</th>
          </tr>
        </thead>
        <tbody>

          <tr>
            <th scope="row">1</th>
            <td>Monday</td>
            <td><input type="time" name="monAT" id="monAT" onChange={onChange} /></td>
            <td><input type="time" name="monDT" id="monDT" onChange={onChange} /></td>
            <td class="text-center"><button class="btn btn-sm btn-primary" type="button">Visit</button></td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Tuseday</td>
            <td><input type="time" name="tueAT" id="tueAT" onChange={onChange} /></td>
            <td><input type="time" name="tueDT" id="tueDT" onChange={onChange} /></td>
            <td class="text-center"><button class="btn btn-sm btn-primary" type="button">Visit</button></td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Wednesday</td>
            <td><input type="time" name="wedAT" id="wedAT" onChange={onChange} /></td>
            <td><input type="time" name="wedDT" id="wedDT" onChange={onChange} /></td>
            <td class="text-center"><button class="btn btn-sm btn-primary" type="button">Visit</button></td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Thursday</td>
            <td><input type="time" name="thuAT" id="thuAT" onChange={onChange} /></td>
            <td><input type="time" name="thuDT" id="thuDT" onChange={onChange} /></td>
            <td class="text-center"><button class="btn btn-sm btn-primary" type="button">Visit</button></td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Friday</td>
            <td><input type="time" name="friAT" id="friAT" onChange={onChange} /></td>
            <td><input type="time" name="friDT" id="friDT" onChange={onChange} /></td>
            <td class="text-center"><button class="btn btn-sm btn-primary" type="button">Visit</button></td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>Saturday</td>
            <td><input type="time" name="satAT" id="satAT" onChange={onChange} /></td>
            <td><input type="time" name="satDT" id="satDT" onChange={onChange} /></td>
            <td class="text-center"><button class="btn btn-sm btn-primary" type="button">Visit</button></td>
          </tr>
          <tr>
            <th scope="row">7</th>
            <td>Sunday</td>
            <td><input type="time" name="sunAT" id="sunAT" onChange={onChange} /></td>
            <td><input type="time" name="sunDT" id="sunDT" onChange={onChange} /></td>
            <td class="text-center"><button class="btn btn-sm btn-primary" type="button">Visit</button></td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default DoctorsSchedule
