import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Heart, Brain, Apple, Dumbbell, BookOpen, Siren, FolderHeart, Activity, LogIn, UserPlus } from 'lucide-react';
import { useAuthContext } from '../contexts/AuthContext';
import { signOut } from '../services/auth';
import ThemeToggle from './ThemeToggle';
import { NavLinks } from './navigation/NavLinks';
import { MobileMenu } from './navigation/MobileMenu';
import { AuthButtons } from './navigation/AuthButtons';

interface NavbarProps {
  onAuth: (type: 'signin' | 'signup') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAuth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthContext();

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
            <NavLinks />
            <div className="flex items-center space-x-4 ml-4">
              <ThemeToggle />
              <AuthButtons user={user} onAuth={onAuth} onSignOut={signOut} />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
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
      <MobileMenu 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        user={user}
        onAuth={onAuth}
        onSignOut={signOut}
      />
    </nav>
  );
};

export default Navbar;