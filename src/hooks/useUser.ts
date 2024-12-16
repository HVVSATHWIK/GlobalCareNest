import { useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { getUserProfile, UserProfile } from '../services/user';

export const useUser = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        if (auth.currentUser) {
          const userProfile = await getUserProfile(auth.currentUser.uid);
          setProfile(userProfile);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, []);

  return { profile, loading, error };
};