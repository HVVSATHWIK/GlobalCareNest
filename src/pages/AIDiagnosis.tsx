import React, { useState } from 'react';
import { Activity, AlertCircle, CheckCircle2 } from 'lucide-react';

const AIDiagnosis = () => {
  const [symptoms, setSymptoms] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-[#219B9D] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <Activity className="h-16 w-16 mb-6" />
            <h1 className="text-4xl font-bold mb-4">AI Diagnosis</h1>
            <p className="text-xl max-w-2xl">
              Get preliminary health insights through our AI-powered analysis system.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4 text-amber-600">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p className="text-sm">
              This tool provides general guidance only and should not replace professional medical advice.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe your symptoms
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows={4}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#219B9D] focus:border-[#219B9D]"
                placeholder="Example: Headache, fever, fatigue..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#219B9D] focus:border-[#219B9D]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#219B9D] focus:border-[#219B9D]"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#219B9D] text-white py-3 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Analyze Symptoms
            </button>
          </form>
        </div>

        {showResults && (
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-6 animate-fade-in">
            <div className="flex items-center text-green-600 mb-4">
              <CheckCircle2 className="h-5 w-5 mr-2" />
              <h3 className="font-semibold">Analysis Complete</h3>
            </div>

            <div className="space-y-4">
              <div className="border-b pb-4">
                <h4 className="font-medium text-gray-700 mb-2">Possible Conditions</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Common Cold (High probability)</li>
                  <li>Seasonal Allergies (Medium probability)</li>
                  <li>Viral Infection (Low probability)</li>
                </ul>
              </div>

              <div className="border-b pb-4">
                <h4 className="font-medium text-gray-700 mb-2">Recommended Actions</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Rest and stay hydrated</li>
                  <li>Monitor symptoms for 24-48 hours</li>
                  <li>Consider over-the-counter medications</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2">When to Seek Medical Care</h4>
                <p className="text-gray-600">
                  If symptoms worsen or persist beyond 3 days, please consult a healthcare provider.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowResults(false)}
              className="w-full mt-6 bg-gray-100 text-gray-700 py-3 rounded-md hover:bg-gray-200 transition-colors"
            >
              Start New Analysis
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIDiagnosis;