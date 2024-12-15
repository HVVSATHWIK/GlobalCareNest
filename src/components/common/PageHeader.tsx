import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon: Icon, title, description }) => {
  return (
    <section className="bg-[#219B9D] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <Icon className="h-16 w-16 mb-6" />
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-xl max-w-2xl">{description}</p>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;