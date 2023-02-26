import React,{useState} from 'react'

const AdminsProfile = () => {
    const [edit, setEdit] = useState(false);
    const onEdit = () => {
        setEdit(true);
    }   
    const onSave = () => {
        setEdit(false);
    }
  return (
    <div class="container-xl px-4">
    <div class="row">
        <div class="col-xl-8" style={{margin:"auto"}}> 
            <div class="card mb-4" >
                <div class="card-header">Account Details</div>
                <div class="card-body">
                    <form>
                        <div class="mb-3">
                            <label class="small mb-1" for="inputemail">Email address*</label>
                            <input class="form-control" id="inputemail" type="email" placeholder="Your e-mail" disabled={edit?0:1}/>
                        </div>
                        
                        <div class="row gx-3 mb-3"> 
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputFullName">Full name*</label>
                                <input class="form-control" id="inputFullName" type="text" placeholder="Enter your full name" disabled={edit?0:1} />
                            </div> 
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputPhone">Phone number</label>
                                <input class="form-control" id="inputPhone" type="integer" placeholder="Enter your phone number" disabled={edit?0:1}/>
                            </div>                 
                        </div> 
                        <div class="row gx-3 mb-3 my-3">
                        <label class="small mb-1" for="inputAddress">Update Profile Picture</label>
                            <div class="input-group">
                            <input type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" disabled={edit?0:1}/>
                            <button class="btn btn-outline-primary" type="button" id="inputGroupFileAddon04">Upload</button>
                        </div>
                        </div>
                        <hr/>
                        <div class="row gx-3 mb-3">
                        <label class="small mb-1" for="inputAddress">Update Password</label>
                            <div class="col-md-4">
                                <input type="password" class="form-control" id="inputCurrentPassword" aria-label="Current Password" placeholder='Current Password' disabled={edit?0:1}/>
                            </div>
                            <div class="col-md-4">
                                <input type="password" class="form-control" id="inputNewPassword" aria-label="New Password"  placeholder='New Password' disabled={edit?0:1}/>                                   
                            </div>
                            <div class="col-md-4">
                                <input type="password" class="form-control" id="inputConfirmNewPassword" aria-label="Confirm New Password"  placeholder='Confirm New Password' disabled={edit?0:1}/>    
                            </div>
                        </div>
                        {edit ? <button class="btn btn-primary" type="button" onClick={onSave}>Save changes</button> : <button class="btn btn-danger" type="button" onClick={onEdit}>Edit</button>}                 
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default AdminsProfile
