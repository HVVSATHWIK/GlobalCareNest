import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, UserPlus, FolderHeart } from 'lucide-react';
import { User } from 'firebase/auth';

interface AuthButtonsProps {
  user: User | null;
  onAuth: (type: 'signin' | 'signup') => void;
  onSignOut: () => Promise<void>;
}

export const AuthButtons: React.FC<AuthButtonsProps> = ({ user, onAuth, onSignOut }) => {
  if (user) {
    return (
      <>
        <Link to="/portfolio" className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-[#B9E5E8] hover:text-[#219B9D]">
          <FolderHeart className="h-4 w-4" />
          <span>Profile</span>
        </Link>
        <button
          onClick={onSignOut}
          className="px-4 py-2 rounded-md border border-white hover:bg-white hover:text-[#219B9D] transition-colors"
        >
          Sign Out
        </button>
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => onAuth('signin')}
        className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-[#B9E5E8] hover:text-[#219B9D]"
      >
        <LogIn className="h-4 w-4" />
        <span>Sign In</span>
      </button>
      <button
        onClick={() => onAuth('signup')}
        className="flex items-center space-x-2 px-4 py-2 rounded-md bg-white text-[#219B9D] hover:bg-[#B9E5E8]"
      >
        <UserPlus className="h-4 w-4" />
        <span>Sign Up</span>
      </button>
    </>
  );
};