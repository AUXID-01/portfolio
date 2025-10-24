import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Star } from 'lucide-react';

const TemplateManager = () => {
  const [templates, setTemplates] = useState([
    { id: 1, name: 'Modern Portfolio', category: 'Professional', status: 'Active', uses: 450, rating: 4.8 },
    { id: 2, name: 'Creative Showcase', category: 'Creative', status: 'Active', uses: 320, rating: 4.6 },
    { id: 3, name: 'Minimal Design', category: 'Minimal', status: 'Active', uses: 280, rating: 4.7 },
    { id: 4, name: 'Photography Portfolio', category: 'Photography', status: 'Draft', uses: 0, rating: 0 }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      setTemplates(templates.filter(t => t.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Template Manager</h2>
          <p className="text-gray-600">Manage portfolio templates and themes</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Template
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
            <div className="h-40 bg-gradient-to-br from-purple-400 to-pink-400"></div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">{template.name}</h3>
                  <span className="text-sm text-gray-500">{template.category}</span>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    template.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {template.status}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                <span>{template.uses} uses</span>
                {template.rating > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{template.rating}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2 text-sm font-medium">
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                <button className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(template.id)}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateManager;