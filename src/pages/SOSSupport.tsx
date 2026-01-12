import { Siren, PhoneCall, MapPin, ShieldAlert, MessageCircle } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

const SOSSupport = () => {
  const actions = [
    {
      icon: PhoneCall,
      title: 'Call local emergency services',
      description: 'If someone is in immediate danger, call your local emergency number right away.',
    },
    {
      icon: MapPin,
      title: 'Share your location',
      description: 'Tell the responder your exact address, nearby landmarks, and who needs help.',
    },
    {
      icon: MessageCircle,
      title: 'Use text-based options if needed',
      description: 'If you are Deaf or non-verbal, use SMS/relay services where available and keep messages short and clear.',
    },
    {
      icon: ShieldAlert,
      title: 'Stay calm and follow instructions',
      description: 'Keep the line open if possible. Don’t hang up until told to do so.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        icon={Siren}
        title="SOS Support"
        description="Quick guidance for emergencies and urgent situations."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {actions.map(({ icon: Icon, title, description }) => (
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

        <section className="mt-10 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800">Before you call</h2>
          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            <li>• What happened and when it started</li>
            <li>• The person’s age (approx), symptoms, and known conditions</li>
            <li>• Any medications/allergies if known</li>
            <li>• Exact location and best way to reach you</li>
          </ul>
          <p className="text-xs text-gray-500 mt-4">
            This page provides general guidance and is not a substitute for professional emergency services.
          </p>
        </section>
      </div>
    </div>
  );
};

export default SOSSupport;