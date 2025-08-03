import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-hot-toast";

import { useAuth } from '../../context/Auth';
import { useRateLimit } from '../../hooks/useRateLimit';
import LoadingSpinner from '../moleculs/LoadingSpinner';


const RegisterForm = ({ onSuccess }) => {
    const { register, isLoading } = useAuth();
    const rateLimit = useRateLimit('register', 5, 60 * 1000);
    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
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

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.fullname) newErrors.fullname = 'Nama lengkap wajib diisi';
        if (!formData.username) newErrors.username = 'Nama panggilan wajib diisi';
        if (!formData.email) newErrors.email = 'Email wajib diisi';
        if (!formData.password) newErrors.password = 'Password wajib diisi';
        if (!formData.password_confirmation) {
            newErrors.password_confirmation = 'Konfirmasi password wajib diisi';
        } else if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = 'Konfirmasi password tidak cocok';
        }

        if (formData.username && formData.username.length < 3) {
            newErrors.username = 'Nama panggilan minimal 3 karakter';
        }

        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Format email tidak valid';
        } else if (formData.email && formData.email.length < 8) {
            newErrors.email = 'Email minimal 8 karakter';
        }

        if (formData.password && formData.password.length < 8) {
            newErrors.password = 'Password minimal 8 karakter';
        } else if (formData.password && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password)) {
            newErrors.password = 'Password harus mengandung huruf besar, huruf kecil, angka, dan simbol';
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

        const result = await register(formData);

        if (result.success) {
            rateLimit.reset();
            onSuccess?.(result.user);
        } else {
            rateLimit.addAttempt();

            if (result.message) {
                if (result.message === "The email has already been taken.") {
                    toast.error("Email sudah terdaftar");
                } else if (result.message === "The username has already been taken.") {
                    toast.error("Nama panggilan sudah terdaftar");
                } else {
                    toast.error(result.message);
                }
            } else {
                toast.error('Terjadi kesalahan saat registrasi. Silakan coba lagi.');
            }
        };
    };

    return (
        <div className="max-w-[380px] w-full mx-auto rounded-2xl bg-white py-8 px-12 shadow-xl shadow-gray-100 space-y-6">
            <div className="text-center space-y-1">
                <h1 className="text-3xl font-bold text-gray-900">Daftar</h1>
                <p className="text-gray-500 ">Daftarkan akun Anda untuk bisa mengexplore lebih banyak</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {rateLimit.isBlocked && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                        Mohon coba beberapa menit lagi
                    </div>
                )}

                <div className="space-y-2">
                    <div className="space-y-2">
                        <label htmlFor="fullname" className="block text-sm font-medium text-gray-900 mb-2">
                            Nama Lengkap
                        </label>
                        <div>
                            <input
                                type="text"
                                id="fullname"
                                name="fullname"
                                value={formData.fullname}
                                onChange={handleChange}
                                className={`input-field ${errors.fullname ? 'border-red-500 focus:border-red-500' : ''}`}
                                placeholder="Masukkan nama lengkap disini"
                                disabled={isLoading || rateLimit.isBlocked}
                            />
                            {errors.fullname && <p className="text-error">{errors.fullname}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-900 mb-2">
                            Nama Panggilan
                        </label>
                        <div>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className={`input-field ${errors.username ? 'border-red-500 focus:border-red-500' : ''}`}
                                placeholder="Masukkan nama panggilan disini"
                                disabled={isLoading || rateLimit.isBlocked}
                            />
                            {errors.username && <p className="text-error">{errors.username}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                            Email
                        </label>
                        <div>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`input-field ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                                placeholder="Masukkan email disini"
                                disabled={isLoading || rateLimit.isBlocked}
                            />
                            {errors.email && <p className="text-error">{errors.email}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                            Password
                        </label>
                        <div>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`input-field ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
                                placeholder="Masukkan password disini"
                                disabled={isLoading || rateLimit.isBlocked}
                            />
                            {errors.password && <p className="text-error">{errors.password}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-900 mb-2">
                            Konfirmasi Password
                        </label>
                        <div>
                            <input
                                type="password"
                                id="password_confirmation"
                                name="password_confirmation"
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                className={`input-field ${errors.password_confirmation ? 'border-red-500 focus:border-red-500' : ''}`}
                                placeholder="Masukan konfirmasi password disini"
                                disabled={isLoading || rateLimit.isBlocked}
                            />
                            {errors.password_confirmation && <p className="text-error">{errors.password_confirmation}</p>}
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading || rateLimit.isBlocked}
                    className="button-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <LoadingSpinner size="small" />
                            <span className="ml-2">Mendaftar...</span>
                        </>
                    ) : (
                        'Daftar'
                    )}
                </button>
            </form>

            <div className="text-center">
                <p className="text-gray-500">
                    Sudah punya akun?{' '}
                    <Link to="/login" className="text-link">
                        Masuk sekarang
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;