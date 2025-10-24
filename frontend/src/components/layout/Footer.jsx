import React from 'react';
import { Layout, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Layout className="w-6 h-6" />
              <span className="font-bold text-xl">PortfolioBuilder</span>
            </div>
            <p className="text-gray-400 text-sm">
              Create stunning portfolio websites with ease. No coding required.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:contact@portfoliobuilder.com" className="text-gray-400 hover:text-white transition">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-white transition">Features</Link></li>
              <li><Link to="/" className="hover:text-white transition">Pricing</Link></li>
              <li><Link to="/" className="hover:text-white transition">Templates</Link></li>
              <li><Link to="/" className="hover:text-white transition">Showcase</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/" className="hover:text-white transition">Blog</Link></li>
              <li><Link to="/" className="hover:text-white transition">Careers</Link></li>
              <li><Link to="/" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-white transition">Help Center</Link></li>
              <li><Link to="/" className="hover:text-white transition">Documentation</Link></li>
              <li><Link to="/" className="hover:text-white transition">API Reference</Link></li>
              <li><Link to="/" className="hover:text-white transition">Status</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} PortfolioBuilder. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>by developers, for developers</span>
            </div>
            <div className="flex gap-6 text-gray-400 text-sm">
              <Link to="/" className="hover:text-white transition">Privacy Policy</Link>
              <Link to="/" className="hover:text-white transition">Terms of Service</Link>
              <Link to="/" className="hover:text-white transition">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;