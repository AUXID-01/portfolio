import React from 'react';
import { Layout, Palette, Download } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Layout,
      title: 'Drag & Drop Editor',
      description: 'Build your portfolio with an intuitive drag-and-drop interface',
    },
    {
      icon: Palette,
      title: 'Beautiful Themes',
      description: 'Choose from professionally designed themes and templates',
    },
    {
      icon: Download,
      title: 'Export & Host',
      description: 'Download your portfolio or host it with us instantly',
    },
  ];

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
          Why Choose PortfolioBuilder?
        </h2>
        <p className="text-gray-600 mb-20 max-w-2xl mx-auto text-lg leading-relaxed">
          Everything you need to create a professional portfolio that stands out
        </p>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group hover:scale-105 transition-all duration-300 bg-gray-50 p-10 rounded-2xl shadow-sm hover:shadow-lg"
            >
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition">
                <feature.icon className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
