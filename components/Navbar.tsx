
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPath } from '../types';
import Logo from './Logo';

interface NavbarProps {
  userRole: UserPath | null;
  setUserRole: (role: UserPath | null) => void;
}

const Navbar: React.FC<NavbarProps> = ({ userRole, setUserRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserRole(null);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Logo className="w-8 h-8" />
            <span className="text-xl font-bold text-gray-900 tracking-tight">SHAKTI BRIDGE</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-orange-600 transition-colors font-medium">How it Works</Link>
            
            {userRole === UserPath.SELLER && (
              <Link to="/seller/dashboard" className="text-orange-600 font-bold bg-orange-50 px-4 py-2 rounded-full">My Studio</Link>
            )}
            
            {userRole === UserPath.BUYER && (
              <Link to="/buyer/marketplace" className="text-orange-600 font-bold bg-orange-50 px-4 py-2 rounded-full">Marketplace</Link>
            )}

            {userRole ? (
              <button 
                onClick={handleLogout}
                className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/10"
              >
                Switch Role
              </button>
            ) : (
              <Link 
                to="/admin" 
                className="text-xs text-gray-400 hover:text-gray-600 font-bold uppercase tracking-widest"
              >
                Operations Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
