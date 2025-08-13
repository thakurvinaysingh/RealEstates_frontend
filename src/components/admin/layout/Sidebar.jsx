import { Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  LayoutDashboard, 
  Plus, 
  List, 
  Users, 
  UserPlus, 
  User, 
  Settings, 
  LogOut,
  X
} from 'lucide-react';
import { Button } from '../ui/button';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Properties', href: '/admin/properties', icon: List },
    { name: 'Add Property', href: '/admin/properties/create', icon: Plus },
  ];

  const userManagement = [
    { name: 'All Users', href: '/admin/users-list', icon: Users },
    // { name: 'Add User', href: '/admin/users/create', icon: UserPlus },
  ];

  const userActions = [
    { name: 'Profile', href: '/admin/profile', icon: User },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
    { name: 'Logout', href: '/admin/logout', icon: LogOut },
  ];

  const isActive = (path) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:w-64 lg:border-r lg:border-gray-200
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <Link to="/admin" className="flex items-center space-x-2" onClick={onClose}>
            <div className="rounded-lg p-2 bg-[#5927e3]">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-blue-900">
              Admin
            </span>
          </Link>
          <Button
            onClick={onClose}
            className="lg:hidden bg-[#5927e3] text-white hover:opacity-90 p-2 rounded-md"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="flex-1 px-4 py-6 space-y-8">
            {/* Main Navigation */}
            <div>
              <h3 className="px-3 text-xs font-semibold text-blue-900 uppercase tracking-wider mb-3">
                Main Navigation
              </h3>
              <nav className="space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={onClose}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        active
                          ? 'bg-[#5927e3] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* User Management */}
            <div>
              <h3 className="px-3 text-xs font-semibold text-blue-900 uppercase tracking-wider mb-3">
                User Management
              </h3>
              <nav className="space-y-1">
                {userManagement.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={onClose}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        active
                          ? 'bg-[#5927e3] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* User Actions */}
          <div className="border-t border-gray-200 p-4">
            <h3 className="px-3 text-xs font-semibold text-blue-900 uppercase tracking-wider mb-3">
              Account
            </h3>
            <nav className="space-y-1">
              {userActions.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={onClose}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      active
                        ? 'bg-[#5927e3] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
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

export default Sidebar;
