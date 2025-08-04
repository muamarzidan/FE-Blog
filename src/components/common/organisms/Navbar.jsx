import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../../context/Auth';


const Navbar = ({ onMenuClick }) => {
    const { isAuthenticated, user, logout } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const profileMenuRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    
    const handleSearch = () => {
        if (location.pathname === '/home') {
            if (searchQuery.trim()) {
                navigate(`/home?q=${encodeURIComponent(searchQuery.trim())}`);
            } else {
                navigate('/home');
            }
        } else {
            if (searchQuery.trim()) {
                navigate(`/home?q=${encodeURIComponent(searchQuery.trim())}`);
            } else {
                navigate('/home');
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    };

    const handleLogout = async () => {
        await logout();
        setShowProfileMenu(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-white w-full h-fit shadow-sm fixed top-0 left-0 right-0 z-50">
            <div className="container-navbar flex justify-between items-center">
                {/* Left section */}
                <div className="flex items-center space-x-4">
                    <Link to="/home" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                            </svg>
                        </div>
                    </Link>

                    {/* Search bar */}
                    <div className="hidden sm:block">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="input-field w-80 pr-10"
                            />
                            <button
                                onClick={handleSearch}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer hover:text-gray-600"
                            >
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right section */}
                <div className="flex items-center gap-3 w-fit">
                    <Link
                        to={isAuthenticated ? '/create-blog' : '/login'}
                        className={
                            `button-primary flex items-center justify-center gap-2 py-2.5 ${isAuthenticated ? 'px-6' : 'px-6'}`
                        }
                    >
                        <span>Tulis</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </Link>

                    {isAuthenticated ? (
                        <div className="relative hidden sm:flex items-center" ref={profileMenuRef}>
                            <button 
                                onClick={toggleProfileMenu}
                                className="bg-[url(/assets/images/photo-profile.jpg)] bg-cover bg-center w-9 h-9 rounded-full cursor-pointer hover:ring-2 hover:ring-gray-300 transition-all"
                            >
                            </button>
                            
                            {/* Profile Dropdown Menu */}
                            {showProfileMenu && (
                                <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-lg border border-gray-200 profile-menu">
                                    {/* User Info */}
                                    <div className="px-4 py-3 border-b border-gray-200">
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-[url(/assets/images/photo-profile.jpg)] bg-cover bg-center w-10 h-10 rounded-full"></div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{user?.name || user?.username}</p>
                                                <p className="text-xs text-gray-500">{user?.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <div>
                                        <Link
                                            to="/dashboard/user"
                                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                            onClick={() => setShowProfileMenu(false)}
                                        >
                                            <svg className="w-4 h-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Dashboard
                                        </Link>
                                        
                                        <hr className="border-gray-200" />
                                        
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                        >
                                            <svg className="w-4 h-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Keluar
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/register"
                            className="button-secondary px-6 py-2"
                        >
                            <span>Daftar</span>
                        </Link>
                    )}

                    {/* Mobile menu */}
                    <button
                        onClick={onMenuClick}
                        className="sm:hidden p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 cursor-pointer"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;