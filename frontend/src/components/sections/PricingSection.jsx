import React from 'react';
import { Check } from 'lucide-react';

const PricingSection = ({ onRegister }) => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      features: ['1 Portfolio', 'Basic Templates', 'Export HTML/CSS', 'Community Support'],
    },
    {
      name: 'Pro',
      price: '$9',
      period: '/month',
      features: ['Unlimited Portfolios', 'Premium Templates', 'Custom Domain', 'Priority Support'],
      popular: true,
    },
    {
      name: 'Business',
      price: '$29',
      period: '/month',
      features: ['Everything in Pro', 'White Label', 'API Access', 'Dedicated Support'],
    },
  ];

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
          Simple, Transparent Pricing
        </h2>
        <p className="text-gray-600 mb-20 text-lg">
          Choose the plan that works for you
        </p>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-10 border ${
                plan.popular
                  ? 'ring-2 ring-purple-600 shadow-2xl scale-105 bg-purple-50'
                  : 'shadow-md bg-white border-gray-100'
              } hover:shadow-xl transition-all duration-300`}
            >
              {plan.popular && (
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold mt-4 mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-600">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8 text-left">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={onRegister}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  plan.popular
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
