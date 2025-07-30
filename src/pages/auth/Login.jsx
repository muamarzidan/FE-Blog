import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../context/Auth';
import LoginForm from '../../components/organism/LoginForm';


export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, user } = useAuth();

    useEffect(() => {
        if (isAuthenticated && user) {
            const from = location.state?.from?.pathname || null;
            
            if (from && from !== '/login') {
                navigate(from, { replace: true });
            } else {
                const defaultPath = user.role === 'admin' ? '/dashboard' : '/home';
                navigate(defaultPath, { replace: true });
            }
        }
    }, [isAuthenticated, user, navigate, location]);

    const handleLoginSuccess = (user) => {
        const from = location.state?.from?.pathname || null;
        
        if (from && from !== '/login') {
            navigate(from, { replace: true });
        } else {
            const defaultPath = user.role === 'admin' ? '/dashboard' : '/home';
            navigate(defaultPath, { replace: true });
        }
    };

    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <LoginForm onSuccess={handleLoginSuccess} />
        </div>
    );
}