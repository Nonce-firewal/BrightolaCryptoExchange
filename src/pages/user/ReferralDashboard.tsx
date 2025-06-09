import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Users, 
  Gift, 
  Copy, 
  Share2, 
  TrendingUp, 
  DollarSign,
  Award,
  Star,
  ExternalLink,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';
import AnimatedButton from '../../components/AnimatedButton';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const ReferralDashboard: React.FC = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [selectedTier, setSelectedTier] = useState(1);

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { ref: referralsRef, isVisible: referralsVisible } = useScrollAnimation();

  const referralLink = `https://brightola.com/register?ref=${user?.referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareReferral = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join Brightola Exchange',
        text: 'Start trading crypto with the best rates in Nigeria!',
        url: referralLink,
      });
    } else {
      copyToClipboard();
    }
  };

  // Mock referral data
  const referralStats = {
    totalReferrals: 12,
    activeReferrals: 8,
    totalEarnings: 125000,
    pendingEarnings: 25000,
    currentTier: 2,
    nextTierProgress: 60
  };

  const referralTiers = [
    {
      tier: 1,
      name: 'Bronze',
      minReferrals: 0,
      commission: 10,
      bonus: 5000,
      color: 'orange',
      icon: Award
    },
    {
      tier: 2,
      name: 'Silver',
      minReferrals: 10,
      commission: 15,
      bonus: 15000,
      color: 'gray',
      icon: Star
    },
    {
      tier: 3,
      name: 'Gold',
      minReferrals: 25,
      commission: 20,
      bonus: 35000,
      color: 'yellow',
      icon: Target
    },
    {
      tier: 4,
      name: 'Platinum',
      minReferrals: 50,
      commission: 25,
      bonus: 75000,
      color: 'purple',
      icon: Gift
    }
  ];

  const recentReferrals = [
    {
      id: 1,
      name: 'John D.',
      email: 'john***@gmail.com',
      status: 'active',
      joinDate: '2024-01-15',
      earnings: 15000,
      transactions: 5
    },
    {
      id: 2,
      name: 'Sarah M.',
      email: 'sarah***@yahoo.com',
      status: 'pending',
      joinDate: '2024-01-14',
      earnings: 0,
      transactions: 0
    },
    {
      id: 3,
      name: 'Mike O.',
      email: 'mike***@gmail.com',
      status: 'active',
      joinDate: '2024-01-13',
      earnings: 25000,
      transactions: 8
    },
    {
      id: 4,
      name: 'Grace A.',
      email: 'grace***@outlook.com',
      status: 'active',
      joinDate: '2024-01-12',
      earnings: 12000,
      transactions: 3
    }
  ];

  const currentTier = referralTiers.find(t => t.tier === referralStats.currentTier);
  const nextTier = referralTiers.find(t => t.tier === referralStats.currentTier + 1);

  return (
    <Layout>
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
              <h1 className="text-2xl font-bold text-white flex items-center">
                <Users className="w-8 h-8 text-purple-400 mr-3" />
                Referral Dashboard
              </h1>
              <p className="text-gray-400 mt-1">Earn rewards by inviting friends to trade crypto</p>
            </div>
            <div className="mt-4 lg:mt-0 flex space-x-3">
              <AnimatedButton
                variant="secondary"
                icon={Copy}
                onClick={copyToClipboard}
                size="sm"
              >
                {copied ? 'Copied!' : 'Copy Link'}
              </AnimatedButton>
              <AnimatedButton
                variant="primary"
                icon={Share2}
                onClick={shareReferral}
                size="sm"
              >
                Share
              </AnimatedButton>
            </div>
          </div>
        </div>

        {/* Referral Link */}
        <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Your Referral Link</h3>
              <p className="text-purple-300 text-sm mb-4">Share this link to earn commissions on every trade</p>
              <div className="flex items-center space-x-3">
                <div className="bg-gray-900 rounded-lg px-4 py-2 flex-1 max-w-md">
                  <p className="text-white font-mono text-sm break-all">{referralLink}</p>
                </div>
                <AnimatedButton
                  variant="primary"
                  icon={copied ? CheckCircle : Copy}
                  onClick={copyToClipboard}
                  size="sm"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </AnimatedButton>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center animate-pulse">
                <Gift className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div 
          ref={statsRef}
          className={`grid grid-cols-1 md:grid-cols-4 gap-6 transition-all duration-1000 delay-300 ${
            statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            {
              name: 'Total Referrals',
              value: referralStats.totalReferrals.toString(),
              icon: Users,
              color: 'blue',
              change: '+3 this month'
            },
            {
              name: 'Active Referrals',
              value: referralStats.activeReferrals.toString(),
              icon: TrendingUp,
              color: 'green',
              change: `${((referralStats.activeReferrals / referralStats.totalReferrals) * 100).toFixed(0)}% active`
            },
            {
              name: 'Total Earnings',
              value: `₦${(referralStats.totalEarnings / 1000).toFixed(0)}K`,
              icon: DollarSign,
              color: 'purple',
              change: '+₦25K this month'
            },
            {
              name: 'Pending Earnings',
              value: `₦${(referralStats.pendingEarnings / 1000).toFixed(0)}K`,
              icon: Clock,
              color: 'orange',
              change: 'Available in 7 days'
            }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.name}
                className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">{stat.name}</p>
                    <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-${stat.color}-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-500`} />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs text-gray-500">{stat.change}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tier Progress */}
          <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
              <Award className="w-5 h-5 text-yellow-400 mr-2" />
              Referral Tier Progress
            </h3>

            {/* Current Tier */}
            {currentTier && (
              <div className="bg-gray-900 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 bg-${currentTier.color}-500 rounded-full flex items-center justify-center mr-3`}>
                      <currentTier.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{currentTier.name} Tier</h4>
                      <p className="text-gray-400 text-sm">{currentTier.commission}% commission</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">₦{currentTier.bonus.toLocaleString()}</p>
                    <p className="text-gray-400 text-xs">Tier bonus</p>
                  </div>
                </div>
              </div>
            )}

            {/* Next Tier Progress */}
            {nextTier && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Progress to {nextTier.name}</span>
                  <span className="text-white text-sm">
                    {referralStats.totalReferrals}/{nextTier.minReferrals} referrals
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${(referralStats.totalReferrals / nextTier.minReferrals) * 100}%` }}
                  ></div>
                </div>
                <p className="text-gray-400 text-sm">
                  {nextTier.minReferrals - referralStats.totalReferrals} more referrals to unlock {nextTier.commission}% commission
                </p>
              </div>
            )}
          </div>

          {/* Tier Levels */}
          <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Referral Tiers</h3>
            <div className="space-y-3">
              {referralTiers.map((tier, index) => {
                const Icon = tier.icon;
                const isCurrentTier = tier.tier === referralStats.currentTier;
                const isUnlocked = tier.tier <= referralStats.currentTier;
                
                return (
                  <div 
                    key={tier.tier}
                    className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                      isCurrentTier 
                        ? 'border-purple-500 bg-purple-500/20' 
                        : isUnlocked
                        ? 'border-gray-600 bg-gray-900 hover:border-gray-500'
                        : 'border-gray-700 bg-gray-900/50 opacity-60'
                    }`}
                    onClick={() => setSelectedTier(tier.tier)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 bg-${tier.color}-500 rounded-full flex items-center justify-center ${
                          !isUnlocked ? 'opacity-50' : ''
                        }`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-medium">{tier.name}</span>
                            {isCurrentTier && (
                              <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded-full">Current</span>
                            )}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {tier.minReferrals}+ referrals • {tier.commission}% commission
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">₦{tier.bonus.toLocaleString()}</div>
                        <div className="text-gray-400 text-xs">Bonus</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Referrals */}
        <div 
          ref={referralsRef}
          className={`bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6 transition-all duration-1000 delay-500 ${
            referralsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Recent Referrals</h3>
            <AnimatedButton
              variant="secondary"
              icon={ExternalLink}
              size="sm"
            >
              View All
            </AnimatedButton>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Transactions
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Earnings
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {recentReferrals.map((referral, index) => (
                  <tr 
                    key={referral.id} 
                    className="hover:bg-gray-700/50 transition-all duration-300 animate-slideInFromLeft"
                    style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-white">{referral.name}</div>
                        <div className="text-sm text-gray-400">{referral.email}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                        referral.status === 'active' 
                          ? 'text-green-400 bg-green-900/20 border border-green-700'
                          : 'text-yellow-400 bg-yellow-900/20 border border-yellow-700'
                      }`}>
                        {referral.status === 'active' ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <Clock className="w-3 h-3 mr-1" />
                        )}
                        {referral.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-400">
                      {new Date(referral.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-white">
                      {referral.transactions}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-white font-medium">
                      ₦{referral.earnings.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">How Referrals Work</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: 1,
                title: 'Share Your Link',
                description: 'Share your unique referral link with friends and family',
                icon: Share2,
                color: 'blue'
              },
              {
                step: 2,
                title: 'They Sign Up',
                description: 'When someone signs up using your link, they become your referral',
                icon: Users,
                color: 'green'
              },
              {
                step: 3,
                title: 'Earn Commissions',
                description: 'Earn a percentage of their trading fees for every transaction',
                icon: DollarSign,
                color: 'purple'
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.step}
                  className="text-center p-4 rounded-lg bg-gray-900 border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`w-12 h-12 bg-${item.color}-500 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideInFromLeft {
          animation: slideInFromLeft 0.6s ease-out;
        }
      `}</style>
    </Layout>
  );
};

export default ReferralDashboard;