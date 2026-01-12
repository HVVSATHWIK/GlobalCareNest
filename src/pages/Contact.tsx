import { Mail } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        icon={Mail}
        title="Contact"
        description="Get in touch with the Global CareNest team."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
          <p className="mb-4">
            This is a hackathon MVP. If you want a contact form, tell me what email/service you want
            to use (Netlify Forms, Firebase, etc.) and I’ll wire it up.
          </p>
          <div className="bg-[#B9E5E8] rounded-lg p-4">
            <p className="text-sm text-gray-700">
              Placeholder email: <span className="font-semibold">support@globalcarenest.example</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
