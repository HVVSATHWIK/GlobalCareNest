import React from 'react';
import { Brain, Heart, Sparkles } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import ContentCard from '../components/common/ContentCard';
import MoodTracker from '../components/MoodTracker';

const MentalHealth = () => {
  const resources = [
    {
      title: "Mindfulness Meditation",
      description: "Learn the basics of mindfulness meditation and how it can help reduce stress and anxiety.",
      imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      link: "#meditation"
    },
    {
      title: "Stress Management",
      description: "Discover effective techniques for managing stress in your daily life.",
      imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      link: "#stress"
    },
    {
      title: "Sleep Hygiene",
      description: "Tips and practices for better sleep quality and mental well-being.",
      imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      link: "#sleep"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        icon={Brain}
        title="Mental Health Support"
        description="Your mental well-being matters. Explore our resources, exercises, and tools designed to support your journey."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Resources & Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <ContentCard key={index} {...resource} />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <MoodTracker />
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Need Immediate Help?</h3>
              <p className="text-gray-600 mb-4">
                If you're experiencing a mental health crisis, help is available 24/7.
              </p>
              <button className="w-full px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
                Get Emergency Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalHealth;