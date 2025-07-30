import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import LoadingSpinner from '../../components/moleculs/LoadingSpinner';

const GoogleCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { handleGoogleCallback } = useAuth();
    const hasProcessed = useRef(false);

    useEffect(() => {
        // Prevent multiple executions
        if (hasProcessed.current) return;
        
        const processGoogleCallback = async () => {
            hasProcessed.current = true;
            
            try {
                // Get the search params from URL
                const searchParams = location.search.substring(1); // Remove the '?' prefix
                
                if (!searchParams) {
                    throw new Error('No callback data received');
                }

                console.log('Processing Google callback with params:', searchParams);

                // Handle the callback
                const result = await handleGoogleCallback(searchParams);
                
                console.log('Google callback result:', result);

                if (result.success) {
                    // Redirect based on user role
                    const redirectPath = result.user.role === 'admin' ? '/dashboard' : '/home';
                    console.log('Redirecting to:', redirectPath);
                    navigate(redirectPath, { replace: true });
                } else {
                    // Redirect to login with error
                    console.log('Google login failed:', result.error);
                    navigate('/login', { 
                        replace: true, 
                        state: { error: result.error || 'Google login failed' }
                    });
                }
            } catch (error) {
                console.error('Google callback error:', error);
                navigate('/login', { 
                    replace: true, 
                    state: { error: 'Terjadi kesalahan saat login dengan Google' }
                });
            }
        };

        processGoogleCallback();
    }, []); // Empty dependency array to run only once

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <LoadingSpinner size="large" />
                <p className="mt-4 text-gray-600">Memproses login Google...</p>
            </div>
        </div>
    );
};

export default GoogleCallback;