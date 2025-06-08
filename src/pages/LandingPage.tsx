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
  BarChart3
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const features = [
    {
      icon: Shield,
      title: 'Bank-Grade Security',
      description: 'Premium NIN verification and manual processing ensure maximum security for every transaction'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Complete trades in minutes with our streamlined verification process'
    },
    {
      icon: Award,
      title: 'Trusted Platform',
      description: 'Join thousands of satisfied traders who trust Brightola for their crypto needs'
    },
    {
      icon: BarChart3,
      title: 'Best Rates',
      description: 'Competitive pricing with transparent margins and real-time market rates'
    }
  ];

  const testimonials = [
    {
      name: 'Adebayo Johnson',
      role: 'Crypto Trader',
      content: 'Brightola has been my go-to platform for crypto trading. The security and customer service are unmatched.',
      rating: 5
    },
    {
      name: 'Fatima Abdullahi',
      role: 'Business Owner',
      content: 'Fast, reliable, and secure. I\'ve completed over 50 transactions without any issues.',
      rating: 5
    },
    {
      name: 'Chinedu Okafor',
      role: 'Investor',
      content: 'The referral program is amazing! I\'ve earned substantial rewards by referring friends.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">Brightola Exchange</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">How It Works</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">Reviews</a>
              <Link to="/custom-tokens" className="text-gray-700 hover:text-blue-600 transition-colors">Custom Tokens</Link>
            </nav>

            <div className="hidden md:flex space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
                <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">How It Works</a>
                <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">Reviews</a>
                <Link to="/custom-tokens" className="text-gray-700 hover:text-blue-600 transition-colors">Custom Tokens</Link>
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors">Login</Link>
                  <Link to="/register" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center">Get Started</Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section with Phone Mockups */}
      <section className="pt-24 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-medium mb-6">
                <Zap className="w-4 h-4 mr-2" />
                Nigeria's #1 Crypto OTC Platform
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Trade Crypto with
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Nigerian Naira
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Secure, fast, and reliable crypto trading platform. Buy and sell Bitcoin, Ethereum, USDT and more with complete peace of mind.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">Happy Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">₦2B+</div>
                  <div className="text-sm text-gray-600">Volume Traded</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">99.9%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl"
                >
                  Start Trading Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Right Content - Phone Mockups */}
            <div className="relative">
              {/* Background Elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-3xl transform rotate-3"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl transform -rotate-3"></div>
              
              {/* Phone Mockups */}
              <div className="relative z-10 flex justify-center items-center">
                {/* Main Phone */}
                <div className="relative">
                  <div className="w-64 h-[520px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                    <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                      {/* Phone Screen Content */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50">
                        {/* Status Bar */}
                        <div className="flex justify-between items-center px-6 py-3 text-xs font-medium">
                          <span>9:41</span>
                          <div className="flex space-x-1">
                            <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                            <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                            <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                          </div>
                        </div>
                        
                        {/* App Header */}
                        <div className="px-6 py-4">
                          <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-sm">B</span>
                            </div>
                            <span className="ml-2 font-bold text-gray-900">Brightola</span>
                          </div>
                          <h2 className="text-lg font-bold text-gray-900 mb-2">Welcome back!</h2>
                          <p className="text-sm text-gray-600">Ready to trade?</p>
                        </div>

                        {/* Quick Actions */}
                        <div className="px-6 mb-6">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-green-100 p-4 rounded-xl">
                              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mb-2">
                                <TrendingUp className="w-4 h-4 text-white" />
                              </div>
                              <p className="text-xs font-semibold text-green-900">Buy Crypto</p>
                            </div>
                            <div className="bg-blue-100 p-4 rounded-xl">
                              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mb-2">
                                <TrendingUp className="w-4 h-4 text-white" />
                              </div>
                              <p className="text-xs font-semibold text-blue-900">Sell Crypto</p>
                            </div>
                          </div>
                        </div>

                        {/* Market Overview */}
                        <div className="px-6">
                          <h3 className="font-semibold text-gray-900 mb-3 text-sm">Market Overview</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
                              <div className="flex items-center">
                                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">₿</span>
                                </div>
                                <div className="ml-2">
                                  <p className="text-xs font-semibold">BTC</p>
                                  <p className="text-xs text-gray-500">Bitcoin</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-xs font-semibold">₦74,250,000</p>
                                <p className="text-xs text-green-600">+2.5%</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
                              <div className="flex items-center">
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">Ξ</span>
                                </div>
                                <div className="ml-2">
                                  <p className="text-xs font-semibold">ETH</p>
                                  <p className="text-xs text-gray-500">Ethereum</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-xs font-semibold">₦5,280,000</p>
                                <p className="text-xs text-red-600">-1.2%</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-xl shadow-lg">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-xl shadow-lg">
                    <Shield className="w-6 h-6" />
                  </div>
                </div>

                {/* Secondary Phone (Partially Visible) */}
                <div className="absolute -right-8 top-12 transform rotate-12 opacity-60">
                  <div className="w-48 h-96 bg-gray-800 rounded-[2.5rem] p-2 shadow-xl">
                    <div className="w-full h-full bg-gradient-to-br from-purple-50 to-pink-50 rounded-[2rem] overflow-hidden">
                      <div className="p-4">
                        <div className="w-6 h-6 bg-purple-500 rounded-lg mb-4"></div>
                        <div className="space-y-2">
                          <div className="h-3 bg-gray-200 rounded"></div>
                          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Brightola Exchange?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of crypto trading with our cutting-edge platform designed for Nigerian traders.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in minutes with our simple, secure process.
            </p>
          </div>
          
          <div className="relative">
            {/* Connection Lines */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
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
                  <div key={index} className="text-center relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 mx-auto shadow-lg relative z-10">
                      {step.number}
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                      <Icon className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied traders who trust Brightola Exchange.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Start Your Crypto Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join over 10,000 satisfied users who trust Brightola Exchange for secure crypto trading.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center shadow-lg"
            >
              Create Free Account
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/custom-tokens"
              className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Explore Custom Tokens
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <span className="ml-3 text-xl font-bold text-white">Brightola Exchange</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Nigeria's most trusted crypto OTC brokerage platform. Trade Bitcoin, Ethereum, USDT and more with complete security and transparency.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <Globe className="w-5 h-5 text-gray-400" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <Users className="w-5 h-5 text-gray-400" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
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
                <Link to="/custom-tokens" className="text-gray-400 hover:text-white block transition-colors">
                  Custom Tokens
                </Link>
                <a href="#features" className="text-gray-400 hover:text-white block transition-colors">
                  Features
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
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Brightola Exchange. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;