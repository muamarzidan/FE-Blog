import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../context/Auth';
import LoadingSpinner from '../../components/moleculs/LoadingSpinner';


const GoogleCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { handleGoogleCallback } = useAuth();
    const [error, setError] = useState(null);

    useEffect(() => {
        const processCallback = async () => {
            try {
                const searchParams = location.search;
                
                if (!searchParams || searchParams.includes('error')) {
                    setError('Google login dibatalkan atau terjadi kesalahan');
                    setTimeout(() => navigate('/login'), 3000);
                    return;
                }

                const result = await handleGoogleCallback(searchParams);
                
                if (result.success) {
                    const redirectTo = result.user.role === 'admin' ? '/dashboard' : '/home';
                    navigate(redirectTo, { replace: true });
                } else {
                    setError(result.error || 'Terjadi kesalahan saat login dengan Google');
                    setTimeout(() => navigate('/login'), 3000);
                }
            } catch (error) {
                console.error('Google callback error:', error);
                setError('Terjadi kesalahan saat memproses login Google');
                setTimeout(() => navigate('/login'), 3000);
            }
        };

        processCallback();
    }, [location.search, handleGoogleCallback, navigate]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">Login Gagal</h3>
                        <p className="mt-2 text-sm text-gray-500">{error}</p>
                        <p className="mt-2 text-xs text-gray-400">Akan dialihkan ke halaman login...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <LoadingSpinner />
                <p className="mt-4 text-sm text-gray-600">Memproses login Google...</p>
            </div>
        </div>
    );
};

export default GoogleCallback;