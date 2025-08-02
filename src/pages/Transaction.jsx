import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

const Transaction = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock transaction data
  const transactions = [
    {
      id: 'TXN001',
      type: 'investment',
      description: 'Investment in Luxury Downtown Condo',
      amount: -450000,
      status: 'completed',
      date: '2024-01-15',
      property: 'Luxury Downtown Condo',
      location: 'Manhattan, NY',
      reference: 'INV-2024-001'
    },
    {
      id: 'TXN002',
      type: 'dividend',
      description: 'Monthly Dividend - Beachfront Villa',
      amount: 7300,
      status: 'completed',
      date: '2024-01-10',
      property: 'Beachfront Villa',
      location: 'Miami, FL',
      reference: 'DIV-2024-001'
    },
    {
      id: 'TXN003',
      type: 'withdrawal',
      description: 'Withdrawal to Bank Account',
      amount: -15000,
      status: 'pending',
      date: '2024-01-08',
      property: null,
      location: null,
      reference: 'WTH-2024-001'
    },
    {
      id: 'TXN004',
      type: 'investment',
      description: 'Investment in Commercial Office Space',
      amount: -680000,
      status: 'completed',
      date: '2024-01-05',
      property: 'Commercial Office Space',
      location: 'Seattle, WA',
      reference: 'INV-2024-002'
    },
    {
      id: 'TXN005',
      type: 'dividend',
      description: 'Monthly Dividend - Suburban Family Home',
      amount: 2800,
      status: 'completed',
      date: '2024-01-03',
      property: 'Suburban Family Home',
      location: 'Austin, TX',
      reference: 'DIV-2024-002'
    },
    {
      id: 'TXN006',
      type: 'fee',
      description: 'Platform Management Fee',
      amount: -250,
      status: 'completed',
      date: '2024-01-01',
      property: null,
      location: null,
      reference: 'FEE-2024-001'
    },
    {
      id: 'TXN007',
      type: 'dividend',
      description: 'Monthly Dividend - Downtown Condo',
      amount: 3200,
      status: 'failed',
      date: '2023-12-28',
      property: 'Luxury Downtown Condo',
      location: 'Manhattan, NY',
      reference: 'DIV-2023-012'
    },
    {
      id: 'TXN008',
      type: 'investment',
      description: 'Investment in Beachfront Villa',
      amount: -650000,
      status: 'completed',
      date: '2023-12-20',
      property: 'Beachfront Villa',
      location: 'Miami, FL',
      reference: 'INV-2023-008'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(amount));
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'investment':
        return <ArrowDownIcon className="w-5 h-5 text-red-500" />;
      case 'dividend':
        return <ArrowUpIcon className="w-5 h-5 text-green-500" />;
      case 'withdrawal':
        return <ArrowDownIcon className="w-5 h-5 text-blue-500" />;
      case 'fee':
        return <DocumentTextIcon className="w-5 h-5 text-gray-500" />;
      default:
        return <CurrencyDollarIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      default:
        return <ClockIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return 'badge badge-success';
      case 'pending':
        return 'badge badge-warning';
      case 'failed':
        return 'badge bg-red-100 text-red-800';
      default:
        return 'badge bg-gray-100 text-gray-800';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesSearch = searchTerm === '' || 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesType && matchesSearch;
  });

  // Calculate summary stats
  const totalIncome = transactions
    .filter(t => t.amount > 0 && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.amount < 0 && t.status === 'completed')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900  mb-2">
                Transaction History
              </h1>
              <p className="text-gray-600">
                View and manage all your financial transactions
              </p>
            </div>
            <button className="flex items-center gap-2 bg-purple-500 hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 rounded-lg text-white font-semibold px-4 py-2 mt-4 md:mt-0 shadow-md transition-all duration-200">
            <DocumentTextIcon className="w-5 h-5" />
            Export Report
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ArrowUpIcon className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-green-600 text-sm font-medium">Income</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(totalIncome)}
            </h3>
            <p className="text-gray-600 text-sm">Total Received</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <ArrowDownIcon className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-red-600 text-sm font-medium">Expenses</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(totalExpenses)}
            </h3>
            <p className="text-gray-600 text-sm">Total Spent</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CurrencyDollarIcon className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-blue-600 text-sm font-medium">Net</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(totalIncome - totalExpenses)}
            </h3>
            <p className="text-gray-600 text-sm">Net Flow</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="investment">Investment</option>
              <option value="dividend">Dividend</option>
              <option value="withdrawal">Withdrawal</option>
              <option value="fee">Fee</option>
            </select>

            <button className="btn-outline flex items-center justify-center">
              <FunnelIcon className="w-5 h-5 mr-2" />
              More Filters
            </button>
          </div>
        </div>

        {/* Transaction List */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reference
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {transaction.description}
                          </p>
                          {transaction.property && (
                            <p className="text-xs text-gray-500">
                              {transaction.property} • {transaction.location}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-semibold ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(transaction.status)}
                        <span className={getStatusBadge(transaction.status)}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{new Date(transaction.date).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500 font-mono">
                        {transaction.reference}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredTransactions.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredTransactions.length}</span> of{' '}
              <span className="font-medium">{transactions.length}</span> results
            </p>
            <div className="flex space-x-2">
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                1
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </DashboardLayout>
  );
};

export default Transaction;