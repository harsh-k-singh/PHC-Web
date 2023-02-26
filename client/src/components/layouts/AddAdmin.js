import React from 'react'

const AddAdmin = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        roll_number: '',
        phone: '',
        gender: 'male',
        password: '',
        cnf_password: '',
        birth: ''
    })
    const onChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
  return (
    <div class="container-xl px-4">
        <h3 className="text-center">Create Admin's account</h3>
    <div class="row">
        <div class="col-xl-8" style={{margin:"auto"}}> 
            <div class="card mb-4" >
                <div class="card-header">Account Details</div>
                <div class="card-body">
                <form>
                    <div class="mb-3">
                        <label class="small mb-1" for="inputemail">Email address</label>
                        <input onChange={onChange} required={true} name="email" class="form-control" id="inputemail" type="email" placeholder="Enter Admin's e-mail" />
                    </div>
                    <div class="mb-3">
                        <label class="small mb-1" for="inputName">Name</label>
                        <input onChange={onChange} required={true} name="name" class="form-control" id="inputName" type="text" placeholder="Enter Admin's Full name" />
                    </div>
                    <div class="row gx-3 mt-3 mb-3">
                        <label class="small mb-1" for="inputAddress">Set Password</label>
                        <div class="col-md-6">
                            <input onChange={onChange} required={true} name="password" type="password" class="form-control" id="inputPassword" aria-label="Password" placeholder='Password' />
                        </div>
                        <div class="col-md-6">
                            <input onChange={onChange} required={true} name="cnf_password" type="password" class="form-control" id="inputConfirmPassword" aria-label="Password" placeholder='Confirm Password' />
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default AddAdmin
