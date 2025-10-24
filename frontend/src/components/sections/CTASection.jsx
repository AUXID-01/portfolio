import React from 'react';

const CTASection = ({ onRegister }) => {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-28 text-center">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
          Ready to Build Your Portfolio?
        </h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto text-white/90 leading-relaxed">
          Join thousands of creators who trust PortfolioBuilder to showcase their work
        </p>
        <button
          onClick={onRegister}
          className="px-8 py-4 bg-white text-purple-600 rounded-lg font-bold text-lg hover:scale-105 transition transform shadow-xl"
        >
          Start Building Now - It's Free!
        </button>
      </div>
    </section>
  );
};

export default CTASection;
