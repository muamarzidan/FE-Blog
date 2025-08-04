import { useState } from 'react';

import DashboardUserNavbar from "./DashboardNavbar";
import UserDashboardSidebar from './UserDashboardSidebar';


const UserDashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <DashboardUserNavbar onMenuClick={handleToggleSidebar} />

      {/* Main Layout */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <UserDashboardSidebar 
          isOpen={isSidebarOpen} 
          onClose={handleCloseSidebar} 
        />

        {/* Main Content */}
        <div className="flex-1 p-8 md:ml-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
