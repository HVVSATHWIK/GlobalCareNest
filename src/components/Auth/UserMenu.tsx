import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { User, LogOut, Settings, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { signOut } from '../../services/auth';

interface UserMenuProps {
  user: any;
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
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
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <UserCircle className="w-8 h-8" />
        )}
        <span>{user.displayName || user.email}</span>
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
                  to="/profile"
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
                <Link
                  to="/settings"
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } flex items-center px-4 py-2 text-sm text-gray-700`}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
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