import React, { useState, useEffect } from 'react';
import { Users, Folder, Palette, TrendingUp, Activity, Eye } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 1250,
    totalPortfolios: 3420,
    totalTemplates: 15,
    activeUsers: 892,
    todayViews: 5234,
    monthlyGrowth: 12.5
  });

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'bg-blue-500', change: '+12%' },
    { label: 'Portfolios', value: stats.totalPortfolios, icon: Folder, color: 'bg-green-500', change: '+8%' },
    { label: 'Templates', value: stats.totalTemplates, icon: Palette, color: 'bg-purple-500', change: '+2' },
    { label: 'Active Users', value: stats.activeUsers, icon: Activity, color: 'bg-orange-500', change: '+15%' },
    { label: 'Today Views', value: stats.todayViews, icon: Eye, color: 'bg-pink-500', change: '+24%' },
    { label: 'Monthly Growth', value: `${stats.monthlyGrowth}%`, icon: TrendingUp, color: 'bg-indigo-500', change: '+3%' }
  ];

  const recentActivities = [
    { user: 'John Doe', action: 'created a new portfolio', time: '2 minutes ago', type: 'create' },
    { user: 'Jane Smith', action: 'updated their profile', time: '5 minutes ago', type: 'update' },
    { user: 'Mike Johnson', action: 'exported portfolio', time: '10 minutes ago', type: 'export' },
    { user: 'Sarah Williams', action: 'deleted a portfolio', time: '15 minutes ago', type: 'delete' },
    { user: 'Tom Brown', action: 'registered an account', time: '20 minutes ago', type: 'register' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Monitor your platform's performance and activity</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
            </div>
            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-800">{stat.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-semibold text-gray-800">{activity.user}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{activity.time}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    activity.type === 'create' ? 'bg-green-100 text-green-700' :
                    activity.type === 'update' ? 'bg-blue-100 text-blue-700' :
                    activity.type === 'delete' ? 'bg-red-100 text-red-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {activity.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Popular Templates</h3>
          <div className="space-y-4">
            {[
              { name: 'Modern Portfolio', uses: 450, trend: 'up' },
              { name: 'Creative Showcase', uses: 320, trend: 'up' },
              { name: 'Minimal Design', uses: 280, trend: 'down' },
              { name: 'Professional', uses: 210, trend: 'up' }
            ].map((template, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{template.name}</p>
                  <p className="text-sm text-gray-500">{template.uses} uses</p>
                </div>
                <span className={`text-sm ${template.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {template.trend === 'up' ? '↑' : '↓'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
