import { useAuth } from '../context/Auth';

const Home = () => {
    const { user, logout, isAuthenticated } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    const handleClickBlogDetail = (blogId) => {
        if (isAuthenticated) {
            window.location.href = `/blog/${blogId}`;
        } else {
            window.location.href = '/login';
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div>
                            <em className="text-2xl font-semibold text-gray-900">GoBlog</em>
                        </div>
                        <div className="flex items-center space-x-4">
                            {
                                isAuthenticated ? (
                                    <>
                                        <p className="text-sm text-gray-700">
                                            Welcome, {user?.fullname}
                                        </p>
                                        <button
                                            onClick={handleLogout}
                                            className="button-danger px-2 cursor-pointer"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <a
                                            href='/login'
                                            className="button-primary px-6 cursor-pointer"
                                        >
                                            Login
                                        </a>
                                        <a
                                            href='/register'
                                            className="button-secondary px-6 cursor-pointer"
                                        >
                                            Register
                                        </a>
                                    </>
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

                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">📝</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Blog List Coming Soon
                        </h3>
                        <p className="text-gray-600">
                            Fitur daftar blog akan ditambahkan selanjutnya.
                        </p>

                        <a className="mt-6" onClick={() => handleClickBlogDetail(1)}>
                            <div className="bg-gray-100 p-4 rounded-lg shadow">
                                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                                    Card Title
                                </h4>
                                <p className="text-gray-600">
                                    This is a placeholder for a card that can be used to display blog posts or other content.
                                </p>
                            </div>
                        </a>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;