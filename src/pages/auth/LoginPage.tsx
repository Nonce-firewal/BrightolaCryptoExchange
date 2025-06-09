import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Lock, Mail, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import AnimatedPage from '../../components/AnimatedPage';
import AnimatedInput from '../../components/AnimatedInput';
import AnimatedButton from '../../components/AnimatedButton';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const { ref: logoRef, isVisible: logoVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation({ threshold: 0.2 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <AnimatedPage className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <div 
            ref={logoRef}
            className={`flex items-center justify-center mb-6 transition-all duration-1000 ${
              logoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <div className="text-2xl font-bold">
              <span className="text-white">BRIGHTOLA</span>
              <span className="text-orange-500">X</span>
            </div>
          </div>
          
          <div className={`transition-all duration-1000 delay-300 ${
            logoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h2 className="text-3xl font-bold text-white">Welcome back</h2>
            <p className="mt-2 text-gray-400">Sign in to your account</p>
          </div>
        </div>

        <div 
          ref={formRef}
          className={`bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl transition-all duration-1000 delay-500 ${
            formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 flex items-center animate-shake">
                <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                <span className="text-red-300">{error}</span>
              </div>
            )}

            <div className="space-y-4">
              <AnimatedInput
                id="email"
                name="email"
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={Mail}
                required
              />

              <div className="relative">
                <AnimatedInput
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={Lock}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-300 transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-600 bg-gray-800 rounded transition-all duration-300"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-orange-500 hover:text-orange-400 transition-colors duration-300">
                  Forgot password?
                </a>
              </div>
            </div>

            <AnimatedButton
              type="submit"
              variant="primary"
              size="lg"
              icon={ArrowRight}
              loading={loading}
              className="w-full"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </AnimatedButton>

            <div className="text-center">
              <span className="text-gray-400">Don't have an account? </span>
              <Link 
                to="/register" 
                className="font-medium text-orange-500 hover:text-orange-400 transition-colors duration-300"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </AnimatedPage>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;