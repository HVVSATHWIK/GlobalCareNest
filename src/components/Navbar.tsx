import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Heart, Brain, Apple, Dumbbell, BookOpen, Siren, FolderHeart, Activity, LogIn, UserPlus } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface NavbarProps {
  onAuth: (type: 'signin' | 'signup') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAuth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const navItems = [
    { name: 'Mental Health', path: '/mental-health', icon: Brain },
    { name: 'AI Diagnosis', path: '/ai-diagnosis', icon: Activity },
    { name: 'Diet & Nutrition', path: '/diet-nutrition', icon: Apple },
    { name: 'Fitness', path: '/fitness', icon: Dumbbell },
    { name: 'Articles', path: '/articles', icon: BookOpen },
    { name: 'Donation', path: '/donation', icon: Heart },
    { name: 'SOS Support', path: '/sos', icon: Siren },
    { name: 'Medical Portfolio', path: '/portfolio', icon: FolderHeart },
  ];

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav className="bg-[#219B9D] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8" />
              <span className="font-bold text-xl">Global CareNest</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-[#B9E5E8] hover:text-[#219B9D] transition-colors"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}

            <div className="border-l border-[#B9E5E8] pl-4 ml-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium bg-[#B9E5E8] text-[#219B9D] hover:bg-opacity-90 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onAuth('signin')}
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-[#B9E5E8] hover:text-[#219B9D] transition-colors"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Sign In</span>
                  </button>
                  <button
                    onClick={() => onAuth('signup')}
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium bg-[#B9E5E8] text-[#219B9D] hover:bg-opacity-90 transition-colors"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Sign Up</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-[#B9E5E8] hover:text-[#219B9D] transition-colors"
              aria-expanded="false"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium hover:bg-[#B9E5E8] hover:text-[#219B9D] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}

            {user ? (
              <div className="border-t border-[#B9E5E8] pt-2 mt-2">
                <div className="px-3 py-2">
                  <span className="block text-sm mb-2">{user.name}</span>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium bg-[#B9E5E8] text-[#219B9D] hover:bg-opacity-90 transition-colors w-full"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="border-t border-[#B9E5E8] pt-2 mt-2">
                <button
                  onClick={() => {
                    onAuth('signin');
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium hover:bg-[#B9E5E8] hover:text-[#219B9D] transition-colors w-full"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={() => {
                    onAuth('signup');
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium bg-[#B9E5E8] text-[#219B9D] hover:bg-opacity-90 transition-colors w-full mt-2"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;