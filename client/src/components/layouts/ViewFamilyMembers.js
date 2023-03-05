import React,{useState} from 'react'

const ViewFamilyMembers = () => {
    const [edit, setEdit] = useState(false);
    const onEdit = () => {
        setEdit(true);
      };
      const onSave = () => {
        // console.log("form", form);
        // const updateAndRefetch = async () => {
        //   await updateProfile(form);
        //   await loadUser();
        // };
        // updateAndRefetch();
        setEdit(false);
        // navigate("/doctor/profile");
      };
  return (
    <div class='container-xl mt-3 px-4'>
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
                    id='inputDegree'
                    type='text'
                    placeholder='Enter your Degree'
                    name='degree'
                    // value={form.degree}
                    // onChange={onChange}
                    disabled={edit ? 0 : 1}
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
                    // value={form.name}
                    // onChange={onChange}
                    disabled={edit ? 0 : 1}
                  />
                </div>
              </div>
              <div class='row gx-3 mb-3'>
                <div class='col-md-6'>
                  <label class='small mb-1' for='inputPhone'>
                    Phone number
                  </label>
                  <input
                    class='form-control'
                    id='inputPhone'
                    type='integer'
                    placeholder='Enter your phone number'
                    name='phone'
                    // value={form.phone}
                    // onChange={onChange}
                    disabled={edit ? 0 : 1}
                  />
                </div>
                <div class='col-md-2'>
                  <label class='small mb-1' for='inputGender'>
                    Gender
                  </label>
                  <select
                    class='form-select'
                    aria-label='Select Your Gender'
                    name='gender'
                    // onChange={onChange}
                    // value={form.gender}
                    disabled={edit ? 0 : 1}
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div class='col-md-4'>
                  <label class='small mb-1' for='inputBirth'>
                    Birthday
                  </label>
                  <input
                    class='form-control'
                    id='inputBirth'
                    type='date'
                    placeholder='Enter your birthday'
                    name='birth'
                    // value={
                    //   form.birth ? form.birth.slice(0, 10) : "1970-01-01"
                    // }
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
                <button class='btn btn-danger' type='button' onClick={onEdit}>
                  Edit
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ViewFamilyMembers
