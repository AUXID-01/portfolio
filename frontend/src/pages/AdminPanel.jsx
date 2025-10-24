import React, { useState } from 'react';
import { Users, Folder, Palette, TrendingUp } from 'lucide-react';
import AdminDashboard from '../components/admin/AdminDashboard';
import TemplateManager from '../components/admin/TemplateManager';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'portfolios', label: 'Portfolios', icon: Folder },
    { id: 'templates', label: 'Templates', icon: Palette }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          </div>
          <div className="flex gap-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition ${activeTab === tab.id
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {activeTab === 'dashboard' && <AdminDashboard />}
        {activeTab === 'templates' && <TemplateManager />}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'portfolios' && <PortfolioManagement />}
      </div>
    </div>
  );
};

// User Management Component
const UserManagement = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', portfolios: 3, createdAt: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', portfolios: 5, createdAt: '2024-02-20' },
    { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'admin', portfolios: 0, createdAt: '2024-01-01' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <input
          type="search"
          placeholder="Search users..."
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Portfolios</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                    }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.portfolios}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-purple-600 hover:text-purple-900 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Portfolio Management Component
const PortfolioManagement = () => {
  const portfolios = [
    { id: 1, name: 'Portfolio 1', user: 'John Doe', views: 150, featured: true, createdAt: '2024-01-20' },
    { id: 2, name: 'Portfolio 2', user: 'Jane Smith', views: 320, featured: false, createdAt: '2024-02-15' },
    { id: 3, name: 'Portfolio 3', user: 'John Doe', views: 89, featured: false, createdAt: '2024-03-01' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Portfolio Management</h2>
        <div className="flex gap-3">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option>All Status</option>
            <option>Featured</option>
            <option>Public</option>
            <option>Private</option>
          </select>
          <input
            type="search"
            placeholder="Search portfolios..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map(portfolio => (
          <div key={portfolio.id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-gray-800">{portfolio.name}</h3>
                <p className="text-sm text-gray-500" />
                <p className="text-sm text-gray-500">by {portfolio.user}</p>
              </div>
              {portfolio.featured && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  Featured
                </span>
              )}
            </div>
            <div className="text-sm text-gray-600 mb-4">
              <p>{portfolio.views} views</p>
              <p className="text-gray-500">{new Date(portfolio.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 text-sm">
                {portfolio.featured ? 'Unfeature' : 'Feature'}
              </button>
              <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                View
              </button>
              <button className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;