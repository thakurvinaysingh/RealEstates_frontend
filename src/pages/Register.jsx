import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon, UserIcon, EnvelopeIcon, PhoneIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register, verifyEmail } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '',
    phone: '', password: '', confirmPassword: '',
    userType: 'buyer', agreeToTerms: false, subscribeNewsletter: true,
    countryCode: 'IN', // default; change to a selector later if you want
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [phase, setPhase] = useState('form'); // 'form' | 'verify'
  const [otp, setOtp] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }
    if (!formData.agreeToTerms) {
      setErrorMsg('Please agree to the terms and conditions');
      return;
    }

    try {
      setIsLoading(true);
      // backend expects: { name, email, password, countryCode, phoneNumber }
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email.trim(),
        password: formData.password,
        countryCode: formData.countryCode || 'IN',
        phoneNumber: formData.phone.trim(),
      };
      await register(payload);
      // If success: backend sends OTP to email. Move to verify step.
      setPhase('verify');
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Registration failed';
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      // backend route is /auth/verify-email with { email, otp }
      await verifyEmail(formData.email.trim(), otp.trim());
      // If backend returns token on verify, you’re now logged in; go dashboard
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Invalid or expired OTP';
      setErrorMsg(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-600 mt-2">Join Own-A-Bid and find your dream property</p>
        </div>

        <div className="card p-8">
          {errorMsg && (
            <div className="mb-6 rounded-lg bg-red-50 text-red-700 px-4 py-3 text-sm">
              {errorMsg}
            </div>
          )}

          {phase === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">I am a</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'buyer', label: 'Buyer', icon: '🏠' },
                    { value: 'seller', label: 'Seller', icon: '💰' },
                    { value: 'agent', label: 'Agent', icon: '👔' }
                  ].map((type) => (
                    <label key={type.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="userType"
                        value={type.value}
                        checked={formData.userType === type.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`p-4 border-2 rounded-xl text-center transition-all duration-300 ${
                        formData.userType === type.value
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="text-2xl mb-2">{type.icon}</div>
                        <div className="font-medium">{type.label}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="First name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Last name"
                  />
                </div>
              </div>

              {/* Email / Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email" name="email" value={formData.email} onChange={handleInputChange} required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+91 98765 43210"
                      autoComplete="tel"
                    />
                  </div>
                </div>
              </div>

              {/* Passwords */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password" value={formData.password} onChange={handleInputChange} required
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Create password" autoComplete="new-password"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <div className="relative">
                    <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Confirm password" autoComplete="new-password"
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="space-y-3">
                <label className="flex items-start">
                  <input
                    type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleInputChange}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    I agree to the{' '}
                    <Link to="/privacy-policy" className="text-purple-600 hover:text-blue-700 font-medium">Terms of Service</Link>{' '}
                    and{' '}
                    <Link to="/privacy-policy" className="text-purple-600 hover:text-blue-700 font-medium">Privacy Policy</Link>
                  </span>
                </label>
                <label className="flex items-start">
                  <input
                    type="checkbox" name="subscribeNewsletter" checked={formData.subscribeNewsletter} onChange={handleInputChange}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                  />
                  <span className="ml-2 text-sm text-gray-600">Subscribe to our newsletter</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-purple-600 hover:bg-purple-600 py-3 text-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          ) : (
            // OTP verify step
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900">Verify your email</h3>
                <p className="text-sm text-gray-600 mt-1">
                  We sent a 6‑digit code to <span className="font-medium">{formData.email}</span>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
                <input
                  type="text" inputMode="numeric" pattern="\d{6}" maxLength={6}
                  value={otp} onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="123456"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-purple-600 hover:bg-purple-600 py-3 text-lg text-white font-semibold"
              >
                Verify & Continue
              </button>

              <button
                type="button"
                onClick={() => setPhase('form')}
                className="w-full rounded-lg border border-gray-300 py-3 text-lg font-semibold"
              >
                Back
              </button>
            </form>
          )}

          {/* Divider + Social (unchanged) */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">{phase === 'form' ? 'Or sign up with' : '—'}</span>
              </div>
            </div>
          </div>
          {phase === 'form' && (
            <div className="mt-6 grid grid-cols-3 gap-3">
              <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <FaGoogle className="w-5 h-5 text-red-500" />
              </button>
              <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <FaFacebookF className="w-5 h-5 text-purple-600" />
              </button>
              <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <FaApple className="w-5 h-5 text-gray-900" />
              </button>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-purple-600 hover:text-blue-700">Sign in here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { EyeIcon, EyeSlashIcon, UserIcon, EnvelopeIcon, PhoneIcon, LockClosedIcon } from '@heroicons/react/24/outline';
// import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//     userType: 'buyer',
//     agreeToTerms: false,
//     subscribeNewsletter: true
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (formData.password !== formData.confirmPassword) {
//       alert('Passwords do not match!');
//       return;
//     }

//     if (!formData.agreeToTerms) {
//       alert('Please agree to the terms and conditions');
//       return;
//     }

//     setIsLoading(true);
    
//     // Simulate API call
//     setTimeout(() => {
//       console.log('Registration data:', formData);
//       setIsLoading(false);
//       // Handle registration logic here
//     }, 2000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-indigo-50 py-12 px-4">
//       <div className="max-w-2xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           {/* <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
//             <UserIcon className="w-8 h-8 text-white" />
//           </div> */}
//           <h2 className="text-3xl font-bold text-gray-900 ">Create Account</h2>
//           <p className="text-gray-600 mt-2">Join Own-A-Bid and find your dream property</p>
//         </div>

//         {/* Registration Form */}
//         <div className="card p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* User Type Selection */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">
//                 I am a
//               </label>
//               <div className="grid grid-cols-3 gap-3">
//                 {[
//                   { value: 'buyer', label: 'Buyer', icon: '🏠' },
//                   { value: 'seller', label: 'Seller', icon: '💰' },
//                   { value: 'agent', label: 'Agent', icon: '👔' }
//                 ].map((type) => (
//                   <label key={type.value} className="cursor-pointer">
//                     <input
//                       type="radio"
//                       name="userType"
//                       value={type.value}
//                       checked={formData.userType === type.value}
//                       onChange={handleInputChange}
//                       className="sr-only"
//                     />
//                     <div className={`p-4 border-2 rounded-xl text-center transition-all duration-300 ${
//                       formData.userType === type.value
//                         ? 'border-purple-500 bg-purple-50 text-purple-700'
//                         : 'border-gray-200 hover:border-gray-300'
//                     }`}>
//                       <div className="text-2xl mb-2">{type.icon}</div>
//                       <div className="font-medium">{type.label}</div>
//                     </div>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Name Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
//                   First Name
//                 </label>
//                 <div className="relative">
//                   <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <input
//                     type="text"
//                     id="firstName"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//                     placeholder="First name"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   id="lastName"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//                   placeholder="Last name"
//                 />
//               </div>
//             </div>

//             {/* Email and Phone */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//                     placeholder="your@email.com"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
//                   Phone Number
//                 </label>
//                 <div className="relative">
//                   <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//                     placeholder="+1 (555) 000-0000"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Password Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     id="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//                     placeholder="Create password"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     {showPassword ? (
//                       <EyeSlashIcon className="w-5 h-5" />
//                     ) : (
//                       <EyeIcon className="w-5 h-5" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//               <div>
//                 <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
//                   Confirm Password
//                 </label>
//                 <div className="relative">
//                   <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <input
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//                     placeholder="Confirm password"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     {showConfirmPassword ? (
//                       <EyeSlashIcon className="w-5 h-5" />
//                     ) : (
//                       <EyeIcon className="w-5 h-5" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Checkboxes */}
//             <div className="space-y-3">
//               <div className="flex items-start">
//                 <input
//                   type="checkbox"
//                   id="agreeToTerms"
//                   name="agreeToTerms"
//                   checked={formData.agreeToTerms}
//                   onChange={handleInputChange}
//                   className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
//                 />
//                 <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-600">
//                   I agree to the{' '}
//                   <Link to="/privacy-policy" className="text-purple-600 hover:text-blue-700 font-medium">
//                     Terms of Service
//                   </Link>{' '}
//                   and{' '}
//                   <Link to="/privacy-policy" className="text-purple-600 hover:text-blue-700 font-medium">
//                     Privacy Policy
//                   </Link>
//                 </label>
//               </div>
//               <div className="flex items-start">
//                 <input
//                   type="checkbox"
//                   id="subscribeNewsletter"
//                   name="subscribeNewsletter"
//                   checked={formData.subscribeNewsletter}
//                   onChange={handleInputChange}
//                   className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
//                 />
//                 <label htmlFor="subscribeNewsletter" className="ml-2 text-sm text-gray-600">
//                   Subscribe to our newsletter for property updates and market insights
//                 </label>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full rounded-lg bg-purple-600 hover:bg-purple-600 py-3 text-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoading ? (
//                 <div className="flex items-center justify-center">
//                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                   Creating Account...
//                 </div>
//               ) : (
//                 'Create Account'
//               )}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">Or sign up with</span>
//               </div>
//             </div>
//           </div>

//           {/* Social Registration */}
//           <div className="mt-6 grid grid-cols-3 gap-3">
//             <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-300">
//               <FaGoogle className="w-5 h-5 text-red-500" />
//             </button>
//             <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-300">
//               <FaFacebookF className="w-5 h-5 text-purple-600" />
//             </button>
//             <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-300">
//               <FaApple className="w-5 h-5 text-gray-900" />
//             </button>
//           </div>

//           {/* Sign In Link */}
//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600">
//               Already have an account?{' '}
//               <Link to="/login" className="font-medium text-purple-600 hover:text-blue-700">
//                 Sign in here
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;