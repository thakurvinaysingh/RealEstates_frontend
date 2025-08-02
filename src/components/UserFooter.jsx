import React from 'react';
import { Link } from 'react-router-dom';

const UserFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>&copy; 2025 Own-A-Bit. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <Link to="/privacy-policy" className="text-gray-500 hover:text-gray-700">
              Privacy Policy
            </Link>
            <Link to="/disclaimer" className="text-gray-500 hover:text-gray-700">
              Terms of Service
            </Link>
            <span className="text-gray-500">Support: +1 (555) 123-4567</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;