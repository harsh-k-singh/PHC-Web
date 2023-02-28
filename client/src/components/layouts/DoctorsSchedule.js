import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/auth/AuthContext";

const DoctorsSchedule = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const [edit, setEdit] = useState(false);
  const onEdit = () => {
    setEdit(true);
  };
  const onSave = () => {
    setEdit(false);
  };

  const [sche, setSche] = useState({
    monAT: "",
    monDT: "",
    tueAT: "",
    tueDT: "",
    wedAT: "",
    wedDT: "",
    thuAT: "",
    thuDT: "",
    friAT: "",
    friDT: "",
    satAT: "",
    satDT: "",
    sunAT: "",
    sunDT: "",
  });
  const onChange = (e) => {
    console.log(e.target.name, e.target.value);
    setSche({ ...sche, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      setSche(user.timing);
    }
  }, [user]);

  return (
    <>
      <h2 class='text-center'>Your Timings</h2>
      <table
        class='table my-3 text-center'
        style={{ width: "80%", margin: "auto" }}
      >
        <thead class='table-dark'>
          <tr>
            <th scope='col'>S.No</th>
            <th scope='col'>Day</th>
            <th scope='col'>Arrival time</th>
            <th scope='col'>Depart time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope='row'>1</th>
            <td>Monday</td>
            <td>
              <input
                type='time'
                name='monAT'
                id='monAT'
                onChange={onChange}
                value={sche.monAT}
                disabled={edit ? 0 : 1}
              />
            </td>
            <td>
              <input
                type='time'
                name='monDT'
                id='monDT'
                onChange={onChange}
                value={sche.monDT}
                disabled={edit ? 0 : 1}
              />
            </td>
          </tr>
          <tr>
            <th scope='row'>2</th>
            <td>Tuseday</td>
            <td>
              <input
                type='time'
                name='tueAT'
                id='tueAT'
                onChange={onChange}
                value={sche.tueAT}
                disabled={edit ? 0 : 1}
              />
            </td>
            <td>
              <input
                type='time'
                name='tueDT'
                id='tueDT'
                onChange={onChange}
                value={sche.tueDT}
                disabled={edit ? 0 : 1}
              />
            </td>
          </tr>
          <tr>
            <th scope='row'>3</th>
            <td>Wednesday</td>
            <td>
              <input
                type='time'
                name='wedAT'
                id='wedAT'
                onChange={onChange}
                value={sche.wedAT}
                disabled={edit ? 0 : 1}
              />
            </td>
            <td>
              <input
                type='time'
                name='wedDT'
                id='wedDT'
                onChange={onChange}
                value={sche.wedDT}
                disabled={edit ? 0 : 1}
              />
            </td>
          </tr>
          <tr>
            <th scope='row'>4</th>
            <td>Thursday</td>
            <td>
              <input
                type='time'
                name='thuAT'
                id='thuAT'
                onChange={onChange}
                value={sche.thuAT}
                disabled={edit ? 0 : 1}
              />
            </td>
            <td>
              <input
                type='time'
                name='thuDT'
                id='thuDT'
                onChange={onChange}
                value={sche.thuDT}
                disabled={edit ? 0 : 1}
              />
            </td>
          </tr>
          <tr>
            <th scope='row'>5</th>
            <td>Friday</td>
            <td>
              <input
                type='time'
                name='friAT'
                id='friAT'
                onChange={onChange}
                value={sche.friAT}
                disabled={edit ? 0 : 1}
              />
            </td>
            <td>
              <input
                type='time'
                name='friDT'
                id='friDT'
                onChange={onChange}
                value={sche.friDT}
                disabled={edit ? 0 : 1}
              />
            </td>
          </tr>
          <tr>
            <th scope='row'>6</th>
            <td>Saturday</td>
            <td>
              <input
                type='time'
                name='satAT'
                id='satAT'
                onChange={onChange}
                value={sche.satAT}
                disabled={edit ? 0 : 1}
              />
            </td>
            <td>
              <input
                type='time'
                name='satDT'
                id='satDT'
                onChange={onChange}
                value={sche.satDT}
                disabled={edit ? 0 : 1}
              />
            </td>
          </tr>
          <tr>
            <th scope='row'>7</th>
            <td>Sunday</td>
            <td>
              <input
                type='time'
                name='sunAT'
                id='sunAT'
                onChange={onChange}
                value={sche.sunAT}
                disabled={edit ? 0 : 1}
              />
            </td>
            <td>
              <input
                type='time'
                name='sunDT'
                id='sunDT'
                onChange={onChange}
                value={sche.sunDT}
                disabled={edit ? 0 : 1}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class='d-grid gap-2'
        style={{ width: "15%", margin: "auto", marginTop: "30px" }}
      >
        {edit ? (
          <button class='btn btn-primary' type='button' onClick={onSave}>
            Save changes
          </button>
        ) : (
          <button class='btn btn-danger' type='button' onClick={onEdit}>
            Update
          </button>
        )}
      </div>
    </>
  );
};

export default DoctorsSchedule;
