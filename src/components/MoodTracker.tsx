import React, { useState } from 'react';
import { Smile, Meh, Frown, Sun, Cloud, CloudRain, Moon, Loader2, Check } from 'lucide-react';

const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);

      // Reset form after a delay to show success state
      setTimeout(() => {
        setIsSaved(false);
        setSelectedMood(null);
        setSelectedTime(null);
      }, 2000);
    }, 1000);
  };

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
        <p id="mood-question" className="text-gray-600 mb-3">How are you feeling?</p>
        <div className="flex justify-around" role="group" aria-labelledby="mood-question">
          {moods.map(({ icon: Icon, label, color }) => (
            <button
              key={label}
              type="button"
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
        <p id="time-question" className="text-gray-600 mb-3">What time of day is it?</p>
        <div className="flex justify-around" role="group" aria-labelledby="time-question">
          {times.map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
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
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || isSaved}
          className="w-full mt-6 px-4 py-2 bg-[#219B9D] text-white rounded-full hover:bg-opacity-90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#219B9D] focus-visible:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Saving...
            </>
          ) : isSaved ? (
            <>
              <Check className="h-5 w-5" />
              Saved!
            </>
          ) : (
            'Save Entry'
          )}
        </button>
      )}
    </div>
  );
};

export default MoodTracker;