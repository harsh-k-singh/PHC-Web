import React from 'react'

const PatientsProfile = () => {
  return (
    <div class="container-xl px-4">
    <div class="row">
        <div class="col-xl-8" style={{margin:"auto"}}> 
            <div class="card mb-4" >
                <div class="card-header">Account Details</div>
                <div class="card-body">
                    <form>
                    <div class="mb-3">
                            <label class="small mb-1" for="inputemail">Email address</label>
                            <input class="form-control" id="inputemail" type="email" placeholder="Your e-mail"/>
                        </div>
                        
                        <div class="row gx-6 mb-3">
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputRollno">Rollno</label>
                                <input class="form-control" id="inputRollno" type="text" placeholder="Enter your Rollno" />
                            </div>                  
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputName">Name</label>
                                <input class="form-control" id="inputName" type="text" placeholder="Enter your Name"/>
                            </div>
                        </div> 
                        <div class="row gx-3 mt-3 mb-3">
                            <div class="col-md-2">
                                <label class="small mb-1" for="inputGender">Gender</label>
                                <select class="form-select" aria-label="Select Your Gender">
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div class="col-md-4">
                                <label class="small mb-1" for="inputBirthday">Birthday</label>
                                <input class="form-control" id="inputBirthday" type="date" name="birthday" placeholder="Enter your birthday"/>
                            </div>
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputPhone">Phone number</label>
                                <input class="form-control" id="inputPhone" type="integer" placeholder="Enter your phone number"/>
                            </div>
                        </div>
                        <div class="row gx-3 mb-3 my-3">
                        <label class="small mb-1" for="inputAddress">Update Profile Picture</label>
                            <div class="input-group">
                            <input type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload"/>
                            <button class="btn btn-outline-primary" type="button" id="inputGroupFileAddon04">Upload</button>
                        </div>
                        </div>
                        <hr/>
                        <div class="row gx-3 mb-3">
                        <label class="small mb-1" for="inputAddress">Update Password</label>
                            <div class="col-md-4">
                                <input type="password" class="form-control" id="inputCurrentPassword" aria-label="Current Password" placeholder='Current Password'/>
                            </div>
                            <div class="col-md-4">
                                <input type="password" class="form-control" id="inputNewPassword" aria-label="New Password"  placeholder='New Password'/>                                   
                            </div>
                            <div class="col-md-4">
                                <input type="password" class="form-control" id="inputConfirmNewPassword" aria-label="Confirm New Password"  placeholder='Confirm New Password'/>    
                            </div>
                        </div>
                        
                        <button class="btn btn-primary" type="button">Save changes</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default PatientsProfile
