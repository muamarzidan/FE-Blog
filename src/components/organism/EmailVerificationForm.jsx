import { useState } from 'react';

import { useAuth } from '../../context/Auth';
import LoadingSpinner from '../moleculs/LoadingSpinner';


const EmailVerificationForm = ({ user, onClose }) => {
    const { resendVerification } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleResendVerification = async () => {
        setIsLoading(true);
        setError('');
        setMessage('');

        try {
            const result = await resendVerification();
            
            if (result.success) {
                setMessage(result.message);
            } else {
                setError(result.error);
            }
        } catch (error) {
            setError('Terjadi kesalahan saat mengirim email verifikasi');
        } finally {
            setIsLoading(false);
        }
    };

    const isEmailVerified = user?.email_verified_at !== null;

    if (isEmailVerified) {
        return (
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Email Terverifikasi</h2>
                    <p className="text-gray-600 mb-4">Email Anda sudah terverifikasi dan dapat digunakan sepenuhnya.</p>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            Tutup
                        </button>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Verifikasi Email</h2>
                <p className="text-gray-600 mb-4">
                    Email verifikasi telah dikirim ke <strong>{user?.email}</strong>. 
                    Silakan cek inbox atau folder spam Anda.
                </p>

                {message && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="space-y-3">
                    <button
                        onClick={handleResendVerification}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
                    >
                        {isLoading ? (
                            <>
                                <LoadingSpinner size="small" />
                                <span className="ml-2">Mengirim...</span>
                            </>
                        ) : (
                            'Kirim Ulang Email Verifikasi'
                        )}
                    </button>

                    {onClose && (
                        <button
                            onClick={onClose}
                            className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            Tutup
                        </button>
                    )}
                </div>

                <div className="mt-4 text-sm text-gray-500">
                    <p>Tidak menerima email? Periksa folder spam atau coba kirim ulang.</p>
                    <p className="mt-2 text-xs">Rate limit: 6 request per menit</p>
                </div>
            </div>
        </div>
    );
};

export default EmailVerificationForm;