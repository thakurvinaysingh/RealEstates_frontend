// src/pages/admin/AdminUserViewPage.jsx
// Single user view page (separate from list). Uses apiService.
// Route: <Route path="/admin/users/:userId" element={<AdminUserViewPage />} />

import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Loader2, BadgeCheck, ShieldBan, ShieldCheck,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight
} from 'lucide-react';
import { apiService } from '../../api/admin';

const cx = (...c) => c.filter(Boolean).join(' ');
const fmtDate = (d) => (d ? new Date(d).toLocaleDateString() : '-');
const fmtCurrency = (n) => (typeof n === 'number'
  ? n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
  : '-');

function StatusBadge({ status }) {
  const active = status === 'active';
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
        active ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
      )}
    >
      {active ? <BadgeCheck className="w-3.5 h-3.5" /> : <ShieldBan className="w-3.5 h-3.5" />}
      {active ? 'Active' : 'Blocked'}
    </span>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="mt-1 text-lg font-semibold text-blue-900">{value}</div>
    </div>
  );
}

function ToggleStatusButton({ userId, currentStatus, onChanged }) {
  const [busy, setBusy] = useState(false);
  const isActive = currentStatus === 'active';
  const next = isActive ? 'blocked' : 'active';

  async function onToggle() {
    if (busy) return;
    setBusy(true);
    try {
      const res = await apiService.setUserStatus(userId, next);
      onChanged?.(res.data.status);
    } catch (e) {
      alert(e.message || 'Failed to update status');
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={onToggle}
      className={cx(
        'inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm border shadow-sm transition',
        isActive
          ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
          : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
      )}
    >
      {busy ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : isActive ? (
        <ShieldBan className="w-4 h-4" />
      ) : (
        <ShieldCheck className="w-4 h-4" />
      )}
      {isActive ? 'Block user' : 'Unblock user'}
    </button>
  );
}

export default function AdminUserViewPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState(null); // { user, totalInvestments, totalInvestedAmount, investments }

  // pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const payload = await apiService.getUserInvestments(userId);
      setInfo(payload.data);
      setPage(1); // reset to first page when user changes
    } catch (e) {
      setError(e.message || 'Failed to load user details');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // derive pagination stuff
  const investments = useMemo(() => info?.investments || [], [info]);
  const total = investments.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  useEffect(() => {
    // keep page in bounds when pageSize changes or data updates
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const startIdx = (page - 1) * pageSize;
  const endIdx = Math.min(total, startIdx + pageSize);
  const pageData = investments.slice(startIdx, endIdx);

  return (
    <div className="p-6 space-y-6">
      {/* Header / Hero */}
      {/* <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-2xl border border-blue-200 text-blue-900 hover:bg-white/70"
            title="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-blue-900">User Details</h1>
            {info?.user && (
              <p className="text-sm text-blue-800/70 mt-0.5">
                {info.user.name} · {info.user.email}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {info?.user && <StatusBadge status={info.user.status} />}
            {info?.user && (
              <ToggleStatusButton
                userId={info.user.id || info.user._id || userId}
                currentStatus={info.user.status}
                onChanged={(newStatus) =>
                  setInfo((prev) => ({ ...prev, user: { ...prev.user, status: newStatus } }))
                }
              />
            )}
          </div>
        </div>
      </div> */}
      <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-5">
  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
    <button
      onClick={() => navigate(-1)}
      className="p-2 rounded-2xl border border-blue-200 text-blue-900 hover:bg-white/70 self-start"
      title="Back"
    >
      <ArrowLeft className="w-5 h-5" />
    </button>

    <div className="flex-1">
      <h1 className="text-lg sm:text-2xl font-bold text-blue-900">User Details</h1>
      {info?.user && (
        <p className="text-sm text-blue-800/70 mt-0.5">
          {info.user.name} · {info.user.email}
        </p>
      )}
    </div>

    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3">
      {info?.user && <StatusBadge status={info.user.status} />}
      {info?.user && (
        <ToggleStatusButton
          userId={info.user.id || info.user._id || userId}
          currentStatus={info.user.status}
          onChanged={(newStatus) =>
            setInfo((prev) => ({
              ...prev,
              user: { ...prev.user, status: newStatus },
            }))
          }
        />
      )}
    </div>
  </div>
</div>


      {loading && (
        <div className="text-blue-900/80 inline-flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading...
        </div>
      )}
      {error && (
        <div className="text-rose-700 bg-rose-50 border border-rose-200 p-3 rounded-xl">{error}</div>
      )}

      {!loading && !error && info && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <StatCard label="Total Investments" value={info.totalInvestments} />
            <StatCard label="Total Invested" value={fmtCurrency(info.totalInvestedAmount)} />
            <StatCard label="Account Status" value={<StatusBadge status={info.user?.status} />} />
          </div>

          {/* Investment table card */}
          <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-blue-100 flex items-center justify-between">
              <div className="font-semibold text-blue-900">Investment History</div>

              {/* Page size selector */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">Rows per page:</span>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="rounded-lg border border-blue-200 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {[5, 10, 20, 50].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-4 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="py-2 pr-4">Property</th>
                    <th className="py-2 pr-4">Start</th>
                    <th className="py-2 pr-4">End</th>
                    <th className="py-2 pr-4">Amount</th>
                    <th className="py-2 pr-4">Slots</th>
                  </tr>
                </thead>
                <tbody>
                  {pageData.length ? (
                    pageData.map((inv) => (
                      <tr key={inv.investmentId} className="border-t hover:bg-blue-50/40">
                        <td className="py-2 pr-4 font-medium text-blue-900">
                          {inv.propertyTitle || '-'}
                        </td>
                        <td className="py-2 pr-4">{fmtDate(inv.startDate)}</td>
                        <td className="py-2 pr-4">{fmtDate(inv.endDate)}</td>
                        <td className="py-2 pr-4">{fmtCurrency(inv.amountInvested)}</td>
                        <td className="py-2 pr-4">{inv.slotsPurchased}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-gray-500">
                        No investments yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="px-4 py-3 border-t border-blue-100 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div className="text-sm text-gray-600">
                Showing{' '}
                <span className="font-medium text-blue-900">
                  {total ? startIdx + 1 : 0}–{endIdx}
                </span>{' '}
                of <span className="font-medium text-blue-900">{total}</span> entries
              </div>

              <div className="flex items-center gap-1">
                <PageBtn disabled={page === 1} onClick={() => setPage(1)} title="First">
                  <ChevronsLeft className="w-4 h-4" />
                </PageBtn>
                <PageBtn disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} title="Previous">
                  <ChevronLeft className="w-4 h-4" />
                </PageBtn>

                {/* Current page indicator */}
                <span className="px-3 py-1.5 rounded-lg border border-blue-200 text-sm text-blue-900 bg-blue-50">
                  Page {page} of {totalPages}
                </span>

                <PageBtn disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} title="Next">
                  <ChevronRight className="w-4 h-4" />
                </PageBtn>
                <PageBtn disabled={page === totalPages} onClick={() => setPage(totalPages)} title="Last">
                  <ChevronsRight className="w-4 h-4" />
                </PageBtn>
              </div>
            </div>
          </div>

          {/* Link back to list */}
          <div className="flex justify-end">
            <Link
              to="/admin/users-list"
              className="px-4 py-2 rounded-xl border border-blue-200 text-blue-900 hover:bg-blue-50"
            >
              Back to Users
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

/* small components */
function PageBtn({ disabled, onClick, title, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cx(
        'inline-flex items-center justify-center gap-1 rounded-lg border px-3 py-1.5 text-sm',
        'transition shadow-sm',
        disabled
          ? 'cursor-not-allowed border-gray-200 text-gray-400 bg-gray-50'
          : 'border-blue-200 text-blue-900 hover:bg-blue-50'
      )}
    >
      {children}
    </button>
  );
}



// // src/pages/admin/AdminUserViewPage.jsx
// // Single user view page (separate from list). Clean, maintainable. Uses apiService.
// // Route: <Route path="/admin/users/:userId" element={<AdminUserViewPage />} />

// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams, Link } from 'react-router-dom';
// import { ArrowLeft, Loader2, BadgeCheck, ShieldBan, ShieldCheck } from 'lucide-react';
// import { apiService } from '../../api/admin';

// const cx = (...c) => c.filter(Boolean).join(' ');
// const fmtDate = (d) => (d ? new Date(d).toLocaleDateString() : '-');
// const fmtCurrency = (n) => (typeof n === 'number' ? n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) : '-');

// function StatusBadge({ status }) {
//   const active = status === 'active';
//   return (
//     <span className={cx('inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium', active ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700')}>
//       {active ? <BadgeCheck className="w-3.5 h-3.5" /> : <ShieldBan className="w-3.5 h-3.5" />}
//       {active ? 'Active' : 'Blocked'}
//     </span>
//   );
// }

// function StatCard({ label, value }) {
//   return (
//     <div className="rounded-2xl border p-4 shadow-sm">
//       <div className="text-xs text-gray-500">{label}</div>
//       <div className="mt-1 text-lg font-semibold">{value}</div>
//     </div>
//   );
// }

// function ToggleStatusButton({ userId, currentStatus, onChanged }) {
//   const [busy, setBusy] = useState(false);
//   const isActive = currentStatus === 'active';
//   const next = isActive ? 'blocked' : 'active';

//   async function onToggle() {
//     if (busy) return;
//     setBusy(true);
//     try {
//       const res = await apiService.setUserStatus(userId, next);
//       onChanged?.(res.data.status);
//     } catch (e) {
//       alert(e.message || 'Failed to update status');
//     } finally { setBusy(false); }
//   }

//   return (
//     <button
//       onClick={onToggle}
//       className={cx('inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm border shadow-sm', isActive ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100' : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100')}
//     >
//       {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : (isActive ? <ShieldBan className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />)}
//       {isActive ? 'Block user' : 'Unblock user'}
//     </button>
//   );
// }

// export default function AdminUserViewPage() {
//   const { userId } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [info, setInfo] = useState(null); // { user, totalInvestments, totalInvestedAmount, investments }

//   async function load() {
//     setLoading(true); setError('');
//     try {
//       const payload = await apiService.getUserInvestments(userId);
//       setInfo(payload.data);
//     } catch (e) {
//       setError(e.message || 'Failed to load user details');
//     } finally { setLoading(false); }
//   }

//   useEffect(() => { load(); }, [userId]);

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex items-center gap-3">
//         <button onClick={() => navigate(-1)} className="p-2 rounded-2xl border hover:bg-gray-50" title="Back"><ArrowLeft className="w-5 h-5" /></button>
//         <div>
//           <h1 className="text-2xl font-bold">User Details</h1>
//           {info?.user && (
//             <p className="text-sm text-gray-500">{info.user.name} · {info.user.email}</p>
//           )}
//         </div>
//         <div className="ml-auto">
//           {info?.user && (
//             <ToggleStatusButton
//               userId={info.user.id || info.user._id || userId}
//               currentStatus={info.user.status}
//               onChanged={(newStatus) => setInfo(prev => ({ ...prev, user: { ...prev.user, status: newStatus } }))}
//             />
//           )}
//         </div>
//       </div>

//       {loading && <div className="text-gray-600 inline-flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Loading...</div>}
//       {error && <div className="text-rose-700 bg-rose-50 border border-rose-200 p-3 rounded-xl">{error}</div>}

//       {!loading && !error && info && (
//         <div className="space-y-6">
//           {/* Stats */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//             <StatCard label="Total Investments" value={info.totalInvestments} />
//             <StatCard label="Total Invested" value={fmtCurrency(info.totalInvestedAmount)} />
//             <StatCard label="Status" value={<StatusBadge status={info.user?.status} />} />
//           </div>

//           {/* Investment table */}
//           <div className="bg-white rounded-2xl border shadow-sm">
//             <div className="p-4 border-b font-semibold">Investment History</div>
//             <div className="p-4 overflow-x-auto">
//               <table className="min-w-full text-sm">
//                 <thead>
//                   <tr className="text-left text-gray-500">
//                     <th className="py-2 pr-4">Property</th>
//                     <th className="py-2 pr-4">Start</th>
//                     <th className="py-2 pr-4">End</th>
//                     <th className="py-2 pr-4">Amount</th>
//                     <th className="py-2 pr-4">Slots</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {info.investments?.length ? info.investments.map((inv) => (
//                     <tr key={inv.investmentId} className="border-t">
//                       <td className="py-2 pr-4">{inv.propertyTitle || '-'}</td>
//                       <td className="py-2 pr-4">{fmtDate(inv.startDate)}</td>
//                       <td className="py-2 pr-4">{fmtDate(inv.endDate)}</td>
//                       <td className="py-2 pr-4">{fmtCurrency(inv.amountInvested)}</td>
//                       <td className="py-2 pr-4">{inv.slotsPurchased}</td>
//                     </tr>
//                   )) : (
//                     <tr><td colSpan={5} className="py-6 text-center text-gray-500">No investments yet.</td></tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Link back to list */}
//           <div className="flex justify-end">
//             <Link to="/admin/users-list" className="px-4 py-2 rounded-xl border hover:bg-gray-50">Back to Users</Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
