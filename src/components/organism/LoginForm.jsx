import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../context/Auth';
import LoadingSpinner from '../moleculs/LoadingSpinner';


const LoginForm = ({ onSuccess }) => {
    const { login, isLoading } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

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
        <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Masuk</h1>
                <p className="text-gray-600 mt-2">Masuk ke akun Anda</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {errors.general && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                        {errors.general}
                    </div>
                )}

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                    </label>
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
                </div>

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
            </form>

            <div className="mt-6 text-center">
                <p className="text-gray-600">
                    Belum punya akun?{' '}
                    <Link to="/register" className="text-link">
                        Daftar sekarang
                    </Link>
                </p>
            </div>

            <div className="mt-4 text-center">
                <Link
                    to="/forgot-password"
                    className="text-sm text-primary-600 hover:text-primary-700"
                >
                    Lupa password?
                </Link>
            </div>

            {/* Demo credentials */}
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-medium text-yellow-800 mb-2">Demo Credentials:</h3>
                <div className="text-sm text-yellow-700 space-y-1">
                    <p><strong>Admin:</strong> muziro@example.com / password</p>
                    <p><strong>Admin:</strong> lssyhc@example.com / password</p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;