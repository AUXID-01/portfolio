import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Eye } from 'lucide-react';
import { portfolioService } from '../services/portfolioService';
import { getErrorMessage } from '../utils/helpers';

const PortfolioPreview = () => {
  const { id, slug } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPortfolio();
  }, [id, slug]);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const response = slug 
        ? await portfolioService.getBySlug(slug)
        : await portfolioService.getById(id);
      setPortfolio(response.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const getThemeStyles = () => {
    const themes = {
      modern: 'bg-gradient-to-br from-gray-50 to-gray-100',
      minimal: 'bg-white',
      creative: 'bg-gradient-to-br from-purple-50 to-pink-50',
      professional: 'bg-gray-50'
    };
    return themes[portfolio?.theme] || themes.modern;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Portfolio Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The portfolio you are looking for does not exist.'}</p>
          <Link to="/" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${getThemeStyles()}`}>
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {portfolio.views} views
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full capitalize">
              {portfolio.theme}
            </span>
          </div>
        </div>
      </div>

      {/* Portfolio Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-800">
              {portfolio.name}
            </h1>
            {portfolio.description && (
              <p className="text-xl text-gray-600">{portfolio.description}</p>
            )}
            {portfolio.user && (
              <p className="text-sm text-gray-500 mt-4">
                Created by {portfolio.user.name}
              </p>
            )}
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {portfolio.sections && portfolio.sections.length > 0 ? (
              portfolio.sections.map((section, index) => (
                <div key={section._id || index} className="bg-white rounded-xl p-8 shadow-lg">
                  <SectionRenderer section={section} />
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-xl shadow-lg">
                <p className="text-gray-500">No sections added yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Section Renderer Component
const SectionRenderer = ({ section }) => {
  switch (section.type) {
    case 'project':
      return (
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            {section.content.title}
          </h2>
          {section.content.image && (
            <img
              src={section.content.image}
              alt={section.content.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
          )}
          <p className="text-gray-700 mb-4 whitespace-pre-wrap">
            {section.content.description}
          </p>
          {section.content.link && (
            <a
              href={section.content.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold"
            >
              View Project
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      );

    case 'blog':
      return (
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            {section.content.title}
          </h2>
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {section.content.content}
          </p>
        </div>
      );

    case 'video':
      return (
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            {section.content.title}
          </h2>
          {section.content.url && (
            <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <iframe
                src={section.content.url}
                title={section.content.title}
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          {section.content.description && (
            <p className="text-gray-700">{section.content.description}</p>
          )}
        </div>
      );

    case 'image':
      return (
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            {section.content.title}
          </h2>
          {section.content.images && section.content.images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.content.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${section.content.title} ${idx + 1}`}
                  className="w-full h-64 object-cover rounded-lg hover:scale-105 transition"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No images added</p>
          )}
        </div>
      );

    default:
      return null;
  }
};

export default PortfolioPreview;
