import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../context/Auth';
import LoadingSpinner from './moleculs/LoadingSpinner';


const ProtectedRoute = ({ children, requiredRole }) => {
    const { isAuthenticated, user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requiredRole && user?.role !== requiredRole) {
        const redirectTo = user?.role === 'admin' ? '/dashboard' : '/home';
        return <Navigate to={redirectTo} replace />;
    }

    return children;
};

export default ProtectedRoute;