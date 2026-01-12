import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        icon={AlertTriangle}
        title="Page Not Found"
        description="The page you’re looking for doesn’t exist."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
          <p className="mb-4">Try going back to the dashboard.</p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-2 rounded-full bg-[#219B9D] text-white hover:bg-opacity-90 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
