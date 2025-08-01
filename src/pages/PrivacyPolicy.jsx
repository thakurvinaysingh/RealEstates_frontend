import React from 'react';
import HomeLayout from '../layouts/HomeLayout';

const PrivacyPolicy = () => {
  return (
    <HomeLayout>
    <div className="min-h-screen py-12 bg-gradient-to-br from-purple-100 via-white to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 ">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600">
              How Own-A-Bit collects, uses, and protects your information
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Last updated: January 15, 2025
            </p>
          </div>

          {/* Main Content */}
          <div className="card p-8 mb-8">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">🔒 Your Privacy Matters</h2>
              <p className="text-blue-700 leading-relaxed">
                At PropertyHub, we are committed to protecting your privacy and ensuring 
                the security of your personal information. This privacy policy explains how we 
                collect, use, and safeguard your data when you use our real estate services.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  When you use our services, we may collect personal information such as:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-6">
                  <li>Name, email address, and phone number</li>
                  <li>Property preferences and search criteria</li>
                  <li>Financial information for pre-qualification</li>
                  <li>Communication history and preferences</li>
                  <li>Property viewing and inquiry history</li>
                  <li>Location data for property recommendations</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We automatically collect certain technical information, including:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li>IP address and device information</li>
                  <li>Browser type and operating system</li>
                  <li>Pages visited and time spent on our website</li>
                  <li>Referring websites and search terms</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We use the collected information for the following purposes:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li>To provide real estate services and property recommendations</li>
                  <li>To communicate about properties and market updates</li>
                  <li>To schedule property viewings and appointments</li>
                  <li>To process transactions and provide customer support</li>
                  <li>To improve our services and website functionality</li>
                  <li>To send newsletters and marketing communications (with consent)</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We may share your information in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
                  <li>With real estate agents and brokers involved in your transaction</li>
                  <li>With mortgage lenders and financial institutions (with your consent)</li>
                  <li>With legal professionals and title companies for closing processes</li>
                  <li>With service providers who assist in our operations</li>
                  <li>When required by law or to protect our legal rights</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We implement industry-standard security measures to protect your information:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure servers and regular security updates</li>
                  <li>Access controls and employee training</li>
                  <li>Regular security audits and monitoring</li>
                  <li>Secure backup and recovery systems</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li>Right to access your personal information</li>
                  <li>Right to correct inaccurate information</li>
                  <li>Right to delete your personal information</li>
                  <li>Right to restrict processing of your data</li>
                  <li>Right to data portability</li>
                  <li>Right to opt-out of marketing communications</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Contact Us</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you have questions about this privacy policy or want to exercise your rights, 
                  please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700"><strong>Email:</strong> privacy@OwnABit.com</p>
                  <p className="text-gray-700"><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p className="text-gray-700"><strong>Address:</strong> 123 Real Estate Ave, Property City, PC 12345</p>
                  <p className="text-gray-700"><strong>Response Time:</strong> Within 48 hours</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
    </HomeLayout>
  );
};

export default PrivacyPolicy;