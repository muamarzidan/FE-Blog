import { useAuth } from '../../../context/Auth';

const AdminDashboard = () => {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-700">
                                Welcome, {user?.fullname}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="button-danger text-sm"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Admin Info Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Admin Information</h3>
                            <div className="space-y-2 text-sm">
                                <p><strong>ID:</strong> {user?.user_id}</p>
                                <p><strong>Name:</strong> {user?.fullname}</p>
                                <p><strong>Username:</strong> {user?.username}</p>
                                <p><strong>Email:</strong> {user?.email}</p>
                                <p><strong>Role:</strong> <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">{user?.role}</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Total Users */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <div className="text-blue-600 text-2xl">👥</div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Total Users</p>
                                        <p className="text-2xl font-bold text-gray-900">-</p>
                                    </div>
                                </div>
                            </div>

                            {/* Total Blogs */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <div className="text-green-600 text-2xl">📝</div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Total Blogs</p>
                                        <p className="text-2xl font-bold text-gray-900">-</p>
                                    </div>
                                </div>
                            </div>

                            {/* Total Comments */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="p-2 bg-yellow-100 rounded-lg">
                                        <div className="text-yellow-600 text-2xl">💬</div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Total Comments</p>
                                        <p className="text-2xl font-bold text-gray-900">-</p>
                                    </div>
                                </div>
                            </div>

                            {/* Total Likes */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="p-2 bg-red-100 rounded-lg">
                                        <div className="text-red-600 text-2xl">❤️</div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Total Likes</p>
                                        <p className="text-2xl font-bold text-gray-900">-</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Management Sections */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* User Management */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">User Management</h3>
                        <p className="text-gray-600 text-sm mb-4">Kelola pengguna terdaftar</p>
                        <button className="btn-primary w-full">
                            Kelola Users
                        </button>
                    </div>

                    {/* Blog Management */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Blog Management</h3>
                        <p className="text-gray-600 text-sm mb-4">Kelola semua blog</p>
                        <button className="btn-primary w-full">
                            Kelola Blogs
                        </button>
                    </div>

                    {/* Category Management */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Category Management</h3>
                        <p className="text-gray-600 text-sm mb-4">Kelola kategori blog</p>
                        <button className="btn-primary w-full">
                            Kelola Categories
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;