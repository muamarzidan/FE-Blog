import { useState } from 'react';
import toast from 'react-hot-toast';

import { useAuth } from '../../../context/Auth';
import UserDashboardLayout from '../../../components/user/organism/UserDashboardLayout';


const EditProfile = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        fullname: user?.fullname || '',
        username: user?.username || '',
        email: user?.email || '',
        bio: user?.bio || '',
        linkedin: user?.linkedin || '',
        instagram: user?.instagram || '',
        facebook: user?.facebook || '',
        youtube: user?.youtube || '',
        twitter: user?.twitter || '',
        dribble: user?.dribble || '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <UserDashboardLayout>
            <>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Profile Picture Section */}
                    <div className="bg-white flex gap-4 rounded-xl shadow p-6">
                            <div className="bg-[url(/assets/images/photo-profile.jpg)] bg-cover bg-center w-24 h-24 rounded-full"></div>
                            <div className="flex flex-col justify-between py-1.5">
                                <button
                                    title="Ganti foto profil"
                                    type="button"
                                    className="button-primary rounded-lg px-4 py-2 font-bold bg-blue-100 text-blue-900 hover:bg-blue-200 transition-colors cursor-pointer"
                                >
                                    Ganti
                                </button>
                                <button
                                    title="Hapus foto profil"
                                    type="button"
                                    className="button-danger rounded-lg px-4 py-2 cursor-pointer"
                                >
                                    Hapus
                                </button>
                            </div>
                    </div>

                    {/* Basic Information */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <span className="text-red-500 mr-1">👤</span>
                                    Nama Panggilan
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="input-field"
                                    placeholder='Masukan nama panggilan disini'
                                />
                            </div>
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <span className="text-red-500 mr-1">✉️</span>
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    name="fullname"
                                    value={formData.fullname}
                                    onChange={handleInputChange}
                                    className="input-field"
                                    placeholder='Masukan nama lengkap disini'
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <span className="text-red-500 mr-1">@</span>
                                    Email
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="input-field"
                                    placeholder='Masukan email disini'
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Bio
                                </label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="input-field w-full px-3 py-2 rounded-xl"
                                    placeholder="Masukan bio disini..."
                                />
                                <p className="text-sm text-gray-500 mt-1">200 karakter tersisa</p>
                            </div>
                        </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Sosial Media</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <span className="text-red-500 mr-1">💻</span>
                                    Linkedin
                                </label>
                                <input
                                    type="url"
                                    name="linkedin"
                                    value={formData.linkedin}
                                    onChange={handleInputChange}
                                    placeholder="https://"
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <span className="text-red-500 mr-1">📺</span>
                                    YouTube
                                </label>
                                <input
                                    type="url"
                                    name="youtube"
                                    value={formData.youtube}
                                    onChange={handleInputChange}
                                    placeholder="https://"
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <span className="text-red-500 mr-1">📷</span>
                                    Instagram
                                </label>
                                <input
                                    type="url"
                                    name="instagram"
                                    value={formData.instagram}
                                    onChange={handleInputChange}
                                    placeholder="https://"
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <span className="text-red-500 mr-1">👍</span>
                                    Facebook
                                </label>
                                <input
                                    type="url"
                                    name="facebook"
                                    value={formData.facebook}
                                    onChange={handleInputChange}
                                    placeholder="https://"
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <span className="text-red-500 mr-1">🐦</span>
                                    Twitter
                                </label>
                                <input
                                    type="url"
                                    name="twitter"
                                    value={formData.twitter}
                                    onChange={handleInputChange}
                                    placeholder="https://"
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <span className="text-red-500 mr-1">🐦</span>
                                    Dribble
                                </label>
                                <input
                                    type="url"
                                    name="dribble"
                                    value={formData.dribble}
                                    onChange={handleInputChange}
                                    placeholder="https://"
                                    className="input-field"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-8 py-3 button-primary cursor-pointer"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </>
        </UserDashboardLayout>
    );
};

export default EditProfile;