import { useAuth as useAuthContext } from '../context/Auth';

export const useAuth = () => {
    return useAuthContext();
};

export const useRole = () => {
    const { user } = useAuthContext();

    const isAdmin = user?.role === 'admin';
    const isUser = user?.role === 'user';

    return {
        isAdmin,
        isUser,
        role: user?.role,
    };
};

export const useAuthStatus = () => {
    const { isAuthenticated, isLoading, user } = useAuthContext();

    return {
        isAuthenticated,
        isLoading,
        isGuest: !isAuthenticated && !isLoading,
        user,
    };
};