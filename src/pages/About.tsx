import { Info } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        icon={Info}
        title="About Global CareNest"
        description="A healthcare accessibility platform focused on inclusive, patient-first experiences."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4 text-gray-700">
          <p>
            Global CareNest is built to make healthcare guidance more accessible—especially for Deaf
            and non-verbal users—by combining clear UI, consent-driven AI assistance, and local
            avatar-based signing (MVP).
          </p>
          <p className="text-sm text-gray-600">
            Note: This project provides general information and tooling. It is not a substitute for
            professional medical advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
