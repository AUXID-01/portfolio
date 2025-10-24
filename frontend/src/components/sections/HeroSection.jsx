import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = ({ onRegister }) => {
  return (
    <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-32 px-6 text-center">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight">
          Build Your Dream Portfolio
        </h1>
        <p className="text-lg sm:text-xl mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed">
          Create stunning portfolio websites with our intuitive drag-and-drop editor. 
          No coding required. Choose themes, add content, and go live in minutes.
        </p>

        <button
          onClick={onRegister}
          className="px-8 py-4 bg-white text-purple-600 rounded-lg font-bold text-lg hover:scale-105 transition transform shadow-lg inline-flex items-center gap-2"
        >
          Start Building For Free
          <ArrowRight className="w-5 h-5" />
        </button>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-10 max-w-3xl mx-auto">
          {[
            { label: 'Active Users', value: '10,000+' },
            { label: 'Portfolios Created', value: '25,000+' },
            { label: 'Templates', value: '50+' },
            { label: 'Countries', value: '100+' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-white/80 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
