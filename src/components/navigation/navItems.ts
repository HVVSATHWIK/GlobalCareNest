import type { LucideIcon } from 'lucide-react';
import {
  Brain,
  Activity,
  Apple,
  Dumbbell,
  BookOpen,
  Heart,
  Siren,
  FolderHeart,
} from 'lucide-react';

export type NavItem = {
  name: string;
  path: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { name: 'Mental Health', path: '/mental-health', icon: Brain },
  { name: 'AI Diagnosis', path: '/ai-diagnosis', icon: Activity },
  { name: 'Diet & Nutrition', path: '/diet-nutrition', icon: Apple },
  { name: 'Fitness', path: '/fitness', icon: Dumbbell },
  { name: 'Articles', path: '/articles', icon: BookOpen },
  { name: 'Donation', path: '/donation', icon: Heart },
  { name: 'SOS Support', path: '/sos', icon: Siren },
  { name: 'Medical Portfolio', path: '/portfolio', icon: FolderHeart },
];
