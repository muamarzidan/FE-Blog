import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";

import { useAuth } from '../../context/Auth';
import { useRateLimit } from '../../hooks/useRateLimit';
import GoogleLoginButton from '../moleculs/GoogleLoginButton';
import LoadingSpinner from '../moleculs/LoadingSpinner';


const LoginForm = ({ onSuccess }) => {
    const { login, isLoading } = useAuth();
    const rateLimit = useRateLimit('login', 5, 1 * 60 * 1000);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');


    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setEmailError('');
        setPasswordError('');

        let hasErrors = false;
        if (!email) {
            setEmailError('Email wajib diisi');
            hasErrors = true;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Format email tidak valid');
            hasErrors = true;
        }

        if (!password) {
            setPasswordError('Password wajib diisi');
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        try {
            const result = await login({ email, password });
            if (result?.success) {
                rateLimit.reset();
                onSuccess?.(result.user);
            } else {
                rateLimit.addAttempt();
                toast.error("Login gagal. Mohon periksa kembali email atau password Anda.");
            }
        } catch (error) {
            rateLimit.addAttempt();
            toast.error('Terjadi kesalahan saat login. Silakan coba lagi.');
        }
    };


    return (
        <div className="max-w-[380px] w-full mx-auto rounded-2xl bg-white py-8 px-12 shadow-xl shadow-gray-200">
            <div className="text-center mb-6 space-y-1">
                <h1 className="text-3xl font-bold text-gray-900">Masuk</h1>
                <p className="text-gray-500">Masuk ke akun Anda terlebih dahulu</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
                {rateLimit.isBlocked && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                        Mohon coba beberapa menit lagi
                    </div>
                )}

                <div className="space-y-3">
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                            Email
                        </label>
                        <div>
                            <input
                                // type="email"
                                type="text"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                className={`input-field ${emailError ? 'border-red-500 focus:border-red-500' : ''}`}
                                placeholder="Masukkan email Anda"
                                disabled={isLoading}
                            />
                            {emailError && <p className="text-error">{emailError}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                            Password
                        </label>
                        <div>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className={`input-field ${passwordError ? 'border-red-500 focus:border-red-500' : ''}`}
                                placeholder="Masukkan password Anda"
                                disabled={isLoading}
                            />
                            {passwordError && <p className="text-error">{passwordError}</p>}
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

                <div className="space-y-3">
                    <button
                        type="submit"
                        disabled={isLoading || rateLimit.isBlocked}
                        className="button-primary cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed"
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
                            disabled={isLoading || rateLimit.isBlocked}
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
        </div>
    );
};

export default LoginForm;