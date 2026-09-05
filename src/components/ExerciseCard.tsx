import React from 'react';
import { Play } from 'lucide-react';

interface ExerciseCardProps {
  title: string;
  duration: string;
  description: string;
  onStart: () => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ title, duration, description, onStart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-sm text-[#219B9D] mb-3">{duration}</p>
      <p className="text-gray-600 mb-4">{description}</p>
      <button
        onClick={onStart}
        aria-label={`Start ${title} exercise`}
        className="inline-flex items-center px-4 py-2 bg-[#219B9D] text-white rounded-full hover:bg-opacity-90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#219B9D]"
      >
        <Play aria-hidden="true" className="h-4 w-4 mr-2" />
        Start Exercise
      </button>
    </div>
  );
};

export default ExerciseCard;