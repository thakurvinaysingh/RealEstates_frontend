// src/pages/admin/AdminUsersPage.jsx
// Users → All Users list page (responsive + pagination)
// Route: <Route path="/admin/users" element={<AdminUsersPage />} />

import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  LayoutGrid,
  List as ListIcon,
  Eye,
  Loader2,
  ShieldBan,
  ShieldCheck,
  BadgeCheck,
  Phone,
  Mail,
  User2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { apiService } from '../../api/admin';

/******************** utils ********************/
const cx = (...c) => c.filter(Boolean).join(' ');
const fmtPhone = (m) => (!m ? '-' : [m.countryCode, m.phoneNumber].filter(Boolean).join(' '));

function StatusBadge({ status, className = '' }) {
  const active = status === 'active';
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap',
        active ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700',
        className
      )}
    >
      {active ? <BadgeCheck className="w-3.5 h-3.5" /> : <ShieldBan className="w-3.5 h-3.5" />}
      {active ? 'Active' : 'Blocked'}
    </span>
  );
}

function ToggleStatusButton({ user, onChanged, className = '' }) {
  const [busy, setBusy] = useState(false);
  const isActive = user.status === 'active';
  const next = isActive ? 'blocked' : 'active';

  async function toggle(e) {
    e?.stopPropagation?.();
    if (busy) return;
    setBusy(true);
    try {
      const res = await apiService.setUserStatus(user._id || user.id, next);
      onChanged?.(res.data); // { id, name, email, status }
    } catch (err) {
      alert(err.message || 'Failed to update status');
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={toggle}
      className={cx(
        // mobile: full width; desktop: auto
        'inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-sm border shadow-sm w-full sm:w-auto',
        isActive
          ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
          : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
        className
      )}
      title={isActive ? 'Block user' : 'Unblock user'}
    >
      {busy ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : isActive ? (
        <ShieldBan className="w-4 h-4" />
      ) : (
        <ShieldCheck className="w-4 h-4" />
      )}
      {isActive ? 'Block' : 'Unblock'}
    </button>
  );
}

/******************** page ********************/
export default function AdminUsersPage() {
  const [statusView, setStatusView] = useState('all'); // all | active | blocked
  const [displayMode, setDisplayMode] = useState('table'); // table | grid
  const [q, setQ] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  async function fetchUsers() {
    setLoading(true);
    setError('');
    try {
      const payload = await apiService.getUsers(statusView);
      setUsers(Array.isArray(payload.data) ? payload.data : []);
      setPage(1); // reset to first page when filter changes
    } catch (e) {
      setError(e.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusView]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return users;
    return users.filter(
      (u) =>
        (u.name || '').toLowerCase().includes(term) ||
        (u.email || '').toLowerCase().includes(term) ||
        (u.mobile?.phoneNumber || '').toLowerCase().includes(term)
    );
  }, [q, users]);

  // pagination slice
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const startIdx = (page - 1) * pageSize;
  const endIdx = Math.min(total, startIdx + pageSize);
  const pageItems = filtered.slice(startIdx, endIdx);

  function onStatusChanged(updated) {
    // update status in-place
    setUsers((prev) =>
      prev.map((u) =>
        u._id === updated.id || u.id === updated.id ? { ...u, status: updated.status } : u
      )
    );
    // if user no longer matches active filter, remove from current list view
    if (statusView !== 'all' && updated.status !== statusView) {
      setUsers((prev) => prev.filter((u) => (u._id || u.id) !== updated.id));
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-indigo-50 text-indigo-700">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-blue-900">Users</h1>
            <p className="text-sm text-gray-500">Manage your user base and review investments</p>
          </div>
        </div>
      </div>

      {/* Search + toggles (mobile friendly) */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-full sm:max-w-xl">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center gap-2 sm:ml-auto">
          <ViewToggle
            icon={<LayoutGrid className="w-4 h-4" />}
            active={displayMode === 'grid'}
            onClick={() => setDisplayMode('grid')}
          />
          <ViewToggle
            icon={<ListIcon className="w-4 h-4" />}
            active={displayMode === 'table'}
            onClick={() => setDisplayMode('table')}
          />
        </div>
      </div>

      {/* Status chips (wrap on small screens) */}
      <div className="flex items-center gap-2 flex-wrap">
        <FilterChip active={statusView === 'all'} onClick={() => setStatusView('all')}>
          All
        </FilterChip>
        <FilterChip active={statusView === 'active'} onClick={() => setStatusView('active')}>
          Active
        </FilterChip>
        <FilterChip active={statusView === 'blocked'} onClick={() => setStatusView('blocked')}>
          Blocked
        </FilterChip>
      </div>

      {/* Card container */}
      <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
        {/* Top bar with page size + refresh */}
        <div className="p-4 border-b border-blue-100 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="font-semibold text-blue-900">All Users</div>
          <div className="flex items-center gap-3">
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
            <button
              onClick={fetchUsers}
              className="text-sm px-3 py-1.5 rounded-xl border border-blue-200 text-blue-900 hover:bg-blue-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin inline" /> : 'Refresh'}
            </button>
          </div>
        </div>

        {error && (
          <div className="px-4 py-3 text-rose-700 bg-rose-50 border-b border-rose-200">{error}</div>
        )}

        {displayMode === 'table' ? (
          <UsersTable users={pageItems} loading={loading} onStatusChanged={onStatusChanged} />
        ) : (
          <UsersGrid users={pageItems} loading={loading} onStatusChanged={onStatusChanged} />
        )}

        {/* Pagination footer */}
        <div className="px-4 py-3 border-t border-blue-100 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-gray-600">
            Showing{' '}
            <span className="font-medium text-blue-900">
              {total ? startIdx + 1 : 0}–{endIdx}
            </span>{' '}
            of <span className="font-medium text-blue-900">{total}</span> users
          </div>

          <div className="flex items-center gap-1">
            <PageBtn disabled={page === 1} onClick={() => setPage(1)} title="First">
              <ChevronsLeft className="w-4 h-4" />
            </PageBtn>
            <PageBtn
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              title="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </PageBtn>

            <span className="px-3 py-1.5 rounded-lg border border-blue-200 text-sm text-blue-900 bg-blue-50">
              Page {page} of {totalPages}
            </span>

            <PageBtn
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              title="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </PageBtn>
            <PageBtn disabled={page === totalPages} onClick={() => setPage(totalPages)} title="Last">
              <ChevronsRight className="w-4 h-4" />
            </PageBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterChip({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        'px-3 py-1.5 rounded-xl text-sm border shadow-sm',
        active ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white hover:bg-gray-50'
      )}
    >
      {children}
    </button>
  );
}

function ViewToggle({ icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        'p-2 rounded-xl border',
        active ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white hover:bg-gray-50'
      )}
      aria-pressed={active}
    >
      {icon}
    </button>
  );
}

function UsersTable({ users, loading, onStatusChanged }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="py-3 pl-4 pr-4">User</th>
            <th className="py-3 pr-4 hidden md:table-cell">Email</th>
            <th className="py-3 pr-4 hidden lg:table-cell">Mobile</th>
            <th className="py-3 pr-4 hidden sm:table-cell">Status</th>
            <th className="py-3 pr-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={5} className="py-10 text-center text-gray-500">
                Loading users...
              </td>
            </tr>
          )}
          {!loading && !users?.length && (
            <tr>
              <td colSpan={5} className="py-10 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          )}
          {!loading &&
            users?.map((u) => (
              <tr key={u._id || u.id} className="border-t hover:bg-blue-50/30 align-top">
                {/* Name + (email+mobile on mobile) */}
                <td className="py-3 pl-4 pr-4">
                  <div className="flex items-start gap-2">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                      <User2 className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-blue-900">{u.name}</div>

                      {/* On small screens, show email + phone under name */}
                      <div className="mt-0.5 space-y-0.5 md:hidden text-xs text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-gray-400" />
                          <span className="truncate">{u.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          <span className="truncate">{fmtPhone(u.mobile)}</span>
                        </div>
                        {/* Also show status badge on xs */}
                        <div className="pt-1 sm:hidden">
                          <StatusBadge status={u.status} />
                        </div>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Email (md+) */}
                <td className="py-3 pr-4 hidden md:table-cell">
                  <span className="inline-flex items-center gap-2 min-w-0 max-w-xs">
                    <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="truncate">{u.email}</span>
                  </span>
                </td>

                {/* Mobile (lg+) */}
                <td className="py-3 pr-4 hidden lg:table-cell">
                  <span className="inline-flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    {fmtPhone(u.mobile)}
                  </span>
                </td>

                {/* Status (sm+) */}
                <td className="py-3 pr-4 hidden sm:table-cell">
                  <StatusBadge status={u.status} />
                </td>

                {/* Actions */}
                <td className="py-3 pr-4">
                  <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                    <Link
                      to={`/admin/users/${u._id || u.id}`}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-sm border hover:bg-gray-50 w-full sm:w-auto"
                    >
                      <Eye className="w-4 h-4" /> View
                    </Link>
                    <ToggleStatusButton user={u} onChanged={onStatusChanged} />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

function UsersGrid({ users, loading, onStatusChanged }) {
  if (loading) return <div className="p-6 text-center text-gray-500">Loading users...</div>;
  if (!users?.length) return <div className="p-6 text-center text-gray-500">No users found.</div>;
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((u) => (
        <div key={u._id || u.id} className="rounded-2xl border border-blue-100 shadow-sm p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                <User2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold leading-tight text-blue-900 truncate">{u.name}</div>
                <div className="text-xs text-gray-500 truncate">{u.email}</div>
              </div>
            </div>
            <StatusBadge status={u.status} className="shrink-0" />
          </div>

          <div className="mt-3 text-sm text-gray-600 inline-flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-400" /> {fmtPhone(u.mobile)}
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <Link
              to={`/admin/users/${u._id || u.id}`}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-sm border hover:bg-gray-50 w-full sm:w-auto"
            >
              <Eye className="w-4 h-4" /> View
            </Link>
            <ToggleStatusButton user={u} onChanged={onStatusChanged} />
          </div>
        </div>
      ))}
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
        'inline-flex items-center justify-center gap-1 rounded-lg border px-3 py-1.5 text-sm transition shadow-sm',
        disabled
          ? 'cursor-not-allowed border-gray-200 text-gray-400 bg-gray-50'
          : 'border-blue-200 text-blue-900 hover:bg-blue-50'
      )}
    >
      {children}
    </button>
  );
}



// // src/pages/admin/AdminUsersPage.jsx
// // Users → All Users list page (clean structure, uses central apiService via Axios instance)
// // Route: <Route path="/admin/users" element={<AdminUsersPage />} />

// import React, { useEffect, useMemo, useState } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Users,
//   Search,
//   LayoutGrid,
//   List as ListIcon,
//   Eye,
//   Loader2,
//   ShieldBan,
//   ShieldCheck,
//   BadgeCheck,
//   Phone,
//   Mail,
//   User2,
// } from 'lucide-react';
// import { apiService } from '../../api/admin';

// /******************** utils ********************/
// const cx = (...c) => c.filter(Boolean).join(' ');
// const fmtPhone = (m) => (!m ? '-' : [m.countryCode, m.phoneNumber].filter(Boolean).join(' '));

// function StatusBadge({ status }) {
//   const active = status === 'active';
//   return (
//     <span className={cx('inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium', active ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700')}>
//       {active ? <BadgeCheck className="w-3.5 h-3.5" /> : <ShieldBan className="w-3.5 h-3.5" />}
//       {active ? 'Active' : 'Blocked'}
//     </span>
//   );
// }

// function ToggleStatusButton({ user, onChanged }) {
//   const [busy, setBusy] = useState(false);
//   const isActive = user.status === 'active';
//   const next = isActive ? 'blocked' : 'active';

//   async function toggle(e) {
//     e?.stopPropagation?.();
//     if (busy) return;
//     setBusy(true);
//     try {
//       const res = await apiService.setUserStatus(user._id || user.id, next);
//       onChanged?.(res.data); // { id, name, email, status }
//     } catch (err) {
//       alert(err.message || 'Failed to update status');
//     } finally { setBusy(false); }
//   }

//   return (
//     <button
//       onClick={toggle}
//       className={cx('inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm border shadow-sm', isActive ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100' : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100')}
//       title={isActive ? 'Block user' : 'Unblock user'}
//     >
//       {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : (isActive ? <ShieldBan className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />)}
//       {isActive ? 'Block' : 'Unblock'}
//     </button>
//   );
// }

// /******************** page ********************/
// export default function AdminUsersPage() {
//   const [statusView, setStatusView] = useState('all'); // all | active | blocked
//   const [displayMode, setDisplayMode] = useState('table'); // table | grid
//   const [q, setQ] = useState('');
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   async function fetchUsers() {
//     setLoading(true); setError('');
//     try {
//       const payload = await apiService.getUsers(statusView);
//       setUsers(Array.isArray(payload.data) ? payload.data : []);
//     } catch (e) {
//       setError(e.message || 'Failed to fetch users');
//     } finally { setLoading(false); }
//   }

//   useEffect(() => { fetchUsers(); }, [statusView]);

//   const filtered = useMemo(() => {
//     const term = q.trim().toLowerCase();
//     if (!term) return users;
//     return users.filter(u =>
//       (u.name || '').toLowerCase().includes(term) ||
//       (u.email || '').toLowerCase().includes(term) ||
//       (u.mobile?.phoneNumber || '').toLowerCase().includes(term)
//     );
//   }, [q, users]);

//   function onStatusChanged(updated) {
//     setUsers(prev => prev.map(u => (u._id === updated.id || u.id === updated.id) ? { ...u, status: updated.status } : u));
//   }

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="p-2 rounded-2xl bg-indigo-50 text-indigo-700"><Users className="w-5 h-5" /></div>
//           <div>
//             <h1 className="text-2xl font-bold">Users</h1>
//             <p className="text-sm text-gray-500">Manage your user base and review investments</p>
//           </div>
//         </div>
//       </div>

//       {/* Search + toggles */}
//       <div className="flex items-center gap-3">
//         <div className="relative flex-1 max-w-xl">
//           <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search users..." className="w-full pl-9 pr-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//         </div>
//         <div className="ml-auto flex items-center gap-2">
//           <ViewToggle icon={<LayoutGrid className="w-4 h-4" />} active={displayMode==='grid'} onClick={() => setDisplayMode('grid')} />
//           <ViewToggle icon={<ListIcon className="w-4 h-4" />} active={displayMode==='table'} onClick={() => setDisplayMode('table')} />
//         </div>
//       </div>

//       {/* Status chips */}
//       <div className="flex items-center gap-2">
//         <FilterChip active={statusView==='all'} onClick={() => setStatusView('all')}>All</FilterChip>
//         <FilterChip active={statusView==='active'} onClick={() => setStatusView('active')}>Active</FilterChip>
//         <FilterChip active={statusView==='blocked'} onClick={() => setStatusView('blocked')}>Blocked</FilterChip>
//       </div>

//       {/* Card container */}
//       <div className="bg-white rounded-2xl border shadow-sm">
//         <div className="p-4 border-b flex items-center justify-between">
//           <div className="font-semibold">All Users</div>
//           <button onClick={fetchUsers} className="text-sm px-3 py-1.5 rounded-xl border hover:bg-gray-50">{loading ? <Loader2 className="w-4 h-4 animate-spin inline" /> : 'Refresh'}</button>
//         </div>

//         {error && <div className="px-4 py-3 text-rose-700 bg-rose-50 border-b border-rose-200">{error}</div>}

//         {displayMode === 'table' ? (
//           <UsersTable users={filtered} loading={loading} onStatusChanged={onStatusChanged} />
//         ) : (
//           <UsersGrid users={filtered} loading={loading} onStatusChanged={onStatusChanged} />
//         )}
//       </div>
//     </div>
//   );
// }

// function FilterChip({ active, children, onClick }) {
//   return (
//     <button onClick={onClick} className={cx('px-3 py-1.5 rounded-xl text-sm border shadow-sm', active ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white hover:bg-gray-50')}>
//       {children}
//     </button>
//   );
// }

// function ViewToggle({ icon, active, onClick }) {
//   return (
//     <button onClick={onClick} className={cx('p-2 rounded-xl border', active ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white hover:bg-gray-50')} aria-pressed={active}>
//       {icon}
//     </button>
//   );
// }

// function UsersTable({ users, loading, onStatusChanged }) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full text-sm">
//         <thead>
//           <tr className="text-left text-gray-500">
//             <th className="py-3 pl-4 pr-4">Name</th>
//             <th className="py-3 pr-4">Email</th>
//             <th className="py-3 pr-4">Mobile</th>
//             <th className="py-3 pr-4">Status</th>
//             <th className="py-3 pr-4">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {loading && <tr><td colSpan={5} className="py-10 text-center text-gray-500">Loading users...</td></tr>}
//           {!loading && !users?.length && <tr><td colSpan={5} className="py-10 text-center text-gray-500">No users found.</td></tr>}
//           {!loading && users?.map((u) => (
//             <tr key={u._id || u.id} className="border-t hover:bg-gray-50">
//               <td className="py-3 pl-4 pr-4">
//                 <div className="flex items-center gap-2">
//                   <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><User2 className="w-4 h-4" /></div>
//                   <div className="font-medium">{u.name}</div>
//                 </div>
//               </td>
//               <td className="py-3 pr-4"><span className="inline-flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400" /> {u.email}</span></td>
//               <td className="py-3 pr-4"><span className="inline-flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" /> {fmtPhone(u.mobile)}</span></td>
//               <td className="py-3 pr-4"><StatusBadge status={u.status} /></td>
//               <td className="py-3 pr-4">
//                 <div className="flex items-center gap-2">
//                   <Link to={`/admin/users/${u._id || u.id}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm border hover:bg-gray-50"><Eye className="w-4 h-4" /> View</Link>
//                   <ToggleStatusButton user={u} onChanged={onStatusChanged} />
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// function UsersGrid({ users, loading, onStatusChanged }) {
//   if (loading) return <div className="p-6 text-center text-gray-500">Loading users...</div>;
//   if (!users?.length) return <div className="p-6 text-center text-gray-500">No users found.</div>;
//   return (
//     <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//       {users.map((u) => (
//         <div key={u._id || u.id} className="rounded-2xl border shadow-sm p-4">
//           <div className="flex items-start justify-between">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><User2 className="w-4 h-4" /></div>
//               <div>
//                 <div className="font-semibold leading-tight">{u.name}</div>
//                 <div className="text-xs text-gray-500">{u.email}</div>
//               </div>
//             </div>
//             <StatusBadge status={u.status} />
//           </div>
//           <div className="mt-3 text-sm text-gray-600 inline-flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" /> {fmtPhone(u.mobile)}</div>
//           <div className="mt-4 flex items-center gap-2">
//             <Link to={`/admin/users/${u._id || u.id}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm border hover:bg-gray-50"><Eye className="w-4 h-4" /> View</Link>
//             <ToggleStatusButton user={u} onChanged={onStatusChanged} />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }



// // AdminUsersOnePage.jsx
// // Single-file page that includes UI + API calls in one place.
// // Matches your admin design (header, search, table/grid toggle, purple accents).
// // Drop into your routes as <AdminUsersOnePage /> at "/admin/users".
// // If you already have src/api/admin.js, you can delete the inline API below
// // and import your service instead.

// import React, { useEffect, useMemo, useState } from 'react';
// import {
//   Users,
//   Search,
//   LayoutGrid,
//   List as ListIcon,
//   Eye,
//   Loader2,
//   ShieldBan,
//   ShieldCheck,
//   BadgeCheck,
//   Phone,
//   Mail,
//   User2,
//   X
// } from 'lucide-react';

// /****************************
//  * INLINE API (one page)
//  ****************************/
// const BASE_URL = 'http://localhost:8080/api'; // ← change if needed

// function getAdminToken() {
//   return (
//     localStorage.getItem('admin_token') ||
//     localStorage.getItem('token') ||
//     localStorage.getItem('jwt') ||
//     localStorage.getItem('access_token') ||
//     ''
//   );
// }

// async function apiFetch(endpoint, { method = 'GET', body, headers = {} } = {}) {
//   const url = `${BASE_URL}${endpoint}`;
//   const token = getAdminToken();
//   const res = await fetch(url, {
//     method,
//     headers: {
//       'Content-Type': 'application/json',
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       ...headers,
//     },
//     body: body ? JSON.stringify(body) : undefined,
    
//   });
//   const ct = res.headers.get('content-type') || '';
//   const data = ct.includes('application/json') ? await res.json() : null;
//   if (!res.ok) throw new Error(data?.message || `Request failed (${res.status})`);
//   return data; // expected shape: { success, message, data }
// }

// const AdminApi = {
//   // GET /api/admin/users?status=active|blocked
//   getUsers: async (status /* 'all'|'active'|'blocked' */) => {
//     const q = status && status !== 'all' ? `?status=${encodeURIComponent(status)}` : '';
//     return apiFetch(`/admin/users${q}`);
//   },
//   // PATCH /api/admin/users/:id/status { status }
//   setUserStatus: async (id, status) => apiFetch(`/admin/users/${id}/status`, { method: 'PATCH', body: { status } }),
//   // GET /api/admin/users/:userId/investments
//   getUserInvestments: async (userId) => apiFetch(`/admin/users/${userId}/investments`),
// };

// /****************************
//  * UTILITIES & SMALL UI PARTS
//  ****************************/
// const cx = (...c) => c.filter(Boolean).join(' ');
// const fmtPhone = (m) => (!m ? '-' : [m.countryCode, m.phoneNumber].filter(Boolean).join(' '));
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

// function FilterChip({ active, children, onClick }) {
//   return (
//     <button onClick={onClick} className={cx('px-3 py-1.5 rounded-xl text-sm border shadow-sm', active ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white hover:bg-gray-50')}>
//       {children}
//     </button>
//   );
// }

// function ViewToggle({ icon, active, onClick }) {
//   return (
//     <button onClick={onClick} className={cx('p-2 rounded-xl border', active ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white hover:bg-gray-50')} aria-pressed={active}>
//       {icon}
//     </button>
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

// /****************************
//  * DRAWER: User Investment Details
//  ****************************/
// function UserDetailsDrawer({ user, open, onClose }) {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [details, setDetails] = useState(null);

//   useEffect(() => {
//     let ignore = false;
//     async function load() {
//       if (!user || !open) return;
//       setLoading(true); setError('');
//       try {
//         const res = await AdminApi.getUserInvestments(user._id || user.id);
//         if (!ignore) setDetails(res.data);
//       } catch (e) {
//         if (!ignore) setError(e.message || 'Failed to load investments');
//       } finally { if (!ignore) setLoading(false); }
//     }
//     load();
//     return () => { ignore = true; };
//   }, [user, open]);

//   return (
//     <div className={cx('fixed inset-0 z-50 transition', open ? 'pointer-events-auto' : 'pointer-events-none')}>
//       <div className={cx('absolute inset-0 bg-black/30 transition-opacity', open ? 'opacity-100' : 'opacity-0')} onClick={onClose} />
//       <aside className={cx('absolute right-0 top-0 h-full w-full max-w-xl bg-white shadow-2xl p-6 flex flex-col', 'transition-transform duration-300', open ? 'translate-x-0' : 'translate-x-full')}>
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h3 className="text-xl font-semibold">User Details</h3>
//             {user && <p className="text-sm text-gray-500">{user.name} · {user.email}</p>}
//           </div>
//           <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 active:scale-95" aria-label="Close"><X className="w-5 h-5" /></button>
//         </div>

//         <div className="flex-1 overflow-auto">
//           {loading && <div className="flex items-center gap-2 text-gray-600"><Loader2 className="w-4 h-4 animate-spin" /> Loading investments...</div>}
//           {error && <div className="text-rose-600 bg-rose-50 border border-rose-200 p-3 rounded-xl">{error}</div>}
//           {!loading && !error && details && (
//             <div className="space-y-6">
//               <div className="grid grid-cols-3 gap-3">
//                 <StatCard label="Total Investments" value={details.totalInvestments} />
//                 <StatCard label="Total Invested" value={fmtCurrency(details.totalInvestedAmount)} />
//                 <StatCard label="Status" value={<StatusBadge status={details.user?.status} />} />
//               </div>
//               <div>
//                 <h4 className="font-semibold mb-3">Investment History</h4>
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full text-sm">
//                     <thead>
//                       <tr className="text-left text-gray-500">
//                         <th className="py-2 pr-4">Property</th>
//                         <th className="py-2 pr-4">Start</th>
//                         <th className="py-2 pr-4">End</th>
//                         <th className="py-2 pr-4">Amount</th>
//                         <th className="py-2 pr-4">Slots</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {details.investments?.length ? details.investments.map((inv) => (
//                         <tr key={inv.investmentId} className="border-t">
//                           <td className="py-2 pr-4">{inv.propertyTitle || '-'}</td>
//                           <td className="py-2 pr-4">{fmtDate(inv.startDate)}</td>
//                           <td className="py-2 pr-4">{fmtDate(inv.endDate)}</td>
//                           <td className="py-2 pr-4">{fmtCurrency(inv.amountInvested)}</td>
//                           <td className="py-2 pr-4">{inv.slotsPurchased}</td>
//                         </tr>
//                       )) : (
//                         <tr><td className="py-6 text-center text-gray-500" colSpan={5}>No investments yet.</td></tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </aside>
//     </div>
//   );
// }

// /****************************
//  * ROW ACTION: Toggle Status (block/unblock)
//  ****************************/
// function ToggleStatusButton({ user, onChanged }) {
//   const [busy, setBusy] = useState(false);
//   const isActive = user.status === 'active';
//   const next = isActive ? 'blocked' : 'active';

//   async function toggle(e) {
//     e?.stopPropagation?.();
//     if (busy) return;
//     setBusy(true);
//     try {
//       const res = await AdminApi.setUserStatus(user._id || user.id, next);
//       onChanged?.(res.data); // { id, status }
//     } catch (err) {
//       alert(err.message || 'Failed to update status');
//     } finally { setBusy(false); }
//   }

//   return (
//     <button onClick={toggle} className={cx('inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm border shadow-sm', isActive ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100' : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100')} title={isActive ? 'Block user' : 'Unblock user'}>
//       {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : (isActive ? <ShieldBan className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />)}
//       {isActive ? 'Block' : 'Unblock'}
//     </button>
//   );
// }

// /****************************
//  * MAIN PAGE (All Users)
//  ****************************/
// export default function AdminUsersOnePage() {
//   const [statusView, setStatusView] = useState('all'); // all | active | blocked
//   const [displayMode, setDisplayMode] = useState('table'); // table | grid
//   const [q, setQ] = useState('');
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [selected, setSelected] = useState(null);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   async function fetchUsers() {
//     setLoading(true); setError('');
//     try {
//       const res = await AdminApi.getUsers(statusView);
//       setUsers(Array.isArray(res.data) ? res.data : []);
//     } catch (e) {
//       setError(e.message || 'Failed to fetch users');
//     } finally { setLoading(false); }
//   }

//   useEffect(() => { fetchUsers(); }, [statusView]);

//   const filtered = useMemo(() => {
//     const term = q.trim().toLowerCase();
//     if (!term) return users;
//     return users.filter(u =>
//       (u.name || '').toLowerCase().includes(term) ||
//       (u.email || '').toLowerCase().includes(term) ||
//       (u.mobile?.phoneNumber || '').toLowerCase().includes(term)
//     );
//   }, [q, users]);

//   function onStatusChanged(updated) {
//     setUsers(prev => prev.map(u => (u._id === updated.id || u.id === updated.id) ? { ...u, status: updated.status } : u));
//     setSelected(prev => {
//       if (!prev) return prev;
//       if ((prev._id || prev.id) === updated.id) return { ...prev, status: updated.status };
//       return prev;
//     });
//   }

//   function openDetails(u) { setSelected(u); setDrawerOpen(true); }

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header (matches your Properties page style) */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="p-2 rounded-2xl bg-indigo-50 text-indigo-700"><Users className="w-5 h-5" /></div>
//           <div>
//             <h1 className="text-2xl font-bold">Users</h1>
//             <p className="text-sm text-gray-500">Manage your user base and review investments</p>
//           </div>
//         </div>
//       </div>

//       {/* Search + toggles */}
//       <div className="flex items-center gap-3">
//         <div className="relative flex-1 max-w-xl">
//           <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search users..." className="w-full pl-9 pr-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//         </div>
//         <div className="ml-auto flex items-center gap-2">
//           <ViewToggle icon={<LayoutGrid className="w-4 h-4" />} active={displayMode==='grid'} onClick={() => setDisplayMode('grid')} />
//           <ViewToggle icon={<ListIcon className="w-4 h-4" />} active={displayMode==='table'} onClick={() => setDisplayMode('table')} />
//         </div>
//       </div>

//       {/* Status filter chips */}
//       <div className="flex items-center gap-2">
//         <FilterChip active={statusView==='all'} onClick={() => setStatusView('all')}>All</FilterChip>
//         <FilterChip active={statusView==='active'} onClick={() => setStatusView('active')}>Active</FilterChip>
//         <FilterChip active={statusView==='blocked'} onClick={() => setStatusView('blocked')}>Blocked</FilterChip>
//       </div>

//       {/* Card container (like your Properties page) */}
//       <div className="bg-white rounded-2xl border shadow-sm">
//         <div className="p-4 border-b flex items-center justify-between">
//           <div className="font-semibold">All Users</div>
//           <button onClick={fetchUsers} className="text-sm px-3 py-1.5 rounded-xl border hover:bg-gray-50">{loading ? <Loader2 className="w-4 h-4 animate-spin inline" /> : 'Refresh'}</button>
//         </div>

//         {error && <div className="px-4 py-3 text-rose-700 bg-rose-50 border-b border-rose-200">{error}</div>}

//         {displayMode === 'table' ? (
//           <UsersTable users={filtered} loading={loading} onView={openDetails} onStatusChanged={onStatusChanged} />
//         ) : (
//           <UsersGrid users={filtered} loading={loading} onView={openDetails} onStatusChanged={onStatusChanged} />
//         )}
//       </div>

//       {/* Drawer */}
//       <UserDetailsDrawer user={selected} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
//     </div>
//   );
// }

// /****************************
//  * TABLE & GRID
//  ****************************/
// function UsersTable({ users, loading, onView, onStatusChanged }) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full text-sm">
//         <thead>
//           <tr className="text-left text-gray-500">
//             <th className="py-3 pl-4 pr-4">Name</th>
//             <th className="py-3 pr-4">Email</th>
//             <th className="py-3 pr-4">Mobile</th>
//             <th className="py-3 pr-4">Status</th>
//             <th className="py-3 pr-4">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {loading && <tr><td colSpan={5} className="py-10 text-center text-gray-500">Loading users...</td></tr>}
//           {!loading && !users?.length && <tr><td colSpan={5} className="py-10 text-center text-gray-500">No users found.</td></tr>}
//           {!loading && users?.map((u) => (
//             <tr key={u._id || u.id} className="border-t hover:bg-gray-50">
//               <td className="py-3 pl-4 pr-4">
//                 <div className="flex items-center gap-2">
//                   <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><User2 className="w-4 h-4" /></div>
//                   <div className="font-medium">{u.name}</div>
//                 </div>
//               </td>
//               <td className="py-3 pr-4"><span className="inline-flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400" /> {u.email}</span></td>
//               <td className="py-3 pr-4"><span className="inline-flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" /> {fmtPhone(u.mobile)}</span></td>
//               <td className="py-3 pr-4"><StatusBadge status={u.status} /></td>
//               <td className="py-3 pr-4">
//                 <div className="flex items-center gap-2">
//                   <button onClick={() => onView(u)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm border hover:bg-gray-50"><Eye className="w-4 h-4" /> View</button>
//                   <ToggleStatusButton user={u} onChanged={onStatusChanged} />
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// function UsersGrid({ users, loading, onView, onStatusChanged }) {
//   if (loading) return <div className="p-6 text-center text-gray-500">Loading users...</div>;
//   if (!users?.length) return <div className="p-6 text-center text-gray-500">No users found.</div>;
//   return (
//     <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//       {users.map((u) => (
//         <div key={u._id || u.id} className="rounded-2xl border shadow-sm p-4">
//           <div className="flex items-start justify-between">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><User2 className="w-4 h-4" /></div>
//               <div>
//                 <div className="font-semibold leading-tight">{u.name}</div>
//                 <div className="text-xs text-gray-500">{u.email}</div>
//               </div>
//             </div>
//             <StatusBadge status={u.status} />
//           </div>
//           <div className="mt-3 text-sm text-gray-600 inline-flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" /> {fmtPhone(u.mobile)}</div>
//           <div className="mt-4 flex items-center gap-2">
//             <button onClick={() => onView(u)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm border hover:bg-gray-50"><Eye className="w-4 h-4" /> View</button>
//             <ToggleStatusButton user={u} onChanged={onStatusChanged} />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
