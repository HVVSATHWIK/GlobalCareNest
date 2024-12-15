import React from 'react';

interface ContentCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
}

const ContentCard: React.FC<ContentCardProps> = ({ title, description, imageUrl, link }) => {
  const Card = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );

  if (link) {
    return (
      <a href={link} className="block">
        <Card />
      </a>
    );
  }

  return <Card />;
};

export default ContentCard;