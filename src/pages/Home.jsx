import { useAuth } from '../context/Auth';

const Home = () => {
    const { user, logout, isAuthenticated } = useAuth();

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
                            <em className="text-2xl font-semibold text-gray-900">GoBlog</em>
                        </div>
                        <div className="flex items-center gap-2 space-x-4">
                            {
                                isAuthenticated ? (
                                    <>
                                        <p className="text-sm text-gray-700">
                                            Welcome, {user?.fullname}
                                        </p>
                                        <button
                                            onClick={handleLogout}
                                            className="button-danger cursor-pointer"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <a
                                        href='/login'
                                        className="button-primary"
                                    >
                                        Login
                                    </a>
                                )
                            }
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Daftar Blog
                    </h2>

                    {/* User Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <h3 className="font-medium text-blue-800">User Information:</h3>
                        <div className="mt-2 text-sm text-blue-700">
                            <p><strong>ID:</strong> {user?.user_id}</p>
                            <p><strong>Name:</strong> {user?.fullname}</p>
                            <p><strong>Username:</strong> {user?.username}</p>
                            <p><strong>Email:</strong> {user?.email}</p>
                            <p><strong>Role:</strong> {user?.role}</p>
                        </div>
                    </div>

                    {/* Blog List Placeholder */}
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">📝</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Blog List Coming Soon
                        </h3>
                        <p className="text-gray-600">
                            Fitur daftar blog akan ditambahkan selanjutnya.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;