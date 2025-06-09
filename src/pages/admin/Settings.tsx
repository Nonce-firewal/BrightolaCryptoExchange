import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { 
  Save, 
  Shield, 
  Bell, 
  DollarSign, 
  Globe, 
  Key,
  Mail,
  Smartphone,
  AlertTriangle
} from 'lucide-react';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    // Platform Settings
    platformName: 'Brightola Exchange',
    platformUrl: 'https://brightola.com',
    supportEmail: 'support@brightola.com',
    
    // Trading Settings
    defaultBuyMargin: 2.0,
    defaultSellMargin: 2.0,
    maxDailyVolume: 100000000,
    minTransactionAmount: 1000,
    
    // Security Settings
    mfaRequired: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    webhookUrl: '',
    
    // KYC Settings
    autoKycApproval: false,
    kycExpiryDays: 365,
    requiredDocuments: ['id', 'selfie', 'address']
  });

  const [activeTab, setActiveTab] = useState('platform');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Simulate save operation
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const tabs = [
    { id: 'platform', name: 'Platform', icon: Globe },
    { id: 'trading', name: 'Trading', icon: DollarSign },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'kyc', name: 'KYC', icon: Key }
  ];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Platform Settings</h1>
              <p className="text-gray-400 mt-1">Configure your exchange platform settings</p>
            </div>
            <div className="mt-4 lg:mt-0">
              <button 
                onClick={handleSave}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  saved 
                    ? 'bg-green-600 text-white' 
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
              >
                <Save className="w-4 h-4 mr-2" />
                {saved ? 'Saved!' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-orange-500 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
              {activeTab === 'platform' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white">Platform Configuration</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Platform Name
                      </label>
                      <input
                        type="text"
                        value={settings.platformName}
                        onChange={(e) => updateSetting('platformName', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Platform URL
                      </label>
                      <input
                        type="url"
                        value={settings.platformUrl}
                        onChange={(e) => updateSetting('platformUrl', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Support Email
                      </label>
                      <input
                        type="email"
                        value={settings.supportEmail}
                        onChange={(e) => updateSetting('supportEmail', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'trading' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white">Trading Configuration</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Default Buy Margin (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={settings.defaultBuyMargin}
                        onChange={(e) => updateSetting('defaultBuyMargin', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Default Sell Margin (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={settings.defaultSellMargin}
                        onChange={(e) => updateSetting('defaultSellMargin', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Max Daily Volume (NGN)
                      </label>
                      <input
                        type="number"
                        value={settings.maxDailyVolume}
                        onChange={(e) => updateSetting('maxDailyVolume', parseInt(e.target.value))}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Min Transaction Amount (NGN)
                      </label>
                      <input
                        type="number"
                        value={settings.minTransactionAmount}
                        onChange={(e) => updateSetting('minTransactionAmount', parseInt(e.target.value))}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white">Security Settings</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-700">
                      <div>
                        <h3 className="text-white font-medium">Require MFA for Admin</h3>
                        <p className="text-gray-400 text-sm">Enforce multi-factor authentication for all admin accounts</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.mfaRequired}
                          onChange={(e) => updateSetting('mfaRequired', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                      </label>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Session Timeout (minutes)
                        </label>
                        <input
                          type="number"
                          value={settings.sessionTimeout}
                          onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
                          className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Max Login Attempts
                        </label>
                        <input
                          type="number"
                          value={settings.maxLoginAttempts}
                          onChange={(e) => updateSetting('maxLoginAttempts', parseInt(e.target.value))}
                          className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white">Notification Settings</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-700">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-blue-400 mr-3" />
                        <div>
                          <h3 className="text-white font-medium">Email Notifications</h3>
                          <p className="text-gray-400 text-sm">Receive notifications via email</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.emailNotifications}
                          onChange={(e) => updateSetting('emailNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-700">
                      <div className="flex items-center">
                        <Smartphone className="w-5 h-5 text-green-400 mr-3" />
                        <div>
                          <h3 className="text-white font-medium">SMS Notifications</h3>
                          <p className="text-gray-400 text-sm">Receive notifications via SMS</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.smsNotifications}
                          onChange={(e) => updateSetting('smsNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                      </label>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Webhook URL
                      </label>
                      <input
                        type="url"
                        value={settings.webhookUrl}
                        onChange={(e) => updateSetting('webhookUrl', e.target.value)}
                        placeholder="https://your-webhook-url.com"
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'kyc' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white">KYC Settings</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-700">
                      <div className="flex items-center">
                        <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3" />
                        <div>
                          <h3 className="text-white font-medium">Auto KYC Approval</h3>
                          <p className="text-gray-400 text-sm">Automatically approve KYC submissions (not recommended)</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.autoKycApproval}
                          onChange={(e) => updateSetting('autoKycApproval', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                      </label>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        KYC Expiry (days)
                      </label>
                      <input
                        type="number"
                        value={settings.kycExpiryDays}
                        onChange={(e) => updateSetting('kycExpiryDays', parseInt(e.target.value))}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;