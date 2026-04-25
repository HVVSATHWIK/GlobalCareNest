import React, { useId, useState } from 'react';
import { Smile, Meh, Frown, Sun, Cloud, CloudRain, Moon } from 'lucide-react';

const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const moodQuestionId = useId();
  const timeQuestionId = useId();

  const moods = [
    { icon: Smile, label: 'Good', color: 'text-green-500' },
    { icon: Meh, label: 'Okay', color: 'text-yellow-500' },
    { icon: Frown, label: 'Not Good', color: 'text-red-500' },
  ];

  const times = [
    { icon: Sun, label: 'Morning' },
    { icon: Cloud, label: 'Afternoon' },
    { icon: CloudRain, label: 'Evening' },
    { icon: Moon, label: 'Night' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Track Your Mood</h3>
      
      <div className="mb-6">
        <p id={moodQuestionId} className="text-gray-600 mb-3">How are you feeling?</p>
        <div className="flex justify-around" role="group" aria-labelledby={moodQuestionId}>
          {moods.map(({ icon: Icon, label, color }) => (
            <button
              type="button"
              key={label}
              onClick={() => setSelectedMood(label)}
              aria-pressed={selectedMood === label}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                selectedMood === label ? 'bg-[#B9E5E8]' : 'hover:bg-gray-100'
              }`}
            >
              <Icon aria-hidden="true" className={`h-8 w-8 ${color}`} />
              <span className="text-sm mt-1">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p id={timeQuestionId} className="text-gray-600 mb-3">What time of day is it?</p>
        <div className="flex justify-around" role="group" aria-labelledby={timeQuestionId}>
          {times.map(({ icon: Icon, label }) => (
            <button
              type="button"
              key={label}
              onClick={() => setSelectedTime(label)}
              aria-pressed={selectedTime === label}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                selectedTime === label ? 'bg-[#B9E5E8]' : 'hover:bg-gray-100'
              }`}
            >
              <Icon aria-hidden="true" className="h-6 w-6" />
              <span className="text-sm mt-1">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedMood && selectedTime && (
        <button type="button" className="w-full mt-6 px-4 py-2 bg-[#219B9D] text-white rounded-full hover:bg-opacity-90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2">
          Save Entry
        </button>
      )}
    </div>
  );
};

export default MoodTracker;