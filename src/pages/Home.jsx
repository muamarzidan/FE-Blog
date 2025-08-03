import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAuth } from '../context/Auth';
import Layout from '../components/Layout';


export default function Home() {
    const { isAuthenticated } = useAuth();
    const [searchParams] = useSearchParams();
    const [blogPosts, setBlogPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    
    const allBlogPosts = [
        {
            id: 1,
            author: 'tanisha massey',
            username: '@tanisha',
            date: '27 Sep',
            title: 'The Brightest Stars in the Darkest Sky',
            subtitle: "New Zealand's Dark Sky Project at Lake Tekapo",
            category: 'Travel',
            likes: 1,
            image: '/assets/images/banner-blog.jpg'
        },
        {
            id: 2,
            author: 'tanisha massey',
            username: '@tanisha',
            date: '27 Sep',
            title: 'The Food and Environment in Costa Rica Healed My Gut and My Soul',
            subtitle: "I didn't know I was in for a week of wellness",
            category: 'Food',
            likes: 1,
            image: '/assets/images/banner-blog.jpg'
        },
        {
            id: 3,
            author: 'john doe',
            username: '@johndoe',
            date: '26 Sep',
            title: "Modern Web Development with React",
            subtitle: 'Building scalable applications with modern tools',
            category: 'Programming',
            likes: 5,
            image: '/assets/images/banner-blog.jpg'
        },
        {
            id: 4,
            author: 'sarah wilson',
            username: '@sarahw',
            date: '25 Sep',
            title: "Hollywood's Golden Age Revisited",
            subtitle: 'A nostalgic look back at classic cinema',
            category: 'Hollywood',
            likes: 3,
            image: '/assets/images/banner-blog.jpg'
        },
        {
            id: 5,
            author: 'mike chen',
            username: '@mikechen',
            date: '24 Sep',
            title: "Cooking Mediterranean Delights",
            subtitle: 'Traditional recipes with a modern twist',
            category: 'Cooking',
            likes: 2,
            image: '/assets/images/banner-blog.jpg'
        },
        {
            id: 6,
            author: 'alex garcia',
            username: '@alexg',
            date: '23 Sep',
            title: "Social Media Marketing Strategies",
            subtitle: 'How to grow your brand online effectively',
            category: 'Social Media',
            likes: 4,
            image: '/assets/images/banner-blog.jpg'
        }
    ];
    
    const query = searchParams.get('q') || '';

    const handleClickBlogDetail = (blogId) => {
        if (isAuthenticated) {
            window.location.href = `/blog/${blogId}`;
        } else {
            window.location.href = '/login';
        }
    };

    // Search Logic
    useEffect(() => {
        setIsLoading(true);
        setSearchQuery(query);
        
        setTimeout(() => {
            if (query) {
                const filtered = allBlogPosts.filter(post =>
                    post.title.toLowerCase().includes(query.toLowerCase()) ||
                    post.subtitle.toLowerCase().includes(query.toLowerCase()) ||
                    post.category.toLowerCase().includes(query.toLowerCase()) ||
                    post.author.toLowerCase().includes(query.toLowerCase())
                );
                setFilteredPosts(filtered);
            } else {
                setFilteredPosts(allBlogPosts);
            }
            setBlogPosts(allBlogPosts);
            setIsLoading(false);
        }, 300);
    }, [query]);

    return (
        <Layout searchQuery={searchQuery} filteredPosts={filteredPosts}>
            <div className="mx-auto">
                {/* Search Results Header */}
                {searchQuery && (
                    <div className="mb-6">
                        <h2 className="text-xl sm:text-3xl font-bold text-gray-900">
                            Hasil pencarian untuk "{searchQuery}"
                        </h2>
                        <p className="text-gray-600 mt-1">
                            {isLoading ? 'Mencari...' : `Ditemukan ${filteredPosts.length} artikel`}
                        </p>
                    </div>
                )}

                {/* Loading state */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                    </div>
                ) : (
                    <>
                        {/* If No Results */}
                        {searchQuery && filteredPosts.length === 0 ? (
                            <div className="flex flex-col items-center text-center py-12 h-full">
                                <img src="/assets/icons/not-found.png" className="opacity-90 w-50 h-50"/>
                                <h3 className="mt-2 text-xl font-medium text-gray-900">Tidak ada hasil ditemukan</h3>
                                <p className="mt-1 text-sm text-gray-500">Coba gunakan kata kunci yang berbeda.</p>
                            </div>
                        ) : (
                            /* Articles Grid */
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {filteredPosts.map((post) => (
                                    <article 
                                        key={post.id}
                                        className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow cursor-pointer"
                                        onClick={() => handleClickBlogDetail(post.id)}
                                    >
                                        <div className="flex flex-col space-y-4">
                                            {/* Article image */}
                                            <div className="w-full">
                                                <img 
                                                    className="w-full h-48 object-cover rounded-lg" 
                                                    src={post.image} 
                                                    alt={post.title} 
                                                />
                                            </div>

                                            <div className="flex-1">
                                                {/* Author info */}
                                                <div className="flex items-center space-x-2 mb-3">
                                                    <img 
                                                        className="w-6 h-6 rounded-full" 
                                                        src="/assets/images/banner-blog.jpg" 
                                                        alt={post.author} 
                                                    />
                                                    <span className="text-sm text-gray-600">{post.author}</span>
                                                    <span className="text-sm text-gray-400">{post.username}</span>
                                                    <span className="text-sm text-gray-400">·</span>
                                                    <span className="text-sm text-gray-400">{post.date}</span>
                                                </div>

                                                {/* Title and subtitle */}
                                                <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-gray-700 line-clamp-2">
                                                    {post.title}
                                                </h2>
                                                <p className="text-gray-600 mb-4 line-clamp-2">
                                                    {post.subtitle}
                                                </p>

                                                {/* Footer */}
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-4">
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                            {post.category}
                                                        </span>
                                                        <button className="flex items-center space-x-1 text-gray-400 hover:text-gray-600">
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                            </svg>
                                                            <span className="text-sm">{post.likes}</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </Layout>
    );
}