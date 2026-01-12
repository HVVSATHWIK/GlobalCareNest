import { Dumbbell, HeartPulse, Timer, ShieldCheck } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

type Plan = {
  title: string;
  description: string;
  duration: string;
  intensity: 'Low' | 'Medium' | 'High';
};

const Fitness = () => {
  const plans: Plan[] = [
    {
      title: 'Mobility & Joint Care',
      description: 'Gentle movements to improve range of motion and reduce stiffness.',
      duration: '10–15 min',
      intensity: 'Low',
    },
    {
      title: 'Strength Basics',
      description: 'Bodyweight strength routine focused on legs, core, and posture.',
      duration: '20–30 min',
      intensity: 'Medium',
    },
    {
      title: 'Cardio Burst',
      description: 'Short cardio intervals you can scale based on your comfort.',
      duration: '12–18 min',
      intensity: 'High',
    },
  ];

  const tips = [
    {
      icon: ShieldCheck,
      title: 'Safety first',
      description: 'Stop if you feel chest pain, dizziness, or severe shortness of breath.',
    },
    {
      icon: Timer,
      title: 'Consistency beats intensity',
      description: 'Aim for small sessions 3–5 days/week rather than sporadic long workouts.',
    },
    {
      icon: HeartPulse,
      title: 'Warm-up + cool-down',
      description: 'Spend 3–5 minutes preparing your body and recovering afterward.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        icon={Dumbbell}
        title="Fitness & Exercise"
        description="Simple routines and guidance you can adapt to your ability level."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tips.map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#B9E5E8] p-2 rounded-full">
                  <Icon className="h-5 w-5 text-[#219B9D]" />
                </div>
                <h3 className="font-semibold text-gray-800">{title}</h3>
              </div>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          ))}
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Starter Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.title} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800">{plan.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-gray-600">{plan.duration}</span>
                  <span className="px-2 py-1 rounded-full bg-[#B9E5E8] text-[#219B9D] text-xs">
                    {plan.intensity} intensity
                  </span>
                </div>
                <button
                  type="button"
                  className="mt-5 w-full px-4 py-2 bg-[#219B9D] text-white rounded-full hover:bg-opacity-90 transition-colors"
                >
                  View routine (coming soon)
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Fitness;