import { FileText } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        icon={FileText}
        title="Terms of Service"
        description="MVP terms for demo usage."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4 text-gray-700">
          <p>
            Global CareNest is a hackathon MVP and is provided “as is” for demonstration purposes.
            It does not provide medical diagnosis or emergency services.
          </p>
          <p>
            By using this app, you agree you will not rely on it for urgent or life-critical decisions.
            Always consult qualified professionals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
