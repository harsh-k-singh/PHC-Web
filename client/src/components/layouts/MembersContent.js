import React,{useState,useEffect,useContext} from 'react'
import PatientContext from '../../context/patient/PatientContext'
import AuthContext from '../../context/auth/AuthContext'

const MembersContent = (props) => {
    const {item,index}=props;
    const [data,setData]=useState(item);
    const [edit,setEdit]=useState();
    
    const authContext = useContext(AuthContext);
    const patientContext = useContext(PatientContext);

    const {loadUser } = authContext;
    const {updateRelative,deleteRelative} = patientContext;

    const onEdit = () => {
      setEdit(true);
    };

    const onChange = (index) => (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
    };

    const onSave = () => {
      const updateAndRefetch = async () => {
        await updateRelative(data);
        await loadUser();
      };
      updateAndRefetch();
      setEdit(false);
    };
    const onDelete=()=>{
        const updateAndRefetch = async () => {
            await deleteRelative(data._id);
            await loadUser();
        };
        updateAndRefetch();
    };
  return (
    <div class='row'>
    <div class='col-xl-8' style={{ margin: "auto" }}>
      <div class='card mb-4'>
        <div class='card-header'>Members Details
            <div className="ms-auto" style={{float:"right"}}> 
            {edit ? <i class="fa-solid fa-lg mx-3 fa-user-check" style={{color:"green"}}  onClick={onSave.bind(this,data)}></i>
                :  <i class="fa-solid fa-lg mx-3 fa-user-pen" onClick={onEdit} style={{color:"blue"}}></i>
            }
            <i class="fa-solid fa-user-xmark fa-lg" style={{color:"red"}} onClick={onDelete.bind(this,data)}></i>
            </div>
        </div>
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
                  value={data.relation}
                  onChange={onChange(index)}
                  disabled={edit? 0 : 1}
                />
              </div>
              <div class='col-md-6'>
                <label class='small mb-1' for='inputName'>
                  Full Name
                </label>
                <input
                  class='form-control'
                  id='inputName'
                  type='text'
                  placeholder='Enter your full name'
                  name='name'
                  value={data.name}
                  onChange={onChange(index)}
                  disabled={edit ? 0 : 1}
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
                  onChange={onChange(index)}
                  value={data.gender}
                  disabled={edit ? 0 : 1}
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
                  value={
                    data.birth ? data.birth.slice(0, 10) : "1970-01-01"
                  }
                  onChange={onChange(index)}
                  disabled={edit ? 0 : 1}
                />
              </div>
            </div>
            {/* {edit ? <i class="fa-solid fa-2x fa-circle-check"  onClick={onSave.bind(this,data)}></i>
             :  <i class="fa-solid fa-2x fa-user-pen" onClick={onEdit}></i>
            } */}
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default MembersContent
