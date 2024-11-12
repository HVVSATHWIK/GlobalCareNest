import React from 'react';
import { Siren } from 'lucide-react';

const SOSSupport = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-[#219B9D] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <Siren className="h-16 w-16 mb-6" />
            <h1 className="text-4xl font-bold mb-4">SOS Support</h1>
            <p className="text-xl max-w-2xl">
              Quick access to emergency assistance when you need it most.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SOSSupport;