import React,{useState} from 'react'
import CheckCompoundersSchedule from './CheckCompounderSchedule'
import CheckDoctorsSchedule from './CheckDoctorsSchedule'

const CheckSchedule = () => {
  const [role,setRole]=useState("doctor")
  return (
    <div className="container text-center mt-3">
        <buttoon class={`btn ${role==="doctor"?'btn-success':'btn-outline-success'} mx-2`} onClick={() => setRole("doctor")}>
          Doctors Timings
        </buttoon>
        <button class={`btn ${role==="compounder"?'btn-primary':'btn-outline-primary'} mx-2`} onClick={() => setRole("compounder")}>
          Compounders Timings
        </button>
        {role==="doctor"?<CheckDoctorsSchedule/>:<CheckCompoundersSchedule/>}
    </div>
  )
}

export default CheckSchedule
