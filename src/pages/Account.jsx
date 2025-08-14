// src/pages/account/Profile.jsx
import React, { useEffect, useRef, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  CameraIcon,
  KeyIcon,
  BellIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { userApi } from '../api/user';

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  // ---- Real user data ----
  const [me, setMe] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const fileInputRef = useRef(null);

  // UI form state (includes extra fields you already had)
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    dateOfBirth: '',
    occupation: '',
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    emailNotifications: true,
    smsNotifications: false,
    loginAlerts: true,
  });

  // change password state (separate API)
  const [pwdOpen, setPwdOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [pwdMsg, setPwdMsg] = useState('');
  const [pwdBusy, setPwdBusy] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await userApi.getMe(); // { success, message, data }
        const u = res.data || {};
        setMe(u);

        const [firstName = '', ...rest] = (u.name || '').split(' ');
        const lastName = rest.join(' ');
        setProfileData((p) => ({
          ...p,
          firstName,
          lastName,
          email: u.email || '',
          countryCode: u.mobile?.countryCode || '',
          phone: u.mobile?.phoneNumber || '',
        }));
      } catch (e) {
        setMsg(e.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const avatarPreview = avatarFile
    ? URL.createObjectURL(avatarFile)
    : me?.avatarUrl ||
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150';

  function onPickAvatar() {
    fileInputRef.current?.click();
  }

  async function handleProfileUpdate(e) {
    e.preventDefault();
    setMsg('');
    setSaving(true);
    try {
      // Only fields supported by the backend are sent:
      const fd = new FormData();
      const name = `${profileData.firstName} ${profileData.lastName}`.trim();
      fd.append('name', name);
      fd.append('mobile.countryCode', profileData.countryCode || '');
      fd.append('mobile.phoneNumber', profileData.phone || '');
      if (avatarFile) fd.append('avatar', avatarFile); // field name: avatar

      const res = await userApi.updateMe(fd);
      const updated = res.data;

      // reflect in UI
      setMe(updated);
      const [firstName = '', ...rest] = (updated.name || '').split(' ');
      const lastName = rest.join(' ');
      setProfileData((p) => ({
        ...p,
        firstName,
        lastName,
        email: updated.email || p.email,
        countryCode: updated.mobile?.countryCode || p.countryCode,
        phone: updated.mobile?.phoneNumber || p.phone,
      }));
      setAvatarFile(null);
      setIsEditing(false);
      setMsg('Profile updated successfully ✅');
    } catch (e) {
      setMsg(e.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  }

  async function submitPasswordChange() {
    setPwdMsg('');
    setPwdBusy(true);
    try {
      await userApi.changePassword({ currentPassword, newPassword });
      setPwdMsg('Password changed successfully ✅');
      setCurrentPassword('');
      setNewPassword('');
      setPwdOpen(false);
    } catch (e) {
      setPwdMsg(e.message || 'Unable to change password');
    } finally {
      setPwdBusy(false);
    }
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'security', label: 'Security', icon: ShieldCheckIcon },
    { id: 'payments', label: 'Payment Methods', icon: CreditCardIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'documents', label: 'Documents', icon: DocumentTextIcon },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <div>
              <h1 className="text-3xl font-bold text-blue-900 mb-2">Account Settings</h1>
              <p className="text-gray-600">Manage your account information and preferences</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {msg && (
            <div className="mb-4 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-900">
              {msg}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="card p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="relative">
                    <img
                      src={avatarPreview}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover border"
                    />
                    <button
                      type="button"
                      onClick={onPickAvatar}
                      className="absolute bottom-0 right-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition-colors duration-200"
                      title="Change photo"
                    >
                      <CameraIcon className="w-4 h-4" />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mt-3">
                    {profileData.firstName || '—'} {profileData.lastName}
                  </h3>
                  <p className="text-sm text-gray-600">{profileData.email}</p>
                </div>

                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                          activeTab === tab.id
                            ? 'bg-purple-50 text-purple-600 border-r-2 border-purple-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="card p-8">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-blue-900">Profile Information</h2>
                      <button
                        onClick={() => setIsEditing((v) => !v)}
                        className="border border-purple-600 text-purple-600 hover:bg-purple-500 hover:text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                      >
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                      </button>
                    </div>

                    {loading ? (
                      <div className="text-gray-600">Loading profile…</div>
                    ) : (
                      <form onSubmit={handleProfileUpdate}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              First Name
                            </label>
                            <input
                              type="text"
                              value={profileData.firstName}
                              onChange={(e) =>
                                setProfileData({ ...profileData, firstName: e.target.value })
                              }
                              disabled={!isEditing}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Last Name
                            </label>
                            <input
                              type="text"
                              value={profileData.lastName}
                              onChange={(e) =>
                                setProfileData({ ...profileData, lastName: e.target.value })
                              }
                              disabled={!isEditing}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email Address
                            </label>
                            <div className="flex items-center gap-2">
                              <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                              <input
                                type="email"
                                value={profileData.email}
                                disabled
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                              />
                            </div>
                          </div>

                          {/* Phone split into country code + number (matches backend) */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Phone Number
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                              <input
                                type="text"
                                placeholder="+1"
                                value={profileData.countryCode}
                                onChange={(e) =>
                                  setProfileData({ ...profileData, countryCode: e.target.value })
                                }
                                disabled={!isEditing}
                                className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50"
                              />
                              <div className="col-span-2 flex items-center">
                                <PhoneIcon className="w-5 h-5 text-gray-400 mr-2" />
                                <input
                                  type="tel"
                                  value={profileData.phone}
                                  onChange={(e) =>
                                    setProfileData({ ...profileData, phone: e.target.value })
                                  }
                                  disabled={!isEditing}
                                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50"
                                />
                              </div>
                            </div>
                          </div>

                          {/* The fields below are UI-only for now (not sent to backend) */}
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Address
                            </label>
                            <input
                              type="text"
                              value={profileData.address}
                              onChange={(e) =>
                                setProfileData({ ...profileData, address: e.target.value })
                              }
                              disabled={!isEditing}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              City
                            </label>
                            <input
                              type="text"
                              value={profileData.city}
                              onChange={(e) =>
                                setProfileData({ ...profileData, city: e.target.value })
                              }
                              disabled={!isEditing}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              State
                            </label>
                            <input
                              type="text"
                              value={profileData.state}
                              onChange={(e) =>
                                setProfileData({ ...profileData, state: e.target.value })
                              }
                              disabled={!isEditing}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
                            />
                          </div>
                        </div>

                        {isEditing && (
                          <div className="mt-6">
                            <button
                              type="submit"
                              disabled={saving}
                              className="bg-purple-500 hover:bg-purple-700 disabled:opacity-60 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                            >
                              {saving ? 'Saving…' : 'Save Changes'}
                            </button>
                          </div>
                        )}
                      </form>
                    )}
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div>
                    <h2 className="text-2xl font-bold text-blue-900 mb-6">Security Settings</h2>

                    {/* Change password card */}
                    <div className="border border-gray-200 rounded-lg p-6 mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            Password
                          </h3>
                          <p className="text-gray-600">Update your account password</p>
                        </div>
                        <button
                          onClick={() => setPwdOpen((v) => !v)}
                          className="btn-outline flex items-center"
                        >
                          <KeyIcon className="w-5 h-5 mr-2" />
                          {pwdOpen ? 'Close' : 'Change Password'}
                        </button>
                      </div>

                      {pwdOpen && (
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="password"
                            placeholder="Current password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                          />
                          <input
                            type="password"
                            placeholder="New password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                          />
                          <div className="md:col-span-2">
                            <button
                              onClick={submitPasswordChange}
                              disabled={pwdBusy}
                              className="bg-purple-500 hover:bg-purple-700 disabled:opacity-60 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                            >
                              {pwdBusy ? 'Updating…' : 'Update Password'}
                            </button>
                            {pwdMsg && (
                              <div className="mt-2 text-sm text-gray-700">{pwdMsg}</div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Your other toggles remain (2FA, alerts) */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Two-Factor Authentication
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className="text-gray-600">
                          Add an extra layer of security to your account
                        </p>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={securitySettings.twoFactorAuth}
                            onChange={(e) =>
                              setSecuritySettings((s) => ({
                                ...s,
                                twoFactorAuth: e.target.checked,
                              }))
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                        </label>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6 mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Login Alerts</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-gray-600">
                          Get notified when someone logs into your account
                        </p>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={securitySettings.loginAlerts}
                            onChange={(e) =>
                              setSecuritySettings((s) => ({
                                ...s,
                                loginAlerts: e.target.checked,
                              }))
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Methods Tab (unchanged UI stub) */}
                {activeTab === 'payments' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-blue-900">Payment Methods</h2>
                      <button className="btn-primary">Add Payment Method</button>
                    </div>
                    <div className="space-y-4">
                      {/* keep your static examples here */}
                      <div className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <CreditCardIcon className="w-6 h-6 text-gray-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">Bank Account</h4>
                              <p className="text-gray-600">Chase Bank ****1234</p>
                              <span className="badge badge-primary">Default</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Tab (kept) */}
                {activeTab === 'notifications' && (
                  <div>
                    <h2 className="text-2xl font-bold text-blue-900 mb-6">
                      Notification Preferences
                    </h2>
                    {/* your existing toggles here */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Email Notifications
                      </h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Investment Updates</p>
                          <p className="text-sm text-gray-600">
                            Get notified about your investment performance
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={securitySettings.emailNotifications}
                            onChange={(e) =>
                              setSecuritySettings((s) => ({
                                ...s,
                                emailNotifications: e.target.checked,
                              }))
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Documents Tab (kept as is) */}
                {activeTab === 'documents' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-blue-900">Documents</h2>
                      <button className="btn-primary">Upload Document</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <DocumentTextIcon className="w-8 h-8 text-purple-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Identity Verification</h4>
                            <p className="text-sm text-gray-600">Driver's License</p>
                          </div>
                        </div>
                        <span className="badge badge-success">Verified</span>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <DocumentTextIcon className="w-8 h-8 text-yellow-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Income Verification</h4>
                            <p className="text-sm text-gray-600">Tax Returns</p>
                          </div>
                        </div>
                        <span className="badge badge-warning">Pending</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Account;


// import React, { useState } from 'react';
// import DashboardLayout from '../layouts/DashboardLayout';
// import { 
//   UserIcon,
//   EnvelopeIcon,
//   PhoneIcon,
//   MapPinIcon,
//   CameraIcon,
//   KeyIcon,
//   BellIcon,
//   ShieldCheckIcon,
//   CreditCardIcon,
//   DocumentTextIcon,
//   Cog6ToothIcon
// } from '@heroicons/react/24/outline';

// const Account = () => {
//   const [activeTab, setActiveTab] = useState('profile');
//   const [isEditing, setIsEditing] = useState(false);
//   const [profileData, setProfileData] = useState({
//     firstName: 'John',
//     lastName: 'Doe',
//     email: 'john.doe@example.com',
//     phone: '+1 (555) 123-4567',
//     address: '123 Main Street',
//     city: 'New York',
//     state: 'NY',
//     zipCode: '10001',
//     country: 'United States',
//     dateOfBirth: '1990-01-15',
//     occupation: 'Software Engineer'
//   });

//   const [securitySettings, setSecuritySettings] = useState({
//     twoFactorAuth: true,
//     emailNotifications: true,
//     smsNotifications: false,
//     loginAlerts: true
//   });

//   const [paymentMethods, setPaymentMethods] = useState([
//     {
//       id: 1,
//       type: 'Bank Account',
//       details: '****1234',
//       bank: 'Chase Bank',
//       isDefault: true
//     },
//     {
//       id: 2,
//       type: 'Credit Card',
//       details: '****5678',
//       bank: 'Visa',
//       isDefault: false
//     }
//   ]);

//   const handleProfileUpdate = (e) => {
//     e.preventDefault();
//     setIsEditing(false);
//     // Handle profile update logic here
//     alert('Profile updated successfully!');
//   };

//   const handleSecurityUpdate = (setting, value) => {
//     setSecuritySettings(prev => ({
//       ...prev,
//       [setting]: value
//     }));
//   };

//   const tabs = [
//     { id: 'profile', label: 'Profile', icon: UserIcon },
//     { id: 'security', label: 'Security', icon: ShieldCheckIcon },
//     { id: 'payments', label: 'Payment Methods', icon: CreditCardIcon },
//     { id: 'notifications', label: 'Notifications', icon: BellIcon },
//     { id: 'documents', label: 'Documents', icon: DocumentTextIcon }
//   ];

//   return (
//     <DashboardLayout>
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="container mx-auto px-4 py-6">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900  mb-2">
//               Account Settings
//             </h1>
//             <p className="text-gray-600">
//               Manage your account information and preferences
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Sidebar Navigation */}
//           <div className="lg:col-span-1">
//             <div className="card p-6">
//               <div className="flex flex-col items-center mb-6">
//                 <div className="relative">
//                   <img
//                     src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150"
//                     alt="Profile"
//                     className="w-20 h-20 rounded-full object-cover"
//                   />
//                   <button className="absolute bottom-0 right-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition-colors duration-200">
//                     <CameraIcon className="w-4 h-4" />
//                   </button>
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900 mt-3">
//                   {profileData.firstName} {profileData.lastName}
//                 </h3>
//                 <p className="text-sm text-gray-600">{profileData.email}</p>
//               </div>

//               <nav className="space-y-2">
//                 {tabs.map((tab) => {
//                   const Icon = tab.icon;
//                   return (
//                     <button
//                       key={tab.id}
//                       onClick={() => setActiveTab(tab.id)}
//                       className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
//                         activeTab === tab.id
//                           ? 'bg-purple-50 text-purple-600 border-r-2 border-purple-600'
//                           : 'text-gray-700 hover:bg-gray-50'
//                       }`}
//                     >
//                       <Icon className="w-5 h-5" />
//                       <span className="font-medium">{tab.label}</span>
//                     </button>
//                   );
//                 })}
//               </nav>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="lg:col-span-3">
//             <div className="card p-8">
//               {/* Profile Tab */}
//               {activeTab === 'profile' && (
//                 <div>
//                   <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
//                     <button
//                             onClick={() => setIsEditing(!isEditing)}
//                             className="border border-purple-600 text-purple-600 hover:bg-purple-500 hover:text-white font-medium py-2 px-4 rounded-lg transition duration-200"
//                             >
//                             {isEditing ? 'Cancel' : 'Edit Profile'}
//                             </button>

//                   </div>

//                   <form onSubmit={handleProfileUpdate}>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           First Name
//                         </label>
//                         <input
//                           type="text"
//                           value={profileData.firstName}
//                           onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
//                           disabled={!isEditing}
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Last Name
//                         </label>
//                         <input
//                           type="text"
//                           value={profileData.lastName}
//                           onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
//                           disabled={!isEditing}
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Email Address
//                         </label>
//                         <input
//                           type="email"
//                           value={profileData.email}
//                           onChange={(e) => setProfileData({...profileData, email: e.target.value})}
//                           disabled={!isEditing}
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Phone Number
//                         </label>
//                         <input
//                           type="tel"
//                           value={profileData.phone}
//                           onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
//                           disabled={!isEditing}
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
//                         />
//                       </div>

//                       <div className="md:col-span-2">
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Address
//                         </label>
//                         <input
//                           type="text"
//                           value={profileData.address}
//                           onChange={(e) => setProfileData({...profileData, address: e.target.value})}
//                           disabled={!isEditing}
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           City
//                         </label>
//                         <input
//                           type="text"
//                           value={profileData.city}
//                           onChange={(e) => setProfileData({...profileData, city: e.target.value})}
//                           disabled={!isEditing}
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           State
//                         </label>
//                         <input
//                           type="text"
//                           value={profileData.state}
//                           onChange={(e) => setProfileData({...profileData, state: e.target.value})}
//                           disabled={!isEditing}
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
//                         />
//                       </div>
//                     </div>

//                     {isEditing && (
//                       <div className="mt-6">
//                       <button
//                         type="submit"
//                         className="bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
//                         >
//                         Save Changes
//                         </button>

//                       </div>
//                     )}
//                   </form>
//                 </div>
//               )}

//               {/* Security Tab */}
//               {activeTab === 'security' && (
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>
                  
//                   <div className="space-y-6">
//                     <div className="border border-gray-200 rounded-lg p-6">
//                       <h3 className="text-lg font-semibold text-gray-900 mb-4">Password</h3>
//                       <p className="text-gray-600 mb-4">Last changed 3 months ago</p>
//                       <button className="btn-outline">
//                         <KeyIcon className="w-5 h-5 mr-2" />
//                         Change Password
//                       </button>
//                     </div>

//                     <div className="border border-gray-200 rounded-lg p-6">
//                       <h3 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="text-gray-600">Add an extra layer of security to your account</p>
//                         </div>
//                         <label className="relative inline-flex items-center cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={securitySettings.twoFactorAuth}
//                             onChange={(e) => handleSecurityUpdate('twoFactorAuth', e.target.checked)}
//                             className="sr-only peer"
//                           />
//                           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
//                         </label>
//                       </div>
//                     </div>

//                     <div className="border border-gray-200 rounded-lg p-6">
//                       <h3 className="text-lg font-semibold text-gray-900 mb-4">Login Alerts</h3>
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="text-gray-600">Get notified when someone logs into your account</p>
//                         </div>
//                         <label className="relative inline-flex items-center cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={securitySettings.loginAlerts}
//                             onChange={(e) => handleSecurityUpdate('loginAlerts', e.target.checked)}
//                             className="sr-only peer"
//                           />
//                           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Payment Methods Tab */}
//               {activeTab === 'payments' && (
//                 <div>
//                   <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
//                     <button className="btn-primary">
//                       Add Payment Method
//                     </button>
//                   </div>

//                   <div className="space-y-4">
//                     {paymentMethods.map((method) => (
//                       <div key={method.id} className="border border-gray-200 rounded-lg p-6">
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center space-x-4">
//                             <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
//                               <CreditCardIcon className="w-6 h-6 text-gray-600" />
//                             </div>
//                             <div>
//                               <h4 className="font-semibold text-gray-900">{method.type}</h4>
//                               <p className="text-gray-600">{method.bank} {method.details}</p>
//                               {method.isDefault && (
//                                 <span className="badge badge-primary">Default</span>
//                               )}
//                             </div>
//                           </div>
//                           <div className="flex space-x-2">
//                             <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
//                               Edit
//                             </button>
//                             <button className="text-red-600 hover:text-red-700 text-sm font-medium">
//                               Remove
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Notifications Tab */}
//               {activeTab === 'notifications' && (
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
                  
//                   <div className="space-y-6">
//                     <div className="border border-gray-200 rounded-lg p-6">
//                       <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h3>
//                       <div className="space-y-4">
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <p className="font-medium text-gray-900">Investment Updates</p>
//                             <p className="text-sm text-gray-600">Get notified about your investment performance</p>
//                           </div>
//                           <label className="relative inline-flex items-center cursor-pointer">
//                             <input
//                               type="checkbox"
//                               checked={securitySettings.emailNotifications}
//                               onChange={(e) => handleSecurityUpdate('emailNotifications', e.target.checked)}
//                               className="sr-only peer"
//                             />
//                             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
//                           </label>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="border border-gray-200 rounded-lg p-6">
//                       <h3 className="text-lg font-semibold text-gray-900 mb-4">SMS Notifications</h3>
//                       <div className="space-y-4">
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <p className="font-medium text-gray-900">Transaction Alerts</p>
//                             <p className="text-sm text-gray-600">Get SMS alerts for important transactions</p>
//                           </div>
//                           <label className="relative inline-flex items-center cursor-pointer">
//                             <input
//                               type="checkbox"
//                               checked={securitySettings.smsNotifications}
//                               onChange={(e) => handleSecurityUpdate('smsNotifications', e.target.checked)}
//                               className="sr-only peer"
//                             />
//                             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
//                           </label>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Documents Tab */}
//               {activeTab === 'documents' && (
//                 <div>
//                   <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-2xl font-bold text-gray-900">Documents</h2>
//                     <button className="btn-primary">
//                       Upload Document
//                     </button>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="border border-gray-200 rounded-lg p-6">
//                       <div className="flex items-center space-x-4 mb-4">
//                         <DocumentTextIcon className="w-8 h-8 text-purple-600" />
//                         <div>
//                           <h4 className="font-semibold text-gray-900">Identity Verification</h4>
//                           <p className="text-sm text-gray-600">Driver's License</p>
//                         </div>
//                       </div>
//                       <span className="badge badge-success">Verified</span>
//                     </div>

//                     <div className="border border-gray-200 rounded-lg p-6">
//                       <div className="flex items-center space-x-4 mb-4">
//                         <DocumentTextIcon className="w-8 h-8 text-yellow-600" />
//                         <div>
//                           <h4 className="font-semibold text-gray-900">Income Verification</h4>
//                           <p className="text-sm text-gray-600">Tax Returns</p>
//                         </div>
//                       </div>
//                       <span className="badge badge-warning">Pending</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </DashboardLayout>
//   );
// };

// export default Account;