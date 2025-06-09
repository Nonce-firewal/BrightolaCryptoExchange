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

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes menuSlideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes hamburgerTop {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(6px) rotate(0deg); }
          100% { transform: translateY(6px) rotate(45deg); }
        }

        @keyframes hamburgerMiddle {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 0; }
        }

        @keyframes hamburgerBottom {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(0deg); }
          100% { transform: translateY(-6px) rotate(-45deg); }
        }

        @keyframes hamburgerTopReverse {
          0% { transform: translateY(6px) rotate(45deg); }
          50% { transform: translateY(6px) rotate(0deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }

        @keyframes hamburgerMiddleReverse {
          0% { opacity: 0; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes hamburgerBottomReverse {
          0% { transform: translateY(-6px) rotate(-45deg); }
          50% { transform: translateY(-6px) rotate(0deg); }
          100% { transform: translateY(0) rotate(0deg); }
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

        .hero-content {
          animation: fadeInLeft 1s ease-out 0.6s both;
        }

        .hero-phone {
          animation: fadeInRight 1s ease-out 0.9s both;
        }

        .floating-animation {
          animation: float 6s ease-in-out infinite;
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

        .nav-item {
          animation: slideInFromTop 0.6s ease-out both;
        }

        .nav-item:nth-child(1) { animation-delay: 0.1s; }
        .nav-item:nth-child(2) { animation-delay: 0.2s; }
        .nav-item:nth-child(3) { animation-delay: 0.3s; }

        .nav-button {
          animation: slideInFromRight 0.6s ease-out both;
        }

        .nav-button:nth-child(1) { animation-delay: 0.4s; }
        .nav-button:nth-child(2) { animation-delay: 0.5s; }

        .mobile-menu {
          animation: menuSlideDown 0.3s ease-out;
        }

        .mobile-menu-item {
          animation: slideInFromLeft 0.4s ease-out both;
        }

        .mobile-menu-item:nth-child(1) { animation-delay: 0.1s; }
        .mobile-menu-item:nth-child(2) { animation-delay: 0.2s; }
        .mobile-menu-item:nth-child(3) { animation-delay: 0.3s; }
        .mobile-menu-item:nth-child(4) { animation-delay: 0.4s; }

        .hamburger-line {
          transition: all 0.3s ease;
        }

        .hamburger-open .hamburger-line:nth-child(1) {
          animation: hamburgerTop 0.3s ease forwards;
        }

        .hamburger-open .hamburger-line:nth-child(2) {
          animation: hamburgerMiddle 0.3s ease forwards;
        }

        .hamburger-open .hamburger-line:nth-child(3) {
          animation: hamburgerBottom 0.3s ease forwards;
        }

        .hamburger-close .hamburger-line:nth-child(1) {
          animation: hamburgerTopReverse 0.3s ease forwards;
        }

        .hamburger-close .hamburger-line:nth-child(2) {
          animation: hamburgerMiddleReverse 0.3s ease forwards;
        }

        .hamburger-close .hamburger-line:nth-child(3) {
          animation: hamburgerBottomReverse 0.3s ease forwards;
        }

        .logo-animation {
          animation: fadeInLeft 0.8s ease-out;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          min-height: 80vh;
        }

        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }
        }

        .hero-content-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }

        @media (max-width: 1024px) {
          .hero-content-section {
            align-items: center;
            text-align: center;
          }
        }

        .hero-visual-section {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .phone-container {
          position: relative;
          z-index: 10;
        }

        .hero-bg-elements {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120%;
          height: 120%;
          z-index: 1;
        }

        .bg-circle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
        }

        .bg-circle-1 {
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg, #f97316, #ea580c);
          top: 20%;
          right: 10%;
          animation: float 8s ease-in-out infinite;
        }

        .bg-circle-2 {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          bottom: 20%;
          left: 10%;
          animation: float 6s ease-in-out infinite reverse;
        }

        .bg-circle-3 {
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, #10b981, #059669);
          top: 60%;
          right: 30%;
          animation: float 10s ease-in-out infinite;
          animation-delay: -2s;
        }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-md border-b border-gray-800 z-50 fade-in-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center logo-animation">
              <div className="text-2xl font-bold transition-all duration-300 hover:scale-105 cursor-pointer">
                <span className="text-white">BRIGHTOLA</span>
                <span className="text-orange-500">X</span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="nav-item text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 relative group">
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#how-it-works" className="nav-item text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 relative group">
                How It Works
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </nav>

            <div className="hidden md:flex space-x-4">
              <Link
                to="/login"
                className="nav-button text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-800 hover:scale-105"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="nav-button bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden text-gray-300 w-6 h-6 flex flex-col justify-center items-center space-y-1 ${
                mobileMenuOpen ? 'hamburger-open' : 'hamburger-close'
              }`}
            >
              <span className="hamburger-line w-6 h-0.5 bg-current block"></span>
              <span className="hamburger-line w-6 h-0.5 bg-current block"></span>
              <span className="hamburger-line w-6 h-0.5 bg-current block"></span>
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800 mobile-menu">
              <nav className="flex flex-col space-y-4">
                <a href="#features" className="mobile-menu-item text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2">Features</a>
                <a href="#how-it-works" className="mobile-menu-item text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2">How It Works</a>
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-800">
                  <Link to="/login" className="mobile-menu-item text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2">Login</Link>
                  <Link to="/register" className="mobile-menu-item bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 text-center hover:scale-105">Get Started</Link>
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
          <div className="hero-grid">
            {/* Content Section */}
            <div className="hero-content-section hero-content">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Buy and Sell
                <br />
                <span className="gradient-text">Cryptocurrency</span>
                <br />
                easily with Bank
                <br />
                Transfer
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-lg">
                Depositing and withdrawing from your trading account just got easier with Brightola.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                >
                  Trade Crypto
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  Learn More
                </a>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Secure & Licensed
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  24/7 Support
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Instant Transfers
                </div>
              </div>
            </div>

            {/* Visual Section */}
            <div className="hero-visual-section hero-phone">
              {/* Background decorative elements */}
              <div className="hero-bg-elements">
                <div className="bg-circle bg-circle-1"></div>
                <div className="bg-circle bg-circle-2"></div>
                <div className="bg-circle bg-circle-3"></div>
              </div>

              {/* Phone Mockup */}
              <div className="phone-container">
                <div className="relative floating-animation">
                  {/* Phone Frame */}
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

                        {/* Balance Card */}
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 mb-6 text-white">
                          <p className="text-sm opacity-90">Total Balance</p>
                          <p className="text-2xl font-bold">₦850,000</p>
                          <p className="text-sm opacity-90">+15.3% this month</p>
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

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-gray-100 rounded-lg p-3">
                            <p className="text-xs text-gray-600">Today's Profit</p>
                            <p className="text-lg font-bold text-green-600">+₦12,500</p>
                          </div>
                          <div className="bg-gray-100 rounded-lg p-3">
                            <p className="text-xs text-gray-600">Active Orders</p>
                            <p className="text-lg font-bold text-blue-600">3</p>
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