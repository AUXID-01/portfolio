// import React, { useState } from 'react';
// import { Layout, Palette, Download, ArrowRight, Check, Star } from 'lucide-react';
// import Login from '../components/auth/Login';
// import Register from '../components/auth/Register';

// const Home = () => {
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [authMode, setAuthMode] = useState('register');

//   const features = [
//     {
//       icon: Layout,
//       title: 'Drag & Drop Editor',
//       description: 'Build your portfolio with an intuitive drag-and-drop interface',
//     },
//     {
//       icon: Palette,
//       title: 'Beautiful Themes',
//       description: 'Choose from professionally designed themes and templates',
//     },
//     {
//       icon: Download,
//       title: 'Export & Host',
//       description: 'Download your portfolio or host it with us instantly',
//     },
//   ];

//   const plans = [
//     {
//       name: 'Free',
//       price: '$0',
//       period: '/month',
//       features: ['1 Portfolio', 'Basic Templates', 'Export HTML/CSS', 'Community Support'],
//     },
//     {
//       name: 'Pro',
//       price: '$9',
//       period: '/month',
//       features: ['Unlimited Portfolios', 'Premium Templates', 'Custom Domain', 'Priority Support'],
//       popular: true,
//     },
//     {
//       name: 'Business',
//       price: '$29',
//       period: '/month',
//       features: ['Everything in Pro', 'White Label', 'API Access', 'Dedicated Support'],
//     },
//   ];

//   const testimonials = [
//     {
//       name: 'Sarah Johnson',
//       role: 'Web Developer',
//       content:
//         'PortfolioBuilder made it so easy to showcase my work. The drag-and-drop editor is intuitive and powerful!',
//       rating: 5,
//     },
//     {
//       name: 'Michael Chen',
//       role: 'Graphic Designer',
//       content:
//         'I love the variety of templates available. My portfolio looks professional and modern.',
//       rating: 5,
//     },
//     {
//       name: 'Emily Davis',
//       role: 'Photographer',
//       content:
//         "Best portfolio builder I've used. The image galleries are perfect for showcasing my photography work.",
//       rating: 5,
//     },
//   ];

//   return (
//     <div className="min-h-screen text-gray-800 font-inter">

//       {/* HERO SECTION */}
//       <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-32 px-6 text-center">
//         <div className="max-w-5xl mx-auto">
//           <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight">
//             Build Your Dream Portfolio
//           </h1>
//           <p className="text-lg sm:text-xl mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed">
//             Create stunning portfolio websites with our intuitive drag-and-drop editor. 
//             No coding required. Choose themes, add content, and go live in minutes.
//           </p>

//           <button
//             onClick={() => {
//               setAuthMode('register');
//               setShowAuthModal(true);
//             }}
//             className="px-8 py-4 bg-white text-purple-600 rounded-lg font-bold text-lg hover:scale-105 transition transform shadow-lg inline-flex items-center gap-2"
//           >
//             Start Building For Free
//             <ArrowRight className="w-5 h-5" />
//           </button>

//           <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-10 max-w-3xl mx-auto">
//             {[
//               { label: 'Active Users', value: '10,000+' },
//               { label: 'Portfolios Created', value: '25,000+' },
//               { label: 'Templates', value: '50+' },
//               { label: 'Countries', value: '100+' },
//             ].map((stat, i) => (
//               <div key={i} className="text-center">
//                 <div className="text-3xl font-bold mb-1">{stat.value}</div>
//                 <div className="text-white/80 text-sm">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FEATURES SECTION */}
//       <section className="py-28 bg-white">
//         <div className="max-w-7xl mx-auto px-6 text-center">
//           <h2 className="text-4xl sm:text-5xl font-bold mb-6">
//             Why Choose PortfolioBuilder?
//           </h2>
//           <p className="text-gray-600 mb-20 max-w-2xl mx-auto text-lg leading-relaxed">
//             Everything you need to create a professional portfolio that stands out
//           </p>

//           <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="text-center group hover:scale-105 transition-all duration-300 bg-gray-50 p-10 rounded-2xl shadow-sm hover:shadow-lg"
//               >
//                 <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition">
//                   <feature.icon className="w-10 h-10 text-purple-600" />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
//                 <p className="text-gray-600 leading-relaxed">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* TESTIMONIALS SECTION */}
//       <section className="bg-gray-50 py-28">
//         <div className="max-w-7xl mx-auto px-6 text-center">
//           <h2 className="text-4xl sm:text-5xl font-bold mb-6">
//             What Our Users Say
//           </h2>
//           <p className="text-gray-600 mb-20 text-lg">
//             Join thousands of satisfied creators
//           </p>

//           <div className="grid md:grid-cols-3 gap-10">
//             {testimonials.map((testimonial, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 text-left"
//               >
//                 <div className="flex mb-4">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                   ))}
//                 </div>
//                 <p className="text-gray-700 mb-6 italic leading-relaxed">
//                   "{testimonial.content}"
//                 </p>
//                 <div>
//                   <div className="font-bold text-gray-800">{testimonial.name}</div>
//                   <div className="text-sm text-gray-500">{testimonial.role}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* PRICING SECTION */}
//       <section className="py-28 bg-white">
//         <div className="max-w-7xl mx-auto px-6 text-center">
//           <h2 className="text-4xl sm:text-5xl font-bold mb-6">
//             Simple, Transparent Pricing
//           </h2>
//           <p className="text-gray-600 mb-20 text-lg">
//             Choose the plan that works for you
//           </p>

//           <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
//             {plans.map((plan, index) => (
//               <div
//                 key={index}
//                 className={`rounded-2xl p-10 border ${
//                   plan.popular
//                     ? 'ring-2 ring-purple-600 shadow-2xl scale-105 bg-purple-50'
//                     : 'shadow-md bg-white border-gray-100'
//                 } hover:shadow-xl transition-all duration-300`}
//               >
//                 {plan.popular && (
//                   <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
//                     Most Popular
//                   </span>
//                 )}
//                 <h3 className="text-2xl font-bold mt-4 mb-2">{plan.name}</h3>
//                 <div className="mb-6">
//                   <span className="text-4xl font-bold">{plan.price}</span>
//                   <span className="text-gray-600">{plan.period}</span>
//                 </div>
//                 <ul className="space-y-3 mb-8 text-left">
//                   {plan.features.map((feature, idx) => (
//                     <li key={idx} className="flex items-center gap-2">
//                       <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
//                       <span className="text-gray-700">{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//                 <button
//                   onClick={() => {
//                     setAuthMode('register');
//                     setShowAuthModal(true);
//                   }}
//                   className={`w-full py-3 rounded-lg font-semibold transition ${
//                     plan.popular
//                       ? 'bg-purple-600 text-white hover:bg-purple-700'
//                       : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
//                   }`}
//                 >
//                   Get Started
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA SECTION */}
//       <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-28 text-center">
//         <div className="max-w-5xl mx-auto px-6">
//           <h2 className="text-4xl sm:text-5xl font-bold mb-6">
//             Ready to Build Your Portfolio?
//           </h2>
//           <p className="text-xl mb-10 max-w-2xl mx-auto text-white/90 leading-relaxed">
//             Join thousands of creators who trust PortfolioBuilder to showcase their work
//           </p>
//           <button
//             onClick={() => {
//               setAuthMode('register');
//               setShowAuthModal(true);
//             }}
//             className="px-8 py-4 bg-white text-purple-600 rounded-lg font-bold text-lg hover:scale-105 transition transform shadow-xl"
//           >
//             Start Building Now - It's Free!
//           </button>
//         </div>
//       </section>

//       {/* AUTH MODAL */}
//       {showAuthModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl">
//             <button
//               onClick={() => setShowAuthModal(false)}
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
//             >
//               ✕
//             </button>

//             {authMode === 'login' ? (
//               <Login
//                 onClose={() => setShowAuthModal(false)}
//                 onSwitchToRegister={() => setAuthMode('register')}
//               />
//             ) : (
//               <Register
//                 onClose={() => setShowAuthModal(false)}
//                 onSwitchToLogin={() => setAuthMode('login')}
//               />
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

import React, { useState } from 'react';
import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import PricingSection from '../components/sections/PricingSection';
import CTASection from '../components/sections/CTASection';
import AuthModal from '../components/sections/AuthModal';

const Home = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('register');

  return (
    <div className="min-h-screen text-gray-800 font-inter">
      <HeroSection onRegister={() => { setAuthMode('register'); setShowAuthModal(true); }} />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection onRegister={() => { setAuthMode('register'); setShowAuthModal(true); }} />
      <CTASection onRegister={() => { setAuthMode('register'); setShowAuthModal(true); }} />

      {showAuthModal && (
        <AuthModal
          authMode={authMode}
          onClose={() => setShowAuthModal(false)}
          onSwitchMode={setAuthMode}
        />
      )}
    </div>
  );
};

export default Home;

