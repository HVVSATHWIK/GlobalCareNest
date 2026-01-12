import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { signOut } from '../../services/auth';
import type { User as FirebaseUser } from 'firebase/auth';

interface UserMenuProps {
  user: FirebaseUser;
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [avatarError, setAvatarError] = React.useState(false);

  const provider = user.providerData.find((p) => p != null);
  const photoURL = !avatarError ? (user.photoURL ?? provider?.photoURL ?? null) : null;
  const displayName = user.displayName ?? provider?.displayName ?? null;
  const email = user.email ?? provider?.email ?? null;

  const label = displayName || email || 'Account';
  const initials = (displayName || email || 'U')
    .split(/\s|@/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join('') || 'U';

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center space-x-2 text-white hover:text-[#B9E5E8] transition-colors">
        {photoURL ? (
          <img
            src={photoURL}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
            referrerPolicy="no-referrer"
            onError={() => setAvatarError(true)}
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
            {initials}
          </div>
        )}
        <span className="max-w-[160px] truncate">{label}</span>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/portfolio"
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } flex items-center px-4 py-2 text-sm text-gray-700`}
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleSignOut}
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;