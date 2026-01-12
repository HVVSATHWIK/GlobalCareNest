import { BookOpen } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import ContentCard from '../components/common/ContentCard';

const Articles = () => {
  const articles = [
    {
      title: 'Healthy Sleep Basics',
      description: 'Practical steps to improve sleep quality and recovery.',
      imageUrl:
        'https://images.unsplash.com/photo-1520206183501-b80df61043c2?auto=format&fit=crop&w=1200&q=80',
      link: 'https://www.cdc.gov/sleep/',
    },
    {
      title: 'Nutrition: Balanced Plate Guide',
      description: 'How to build meals with a balance of protein, carbs, and fiber.',
      imageUrl:
        'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80',
      link: 'https://www.who.int/health-topics/healthy-diet',
    },
    {
      title: 'Physical Activity Tips',
      description: 'Simple ways to move more—whether at home, at work, or outside.',
      imageUrl:
        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80',
      link: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity',
    },
    {
      title: 'Mental Well-being: Stress Management',
      description: 'Strategies to reduce stress and build resilience over time.',
      imageUrl:
        'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
      link: 'https://www.who.int/news-room/questions-and-answers/item/stress',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        icon={BookOpen}
        title="Health Articles"
        description="Curated, reliable resources to support your health journey."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ContentCard key={article.title} {...article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;