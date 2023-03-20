import React, { useEffect, useState, useContext } from "react";
import PHClogo from "../../../images/PHClogo1.png";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/auth/AuthContext";

const LoginForm = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenicated, login, loadUser, user } = authContext;

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    role: "",
    email: "",
    password: "",
  });

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

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(form);
  };

  return (
    <div className='container containerStyle'>
      <img
        className='rounded mx-auto d-block my-3'
        src={PHClogo}
        alt='Institute Logo'
        style={{ width: 150, height: 140 }}
      />
      <form>
        <h3 className='text-center mb-4'>
          <b>Login to PHC</b>
        </h3>
        <div className='form-outline mb-4'>
          <select
            class='form-select'
            aria-label='Select Your Role'
            onChange={onChange}
            name='role'
          >
            <option value='' disabled selected hidden>
              Select Your Role
            </option>
            <option value='patient'>Patient</option>
            <option value='doctor'>Doctor</option>
            <option value='compounder'>Compounder</option>
            <option value='admin'>Admin</option>
          </select>
        </div>
        <div className='form-outline mb-4'>
          <input
            name='email'
            type='email'
            id='form2Example1'
            className='form-control'
            placeholder='Email address'
            onChange={onChange}
            style={{ height: "32px" }}
          />
        </div>
        <div className='form-outline mb-4'>
          <div class='input-group'>
            <input
              name='password'
              type={!show ? "password" : "text"}
              class='input form-control'
              id='password'
              placeholder='password'
              required='true'
              aria-label='password'
              aria-describedby='basic-addon1'
              onChange={onChange}
              style={{ height: "32px" }}
            />
            <div class='input-group-append'>
              <span class='input-group-text' onClick={() => setShow(!show)}>
                <i
                  class='fas fa-eye'
                  id='show_eye'
                  style={{ height: "17px" }}
                ></i>
              </span>
            </div>
          </div>
        </div>
        {/* <div className='row mb-4'>
          <div className='col mx-auto'>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='checkbox'
                value=''
                id='form2Example31'
                checked
              />
              <label className='form-check-label' htmlFor='form2Example31'>
                {" "}
                Remember me{" "}
              </label>
            </div>
          </div>
          <div className='col text-end'>
            <a href='#!'>Forgot password?</a>
          </div>
        </div> */}
        <div class='d-grid gap-2 my-5'>
          <button class='btn btn-primary' type='button' onClick={onSubmit}>
            Sign In
          </button>
        </div>
        <div className='text-center'>
          <hr style={{ marginTop: "2rem" }} />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
