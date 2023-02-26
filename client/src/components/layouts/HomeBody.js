import React from 'react'
// import HomePagePicture from './HomePagePicture.jpg'; 
import '../../CSSFiles/HomeBody.css'
import LoginForm from './LoginForm';
const HomeBody = () => {
    return (
        <>
            <div className="bodyStyle">
                {/* <img className="imgStyle" src={HomePagePicture} alt="Home Page Picture"/> */}
                <LoginForm />
            </div>
        </>
    )
}

export default HomeBody
