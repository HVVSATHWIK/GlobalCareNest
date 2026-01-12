import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Heart, Brain, Apple, Dumbbell, BookOpen, Siren, FolderHeart, Activity, Video } from 'lucide-react';
import AuthButtons from './Auth/AuthButtons';
import { useThemeStore } from '../store/themeStore';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  onAuth: (type: 'signin' | 'signup') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAuth }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [logoAvailable, setLogoAvailable] = React.useState(true);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const logoSrc = `${import.meta.env.BASE_URL}logo.svg`;

  const navShellClassName = isDarkMode
    ? 'bg-gray-900/90 text-white border-b border-gray-800'
    : 'bg-[#219B9D] text-white';

  const navItems = [
    { name: 'Mental Health', path: '/mental-health', icon: Brain },
    { name: 'AI Diagnosis', path: '/ai-diagnosis', icon: Activity },
    { name: 'Diet & Nutrition', path: '/diet-nutrition', icon: Apple },
    { name: 'Fitness', path: '/fitness', icon: Dumbbell },
    { name: 'Articles', path: '/articles', icon: BookOpen },
    { name: 'Donation', path: '/donation', icon: Heart },
    { name: 'SOS Support', path: '/sos', icon: Siren },
    { name: 'Consultation', path: '/consultation', icon: Video },
    { name: 'Medical Portfolio', path: '/portfolio', icon: FolderHeart },
  ];

  return (
    <nav className={`${navShellClassName} shadow-lg ${isDarkMode ? 'dark' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              {logoAvailable ? (
                <img
                  src={logoSrc}
                  alt="Global CareNest Logo"
                  className="h-10 w-10 shrink-0 drop-shadow-md hover:scale-105 transition-transform duration-300"
                  onError={() => setLogoAvailable(false)}
                />
              ) : null}
              <span className="font-bold text-xl sm:text-2xl tracking-tight text-white drop-shadow-sm leading-tight">
                Global CareNest
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    isDarkMode
                      ? 'hover:bg-white/10'
                      : 'hover:bg-[#B9E5E8] hover:text-[#219B9D]',
                    isActive
                      ? isDarkMode
                        ? 'bg-white/10'
                        : 'bg-white/20'
                      : '',
                  ].join(' ')
                }
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </NavLink>
            ))}
            <div className="flex items-center gap-4 ml-3 pl-3 border-l border-white/20">
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
          <div className="px-3 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium transition-colors',
                    isDarkMode
                      ? 'hover:bg-white/10'
                      : 'hover:bg-[#B9E5E8] hover:text-[#219B9D]',
                    isActive
                      ? isDarkMode
                        ? 'bg-white/10'
                        : 'bg-white/20'
                      : '',
                  ].join(' ')
                }
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;