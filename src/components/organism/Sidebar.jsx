import { useState, useEffect } from 'react';
import { FcLike } from "react-icons/fc";
import { AiOutlineComment } from "react-icons/ai";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { MdOutlineArticle } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";


const Sidebar = ({ isOpen, onClose, searchQuery, filteredPosts }) => {
    const [filteredCategorys, setFilteredCategorys] = useState([]);
    const [filteredTrending, setFilteredTrending] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);


    const allCategorys = [
        'Programming', 'Travel', 'Cooking', 'Social Media', 'Film Making',
        'Technology', 'Finances', 'Hollywood', 'Food', 'Lifestyle'
    ];
    const allTrendingBlogs = [
        { id: 1, title: 'The Brightest Stars in the Darkest Sky', likes: 25, comments: 5 },
        { id: 2, title: 'The Food and Environment in Costa Rica Healed My Gut and My Soul', likes: 18, comments: 3 },
        { id: 3, title: 'Modern Web Development with React', likes: 22, comments: 19}
    ];
    const allTopUsers = [
        { id: 1, fullname: 'tanisha massey', username: '@tanisha', totalPosts: 15, totalLikes: "28k",  avatar: '/assets/images/photo-profile.jpg' },
        { id: 2, fullname: 'john doe', username: '@johndoe', totalPosts: 12, totalLikes: "12k", avatar: '/assets/images/photo-profile.jpg' },
        { id: 3, fullname: 'sarah wilson', username: '@sarahw', totalPosts: 10, totalLikes: "923", avatar: '/assets/images/photo-profile.jpg' },
        { id: 4, fullname: 'mike chen', username: '@mikechen', totalPosts: 8, totalLikes: "23", avatar: '/assets/images/photo-profile.jpg' }
    ];

    // Search logic
    useEffect(() => {
        if (searchQuery) {
            // Filter blogs
            const filteredTitileCategorys = allCategorys.filter(interest =>
                interest.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredCategorys(filteredTitileCategorys);

            // Filter trending blogs
            const filteredTrendingTopics = allTrendingBlogs.filter(topic =>
                topic.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            console.log('Filtered Trending Topics:', filteredTrendingTopics);
            setFilteredTrending(filteredTrendingTopics);

            // Filter top users
            const filteredTopUsers = allTopUsers.filter(user =>
                user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.username.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredUsers(filteredTopUsers);
        } else {
            setFilteredCategorys(allCategorys);
            setFilteredTrending(allTrendingBlogs.slice(0, 3));
            setFilteredUsers(allTopUsers.slice(0, 3));
        }
    }, [searchQuery]);

    return (
        <>
            {/* Mobile backdrop */}
            {isOpen && (
                <div 
                    className="fixed inset-0 opacity-60 bg-black z-30 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed right-0 top-22 h-full w-80 rounded-l-2xl bg-white border-t-1 shadow-lg transform transition-transform duration-300 ease-in-out z-40 lg:translate-x-0 ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                <div className="px-5 py-3 space-y-8 h-full overflow-y-auto">
                    {/* Search Results Summary */}
                    {searchQuery && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                            <h3 className="text-sm font-medium text-blue-900">
                                Hasil Pencarian untuk "{searchQuery}"
                            </h3>
                        </div>
                    )}

                    {/* Categories */}
                    <div>
                        <h3 className="text-base font-medium text-black mb-4">
                            {searchQuery ? `Kategori (${filteredCategorys.length})` : 'Kategori'}
                        </h3>
                        {filteredCategorys.length > 0 ? (
                            <div className="space-y-2">
                                <div className="flex flex-wrap gap-2">
                                    {filteredCategorys.map((interest) => (
                                        <button
                                            key={interest}
                                            className="block w-fit text-center px-3 py-2 text-sm text-black bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer"
                                        >
                                            {interest}
                                        </button>
                                    ))}
                                </div>
                                <span className="text-gray-700 text-xs mt-2 cursor-pointer hover:underline">Tampilkan lebih banyak</span>
                            </div>
                        ) : searchQuery ? (
                            <p className="text-sm text-gray-500">Tidak ada kategori ditemukan</p>
                        ) : null}
                    </div>
                    
                    {/* Trending Topics */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <h3 className="text-base font-medium text-black">
                                {searchQuery ? `Trending (${filteredTrending.length})` : 'Trending'}
                            </h3>
                            <HiMiniArrowTrendingUp className="w-4 h-4 text-gray-700" />
                        </div>
                        {filteredTrending.length > 0 ? (
                            <div className="space-y-2">
                                <div className="space-y-2">
                                    {filteredTrending.map((topic) => (
                                        <div key={topic.id} className="px-3 py-2 space-y-1 hover:bg-gray-100 rounded-lg cursor-pointer">
                                            <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                                                {topic.title}
                                            </h4>
                                            <div className="flex gap-3">
                                                <div className="flex gap-1">
                                                    <FcLike className="w-4 h-4" />
                                                    <span className="text-xs text-gray-800">{topic.likes}</span>
                                                </div>
                                                <div className="flex gap-1">
                                                    <AiOutlineComment className="w-4 h-4 text-gray-700" />
                                                    <span className="text-xs text-gray-800">{topic.comments}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <span className="text-gray-700 text-xs mt-2 cursor-pointer hover:underline">Tampilkan lebih banyak</span>
                            </div>
                        ) : searchQuery ? (
                            <p className="text-sm text-gray-500">Tidak ada trending topic ditemukan</p>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <img 
                                        className="w-8 h-8 rounded-full" 
                                        src="/assets/images/photo-profile.jpg" 
                                        alt="Author" 
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-gray-500">tanisha massey @tanisha</p>
                                        <h4 className="text-sm font-medium text-gray-900 mt-1">
                                            The Brightest Stars in the Darkest Sky
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Top Users */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <h3 className="text-base font-medium text-black">
                                {searchQuery ? `Pengguna Teratas (${filteredUsers.length})` : 'Pengguna Teratas'}
                            </h3>
                            <FaUsers className="w-4 h-4 items-center text-gray-700" />
                        </div>
                        {filteredUsers.length > 0 ? (
                            <div className="space-y-2">
                                {filteredUsers.map((user) => (
                                    <div key={user.id} className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                                        <img 
                                            className="w-8 h-8 rounded-full" 
                                            src={user.avatar} 
                                            alt={user.fullname} 
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900">{user.fullname}</p>
                                            <p className="text-xs text-gray-500">{user.username}</p>
                                        </div>
                                        <div className="flex flex-col justify-between">
                                            <div className="flex gap-2 items-center">
                                                <MdOutlineArticle className="w-4 h-4 text-gray-700" />
                                                <span className="text-xs text-gray-800">{user.totalPosts}</span>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <FcLike className="w-4 h-4" />
                                                <span className="text-xs text-gray-800">{user.totalLikes}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <span className="text-gray-700 text-xs mt-2 cursor-pointer hover:underline">Tampilkan lebih banyak</span>
                            </div>
                        ) : searchQuery ? (
                            <p className="text-sm text-gray-500">Tidak ada user ditemukan</p>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <img 
                                        className="w-8 h-8 rounded-full" 
                                        src="/assets/images/photo-profile.jpg" 
                                        alt="Author" 
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-gray-500">tanisha massey @tanisha</p>
                                        <h4 className="text-sm font-medium text-gray-900 mt-1">
                                            The Brightest Stars in the Darkest Sky
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;