import { useContext } from 'react';
import { CareContext } from './CareContext';

export const useCareContext = () => {
  const context = useContext(CareContext);
  if (context === undefined) {
    throw new Error('useCareContext must be used within a CareProvider');
  }
  return context;
};
