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

  React.useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .fade-in-scale, .stagger-children > *');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

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

        @keyframes slideInMobileMenu {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in-up {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }

        .fade-in-left {
          opacity: 0;
          transform: translateX(-30px);
          transition: all 0.6s ease-out;
        }

        .fade-in-right {
          opacity: 0;
          transform: translateX(30px);
          transition: all 0.6s ease-out;
        }

        .fade-in-scale {
          opacity: 0;
          transform: scale(0.9);
          transition: all 0.6s ease-out;
        }

        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) translateX(0) scale(1) !important;
        }

        .stagger-children > * {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out;
        }

        .stagger-children.animate-in > *:nth-child(1) { transition-delay: 0.1s; }
        .stagger-children.animate-in > *:nth-child(2) { transition-delay: 0.2s; }
        .stagger-children.animate-in > *:nth-child(3) { transition-delay: 0.3s; }
        .stagger-children.animate-in > *:nth-child(4) { transition-delay: 0.4s; }
        .stagger-children.animate-in > *:nth-child(5) { transition-delay: 0.5s; }
        .stagger-children.animate-in > *:nth-child(6) { transition-delay: 0.6s; }

        .hero-text {
          animation: fadeInUp 1s ease-out;
        }

        .hero-cta {
          animation: fadeInUp 1s ease-out 0.3s both;
        }

        .hero-phone {
          animation: fadeInScale 1s ease-out 0.6s both;
        }

        .hero-subtitle {
          animation: fadeInUp 1s ease-out 0.9s both;
        }

        .floating-animation {
          animation: float 6s ease-in-out infinite;
        }

        .animate-slideInFromTop {
          animation: slideInFromTop 0.5s ease-out;
        }

        .animate-slideInFromLeft {
          animation: slideInFromLeft 0.6s ease-out;
        }

        .animate-slideInMobileMenu {
          animation: slideInMobileMenu 0.4s ease-out;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .parallax-bg {
          background-attachment: fixed;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }

        .gradient-text {
          background: linear-gradient(135deg, #f97316, #ea580c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Mobile phone mockup gradient blend */
        .mobile-phone-blend {
          background: linear-gradient(to bottom, transparent 0%, transparent 70%, #111827 100%);
        }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-md border-b border-gray-800 z-50 fade-in-up">
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
              className="md:hidden text-gray-300 transition-all duration-300 transform hover:scale-110 hover:text-orange-500"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 transition-transform duration-300 transform rotate-90" />
              ) : (
                <Menu className="w-6 h-6 animate-pulse" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800 animate-slideInMobileMenu">
              <nav className="flex flex-col space-y-4">
                <a 
                  href="#features" 
                  className="text-gray-300 hover:text-white transition-all duration-300 transform hover:translate-x-2 animate-slideInFromLeft"
                  style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#how-it-works" 
                  className="text-gray-300 hover:text-white transition-all duration-300 transform hover:translate-x-2 animate-slideInFromLeft"
                  style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How It Works
                </a>
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-800">
                  <Link 
                    to="/login" 
                    className="text-gray-300 hover:text-white transition-all duration-300 transform hover:translate-x-2 animate-slideInFromLeft"
                    style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 text-center transform hover:scale-105 animate-slideInFromLeft"
                    style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 min-h-screen flex items-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Mobile Layout - Centered */}
          <div className="lg:hidden text-center">
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight hero-text">
              Buy and Sell
              <br />
              <span className="gradient-text">Cryptocurrency</span>
              <br />
              easily with Bank
              <br />
              Transfer
            </h1>
            
            {/* CTA Button */}
            <Link
              to="/register"
              className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl mb-16 hero-cta"
            >
              Trade Crypto
            </Link>

            {/* Mobile Phone Mockup - Increased Height with Portfolio */}
            <div className="flex justify-center mb-16 hero-phone">
              <div className="relative floating-animation">
                {/* Phone Frame - Increased height for mobile */}
                <div className="w-80 h-[500px] bg-gray-800 rounded-t-[3rem] p-3 shadow-2xl border-4 border-gray-700 border-b-0 overflow-hidden relative">
                  {/* Gradient blend overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 mobile-phone-blend pointer-events-none z-10"></div>
                  
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

                    {/* Main Content - Dashboard with Portfolio */}
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
                      <div className="flex space-x-3 mb-6">
                        <button className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold">
                          Sell
                        </button>
                        <button className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold">
                          Buy
                        </button>
                      </div>

                      {/* Portfolio Balance Section */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Portfolio</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">Total Balance</span>
                            <span className="text-2xl font-bold text-gray-900">₦850,000</span>
                          </div>
                          <div className="text-green-500 text-sm font-medium">+15.3% this month</div>
                        </div>

                        {/* Recent Transactions Preview */}
                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-900">Recent</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center py-2">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                  <span className="text-orange-600 text-xs font-bold">BTC</span>
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">Bitcoin</div>
                                  <div className="text-xs text-gray-500">Sold</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium text-gray-900">₦125,000</div>
                                <div className="text-xs text-green-500">+2.5%</div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center py-2">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <span className="text-blue-600 text-xs font-bold">ETH</span>
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">Ethereum</div>
                                  <div className="text-xs text-gray-500">Bought</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium text-gray-900">₦75,000</div>
                                <div className="text-xs text-red-500">-1.2%</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-xl text-gray-300 max-w-2xl mx-auto hero-subtitle">
              Depositing and withdrawing from your trading account just got easier with Brightola.
            </p>
          </div>

          {/* Desktop Layout - Side by Side */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              {/* Main Heading */}
              <h1 className="text-5xl xl:text-6xl font-bold leading-tight hero-text">
                Buy and Sell
                <br />
                <span className="gradient-text">Cryptocurrency</span>
                <br />
                easily with Bank
                <br />
                Transfer
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl text-gray-300 max-w-lg hero-subtitle">
                Depositing and withdrawing from your trading account just got easier with Brightola.
              </p>

              {/* CTA Button */}
              <div className="hero-cta">
                <Link
                  to="/register"
                  className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                >
                  Trade Crypto
                </Link>
              </div>
            </div>

            {/* Right Column - Phone Mockup */}
            <div className="flex justify-center lg:justify-end hero-phone">
              <div className="relative floating-animation">
                {/* Phone Frame - Full phone for desktop */}
                <div className="w-80 h-[600px] bg-gray-800 rounded-[3rem] p-3 shadow-2xl border-4 border-gray-700 overflow-hidden">
                  <div className="w-full h-full bg-gray-900 rounded-[2.5rem] overflow-hidden relative">
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
                      <div className="flex space-x-3 mb-8">
                        <button className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold">
                          Sell
                        </button>
                        <button className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold">
                          Buy
                        </button>
                      </div>

                      {/* Portfolio Section */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Portfolio</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">Total Balance</span>
                            <span className="text-2xl font-bold text-gray-900">₦850,000</span>
                          </div>
                          <div className="text-green-500 text-sm">+15.3% this month</div>
                        </div>

                        {/* Recent Transactions */}
                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-900">Recent</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center py-2">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                  <span className="text-orange-600 text-xs font-bold">BTC</span>
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">Bitcoin</div>
                                  <div className="text-xs text-gray-500">Sold</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium text-gray-900">₦125,000</div>
                                <div className="text-xs text-green-500">+2.5%</div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center py-2">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <span className="text-blue-600 text-xs font-bold">ETH</span>
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">Ethereum</div>
                                  <div className="text-xs text-gray-500">Bought</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium text-gray-900">₦75,000</div>
                                <div className="text-xs text-red-500">-1.2%</div>
                              </div>
                            </div>
                          </div>
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
      <section id="features" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Choose Brightola?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience the future of crypto trading with our cutting-edge platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl group">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
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
      <section id="how-it-works" className="py-20 bg-gray-800 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get started in minutes with our simple, secure process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
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
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-orange-500 text-white rounded-xl flex items-center justify-center text-xl font-bold mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {step.number}
                  </div>
                  <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-2">
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

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children">
            {[
              { number: '10,000+', label: 'Happy Users', icon: Users },
              { number: '₦2.5B+', label: 'Volume Traded', icon: TrendingUp },
              { number: '99.9%', label: 'Uptime', icon: Shield }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center p-8 bg-gray-800 rounded-2xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-2">
                  <Icon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-400 text-lg">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Start Your Crypto Journey?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied users who trust Brightola Exchange for secure crypto trading.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-orange-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl inline-flex items-center justify-center"
              >
                Create Free Account
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="#features"
                className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 fade-in-up">
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
          
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center fade-in-up">
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