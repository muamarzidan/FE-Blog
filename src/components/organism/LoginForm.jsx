import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useAuth } from '../../context/Auth';
import GoogleLoginButton from '../moleculs/GoogleLoginButton';
import LoadingSpinner from '../moleculs/LoadingSpinner';


const LoginForm = ({ onSuccess }) => {
    const { login, isLoading } = useAuth();
    const location = useLocation();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (location.state?.error) {
            setErrors({ general: location.state.error });
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email wajib diisi';
        if (!formData.password) newErrors.password = 'Password wajib diisi';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const result = await login(formData);

        if (result.success) {
            onSuccess?.(result.user);
        } else {
            if (typeof result.error === 'string') {
                setErrors({ general: result.error });
            } else {
                setErrors(result.error);
            }
        }
    };

    return (
        <div className="max-w-md mx-auto rounded-2xl bg-white py-6 px-12 shadow-xl shadow-gray-100">
            <div className="text-center mb-6 space-y-1">
                <h1 className="text-3xl font-bold text-gray-900">Masuk</h1>
                <p className="text-gray-500">Masuk ke akun Anda terlebih dahulu</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
                {errors.general && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                        {errors.general}
                    </div>
                )}

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Masukkan email Anda"
                            disabled={isLoading}
                        />
                        {errors.email && <p className="text-error">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                            Password
                        </label>
                        <div>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="Masukkan password Anda"
                                disabled={isLoading}
                            />
                            {errors.password && <p className="text-error">{errors.password}</p>}
                            <div className="text-link text-right">
                                <Link
                                    to="/forgot-password"
                                    className="text-sm text-primary-600 hover:text-primary-700"
                                >
                                    Lupa password?
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="button-primary cursor-pointer"
                    >
                        {isLoading ? (
                            <>
                                <LoadingSpinner size="small" />
                                <span className="ml-2">Masuk...</span>
                            </>
                        ) : (
                            'Masuk'
                        )}
                    </button>

                    <div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-gray-50 text-gray-500">Atau</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <GoogleLoginButton
                            onSuccess={onSuccess}
                            disabled={isLoading}
                        />
                    </div>
                </div>
            </form>

            <div className="mt-6 text-center">
                <p className="text-gray-500">
                    Belum punya akun?{' '}
                    <Link to="/register" className="text-link">
                        Daftar sekarang
                    </Link>
                </p>
            </div>
            <p>lssyhc@example.com / password</p>
        </div>
    );
};

export default LoginForm;