import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Lock, Mail, User, ArrowRight, AlertCircle, Gift, Eye, EyeOff } from 'lucide-react';
import AnimatedPage from '../../components/AnimatedPage';
import AnimatedInput from '../../components/AnimatedInput';
import AnimatedButton from '../../components/AnimatedButton';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const RegisterPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get('ref') || '';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    referralCode: referralCode,
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const { ref: logoRef, isVisible: logoVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation({ threshold: 0.2 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions');
      setLoading(false);
      return;
    }

    try {
      const success = await register(formData.email, formData.password, formData.name, formData.referralCode);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
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
            <h2 className="text-3xl font-bold text-white">Create your account</h2>
            <p className="mt-2 text-gray-400">Start trading crypto with Nigerian Naira</p>
          </div>
        </div>

        {referralCode && (
          <div className={`bg-green-900/50 border border-green-700 rounded-lg p-4 flex items-center transition-all duration-1000 delay-500 ${
            logoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <Gift className="w-5 h-5 text-green-400 mr-3 animate-bounce" />
            <div className="text-sm">
              <p className="text-green-300 font-medium">Referral Code Applied!</p>
              <p className="text-green-400">You were referred by: {referralCode}</p>
            </div>
          </div>
        )}

        <div 
          ref={formRef}
          className={`bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl transition-all duration-1000 delay-700 ${
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
                id="name"
                name="name"
                type="text"
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                icon={User}
                required
              />

              <AnimatedInput
                id="email"
                name="email"
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                icon={Mail}
                required
              />

              <div className="relative">
                <AnimatedInput
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleInputChange}
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

              <div className="relative">
                <AnimatedInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  icon={Lock}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-300 transition-colors duration-300"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              <AnimatedInput
                id="referralCode"
                name="referralCode"
                type="text"
                label="Referral Code (Optional)"
                placeholder="Enter referral code (if any)"
                value={formData.referralCode}
                onChange={handleInputChange}
                icon={Gift}
              />
            </div>

            <div className="flex items-center">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                required
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-600 bg-gray-800 rounded transition-all duration-300"
              />
              <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-300">
                I agree to the{' '}
                <a href="#" className="text-orange-500 hover:text-orange-400 transition-colors duration-300">
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-orange-500 hover:text-orange-400 transition-colors duration-300">
                  Privacy Policy
                </a>
              </label>
            </div>

            <AnimatedButton
              type="submit"
              variant="primary"
              size="lg"
              icon={ArrowRight}
              loading={loading}
              className="w-full"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </AnimatedButton>

            <div className="text-center">
              <span className="text-gray-400">Already have an account? </span>
              <Link 
                to="/login" 
                className="font-medium text-orange-500 hover:text-orange-400 transition-colors duration-300"
              >
                Sign in
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

export default RegisterPage;