import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Download,
  Filter,
  Eye,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';

const Reporting = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  const salesData = [
    { name: 'Jan', shopify: 4000, salesforce: 2400, leads: 800 },
    { name: 'Feb', shopify: 3000, salesforce: 1398, leads: 967 },
    { name: 'Mar', shopify: 2000, salesforce: 9800, leads: 1200 },
    { name: 'Apr', shopify: 2780, salesforce: 3908, leads: 1050 },
    { name: 'May', shopify: 1890, salesforce: 4800, leads: 1400 },
    { name: 'Jun', shopify: 2390, salesforce: 3800, leads: 1100 },
  ];

  const customerSegments = [
    { name: 'New Customers', value: 45, color: '#3B82F6' },
    { name: 'Returning Customers', value: 35, color: '#10B981' },
    { name: 'VIP Customers', value: 15, color: '#F59E0B' },
    { name: 'Inactive', value: 5, color: '#EF4444' },
  ];

  const conversionData = [
    { name: 'Week 1', visitors: 4000, leads: 800, customers: 240 },
    { name: 'Week 2', visitors: 3500, leads: 750, customers: 220 },
    { name: 'Week 3', visitors: 4200, leads: 920, customers: 280 },
    { name: 'Week 4', visitors: 3800, leads: 850, customers: 260 },
  ];

  const reports = [
    {
      id: 1,
      name: 'Monthly Sales Performance',
      description: 'Comprehensive analysis of sales across all channels',
      generated: '2 hours ago',
      type: 'sales',
      status: 'ready'
    },
    {
      id: 2,
      name: 'Customer Behavior Analysis',
      description: 'Deep dive into customer journey and touchpoints',
      generated: '1 day ago',
      type: 'behavior',
      status: 'ready'
    },
    {
      id: 3,
      name: 'Lead Conversion Report',
      description: 'Analysis of lead quality and conversion rates',
      generated: '3 hours ago',
      type: 'conversion',
      status: 'ready'
    },
    {
      id: 4,
      name: 'Product Performance Dashboard',
      description: 'Top performing products and inventory insights',
      generated: 'Generating...',
      type: 'product',
      status: 'processing'
    }
  ];

  const kpiData = [
    { name: 'Revenue', value: '$124,590', change: 12.5, trend: 'up', color: 'text-green-600' },
    { name: 'Conversion Rate', value: '3.2%', change: -2.1, trend: 'down', color: 'text-red-600' },
    { name: 'Avg Order Value', value: '$89.50', change: 8.3, trend: 'up', color: 'text-green-600' },
    { name: 'Customer LTV', value: '$340', change: 15.7, trend: 'up', color: 'text-green-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-2">Comprehensive insights and business intelligence</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">{kpi.name}</h3>
              <DollarSign className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
                <p className={`text-sm font-medium mt-2 flex items-center ${kpi.color}`}>
                  {kpi.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 mr-1" />
                  )}
                  {Math.abs(kpi.change)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Performance */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Sales Performance</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-gray-600">Shopify</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-gray-600">Salesforce</span>
              </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="shopify"
                  stackId="1"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="salesforce"
                  stackId="1"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Segments */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer Segments</h3>
          <div className="flex items-center">
            <div className="h-80 w-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerSegments}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {customerSegments.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="ml-6 space-y-4">
              {customerSegments.map((segment, index) => (
                <div key={index} className="flex items-center justify-between min-w-0">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-3"
                      style={{ backgroundColor: segment.color }}
                    ></div>
                    <span className="text-gray-700 text-sm">{segment.name}</span>
                  </div>
                  <span className="text-gray-900 font-medium">{segment.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Conversion Funnel</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="visitors" fill="#E5E7EB" name="Visitors" />
              <Bar dataKey="leads" fill="#3B82F6" name="Leads" />
              <Bar dataKey="customers" fill="#10B981" name="Customers" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Generated Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Generated Reports</h2>
              <p className="text-gray-600 mt-1">Access your detailed business reports</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Generate New Report
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reports.map((report) => (
              <div key={report.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{report.name}</h3>
                      <p className="text-sm text-gray-600">{report.description}</p>
                    </div>
                  </div>
                  {report.status === 'ready' ? (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">Ready</span>
                  ) : (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">Processing</span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Generated: {report.generated}</p>
                  {report.status === 'ready' ? (
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                      <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded font-medium hover:bg-gray-50 transition-colors flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </button>
                    </div>
                  ) : (
                    <div className="w-6 h-6">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reporting;