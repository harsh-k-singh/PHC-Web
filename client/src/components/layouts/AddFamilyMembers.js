import React,{useState,useEffect,useContext} from 'react'
import PatientContext from "../../context/patient/PatientContext";

const AddFamilyMembers = () => {
    const patientContext = useContext(PatientContext);
    const { relatives,getRelatives,addRelative } = patientContext;
    
    const [form, setForm] = useState({
        name: "",
        relation: "",
        birth: "",
        gender: "Male",
    });
    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        addRelative(form);
    };
    useEffect(() => {
      const func = async () => {
        await getRelatives();
        // console.log(relatives);
      };
      func();
    },[]);
    return (
        <div class='row'>
        <div class='col-xl-8' style={{ margin: "auto" }}>
        <div class='card mb-4'>
            <div class='card-header'>Members Details</div>
            <div class='card-body'>
            <form>
                <div class='row gx-3 mb-3'>
                <div class='col-md-6'>
                    <label class='small mb-1' for='inputOrgName'>
                    Relation
                    </label>
                    <input
                    class='form-control'
                    id='inputRelation'
                    type='text'
                    placeholder='Enter Relation'
                    name='relation'
                    onChange={onChange}
                    />
                </div>
                <div class='col-md-6'>
                    <label class='small mb-1' for='inputName'>
                    Full Name*
                    </label>
                    <input
                    class='form-control'
                    id='inputName'
                    type='text'
                    placeholder='Enter your full name'
                    name='name'
                    onChange={onChange}
                    />
                </div>
                </div>
                <div class='row gx-3 mb-3'>
                <div class='col-md-6'>
                    <label class='small mb-1' for='inputGender'>
                    Gender
                    </label>
                    <select
                    class='form-select'
                    aria-label='Select Your Gender'
                    name='gender'
                    onChange={onChange}
                    >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                    </select>
                </div>
                <div class='col-md-6'>
                    <label class='small mb-1' for='inputBirth'>
                    Birthday
                    </label>
                    <input
                    class='form-control'
                    id='inputBirth'
                    type='date'
                    placeholder='Enter your birthday'
                    name='birth'
                    onChange={onChange}
                    />
                </div>
                </div>
                <button
                    class='btn btn-primary'
                    type='button'
                    onClick={onSubmit}
                >
                    Add Member
                </button>
            </form>
            </div>
        </div>
        </div>
    </div>
  )
}

export default AddFamilyMembers
