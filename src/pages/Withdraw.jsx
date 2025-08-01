import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { 
  BanknotesIcon,
  CreditCardIcon,
  BuildingLibraryIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

const Withdraw = () => {
  const [withdrawalMethod, setWithdrawalMethod] = useState('bank');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock data
  const availableBalance = 45750;
  const minimumWithdrawal = 100;
  const maximumWithdrawal = 50000;

  const withdrawalMethods = [
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: BuildingLibraryIcon,
      processingTime: '1-3 business days',
      fee: 0,
      description: 'Direct transfer to your bank account'
    },
    {
      id: 'card',
      name: 'Debit Card',
      icon: CreditCardIcon,
      processingTime: 'Instant',
      fee: 2.5,
      description: 'Instant withdrawal to your debit card'
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      icon: BanknotesIcon,
      processingTime: '10-30 minutes',
      fee: 1.0,
      description: 'Withdraw to your crypto wallet'
    }
  ];

  const recentWithdrawals = [
    {
      id: 1,
      amount: 15000,
      method: 'Bank Transfer',
      status: 'completed',
      date: '2024-01-10',
      reference: 'WTH-2024-001'
    },
    {
      id: 2,
      amount: 5000,
      method: 'Debit Card',
      status: 'pending',
      date: '2024-01-08',
      reference: 'WTH-2024-002'
    },
    {
      id: 3,
      amount: 8500,
      method: 'Bank Transfer',
      status: 'completed',
      date: '2024-01-05',
      reference: 'WTH-2024-003'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateFee = () => {
    const selectedMethod = withdrawalMethods.find(m => m.id === withdrawalMethod);
    const withdrawAmount = parseFloat(amount) || 0;
    return (withdrawAmount * selectedMethod.fee) / 100;
  };

  const getNetAmount = () => {
    const withdrawAmount = parseFloat(amount) || 0;
    const fee = calculateFee();
    return withdrawAmount - fee;
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      alert('Withdrawal request submitted successfully!');
      setAmount('');
    }, 2000);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
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

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900  mb-2">
              Withdraw Funds
            </h1>
            <p className="text-gray-600">
              Withdraw your earnings to your preferred payment method
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Withdrawal Form */}
          <div className="lg:col-span-2">
            <div className="card p-8 mb-8">
              {/* Available Balance */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Available Balance</h3>
                    <p className="text-3xl font-bold text-blue-600">{formatCurrency(availableBalance)}</p>
                  </div>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <BanknotesIcon className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
              </div>

              {/* Withdrawal Methods */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Withdrawal Method</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {withdrawalMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <label key={method.id} className="cursor-pointer">
                        <input
                          type="radio"
                          name="withdrawalMethod"
                          value={method.id}
                          checked={withdrawalMethod === method.id}
                          onChange={(e) => setWithdrawalMethod(e.target.value)}
                          className="sr-only"
                        />
                        <div className={`p-6 border-2 rounded-lg transition-all duration-300 ${
                          withdrawalMethod === method.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <div className="flex flex-col items-center text-center">
                            <Icon className={`w-8 h-8 mb-3 ${
                              withdrawalMethod === method.id ? 'text-blue-600' : 'text-gray-400'
                            }`} />
                            <h4 className="font-semibold text-gray-900 mb-1">{method.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">{method.processingTime}</p>
                            <p className="text-xs text-gray-500">
                              Fee: {method.fee === 0 ? 'Free' : `${method.fee}%`}
                            </p>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Withdrawal Form */}
              <form onSubmit={handleWithdraw}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Withdrawal Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min={minimumWithdrawal}
                      max={Math.min(maximumWithdrawal, availableBalance)}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter amount"
                      required
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>Min: {formatCurrency(minimumWithdrawal)}</span>
                    <span>Max: {formatCurrency(Math.min(maximumWithdrawal, availableBalance))}</span>
                  </div>
                </div>

                {/* Quick Amount Buttons */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-3">Quick Select</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[1000, 5000, 10000, availableBalance].map((quickAmount) => (
                      <button
                        key={quickAmount}
                        type="button"
                        onClick={() => setAmount(quickAmount.toString())}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      >
                        {quickAmount === availableBalance ? 'All' : formatCurrency(quickAmount)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transaction Summary */}
                {amount && (
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Transaction Summary</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Withdrawal Amount:</span>
                        <span className="font-medium">{formatCurrency(parseFloat(amount) || 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Processing Fee:</span>
                        <span className="font-medium">{formatCurrency(calculateFee())}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2">
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-900">You'll Receive:</span>
                          <span className="font-bold text-green-600">{formatCurrency(getNetAmount())}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!amount || isProcessing || parseFloat(amount) < minimumWithdrawal}
                  className="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    'Withdraw Funds'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Important Information */}
            <div className="card p-6 mb-6">
              <div className="flex items-center mb-4">
                <InformationCircleIcon className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Important Information</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <p>• Withdrawals are processed during business hours (9 AM - 5 PM EST)</p>
                <p>• Bank transfers may take 1-3 business days to reflect in your account</p>
                <p>• Minimum withdrawal amount is {formatCurrency(minimumWithdrawal)}</p>
                <p>• Maximum daily withdrawal limit is {formatCurrency(maximumWithdrawal)}</p>
                <p>• All withdrawals are subject to verification for security purposes</p>
              </div>
            </div>

            {/* Recent Withdrawals */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Withdrawals</h3>
              <div className="space-y-4">
                {recentWithdrawals.map((withdrawal) => (
                  <div key={withdrawal.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(withdrawal.status)}
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {formatCurrency(withdrawal.amount)}
                        </p>
                        <p className="text-xs text-gray-500">{withdrawal.method}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={getStatusBadge(withdrawal.status)}>
                        {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(withdrawal.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
};

export default Withdraw;