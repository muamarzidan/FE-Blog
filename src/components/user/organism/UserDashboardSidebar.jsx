import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon,
  BookOpenIcon, 
  BellIcon, 
  PencilIcon, 
  UserIcon, 
  LockClosedIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const UserDashboardSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon, href: '/dashboard/user' },
    { id: 'blogs', label: 'Blogs', icon: BookOpenIcon, href: '/dashboard/user/blogs' },
    { id: 'notifications', label: 'Notifications', icon: BellIcon, href: '/dashboard/user/notifications' },
    { id: 'write', label: 'Write', icon: PencilIcon, href: '/dashboard/user/write' },
  ];

  const settingsItems = [
    { id: 'edit-profile', label: 'Edit Profile', icon: UserIcon, href: '/dashboard/user/edit-profile' },
    { id: 'change-password', label: 'Change Password', icon: LockClosedIcon, href: '/dashboard/user/change-password' },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-white shadow-sm transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:transform-none
      `}>
        <div className="p-6">
          {/* Mobile close button */}
          <div className="flex justify-end mb-4 md:hidden">
            <button
              onClick={onClose}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Dashboard Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dashboard</h3>
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    to={item.href}
                    onClick={() => window.innerWidth < 768 && onClose()}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Settings Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
            <nav className="space-y-2">
              {settingsItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    to={item.href}
                    onClick={() => window.innerWidth < 768 && onClose()}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboardSidebar;
