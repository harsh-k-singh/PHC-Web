import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/auth/AuthContext";

const SignUpPatient = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenicated, register, loadUser, user } = authContext;
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    roll_number: "",
    phone: "",
    gender: "Male",
    password: "",
    cnf_password: "",
    birth: "",
    profession: "",
    guardian_phone: null,
    guarding_relation: null,
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // If user is authenticated, redirect to dashboard
    const redirectToDashboard = async () => {
      await loadUser();
      if (user) {
        navigate("/" + user.role);
      }
    };

    if (isAuthenicated || localStorage.getItem("isAuthenicated")) {
      redirectToDashboard();
    }
    // eslint-disable-next-line
  }, [isAuthenicated, user]);

  const onSubmit = (e) => {
    e.preventDefault();
    register(form);
  };

  return (
    <div class='container-xl px-4 mt-5 py-3'>
      <h3 className='text-center'>Patient Signup</h3>
      <div class='row mt-3'>
        <div class='col-xl-8' style={{ margin: "auto" }}>
          <div class='card mb-4'>
            <div class='card-header'>Account Details</div>
            <div class='card-body'>
              <form>
                <div class='row gx-6 mb-3'>
                  <div class='col-md-6'>
                    <label class='small mb-1' for='inputemail'>
                      Email address
                    </label>
                    <input
                      onChange={onChange}
                      required={true}
                      name='email'
                      class='form-control'
                      id='inputemail'
                      type='email'
                      placeholder='Your e-mail'
                    />
                  </div>
                  <div class='col-md-6 mt-4'>
                    <div class='form-check form-check-inline'>
                      <input
                        class='form-check-input'
                        type='radio'
                        id='inlineRadio1'
                        onChange={onChange}
                        name='profession'
                        value='Student'
                      />
                      <label class='form-check-label' for='inlineRadio1'>
                        Student
                      </label>
                    </div>
                    <div class='form-check form-check-inline'>
                      <input
                        class='form-check-input'
                        type='radio'
                        id='inlineRadio2'
                        onChange={onChange}
                        name='profession'
                        value='Faculty'
                      />
                      <label class='form-check-label' for='inlineRadio2'>
                        Faculty
                      </label>
                    </div>
                  </div>
                </div>
                <div class='row gx-6 mb-3'>
                  <div class='col-md-6'>
                    <label class='small mb-1' for='inputRollno'>
                      Roll No./PF No.
                    </label>
                    <input
                      onChange={onChange}
                      required={true}
                      name='roll_number'
                      class='form-control'
                      id='inputRollno'
                      type='text'
                      placeholder='Enter your Roll No./PF No.'
                    />
                  </div>
                  <div class='col-md-6'>
                    <label class='small mb-1' for='inputName'>
                      Name
                    </label>
                    <input
                      onChange={onChange}
                      required={true}
                      name='name'
                      class='form-control'
                      id='inputName'
                      type='text'
                      placeholder='Enter your Name'
                    />
                  </div>
                </div>
                <div class='row gx-3 mt-3 mb-3'>
                  <div class='col-md-2'>
                    <label class='small mb-1' for='inputGender'>
                      Gender
                    </label>
                    <select
                      onChange={onChange}
                      required={true}
                      name='gender'
                      class='form-select'
                      aria-label='Select Your Gender'
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div class='col-md-4'>
                    <label class='small mb-1' for='inputBirthday'>
                      Birthday
                    </label>
                    <input
                      onChange={onChange}
                      required={true}
                      name='birth'
                      class='form-control'
                      id='inputBirthday'
                      type='date'
                      placeholder='Enter your birth date'
                    />
                  </div>
                  <div class='col-md-6'>
                    <label class='small mb-1' for='inputPhone'>
                      Phone number
                    </label>
                    <input
                      onChange={onChange}
                      required={true}
                      name='phone'
                      class='form-control'
                      id='inputPhone'
                      type='integer'
                      placeholder='Enter your phone number'
                    />
                  </div>
                </div>
                {form.profession === "Student" && (
                  <div class='row gx-3 mt-3 mb-3'>
                    <div class='col-md-6'>
                      <label class='small mb-1' for='inputGuardianPhone'>
                        Guardian's Phone number
                      </label>
                      <input
                        onChange={onChange}
                        required={true}
                        name='guardian_phone'
                        class='form-control'
                        id='inputGuardianPhone'
                        type='integer'
                        placeholder="Enter guardian's phone number"
                      />
                    </div>
                    <div class='col-md-6'>
                      <label class='small mb-1' for='inputGuradianRelation'>
                        Guardian's Relation
                      </label>
                      <input
                        onChange={onChange}
                        required={true}
                        name='guardian_relation'
                        class='form-control'
                        id='inputGuradianRelation'
                        type='text'
                        placeholder='Enter relationship with guardian'
                      />
                    </div>
                  </div>
                )}
                <div class='row gx-3 mt-3 mb-3'>
                  <label class='small mb-1' for='inputAddress'>
                    Set Password
                  </label>
                  <div class='col-md-6'>
                    <input
                      onChange={onChange}
                      required={true}
                      name='password'
                      type='password'
                      class='form-control'
                      id='inputPassword'
                      aria-label='Password'
                      placeholder='Password'
                    />
                  </div>
                  <div class='col-md-6'>
                    <input
                      onChange={onChange}
                      required={true}
                      name='cnf_password'
                      type='password'
                      class='form-control'
                      id='inputConfirmPassword'
                      aria-label='Password'
                      placeholder='Confirm Password'
                    />
                  </div>
                </div>
                <div class='d-grid gap-2 mt-5'>
                  <button
                    onClick={onSubmit}
                    class='btn btn-primary'
                    type='button'
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPatient;
