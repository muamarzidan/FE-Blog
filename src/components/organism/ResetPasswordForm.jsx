import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

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
            navigate('/login', { replace: true });
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
            newErrors.password = 'Password baru minimal 8 karakter';
        }

        if (!formData.password_confirmation) {
            newErrors.password_confirmation = 'Konfirmasi password wajib diisi';
        } else if (formData.password_confirmation.length < 8) {
            newErrors.password_confirmation = 'Konfirmasi password minimal 8 karakter';
        } else if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = 'Konfirmasi password tidak sama dengan password baru';
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
                setIsSuccess(false);
                toast.error("Gagal mereset password. Mohon periksa kembali password Anda.");
            }
        } catch (error) {
            setErrors({ general: 'Terjadi kesalahan saat reset password' });
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="max-w-[400px] w-full mx-auto rounded-2xl bg-white py-8 px-12 shadow-xl shadow-gray-200 space-y-8">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Berhasil Direset</h1>
                    <p className="text-gray-500 mt-2">
                        Password Anda telah berhasil direset. Silakan login dengan password baru Anda.
                    </p>
                    
                        <Link
                            to="/login"
                            className="button-primary cursor-pointer block mt-6"
                        >
                            Login Sekarang
                        </Link>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-[420px] mx-auto rounded-2xl bg-white py-8 px-12 shadow-xl shadow-gray-200 space-y-8">
            <div className="text-center space-y-1">
                <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
                <p className="text-gray-500 text-sm">
                    Masukkan password baru untuk akun <strong>{formData.email}</strong> Anda
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                            Password Baru
                        </label>
                        <div>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`input-field ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
                                placeholder="Masukkan password baru disini"
                                disabled={isLoading}
                            />
                            {errors.password && <p className="text-error mt-1">{errors.password}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-900">
                            Konfirmasi Password Baru
                        </label>
                        <div>
                            <input
                                type="password"
                                id="password_confirmation"
                                name="password_confirmation"
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                className={`input-field ${errors.password_confirmation ? 'border-red-500 focus:border-red-500' : ''}`}
                                placeholder="Konfirmasi password baru disini"
                                disabled={isLoading}
                            />
                            {errors.password_confirmation && <p className="text-error mt-1">{errors.password_confirmation}</p>}
                        </div>
                    </div>
                </div>

                <div className="space-y-1">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`button-primary ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <LoadingSpinner size="small" />
                                <span>Mereset Password...</span>
                            </div>
                        ) : (
                            'Reset Password'
                        )}
                    </button>

                    <div className="text-center">
                        <p className="text-gray-500 text-sm">
                            Ingat password Anda?{' '}
                            <Link to="/login" className="text-link">
                                Kembali ke Login
                            </Link>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ResetPasswordForm;