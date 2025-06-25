import React, { useState } from 'react';
import { FolderSync as Sync, CheckCircle, AlertCircle, Clock, Database, Users, ShoppingCart, Package, Activity, Play, Pause, RotateCcw, Settings as SettingsIcon } from 'lucide-react';

const DataSync = () => {
  const [syncStatus, setSyncStatus] = useState('active');

  const syncConnections = [
    {
      id: 1,
      name: 'Customer Data',
      source: 'Shopify',
      destination: 'Salesforce',
      status: 'synced',
      lastSync: '2 minutes ago',
      records: 12847,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 2,
      name: 'Order Data',
      source: 'Shopify',
      destination: 'Salesforce',
      status: 'syncing',
      lastSync: 'In progress',
      records: 3264,
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 3,
      name: 'Product Catalog',
      source: 'Shopify',
      destination: 'Salesforce',
      status: 'error',
      lastSync: '1 hour ago',
      records: 847,
      icon: Package,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      id: 4,
      name: 'Lead Data',
      source: 'Salesforce',
      destination: 'Shopify',
      status: 'synced',
      lastSync: '15 minutes ago',
      records: 1523,
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const recentSyncLogs = [
    { id: 1, type: 'success', message: 'Customer sync completed successfully', timestamp: '10:45 AM', records: 156 },
    { id: 2, type: 'info', message: 'Order sync started', timestamp: '10:43 AM', records: 0 },
    { id: 3, type: 'error', message: 'Product sync failed - API rate limit exceeded', timestamp: '10:40 AM', records: 0 },
    { id: 4, type: 'success', message: 'Lead data synchronized', timestamp: '10:35 AM', records: 23 },
    { id: 5, type: 'success', message: 'Automated customer segmentation updated', timestamp: '10:30 AM', records: 2847 }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'synced':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'syncing':
        return <Clock className="w-5 h-5 text-blue-600 animate-spin" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'synced':
        return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Synced</span>;
      case 'syncing':
        return <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Syncing</span>;
      case 'error':
        return <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">Error</span>;
      default:
        return <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">Idle</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data Synchronization</h1>
          <p className="text-gray-600 mt-2">Monitor and manage data sync between Shopify and Salesforce</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center">
            <Play className="w-4 h-4 mr-2" />
            Start Sync
          </button>
          <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors flex items-center">
            <Pause className="w-4 h-4 mr-2" />
            Pause All
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <SettingsIcon className="w-4 h-4 mr-2" />
            Configure
          </button>
        </div>
      </div>

      {/* Sync Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Active Syncs</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">2</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Sync className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Records Synced</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">18.5K</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Database className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Sync Errors</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">3</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Success Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">98.2%</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Sync Connections */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Sync Connections</h2>
          <p className="text-gray-600 mt-1">Active data synchronization channels</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {syncConnections.map((connection) => (
              <div key={connection.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-lg ${connection.bgColor} flex items-center justify-center mr-4`}>
                      <connection.icon className={`w-6 h-6 ${connection.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{connection.name}</h3>
                      <p className="text-sm text-gray-600">{connection.source} → {connection.destination}</p>
                    </div>
                  </div>
                  {getStatusBadge(connection.status)}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {getStatusIcon(connection.status)}
                    <span className="ml-2 text-sm text-gray-600">Last sync: {connection.lastSync}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{connection.records.toLocaleString()} records</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <Play className="w-4 h-4 mr-1" />
                    Sync Now
                  </button>
                  <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    <SettingsIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sync Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Sync Activity</h2>
            <button className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              View All Logs
            </button>
          </div>
          <div className="space-y-4">
            {recentSyncLogs.map((log) => (
              <div key={log.id} className="flex items-start p-4 border border-gray-200 rounded-lg">
                <div className={`p-2 rounded-full mr-4 ${
                  log.type === 'success' ? 'bg-green-100 text-green-600' :
                  log.type === 'error' ? 'bg-red-100 text-red-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {log.type === 'success' ? <CheckCircle className="w-4 h-4" /> :
                   log.type === 'error' ? <AlertCircle className="w-4 h-4" /> :
                   <Clock className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{log.message}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-500">{log.timestamp}</p>
                    {log.records > 0 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {log.records} records
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sync Settings */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sync Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sync Frequency</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg text-sm">
                  <option>Every 15 minutes</option>
                  <option>Every 30 minutes</option>
                  <option>Every hour</option>
                  <option>Every 6 hours</option>
                  <option>Daily</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Retry Failed Syncs</label>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm text-gray-600">Auto-retry up to 3 times</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Notifications</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-sm text-gray-600">Sync failures</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-600">Daily summary</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Health</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Data Consistency</span>
                <span className="text-green-600 font-medium">Good</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">API Rate Limit</span>
                <span className="text-yellow-600 font-medium">65/100</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Storage Usage</span>
                <span className="text-blue-600 font-medium">2.4 GB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSync;