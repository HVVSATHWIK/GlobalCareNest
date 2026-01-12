import { useState } from 'react';
import { Apple, Search, ChevronDown } from 'lucide-react';

type RecipeCardProps = {
  title: string;
  calories: string;
  time: string;
  image: string;
  tags: string[];
};

const RecipeCard = ({ title, calories, time, image, tags }: RecipeCardProps) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <span>{calories} calories</span>
        <span className="mx-2">•</span>
        <span>{time} mins</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-[#B9E5E8] text-[#219B9D] text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const DietNutrition = () => {
  const [activeTab, setActiveTab] = useState('recipes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('all');

  const recipes = [
    {
      title: "Mediterranean Quinoa Bowl",
      calories: "420",
      time: "25",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["Vegetarian", "High Protein", "Mediterranean"]
    },
    {
      title: "Grilled Salmon with Avocado",
      calories: "380",
      time: "20",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["Keto", "High Protein", "Gluten Free"]
    },
    {
      title: "Vegan Buddha Bowl",
      calories: "350",
      time: "30",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["Vegan", "Low Calorie"]
    }
  ];

  const mealPlans = [
    {
      title: 'Balanced Starter (3 days)',
      description: 'A simple plan with a mix of protein, whole grains, and vegetables.',
      tags: ['Balanced', 'Beginner'],
    },
    {
      title: 'High-Protein Week (7 days)',
      description: 'Meals designed to support strength training and satiety.',
      tags: ['High Protein'],
    },
    {
      title: 'Heart-Healthy (5 days)',
      description: 'Focus on fiber, healthy fats, and lower added sugar.',
      tags: ['Heart Health'],
    },
  ];

  const tips = [
    {
      title: 'Build a balanced plate',
      description: 'Aim for vegetables + protein + whole grains, then add healthy fats as needed.',
    },
    {
      title: 'Hydration matters',
      description: 'If you feel tired or get headaches, try increasing water intake first.',
    },
    {
      title: 'Prioritize protein + fiber',
      description: 'They help you feel full longer and support stable energy.',
    },
    {
      title: 'Limit ultra-processed snacks',
      description: 'Choose whole foods when possible; keep simple snacks available (fruit, nuts, yogurt).',
    },
  ];

  const filteredRecipes = recipes.filter((r) => {
    const matchesSearch =
      searchQuery.trim().length === 0 ||
      r.title.toLowerCase().includes(searchQuery.trim().toLowerCase());

    const matchesDiet =
      selectedDiet === 'all' ||
      r.tags.some((tag) => tag.toLowerCase().includes(selectedDiet.toLowerCase()));

    return matchesSearch && matchesDiet;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-[#219B9D] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <Apple className="h-16 w-16 mb-6" />
            <h1 className="text-4xl font-bold mb-4">Diet & Nutrition</h1>
            <p className="text-xl max-w-2xl">
              Personalized nutrition plans and healthy eating guidance for your wellness journey.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('recipes')}
            className={`px-4 py-2 rounded-full ${
              activeTab === 'recipes'
                ? 'bg-[#219B9D] text-white'
                : 'bg-white text-gray-600'
            }`}
          >
            Healthy Recipes
          </button>
          <button
            onClick={() => setActiveTab('meal-plans')}
            className={`px-4 py-2 rounded-full ${
              activeTab === 'meal-plans'
                ? 'bg-[#219B9D] text-white'
                : 'bg-white text-gray-600'
            }`}
          >
            Meal Plans
          </button>
          <button
            onClick={() => setActiveTab('nutrition-tips')}
            className={`px-4 py-2 rounded-full ${
              activeTab === 'nutrition-tips'
                ? 'bg-[#219B9D] text-white'
                : 'bg-white text-gray-600'
            }`}
          >
            Nutrition Tips
          </button>
        </div>

        {activeTab === 'recipes' && (
          <>
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#219B9D] focus:border-[#219B9D]"
                />
              </div>
              <div className="relative">
                <select
                  value={selectedDiet}
                  onChange={(e) => setSelectedDiet(e.target.value)}
                  className="appearance-none w-full bg-white px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-[#219B9D] focus:border-[#219B9D]"
                >
                  <option value="all">All Diets</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="keto">Keto</option>
                  <option value="paleo">Paleo</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>

            {/* Recipe Grid */}
            {filteredRecipes.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
                No recipes match your search/filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe, index) => (
                  <RecipeCard key={index} {...recipe} />
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'meal-plans' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mealPlans.map((plan) => (
              <div key={plan.title} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800">{plan.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {plan.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-[#B9E5E8] text-[#219B9D] text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-5 w-full px-4 py-2 bg-[#219B9D] text-white rounded-full hover:bg-opacity-90 transition-colors"
                >
                  View plan (coming soon)
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'nutrition-tips' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800">{tip.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{tip.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DietNutrition;