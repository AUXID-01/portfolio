import React from 'react';
import { FileText, Trash2, ChevronUp, ChevronDown, GripVertical } from 'lucide-react';

const BlogSection = ({ section, onUpdate, onDelete, onMoveUp, onMoveDown, canMoveUp, canMoveDown }) => {
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
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-green-600" />
          </div>
          <span className="font-semibold text-gray-700 text-lg">Blog Post</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onMoveUp}
            disabled={!canMoveUp}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <button
            onClick={onMoveDown}
            disabled={!canMoveDown}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blog Title *
          </label>
          <input
            type="text"
            value={section.content.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="My Blog Post Title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content *
          </label>
          <textarea
            value={section.content.content}
            onChange={(e) => handleChange('content', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none font-mono text-sm"
            rows="12"
            placeholder="Write your blog post here...

You can use plain text or markdown formatting."
          />
          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <span>{section.content.content.length} characters</span>
            <span>{section.content.content.split(/\s+/).filter(w => w).length} words</span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Formatting Tips:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Use line breaks to separate paragraphs</li>
            <li>• Keep your content engaging and concise</li>
            <li>• Add personal insights and experiences</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;