import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/Auth';
import LoadingSpinner from '../moleculs/LoadingSpinner';


const ResetPasswordForm = () => {
    const { resetPassword } = useAuth();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        token: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const token = searchParams.get('token');
        const email = searchParams.get('email');
        
        if (!token || !email) {
            setErrors({ general: 'Token atau email tidak valid. Silakan request reset password lagi.' });
            return;
        }

        setFormData(prev => ({
            ...prev,
            token,
            email
        }));
    }, [searchParams, navigate]);

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

    const validateForm = () => {
        const newErrors = {};

        if (!formData.password) {
            newErrors.password = 'Password baru wajib diisi';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password minimal 8 karakter';
        }

        if (!formData.password_confirmation) {
            newErrors.password_confirmation = 'Konfirmasi password wajib diisi';
        } else if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = 'Konfirmasi password tidak sama';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true);

        try {
            const result = await resetPassword(formData);
            
            if (result.success) {
                setIsSuccess(true);
            } else {
                setErrors({ general: result.error });
            }
        } catch (error) {
            setErrors({ general: 'Terjadi kesalahan saat reset password' });
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">Password Berhasil Direset</h1>
                        <p className="text-gray-600 mt-2">
                            Password Anda telah berhasil direset. Silakan login dengan password baru Anda.
                        </p>
                        
                        <div className="mt-6">
                            <Link
                                to="/login"
                                className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Login Sekarang
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
                    <p className="text-gray-600 mt-2">
                        Masukkan password baru untuk akun <strong>{formData.email}</strong>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {errors.general && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                            {errors.general}
                        </div>
                    )}

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password Baru
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Masukkan password baru"
                            disabled={isLoading}
                        />
                        {errors.password && <p className="text-error mt-1">{errors.password}</p>}
                    </div>

                    <div>
                        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-2">
                            Konfirmasi Password Baru
                        </label>
                        <input
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Konfirmasi password baru"
                            disabled={isLoading}
                        />
                        {errors.password_confirmation && <p className="text-error mt-1">{errors.password_confirmation}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="button-primary cursor-pointer"
                    >
                        {isLoading ? (
                            <>
                                <LoadingSpinner size="small" />
                                <span className="ml-2">Mereset Password...</span>
                            </>
                        ) : (
                            'Reset Password'
                        )}
                    </button>
                </form>

                <div className="text-center">
                    <p className="text-gray-600">
                        Ingat password Anda?{' '}
                        <Link to="/login" className="text-link">
                            Kembali ke Login
                        </Link>
                    </p>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h3 className="font-medium text-yellow-800 mb-2">⚠️ Penting:</h3>
                    <div className="text-sm text-yellow-700 space-y-1">
                        <p>• Link reset password hanya berlaku selama 60 menit</p>
                        <p>• Password minimal 8 karakter</p>
                        <p>• Pastikan password dan konfirmasi password sama</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordForm;