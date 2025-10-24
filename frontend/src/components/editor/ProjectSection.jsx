import React from 'react';
import { Grid, Trash2, ChevronUp, ChevronDown, GripVertical } from 'lucide-react';

const ProjectSection = ({ section, onUpdate, onDelete, onMoveUp, onMoveDown, canMoveUp, canMoveDown }) => {
  const handleChange = (field, value) => {
    onUpdate({
      ...section.content,
      [field]: value
    });
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Grid className="w-5 h-5 text-purple-600" />
          </div>
          <span className="font-semibold text-gray-700 text-lg">Project</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onMoveUp}
            disabled={!canMoveUp}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed"
            title="Move Up"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <button
            onClick={onMoveDown}
            disabled={!canMoveDown}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed"
            title="Move Down"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
            title="Delete Section"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Title *
          </label>
          <input
            type="text"
            value={section.content.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="My Awesome Project"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            value={section.content.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows="5"
            placeholder="Describe your project in detail..."
          />
          <p className="mt-1 text-xs text-gray-500">
            {section.content.description.length} characters
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Link (URL)
          </label>
          <input
            type="url"
            value={section.content.link}
            onChange={(e) => handleChange('link', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="https://example.com/my-project"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Image (URL)
          </label>
          <input
            type="url"
            value={section.content.image}
            onChange={(e) => handleChange('image', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="https://example.com/image.jpg"
          />
          {section.content.image && (
            <div className="mt-3">
              <img
                src={section.content.image}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;