import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/Auth';
import RegisterForm from '../../components/organism/RegisterForm';


const Register = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();

    useEffect(() => {
        if (isAuthenticated && user) {
            const redirectTo = user.role === 'admin' ? '/dashboard' : '/home';
            navigate(redirectTo, { replace: true });
        }
    }, [isAuthenticated, user, navigate]);

    const handleRegisterSuccess = (user) => {
        const redirectTo = user.role === 'admin' ? '/dashboard' : '/home';
        navigate(redirectTo, { replace: true });
    };

    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <RegisterForm onSuccess={handleRegisterSuccess} />
        </div>
    );
};

export default Register;