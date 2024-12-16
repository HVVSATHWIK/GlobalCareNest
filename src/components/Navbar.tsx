import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Heart, Brain, Apple, Dumbbell, BookOpen, Siren, FolderHeart, Activity } from 'lucide-react';
import AuthButtons from './Auth/AuthButtons';
import { useThemeStore } from '../store/themeStore';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  onAuth: (type: 'signin' | 'signup') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAuth }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

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

  return (
    <nav className={`bg-[#219B9D] text-white shadow-lg ${isDarkMode ? 'dark' : ''}`}>
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
            <div className="flex items-center space-x-4 ml-4">
              <ThemeToggle />
              <AuthButtons
                onSignIn={() => onAuth('signin')}
                onSignUp={() => onAuth('signup')}
              />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <AuthButtons
              onSignIn={() => onAuth('signin')}
              onSignUp={() => onAuth('signup')}
            />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-[#B9E5E8] hover:text-[#219B9D] transition-colors"
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;