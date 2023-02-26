import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const Navbar = ({ curr }) => {
    const authContext = {
        user: null,
        logout: false
    };
    const { user, logout } = authContext;
    return (
        <Menu style={{ fontSize: '20px' }} pointing secondary>
            <span className='item'>  PHCApp</span>
            <Link to="/election">
                <span className={curr === 'election' ? 'item active' : 'item'} >Election</span>
            </Link>
            <Link to="/poll">
                <span className={curr === 'poll' ? 'item active' : 'item'} >Polls</span>
            </Link>


            <Menu.Menu position='right'>
                {user !== null ? <span className='item'> Welcome {user.name} </span> : null}
                <a><span className='item' onClick={logout}>Logout</span></a>
            </Menu.Menu>
        </Menu>
    )
}

export default Navbar
