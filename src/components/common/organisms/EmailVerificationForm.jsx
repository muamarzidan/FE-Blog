import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useAuth } from '../../../context/Auth';
import LoadingSpinner from '../moleculs/LoadingSpinner';


const EmailVerificationForm = ({ user, onClose }) => {
    const { resendVerification } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const handleResendVerification = async () => {
        setIsLoading(true);

        try {
            const result = await resendVerification();
            if (result.success) {
                toast.success("Email verifikasi berhasil dikirim.");
            } else {
                toast.error('Gagal mengirim email verifikasi, silakan coba lagi.');
            }
        } catch (error) {
            toast.error('Terjadi kesalahan saat mengirim email verifikasi, Mohon coba lagi nanti.');
        } finally {
            setIsLoading(false);
        }
    };

    const isEmailVerified = user?.is_verified !== null && user?.is_verified === true;
    if (isEmailVerified) {
        return (
            <div className="max-w-[380px] w-full mx-auto rounded-2xl bg-white py-8 px-12 shadow-xl shadow-gray-200 space-y-8">
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

                        <Link to="/home" className="block button-primary">
                            Kembali ke Beranda
                        </Link>
                </div>
            </div>
        );
    };


    return (
        <div className="max-w-[380px] w-full mx-auto rounded-2xl bg-white py-8 px-12 shadow-xl shadow-gray-200 space-y-8">
            <div className="text-center">
                {/* <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                </div> */}
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Berhasil dikirim</h2>
                <p className="text-gray-500 mb-4">
                    Email verifikasi telah dikirim, {/* ke <strong>{user?.email}</strong>.  */} silakan cek inbox atau folder spam di email Anda.
                </p>
            </div>

            <div className="space-y-3">
                <div className="space-y-2">
                    <button
                        onClick={handleResendVerification}
                        disabled={isLoading}
                        className="button-primary cursor-pointer"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <LoadingSpinner size="small" />
                                <span className="ml-2">Mengirim...</span>
                            </div>
                        ) : (
                            'Kirim Ulang Email Verifikasi'
                        )}
                    </button>
                    <Link to="/home" className="text-link block text-center">
                        Kembali ke Beranda
                    </Link>
                </div>

                {onClose && (
                    <button
                        onClick={onClose}
                        className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        Tutup
                    </button>
                )}
            </div>
        </div>
    );
};

export default EmailVerificationForm;