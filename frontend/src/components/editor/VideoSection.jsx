import React from 'react';
import { Video, Trash2, ChevronUp, ChevronDown, GripVertical } from 'lucide-react';

const VideoSection = ({
  section,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}) => {
  const handleChange = (field, value) => {
    onUpdate({
      ...section.content,
      [field]: value,
    });
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <Video className="w-5 h-5 text-red-600" />
          </div>
          <span className="font-semibold text-gray-700 text-lg">Video</span>
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

      {/* Body */}
      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Video Title *
          </label>
          <input
            type="text"
            value={section.content.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="My Video Title"
          />
        </div>

        {/* URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Video URL * (YouTube, Vimeo, etc.)
          </label>
          <input
            type="url"
            value={section.content.url}
            onChange={(e) => handleChange('url', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="https://www.youtube.com/embed/VIDEO_ID"
          />
          <p className="mt-1 text-xs text-gray-500">
            For YouTube: Use the embed URL (https://www.youtube.com/embed/VIDEO_ID)
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description (Optional)
          </label>
          <textarea
            value={section.content.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows="3"
            placeholder="Brief description of the video..."
          />
        </div>

        {/* Video Preview */}
        {section.content.url && (
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              src={section.content.url}
              title={section.content.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoSection;
