import React,{useContext} from 'react';
import AdminsDP from '../../images/AdminsDP.jpg';
import '../../CSSFiles/SideProfile.css'
import AuthContext from "../../context/auth/AuthContext";

const AdminsSP = () => {
  const authContext = useContext(AuthContext);
  const {user} = authContext;
  return (
    <div className="sideProfile card px-2 py-2 mx-2 shadow-sm">
    <ul className="nav flex-column text-center" style={{fontSize:20}}>
      <div className="card px-2 py-2 mx-2 my-2 mt-4 shadow-sm">
        <li><img className="text-center rounded-circle my-2" src={AdminsDP} width="55%" height="150" border="2"/></li>
        <li className="my-8">{user ? user.email : 'email'}</li>
        <li>{user ? user.name : 'name'}</li>
        <li style={{fontSize:"2rem",color:"Red",margin:4}}>Admin</li>
      </div>
    </ul>
    <div className="mt-auto">
      <form action="/admin/profile">
        <div class="d-grid gap-2" href="/profile">
        <button class="btn btn-outline-primary" type="submit">Manage Profile</button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default AdminsSP
