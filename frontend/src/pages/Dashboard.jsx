
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Settings, Eye, Trash2, Download, Copy, ExternalLink, Search, Filter, MoreVertical, Star, Calendar, TrendingUp, FileText } from 'lucide-react';

import { usePortfolio } from '../context/PortfolioContext';
import { formatDate, getErrorMessage } from '../utils/helpers';
import Editor from '../components/editor/Editor';

const Dashboard = () => {
  const navigate = useNavigate();
  const { portfolios, loading, createPortfolio, deletePortfolio, exportPortfolio, setCurrentPortfolio, fetchPortfolios } = usePortfolio();
  
  // State management
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [portfolioName, setPortfolioName] = useState('');
  const [portfolioDescription, setPortfolioDescription] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('modern');
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTheme, setFilterTheme] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [selectedPortfolios, setSelectedPortfolios] = useState([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  // Handlers
  const handleCreate = async () => {
    if (!portfolioName.trim()) {
      setError('Please enter a portfolio name');
      return;
    }

    try {
      const newPortfolio = await createPortfolio({
        name: portfolioName,
        description: portfolioDescription,
        theme: selectedTheme,
        sections: []
      });
      setShowCreateModal(false);
      setPortfolioName('');
      setPortfolioDescription('');
      setError('');
      setCurrentPortfolio(newPortfolio);
      setShowEditor(true);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleEdit = (portfolio) => {
    setCurrentPortfolio(portfolio);
    setShowEditor(true);
  };

  const handleDelete = async (id) => {
    try {
      await deletePortfolio(id);
      setDeleteConfirm(null);
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };

  const handleExport = async (id) => {
    try {
      await exportPortfolio(id);
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };

  const handleCopyLink = (slug) => {
    const link = `${window.location.origin}/portfolio/slug/${slug}`;
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard! 📋');
  };

  const toggleSelectPortfolio = (id) => {
    setSelectedPortfolios(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (window.confirm(`Delete ${selectedPortfolios.length} selected portfolios?`)) {
      try {
        await Promise.all(selectedPortfolios.map(id => deletePortfolio(id)));
        setSelectedPortfolios([]);
      } catch (err) {
        alert(getErrorMessage(err));
      }
    }
  };

  // Filter and sort portfolios
  const filteredPortfolios = portfolios
    .filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTheme = filterTheme === 'all' || p.theme === filterTheme;
      return matchesSearch && matchesTheme;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'views':
          return (b.views || 0) - (a.views || 0);
        default:
          return 0;
      }
    });

  // Statistics
  const stats = {
    total: portfolios.length,
    published: portfolios.filter(p => p.isPublic).length,
    totalViews: portfolios.reduce((sum, p) => sum + (p.views || 0), 0),
    featured: portfolios.filter(p => p.isFeatured).length
  };

  if (showEditor) {
    return <Editor onBack={() => setShowEditor(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">My Portfolios</h1>
              <p className="text-gray-600 mt-2">Create and manage your portfolio websites</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              New Portfolio
            </button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.published}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.totalViews}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-600 fill-current" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Featured</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.featured}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search portfolios..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Theme Filter */}
              <select
                value={filterTheme}
                onChange={(e) => setFilterTheme(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Themes</option>
                <option value="modern">Modern</option>
                <option value="minimal">Minimal</option>
                <option value="creative">Creative</option>
                <option value="professional">Professional</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name (A-Z)</option>
                <option value="views">Most Views</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded-lg transition ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 rounded-lg transition ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  List
                </button>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedPortfolios.length > 0 && (
              <div className="mt-4 flex items-center justify-between bg-purple-50 border border-purple-200 rounded-lg p-3">
                <span className="text-sm text-purple-700 font-medium">
                  {selectedPortfolios.length} portfolio(s) selected
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedPortfolios([])}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Clear
                  </button>
                  <button
                    onClick={handleBulkDelete}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete Selected
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Portfolio Grid/List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : filteredPortfolios.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-white rounded-xl shadow-md">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {searchQuery || filterTheme !== 'all' ? 'No portfolios found' : 'No portfolios yet'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery || filterTheme !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Create your first portfolio to get started'}
            </p>
            {!searchQuery && filterTheme === 'all' && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Create Your First Portfolio
              </button>
            )}
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredPortfolios.map(portfolio => (
              <PortfolioCard
                key={portfolio._id}
                portfolio={portfolio}
                viewMode={viewMode}
                isSelected={selectedPortfolios.includes(portfolio._id)}
                onSelect={() => toggleSelectPortfolio(portfolio._id)}
                onEdit={() => handleEdit(portfolio)}
                onDelete={() => setDeleteConfirm(portfolio._id)}
                onExport={() => handleExport(portfolio._id)}
                onCopyLink={() => handleCopyLink(portfolio.slug)}
                onView={() => navigate(`/portfolio/${portfolio._id}`)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create Modal */}
      <CreatePortfolioModal
        show={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setError('');
          setPortfolioName('');
          setPortfolioDescription('');
        }}
        portfolioName={portfolioName}
        setPortfolioName={setPortfolioName}
        portfolioDescription={portfolioDescription}
        setPortfolioDescription={setPortfolioDescription}
        selectedTheme={selectedTheme}
        setSelectedTheme={setSelectedTheme}
        error={error}
        onCreate={handleCreate}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        show={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => handleDelete(deleteConfirm)}
      />
    </div>
  );
};

// Portfolio Card Component
const PortfolioCard = ({ portfolio, viewMode, isSelected, onSelect, onEdit, onDelete, onExport, onCopyLink, onView }) => {
  const [showMenu, setShowMenu] = useState(false);

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex items-center gap-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="w-5 h-5 text-purple-600 rounded"
        />
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex-shrink-0"></div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800">{portfolio.name}</h3>
          <p className="text-sm text-gray-500">{formatDate(portfolio.createdAt)}</p>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>{portfolio.sections?.length || 0} sections</span>
          <span>{portfolio.views || 0} views</span>
          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full capitalize">
            {portfolio.theme}
          </span>
        </div>
        <div className="flex gap-2">
          <button onClick={onEdit} className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg" title="Edit">
            <Settings className="w-5 h-5" />
          </button>
          <button onClick={onView} className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg" title="Preview">
            <Eye className="w-5 h-5" />
          </button>
          <button onClick={onExport} className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="Export">
            <Download className="w-5 h-5" />
          </button>
          <button onClick={onDelete} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Delete">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden group">
      <div className="relative">
        <div className="h-40 bg-gradient-to-br from-purple-400 to-pink-400"></div>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="absolute top-3 left-3 w-5 h-5 text-purple-600 rounded opacity-0 group-hover:opacity-100 transition"
        />
        {portfolio.isFeatured && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            Featured
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-1 truncate">{portfolio.name}</h3>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(portfolio.createdAt)}
            </p>
          </div>
          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full capitalize flex-shrink-0">
            {portfolio.theme}
          </span>
        </div>
        
        {portfolio.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{portfolio.description}</p>
        )}

        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
          <span className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            {portfolio.sections?.length || 0} sections
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {portfolio.views || 0} views
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="flex-1 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition flex items-center justify-center gap-2 text-sm font-medium"
          >
            <Settings className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={onView}
            className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition"
            title="Preview"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={onCopyLink}
            className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition"
            title="Copy Link"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={onExport}
            className="px-3 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition"
            title="Export"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Create Portfolio Modal Component
const CreatePortfolioModal = ({ show, onClose, portfolioName, setPortfolioName, portfolioDescription, setPortfolioDescription, selectedTheme, setSelectedTheme, error, onCreate }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Create New Portfolio</h2>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Portfolio Name *
            </label>
            <input
              type="text"
              value={portfolioName}
              onChange={(e) => setPortfolioName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="My Awesome Portfolio"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={portfolioDescription}
              onChange={(e) => setPortfolioDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              rows="3"
              placeholder="Describe your portfolio..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Theme
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['modern', 'minimal', 'creative', 'professional'].map(theme => (
                <button
                  key={theme}
                  onClick={() => setSelectedTheme(theme)}
                  className={`py-3 px-4 rounded-lg capitalize transition font-medium ${
                    selectedTheme === theme
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition"
          >
            Cancel
          </button>
          <button
            onClick={onCreate}
            className="flex-1 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition"
          >
            Create Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};

// Delete Confirmation Modal Component
const DeleteConfirmModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">Delete Portfolio?</h2>
        <p className="text-gray-600 mb-6 text-center">
          Are you sure you want to delete this portfolio? This action cannot be undone and all your data will be permanently removed.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition"
          >
            Delete Forever
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;