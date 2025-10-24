import React, { useState, useEffect } from 'react';
import { Save, Eye, Download, ArrowLeft } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import ProjectSection from './ProjectSection';
import ImageSection from './ImageSection';
import VideoSection from './VideoSection';
import BlogSection from './BlogSection';
import { getErrorMessage, downloadFile } from '../../utils/helpers';

const Editor = ({ onBack }) => {
  const { currentPortfolio, updatePortfolio } = usePortfolio();
  const [sections, setSections] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState('modern');
  const [view, setView] = useState('edit');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (currentPortfolio) {
      setSections(currentPortfolio.sections || []);
      setSelectedTheme(currentPortfolio.theme || 'modern');
    }
  }, [currentPortfolio]);

  const addSection = (type) => {
    const newSection = {
      _id: `temp-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      order: sections.length
    };
    setSections([...sections, newSection]);
  };

  const updateSection = (id, content) => {
    setSections(sections.map(s => s._id === id ? { ...s, content } : s));
  };

  const deleteSection = (id) => {
    setSections(sections.filter(s => s._id !== id));
  };

  const moveSection = (index, direction) => {
    const newSections = [...sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < sections.length) {
      [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
      setSections(newSections);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await updatePortfolio(currentPortfolio._id, {
        sections: sections.map((s, i) => ({ ...s, order: i })),
        theme: selectedTheme
      });
      alert('Portfolio saved successfully!');
    } catch (error) {
      alert('Error saving portfolio: ' + getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const handleExport = () => {
    const html = generateHTML(currentPortfolio, sections, selectedTheme);
    downloadFile(html, `${currentPortfolio.slug || 'portfolio'}.html`);
  };

  const getDefaultContent = (type) => {
    switch (type) {
      case 'project':
        return { title: 'New Project', description: '', link: '', image: '' };
      case 'image':
        return { title: 'Image Gallery', images: [] };
      case 'video':
        return { title: 'Video', url: '', description: '' };
      case 'blog':
        return { title: 'Blog Post', content: '' };
      default:
        return {};
    }
  };

  const renderSection = (section, index) => {
    const props = {
      section,
      onUpdate: (content) => updateSection(section._id, content),
      onDelete: () => deleteSection(section._id),
      onMoveUp: () => moveSection(index, 'up'),
      onMoveDown: () => moveSection(index, 'down'),
      canMoveUp: index > 0,
      canMoveDown: index < sections.length - 1
    };

    switch (section.type) {
      case 'project':
        return <ProjectSection key={section._id} {...props} />;
      case 'image':
        return <ImageSection key={section._id} {...props} />;
      case 'video':
        return <VideoSection key={section._id} {...props} />;
      case 'blog':
        return <BlogSection key={section._id} {...props} />;
      default:
        return null;
    }
  };

  if (!currentPortfolio) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <h1 className="text-2xl font-bold">{currentPortfolio.name}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setView('edit')}
                className={`px-4 py-2 rounded-lg transition text-sm font-medium ${
                  view === 'edit' ? 'bg-white shadow' : ''
                }`}
              >
                Edit
              </button>
              <button
                onClick={() => setView('preview')}
                className={`px-4 py-2 rounded-lg transition flex items-center gap-2 text-sm font-medium ${
                  view === 'preview' ? 'bg-white shadow' : ''
                }`}
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        {view === 'edit' && (
          <div className="w-64 bg-white border-r border-gray-200 p-6 min-h-screen sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto">
            <h3 className="font-bold text-gray-700 mb-4">Add Sections</h3>
            <div className="space-y-2 mb-8">
              {[
                { type: 'project', label: 'Project', icon: '📁' },
                { type: 'image', label: 'Image Gallery', icon: '🖼️' },
                { type: 'video', label: 'Video', icon: '🎥' },
                { type: 'blog', label: 'Blog Post', icon: '📝' }
              ].map(({ type, label, icon }) => (
                <button
                  key={type}
                  onClick={() => addSection(type)}
                  className="w-full px-4 py-3 bg-gray-50 hover:bg-purple-50 rounded-lg text-left transition group flex items-center gap-3"
                >
                  <span className="text-2xl">{icon}</span>
                  <span className="text-gray-700 group-hover:text-purple-700 font-medium">{label}</span>
                </button>
              ))}
            </div>

            <h3 className="font-bold text-gray-700 mb-4">Theme</h3>
            <div className="space-y-2">
              {['modern', 'minimal', 'creative', 'professional'].map(theme => (
                <button
                  key={theme}
                  onClick={() => setSelectedTheme(theme)}
                  className={`w-full px-4 py-2 rounded-lg capitalize transition font-medium ${
                    selectedTheme === theme
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-8">
          {view === 'edit' ? (
            <div className="max-w-4xl mx-auto space-y-4">
              {sections.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl shadow-md">
                  <div className="text-6xl mb-4">📄</div>
                  <p className="text-gray-500 text-lg">Add sections from the sidebar to start building</p>
                </div>
              ) : (
                sections.map((section, index) => renderSection(section, index))
              )}
            </div>
          ) : (
            <PortfolioPreview 
              portfolio={currentPortfolio} 
              sections={sections}
              theme={selectedTheme} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Preview Component
const PortfolioPreview = ({ portfolio, sections, theme }) => {
  const themeStyles = {
    modern: 'bg-gradient-to-br from-gray-50 to-gray-100',
    minimal: 'bg-white',
    creative: 'bg-gradient-to-br from-purple-50 to-pink-50',
    professional: 'bg-gray-50'
  };

  return (
    <div className={`min-h-screen ${themeStyles[theme]} p-8`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-gray-800">{portfolio.name}</h1>
        {portfolio.description && (
          <p className="text-xl text-gray-600 mb-12">{portfolio.description}</p>
        )}
        
        <div className="space-y-8">
          {sections.map(section => (
            <div key={section._id} className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                {section.content.title}
              </h2>
              {section.type === 'project' && (
                <>
                  {section.content.image && (
                    <img src={section.content.image} alt={section.content.title} className="w-full h-64 object-cover rounded-lg mb-4" />
                  )}
                  <p className="text-gray-600 mb-4 whitespace-pre-wrap">{section.content.description}</p>
                  {section.content.link && (
                    <a href={section.content.link} className="text-purple-600 hover:underline">
                      View Project →
                    </a>
                  )}
                </>
              )}
              {section.type === 'blog' && (
                <p className="text-gray-700 whitespace-pre-wrap">{section.content.content}</p>
              )}
              {section.type === 'video' && section.content.url && (
                <div className="aspect-video bg-gray-200 rounded-lg">
                  <iframe
                    src={section.content.url}
                    className="w-full h-full rounded-lg"
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              )}
              {section.type === 'image' && section.content.images?.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {section.content.images.map((img, i) => (
                    <img key={i} src={img} alt="" className="w-full h-48 object-cover rounded-lg" />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// HTML Generator Function
const generateHTML = (portfolio, sections, theme) => {
  const sectionsHTML = sections.map(section => {
    switch (section.type) {
      case 'project':
        return `
          <section class="section">
            <h2>${section.content.title}</h2>
            ${section.content.image ? `<img src="${section.content.image}" alt="${section.content.title}">` : ''}
            <p>${section.content.description}</p>
            ${section.content.link ? `<a href="${section.content.link}">View Project →</a>` : ''}
          </section>
        `;
      case 'blog':
        return `
          <section class="section">
            <h2>${section.content.title}</h2>
            <p>${section.content.content}</p>
          </section>
        `;
      case 'video':
        return `
          <section class="section">
            <h2>${section.content.title}</h2>
            ${section.content.url ? `<iframe src="${section.content.url}" frameborder="0" allowfullscreen></iframe>` : ''}
          </section>
        `;
      case 'image':
        return `
          <section class="section">
            <h2>${section.content.title}</h2>
            <div class="gallery">
              ${section.content.images?.map(img => `<img src="${img}" alt="">`).join('') || ''}
            </div>
          </section>
        `;
      default:
        return '';
    }
  }).join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${portfolio.name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
    h1 { font-size: 3rem; margin-bottom: 1rem; }
    h2 { font-size: 2rem; margin-bottom: 1rem; }
    .section { background: white; padding: 2rem; margin: 2rem 0; border-radius: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    img { max-width: 100%; height: auto; border-radius: 0.5rem; margin: 1rem 0; }
    iframe { width: 100%; height: 500px; border-radius: 0.5rem; }
    .gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; }
    a { color: #7c3aed; text-decoration: none; font-weight: 600; }
    a:hover { text-decoration: underline; }
    p { margin: 1rem 0; }
  </style>
</head>
<body>
  <div class="container">
    <h1>${portfolio.name}</h1>
    ${portfolio.description ? `<p class="description">${portfolio.description}</p>` : ''}
    ${sectionsHTML}
  </div>
</body>
</html>
  `;
};

export default Editor;
