// filepath: d:\Coding\MyProject\frontend-blog-web\src\pages\blog\Search.jsx
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/Auth';

const Search = () => {
    const [searchParams] = useSearchParams();
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated } = useAuth();
    
    const query = searchParams.get('q') || '';

    const handleClickBlogDetail = (blogId) => {
        if (isAuthenticated) {
            window.location.href = `/blog/${blogId}`;
        } else {
            window.location.href = '/login';
        }
    };

    // Mock search results - replace with actual API call
    const mockSearchResults = [
        {
            id: 1,
            author: 'tanisha massey',
            username: '@tanisha',
            date: '27 Sep',
            title: 'The Brightest Stars in the Darkest Sky',
            subtitle: "New Zealand's Dark Sky Project at Lake Tekapo",
            category: 'Travel',
            likes: 1,
            image: 'https://via.placeholder.com/200x120'
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
            image: 'https://via.placeholder.com/200x120'
        }
    ];

    useEffect(() => {
        const performSearch = async () => {
            if (query) {
                setLoading(true);
                try {
                    // Replace this with actual API call
                    // const response = await searchBlogs(query);
                    // setSearchResults(response.data);
                    
                    // Mock implementation
                    setTimeout(() => {
                        const filteredResults = mockSearchResults.filter(post =>
                            post.title.toLowerCase().includes(query.toLowerCase()) ||
                            post.subtitle.toLowerCase().includes(query.toLowerCase()) ||
                            post.category.toLowerCase().includes(query.toLowerCase())
                        );
                        setSearchResults(filteredResults);
                        setLoading(false);
                    }, 500);
                } catch (error) {
                    console.error('Search error:', error);
                    setLoading(false);
                }
            } else {
                setSearchResults([]);
            }
        };

        performSearch();
    }, [query]);

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                {/* Search Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">
                        {query ? `Hasil pencarian untuk "${query}"` : 'Pencarian Blog'}
                    </h1>
                    {query && (
                        <p className="text-gray-600 mt-2">
                            {loading ? 'Mencari...' : `Ditemukan ${searchResults.length} hasil`}
                        </p>
                    )}
                </div>

                {/* Search Results */}
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {query && searchResults.length === 0 ? (
                            <div className="text-center py-12">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-1.005-6-2.709M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada hasil ditemukan</h3>
                                <p className="mt-1 text-sm text-gray-500">Coba gunakan kata kunci yang berbeda.</p>
                            </div>
                        ) : (
                            searchResults.map((post) => (
                                <article 
                                    key={post.id}
                                    className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow cursor-pointer"
                                    onClick={() => handleClickBlogDetail(post.id)}
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-1">
                                            {/* Author info */}
                                            <div className="flex items-center space-x-2 mb-3">
                                                <img 
                                                    className="w-6 h-6 rounded-full" 
                                                    src="https://via.placeholder.com/24" 
                                                    alt={post.author} 
                                                />
                                                <span className="text-sm text-gray-600">{post.author}</span>
                                                <span className="text-sm text-gray-400">{post.username}</span>
                                                <span className="text-sm text-gray-400">·</span>
                                                <span className="text-sm text-gray-400">{post.date}</span>
                                            </div>

                                            {/* Title and subtitle */}
                                            <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-gray-700">
                                                {post.title}
                                            </h2>
                                            <p className="text-gray-600 mb-4">
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

                                        {/* Article image */}
                                        <div className="flex-shrink-0">
                                            <img 
                                                className="w-32 h-20 object-cover rounded-lg" 
                                                src={post.image} 
                                                alt={post.title} 
                                            />
                                        </div>
                                    </div>
                                </article>
                            ))
                        )}

                        {!query && (
                            <div className="text-center py-12">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">Mulai pencarian</h3>
                                <p className="mt-1 text-sm text-gray-500">Masukkan kata kunci untuk mencari blog.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Search;