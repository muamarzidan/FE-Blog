import { useState } from 'react';

import Navbar from './organisms/Navbar';
import Sidebar from './organisms/Sidebar';


const Layout = ({ children, searchQuery, filteredPosts }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex py-4 px-6">
                <main className="flex-1 pt-18 lg:mr-[320px]">
                    <div>
                        {children}
                    </div>
                </main>
                
                <Sidebar 
                    isOpen={sidebarOpen} 
                    onClose={() => setSidebarOpen(false)}
                    searchQuery={searchQuery}
                    filteredPosts={filteredPosts}
                />
            </div>
        </div>
    );
};

export default Layout;