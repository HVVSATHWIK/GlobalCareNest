import { Heart, ClipboardList, ShieldCheck, HandHeart } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

const Donation = () => {
  const steps = [
    {
      icon: ClipboardList,
      title: 'Understand eligibility',
      description: 'Learn what donation options exist and what is required in your region.',
    },
    {
      icon: HandHeart,
      title: 'Register and inform family',
      description: 'Register through an official channel and tell your family your choice.',
    },
    {
      icon: ShieldCheck,
      title: 'Protect your medical privacy',
      description: 'Share documents only with trusted providers; avoid posting sensitive records publicly.',
    },
  ];

  const faq = [
    {
      q: 'Does donation affect medical care?'
      ,
      a: 'In general, treatment decisions are made to save your life first. Donation discussions typically happen separately depending on local policy.',
    },
    {
      q: 'Can I change my mind later?'
      ,
      a: 'Many registries allow you to update your preferences. Check your local registry guidance.',
    },
    {
      q: 'What about living donation?'
      ,
      a: 'Some organs/tissues can be donated while living. This requires thorough medical screening and informed consent.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        icon={Heart}
        title="Donation & Transplantation"
        description="Support and resources to help you understand donation pathways."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#B9E5E8] p-2 rounded-full">
                  <Icon className="h-5 w-5 text-[#219B9D]" />
                </div>
                <h3 className="font-semibold text-gray-800">{title}</h3>
              </div>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          ))}
        </section>

        <section className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800">Quick FAQ</h2>
          <div className="mt-6 space-y-4">
            {faq.map((item) => (
              <div key={item.q} className="border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-gray-800">{item.q}</p>
                <p className="text-sm text-gray-600 mt-1">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 bg-[#B9E5E8] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[#219B9D]">Next step</h3>
          <p className="text-sm text-gray-700 mt-2">
            If you share your country/region, I can tailor this page’s official registration links and emergency guidance accordingly.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Donation;