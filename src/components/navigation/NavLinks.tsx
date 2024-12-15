import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Activity, Apple, Dumbbell, BookOpen, Heart, Siren, FolderHeart } from 'lucide-react';

export const navItems = [
  { name: 'Mental Health', path: '/mental-health', icon: Brain },
  { name: 'AI Diagnosis', path: '/ai-diagnosis', icon: Activity },
  { name: 'Diet & Nutrition', path: '/diet-nutrition', icon: Apple },
  { name: 'Fitness', path: '/fitness', icon: Dumbbell },
  { name: 'Articles', path: '/articles', icon: BookOpen },
  { name: 'Donation', path: '/donation', icon: Heart },
  { name: 'SOS Support', path: '/sos', icon: Siren },
  { name: 'Medical Portfolio', path: '/portfolio', icon: FolderHeart },
];

export const NavLinks: React.FC = () => {
  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-[#B9E5E8] hover:text-[#219B9D] transition-colors"
        >
          <item.icon className="h-4 w-4" />
          <span>{item.name}</span>
        </Link>
      ))}
    </>
  );
};