import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import LoadingSpinner from '../moleculs/LoadingSpinner';


const ForgotPasswordForm = () => {
    const location = useLocation();
    const [formData, setFormData] = useState({
        email: '',
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

        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Format email tidak valid';
        }

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
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Lupa Password</h1>
                <p className="text-gray-500 mt-2">Masukkan email Anda untuk mengatur ulang password</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
                {errors.general && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                        {errors.general}
                    </div>
                )}

                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                        Email
                    </label>
                    <div className="space-y-1">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Masukkan email Anda"
                        // disabled={isLoading}
                        />
                        {errors.email && <p className="text-error">{errors.email}</p>}
                    </div>
                </div>

                <button
                    type="submit"
                    // disabled={isLoading}
                    className="button-primary cursor-pointer"
                >
                    {/* {isLoading ? (
                        <>
                            <LoadingSpinner size="small" />
                            <span className="ml-2">Kirim...</span>
                        </>
                    ) : (
                        'Kirim'
                    )} */}
                    Kirim
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
            <p>lssyhc@example.com / password</p>
        </div>
    );
}

export default ForgotPasswordForm;