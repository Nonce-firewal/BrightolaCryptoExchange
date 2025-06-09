import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Shield, 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  FileText, 
  Camera, 
  User,
  MapPin,
  CreditCard,
  Eye,
  EyeOff
} from 'lucide-react';
import AnimatedButton from '../../components/AnimatedButton';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const KYCVerification: React.FC = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    idType: 'nin',
    idNumber: '',
    bvn: ''
  });
  const [documents, setDocuments] = useState({
    idDocument: null as File | null,
    selfie: null as File | null,
    proofOfAddress: null as File | null
  });
  const [showBVN, setShowBVN] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  // All 36 Nigerian states
  const nigerianStates = [
    'Abia',
    'Adamawa',
    'Akwa Ibom',
    'Anambra',
    'Bauchi',
    'Bayelsa',
    'Benue',
    'Borno',
    'Cross River',
    'Delta',
    'Ebonyi',
    'Edo',
    'Ekiti',
    'Enugu',
    'Federal Capital Territory (FCT)',
    'Gombe',
    'Imo',
    'Jigawa',
    'Kaduna',
    'Kano',
    'Katsina',
    'Kebbi',
    'Kogi',
    'Kwara',
    'Lagos',
    'Nasarawa',
    'Niger',
    'Ogun',
    'Ondo',
    'Osun',
    'Oyo',
    'Plateau',
    'Rivers',
    'Sokoto',
    'Taraba',
    'Yobe',
    'Zamfara'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (type: keyof typeof documents, file: File) => {
    setDocuments(prev => ({ ...prev, [type]: file }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 3000));
    setStep(4);
    setIsSubmitting(false);
  };

  const getKYCStatusConfig = () => {
    switch (user?.kycStatus) {
      case 'approved':
        return {
          color: 'green',
          icon: CheckCircle,
          title: 'KYC Verified',
          description: 'Your identity has been successfully verified.',
          bgColor: 'bg-green-900/50',
          borderColor: 'border-green-700',
          textColor: 'text-green-300'
        };
      case 'pending':
        return {
          color: 'yellow',
          icon: Clock,
          title: 'KYC Under Review',
          description: 'Your documents are being reviewed. This usually takes 24-48 hours.',
          bgColor: 'bg-yellow-900/50',
          borderColor: 'border-yellow-700',
          textColor: 'text-yellow-300'
        };
      case 'rejected':
        return {
          color: 'red',
          icon: AlertCircle,
          title: 'KYC Rejected',
          description: 'Your KYC submission was rejected. Please resubmit with correct information.',
          bgColor: 'bg-red-900/50',
          borderColor: 'border-red-700',
          textColor: 'text-red-300'
        };
      default:
        return {
          color: 'blue',
          icon: Shield,
          title: 'Complete KYC Verification',
          description: 'Verify your identity to unlock full trading features.',
          bgColor: 'bg-blue-900/50',
          borderColor: 'border-blue-700',
          textColor: 'text-blue-300'
        };
    }
  };

  const statusConfig = getKYCStatusConfig();
  const StatusIcon = statusConfig.icon;

  if (user?.kycStatus === 'approved') {
    return (
      <Layout>
        <div className="p-6 flex items-center justify-center min-h-[80vh]">
          <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-8 max-w-md w-full text-center animate-fadeInScale">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">KYC Verified!</h2>
            <p className="text-gray-400 mb-6">
              Your identity has been successfully verified. You can now access all trading features.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Status:</span>
                <span className="text-green-400 font-semibold">Verified</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Verified Date:</span>
                <span className="text-white">Jan 15, 2024</span>
              </div>
            </div>
            <AnimatedButton
              variant="primary"
              onClick={() => window.location.href = '/dashboard'}
              className="w-full"
            >
              Go to Dashboard
            </AnimatedButton>
          </div>
        </div>
      </Layout>
    );
  }

  if (user?.kycStatus === 'pending') {
    return (
      <Layout>
        <div className="p-6 flex items-center justify-center min-h-[80vh]">
          <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-8 max-w-md w-full text-center animate-fadeInScale">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">KYC Under Review</h2>
            <p className="text-gray-400 mb-6">
              Your documents are being reviewed by our team. This process usually takes 24-48 hours.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Status:</span>
                <span className="text-yellow-400 font-semibold">Under Review</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Submitted:</span>
                <span className="text-white">Jan 15, 2024</span>
              </div>
            </div>
            <AnimatedButton
              variant="secondary"
              onClick={() => window.location.href = '/dashboard'}
              className="w-full"
            >
              Back to Dashboard
            </AnimatedButton>
          </div>
        </div>
      </Layout>
    );
  }

  if (step === 4) {
    return (
      <Layout>
        <div className="p-6 flex items-center justify-center min-h-[80vh]">
          <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-8 max-w-md w-full text-center animate-fadeInScale">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">KYC Submitted!</h2>
            <p className="text-gray-400 mb-6">
              Your KYC documents have been submitted successfully. We'll review them within 24-48 hours.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 mb-6">
              <div className="text-sm text-gray-400 mb-2">What's next?</div>
              <ul className="text-left text-white text-sm space-y-1">
                <li>• Document verification (24-48 hours)</li>
                <li>• Email notification upon completion</li>
                <li>• Full access to trading features</li>
              </ul>
            </div>
            <AnimatedButton
              variant="primary"
              onClick={() => window.location.href = '/dashboard'}
              className="w-full"
            >
              Back to Dashboard
            </AnimatedButton>
          </div>
        </div>
      </Layout>
    );
  }

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center">
                <Shield className="w-8 h-8 text-blue-400 mr-3" />
                KYC Verification
              </h1>
              <p className="text-gray-400 mt-1">Complete your identity verification to unlock all features</p>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-blue-400' : 'bg-gray-600'}`}></div>
              <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-blue-400' : 'bg-gray-600'}`}></div>
              <div className={`w-3 h-3 rounded-full ${step >= 3 ? 'bg-blue-400' : 'bg-gray-600'}`}></div>
            </div>
          </div>
        </div>

        {/* Status Alert */}
        <div className={`${statusConfig.bgColor} border ${statusConfig.borderColor} rounded-lg p-4 flex items-center`}>
          <StatusIcon className={`w-5 h-5 ${statusConfig.textColor} mr-3`} />
          <div>
            <p className={`${statusConfig.textColor} font-medium`}>{statusConfig.title}</p>
            <p className="text-gray-400 text-sm">{statusConfig.description}</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div 
            ref={contentRef}
            className={`bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-8 transition-all duration-1000 delay-300 ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {step === 1 && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <User className="w-6 h-6 text-blue-500 mr-3" />
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      placeholder="Enter your first name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      placeholder="Enter your last name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      placeholder="+234 800 000 0000"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      placeholder="Enter your full address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      placeholder="Enter your city"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 max-h-40 overflow-y-auto"
                      style={{ maxHeight: '200px' }}
                    >
                      <option value="">Select State</option>
                      {nigerianStates.map((state) => (
                        <option key={state} value={state.toLowerCase().replace(/\s+/g, '-')}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <AnimatedButton
                    variant="primary"
                    onClick={() => setStep(2)}
                    disabled={!formData.firstName || !formData.lastName || !formData.dateOfBirth}
                    className="px-8"
                  >
                    Continue
                  </AnimatedButton>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <CreditCard className="w-6 h-6 text-blue-500 mr-3" />
                  Identity Verification
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">ID Type</label>
                    <select
                      name="idType"
                      value={formData.idType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    >
                      <option value="nin">National Identification Number (NIN)</option>
                      <option value="passport">International Passport</option>
                      <option value="drivers_license">Driver's License</option>
                      <option value="voters_card">Voter's Card</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">ID Number</label>
                    <input
                      type="text"
                      name="idNumber"
                      value={formData.idNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      placeholder="Enter your ID number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">BVN (Bank Verification Number)</label>
                    <div className="relative">
                      <input
                        type={showBVN ? 'text' : 'password'}
                        name="bvn"
                        value={formData.bvn}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        placeholder="Enter your 11-digit BVN"
                        maxLength={11}
                      />
                      <button
                        type="button"
                        onClick={() => setShowBVN(!showBVN)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {showBVN ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Your BVN is used for identity verification and is kept secure.</p>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <AnimatedButton
                    variant="secondary"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </AnimatedButton>
                  <AnimatedButton
                    variant="primary"
                    onClick={() => setStep(3)}
                    disabled={!formData.idNumber || !formData.bvn}
                  >
                    Continue
                  </AnimatedButton>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Upload className="w-6 h-6 text-blue-500 mr-3" />
                  Document Upload
                </h2>

                <div className="space-y-6">
                  {/* ID Document */}
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 hover:border-blue-500 transition-colors duration-300">
                    <div className="text-center">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-white mb-2">ID Document</h3>
                      <p className="text-gray-400 text-sm mb-4">Upload a clear photo of your {formData.idType.replace('_', ' ')}</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload('idDocument', e.target.files[0])}
                        className="hidden"
                        id="id-document"
                      />
                      <label htmlFor="id-document">
                        <AnimatedButton
                          variant="secondary"
                          className="cursor-pointer"
                          icon={Upload}
                        >
                          {documents.idDocument ? 'Change File' : 'Upload File'}
                        </AnimatedButton>
                      </label>
                      {documents.idDocument && (
                        <p className="text-green-400 text-sm mt-2">✓ {documents.idDocument.name}</p>
                      )}
                    </div>
                  </div>

                  {/* Selfie */}
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 hover:border-blue-500 transition-colors duration-300">
                    <div className="text-center">
                      <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-white mb-2">Selfie Photo</h3>
                      <p className="text-gray-400 text-sm mb-4">Take a clear selfie holding your ID document</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload('selfie', e.target.files[0])}
                        className="hidden"
                        id="selfie"
                      />
                      <label htmlFor="selfie">
                        <AnimatedButton
                          variant="secondary"
                          className="cursor-pointer"
                          icon={Camera}
                        >
                          {documents.selfie ? 'Change Photo' : 'Take Selfie'}
                        </AnimatedButton>
                      </label>
                      {documents.selfie && (
                        <p className="text-green-400 text-sm mt-2">✓ {documents.selfie.name}</p>
                      )}
                    </div>
                  </div>

                  {/* Proof of Address */}
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 hover:border-blue-500 transition-colors duration-300">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-white mb-2">Proof of Address</h3>
                      <p className="text-gray-400 text-sm mb-4">Upload a utility bill or bank statement (not older than 3 months)</p>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload('proofOfAddress', e.target.files[0])}
                        className="hidden"
                        id="proof-address"
                      />
                      <label htmlFor="proof-address">
                        <AnimatedButton
                          variant="secondary"
                          className="cursor-pointer"
                          icon={Upload}
                        >
                          {documents.proofOfAddress ? 'Change File' : 'Upload File'}
                        </AnimatedButton>
                      </label>
                      {documents.proofOfAddress && (
                        <p className="text-green-400 text-sm mt-2">✓ {documents.proofOfAddress.name}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <AnimatedButton
                    variant="secondary"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </AnimatedButton>
                  <AnimatedButton
                    variant="success"
                    onClick={handleSubmit}
                    loading={isSubmitting}
                    disabled={!documents.idDocument || !documents.selfie || !documents.proofOfAddress}
                    icon={CheckCircle}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit KYC'}
                  </AnimatedButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
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
        .animate-fadeInScale {
          animation: fadeInScale 0.6s ease-out;
        }
      `}</style>
    </Layout>
  );
};

export default KYCVerification;