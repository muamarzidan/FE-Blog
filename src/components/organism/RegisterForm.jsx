import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../context/Auth';
import LoadingSpinner from '../moleculs/LoadingSpinner';


const RegisterForm = ({ onSuccess }) => {
    const { register, isLoading } = useAuth();
    const [formData, setFormData] = useState({
        // photo: null,
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
        // if (!formData.photo) newErrors.photo = 'Foto wajib diisi';
        if (!formData.fullname) newErrors.fullname = 'Nama lengkap wajib diisi';
        if (!formData.username) newErrors.username = 'Username wajib diisi';
        if (!formData.email) newErrors.email = 'Email wajib diisi';
        if (!formData.password) newErrors.password = 'Password wajib diisi';
        if (!formData.password_confirmation) {
            newErrors.password_confirmation = 'Konfirmasi password wajib diisi';
        } else if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = 'Konfirmasi password tidak cocok';
        }

        // if (formData.photo && !formData.photo.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        //     newErrors.photo = 'Format file tidak didukung. Gunakan JPG, JPEG, PNG atau GIF';
        // } else if (formData.photo && formData.photo.size >  1024) {
        //     newErrors.photo = 'Ukuran file terlalu besar. Maksimal 1MB';
        // }

        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Format email tidak valid';
        } else if (formData.email && formData.email.length < 5) {
            newErrors.email = 'Email minimal 5 karakter';
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
                <h1 className="text-3xl font-bold text-gray-900">Daftar</h1>
                <p className="text-gray-600 mt-2">Buat akun baru</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {errors.general && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                        {errors.general}
                    </div>
                )}

                {/* <div className="flex flex-col items-center">
                    <input
                        type="file"
                        id="photo"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
                        className="rounded-full border border-gray-300 w-[100px] h-[100px] cursor-pointer"
                        disabled={isLoading}
                    />
                    <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">
                        Foto Profil
                    </label>
                    {errors.photo && <p className="text-error">{errors.photo}</p>}
                </div> */}

                <div>
                    <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Lengkap
                    </label>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Masukkan nama lengkap Anda"
                        disabled={isLoading}
                    />
                    {errors.fullname && <p className="text-error">{errors.fullname}</p>}
                </div>

                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Panggilan
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Masukkan username"
                        disabled={isLoading}
                    />
                    {errors.username && <p className="text-error">{errors.username}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Masukkan email"
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
                        placeholder="Masukkan password"
                        disabled={isLoading}
                    />
                    {errors.password && <p className="text-error">{errors.password}</p>}
                </div>

                <div>
                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-2">
                        Konfirmasi Password
                    </label>
                    <input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Konfirmasi password"
                        disabled={isLoading}
                    />
                    {errors.password_confirmation && <p className="text-error">{errors.password_confirmation}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="button-primary cursor-pointer"
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

            <div className="mt-6 text-center">
                <p className="text-gray-600">
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