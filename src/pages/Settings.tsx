import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Database,
  Shield,
  Bell,
  Users,
  Key,
  Globe,
  Zap,
  CheckCircle,
  AlertCircle,
  Save,
  RefreshCw
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('connections');

  const tabs = [
    { id: 'connections', name: 'Connections', icon: Database },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'users', name: 'Users & Permissions', icon: Users },
    { id: 'api', name: 'API Keys', icon: Key },
    { id: 'general', name: 'General', icon: SettingsIcon },
  ];

  const connections = [
    {
      name: 'Shopify Store',
      status: 'connected',
      lastSync: '2 minutes ago',
      endpoint: 'your-store.myshopify.com'
    },
    {
      name: 'Salesforce CRM',
      status: 'connected',
      lastSync: '5 minutes ago',
      endpoint: 'yourorg.salesforce.com'
    },
    {
      name: 'MongoDB Database',
      status: 'connected',
      lastSync: 'Real-time',
      endpoint: 'cluster0.mongodb.net'
    }
  ];

  const users = [
    { name: 'Admin User', email: 'admin@company.com', role: 'Administrator', status: 'active' },
    { name: 'Sales Manager', email: 'sales@company.com', role: 'Manager', status: 'active' },
    { name: 'Marketing Lead', email: 'marketing@company.com', role: 'Editor', status: 'active' },
    { name: 'Support Agent', email: 'support@company.com', role: 'Viewer', status: 'inactive' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'connections':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Platform Connections</h3>
              <div className="space-y-4">
                {connections.map((connection, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                        connection.status === 'connected' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        <Database className={`w-5 h-5 ${
                          connection.status === 'connected' ? 'text-green-600' : 'text-red-600'
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{connection.name}</h4>
                        <p className="text-sm text-gray-600">{connection.endpoint}</p>
                        <p className="text-xs text-gray-500">Last sync: {connection.lastSync}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {connection.status === 'connected' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-600" />
                      )}
                      <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded font-medium hover:bg-gray-50 transition-colors">
                        Configure
                      </button>
                      <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors">
                        Test Connection
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Sync Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sync Frequency</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg">
                      <option>Every 15 minutes</option>
                      <option>Every 30 minutes</option>
                      <option>Every hour</option>
                      <option>Every 6 hours</option>
                      <option>Daily</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Batch Size</label>
                    <input 
                      type="number" 
                      defaultValue="1000"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Records per batch"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Error Handling</label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm text-gray-600">Auto-retry failed syncs</span>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm text-gray-600">Skip invalid records</span>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm text-gray-600">Stop sync on critical errors</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Authentication & Security</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                    Enabled
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Session Timeout</h4>
                    <p className="text-sm text-gray-600">Automatically log out inactive users</p>
                  </div>
                  <select className="p-2 border border-gray-300 rounded">
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>4 hours</option>
                    <option>Never</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Data Encryption</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Data at Rest</h4>
                    <p className="text-sm text-gray-600">AES-256 encryption for stored data</p>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Data in Transit</h4>
                    <p className="text-sm text-gray-600">TLS 1.3 encryption for API communications</p>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
              <div className="space-y-4">
                {[
                  'Sync failures and errors',
                  'Daily sync summary',
                  'Weekly performance report',
                  'New user registrations',
                  'System maintenance alerts',
                  'Security notifications'
                ].map((notification, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <span className="text-gray-900">{notification}</span>
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-blue-600" 
                      defaultChecked={index < 3}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue="admin@company.com"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notification Frequency</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg">
                    <option>Immediate</option>
                    <option>Hourly digest</option>
                    <option>Daily digest</option>
                    <option>Weekly digest</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Team Members</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Invite User
              </button>
            </div>
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'api':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">API Keys</h3>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Production API Key</h4>
                    <button className="text-sm text-blue-600 hover:text-blue-800">Regenerate</button>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Used for production integrations</p>
                  <div className="flex items-center">
                    <code className="bg-gray-100 px-3 py-2 rounded text-sm font-mono flex-1">sk_prod_••••••••••••••••••••••••••••••••</code>
                    <button className="ml-2 px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">Copy</button>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Development API Key</h4>
                    <button className="text-sm text-blue-600 hover:text-blue-800">Regenerate</button>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Used for testing and development</p>
                  <div className="flex items-center">
                    <code className="bg-gray-100 px-3 py-2 rounded text-sm font-mono flex-1">sk_dev_••••••••••••••••••••••••••••••••</code>
                    <button className="ml-2 px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">Copy</button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Webhook Endpoints</h3>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Order Updates</h4>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">Active</span>
                  </div>
                  <p className="text-sm text-gray-600">https://yourapp.com/webhooks/orders</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Customer Updates</h4>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">Active</span>
                  </div>
                  <p className="text-sm text-gray-600">https://yourapp.com/webhooks/customers</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Application Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Application Name</label>
                  <input 
                    type="text" 
                    defaultValue="SalesSync Integration"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg">
                    <option>UTC-5 (Eastern Time)</option>
                    <option>UTC-6 (Central Time)</option>
                    <option>UTC-7 (Mountain Time)</option>
                    <option>UTC-8 (Pacific Time)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">System Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Auto-backup</h4>
                    <p className="text-sm text-gray-600">Automatically backup data daily</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4 text-blue-600" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Debug Mode</h4>
                    <p className="text-sm text-gray-600">Enable detailed logging for troubleshooting</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your integration settings and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <nav className="p-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-left font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-3" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            {renderTabContent()}
            
            {/* Save Button */}
            <div className="flex items-center justify-end pt-6 mt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </button>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;