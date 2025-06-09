import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useAdmin } from '../../contexts/AdminContext';
import { 
  Plus, 
  Edit, 
  Trash2, 
  ToggleLeft, 
  ToggleRight,
  Banknote,
  Wallet,
  Copy,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Network,
  Building
} from 'lucide-react';
import AnimatedButton from '../../components/AnimatedButton';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const BankWalletManagement: React.FC = () => {
  const { 
    settings, 
    updateBankAccount, 
    addBankAccount, 
    deleteBankAccount,
    updateWalletAddress,
    addWalletAddress,
    deleteWalletAddress,
    getActiveBankAccounts
  } = useAdmin();

  const [activeTab, setActiveTab] = useState<'banks' | 'wallets'>('banks');
  const [showAddBankModal, setShowAddBankModal] = useState(false);
  const [showAddWalletModal, setShowAddWalletModal] = useState(false);
  const [editingBank, setEditingBank] = useState<any>(null);
  const [editingWallet, setEditingWallet] = useState<any>(null);
  const [showAddresses, setShowAddresses] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<string | null>(null);

  const [bankForm, setBankForm] = useState({
    bankName: '',
    accountName: '',
    accountNumber: '',
    isActive: true
  });

  const [walletForm, setWalletForm] = useState({
    cryptocurrency: 'BTC',
    network: 'Bitcoin',
    address: '',
    isActive: true
  });

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggleAddressVisibility = (id: string) => {
    setShowAddresses(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddBank = () => {
    addBankAccount(bankForm);
    setBankForm({ bankName: '', accountName: '', accountNumber: '', isActive: true });
    setShowAddBankModal(false);
  };

  const handleEditBank = () => {
    if (editingBank) {
      updateBankAccount(editingBank);
      setEditingBank(null);
    }
  };

  const handleAddWallet = () => {
    addWalletAddress(walletForm);
    setWalletForm({ cryptocurrency: 'BTC', network: 'Bitcoin', address: '', isActive: true });
    setShowAddWalletModal(false);
  };

  const handleEditWallet = () => {
    if (editingWallet) {
      updateWalletAddress(editingWallet);
      setEditingWallet(null);
    }
  };

  const toggleBankStatus = (bank: any) => {
    updateBankAccount({ ...bank, isActive: !bank.isActive });
  };

  const toggleWalletStatus = (wallet: any) => {
    updateWalletAddress({ ...wallet, isActive: !wallet.isActive });
  };

  const cryptoOptions = [
    { value: 'BTC', label: 'Bitcoin', networks: ['Bitcoin'] },
    { value: 'ETH', label: 'Ethereum', networks: ['Ethereum'] },
    { value: 'USDT', label: 'Tether', networks: ['Ethereum (ERC-20)', 'Tron (TRC-20)', 'Binance Smart Chain (BEP-20)'] },
    { value: 'SOL', label: 'Solana', networks: ['Solana'] },
    { value: 'BNB', label: 'Binance Coin', networks: ['Binance Smart Chain'] },
    { value: 'ADA', label: 'Cardano', networks: ['Cardano'] }
  ];

  const activeBanks = getActiveBankAccounts();
  const activeWallets = settings.walletAddresses.filter(w => w.isActive);

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Bank & Wallet Management</h1>
              <p className="text-gray-400 mt-1">Manage payment methods and crypto wallet addresses</p>
            </div>
            <div className="mt-4 lg:mt-0 flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-gray-300">Active Banks: {activeBanks.length}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                  <span className="text-gray-300">Active Wallets: {activeWallets.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('banks')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'banks'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Building className="w-4 h-4 mr-2" />
              Bank Accounts ({settings.bankAccounts.length})
            </button>
            <button
              onClick={() => setActiveTab('wallets')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'wallets'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Wallet className="w-4 h-4 mr-2" />
              Wallet Addresses ({settings.walletAddresses.length})
            </button>
          </div>

          <div 
            ref={contentRef}
            className={`transition-all duration-1000 delay-300 ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {activeTab === 'banks' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">Bank Accounts</h2>
                  <AnimatedButton
                    variant="primary"
                    icon={Plus}
                    onClick={() => setShowAddBankModal(true)}
                  >
                    Add Bank Account
                  </AnimatedButton>
                </div>

                {/* Bank Accounts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {settings.bankAccounts.map((bank, index) => (
                    <div 
                      key={bank.id}
                      className="bg-gray-900 rounded-lg border border-gray-700 p-6 hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-2"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mr-3">
                            <Banknote className="w-5 h-5 text-green-500" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">{bank.bankName}</h3>
                            <p className="text-gray-400 text-sm">{bank.accountName}</p>
                          </div>
                        </div>
                        <button onClick={() => toggleBankStatus(bank)}>
                          {bank.isActive ? (
                            <ToggleRight className="w-6 h-6 text-green-400" />
                          ) : (
                            <ToggleLeft className="w-6 h-6 text-gray-400" />
                          )}
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Account Number:</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-mono">{bank.accountNumber}</span>
                            <button
                              onClick={() => copyToClipboard(bank.accountNumber, bank.id)}
                              className="text-gray-400 hover:text-orange-500 transition-colors"
                            >
                              {copied === bank.id ? (
                                <CheckCircle className="w-4 h-4 text-green-400" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Status:</span>
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full border ${
                            bank.isActive 
                              ? 'text-green-400 bg-green-900/20 border-green-700'
                              : 'text-red-400 bg-red-900/20 border-red-700'
                          }`}>
                            {bank.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Created:</span>
                          <span className="text-white text-sm">
                            {new Date(bank.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-700">
                        <AnimatedButton
                          variant="secondary"
                          icon={Edit}
                          size="sm"
                          onClick={() => setEditingBank(bank)}
                          className="flex-1"
                        >
                          Edit
                        </AnimatedButton>
                        <AnimatedButton
                          variant="danger"
                          icon={Trash2}
                          size="sm"
                          onClick={() => deleteBankAccount(bank.id)}
                          className="flex-1"
                        >
                          Delete
                        </AnimatedButton>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'wallets' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">Wallet Addresses</h2>
                  <AnimatedButton
                    variant="primary"
                    icon={Plus}
                    onClick={() => setShowAddWalletModal(true)}
                  >
                    Add Wallet Address
                  </AnimatedButton>
                </div>

                {/* Wallet Addresses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {settings.walletAddresses.map((wallet, index) => (
                    <div 
                      key={wallet.id}
                      className="bg-gray-900 rounded-lg border border-gray-700 p-6 hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-2"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-blue-500 font-bold text-sm">{wallet.cryptocurrency}</span>
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">{wallet.cryptocurrency}</h3>
                            <p className="text-gray-400 text-sm">{wallet.network}</p>
                          </div>
                        </div>
                        <button onClick={() => toggleWalletStatus(wallet)}>
                          {wallet.isActive ? (
                            <ToggleRight className="w-6 h-6 text-green-400" />
                          ) : (
                            <ToggleLeft className="w-6 h-6 text-gray-400" />
                          )}
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Wallet Address:</span>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => toggleAddressVisibility(wallet.id)}
                                className="text-gray-400 hover:text-orange-500 transition-colors"
                              >
                                {showAddresses[wallet.id] ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </button>
                              <button
                                onClick={() => copyToClipboard(wallet.address, wallet.id)}
                                className="text-gray-400 hover:text-orange-500 transition-colors"
                              >
                                {copied === wallet.id ? (
                                  <CheckCircle className="w-4 h-4 text-green-400" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="bg-gray-800 rounded p-3 break-all">
                            <span className="text-white font-mono text-sm">
                              {showAddresses[wallet.id] 
                                ? wallet.address 
                                : wallet.address.substring(0, 8) + '...' + wallet.address.substring(wallet.address.length - 8)
                              }
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Network:</span>
                          <div className="flex items-center">
                            <Network className="w-4 h-4 text-blue-400 mr-1" />
                            <span className="text-white text-sm">{wallet.network}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Status:</span>
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full border ${
                            wallet.isActive 
                              ? 'text-green-400 bg-green-900/20 border-green-700'
                              : 'text-red-400 bg-red-900/20 border-red-700'
                          }`}>
                            {wallet.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">Created:</span>
                          <span className="text-white text-sm">
                            {new Date(wallet.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-700">
                        <AnimatedButton
                          variant="secondary"
                          icon={Edit}
                          size="sm"
                          onClick={() => setEditingWallet(wallet)}
                          className="flex-1"
                        >
                          Edit
                        </AnimatedButton>
                        <AnimatedButton
                          variant="danger"
                          icon={Trash2}
                          size="sm"
                          onClick={() => deleteWalletAddress(wallet.id)}
                          className="flex-1"
                        >
                          Delete
                        </AnimatedButton>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Add Bank Modal */}
        {showAddBankModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-6">Add Bank Account</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bank Name</label>
                  <input
                    type="text"
                    value={bankForm.bankName}
                    onChange={(e) => setBankForm({...bankForm, bankName: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., First Bank of Nigeria"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Account Name</label>
                  <input
                    type="text"
                    value={bankForm.accountName}
                    onChange={(e) => setBankForm({...bankForm, accountName: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Brightola Exchange Limited"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Account Number</label>
                  <input
                    type="text"
                    value={bankForm.accountNumber}
                    onChange={(e) => setBankForm({...bankForm, accountNumber: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., 2034567890"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Active</span>
                  <button onClick={() => setBankForm({...bankForm, isActive: !bankForm.isActive})}>
                    {bankForm.isActive ? (
                      <ToggleRight className="w-6 h-6 text-green-400" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <AnimatedButton
                  variant="secondary"
                  onClick={() => setShowAddBankModal(false)}
                  className="flex-1"
                >
                  Cancel
                </AnimatedButton>
                <AnimatedButton
                  variant="primary"
                  onClick={handleAddBank}
                  disabled={!bankForm.bankName || !bankForm.accountName || !bankForm.accountNumber}
                  className="flex-1"
                >
                  Add Bank
                </AnimatedButton>
              </div>
            </div>
          </div>
        )}

        {/* Add Wallet Modal */}
        {showAddWalletModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-6">Add Wallet Address</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Cryptocurrency</label>
                  <select
                    value={walletForm.cryptocurrency}
                    onChange={(e) => {
                      const crypto = cryptoOptions.find(c => c.value === e.target.value);
                      setWalletForm({
                        ...walletForm, 
                        cryptocurrency: e.target.value,
                        network: crypto?.networks[0] || ''
                      });
                    }}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {cryptoOptions.map(crypto => (
                      <option key={crypto.value} value={crypto.value}>{crypto.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Network</label>
                  <select
                    value={walletForm.network}
                    onChange={(e) => setWalletForm({...walletForm, network: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {cryptoOptions.find(c => c.value === walletForm.cryptocurrency)?.networks.map(network => (
                      <option key={network} value={network}>{network}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Wallet Address</label>
                  <textarea
                    value={walletForm.address}
                    onChange={(e) => setWalletForm({...walletForm, address: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                    rows={3}
                    placeholder="Enter wallet address"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Active</span>
                  <button onClick={() => setWalletForm({...walletForm, isActive: !walletForm.isActive})}>
                    {walletForm.isActive ? (
                      <ToggleRight className="w-6 h-6 text-green-400" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <AnimatedButton
                  variant="secondary"
                  onClick={() => setShowAddWalletModal(false)}
                  className="flex-1"
                >
                  Cancel
                </AnimatedButton>
                <AnimatedButton
                  variant="primary"
                  onClick={handleAddWallet}
                  disabled={!walletForm.address}
                  className="flex-1"
                >
                  Add Wallet
                </AnimatedButton>
              </div>
            </div>
          </div>
        )}

        {/* Edit Bank Modal */}
        {editingBank && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-6">Edit Bank Account</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bank Name</label>
                  <input
                    type="text"
                    value={editingBank.bankName}
                    onChange={(e) => setEditingBank({...editingBank, bankName: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Account Name</label>
                  <input
                    type="text"
                    value={editingBank.accountName}
                    onChange={(e) => setEditingBank({...editingBank, accountName: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Account Number</label>
                  <input
                    type="text"
                    value={editingBank.accountNumber}
                    onChange={(e) => setEditingBank({...editingBank, accountNumber: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Active</span>
                  <button onClick={() => setEditingBank({...editingBank, isActive: !editingBank.isActive})}>
                    {editingBank.isActive ? (
                      <ToggleRight className="w-6 h-6 text-green-400" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <AnimatedButton
                  variant="secondary"
                  onClick={() => setEditingBank(null)}
                  className="flex-1"
                >
                  Cancel
                </AnimatedButton>
                <AnimatedButton
                  variant="primary"
                  onClick={handleEditBank}
                  className="flex-1"
                >
                  Update Bank
                </AnimatedButton>
              </div>
            </div>
          </div>
        )}

        {/* Edit Wallet Modal */}
        {editingWallet && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-6">Edit Wallet Address</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Cryptocurrency</label>
                  <select
                    value={editingWallet.cryptocurrency}
                    onChange={(e) => setEditingWallet({...editingWallet, cryptocurrency: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {cryptoOptions.map(crypto => (
                      <option key={crypto.value} value={crypto.value}>{crypto.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Network</label>
                  <input
                    type="text"
                    value={editingWallet.network}
                    onChange={(e) => setEditingWallet({...editingWallet, network: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Wallet Address</label>
                  <textarea
                    value={editingWallet.address}
                    onChange={(e) => setEditingWallet({...editingWallet, address: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                    rows={3}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Active</span>
                  <button onClick={() => setEditingWallet({...editingWallet, isActive: !editingWallet.isActive})}>
                    {editingWallet.isActive ? (
                      <ToggleRight className="w-6 h-6 text-green-400" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <AnimatedButton
                  variant="secondary"
                  onClick={() => setEditingWallet(null)}
                  className="flex-1"
                >
                  Cancel
                </AnimatedButton>
                <AnimatedButton
                  variant="primary"
                  onClick={handleEditWallet}
                  className="flex-1"
                >
                  Update Wallet
                </AnimatedButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default BankWalletManagement;