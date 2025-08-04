import { useState } from 'react';
import { useAuth } from '../../context/Auth';
import UserDashboardLayout from '../../../components/user/organism/UserDashboardLayout';
import { 
  CameraIcon,
  LinkIcon
} from '@heroicons/react/24/outline';

const EditProfile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullname: user?.fullname || 'kunaai',
    email: user?.email || 'kunaai@gmail.com',
    username: user?.username || 'kunaai',
    bio: '',
    socialLinks: {
      youtube: '',
      instagram: '',
      facebook: '',
      twitter: '',
      github: '',
      website: ''
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <UserDashboardLayout activeMenu="edit-profile">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit Profile</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Photo Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  className="h-32 w-32 rounded-full object-cover"
                  src="/src/assets/images/photo-profile.jpg"
                  alt="Profile"
                />
                <button
                  type="button"
                  className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-gray-300 hover:bg-gray-50"
                >
                  <CameraIcon className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Upload
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  JPG, GIF or PNG. 1MB max.
                </p>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="text-gray-600">👤</span> Full Name
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="text-gray-600">✉️</span> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Username */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="text-gray-600">@</span> Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Username will use to search user and will be visible to all users
                </p>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={4}
              placeholder="Tell us about yourself..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
            <p className="text-sm text-gray-500 mt-1">
              200 characters left
            </p>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Add Your Social Handles below
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* YouTube */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs">▶</span>
                </div>
                <input
                  type="url"
                  placeholder="https://"
                  value={formData.socialLinks.youtube}
                  onChange={(e) => handleSocialLinkChange('youtube', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Instagram */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-pink-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs">📷</span>
                </div>
                <input
                  type="url"
                  placeholder="https://"
                  value={formData.socialLinks.instagram}
                  onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Facebook */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs">f</span>
                </div>
                <input
                  type="url"
                  placeholder="https://"
                  value={formData.socialLinks.facebook}
                  onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Twitter */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-400 rounded flex items-center justify-center">
                  <span className="text-white text-xs">🐦</span>
                </div>
                <input
                  type="url"
                  placeholder="https://"
                  value={formData.socialLinks.twitter}
                  onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* GitHub */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
                  <span className="text-white text-xs">💻</span>
                </div>
                <input
                  type="url"
                  placeholder="https://"
                  value={formData.socialLinks.github}
                  onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Website */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                  <LinkIcon className="h-4 w-4 text-white" />
                </div>
                <input
                  type="url"
                  placeholder="https://"
                  value={formData.socialLinks.website}
                  onChange={(e) => handleSocialLinkChange('website', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-md font-medium"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </UserDashboardLayout>
  );
};

export default EditProfile;
