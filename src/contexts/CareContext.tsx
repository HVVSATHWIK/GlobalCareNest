import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import { useAuthContext } from './useAuthContext';
import { getUserProfile } from '../services/user';
import type { UserProfile } from '../services/user';
import { getUserMedicalRecords } from '../services/medical';
import type { MedicalRecord } from '../services/medical';
import { getUserConsent } from '../services/consent';
import type { UserConsent } from '../services/consent';

export type CareContextValue = {
  authUser: FirebaseUser | null;
  profile: UserProfile | null;
  medicalRecords: MedicalRecord[];
  consent: UserConsent | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

export const CareContext = createContext<CareContextValue | undefined>(undefined);

export const CareProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, loading: authLoading } = useAuthContext();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [consent, setConsent] = useState<UserConsent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (authUser: FirebaseUser | null) => {
    setError(null);
    if (!authUser) {
      setProfile(null);
      setMedicalRecords([]);
      setConsent(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [profileResult, recordsResult, consentResult] = await Promise.all([
        getUserProfile(authUser.uid),
        getUserMedicalRecords(authUser.uid),
        getUserConsent(authUser.uid),
      ]);
      setProfile(profileResult);
      setMedicalRecords(recordsResult);
      setConsent(consentResult);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load user context.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;
    void load(user);
  }, [authLoading, user, load]);

  const refresh = useCallback(async () => {
    await load(user);
  }, [load, user]);

  const value = useMemo<CareContextValue>(
    () => ({
      authUser: user,
      profile,
      medicalRecords,
      consent,
      loading: authLoading || loading,
      error,
      refresh,
    }),
    [user, profile, medicalRecords, consent, authLoading, loading, error, refresh]
  );

  return <CareContext.Provider value={value}>{children}</CareContext.Provider>;
};
