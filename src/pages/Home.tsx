import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Activity, Apple, Dumbbell, Siren } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description, link }) => (
  <Link
    to={link}
    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
  >
    <div className="bg-[#B9E5E8] p-4 rounded-full mb-4">
      <Icon className="h-8 w-8 text-[#219B9D]" />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </Link>
);

const TestimonialCard = ({ quote, author }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <p className="text-gray-600 italic mb-4">"{quote}"</p>
    <p className="font-semibold text-[#219B9D]">- {author}</p>
  </div>
);

const Home = () => {
  const services = [
    {
      icon: Brain,
      title: "Mental Health Support",
      description: "Access professional mental health resources and support tools",
      link: "/mental-health"
    },
    {
      icon: Activity,
      title: "AI Diagnosis",
      description: "Get preliminary health insights through AI-powered analysis",
      link: "/ai-diagnosis"
    },
    {
      icon: Apple,
      title: "Diet & Nutrition",
      description: "Personalized nutrition plans and healthy eating guidance",
      link: "/diet-nutrition"
    },
    {
      icon: Dumbbell,
      title: "Fitness & Exercise",
      description: "Customized workout plans for all ability levels",
      link: "/fitness"
    },
    {
      icon: Siren,
      title: "SOS Support",
      description: "Quick access to emergency assistance when needed",
      link: "/sos"
    }
  ];

  const testimonials = [
    {
      quote: "Global CareNest has transformed how I manage my health. The AI diagnosis feature is incredibly helpful!",
      author: "Sarah M."
    },
    {
      quote: "As a deaf individual, finding accessible healthcare support was challenging until I found Global CareNest.",
      author: "James R."
    },
    {
      quote: "The mental health resources here have made a significant difference in my daily life.",
      author: "Emily K."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[600px] flex items-center justify-center text-white"
        style={{
          backgroundImage: 'linear-gradient(rgba(33, 155, 157, 0.8), rgba(33, 155, 157, 0.8)), url("https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="text-center max-w-4xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Global CareNest
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in-delay">
            Empowering Health and Care for All
          </p>
          <Link
            to="/about"
            className="bg-white text-[#219B9D] px-8 py-3 rounded-full font-semibold hover:bg-[#B9E5E8] transition-colors inline-block"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#219B9D] text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl mb-8">
            Join Global CareNest today and access our comprehensive healthcare support system.
          </p>
          <Link
            to="/portfolio"
            className="bg-white text-[#219B9D] px-8 py-3 rounded-full font-semibold hover:bg-[#B9E5E8] transition-colors inline-block"
          >
            Create Your Medical Portfolio
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;