import React, { useState } from 'react';
import { Activity, AlertCircle, CheckCircle2, RotateCcw, Loader2 } from 'lucide-react';
import { analyzeSymptoms } from '../services/ai/gemini';
import ReactMarkdown from 'react-markdown';

const AIDiagnosis = () => {
  const [symptoms, setSymptoms] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const diagnosis = await analyzeSymptoms(symptoms, age, gender);
      setResult(diagnosis);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to get analysis. Please try again.';
      setError(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2 animate-blob animation-delay-2000"></div>

      <section className="bg-gradient-to-r from-[#219B9D] to-[#4C1F7A] text-white py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-white/20 backdrop-blur-md rounded-full mb-6 shadow-xl">
              <Activity className="h-12 w-12" />
            </div>
            <h1 className="text-5xl font-extrabold mb-4 tracking-tight">AI Diagnostic Assistant</h1>
            <p className="text-xl max-w-2xl font-light text-blue-50">
              Powered by Gemini 2.5 Flash technology for rapid, preliminary health insights.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10 -mt-10">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-8 border border-white/50">
          <div className="flex items-center mb-6 text-amber-600 bg-amber-50 p-4 rounded-lg border border-amber-100">
            <AlertCircle className="h-6 w-6 mr-3 flex-shrink-0" />
            <p className="text-sm font-medium">
              Disclaimer: This AI tool provides general guidance only and is NOT a substitute for professional medical advice, diagnosis, or treatment.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Describe your symptoms in detail
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows={4}
                className="w-full border-gray-200 rounded-xl shadow-inner p-4 focus:ring-2 focus:ring-[#219B9D] focus:border-transparent transition-all resize-none bg-gray-50"
                placeholder="e.g., I have a throbbing headache on one side, sensitivity to light, and mild nausea..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full border-gray-200 rounded-xl shadow-inner p-3 focus:ring-2 focus:ring-[#219B9D] focus:border-transparent transition-all bg-gray-50"
                  placeholder="Years"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full border-gray-200 rounded-xl shadow-inner p-3 focus:ring-2 focus:ring-[#219B9D] focus:border-transparent transition-all bg-gray-50"
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
              disabled={loading}
              className={`w-full bg-[#219B9D] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-[#1a7f81] hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex justify-center items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Analyzing Symptoms...
                </>
              ) : (
                'Run AI Analysis'
              )}
            </button>
          </form>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl relative shadow-sm mb-8 animate-fade-in">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {result && (
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 space-y-6 animate-fade-in border border-white/50">
            <div className="flex items-center text-green-600 mb-6 pb-4 border-b border-gray-100">
              <CheckCircle2 className="h-8 w-8 mr-3" />
              <h3 className="text-2xl font-bold">Analysis Complete</h3>
            </div>

            <div className="prose prose-teal max-w-none text-gray-700">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>

            <button
              onClick={() => {
                setResult(null);
                setSymptoms('');
              }}
              className="w-full mt-8 bg-gray-100 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Start New Analysis
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIDiagnosis;