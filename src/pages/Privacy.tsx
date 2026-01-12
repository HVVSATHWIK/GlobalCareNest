import { Shield } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        icon={Shield}
        title="Privacy Policy"
        description="High-level privacy notes for this MVP."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4 text-gray-700">
          <p>
            This is a prototype. For the demo flow, audio/video are intended to stay peer-to-peer via
            WebRTC, and AI calls are made over HTTPS with user authentication and consent checks.
          </p>
          <p>
            Do not upload highly sensitive personal data unless you understand where it is stored and
            who can access it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
