import { Heart } from 'lucide-react';

const Donation = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-[#219B9D] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <Heart className="h-16 w-16 mb-6" />
            <h1 className="text-4xl font-bold mb-4">Donation & Transplantation</h1>
            <p className="text-xl max-w-2xl">
              Support and resources for organ donation and transplantation services.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Donation;