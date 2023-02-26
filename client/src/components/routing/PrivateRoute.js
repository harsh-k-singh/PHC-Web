/**
 * Imports
 */
// Routing
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

/**
 * Private Route
 */
const PrivateRoute = ({ children }) => {
    const authContext = useContext(AuthContext);
    // Destructure auth from props
    const { isAuthenticated } = authContext;

    // If user is authenticated, render children
    return isAuthenticated ? children : <Navigate to='/' />;
};

export default PrivateRoute;