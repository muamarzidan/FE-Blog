import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../context/Auth';
import LoadingSpinner from '../moleculs/LoadingSpinner';


const ForgotPasswordForm = () => {
    const { forgotPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!email) {
            setError('Email wajib diisi');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Format email tidak valid');
            return;
        }

        setIsLoading(true);

        try {
            const result = await forgotPassword(email);
            
            if (result.success) {
                setMessage(result.message);
                setIsSubmitted(true);
            } else {
                setError(result.error);
            }
        } catch (error) {
            setError('Terjadi kesalahan saat mengirim email reset password');
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">Email Terkirim</h1>
                        <p className="text-gray-600 mt-2">
                            Jika email <strong>{email}</strong> terdaftar, Anda akan menerima link reset password.
                        </p>
                        {message && (
                            <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                                {message}
                            </div>
                        )}
                    </div>

                    <div className="text-center space-y-3">
                        <button
                            onClick={() => {
                                setIsSubmitted(false);
                                setEmail('');
                                setMessage('');
                                setError('');
                            }}
                            className="text-blue-600 hover:text-blue-500"
                        >
                            Kirim ke email lain
                        </button>
                        <p className="text-gray-600">
                            Kembali ke{' '}
                            <Link to="/login" className="text-link">
                                Login
                            </Link>
                        </p>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="font-medium text-blue-800 mb-2">ℹ️ Informasi:</h3>
                        <div className="text-sm text-blue-700 space-y-1">
                            <p>• Link reset password berlaku selama 60 menit</p>
                            <p>• Periksa folder spam jika tidak menerima email</p>
                            <p>• Untuk keamanan, respons sama meskipun email tidak terdaftar</p>
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
                    <h1 className="text-3xl font-bold text-gray-900">Lupa Password</h1>
                    <p className="text-gray-600 mt-2">
                        Masukkan email Anda dan kami akan mengirimkan link untuk reset password
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field"
                            placeholder="Masukkan email Anda"
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="button-primary cursor-pointer"
                    >
                        {isLoading ? (
                            <>
                                <LoadingSpinner size="small" />
                                <span className="ml-2">Mengirim...</span>
                            </>
                        ) : (
                            'Kirim Link Reset Password'
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

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-medium text-blue-800 mb-2">Informasi:</h3>
                    <div className="text-sm text-blue-700 space-y-1">
                        <p>• Link reset password berlaku selama 60 menit</p>
                        <p>• Periksa folder spam jika tidak menerima email</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordForm;