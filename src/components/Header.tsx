import React from 'react';
import { MapPin, LogOut } from 'lucide-react';

interface HeaderProps {
  onLogin?: () => void;
  user?: any;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogin, user, onLogout }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="w-full px-4 flex justify-between items-center h-16">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-text">Sthala</span>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-secondary font-medium">
                Welcome, {user.fullName || user.email}
              </span>
              <button 
                onClick={onLogout}
                className="bg-secondary hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={onLogin}
                className="text-secondary hover:text-primary transition-colors duration-200 font-medium"
              >
                Login
              </button>
              <button 
                onClick={onLogin}
                className="bg-primary hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;