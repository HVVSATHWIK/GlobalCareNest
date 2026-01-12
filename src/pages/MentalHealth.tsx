import React, { useState } from 'react';
import { Brain, Heart, Sparkles } from 'lucide-react';
import ResourceCard from '../components/ResourceCard';
import ExerciseCard from '../components/ExerciseCard';
import MoodTracker from '../components/MoodTracker';

const MentalHealth: React.FC = () => {
  const [showExerciseModal, setShowExerciseModal] = useState(false);

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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#6a11cb] to-[#2575fc] text-white py-16">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.05]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-white/30 blur-md animate-pulse"></div>
              <Brain className="h-16 w-16 mb-6 relative z-10" />
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 drop-shadow-sm">
              Mental Health & Wellness
            </h1>
            <p className="text-xl max-w-2xl font-medium text-blue-50">
              Find your balance. Expert resources, guided mindfulness, and a supportive community.
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
      {/* Exercise Modal */}
      {showExerciseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-6 transform transition-all scale-100 animate-scale-up">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-teal-100 mb-4">
                <Sparkles className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Exercise Started</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Take a deep breath. Your wellness journey begins now. Follow the on-screen instructions (coming soon!).
              </p>
              <button
                type="button"
                className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#219B9D] border border-transparent rounded-md hover:bg-[#1a7f82] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500 transition-colors"
                onClick={() => setShowExerciseModal(false)}
              >
                End Exercise
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentalHealth;