import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";

import { useAuth } from '../../context/Auth';
import { useRateLimit } from '../../hooks/useRateLimit';
import LoadingSpinner from '../moleculs/LoadingSpinner';


const ForgotPasswordForm = () => {
    const { forgotPassword } = useAuth();
    const rateLimit = useRateLimit('forgotPassword', 5, 1 * 60 * 1000);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);


    
    const handleChange = (e) => {
        setEmail(e.target.value);
        setEmailError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError('');

        if (!email) {
            setEmailError('Email wajib diisi');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Format email tidak valid');
            return;
        }

        setIsLoading(true);

        try {
            const result = await forgotPassword(email);
            
            if (result.success) {
                setIsSubmitted(true);
                rateLimit.reset();
                toast.success("Link reset password telah dikirim ke email Anda.");
            }
        } catch (error) {
            toast.error("Gagal mengirim link reset password. Silakan coba lagi.");
        } finally {
            setIsLoading(false);
            rateLimit.addAttempt();
        }
    };


    if (isSubmitted) {
        return (
            <div className="max-w-[430px] w-full mx-auto rounded-2xl bg-white py-8 px-12 shadow-xl shadow-gray-200 space-y-8">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Berhasil Terkirim</h1>
                    <p className="text-gray-500 mt-2">
                        Jika email <strong>{email}</strong> terdaftar, Anda akan menerima link reset password.
                    </p>
                </div>

                <div className="text-center space-y-1">
                    <button
                        onClick={() => {
                            setIsSubmitted(false);
                            setEmail('');
                        }}
                        className="button-primary cursor-pointer"
                    >
                        Kirim ke email lain
                    </button>
                    <div className="text-center mt-1">
                        <p className="text-gray-500 text-sm">
                            Masih ingat password Anda?{' '}
                            <Link to="/login" className="text-link">
                                Kembali ke Login
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-sm text-blue-700 space-y-1">
                        <p>• Link reset password berlaku selama 60 menit</p>
                        <p>• Periksa folder spam jika tidak menerima email</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-[380px] w-full mx-auto rounded-2xl bg-white py-8 px-12 shadow-xl shadow-gray-200 space-y-6">
            <div className="text-center space-y-1">
                <h1 className="text-3xl font-bold text-gray-900">Lupa Password</h1>
                <p className="text-gray-500">
                    Masukkan email Anda untuk dapat mereset password
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {rateLimit.isBlocked && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                        Mohon coba beberapa menit lagi
                    </div>
                )}
                
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
                            onChange={handleChange}
                            className={`input-field ${emailError ? 'border-red-500' : ''}`}
                            placeholder="Masukkan email Anda disini"
                            disabled={isLoading}
                        />
                        {emailError && (
                            <div className="text-red-600 text-sm">
                                {emailError}
                            </div>
                        )}
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
                                <span>Mengirim...</span>
                            </div>
                        ) : (
                            'Kirim Link Reset Password'
                        )}
                    </button>

                    <div className="text-center">
                        <p className="text-gray-500 text-sm">
                            Masih ingat password Anda?{' '}
                            <Link to="/login" className="text-link">
                                Masuk sekarang
                            </Link>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ForgotPasswordForm;