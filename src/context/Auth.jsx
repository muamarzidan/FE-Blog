import { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI, setToken, removeToken, getToken, setUnauthorizedHandler } from '../utils/request';

const AuthContext = createContext();

const initialState = {
    user: null,
    token: getToken(),
    isLoading: true,
    isAuthenticated: false,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
            };
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false,
            };
        case 'AUTH_INIT_COMPLETE':
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const checkAuth = async () => {
            const token = getToken();
            
            if (token) {
                try {
                    const response = await authAPI.getUser();
                    if (response.data.status === 'success') {
                        dispatch({
                            type: 'SET_USER',
                            payload: response.data.data.user,
                        });
                    } else {
                        removeToken();
                        dispatch({ type: 'LOGOUT' });
                    }
                } catch (error) {
                    console.error('Auth check failed:', error);
                    removeToken();
                    dispatch({ type: 'LOGOUT' });
                }
            } else {
                dispatch({ type: 'AUTH_INIT_COMPLETE' });
            }
        };

        checkAuth();
    }, []);

    useEffect(() => {
        setUnauthorizedHandler(() => {
            dispatch({ type: 'LOGOUT' });
        });
    }, []);

    const login = async (credentials) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const response = await authAPI.login(credentials);

            if (response.data.status === 'success') {
                const { user, token } = response.data.data;
                setToken(token);
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: { user, token },
                });
                return { success: true, user };
            }
        } catch (error) {
            dispatch({ type: 'SET_LOADING', payload: false });
            if (error.response?.data?.error) {
                return {
                    success: false,
                    error: error.response.data.error
                };
            }
            return {
                success: false,
                error: 'Terjadi kesalahan saat login'
            };
        }
    };

    const register = async (userData) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const response = await authAPI.register(userData);

            if (response.data.status === 'success') {
                const { user, token } = response.data.data;
                setToken(token);
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: { user, token },
                });
                return { success: true, user };
            }
        } catch (error) {
            dispatch({ type: 'SET_LOADING', payload: false });
            if (error.response?.data?.error) {
                return {
                    success: false,
                    error: error.response.data.error
                };
            }
            return {
                success: false,
                error: 'Terjadi kesalahan saat registrasi'
            };
        }
    };

    const logout = async () => {
        try {
            await authAPI.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            removeToken();
            dispatch({ type: 'LOGOUT' });
        }
    };

    const googleLogin = () => {
        window.location.href = authAPI.googleRedirectUrl();
    };

    const handleGoogleCallback = async (searchParams, directData = null) => {
        try {
            let responseData;
            
            if (directData) {
                responseData = directData;
            } else {
                const response = await authAPI.googleCallback(searchParams);

                if (response.data.status === 'success') {
                    responseData = response.data.data;
                } else {
                    throw new Error('Google login failed - invalid response status');
                }
            }
            
            const { user, token } = responseData;
            
            setToken(token);
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: { user, token },
            });
            
            return { success: true, user };
            
        } catch (error) {
            console.error('Google login error:', error);
            return {
                success: false,
                error: error.message || 'Terjadi kesalahan saat login dengan Google'
            };
        }
    };

    const resendVerification = async () => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const response = await authAPI.resendVerification();
            
            if (response.data.status === 'success') {
                return {
                    success: true,
                    message: response.data.message || 'Email verifikasi berhasil dikirim!'
                };
            }
        } catch (error) {
            if (error.response?.status === 400) {
                return {
                    success: false,
                    error: error.response.data.error || 'Email sudah terverifikasi'
                };
            }
            if (error.response?.data?.error) {
                return {
                    success: false,
                    error: error.response.data.error
                };
            }
            return {
                success: false,
                error: 'Terjadi kesalahan saat mengirim email verifikasi'
            };
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const forgotPassword = async (email) => {
        try {
            const response = await authAPI.forgotPassword(email);
            
            if (response.data.status === 'success') {
                return {
                    success: true,
                    message: response.data.message || 'Link reset password telah dikirim ke email Anda'
                };
            }
        } catch (error) {
            if (error.response?.data?.error) {
                return {
                    success: false,
                    error: error.response.data.error
                };
            }
            return {
                success: false,
                error: 'Terjadi kesalahan saat mengirim link reset password'
            };
        }
    };

    const resetPassword = async (data) => {
        try {
            const response = await authAPI.resetPassword(data);
            
            if (response.data.status === 'success') {
                return {
                    success: true,
                    message: response.data.message || 'Password berhasil direset. Silakan login kembali.'
                };
            }
        } catch (error) {
            if (error.response?.status === 400) {
                return {
                    success: false,
                    error: error.response.data.error || 'Token tidak valid atau sudah kedaluwarsa'
                };
            }
            if (error.response?.data?.error) {
                return {
                    success: false,
                    error: error.response.data.error
                };
            }
            return {
                success: false,
                error: 'Terjadi kesalahan saat reset password'
            };
        }
    };

    const value = {
        ...state,
        login,
        register,
        logout,
        googleLogin,
        handleGoogleCallback,
        resendVerification,
        forgotPassword,
        resetPassword,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};