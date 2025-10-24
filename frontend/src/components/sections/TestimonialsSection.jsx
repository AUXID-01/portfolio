import React from 'react';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Web Developer',
      content:
        'PortfolioBuilder made it so easy to showcase my work. The drag-and-drop editor is intuitive and powerful!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Graphic Designer',
      content:
        'I love the variety of templates available. My portfolio looks professional and modern.',
      rating: 5,
    },
    {
      name: 'Emily Davis',
      role: 'Photographer',
      content:
        "Best portfolio builder I've used. The image galleries are perfect for showcasing my photography work.",
      rating: 5,
    },
  ];

  return (
    <section className="bg-gray-50 py-28">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
          What Our Users Say
        </h2>
        <p className="text-gray-600 mb-20 text-lg">
          Join thousands of satisfied creators
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 text-left"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "{testimonial.content}"
              </p>
              <div>
                <div className="font-bold text-gray-800">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
