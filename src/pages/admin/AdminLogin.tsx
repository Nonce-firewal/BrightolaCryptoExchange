import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Lock, Mail, Shield, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import AnimatedPage from '../../components/AnimatedPage';
import AnimatedInput from '../../components/AnimatedInput';
import AnimatedButton from '../../components/AnimatedButton';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const { ref: logoRef, isVisible: logoVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation({ threshold: 0.2 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await adminLogin(email, password, mfaCode);
      if (success) {
        navigate('/admin');
      } else {
        setError('Invalid credentials or MFA code');
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
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
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
          
          <div className={`w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-1000 delay-300 ${
            logoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}>
            <Shield className="w-8 h-8 text-white" />
          </div>
          
          <div className={`transition-all duration-1000 delay-500 ${
            logoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h2 className="text-3xl font-bold text-white">Admin Access</h2>
            <p className="mt-2 text-gray-400">Secure administrator login</p>
          </div>
        </div>

        <div 
          ref={formRef}
          className={`bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl transition-all duration-1000 delay-700 ${
            formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mb-6 p-4 bg-blue-900/50 border border-blue-700 rounded-lg">
            <h3 className="text-blue-300 font-medium mb-2">Demo Credentials</h3>
            <div className="text-sm text-blue-400 space-y-1">
              <p><strong>Email:</strong> admin@brightola.com</p>
              <p><strong>Password:</strong> admin123</p>
              <p><strong>MFA Code:</strong> 123456</p>
            </div>
          </div>

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
                label="Admin Email"
                placeholder="Enter admin email"
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
                  placeholder="Enter password"
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

              <AnimatedInput
                id="mfaCode"
                name="mfaCode"
                type="text"
                label="MFA Code"
                placeholder="Enter 6-digit MFA code"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                icon={Shield}
                required
              />
            </div>

            <AnimatedButton
              type="submit"
              variant="primary"
              size="lg"
              icon={ArrowRight}
              loading={loading}
              className="w-full"
            >
              {loading ? 'Verifying...' : 'Access Admin Panel'}
            </AnimatedButton>

            <div className="text-center">
              <Link 
                to="/" 
                className="font-medium text-orange-500 hover:text-orange-400 transition-colors duration-300"
              >
                ← Back to main site
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

export default AdminLogin;