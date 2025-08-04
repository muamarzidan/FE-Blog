import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import LoadingSpinner from '../../components/common/moleculs/LoadingSpinner';

const GoogleCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { handleGoogleCallback } = useAuth();
    const hasProcessed = useRef(false);

    useEffect(() => {
        if (hasProcessed.current) return;
        
        const processGoogleCallback = async () => {
            hasProcessed.current = true;
            
            try {
                const searchParams = location.search.substring(1);
                
                if (!searchParams) {
                    throw new Error('No callback data received');
                }

                const result = await handleGoogleCallback(searchParams);
                if (result.success) {
                    const redirectPath = result.user.role === 'admin' ? '/dashboard/admin/goblog/admin/goblog' : '/home';
                    navigate(redirectPath, { replace: true });
                } else {
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
    }, []);

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