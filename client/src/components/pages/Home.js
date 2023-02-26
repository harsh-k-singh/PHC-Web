import HomeHeader from '../layouts/HomeHeader'
import { Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <HomeHeader/>
            <Outlet/>
        </>
    );
}

export default Home
