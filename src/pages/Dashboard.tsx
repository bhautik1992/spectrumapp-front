import React from 'react';
import { TrendingUp, Users, ShoppingCart, FolderSync as Sync, AlertCircle, CheckCircle, Clock, ArrowUpRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const statsData = [
    { name: 'Jan', shopify: 4000, salesforce: 2400 },
    { name: 'Feb', shopify: 3000, salesforce: 1398 },
    { name: 'Mar', shopify: 2000, salesforce: 9800 },
    { name: 'Apr', shopify: 2780, salesforce: 3908 },
    { name: 'May', shopify: 1890, salesforce: 4800 },
    { name: 'Jun', shopify: 2390, salesforce: 3800 },
  ];

  const phaseData = [
    { name: 'Completed', value: 60, color: '#10B981' },
    { name: 'In Progress', value: 30, color: '#F59E0B' },
    { name: 'Pending', value: 10, color: '#EF4444' },
  ];

  const recentActivities = [
    { id: 1, action: 'Customer sync completed', time: '2 minutes ago', type: 'success' },
    { id: 2, action: 'New lead converted', time: '15 minutes ago', type: 'info' },
    { id: 3, action: 'Order sync in progress', time: '30 minutes ago', type: 'warning' },
    { id: 4, action: 'Weekly report generated', time: '1 hour ago', type: 'success' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Integration Dashboard</h1>
        <p className="text-gray-600 mt-2">Monitor your Shopify-Salesforce integration performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Customers</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">12,847</p>
              <p className="text-green-600 text-sm font-medium mt-2 flex items-center">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                +12.5%
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Orders Synced</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">3,264</p>
              <p className="text-green-600 text-sm font-medium mt-2 flex items-center">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                +8.2%
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Active Syncs</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">847</p>
              <p className="text-yellow-600 text-sm font-medium mt-2 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Processing
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Sync className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Success Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">98.5%</p>
              <p className="text-green-600 text-sm font-medium mt-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                Excellent
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sync Performance Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Sync Performance</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-gray-600">Shopify</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-gray-600">Salesforce</span>
              </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={statsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="shopify" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="salesforce" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Phase Progress */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Phase Progress</h3>
          <div className="h-48 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={phaseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {phaseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {phaseData.map((phase, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: phase.color }}
                  ></div>
                  <span className="text-gray-700 text-sm">{phase.name}</span>
                </div>
                <span className="text-gray-900 font-medium">{phase.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-100 text-green-600' :
                  activity.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {activity.type === 'success' ? <CheckCircle className="w-4 h-4" /> :
                   activity.type === 'warning' ? <AlertCircle className="w-4 h-4" /> :
                   <Sync className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{activity.action}</p>
                  <p className="text-gray-500 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <Sync className="w-6 h-6 text-blue-600 mb-2" />
              <p className="font-medium text-gray-900">Force Sync</p>
              <p className="text-sm text-gray-500">Manual sync trigger</p>
            </button>
            <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
              <Users className="w-6 h-6 text-green-600 mb-2" />
              <p className="font-medium text-gray-900">Export Data</p>
              <p className="text-sm text-gray-500">Download reports</p>
            </button>
            <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
              <CheckCircle className="w-6 h-6 text-purple-600 mb-2" />
              <p className="font-medium text-gray-900">Run Tests</p>
              <p className="text-sm text-gray-500">Validate integration</p>
            </button>
            <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-colors">
              <AlertCircle className="w-6 h-6 text-yellow-600 mb-2" />
              <p className="font-medium text-gray-900">View Logs</p>
              <p className="text-sm text-gray-500">Check system logs</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;