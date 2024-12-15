import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'firebase/auth';
import { navItems } from './NavLinks';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onAuth: (type: 'signin' | 'signup') => void;
  onSignOut: () => Promise<void>;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  user,
  onAuth,
  onSignOut
}) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium hover:bg-[#B9E5E8] hover:text-[#219B9D] transition-colors"
            onClick={onClose}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        ))}
        {user ? (
          <button
            onClick={() => {
              onSignOut();
              onClose();
            }}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-[#B9E5E8] hover:text-[#219B9D]"
          >
            Sign Out
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                onAuth('signin');
                onClose();
              }}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-[#B9E5E8] hover:text-[#219B9D]"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                onAuth('signup');
                onClose();
              }}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-[#B9E5E8] hover:text-[#219B9D]"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
};