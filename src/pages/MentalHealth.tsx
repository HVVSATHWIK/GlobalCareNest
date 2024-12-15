<<<<<<< HEAD
import React from 'react';
import { Brain, Heart, Sparkles } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import ContentCard from '../components/common/ContentCard';
import MoodTracker from '../components/MoodTracker';

const MentalHealth = () => {
=======
import React, { useState } from 'react';
import { Brain, Heart, Sparkles } from 'lucide-react';
import ResourceCard from '../components/ResourceCard';
import ExerciseCard from '../components/ExerciseCard';
import MoodTracker from '../components/MoodTracker';

const MentalHealth: React.FC = () => {
  const [showExerciseModal, setShowExerciseModal] = useState(false);

>>>>>>> 6571257e407549ebbfc7d359a6c37fe2b741ae70
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

<<<<<<< HEAD
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

=======
  const exercises = [
    {
      title: "5-Minute Breathing Exercise",
      duration: "5 minutes",
      description: "A quick breathing exercise to help you center yourself and reduce anxiety.",
      onStart: () => setShowExerciseModal(true)
    },
    {
      title: "Progressive Muscle Relaxation",
      duration: "10 minutes",
      description: "Systematically relax your muscles to release physical tension and mental stress.",
      onStart: () => setShowExerciseModal(true)
    },
    {
      title: "Guided Visualization",
      duration: "15 minutes",
      description: "A peaceful journey through calming imagery to promote relaxation.",
      onStart: () => setShowExerciseModal(true)
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#219B9D] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <Brain className="h-16 w-16 mb-6" />
            <h1 className="text-4xl font-bold mb-4">Mental Health Support</h1>
            <p className="text-xl max-w-2xl">
              Your mental well-being matters. Explore our resources, exercises, and tools designed to support your journey.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <Heart className="h-8 w-8 text-[#219B9D] mr-4" />
              <div>
                <h3 className="font-semibold mb-1">24/7 Support</h3>
                <p className="text-sm text-gray-600">Access help anytime, anywhere</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <Brain className="h-8 w-8 text-[#219B9D] mr-4" />
              <div>
                <h3 className="font-semibold mb-1">Expert Resources</h3>
                <p className="text-sm text-gray-600">Professional guidance and tools</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <Sparkles className="h-8 w-8 text-[#219B9D] mr-4" />
              <div>
                <h3 className="font-semibold mb-1">Daily Exercises</h3>
                <p className="text-sm text-gray-600">Simple activities for well-being</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resources Section */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-6">Resources & Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((resource, index) => (
                  <ResourceCard key={index} {...resource} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Wellness Exercises</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {exercises.map((exercise, index) => (
                  <ExerciseCard key={index} {...exercise} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
>>>>>>> 6571257e407549ebbfc7d359a6c37fe2b741ae70
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