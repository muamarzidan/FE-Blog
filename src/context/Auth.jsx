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
                            payload: response.data.data,
                        });
                    } else {
                        removeToken();
                        dispatch({ type: 'LOGOUT' });
                    }
                } catch (error) {
                    removeToken();
                    dispatch({ type: 'LOGOUT' });
                }
            } else {
                dispatch({ type: 'SET_LOADING', payload: false });
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

    const value = {
        ...state,
        login,
        register,
        logout,
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