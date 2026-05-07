import React from 'react';
import { useAuthContext } from '../../contexts/useAuthContext';
import UserMenu from './UserMenu';

interface AuthButtonsProps {
  onSignIn: () => void;
  onSignUp: () => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ onSignIn, onSignUp }) => {
  const { user } = useAuthContext();

  if (user) {
    return <UserMenu user={user} />;
  }

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={onSignIn}
        className="text-white hover:text-[#B9E5E8] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#219B9D] dark:focus-visible:ring-offset-gray-900 rounded-md px-2 py-1"
      >
        Sign In
      </button>
      <button
        onClick={onSignUp}
        className="bg-white text-[#219B9D] px-4 py-2 rounded-full hover:bg-[#B9E5E8] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#219B9D] dark:focus-visible:ring-offset-gray-900"
      >
        Sign Up
      </button>
    </div>
  );
};

export default AuthButtons;