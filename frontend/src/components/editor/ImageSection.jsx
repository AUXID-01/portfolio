import React from 'react';
import { Image, Trash2, ChevronUp, ChevronDown, Plus, X, GripVertical } from 'lucide-react';

const ImageSection = ({ section, onUpdate, onDelete, onMoveUp, onMoveDown, canMoveUp, canMoveDown }) => {
  const handleChange = (field, value) => {
    onUpdate({
      ...section.content,
      [field]: value
    });
  };

  const addImage = () => {
    const images = [...(section.content.images || []), ''];
    handleChange('images', images);
  };

  const updateImage = (index, value) => {
    const images = [...section.content.images];
    images[index] = value;
    handleChange('images', images);
  };

  const removeImage = (index) => {
    const images = section.content.images.filter((_, i) => i !== index);
    handleChange('images', images);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Image className="w-5 h-5 text-blue-600" />
          </div>
          <span className="font-semibold text-gray-700 text-lg">Image Gallery</span>
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
            Gallery Title *
          </label>
          <input
            type="text"
            value={section.content.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="My Photo Gallery"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Images
          </label>
          <div className="space-y-3">
            {section.content.images?.map((img, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="url"
                  value={img}
                  onChange={(e) => updateImage(index, e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="px-4 py-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={addImage}
            className="w-full mt-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50 transition flex items-center justify-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            Add Image URL
          </button>
        </div>

        {section.content.images?.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mt-4">
            {section.content.images.filter(img => img).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Gallery ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageSection;
