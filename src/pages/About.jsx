import React from 'react';
import HomeLayout from '../layouts/HomeLayout';

const About = () => {
  return (
    <HomeLayout>
    <div className="min-h-screen py-12 bg-gradient-to-br from-white via-white to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 ">
              About Propy Cons
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Your trusted partner in real estate since 2010 - Connecting dreams with reality
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🏡 Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At Propy Cons, we are dedicated to revolutionizing the real estate experience 
                by providing exceptional service, expert guidance, and innovative solutions. 
                Our mission is to make property transactions seamless, transparent, and 
                rewarding for every client.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe that finding the perfect property should be an exciting journey, 
                not a stressful ordeal. Our team of experienced professionals works tirelessly 
                to understand your unique needs and deliver results that exceed expectations.
              </p>
            </div>

            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">⭐ What We Offer</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Residential and commercial property sales
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Property management and rental services
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Investment consultation and market analysis
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Legal support and documentation assistance
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Virtual tours and 3D property showcases
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  24/7 customer support and assistance
                </li>
              </ul>
            </div>
          </div>

          {/* Features Section */}
          <div className="card p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center ">Why Choose Propy Cons?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">✓</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Knowledge</h3>
                <p className="text-gray-600">
                  Our team has deep local market knowledge and years of experience in real estate
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Service</h3>
                <p className="text-gray-600">
                  Quick response times and efficient processes to get you results faster
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📱</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Technology Driven</h3>
                <p className="text-gray-600">
                  Modern tools and technology to provide the best property search experience
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="card p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center ">Our Commitment</h2>
            <div className="text-center">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                We are committed to providing exceptional real estate services that go beyond 
                expectations. Our team consists of licensed professionals, market experts, and 
                customer service specialists who are passionate about helping you achieve your 
                property goals.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We continuously invest in training, technology, and market research to stay 
                ahead of industry trends. Your success is our success, and we're dedicated 
                to building long-term relationships based on trust and results.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="card p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center ">Get In Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3 text-gray-600">
                  <p className="flex items-center">
                    <span className="w-5 h-5 bg-blue-600 rounded-full mr-3 flex items-center justify-center">
                      <span className="text-white text-xs">@</span>
                    </span>
                    Email: info@Propy Cons.com
                  </p>
                  <p className="flex items-center">
                    <span className="w-5 h-5 bg-green-600 rounded-full mr-3 flex items-center justify-center">
                      <span className="text-white text-xs">📞</span>
                    </span>
                    Phone: +1 (555) 123-4567
                  </p>
                  <p className="flex items-center">
                    <span className="w-5 h-5 bg-yellow-600 rounded-full mr-3 flex items-center justify-center">
                      <span className="text-white text-xs">🌐</span>
                    </span>
                    Address: 123 Real Estate Ave, Property City, PC 12345
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Business Hours</h3>
                <div className="space-y-2 text-gray-600">
                  <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                  <p>Saturday: 10:00 AM - 6:00 PM</p>
                  <p>Sunday: 12:00 PM - 5:00 PM</p>
                  <p>Emergency Support: 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </HomeLayout>
  );
};

export default About;