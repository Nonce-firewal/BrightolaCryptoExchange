import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  TrendingUp, 
  Users, 
  Clock, 
  ArrowRight, 
  CheckCircle,
  Smartphone,
  Globe,
  Lock,
  Star,
  Play,
  Menu,
  X,
  Zap,
  Award,
  BarChart3,
  HeadphonesIcon,
  UserCheck
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const features = [
    {
      icon: Shield,
      title: 'Safe and Secure',
      description: 'Your data is safe and secured with us. None of your data is shared with a third party company'
    },
    {
      icon: Smartphone,
      title: 'Easy to Use',
      description: 'The platform is designed to be as simple as possible so our users can trade with ease.'
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Customer Support',
      description: 'Our customer support team is available round the clock to assist you with any queries.'
    },
    {
      icon: UserCheck,
      title: 'Customer Friendly',
      description: 'We prioritize our customers and ensure they have the best trading experience possible.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="text-2xl font-bold">
                <span className="text-white">BRIGHTOLA</span>
                <span className="text-orange-500">X</span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
            </nav>

            <div className="hidden md:flex space-x-4">
              <Link
                to="/login"
                className="text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800">
              <nav className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
                <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-800">
                  <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
                  <Link to="/register" className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors text-center">Get Started</Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Buy and Sell
              <br />
              <span className="text-orange-500">Cryptocurrency</span>
              <br />
              easily with Bank
              <br />
              Transfer
            </h1>
            
            {/* CTA Button */}
            <Link
              to="/register"
              className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors mb-16"
            >
              Trade Crypto
            </Link>

            {/* Half Phone Mockup - Only showing top portion */}
            <div className="flex justify-center mb-16">
              <div className="relative">
                {/* Phone Frame - Only top half visible */}
                <div className="w-80 h-80 bg-gray-800 rounded-t-[3rem] p-3 shadow-2xl border-4 border-gray-700 border-b-0 overflow-hidden">
                  <div className="w-full h-full bg-gray-900 rounded-t-[2.5rem] overflow-hidden relative">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center px-6 py-3 text-sm text-white bg-gray-900">
                      <span>08:31</span>
                      <div className="text-center text-xs text-gray-400">
                        brightola.com.ng
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>
                        <div className="w-6 h-3 border border-white rounded-sm">
                          <div className="w-4 h-2 bg-green-500 rounded-sm m-0.5"></div>
                        </div>
                      </div>
                    </div>

                    {/* App Header */}
                    <div className="bg-gray-900 px-6 py-4 flex justify-between items-center border-b border-gray-800">
                      <div className="text-xl font-bold">
                        <span className="text-white">BRIGHTOLA</span>
                        <span className="text-orange-500">X</span>
                      </div>
                      <Menu className="w-6 h-6 text-white" />
                    </div>

                    {/* Main Content - Dashboard */}
                    <div className="bg-white h-full px-6 py-6">
                      <div className="mb-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-1">
                          What's good,
                        </h2>
                        <h2 className="text-xl font-bold text-gray-900">
                          Toluwalope
                        </h2>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <button className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold">
                          Sell
                        </button>
                        <button className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold">
                          Buy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Depositing and withdrawing from your trading account just got easier with Brightola.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get started in minutes with our simple, secure process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: '01',
                title: 'Sign Up & Verify',
                description: 'Create your account and complete KYC with Premium Plastic NIN',
                icon: Shield
              },
              {
                number: '02',
                title: 'Choose Crypto',
                description: 'Select from Bitcoin, Ethereum, USDT and other supported cryptocurrencies',
                icon: Smartphone
              },
              {
                number: '03',
                title: 'Secure Payment',
                description: 'Complete your transaction with our secure, manual verification process',
                icon: Lock
              },
              {
                number: '04',
                title: 'Receive Assets',
                description: 'Get your crypto or fiat instantly once verification is complete',
                icon: CheckCircle
              }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-orange-500 text-white rounded-xl flex items-center justify-center text-xl font-bold mb-6 mx-auto">
                    {step.number}
                  </div>
                  <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
                    <Icon className="w-8 h-8 text-orange-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Start Your Crypto Journey?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied users who trust Brightola Exchange for secure crypto trading.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-orange-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center justify-center"
            >
              Create Free Account
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="text-2xl font-bold">
                  <span className="text-white">BRIGHTOLA</span>
                  <span className="text-orange-500">X</span>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Nigeria's most trusted crypto OTC brokerage platform. Trade Bitcoin, Ethereum, USDT and more with complete security and transparency.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
                  <Globe className="w-5 h-5 text-gray-400" />
                </div>
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
                  <Users className="w-5 h-5 text-gray-400" />
                </div>
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
                  <Smartphone className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-6">Platform</h3>
              <div className="space-y-4">
                <Link to="/register" className="text-gray-400 hover:text-white block transition-colors">
                  Get Started
                </Link>
                <Link to="/login" className="text-gray-400 hover:text-white block transition-colors">
                  Login
                </Link>
                <a href="#features" className="text-gray-400 hover:text-white block transition-colors">
                  Features
                </a>
                <a href="#how-it-works" className="text-gray-400 hover:text-white block transition-colors">
                  How It Works
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-6">Support</h3>
              <div className="space-y-4">
                <p className="text-gray-400">Email: support@brightola.com</p>
                <p className="text-gray-400">Phone: +234 800 000 0000</p>
                <p className="text-gray-400">Hours: 24/7 Support</p>
                <p className="text-gray-400">Response: Within 1 hour</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Brightola Exchange. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
              {/* Secure Admin Access - Hidden in plain sight */}
              <Link 
                to="/admin/login" 
                className="text-gray-500 hover:text-gray-400 text-sm transition-colors opacity-50 hover:opacity-100"
                title="Brightola Admin"
              >
                Brightola
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;