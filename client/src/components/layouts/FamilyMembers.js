import React,{useState} from 'react'
import ViewFamilyMembers from './ViewFamilyMembers'
import AddFamilyMembers from './AddFamilyMembers'

const FamilyMembers = () => {
    const [action,setAction]=useState("view")
    return (
      <div className="container text-center mt-3">
          <buttoon class={`btn ${action==="view"?'btn-info':'btn-outline-info'} mx-2`} onClick={() => setAction("view")}>
            View Family Members
          </buttoon>
          <button class={`btn ${action==="add"?'btn-info':'btn-outline-info'} mx-2`} onClick={() => setAction("add")}>
            Add New Members
          </button>
          {action==="view"?<ViewFamilyMembers/>:<AddFamilyMembers/>}
      </div>
    )
}

export default FamilyMembers
