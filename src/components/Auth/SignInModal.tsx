import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose, onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement Firebase authentication here
    setUser({ id: '1', email, name: 'Test User' });
    onClose();
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-xl font-semibold">Sign In</Dialog.Title>
              <button onClick={onClose}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#219B9D] text-white py-2 rounded-md hover:bg-opacity-90"
              >
                Sign In
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToSignUp}
                className="text-[#219B9D] hover:underline"
              >
                Sign Up
              </button>
            </p>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SignInModal;