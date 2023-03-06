import React,{useState,useEffect,useContext} from 'react'
import PatientContext from '../../context/patient/PatientContext'

const ViewFamilyMembers = () => {
    const [members, setMembers] = useState(null);
    const [edit,setEdit]=useState(false);
    
    const patientContext = useContext(PatientContext);
    const { getRelatives, relatives } = patientContext;
    useEffect(() => {
      const func = async () => {
        await getRelatives();
        console.log(relatives);
        setMembers(relatives);
      };
      func();
    }, []);
    const onEdit = () => {
        setEdit(true);
    };
    const onSave = () => {
        setEdit(false);
    };

  return (
    <div class='container-xl px-4'>
        {members?members.map((item,index) => {
            return(
                <div class='row'>
                <div class='col-xl-8' style={{ margin: "auto" }}>
                  <div class='card mb-4'>
                    <div class='card-header'>Members Details*</div>
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
                              value={item.relation}
                              // onChange={onChange}
                              disabled={edit? 0 : 1}
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
                              value={item.name}
                              // onChange={onChange}
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
                              // onChange={onChange}
                              value={item.gender}
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
                                item.birth ? item.birth.slice(0, 10) : "1970-01-01"
                              }
                              // onChange={onChange}
                              disabled={edit ? 0 : 1}
                            />
                          </div>
                        </div>
                        {edit ? (
                          <button
                            class='btn btn-primary'
                            type='button'
                            onClick={onSave}
                          >
                            Save changes
                          </button>
                        ) : (
                          <button class='btn btn-danger' type='button' 
                          onClick={onEdit}
                          >
                            Edit
                          </button>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )
        }):null}
  </div>
  )
}

export default ViewFamilyMembers
