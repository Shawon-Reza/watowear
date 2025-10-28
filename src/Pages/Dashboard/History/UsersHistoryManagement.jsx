import React, { useMemo, useState } from 'react'
import { HiDotsVertical } from 'react-icons/hi'

/**
 * HistoryManagement
 * props:
 * - users: array of user objects from parent
 *    { id, name, email, avatar, signupMethod, status, actionTakenBy, date }
 */
export default function UsersHistoryManagement({ users = [] , title = 'User management'}) {
  const [tab, setTab] = useState('All')
  const [page, setPage] = useState(1)
  const [pageSize] = useState(6)
  const [sortDir, setSortDir] = useState('desc')

  const tabs = ['All', 'Active', 'Inactive', 'Suspended']

  const filtered = useMemo(() => {
    let list = users || []
    if (tab !== 'All') list = list.filter((u) => (u.status || '').toLowerCase() === tab.toLowerCase())
    list = list.slice().sort((a, b) => {
      const ta = new Date(a.date).getTime() || 0
      const tb = new Date(b.date).getTime() || 0
      return sortDir === 'asc' ? ta - tb : tb - ta
    })
    return list
  }, [users, tab, sortDir])

  const total = filtered.length
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize)

  function formatDate(d) {
    if (!d) return ''
    const dt = new Date(d)
    return dt.toLocaleString()
  }

  function statusClass(status) {
    const s = (status || '').toLowerCase()
    if (s === 'active') return 'bg-green-100 text-green-800'
    if (s === 'suspended') return 'bg-red-100 text-red-700'
    return 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setPage(1) }}
                className={`px-3 py-1 rounded ${tab === t ? 'bg-gray-100 dark:bg-gray-700 text-gray-900' : 'text-gray-600'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">Sort by Date</label>
          <select
            value={sortDir}
            onChange={(e) => setSortDir(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="desc">Newest</option>
            <option value="asc">Oldest</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="text-gray-500">
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Signup Method</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action Taken By</th>
              <th className="py-3 px-4">Date & Time</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="py-4 px-4 align-middle">
                  <div className="flex items-center gap-3">
                    {u.avatar ? (
                      <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-700">{(u.name || '?').split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
                    )}
                    <div>
                      <div className="text-gray-800 dark:text-gray-100 font-medium">{u.name}</div>
                      <div className="text-gray-500 text-xs">{u.email}</div>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-4">{u.signupMethod || 'Email'}</td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${statusClass(u.status)}`}>{u.status}</span>
                </td>
                <td className="py-4 px-4">{u.actionTakenBy || '-'}</td>
                <td className="py-4 px-4">{formatDate(u.date)}</td>
                <td className="py-4 px-4">
                  <button className="p-1 rounded hover:bg-gray-100">
                    <HiDotsVertical className="w-5 h-5 text-gray-500" />
                  </button>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={6} className="py-6 px-4 text-center text-gray-500">No results</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer / pagination */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <div>Showing {Math.min(total, (page - 1) * pageSize + 1)} to {Math.min(total, page * pageSize)} of {total} result{total !== 1 ? 's' : ''}</div>

        <div className="flex items-center gap-2">
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} className="px-3 py-1 border rounded">&lt;</button>
          {Array.from({length: pageCount}).map((_,i)=> (
            <button key={i} onClick={()=>setPage(i+1)} className={`px-3 py-1 border rounded ${page===i+1 ? 'bg-green-100' : ''}`}>{i+1}</button>
          ))}
          <button onClick={()=>setPage(p=>Math.min(pageCount,p+1))} disabled={page===pageCount} className="px-3 py-1 border rounded">&gt;</button>
        </div>
      </div>
    </div>
  )
}