// src/pages/account/Investment.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PlusIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { userApi } from '../api/user';

const formatCurrency = (amount) =>
  typeof amount === 'number'
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount)
    : '—';

export default function Investment() {
  const [activeTab, setActiveTab] = useState('overview');

  // ---- stats (top KPIs) ----
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState('');

  // ---- investments list ----
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [inv, setInv] = useState(null); // { investments, pagination, totals }
  const [invLoading, setInvLoading] = useState(true);
  const [invError, setInvError] = useState('');

  // Load stats
  useEffect(() => {
    (async () => {
      try {
        setStatsLoading(true);
        setStatsError('');
        const res = await userApi.getMyStats(); // { success, message, data }
        setStats(res.data);
      } catch (e) {
        setStatsError(e.message || 'Failed to load portfolio stats');
      } finally {
        setStatsLoading(false);
      }
    })();
  }, []);

  // Load investments
  async function loadInvestments(p = page, l = limit) {
    try {
      setInvLoading(true);
      setInvError('');
      const res = await userApi.getMyInvestments({ page: p, limit: l }); // { success, message, data }
      setInv(res.data);
    } catch (e) {
      setInvError(e.message || 'Failed to load investments');
    } finally {
      setInvLoading(false);
    }
  }

  useEffect(() => {
    loadInvestments(1, limit); // reset to first page when limit changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  const portfolioStats = useMemo(() => {
    return {
      totalValue: stats?.portfolioValue ?? 0,
      totalInvested: stats?.totalInvested ?? 0,
      totalReturn: Math.max(0, (stats?.portfolioValue ?? 0) - (stats?.totalInvested ?? 0)),
      returnPercentage:
        stats && stats.totalInvested
          ? Math.max(0, ((stats.portfolioValue - stats.totalInvested) / stats.totalInvested) * 100)
          : 0,
      activeProperties: stats?.totalProperties ?? 0,
      monthlyIncome: stats?.monthlyIncome ?? 0,
      roi: stats?.roi ?? 0,
    };
  }, [stats]);

  const investments = inv?.investments || [];
  const pag = inv?.pagination || { page: 1, pages: 1, total: 0 };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-bold text-blue-900 mb-2">Investment Portfolio</h1>
                <p className="text-gray-600">Track your real estate investments and returns</p>
              </div>

              <Link
                to="/dashboard/investment"
                className="flex items-center gap-2 bg-purple-500 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-200 mt-4 md:mt-0"
              >
                <PlusIcon className="w-5 h-5" />
                New Investment
              </Link>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Stats / KPIs */}
          {statsError && (
            <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700">
              {statsError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {statsLoading ? (
              // skeletons
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="card p-6 animate-pulse">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                    <div className="h-4 w-16 bg-gray-200 rounded" />
                  </div>
                  <div className="h-8 w-32 bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-28 bg-gray-100 rounded" />
                </div>
              ))
            ) : (
              <>
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CurrencyDollarIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-green-600 text-sm font-medium flex items-center">
                      <ArrowUpIcon className="w-4 h-4 mr-1" />
                      +{portfolioStats.returnPercentage.toFixed(2)}%
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {formatCurrency(portfolioStats.totalValue)}
                  </h3>
                  <p className="text-gray-600 text-sm">Total Portfolio Value</p>
                </div>

                <div className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <ArrowTrendingUpIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-green-600 text-sm font-medium">
                      {formatCurrency(portfolioStats.totalReturn)}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {formatCurrency(portfolioStats.totalInvested)}
                  </h3>
                  <p className="text-gray-600 text-sm">Total Invested</p>
                </div>

                <div className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <BuildingOfficeIcon className="w-6 h-6 text-yellow-600" />
                    </div>
                    <span className="text-blue-600 text-sm font-medium">
                      {portfolioStats.activeProperties} Properties
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {formatCurrency(portfolioStats.monthlyIncome)}
                  </h3>
                  <p className="text-gray-600 text-sm">Monthly Income</p>
                </div>
              </>
            )}
          </div>

          {/* Tabs */}
          <div className="card mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex flex-wrap gap-6 px-6">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'properties', label: 'Properties' },
                  { id: 'performance', label: 'Performance' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Snapshot</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Total Properties</span>
                        <span className="font-semibold">{portfolioStats.activeProperties}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">ROI</span>
                        <span className="font-semibold text-green-600">
                          {typeof portfolioStats.roi === 'number'
                            ? `${portfolioStats.roi.toFixed(2)}%`
                            : '—'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Monthly Income</span>
                        <span className="font-semibold">
                          {formatCurrency(portfolioStats.monthlyIncome)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Dividends (est.)</p>
                          <p className="text-xs text-gray-500">
                            Based on property annual return and invested amounts
                          </p>
                        </div>
                        <span className="text-xs text-gray-500">auto</span>
                      </div>
                      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Portfolio updates</p>
                          <p className="text-xs text-gray-500">New properties & value changes</p>
                        </div>
                        <span className="text-xs text-gray-500">auto</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PROPERTIES = My Investments */}
              {activeTab === 'properties' && (
                <div className="space-y-4">
                  {invError && (
                    <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700">
                      {invError}
                    </div>
                  )}

                  {/* list */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {invLoading
                      ? Array.from({ length: 4 }).map((_, i) => (
                          <div
                            key={i}
                            className="border border-gray-200 rounded-lg overflow-hidden p-6 animate-pulse"
                          >
                            <div className="h-5 w-40 bg-gray-200 rounded mb-2" />
                            <div className="h-4 w-24 bg-gray-100 rounded mb-4" />
                            <div className="grid grid-cols-2 gap-4">
                              <div className="h-5 w-24 bg-gray-200 rounded" />
                              <div className="h-5 w-24 bg-gray-200 rounded" />
                              <div className="h-5 w-24 bg-gray-200 rounded" />
                              <div className="h-5 w-24 bg-gray-200 rounded" />
                            </div>
                          </div>
                        ))
                      : investments.map((it) => (
                          <div
                            key={it.investmentId}
                            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                          >
                            <div className="p-6">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="text-lg font-semibold text-gray-900 truncate">
                                  {it.propertyTitle || 'Property'}
                                </h4>
                                <span className="badge badge-success">Active</span>
                              </div>

                              <div className="text-gray-600 text-sm mb-3 flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4" />
                                <span>
                                  {it.startDate
                                    ? new Date(it.startDate).toLocaleDateString()
                                    : '-'}{' '}
                                  —{' '}
                                  {it.endDate ? new Date(it.endDate).toLocaleDateString() : '-'}
                                </span>
                              </div>

                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                  <p className="text-xs text-gray-500">Invested</p>
                                  <p className="font-semibold">
                                    {formatCurrency(it.amountInvested)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Slots</p>
                                  <p className="font-semibold">{it.slotsPurchased}</p>
                                </div>
                                {/* keep placeholders for consistency */}
                                <div>
                                  <p className="text-xs text-gray-500">Return (est.)</p>
                                  <p className="font-semibold text-green-600">—</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Monthly (est.)</p>
                                  <p className="font-semibold">—</p>
                                </div>
                              </div>

                              {it.propertyId && (
                                <Link
                                  to={`/property/${it.propertyId}`}
                                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                  View Details →
                                </Link>
                              )}
                            </div>
                          </div>
                        ))}
                  </div>

                  {/* pagination */}
                  {!invLoading && !!pag.total && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                      <div className="text-sm text-gray-600">
                        Page <span className="font-medium text-blue-900">{pag.page}</span> of{' '}
                        <span className="font-medium text-blue-900">{pag.pages}</span> •{' '}
                        <span className="font-medium text-blue-900">{pag.total}</span> total
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={limit}
                          onChange={(e) => setLimit(Number(e.target.value))}
                          className="rounded-lg border px-2 py-1"
                        >
                          {[4, 8, 12, 20].map((n) => (
                            <option key={n} value={n}>
                              {n}/page
                            </option>
                          ))}
                        </select>

                        <button
                          className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 disabled:opacity-50"
                          disabled={pag.page <= 1}
                          onClick={() => {
                            const np = Math.max(1, pag.page - 1);
                            setPage(np);
                            loadInvestments(np, limit);
                          }}
                        >
                          Prev
                        </button>
                        <button
                          className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 disabled:opacity-50"
                          disabled={pag.page >= pag.pages}
                          onClick={() => {
                            const np = Math.min(pag.pages, pag.page + 1);
                            setPage(np);
                            loadInvestments(np, limit);
                          }}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* PERFORMANCE (kept placeholder UI) */}
              {activeTab === 'performance' && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Performance Metrics
                      </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                          <span className="text-gray-700">Average ROI</span>
                          <span className="font-semibold text-green-600">
                            {typeof portfolioStats.roi === 'number'
                              ? `+${portfolioStats.roi.toFixed(2)}%`
                              : '—'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                          <span className="text-gray-700">Best Performing</span>
                          <span className="font-semibold">—</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                          <span className="text-gray-700">Total Dividends (est.)</span>
                          <span className="font-semibold">
                            {formatCurrency(Math.round((stats?.monthlyIncome || 0) * 12))}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Trends</h3>
                      <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">Performance Chart Coming Soon</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}




// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import DashboardLayout from '../layouts/DashboardLayout';
// import { 
//   ChartBarIcon, 
//   ArrowTrendingUpIcon, 
//   CurrencyDollarIcon, 
//   BuildingOfficeIcon,
//   CalendarIcon,
//   ArrowUpIcon,
//   ArrowDownIcon,
//   PlusIcon
// } from '@heroicons/react/24/outline';

// const Investment = () => {
//   const [activeTab, setActiveTab] = useState('overview');

//   // Mock investment data
//   const portfolioStats = {
//     totalValue: 2450000,
//     totalInvested: 2100000,
//     totalReturn: 350000,
//     returnPercentage: 16.67,
//     activeProperties: 8,
//     monthlyIncome: 18500
//   };

//   const investments = [
//     {
//       id: 1,
//       propertyName: "Luxury Downtown Condo",
//       location: "Manhattan, NY",
//       investedAmount: 450000,
//       currentValue: 520000,
//       returnAmount: 70000,
//       returnPercentage: 15.56,
//       monthlyIncome: 3200,
//       status: "Active",
//       image: "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=400"
//     },
//     {
//       id: 2,
//       propertyName: "Suburban Family Home",
//       location: "Austin, TX",
//       investedAmount: 320000,
//       currentValue: 385000,
//       returnAmount: 65000,
//       returnPercentage: 20.31,
//       monthlyIncome: 2800,
//       status: "Active",
//       image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400"
//     },
//     {
//       id: 3,
//       propertyName: "Commercial Office Space",
//       location: "Seattle, WA",
//       investedAmount: 680000,
//       currentValue: 750000,
//       returnAmount: 70000,
//       returnPercentage: 10.29,
//       monthlyIncome: 5200,
//       status: "Active",
//       image: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=400"
//     },
//     {
//       id: 4,
//       propertyName: "Beachfront Villa",
//       location: "Miami, FL",
//       investedAmount: 650000,
//       currentValue: 795000,
//       returnAmount: 145000,
//       returnPercentage: 22.31,
//       monthlyIncome: 7300,
//       status: "Active",
//       image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400"
//     }
//   ];

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(amount);
//   };

//   return (
//     <DashboardLayout>
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="container mx-auto px-4 py-6">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900  mb-2">
//                 Investment Portfolio
//               </h1>
//               <p className="text-gray-600">
//                 Track your real estate investments and returns
//               </p>
//             </div>
//             {/* <button className="bg-purple-500 rounded-lg py-2 px-2 text-white mt-4 md:mt-0">
//               <PlusIcon className="w-5 h-5 mr-2" />
//               New Investment
//             </button> */}
//            <Link
//                 to="/dashboard/investment/"
//                 className="flex items-center gap-2 bg-purple-500 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-200 mt-4 md:mt-0"
//                 >
//                 <PlusIcon className="w-5 h-5" />
//                 New Investment
//                 </Link>

//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         {/* Portfolio Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           <div className="card p-6">
//             <div className="flex items-center justify-between mb-4">
//               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                 <CurrencyDollarIcon className="w-6 h-6 text-blue-600" />
//               </div>
//               <span className="text-green-600 text-sm font-medium flex items-center">
//                 <ArrowUpIcon className="w-4 h-4 mr-1" />
//                 +{portfolioStats.returnPercentage}%
//               </span>
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-1">
//               {formatCurrency(portfolioStats.totalValue)}
//             </h3>
//             <p className="text-gray-600 text-sm">Total Portfolio Value</p>
//           </div>

//           <div className="card p-6">
//             <div className="flex items-center justify-between mb-4">
//               <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                 <ArrowTrendingUpIcon className="w-6 h-6 text-green-600" />
//               </div>
//               <span className="text-green-600 text-sm font-medium">
//                 {formatCurrency(portfolioStats.totalReturn)}
//               </span>
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-1">
//               {formatCurrency(portfolioStats.totalInvested)}
//             </h3>
//             <p className="text-gray-600 text-sm">Total Invested</p>
//           </div>

//           <div className="card p-6">
//             <div className="flex items-center justify-between mb-4">
//               <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
//                 <BuildingOfficeIcon className="w-6 h-6 text-yellow-600" />
//               </div>
//               <span className="text-blue-600 text-sm font-medium">
//                 {portfolioStats.activeProperties} Properties
//               </span>
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-1">
//               {formatCurrency(portfolioStats.monthlyIncome)}
//             </h3>
//             <p className="text-gray-600 text-sm">Monthly Income</p>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="card mb-8">
//           <div className="border-b border-gray-200">
//             <nav className="flex space-x-8 px-6">
//               {[
//                 { id: 'overview', label: 'Overview' },
//                 { id: 'properties', label: 'Properties' },
//                 { id: 'performance', label: 'Performance' }
//               ].map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300 ${
//                     activeTab === tab.id
//                       ? 'border-blue-500 text-blue-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   {tab.label}
//                 </button>
//               ))}
//             </nav>
//           </div>

//           <div className="p-6">
//             {activeTab === 'overview' && (
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Distribution</h3>
//                   <div className="space-y-4">
//                     <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                       <span className="text-gray-700">Residential Properties</span>
//                       <span className="font-semibold">65%</span>
//                     </div>
//                     <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                       <span className="text-gray-700">Commercial Properties</span>
//                       <span className="font-semibold">25%</span>
//                     </div>
//                     <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                       <span className="text-gray-700">Mixed-Use Properties</span>
//                       <span className="font-semibold">10%</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
//                   <div className="space-y-4">
//                     <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                       <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                       <div className="flex-1">
//                         <p className="text-sm font-medium text-gray-900">Dividend Received</p>
//                         <p className="text-xs text-gray-500">Beachfront Villa - $7,300</p>
//                       </div>
//                       <span className="text-xs text-gray-500">2 days ago</span>
//                     </div>
//                     <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                       <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                       <div className="flex-1">
//                         <p className="text-sm font-medium text-gray-900">Property Value Updated</p>
//                         <p className="text-xs text-gray-500">Downtown Condo +$15,000</p>
//                       </div>
//                       <span className="text-xs text-gray-500">5 days ago</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'properties' && (
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {investments.map((investment) => (
//                   <div key={investment.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
//                     <img
//                       src={investment.image}
//                       alt={investment.propertyName}
//                       className="w-full h-48 object-cover"
//                     />
//                     <div className="p-6">
//                       <div className="flex items-center justify-between mb-2">
//                         <h4 className="text-lg font-semibold text-gray-900">{investment.propertyName}</h4>
//                         <span className="badge badge-success">{investment.status}</span>
//                       </div>
//                       <p className="text-gray-600 text-sm mb-4">{investment.location}</p>
                      
//                       <div className="grid grid-cols-2 gap-4 mb-4">
//                         <div>
//                           <p className="text-xs text-gray-500">Invested</p>
//                           <p className="font-semibold">{formatCurrency(investment.investedAmount)}</p>
//                         </div>
//                         <div>
//                           <p className="text-xs text-gray-500">Current Value</p>
//                           <p className="font-semibold">{formatCurrency(investment.currentValue)}</p>
//                         </div>
//                         <div>
//                           <p className="text-xs text-gray-500">Return</p>
//                           <p className="font-semibold text-green-600">
//                             +{investment.returnPercentage}%
//                           </p>
//                         </div>
//                         <div>
//                           <p className="text-xs text-gray-500">Monthly Income</p>
//                           <p className="font-semibold">{formatCurrency(investment.monthlyIncome)}</p>
//                         </div>
//                       </div>
                      
//                       <Link
//                         to={`/property/${investment.id}`}
//                         className="text-blue-600 hover:text-blue-700 text-sm font-medium"
//                       >
//                         View Details →
//                       </Link>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {activeTab === 'performance' && (
//               <div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
//                     <div className="space-y-4">
//                       <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
//                         <span className="text-gray-700">Average ROI</span>
//                         <span className="font-semibold text-green-600">+16.67%</span>
//                       </div>
//                       <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
//                         <span className="text-gray-700">Best Performing</span>
//                         <span className="font-semibold">Beachfront Villa</span>
//                       </div>
//                       <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
//                         <span className="text-gray-700">Total Dividends</span>
//                         <span className="font-semibold">{formatCurrency(222000)}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Trends</h3>
//                     <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
//                       <span className="text-gray-500">Performance Chart Coming Soon</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//     </DashboardLayout>
//   );
// };

// export default Investment;